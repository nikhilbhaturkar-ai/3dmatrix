# Admin portal setup (Google Sheet)

The website's products live in a Google Sheet in **your** Google account. You manage them at
**`/admin`** on the website (add / edit / delete, upload photos), or by editing the sheet directly.

- Product photos uploaded in the admin portal go to a **"3D Matrix Product Photos"** folder in your Google Drive.
- Existing product photos stay in the website (`public/images/products`) and keep working.
- Until setup is finished, the site uses the built-in list in `src/app/data/catalog.js` and the admin portal is read-only.

Setup takes about 15 minutes and is done once.

---

## 1. Create a Google Cloud project

1. Go to <https://console.cloud.google.com/> and sign in with the Google account that should own the sheet.
2. Top bar → project picker → **New project** → name it `3D Matrix Admin` → **Create**, then select it.
3. Open **APIs & Services → Library** and **Enable** both:
   - **Google Sheets API**
   - **Google Drive API**

## 2. Set up the sign-in screen (OAuth consent)

1. Open **Google Auth Platform** (or **APIs & Services → OAuth consent screen**) → **Get started**.
2. App name `3D Matrix Admin`, your email as support email → **Audience: External** → contact email → **Create**.
3. Go to **Audience** and click **Publish app** → **Confirm** (status becomes *In production*).
   > ⚠️ Don't skip this: while the app is in *Testing*, Google expires the sign-in after 7 days and the admin portal stops saving.
   > You don't need Google's verification — it's only used by you.

## 3. Create the OAuth client

1. **Google Auth Platform → Clients → Create client** (or **APIs & Services → Credentials → Create credentials → OAuth client ID**).
2. Application type: **Desktop app**, name `3D Matrix setup` → **Create**.
3. Copy the **Client ID** and **Client secret** into `.env.local` in the project folder:

   ```
   GOOGLE_CLIENT_ID=....apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-....
   ```

## 4. Connect your Google account

In the project folder run:

```
npm run sheet:auth
```

A browser window opens. Sign in, and when Google says **"Google hasn't verified this app"** click
**Advanced → Go to 3D Matrix Admin (unsafe)** — it's your own app. Tick **both** permission boxes
(Sheets, and Drive files created by this app) → **Continue**. The terminal saves `GOOGLE_REFRESH_TOKEN` to `.env.local`.

What the app can access: your Google Sheets, and **only** Drive files it creates itself (the photos folder) —
not the rest of your Drive. You can remove access anytime at <https://myaccount.google.com/permissions>.

## 5. Move the products into the sheet

```
npm run sheet:export
```

This creates the spreadsheet **"3D Matrix - Products"** in your Drive with all 71 products, saves
`GOOGLE_SHEET_ID` to `.env.local`, checks every row, and prints the link. (It refuses to run twice so you
don't end up with duplicate sheets.) To re-check the sheet later: `npm run sheet:check`.

## 6. Set your admin password

`.env.local` already contains a generated `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` for local testing.
Change `ADMIN_PASSWORD` to your own (12+ characters), then restart `npm run dev` and open
<http://localhost:3000/admin>.

## 7. Put it live on Vercel

Vercel → your project → **Settings → Environment Variables** → add these six for **Production** (and Preview
if you use it), copying the values from `.env.local`:

| Name | Value |
|---|---|
| `ADMIN_PASSWORD` | your admin password |
| `ADMIN_SESSION_SECRET` | a long random value (generate a new one for production:<br>`node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`) |
| `GOOGLE_CLIENT_ID` | from step 3 |
| `GOOGLE_CLIENT_SECRET` | from step 3 |
| `GOOGLE_REFRESH_TOKEN` | from `.env.local` |
| `GOOGLE_SHEET_ID` | from `.env.local` |

Then **Deployments → ⋯ → Redeploy**. The admin portal is at `https://<your-site>/admin`.

---

## Day-to-day use

- **Admin portal (`/admin`)**: changes appear in the shop immediately.
- **Editing the sheet directly**: changes appear in the shop within ~5 minutes.
  Don't rename the headers in row 1. Extra columns you add are ignored by the website.
- **Hide a product** without deleting it: untick *Show in shop* (or the *Visible* checkbox in the sheet).
- **Undo mistakes**: in the sheet, **File → Version history** restores any earlier version.
- **Photos**: JPG/PNG/WebP up to 4 MB each, uploaded exactly as-is. The first photo is the cover.
  Photos you put into Drive yourself (not through the portal) can't be read by the website — upload them in the
  portal, or paste a public link from another site instead.
- **Change the admin password**: update `ADMIN_PASSWORD` in Vercel and redeploy. To also log out every
  existing session, change `ADMIN_SESSION_SECRET` too.
- **"Google sign-in failed … invalid_grant"**: the Google access was revoked or expired (e.g. the app was left in
  *Testing*). Run `npm run sheet:auth` again and update `GOOGLE_REFRESH_TOKEN` in Vercel.
