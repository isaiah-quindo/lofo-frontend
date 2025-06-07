import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define path patterns that don't require authentication
const publicPathPatterns = [
  '/',
  '/login',
  '/signup',
  '/items',
  '/view/found',
  '/view/lost',
  '/items/:id',
  '/lost',
  '/found',
];

// Define protected paths that require authentication
const protectedPathPatterns = ['/report', '/account'];

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Check if the current path matches any of our public paths
  const isPublicPath = publicPathPatterns.some((pattern) => {
    // Exact match
    if (pattern === currentPath) return true;
    // Check for dynamic item routes
    if (currentPath.startsWith('/items/')) return true;
    // Check for other patterns
    return currentPath.startsWith(pattern);
  });

  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Check if the path requires authentication
  const requiresAuth = protectedPathPatterns.some((pattern) =>
    currentPath.startsWith(pattern)
  );

  // If the path doesn't require auth and isn't public, allow access
  if (!requiresAuth) {
    return NextResponse.next();
  }

  // For protected paths, check for authentication
  const token = request.cookies.get('jwt')?.value;

  if (!token) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
