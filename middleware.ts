import { NextRequest, NextResponse } from 'next/server';

const localeCookie = 'NEXT_LOCALE';
const oneYear = 60 * 60 * 24 * 365;

function withLocaleHeader(request: NextRequest, locale: 'en' | 'zh-CN', pathname: string) {
  const destination = request.nextUrl.clone();
  destination.pathname = pathname;
  const headers = new Headers(request.headers);
  headers.set('x-story-grid-locale', locale);
  const response = NextResponse.rewrite(destination, { request: { headers } });
  response.cookies.set(localeCookie, locale, { path: '/', maxAge: oneYear, sameSite: 'lax' });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return withLocaleHeader(request, 'en', pathname.replace(/^\/en(?=\/|$)/, '') || '/');
  }
  if (pathname === '/zh-CN' || pathname.startsWith('/zh-CN/')) {
    return withLocaleHeader(request, 'zh-CN', pathname.replace(/^\/zh-CN(?=\/|$)/, '/zh') || '/zh');
  }

  if (pathname === '/zh' || pathname.startsWith('/zh/')) {
    const destination = request.nextUrl.clone();
    destination.pathname = pathname.replace(/^\/zh(?=\/|$)/, '/zh-CN') || '/zh-CN';
    return NextResponse.redirect(destination, 308);
  }

  const locale = request.cookies.get(localeCookie)?.value === 'zh-CN' ? 'zh-CN' : 'en';
  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(destination, 307);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
