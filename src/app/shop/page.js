import ShopClient from './ShopClient';
import { getShopProducts } from '@/lib/products';

// Re-check the Google Sheet at most every 5 minutes (admin portal edits apply instantly).
export const revalidate = 300;

export default async function ShopPage() {
  const products = await getShopProducts();
  return <ShopClient products={products} />;
}
