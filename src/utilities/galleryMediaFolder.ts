/** Storage folder value for gallery uploads in the Media library. */
export const GALLERY_MEDIA_FOLDER = 'gallery' as const

/** R2 prefix for a specific gallery album, e.g. gallery/events-annual-summits */
export function galleryAlbumStoragePrefix(slug: string): string {
  return `${GALLERY_MEDIA_FOLDER}/${slug}`
}

export function resolveRelationId(value: unknown): string | null {
  if (!value) return null
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  if (typeof value === 'object' && value !== null && 'id' in value) {
    const id = (value as { id?: unknown }).id
    if (typeof id === 'string' || typeof id === 'number') return String(id)
  }
  return null
}

export async function resolveGalleryAlbumSlug(
  payload: {
    findByID: (args: { collection: 'gallery-albums'; id: string; depth: number }) => Promise<{ slug?: string | null }>
  },
  galleryAlbum: unknown,
): Promise<string | null> {
  const albumId = resolveRelationId(galleryAlbum)
  if (!albumId) return null
  try {
    const album = await payload.findByID({
      collection: 'gallery-albums',
      id: albumId,
      depth: 0,
    })
    return album?.slug?.trim() || null
  } catch {
    return null
  }
}
