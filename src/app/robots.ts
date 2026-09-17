import type { MetadataRoute } from 'next'

import { absoluteUrl, SITE_INDEXABLE } from '@/config/site'

/**
 * /robots.txt
 *
 * While NEXT_PUBLIC_SITE_INDEXABLE is not "true" (e.g. Vercel preview
 * deployments) we disallow everything so the staging URL never gets indexed.
 * On the production domain set NEXT_PUBLIC_SITE_INDEXABLE=true to open it up.
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE_INDEXABLE) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Never index CMS admin, internal APIs, or Next internals.
        disallow: ['/admin', '/api/', '/_next/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
