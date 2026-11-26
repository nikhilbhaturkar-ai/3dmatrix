'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath, updateTag } from 'next/cache';
import { CATEGORIES } from '@/app/data/catalog';
import { requireAdmin } from '@/lib/adminAuth';
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  isAdminConfigured,
  passwordMatches,
} from '@/lib/adminSession';
import { isGoogleConfigured, uploadPhoto } from '@/lib/google';
import { PRODUCTS_TAG, deleteProductRow, writeProductRow } from '@/lib/products';
import { ID_PATTERN, SIZE_NAMES, driveViewUrl, imageDisplayUrl, validateRow } from '@/lib/productSheet';

const MAX_PHOTO_BYTES = 4 * 1024 * 1024; // Vercel limits request bodies to ~4.5 MB
const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// ---------- Login ----------

export async function login(prevState, formData) {
  if (!isAdminConfigured()) {
    return { error: 'Admin login is not set up yet: ADMIN_PASSWORD and ADMIN_SESSION_SECRET are missing.' };
  }
  const ok = await passwordMatches(String(formData.get('password') || ''));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 1000)); // slow down password guessing
    return { error: 'Wrong password.' };
  }
  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: SESSION_MAX_AGE,
  });
  redirect('/admin');
}

export async function logout() {
  const store = await cookies();
  store.delete({ name: SESSION_COOKIE, path: '/admin' });
  redirect('/admin/login');
}

// ---------- Products ----------

function refreshShop() {
  updateTag(PRODUCTS_TAG);
  revalidatePath('/shop');
}

function requireSheet() {
  if (!isGoogleConfigured()) {
    throw new Error('Google Sheet is not connected yet, so changes cannot be saved. See ADMIN_SETUP.md.');
  }
}

const text = (fd, key) => String(fd.get(key) ?? '').trim();
const num = (fd, key) => {
  const v = text(fd, key);
  return v === '' ? '' : Number(v);
};

function dimsText(fd, size) {
  const key = size.toLowerCase();
  const w = text(fd, `${key}_w`);
  const d = text(fd, `${key}_d`);
  const h = text(fd, `${key}_h`);
  const note = text(fd, `${key}_note`);
  if (!w || !d || !h) return '';
  return `${w} × ${d} × ${h} mm${note ? ` ${note}` : ''}`;
}

function rowFromForm(fd) {
  let images = [];
  try {
    images = JSON.parse(String(fd.get('images') || '[]')).map((s) => String(s).trim()).filter(Boolean);
  } catch {
    images = [];
  }
  const row = {
    ID: text(fd, 'id').toUpperCase(),
    Name: text(fd, 'name'),
    Category: text(fd, 'category'),
    Description: text(fd, 'description'),
    Visible: fd.get('visible') === 'on',
    Featured: fd.get('featured') === 'on',
    Badge: text(fd, 'badge').toUpperCase(),
    Rating: num(fd, 'rating'),
    Reviews: num(fd, 'reviews'),
    Tags: text(fd, 'tags')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .join(', '),
    Images: images.join('\n'),
    'Card Price': num(fd, 'card_price'),
    'Card MRP': num(fd, 'card_mrp'),
    'Custom Size': fd.get('custom_size') === 'on',
    Infill: text(fd, 'infill'),
    'Layer Height': text(fd, 'layer_height'),
    'Print Time': text(fd, 'print_time'),
    Weight: text(fd, 'weight'),
  };
  for (const size of SIZE_NAMES) {
    const key = size.toLowerCase();
    row[`${size} Size`] = dimsText(fd, size);
    row[`${size} Price`] = num(fd, `${key}_price`);
    row[`${size} MRP`] = num(fd, `${key}_mrp`);
  }
  return row;
}

export async function saveProduct(prevState, formData) {
  await requireAdmin();
  const originalId = text(formData, 'original_id') || null;
  const row = rowFromForm(formData);

  const errors = validateRow(row, CATEGORIES);
  if (!String(row.Images).trim()) errors.push('Add at least one photo.');
  if (errors.length) return { errors };

  try {
    requireSheet();
    await writeProductRow(row, originalId);
  } catch (e) {
    return { errors: [e.message] };
  }
  refreshShop();
  redirect(`/admin?saved=${encodeURIComponent(row.ID)}`);
}

export async function deleteProduct(id) {
  await requireAdmin();
  if (!ID_PATTERN.test(String(id))) return { error: 'Invalid product ID.' };
  try {
    requireSheet();
    await deleteProductRow(id);
  } catch (e) {
    return { error: e.message };
  }
  refreshShop();
  return { ok: true };
}

// ---------- Photos ----------

export async function uploadProductPhoto(formData) {
  await requireAdmin();
  const file = formData.get('file');
  if (!file || typeof file === 'string') return { error: 'No file received.' };
  if (!PHOTO_TYPES.includes(file.type)) return { error: 'Only JPG, PNG or WebP photos can be uploaded.' };
  if (file.size > MAX_PHOTO_BYTES) {
    return { error: `${file.name} is ${(file.size / 1048576).toFixed(1)} MB; the limit is 4 MB per photo.` };
  }
  try {
    requireSheet();
    const id = await uploadPhoto({
      name: file.name,
      mimeType: file.type,
      bytes: new Uint8Array(await file.arrayBuffer()),
    });
    const stored = driveViewUrl(id);
    return { stored, display: imageDisplayUrl(stored) };
  } catch (e) {
    return { error: e.message };
  }
}
