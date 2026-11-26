import 'server-only';
import { unstable_cache } from 'next/cache';
import { PRODUCTS as CATALOG_PRODUCTS } from '@/app/data/catalog';
import {
  COLUMNS,
  cellsToRow,
  productToRow,
  rowToCells,
  rowToProduct,
} from './productSheet';
import {
  appendSheetRow,
  deleteSheetRow,
  isGoogleConfigured,
  readProductSheet,
  updateSheetRow,
} from './google';

export const PRODUCTS_TAG = 'products';

// Seconds the shop keeps serving cached products before re-reading the sheet.
// Edits made in the admin portal show up immediately; edits typed directly
// into the Google Sheet show up within this time.
export const SHOP_REVALIDATE_SECONDS = 300;

/** Fallback used until Google is connected: the products in catalog.js, in sheet shape. */
function catalogProducts() {
  return CATALOG_PRODUCTS.map((p) => rowToProduct(productToRow(p)));
}

async function readAll() {
  const { headers, rows } = await readProductSheet();
  const missing = ['ID', 'Name'].filter((h) => !headers.includes(h));
  if (missing.length) throw new Error(`The Products sheet is missing the column(s): ${missing.join(', ')}`);
  return { headers, rows: rows.map((cells) => cellsToRow(cells, headers)) };
}

const readShopProducts = unstable_cache(
  async () => {
    const { rows } = await readAll();
    return rows.filter((r) => String(r.ID ?? '').trim()).map(rowToProduct);
  },
  ['sheet-products-v1'],
  { tags: [PRODUCTS_TAG], revalidate: SHOP_REVALIDATE_SECONDS }
);

/** Products shown in the shop (visible only). Cached. */
export async function getShopProducts() {
  const all = isGoogleConfigured() ? await readShopProducts() : catalogProducts();
  return all.filter((p) => p.visible && p.id && p.name);
}

/** Every product including hidden ones, read fresh from the sheet (admin use). */
export async function getAdminProducts() {
  if (!isGoogleConfigured()) return catalogProducts();
  const { rows } = await readAll();
  return rows.filter((r) => String(r.ID ?? '').trim()).map(rowToProduct);
}

function findRowIndex(rows, id) {
  return rows.findIndex((r) => String(r.ID ?? '').trim() === id);
}

/** Writes a product row. `originalId` is null for a new product. */
export async function writeProductRow(row, originalId) {
  const { headers, rows } = await readAll();
  // Columns are matched by header name; extra columns the owner adds are left untouched.
  const missing = COLUMNS.filter((c) => !headers.includes(c));
  if (missing.length) {
    throw new Error(
      `The Products sheet is missing column(s): ${missing.join(', ')}. ` +
        'Add them to the header row (row 1) and try again.'
    );
  }

  const clash = findRowIndex(rows, row.ID);
  if (originalId === null) {
    if (clash !== -1) throw new Error(`A product with ID ${row.ID} already exists.`);
    await appendSheetRow(rowToCells(row, headers));
    return;
  }

  const index = findRowIndex(rows, originalId);
  if (index === -1) throw new Error(`Product ${originalId} no longer exists in the sheet.`);
  if (row.ID !== originalId && clash !== -1) throw new Error(`A product with ID ${row.ID} already exists.`);
  // Preserve values in any extra columns that aren't part of the form.
  const merged = { ...rows[index], ...row };
  await updateSheetRow(index, rowToCells(merged, headers));
}

export async function deleteProductRow(id) {
  const { rows } = await readAll();
  const index = findRowIndex(rows, id);
  if (index === -1) throw new Error(`Product ${id} no longer exists in the sheet.`);
  await deleteSheetRow(index);
}
