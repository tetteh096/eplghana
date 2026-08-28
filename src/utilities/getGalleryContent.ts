import type { GalleryAlbum, GalleryCategory, GalleryPhoto } from '@/config/galleryPageContent'
import {
  galleryCategoryLabels,
  galleryPageContent,
} from '@/config/galleryPageContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)

/** Loose CMS album shape until payload-types are regenerated. */
type GalleryAlbumDoc = {
  id: string | number
  slug?: string | null
  title?: string | null
  category?: GalleryCategory | null
  description?: string | null
  coverImage?: unknown
  photos?: Array<{ id?: string; image?: unknown; title?: string | null; caption?: string | null }> | null
}

export type GalleryPageContent = {
  hero: {
    eyebrow: string
    title: string
    lead: string
    image: string
  }
  albumsSection: {
    eyebrow: string
    title: string
  }
  albumCtaLabel: string
  photosSection: {
    eyebrow: string
    emptyText: string
  }
  backToGalleryLabel: string
  albums: GalleryAlbum[]
}

function mapPhoto(row: any, fallback?: GalleryPhoto, index = 0): GalleryPhoto | null {
  const image = getMediaUrl(row?.image) || fallback?.image || ''
  if (!image) return null
  return {
    id: String(row?.id ?? fallback?.id ?? `photo-${index}`),
    title: txt(row?.title, fallback?.title ?? 'Photo'),
    caption: row?.caption?.trim() || fallback?.caption,
    image,
  }
}

function mapAlbumDoc(doc: GalleryAlbumDoc, fallback?: GalleryAlbum): GalleryAlbum | null {
  const category = (doc.category || fallback?.category || 'events') as GalleryCategory
  const fallbackPhotos = fallback?.photos ?? []
  const photos = (Array.isArray(doc.photos) ? doc.photos : [])
    .map((row, i) => mapPhoto(row, fallbackPhotos[i], i))
    .filter(Boolean) as GalleryPhoto[]

  const coverImage =
    getMediaUrl(doc.coverImage as Parameters<typeof getMediaUrl>[0]) ||
    photos[0]?.image ||
    fallback?.coverImage ||
    ''

  if (!coverImage && photos.length === 0) return null

  return {
    id: String(doc.id),
    slug: doc.slug || fallback?.slug || String(doc.id),
    title: txt(doc.title, fallback?.title ?? 'Album'),
    category,
    categoryLabel: galleryCategoryLabels[category] ?? category,
    description: txt(doc.description, fallback?.description ?? ''),
    coverImage: coverImage || photos[0]?.image || '',
    photos: photos.length ? photos : fallbackPhotos,
  }
}

function mapCmsShell(cms: Record<string, any>, d: typeof galleryPageContent) {
  return {
    hero: {
      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
      title: txt(cms.heroTitle, d.hero.title),
      lead: txt(cms.heroLead, d.hero.lead),
      image: getMediaUrl(cms.heroImage as Parameters<typeof getMediaUrl>[0]) || d.hero.image,
    },
    albumsSection: {
      eyebrow: txt(cms.albumsEyebrow, d.albumsSection.eyebrow),
      title: txt(cms.albumsTitle, d.albumsSection.title),
    },
    albumCtaLabel: txt(cms.albumCtaLabel, d.albumCtaLabel),
    photosSection: {
      eyebrow: txt(cms.photosEyebrow, d.photosSection.eyebrow),
      emptyText: txt(cms.photosEmptyText, d.photosSection.emptyText),
    },
    backToGalleryLabel: txt(cms.backToGalleryLabel, 'Back to Photo Gallery'),
  }
}

/**
 * Photo Gallery: page copy from Pages → galleryPage; albums from Gallery Albums.
 * Falls back to config defaults when CMS is empty.
 */
export async function getGalleryPageContent(): Promise<GalleryPageContent> {
  const d = galleryPageContent
  const page = await getPage('/gallery')
  const cms = ((page as Record<string, any> | null)?.galleryPage ?? {}) as Record<string, any>
  const shell = mapCmsShell(cms, d)

  const payload = await tryGetPayload()
  if (!payload) {
    return { ...shell, albums: d.albums }
  }

  try {
    const result = await payload.find({
      collection: 'gallery-albums',
      depth: 1,
      limit: 100,
      sort: 'order',
      where: { status: { equals: 'published' } },
    })

    const bySlug = new Map(d.albums.map((a) => [a.slug, a]))
    const albums = result.docs
      .map((doc) => mapAlbumDoc(toPlain(doc) as GalleryAlbumDoc, bySlug.get(doc.slug)))
      .filter(Boolean) as GalleryAlbum[]

    return {
      ...shell,
      albums: albums.length ? albums : d.albums,
    }
  } catch {
    return { ...shell, albums: d.albums }
  }
}

export async function getGalleryAlbumBySlug(
  slug: string,
): Promise<{ page: GalleryPageContent; album: GalleryAlbum } | null> {
  const page = await getGalleryPageContent()
  const album = page.albums.find((a) => a.slug === slug) ?? null
  if (!album) return null
  return { page, album }
}
