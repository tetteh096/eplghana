import type { Payload } from 'payload'

import type { Media } from '@/payload-types'

/**
 * Encode `/api/media/file/...` path segments so spaces and special characters
 * resolve correctly in both <img src> and CSS url().
 */
export function encodeMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null

  const marker = '/api/media/file/'
  const idx = url.indexOf(marker)
  if (idx === -1) return url

  const base = url.slice(0, idx + marker.length)
  const rest = url.slice(idx + marker.length)
  const encoded = rest
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      try {
        return encodeURIComponent(decodeURIComponent(segment))
      } catch {
        return encodeURIComponent(segment)
      }
    })
    .join('/')

  return `${base}${encoded}`
}

export function getMediaUrl(
  media: string | number | Media | null | undefined,
): string | null {
  if (!media || typeof media === 'number' || typeof media === 'string') return null
  return encodeMediaUrl(media.url ?? null)
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
    return encodeMediaUrl(doc?.url ?? null)
  } catch {
    return null
  }
}
