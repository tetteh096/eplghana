import type { Payload } from 'payload'

import type { Media } from '@/payload-types'

export function getMediaUrl(
  media: string | number | Media | null | undefined,
): string | null {
  if (!media || typeof media === 'number' || typeof media === 'string') return null
  return media.url ?? null
}

/** Resolve a media upload field to a public URL (handles ID-only values from CMS). */
export async function resolveMediaUrl(
  media: string | number | Media | null | undefined,
  payload: Payload | null,
): Promise<string | null> {
  const direct = getMediaUrl(media)
  if (direct) return direct

  if (!payload || media == null) return null

  const id =
    typeof media === 'string' || typeof media === 'number' ? String(media) : null
  if (!id) return null

  try {
    const doc = await payload.findByID({
      collection: 'media',
      id,
      depth: 0,
    })
    return doc?.url ?? null
  } catch {
    return null
  }
}
