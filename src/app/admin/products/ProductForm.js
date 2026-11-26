'use client';

import { startTransition, useActionState, useMemo, useState } from 'react';
import Link from 'next/link';
import { saveProduct, uploadProductPhoto } from '../actions';

const SIZES = ['Small', 'Medium', 'Large'];
const MAX_PHOTO_MB = 4;

/** "120 × 120 × 35 mm (280mm flex)" -> { w, d, h, note } */
function splitDims(text = '') {
  const m = String(text).match(/(\d+(?:\.\d+)?)\s*[×xX*]\s*(\d+(?:\.\d+)?)\s*[×xX*]\s*(\d+(?:\.\d+)?)\s*(?:mm)?\s*(.*)$/);
  return m ? { w: m[1], d: m[2], h: m[3], note: m[4].trim() } : { w: '', d: '', h: '', note: '' };
}

/** Suggest an ID like DEC-LAMP-010 from the category's usual prefix and the next free number. */
function suggestId(name, category, existingIds, products) {
  const prefixCounts = {};
  for (const p of products) {
    if (p.category !== category) continue;
    const pre = p.id.split('-')[0];
    prefixCounts[pre] = (prefixCounts[pre] || 0) + 1;
  }
  const prefix = Object.entries(prefixCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'PRD';
  const word =
    String(name)
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, '')
      .split(/\s+/)
      .find((w) => w.length >= 3 && !['THE', 'AND', 'FOR', 'WITH'].includes(w))
      ?.slice(0, 8) || 'ITEM';
  let n = 1 + Math.max(0, ...existingIds.filter((id) => id.startsWith(`${prefix}-`)).map((id) => Number(id.split('-').pop()) || 0));
  let id;
  do id = `${prefix}-${word}-${String(n++).padStart(3, '0')}`;
  while (existingIds.includes(id));
  return id;
}

