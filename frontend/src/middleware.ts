import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get('isAdmin')?.value === 'true';
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';

  // Check if it is an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Check if it is the checkout route
  if (request.nextUrl.pathname.startsWith('/checkout')) {
    if (!isAdmin && !isLoggedIn) {
      return NextResponse.redirect(new URL('/login?redirect=/checkout', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/checkout/:path*'],
};

