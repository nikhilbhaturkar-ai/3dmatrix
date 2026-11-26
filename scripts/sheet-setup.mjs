#!/usr/bin/env node
// One-time Google Sheet setup for the 3D Matrix admin portal. See ADMIN_SETUP.md.
//
//   npm run sheet:auth     Sign in with your Google account and save the refresh token to .env.local
//   npm run sheet:export   Create the "3D Matrix - Products" spreadsheet with every product from catalog.js
//   npm run sheet:check    Read the sheet back and report any rows with problems
//
// Secrets are only written to .env.local (git-ignored) and never printed in full.

import { createServer } from 'node:http';
import { createHash, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ENV_FILE = path.join(ROOT, '.env.local');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'];
const SHEET_TITLE = '3D Matrix - Products';

// ---------- .env.local helpers ----------

function loadEnv() {
  if (!existsSync(ENV_FILE)) return;
  for (const line of readFileSync(ENV_FILE, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}

function saveEnv(key, value) {
  const lines = existsSync(ENV_FILE) ? readFileSync(ENV_FILE, 'utf8').split(/\r?\n/) : [];
  const i = lines.findIndex((l) => l.startsWith(`${key}=`));
  if (i >= 0) lines[i] = `${key}=${value}`;
  else {
    while (lines.length && lines[lines.length - 1] === '') lines.pop();
    lines.push(`${key}=${value}`);
  }
  writeFileSync(ENV_FILE, lines.join('\n') + '\n');
  process.env[key] = value;
}

function need(...keys) {
  const missing = keys.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`\nMissing in .env.local: ${missing.join(', ')}\nSee ADMIN_SETUP.md for how to get them.\n`);
    process.exit(1);
  }
}

const b64url = (buf) => buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

// ---------- auth ----------

async function auth() {
  need('GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET');
  const verifier = b64url(randomBytes(32));
  const challenge = b64url(createHash('sha256').update(verifier).digest());
  const state = b64url(randomBytes(16));

  const server = createServer();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const redirectUri = `http://127.0.0.1:${server.address().port}`;

  const url =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: SCOPES.join(' '),
      access_type: 'offline',
      prompt: 'consent',
      code_challenge: challenge,
      code_challenge_method: 'S256',
      state,
    });

  console.log('\nOpening Google sign-in in your browser. If it does not open, copy this link:\n');
  console.log(url + '\n');
  const opener = process.platform === 'win32' ? `start "" "${url}"` : process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
  exec(opener, () => {});

  const code = await new Promise((resolve, reject) => {
    server.on('request', (req, res) => {
      const q = new URL(req.url, redirectUri).searchParams;
      if (!q.get('code') && !q.get('error')) {
        res.writeHead(404).end();
        return;
      }
      const ok = q.get('state') === state && q.get('code');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(
        ok
          ? '<h2>3D Matrix: Google connected ✔</h2><p>You can close this tab and go back to the terminal.</p>'
          : `<h2>Sign-in failed</h2><p>${q.get('error') || 'State mismatch'} — go back to the terminal.</p>`
      );
      server.close();
      ok ? resolve(q.get('code')) : reject(new Error(q.get('error') || 'State mismatch'));
    });
  });

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code_verifier: verifier,
    }),
  });
  const tokens = await tokenRes.json();
  if (!tokenRes.ok || !tokens.refresh_token) {
    console.error('\nGoogle did not return a refresh token:', tokens.error_description || tokens.error || tokens);
    process.exit(1);
  }
  const granted = String(tokens.scope || '').split(' ');
  const missing = SCOPES.filter((s) => !granted.includes(s));
  if (missing.length) {
    console.error(`\nSome permissions were not granted: ${missing.join(', ')}\nRun "npm run sheet:auth" again and tick every box.`);
    process.exit(1);
  }
  saveEnv('GOOGLE_REFRESH_TOKEN', tokens.refresh_token);
  console.log('\n✔ Google connected. Refresh token saved to .env.local (keep it secret).');
  console.log('  Next: npm run sheet:export\n');
}

// ---------- export ----------

