import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, verifySessionToken } from './adminSession';

export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Call at the top of every admin page and Server Action. Redirects to login if not signed in. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login');
}
