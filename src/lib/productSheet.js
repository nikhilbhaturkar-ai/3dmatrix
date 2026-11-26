// Shared product <-> Google Sheet row conversion.
// Pure JS (no Next.js / Node-only imports) so it can be used by the website,
// the admin portal and the one-time setup script.

export const SHEET_TAB = 'Products';

// Column order used when the sheet is created. Columns are matched by header
// name when reading/writing, so they can be reordered in the sheet safely.
// Do not rename headers in the sheet — the website looks them up by name.
export const COLUMNS = [
  'ID',
  'Name',
  'Category',
  'Description',
  'Visible',
  'Featured',
  'Badge',
  'Rating',
  'Reviews',
  'Tags',
  'Images',
  'Small Size',
  'Small Price',
  'Small MRP',
  'Medium Size',
  'Medium Price',
  'Medium MRP',
  'Large Size',
  'Large Price',
  'Large MRP',
  'Card Price',
  'Card MRP',
  'Custom Size',
  'Infill',
  'Layer Height',
  'Print Time',
  'Weight',
];

export const SIZE_NAMES = ['Small', 'Medium', 'Large'];

export const ID_PATTERN = /^[A-Z0-9]+(-[A-Z0-9]+)*$/;

const DRIVE_ID = /^[A-Za-z0-9_-]{10,}$/;

/** Extracts a Google Drive file id from a Drive link (or returns null). */
export function driveFileId(url) {
  if (typeof url !== 'string') return null;
  const m =
    url.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/) ||
    url.match(/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([A-Za-z0-9_-]+)/);
  return m && DRIVE_ID.test(m[1]) ? m[1] : null;
}

/** Turns a stored image reference into a URL the browser can load. */
export function imageDisplayUrl(stored) {
  const id = driveFileId(stored);
  return id ? `/media/drive/${id}` : stored;
}

export function driveViewUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

const inr = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

function toNumber(v) {
  if (typeof v === 'number') return v;
  if (v === undefined || v === null || String(v).trim() === '') return NaN;
  return Number(String(v).replace(/[₹,\s]/g, ''));
}

function toBool(v, fallback) {
  if (typeof v === 'boolean') return v;
  const s = String(v ?? '').trim().toLowerCase();
  if (s === '') return fallback;
  return ['true', 'yes', 'y', '1'].includes(s);
}

const str = (v) => (v === undefined || v === null ? '' : String(v).trim());

