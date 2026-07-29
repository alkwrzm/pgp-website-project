import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
  const token = request.cookies.get('admin_token')?.value;

  const isAuthenticated = token === adminPassword;

  // Protect /admin routes (except /admin/login)
  if (path.startsWith('/admin') && path !== '/admin/login') {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Redirect authenticated user away from /admin/login to /admin
  if (path === '/admin/login') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