export default function ProductForm({ product, categories, existing, canEdit }) {
  const isNew = !product;
  const [state, formAction, saving] = useActionState(saveProduct, null);

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || categories[0]);
  const [id, setId] = useState(product?.id || '');
  const [idTouched, setIdTouched] = useState(!isNew);
  const existingIds = useMemo(() => existing.map((p) => p.id), [existing]);
  const shownId = idTouched ? id : suggestId(name, category, existingIds, existing);

  const [photos, setPhotos] = useState(() =>
    (product?.imageSources || []).map((stored, i) => ({ stored, display: product.images[i] }))
  );
  const [uploading, setUploading] = useState(0);
  const [photoError, setPhotoError] = useState(null);
  const [linkInput, setLinkInput] = useState('');

  const sizeBy = Object.fromEntries((product?.sizes || []).map((s) => [s.name, s]));
  const defaultCardPrice = product && product.numericPrice !== sizeBy.Small?.numericPrice ? product.numericPrice : '';
  const defaultCardMrp = product && product.mrp !== sizeBy.Small?.mrp ? product.mrp : '';

  async function onFiles(e) {
    const files = [...e.target.files];
    e.target.value = '';
    setPhotoError(null);
    for (const file of files) {
      if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
        setPhotoError(`${file.name} is ${(file.size / 1048576).toFixed(1)} MB — photos must be ${MAX_PHOTO_MB} MB or smaller.`);
        continue;
      }
      setUploading((n) => n + 1);
      try {
        const fd = new FormData();
        fd.append('file', file);
        const res = await uploadProductPhoto(fd);
        if (res?.error) setPhotoError(res.error);
        else setPhotos((list) => [...list, { stored: res.stored, display: res.display }]);
      } catch (err) {
        setPhotoError(`Upload failed: ${err.message}`);
      } finally {
        setUploading((n) => n - 1);
      }
    }
  }

  function addLink() {
    const v = linkInput.trim();
    if (!v) return;
    if (!/^(https?:\/\/|\/images\/)/i.test(v)) {
      setPhotoError('Paste a full link starting with https:// (or a site path starting with /images/).');
      return;
    }
    const driveId = v.match(/drive\.google\.com\/(?:file\/d\/|(?:open|uc)\?(?:.*&)?id=)([A-Za-z0-9_-]+)/)?.[1];
    setPhotos((list) => [...list, { stored: v, display: driveId ? `/media/drive/${driveId}` : v }]);
    setLinkInput('');
    setPhotoError(null);
  }

  const move = (i, dir) =>
    setPhotos((list) => {
      const next = [...list];
      [next[i], next[i + dir]] = [next[i + dir], next[i]];
      return next;
    });

  // Submit via onSubmit (not the `action` prop) so React doesn't clear the form
  // when the server sends back validation errors.
  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => formAction(fd));
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="admin-topbar">
        <h1>{isNew ? 'Add product' : `Edit: ${product.name}`}</h1>
        <div className="admin-topbar-actions">
          <Link className="admin-btn" href="/admin">
            ← All products
          </Link>
        </div>
      </div>

      {!canEdit && (
        <div className="admin-notice warn">
          Google Sheet not connected — this form is read-only until setup is finished (see <code>ADMIN_SETUP.md</code>).
        </div>
      )}
      {state?.errors?.length > 0 && (
        <div className="admin-notice error" role="alert" ref={(el) => el?.scrollIntoView({ block: 'center' })}>
          <strong>Please fix the following:</strong>
          <ul>
            {state.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <input type="hidden" name="original_id" value={isNew ? '' : product.id} />
      <input type="hidden" name="images" value={JSON.stringify(photos.map((p) => p.stored))} />

      <fieldset disabled={!canEdit} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
        <div className="admin-form-grid">
          <div>
            <section className="admin-card">
              <h2>Basics</h2>
              <div className="admin-field">
                <label htmlFor="name">Product name</label>
                <input id="name" name="name" className="admin-input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="admin-two">
                <div className="admin-field">
                  <label htmlFor="category">Category</label>
                  <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-field">
                  <label htmlFor="id">Product ID (SKU)</label>
                  <input
                    id="id"
                    name="id"
                    className="admin-input"
                    value={shownId}
                    readOnly={!isNew}
                    onChange={(e) => {
                      setIdTouched(true);
                      setId(e.target.value.toUpperCase());
                    }}
                  />
                  <span className="hint">{isNew ? 'Suggested automatically — you can change it.' : "Can't be changed after creation."}</span>
                </div>
              </div>
              <div className="admin-field">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" defaultValue={product?.description || ''} />
              </div>
              <div className="admin-checks">
                <label className="admin-check">
                  <input type="checkbox" name="visible" defaultChecked={product ? product.visible : true} /> Show in shop
                </label>
                <label className="admin-check">
                  <input type="checkbox" name="featured" defaultChecked={product?.featured || false} /> Featured (listed first)
                </label>
                <label className="admin-check">
                  <input type="checkbox" name="custom_size" defaultChecked={product ? product.customSizeAvailable : true} /> Allow custom size
                </label>
              </div>
              <div className="admin-two">
                <div className="admin-field">
                  <label htmlFor="badge">Badge (optional)</label>
                  <input id="badge" name="badge" className="admin-input" defaultValue={product?.badge || ''} placeholder="e.g. BESTSELLER" />
                </div>
                <div className="admin-field">
                  <label htmlFor="tags">Search tags</label>
                  <input id="tags" name="tags" className="admin-input" defaultValue={(product?.tags || []).join(', ')} placeholder="vase, decor, gift" />
                  <span className="hint">Separate with commas.</span>
                </div>
              </div>
              <div className="admin-two">
                <div className="admin-field">
                  <label htmlFor="rating">Rating (0–5)</label>
                  <input id="rating" name="rating" type="number" step="0.1" min="0" max="5" className="admin-input" defaultValue={product?.rating ?? 5} />
                </div>
                <div className="admin-field">
                  <label htmlFor="reviews">Number of reviews</label>
                  <input id="reviews" name="reviews" type="number" min="0" className="admin-input" defaultValue={product?.reviewsCount ?? 0} />
                </div>
              </div>
            </section>

            <section className="admin-card">
              <h2>
                3D printing specs <span className="hint">shown on the product page</span>
              </h2>
              <div className="admin-two">
                <div className="admin-field">
                  <label htmlFor="infill">Infill</label>
                  <input id="infill" name="infill" className="admin-input" defaultValue={product?.specs.infill || ''} placeholder="15% Gyroid" />
                </div>
                <div className="admin-field">
                  <label htmlFor="layer_height">Layer height</label>
                  <input id="layer_height" name="layer_height" className="admin-input" defaultValue={product?.specs.layerHeight || ''} placeholder="0.16mm High Detail" />
                </div>
                <div className="admin-field">
                  <label htmlFor="print_time">Print time</label>
                  <input id="print_time" name="print_time" className="admin-input" defaultValue={product?.specs.printTime || ''} placeholder="~6.5 hours" />
                </div>
                <div className="admin-field">
                  <label htmlFor="weight">Weight</label>
                  <input id="weight" name="weight" className="admin-input" defaultValue={product?.specs.weight || ''} placeholder="140g" />
                </div>
              </div>
            </section>
          </div>

          <div>
            <section className="admin-card">
              <h2>
                Photos <span className="hint">the first photo is the cover</span>
              </h2>
              {photos.length > 0 ? (
                <div className="admin-photos">
                  {photos.map((p, i) => (
                    <div className="admin-photo" key={`${p.stored}-${i}`}>
                      {i === 0 && <span className="cover-tag">COVER</span>}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.display} alt={`Photo ${i + 1}`} />
                      <div className="admin-photo-actions">
                        <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move left">
                          ←
                        </button>
                        <button type="button" onClick={() => move(i, 1)} disabled={i === photos.length - 1} aria-label="Move right">
                          →
                        </button>
                        <button
                          type="button"
                          className="remove"
                          onClick={() => setPhotos((list) => list.filter((_, j) => j !== i))}
                          aria-label="Remove photo"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="admin-sub">No photos yet.</p>
              )}
              {photoError && <div className="admin-notice error">{photoError}</div>}
              <div className="admin-field">
                <label className="admin-btn" style={{ alignSelf: 'flex-start', color: 'var(--a-text)' }}>
                  {uploading ? `Uploading ${uploading}…` : '⬆ Upload photos to Google Drive'}
                  <input type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={onFiles} disabled={!canEdit} />
                </label>
                <span className="hint">JPG, PNG or WebP, up to {MAX_PHOTO_MB} MB each. Uploaded exactly as-is (no resizing).</span>
              </div>
              <div className="admin-photo-add">
                <input
                  className="admin-input"
                  placeholder="…or paste a photo link"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addLink();
                    }
                  }}
                />
                <button type="button" className="admin-btn" onClick={addLink}>
                  Add link
                </button>
              </div>
            </section>

            <section className="admin-card">
              <h2>
                Sizes &amp; prices <span className="hint">₹, GST included · MRP optional</span>
              </h2>
              {SIZES.map((size) => {
                const s = sizeBy[size];
                const d = splitDims(s?.dimensions);
                const k = size.toLowerCase();
                return (
                  <div className="admin-size-row" key={size}>
                    <div className="size-name">{size}</div>
                    <div className="admin-field">
                      <label htmlFor={`${k}_w`}>W mm</label>
                      <input id={`${k}_w`} name={`${k}_w`} type="number" min="1" step="any" className="admin-input" defaultValue={d.w} />
                    </div>
                    <div className="admin-field">
                      <label htmlFor={`${k}_d`}>D mm</label>
                      <input id={`${k}_d`} name={`${k}_d`} type="number" min="1" step="any" className="admin-input" defaultValue={d.d} />
                    </div>
                    <div className="admin-field">
                      <label htmlFor={`${k}_h`}>H mm</label>
                      <input id={`${k}_h`} name={`${k}_h`} type="number" min="1" step="any" className="admin-input" defaultValue={d.h} />
                    </div>
                    <div className="admin-field note-field">
                      <label htmlFor={`${k}_note`}>Note</label>
                      <input id={`${k}_note`} name={`${k}_note`} className="admin-input" defaultValue={d.note} placeholder="optional" />
                    </div>
                    <div className="admin-field">
                      <label htmlFor={`${k}_price`}>Price ₹</label>
                      <input id={`${k}_price`} name={`${k}_price`} type="number" min="1" className="admin-input" defaultValue={s?.numericPrice ?? ''} />
                    </div>
                    <div className="admin-field">
                      <label htmlFor={`${k}_mrp`}>MRP ₹</label>
                      <input id={`${k}_mrp`} name={`${k}_mrp`} type="number" min="1" className="admin-input" defaultValue={s && s.mrp !== s.numericPrice ? s.mrp : ''} />
                    </div>
                  </div>
                );
              })}
              <details style={{ marginTop: 12 }}>
                <summary className="admin-sub" style={{ cursor: 'pointer' }}>
                  Advanced: different &ldquo;Starting from&rdquo; price on the shop card
                </summary>
                <p className="admin-sub">Leave empty to use the Small size price (normal).</p>
                <div className="admin-two">
                  <div className="admin-field">
                    <label htmlFor="card_price">Card price ₹</label>
                    <input id="card_price" name="card_price" type="number" min="1" className="admin-input" defaultValue={defaultCardPrice} />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="card_mrp">Card MRP ₹</label>
                    <input id="card_mrp" name="card_mrp" type="number" min="1" className="admin-input" defaultValue={defaultCardMrp} />
                  </div>
                </div>
              </details>
            </section>
          </div>
        </div>

        <div className="admin-save-bar">
          <Link className="admin-btn" href="/admin">
            Cancel
          </Link>
          <button type="submit" className="admin-btn primary" disabled={saving || uploading > 0 || !canEdit}>
            {saving ? 'Saving…' : uploading > 0 ? 'Waiting for uploads…' : isNew ? 'Add product' : 'Save changes'}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
