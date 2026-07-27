import { NextResponse } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { NextResponse as RouterResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Jika mengakses halaman di dalam /admin (kecuali /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = request.cookies.get('admin_session');

    // Jika belum ada session login, arahkan ke /admin/login
    if (!session) {
      return RouterResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return RouterResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};