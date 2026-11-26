// Minimal Google Sheets + Drive client using plain fetch (no extra packages).
// Authenticates as the shop owner's Google account via an OAuth refresh token
// (see ADMIN_SETUP.md). Used by the website (server side only) and by the
// setup script, so it must not import anything Next.js-specific.

import { SHEET_TAB } from './productSheet.js';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SHEETS = 'https://sheets.googleapis.com/v4/spreadsheets';
const DRIVE = 'https://www.googleapis.com/drive/v3/files';
const DRIVE_UPLOAD = 'https://www.googleapis.com/upload/drive/v3/files';

export const PHOTO_FOLDER_NAME = '3D Matrix Product Photos';

export function isGoogleConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN &&
      process.env.GOOGLE_SHEET_ID
  );
}

let tokenCache = { token: null, expiresAt: 0 };

export async function getAccessToken() {
  if (tokenCache.token && Date.now() < tokenCache.expiresAt - 60_000) return tokenCache.token;
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || '',
      grant_type: 'refresh_token',
    }),
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `Google sign-in failed (${data.error || res.status}). ` +
        (data.error === 'invalid_grant'
          ? 'The refresh token has expired or was revoked — run "npm run sheet:auth" again.'
          : data.error_description || '')
    );
  }
  tokenCache = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

async function google(url, { method = 'GET', body, headers = {}, raw = false } = {}) {
  const token = await getAccessToken();
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body && !(body instanceof Uint8Array) && typeof body !== 'string' ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body && !(body instanceof Uint8Array) && typeof body !== 'string' ? JSON.stringify(body) : body,
    cache: 'no-store',
  });
  if (raw) return res;
  const data = res.status === 204 ? {} : await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error?.message || res.statusText;
    const err = new Error(`Google API error ${res.status}: ${msg}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

const sheetId = () => process.env.GOOGLE_SHEET_ID;
const enc = encodeURIComponent;

// ---------- Sheets ----------

/** Returns { headers: string[], rows: any[][] } for the Products tab (rows exclude the header). */
export async function readProductSheet(spreadsheetId = sheetId()) {
  const range = enc(`${SHEET_TAB}!A1:ZZ`);
  const data = await google(`${SHEETS}/${spreadsheetId}/values/${range}?valueRenderOption=UNFORMATTED_VALUE`);
  const values = data.values || [];
  const headers = (values[0] || []).map((h) => String(h).trim());
  return { headers, rows: values.slice(1) };
}

function colLetter(n) {
  let s = '';
  for (n += 1; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
  return s;
}

/** Overwrites one data row. `rowIndex` is 0-based among data rows (sheet row = rowIndex + 2). */
export async function updateSheetRow(rowIndex, cells, spreadsheetId = sheetId()) {
  const r = rowIndex + 2;
  const range = enc(`${SHEET_TAB}!A${r}:${colLetter(cells.length - 1)}${r}`);
  await google(`${SHEETS}/${spreadsheetId}/values/${range}?valueInputOption=RAW`, {
    method: 'PUT',
    body: { values: [cells] },
  });
}

export async function appendSheetRow(cells, spreadsheetId = sheetId()) {
  const range = enc(`${SHEET_TAB}!A1`);
  await google(
    `${SHEETS}/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    { method: 'POST', body: { values: [cells] } }
  );
}

async function productsTabId(spreadsheetId) {
  const data = await google(`${SHEETS}/${spreadsheetId}?fields=sheets.properties`);
  const tab = (data.sheets || []).find((s) => s.properties.title === SHEET_TAB);
  if (!tab) throw new Error(`The spreadsheet has no "${SHEET_TAB}" tab.`);
  return tab.properties.sheetId;
}

/** Deletes one data row (0-based among data rows). */
export async function deleteSheetRow(rowIndex, spreadsheetId = sheetId()) {
  const tabId = await productsTabId(spreadsheetId);
  await google(`${SHEETS}/${spreadsheetId}:batchUpdate`, {
    method: 'POST',
    body: {
      requests: [
        {
          deleteDimension: {
            range: { sheetId: tabId, dimension: 'ROWS', startIndex: rowIndex + 1, endIndex: rowIndex + 2 },
          },
        },
      ],
    },
  });
}

export async function createSpreadsheet(title) {
  return google(SHEETS, {
    method: 'POST',
    body: { properties: { title }, sheets: [{ properties: { title: SHEET_TAB, gridProperties: { frozenRowCount: 1 } } }] },
  });
}

export async function writeRange(spreadsheetId, a1, values) {
  await google(`${SHEETS}/${spreadsheetId}/values/${enc(a1)}?valueInputOption=RAW`, {
    method: 'PUT',
    body: { values },
  });
}

export async function batchUpdate(spreadsheetId, requests) {
  return google(`${SHEETS}/${spreadsheetId}:batchUpdate`, { method: 'POST', body: { requests } });
}

// ---------- Drive (photos) ----------

let folderCache = null;

async function photoFolderId() {
  if (folderCache) return folderCache;
  const q = enc(
    `name='${PHOTO_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
  );
  const found = await google(`${DRIVE}?q=${q}&fields=files(id)&spaces=drive`);
  if (found.files?.length) return (folderCache = found.files[0].id);
  const created = await google(`${DRIVE}?fields=id`, {
    method: 'POST',
    body: { name: PHOTO_FOLDER_NAME, mimeType: 'application/vnd.google-apps.folder' },
  });
  return (folderCache = created.id);
}

/** Uploads an image to the "3D Matrix Product Photos" Drive folder. Returns the file id. */
export async function uploadPhoto({ name, mimeType, bytes }) {
  const parent = await photoFolderId();
  const boundary = `b${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
  const meta = JSON.stringify({ name, parents: [parent] });
  const head = new TextEncoder().encode(
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n` +
      `--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`
  );
  const tail = new TextEncoder().encode(`\r\n--${boundary}--`);
  const body = new Uint8Array(head.length + bytes.length + tail.length);
  body.set(head, 0);
  body.set(bytes, head.length);
  body.set(tail, head.length + bytes.length);
  const data = await google(`${DRIVE_UPLOAD}?uploadType=multipart&fields=id`, {
    method: 'POST',
    headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
    body,
  });
  return data.id;
}

/** Streams a Drive file the app created. Returns the raw fetch Response. */
export async function downloadPhoto(fileId) {
  return google(`${DRIVE}/${enc(fileId)}?alt=media`, { raw: true });
}
