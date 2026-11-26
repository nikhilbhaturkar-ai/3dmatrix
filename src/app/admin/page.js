import Link from 'next/link';
import { CATEGORIES } from '@/app/data/categories';
import { requireAdmin } from '@/lib/adminAuth';
import { isGoogleConfigured } from '@/lib/google';
import { getAdminProducts } from '@/lib/products';
import { logout } from './actions';
import ProductTable from './ProductTable';

export const dynamic = 'force-dynamic';

export default async function AdminHome({ searchParams }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const connected = isGoogleConfigured();

  let products = [];
  let loadError = null;
  try {
    products = await getAdminProducts();
  } catch (e) {
    loadError = e.message;
  }

  const sheetUrl = connected ? `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}/edit` : null;

  return (
    <>
      <div className="admin-topbar">
        <h1>Products</h1>
        <div className="admin-topbar-actions">
          {sheetUrl && (
            <a className="admin-btn" href={sheetUrl} target="_blank" rel="noopener noreferrer">
              Open Google Sheet ↗
            </a>
          )}
          <Link className="admin-btn" href="/shop" target="_blank">
            View shop ↗
          </Link>
          <Link className="admin-btn primary" href="/admin/products/new">
            + Add product
          </Link>
          <form action={logout}>
            <button className="admin-btn" type="submit">
              Log out
            </button>
          </form>
        </div>
      </div>

      {!connected && (
        <div className="admin-notice warn">
          <strong>Google Sheet not connected.</strong> You&apos;re seeing the built-in product list (read-only).
          Follow <code>ADMIN_SETUP.md</code> to connect your Google account, then add, edit and delete will work.
        </div>
      )}
      {saved && <div className="admin-notice ok">Saved {saved}. The shop is already showing the change.</div>}
      {loadError && (
        <div className="admin-notice error">
          <strong>Couldn&apos;t read the Google Sheet:</strong> {loadError}
        </div>
      )}

      <ProductTable products={products} categories={CATEGORIES.filter((c) => c !== 'All Models')} canEdit={connected} />
    </>
  );
}
