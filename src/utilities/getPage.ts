import { cache } from 'react'

import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

/**
 * Fetch a single Page document by its slug (route path, e.g. '/contact').
 * Returns null when the page isn't seeded yet or the DB is unavailable, so
 * callers can fall back to their hardcoded defaults.
 */
export const getPage = cache(async (slug: string): Promise<Record<string, unknown> | null> => {
  const payload = await tryGetPayload()
  if (!payload) return null

  try {
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })
    return (toPlain(res.docs[0]) as unknown as Record<string, unknown>) ?? null
  } catch {
    return null
  }
})