async function exportProducts(force) {
  need('GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN');
  if (process.env.GOOGLE_SHEET_ID && !force) {
    console.error(
      `\nGOOGLE_SHEET_ID is already set, so a sheet already exists:\n  https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}/edit\n` +
        'Not creating another one. To really create a new sheet, run: npm run sheet:export -- --force\n'
    );
    process.exit(1);
  }

  const { PRODUCTS, CATEGORIES } = await import('../src/app/data/catalog.js');
  const { COLUMNS, productToRow, rowToCells } = await import('../src/lib/productSheet.js');
  const g = await import('../src/lib/google.js');

  const created = await g.createSpreadsheet(SHEET_TITLE);
  const id = created.spreadsheetId;
  const tabId = created.sheets[0].properties.sheetId;
  console.log(`\nCreated spreadsheet "${SHEET_TITLE}"`);

  const values = [COLUMNS, ...PRODUCTS.map((p) => rowToCells(productToRow(p), COLUMNS))];
  await g.writeRange(id, 'Products!A1', values);
  console.log(`Wrote ${PRODUCTS.length} products`);

  const col = (name) => COLUMNS.indexOf(name);
  const colRange = (name) => ({ sheetId: tabId, startRowIndex: 1, endRowIndex: 2000, startColumnIndex: col(name), endColumnIndex: col(name) + 1 });
  const width = (name, px) => ({
    updateDimensionProperties: {
      range: { sheetId: tabId, dimension: 'COLUMNS', startIndex: col(name), endIndex: col(name) + 1 },
      properties: { pixelSize: px },
      fields: 'pixelSize',
    },
  });
  const checkbox = (name) => ({ setDataValidation: { range: colRange(name), rule: { condition: { type: 'BOOLEAN' }, strict: true } } });

  await g.batchUpdate(id, [
    {
      repeatCell: {
        range: { sheetId: tabId, startRowIndex: 0, endRowIndex: 1 },
        cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.9, green: 0.93, blue: 0.98 } } },
        fields: 'userEnteredFormat(textFormat,backgroundColor)',
      },
    },
    {
      repeatCell: {
        range: { sheetId: tabId, startRowIndex: 1, endRowIndex: 2000 },
        cell: { userEnteredFormat: { wrapStrategy: 'CLIP', verticalAlignment: 'TOP' } },
        fields: 'userEnteredFormat(wrapStrategy,verticalAlignment)',
      },
    },
    { updateSheetProperties: { properties: { sheetId: tabId, gridProperties: { frozenRowCount: 1, frozenColumnCount: 2 } }, fields: 'gridProperties(frozenRowCount,frozenColumnCount)' } },
    width('ID', 150),
    width('Name', 260),
    width('Category', 190),
    width('Description', 320),
    width('Images', 360),
    width('Tags', 220),
    checkbox('Visible'),
    checkbox('Featured'),
    checkbox('Custom Size'),
    {
      setDataValidation: {
        range: colRange('Category'),
        rule: {
          condition: { type: 'ONE_OF_LIST', values: CATEGORIES.filter((c) => c !== 'All Models').map((c) => ({ userEnteredValue: c })) },
          strict: true,
          showCustomUi: true,
        },
      },
    },
    { addSheet: { properties: { title: 'Read me', index: 1 } } },
  ]);

  await g.writeRange(id, "'Read me'!A1", [
    ['How this sheet works'],
    ['This sheet IS the product list of the 3D Matrix website. Each row in "Products" is one product, in the order shown in the shop.'],
    ['Easiest: use the admin portal at /admin on the website — it edits this sheet for you and the shop updates immediately.'],
    ['Edits typed directly here appear on the website within about 5 minutes.'],
    ['Do not rename the column headers in row 1. You can add your own extra columns; the website ignores them.'],
    ['Untick "Visible" to hide a product without deleting it.'],
    ['Images: one per line inside the cell. First image = cover photo. Photos uploaded in the admin portal are stored in the "3D Matrix Product Photos" Drive folder.'],
    ['Sizes: write "W × D × H mm" (an optional note after it is shown too). Prices are in ₹ including GST. MRP may be left empty.'],
    ['Card Price / Card MRP: leave empty normally. Only fill them in to show a different "Starting from" price on the shop card than the Small size price.'],
    ['Made a mistake? File → Version history lets you restore any earlier version of this sheet.'],
  ]);

  saveEnv('GOOGLE_SHEET_ID', id);
  console.log('Saved GOOGLE_SHEET_ID to .env.local');
  console.log(`\n✔ Done. Open your sheet:\n  https://docs.google.com/spreadsheets/d/${id}/edit\n`);
  await check();
}

// ---------- check ----------

async function check() {
  need('GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN', 'GOOGLE_SHEET_ID');
  const { CATEGORIES } = await import('../src/app/data/catalog.js');
  const { COLUMNS, cellsToRow, validateRow } = await import('../src/lib/productSheet.js');
  const g = await import('../src/lib/google.js');
  const { headers, rows } = await g.readProductSheet();
  const missing = COLUMNS.filter((c) => !headers.includes(c));
  if (missing.length) console.log(`⚠ Missing columns: ${missing.join(', ')}`);
  let bad = 0;
  const seen = new Set();
  rows.forEach((cells, i) => {
    const row = cellsToRow(cells, headers);
    if (!String(row.ID ?? '').trim()) return;
    const errs = validateRow(row, CATEGORIES);
    if (seen.has(row.ID)) errs.push('Duplicate ID.');
    seen.add(row.ID);
    if (errs.length) {
      bad++;
      console.log(`⚠ Row ${i + 2} (${row.ID}): ${errs.join(' ')}`);
    }
  });
  console.log(`Checked ${seen.size} products: ${bad ? `${bad} with problems` : 'all OK'}.`);
}

// ---------- main ----------

loadEnv();
const [cmd, ...args] = process.argv.slice(2);
const run = { auth, export: () => exportProducts(args.includes('--force')), check }[cmd];
if (!run) {
  console.log('Usage: node scripts/sheet-setup.mjs <auth|export|check>');
  process.exit(1);
}
run().catch((e) => {
  console.error(`\n✖ ${e.message}\n`);
  process.exit(1);
});
