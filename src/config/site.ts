/**
 * Central SEO / site-identity config.
 *
 * Two env vars control public SEO behaviour:
 *
 *   NEXT_PUBLIC_SITE_URL        Canonical public origin used for metadataBase,
 *                               canonical URLs, Open Graph, sitemap and JSON-LD.
 *                               Defaults to the production domain so previews
 *                               still point search engines at the real site.
 *
 *   NEXT_PUBLIC_SITE_INDEXABLE  "true" lets search engines index the site.
 *                               Anything else (the default) emits noindex +
 *                               a disallow-all robots.txt. Keep this false on
 *                               Vercel preview deployments and flip it to
 *                               "true" only on the production domain.
 */

const PRODUCTION_URL = 'https://eplghana.org'

function normalizeUrl(value: string | undefined, fallback: string): string {
  const raw = (value ?? '').trim()
  if (!raw) return fallback
  // Strip any trailing slash so we can safely concatenate paths.
  return raw.replace(/\/+$/, '')
}

/** Canonical public origin (no trailing slash). */
export const SITE_URL = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL, PRODUCTION_URL)

/** Whether search engines may index this deployment. */
export const SITE_INDEXABLE =
  (process.env.NEXT_PUBLIC_SITE_INDEXABLE ?? '').trim().toLowerCase() === 'true'

export const SITE_NAME = 'Emerging Public Leaders of Ghana'
export const SITE_SHORT_NAME = 'EPL Ghana'

export const SITE_DESCRIPTION =
  'Emerging Public Leaders of Ghana (EPL Ghana) equips Africa’s brightest young professionals with the training, mentorship, and networks to lead with integrity inside Ghana’s public service.'

export const SITE_KEYWORDS = [
  'EPL Ghana',
  'Emerging Public Leaders',
  'Emerging Public Leaders of Ghana',
  'Public Service Fellowship',
  'Ghana civil service leadership',
  'public sector leadership Ghana',
  'leadership development Ghana',
  'Women on the Rise',
  'public leadership fellowship Africa',
  'good governance Ghana',
]

/** Default Open Graph / Twitter share image (absolute path under /public). */
export const SITE_OG_IMAGE = '/assets/cropped-EPL-Ghana-logo.png'

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
