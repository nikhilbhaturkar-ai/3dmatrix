import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from './lib/adminSession';

// First line of defence for the admin portal: anyone without a valid session
// is sent to the login page. Pages and Server Actions check again on the server.
export async function proxy(request) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();

  const ok = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!ok) return NextResponse.redirect(new URL('/admin/login', request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
