
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const { pathname } = request.nextUrl;

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/login'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Se não tem token e está tentando acessar rota protegida
  if (!token && !isPublicRoute && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se tem token e está tentando acessar login
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