function splitList(v, sep) {
  return str(v)
    .split(sep)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Parses "120 × 120 × 35 mm (280mm flex)" style text into numbers. */
export function parseDims(text) {
  const m = str(text).match(/(\d+(?:\.\d+)?)\s*[×xX*]\s*(\d+(?:\.\d+)?)\s*[×xX*]\s*(\d+(?:\.\d+)?)/);
  if (!m) return null;
  return { width: Number(m[1]), depth: Number(m[2]), height: Number(m[3]) };
}

/** Converts a sheet row (object keyed by header) into the product shape the shop uses. */
export function rowToProduct(row) {
  const sizes = SIZE_NAMES.map((name) => {
    const dimensions = str(row[`${name} Size`]);
    const d = parseDims(dimensions) || { width: 0, depth: 0, height: 0 };
    const price = toNumber(row[`${name} Price`]);
    const mrpRaw = toNumber(row[`${name} MRP`]);
    const mrp = Number.isFinite(mrpRaw) && mrpRaw > 0 ? mrpRaw : price;
    return {
      name,
      ...d,
      dimensions,
      price: `${inr(price)} (Incl. GST)`,
      numericPrice: price,
      mrp,
      mrp_price: `${inr(mrp)} (Incl. GST)`,
      ...(name === 'Medium' ? { isPopular: true } : {}),
    };
  });

  const cardPriceRaw = toNumber(row['Card Price']);
  const cardMrpRaw = toNumber(row['Card MRP']);
  const numericPrice = Number.isFinite(cardPriceRaw) && cardPriceRaw > 0 ? cardPriceRaw : sizes[0].numericPrice;
  const mrp = Number.isFinite(cardMrpRaw) && cardMrpRaw > 0 ? cardMrpRaw : sizes[0].mrp;

  const rating = toNumber(row['Rating']);
  const reviews = toNumber(row['Reviews']);
  const name = str(row['Name']);
  const badge = str(row['Badge']).toUpperCase();
  const images = splitList(row['Images'], /\r?\n/);

  return {
    id: str(row['ID']),
    name,
    productName: name,
    category: str(row['Category']),
    description: str(row['Description']),
    material: 'PLA',
    visible: toBool(row['Visible'], true),
    featured: toBool(row['Featured'], false),
    ...(badge ? { badge } : {}),
    rating: Number.isFinite(rating) ? rating : 5,
    reviewsCount: Number.isFinite(reviews) ? reviews : 0,
    tags: splitList(row['Tags'], ','),
    imageSources: images, // as stored in the sheet (Drive links / site paths)
    images: images.map(imageDisplayUrl), // URLs the browser loads
    sizes,
    numericPrice,
    mrp,
    price: `From ${inr(numericPrice)}`,
    gstIncluded: true,
    customSizeAvailable: toBool(row['Custom Size'], true),
    specs: {
      infill: str(row['Infill']),
      layerHeight: str(row['Layer Height']),
      printTime: str(row['Print Time']),
      weight: str(row['Weight']),
    },
  };
}

/**
 * Converts a product (catalog.js shape or admin form shape) into a sheet row
 * object keyed by header. `cardPrice`/`cardMrp` are only written when they
 * differ from the Small size, so the column stays empty for normal products.
 */
export function productToRow(p) {
  const sizeBy = Object.fromEntries((p.sizes || []).map((s) => [s.name, s]));
  const row = {
    ID: p.id,
    Name: p.name,
    Category: p.category,
    Description: p.description || '',
    Visible: p.visible !== false,
    Featured: !!p.featured,
    Badge: p.badge || '',
    Rating: Number.isFinite(p.rating) ? p.rating : '',
    Reviews: Number.isFinite(p.reviewsCount) ? p.reviewsCount : '',
    Tags: (p.tags || []).join(', '),
    Images: (p.imageSources || p.images || []).join('\n'),
    'Custom Size': p.customSizeAvailable !== false,
    Infill: p.specs?.infill || '',
    'Layer Height': p.specs?.layerHeight || '',
    'Print Time': p.specs?.printTime || '',
    Weight: p.specs?.weight || '',
  };
  for (const name of SIZE_NAMES) {
    const s = sizeBy[name] || {};
    row[`${name} Size`] = s.dimensions || '';
    row[`${name} Price`] = Number.isFinite(s.numericPrice) ? s.numericPrice : '';
    row[`${name} MRP`] = Number.isFinite(s.mrp) ? s.mrp : '';
  }
  const small = sizeBy.Small || {};
  row['Card Price'] = Number.isFinite(p.numericPrice) && p.numericPrice !== small.numericPrice ? p.numericPrice : '';
  row['Card MRP'] = Number.isFinite(p.mrp) && p.mrp !== small.mrp ? p.mrp : '';
  return row;
}

/** Returns a list of human-readable problems with a product row (empty = valid). */
export function validateRow(row, categories) {
  const errors = [];
  if (!ID_PATTERN.test(str(row.ID))) errors.push('ID must use capital letters, numbers and dashes only (e.g. DEC-VASE-010).');
  if (!str(row.Name)) errors.push('Name is required.');
  if (categories && !categories.includes(str(row.Category))) errors.push('Choose a valid category.');
  for (const name of SIZE_NAMES) {
    if (!parseDims(row[`${name} Size`])) errors.push(`${name} size needs width × depth × height in mm.`);
    const price = toNumber(row[`${name} Price`]);
    if (!(price > 0)) errors.push(`${name} price must be a number above 0.`);
    const mrp = toNumber(row[`${name} MRP`]);
    if (Number.isFinite(mrp) && mrp > 0 && mrp < price) errors.push(`${name} MRP can't be lower than its price.`);
  }
  const rating = toNumber(row.Rating);
  if (Number.isFinite(rating) && (rating < 0 || rating > 5)) errors.push('Rating must be between 0 and 5.');
  return errors;
}

/** Row object -> array of cell values in the order of `headers`. */
export function rowToCells(row, headers) {
  return headers.map((h) => (row[h] === undefined ? '' : row[h]));
}

/** Array of cell values + headers -> row object. */
export function cellsToRow(cells, headers) {
  const row = {};
  headers.forEach((h, i) => {
    if (h) row[h] = cells[i] === undefined ? '' : cells[i];
  });
  return row;
}
