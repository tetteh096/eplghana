import { cache } from 'react'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'

/**
 * Loads the Page Banners global once per request (React cache) and returns a
 * map of page title → background image URL.
 */
const loadPageBanners = cache(async (): Promise<Record<string, string>> => {
  const payload = await tryGetPayload()
  if (!payload) return {}

  try {
    const global = await payload.findGlobal({ slug: 'page-banners', depth: 1 })
    const map: Record<string, string> = {}

    for (const row of global?.banners ?? []) {
      const url = getMediaUrl(row.image)
      if (row.page && url) map[row.page] = url
    }

    return map
  } catch {
    return {}
  }
})

/** Background image for a page's top banner, matched by its title. */
export async function getPageBanner(title: string): Promise<string | null> {
  const map = await loadPageBanners()
  return map[title] ?? null
}
