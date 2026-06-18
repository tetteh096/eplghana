import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Next 16 renamed the "middleware" file convention to "proxy" — same behaviour,
 * the export is just named `proxy` now. This does two jobs:
 *
 *  1. /admin/*  — sets `x-pathname` so payload-totp can read the current path
 *     during server-side auth redirects (prevents redirect loops). The admin
 *     panel is intentionally left OUT of the strict CSP below: Payload's UI
 *     (monaco editor, inline styles/workers) needs allowances a nonce CSP
 *     would break.
 *
 *  2. Everything else (the public frontend) — attaches a per-request nonce and
 *     a Content-Security-Policy. Set CSP_REPORT_ONLY=true to observe violations
 *     without blocking (check the browser console), then remove it to enforce.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next()
    response.headers.set('x-pathname', pathname)
    return response
  }

  const nonce = crypto.randomUUID().replace(/-/g, '')
  const isProd = process.env.NODE_ENV === 'production'
  const reportOnly = process.env.CSP_REPORT_ONLY === 'true'

  const csp = [
    `default-src 'self'`,
    // Framework + vendor scripts. Next attaches the nonce to its own inline
    // bootstrap; the /assets/* vendor scripts are same-origin ('self').
    `script-src 'self' 'nonce-${nonce}'`,
    // 'unsafe-inline' is required for framer-motion's injected styles and inline
    // style attributes; nonces don't cover those. Google Fonts stylesheet too.
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    // R2/CDN media domains vary; allow any https image + data/blob previews.
    `img-src 'self' data: blob: https:`,
    `font-src 'self' https://fonts.gstatic.com data:`,
    `connect-src 'self'`,
    // Google Maps embed on the contact page.
    `frame-src 'self' https://www.google.com`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'self'`,
    // Only upgrade in prod — on http://localhost this would break dev assets.
    ...(isProd ? [`upgrade-insecure-requests`] : []),
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  // Next reads the CSP off the request to wire the nonce into its scripts.
  requestHeaders.set('Content-Security-Policy', csp)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
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
