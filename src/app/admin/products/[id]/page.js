import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/app/data/categories';
import { requireAdmin } from '@/lib/adminAuth';
import { isGoogleConfigured } from '@/lib/google';
import { getAdminProducts } from '@/lib/products';
import ProductForm from '../ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const all = await getAdminProducts();
  const product = all.find((p) => p.id === decodeURIComponent(id));
  if (!product) notFound();
  return (
    <ProductForm
      product={product}
      categories={CATEGORIES.filter((c) => c !== 'All Models')}
      existing={all.map(({ id: pid, category }) => ({ id: pid, category }))}
      canEdit={isGoogleConfigured()}
    />
  );
}
