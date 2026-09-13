import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

function safeRevalidatePath(path: string, type?: 'layout' | 'page') {
  try {
    if (type) revalidatePath(path, type)
    else revalidatePath(path)
  } catch {
    // Outside a Next.js request (e.g. `payload run` seeds) there is no static
    // generation store — skip cache busting rather than failing the write.
  }
}

/** Invalidate cached HTML for the entire public site (all routes under the frontend layout). */
export function revalidatePublicSitePaths() {
  safeRevalidatePath('/', 'layout')
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
      safeRevalidatePath(slug === '/' ? '/' : slug)
      break
    case 'projects': {
      safeRevalidatePath('/projects')
      safeRevalidatePath(`/projects/${slug}`)
      safeRevalidatePath('/')
      // Programme pages are reachable by multiple slug aliases.
      if (
        slug === 'elevated-minds' ||
        slug === 'epl-in-maritime' ||
        slug === 'eplim' ||
        slug === 'maritime'
      ) {
        safeRevalidatePath('/projects/elevated-minds')
        safeRevalidatePath('/projects/epl-in-maritime')
        safeRevalidatePath('/projects/eplim')
        safeRevalidatePath('/projects/maritime')
      }
      break
    }
    case 'news':
      safeRevalidatePath('/news')
      safeRevalidatePath(`/news/${slug}`)
      safeRevalidatePath('/')
      break
    case 'events':
      safeRevalidatePath('/news/events')
      safeRevalidatePath(`/events/${slug}`)
      safeRevalidatePath('/')
      break
    case 'fellows':
      safeRevalidatePath('/community/current-fellows')
      safeRevalidatePath('/impact')
      safeRevalidatePath('/')
      break
    case 'cohorts':
      safeRevalidatePath('/community/current-fellows')
      break
    case 'impact-interventions':
      safeRevalidatePath('/impact')
      break
    case 'alumni':
      safeRevalidatePath('/community/alumni')
      break
    case 'partners':
      safeRevalidatePath('/community/partners')
      break
    case 'team':
      safeRevalidatePath('/about/team')
      break
    case 'publications':
      safeRevalidatePath('/knowledge-products')
      safeRevalidatePath('/knowledge-products/annual-reports')
      safeRevalidatePath('/knowledge-products/newsletter')
      break
    case 'testimonials':
      safeRevalidatePath('/')
      break
    default:
      break
  }

  return doc
}

export const revalidatePublicSiteGlobal: GlobalAfterChangeHook = () => {
  revalidatePublicSitePaths()
}
