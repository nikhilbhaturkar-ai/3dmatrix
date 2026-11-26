import { CATEGORIES } from '@/app/data/categories';
import { requireAdmin } from '@/lib/adminAuth';
import { isGoogleConfigured } from '@/lib/google';
import { getAdminProducts } from '@/lib/products';
import ProductForm from '../ProductForm';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  await requireAdmin();
  const existing = await getAdminProducts().catch(() => []);
  return (
    <ProductForm
      product={null}
      categories={CATEGORIES.filter((c) => c !== 'All Models')}
      existing={existing.map(({ id, category }) => ({ id, category }))}
      canEdit={isGoogleConfigured()}
    />
  );
}
