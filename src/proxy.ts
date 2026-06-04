import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin')) {
    // Always allow access to the login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Validate that both session cookies exist and match
    const sessionToken = request.cookies.get('admin_session')?.value;
    const sessionValid = request.cookies.get('admin_session_valid')?.value;

    if (
      !sessionToken ||
      !sessionValid ||
      sessionToken !== sessionValid ||
      sessionToken.length !== 64 // 32 bytes hex = 64 chars
    ) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: '/admin/:path*',
}
