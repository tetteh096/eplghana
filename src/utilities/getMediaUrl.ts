import type { Media } from '@/payload-types'

export function getMediaUrl(
  media: string | number | Media | null | undefined,
): string | null {
  if (!media || typeof media === 'number' || typeof media === 'string') return null
  return media.url ?? null
}
