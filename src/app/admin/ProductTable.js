'use client';

import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteProduct } from './actions';

export default function ProductTable({ products, categories, canEdit }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [, startTransition] = useTransition();

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [products, query, category]);

  function onDelete(p) {
    if (!window.confirm(`Delete "${p.name}" (${p.id})?\n\nIts row will be removed from the Google Sheet and it will disappear from the shop. This can't be undone here (you can restore it from the sheet's version history).`)) return;
    setError(null);
    setDeleting(p.id);
    startTransition(async () => {
      const res = await deleteProduct(p.id);
      setDeleting(null);
      if (res?.error) setError(res.error);
      else router.refresh();
    });
  }

  return (
    <>
      {error && <div className="admin-notice error">{error}</div>}
      <div className="admin-filters">
        <input
          className="admin-input"
          type="search"
          placeholder="Search by name, ID or tag…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="admin-count">
        Showing {shown.length} of {products.length} products · {products.filter((p) => !p.visible).length} hidden
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Product</th>
              <th>Category</th>
              <th>Small / Med / Large</th>
              <th>Photos</th>
              <th>Shop</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {shown.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="admin-thumb" src={p.images[0]} alt="" loading="lazy" />
                  ) : (
                    <div className="admin-thumb" />
                  )}
                </td>
                <td>
                  <div className="admin-name">{p.name}</div>
                  <div className="admin-sub">{p.id}</div>
                </td>
                <td className="admin-sub">{p.category}</td>
                <td>{p.sizes.map((s) => `₹${s.numericPrice}`).join(' / ')}</td>
                <td>{p.images.length}</td>
                <td>
                  <span className={`admin-pill ${p.visible ? 'on' : 'off'}`}>{p.visible ? 'Visible' : 'Hidden'}</span>
                  {p.featured && <div className="admin-sub">Featured</div>}
                </td>
                <td>
                  <div className="admin-row-actions">
                    <Link className="admin-btn small" href={`/admin/products/${encodeURIComponent(p.id)}`}>
                      {canEdit ? 'Edit' : 'View'}
                    </Link>
                    {canEdit && (
                      <button
                        className="admin-btn small danger"
                        type="button"
                        onClick={() => onDelete(p)}
                        disabled={deleting === p.id}
                      >
                        {deleting === p.id ? 'Deleting…' : 'Delete'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={7} className="admin-sub" style={{ textAlign: 'center', padding: 28 }}>
                  No products match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
