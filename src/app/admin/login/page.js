import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/adminAuth';
import LoginForm from './LoginForm';

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect('/admin');
  return <LoginForm />;
}
