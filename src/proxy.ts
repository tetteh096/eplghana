import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Next 16 renamed the "middleware" file convention to "proxy" — same behaviour.
 * Two jobs:
 *
 *  1. /admin/*  — sets `x-pathname` so payload-totp can read the current path
 *     during server-side auth redirects (prevents redirect loops). No CSP here;
 *     the Payload admin UI (monaco, workers, inline styles) needs allowances a
 *     strict CSP would break.
 *
 *  2. Everything else (the public frontend) — a static Content-Security-Policy.
 *     NOTE: we intentionally do NOT use a per-request nonce. The frontend is
 *     statically pre-rendered, so Next bakes its inline scripts at build time
 *     with no nonce; a nonce CSP would then block them and break hydration.
 *     `script-src 'unsafe-inline'` is the standard trade-off for static Next
 *     sites — the remaining directives (object-src none, base-uri/form-action
 *     self, restricted img/style/font/connect/frame origins) still apply.
 *     CSP is skipped entirely in development: Next dev (react-refresh, HMR)
 *     needs `unsafe-eval`, which we don't want in production.
 *     Set CSP_REPORT_ONLY=true to observe without enforcing.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-pathname', pathname)
    const response = NextResponse.next({ request: { headers: requestHeaders } })
    response.headers.set('x-pathname', pathname)
    return response
  }

  const isProd = process.env.NODE_ENV === 'production'
  if (!isProd) {
    return NextResponse.next()
  }

  const reportOnly = process.env.CSP_REPORT_ONLY === 'true'

  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-inline'`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `img-src 'self' data: blob: https:`,
    `font-src 'self' https://fonts.gstatic.com data:`,
    `connect-src 'self'`,
    `frame-src 'self' https://www.google.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'self'`,
    // Only upgrade in prod — on http://localhost this would break dev assets.
    ...(isProd ? [`upgrade-insecure-requests`] : []),
  ].join('; ')

  const response = NextResponse.next()
  response.headers.set(
    reportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy',
    csp,
  )
  return response
}

/**
 * Run on all routes except Next internals, the API, and static asset folders.
 * Admin is included so payload-totp keeps getting `x-pathname`.
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml).*)'],
}
