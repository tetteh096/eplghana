import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

/** Invalidate cached HTML for the entire public site (all routes under the frontend layout). */
export function revalidatePublicSitePaths() {
  revalidatePath('/', 'layout')
}

/**
 * Backup cache-bust when CMS content is saved. The public site uses
 * `dynamic = 'force-dynamic'` so pages normally read fresh data every request;
 * this hook covers any edge cache that still exists in production.
 */
export const revalidatePublicSite: CollectionAfterChangeHook = ({ doc, collection }) => {
  revalidatePublicSitePaths()

  const slug = typeof doc?.slug === 'string' ? doc.slug : null
  if (!slug || !collection?.slug) return doc

  switch (collection.slug) {
    case 'pages':
      revalidatePath(slug === '/' ? '/' : slug)
      break
    case 'projects':
      revalidatePath('/projects')
      revalidatePath(`/projects/${slug}`)
      revalidatePath('/')
      break
    case 'news':
      revalidatePath('/news')
      revalidatePath(`/news/${slug}`)
      revalidatePath('/')
      break
    case 'events':
      revalidatePath('/news/events')
      revalidatePath(`/events/${slug}`)
      revalidatePath('/')
      break
    case 'fellows':
      revalidatePath('/community/current-fellows')
      revalidatePath('/')
      break
    case 'alumni':
      revalidatePath('/community/alumni')
      break
    case 'partners':
      revalidatePath('/community/partners')
      break
    case 'team':
      revalidatePath('/about/team')
      break
    case 'publications':
      revalidatePath('/knowledge-products')
      revalidatePath('/knowledge-products/annual-reports')
      revalidatePath('/knowledge-products/newsletter')
      break
    case 'testimonials':
      revalidatePath('/')
      break
    default:
      break
  }

  return doc
}

export const revalidatePublicSiteGlobal: GlobalAfterChangeHook = () => {
  revalidatePublicSitePaths()
}
