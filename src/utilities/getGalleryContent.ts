import type { GalleryAlbum, GalleryCategory, GalleryPhoto } from '@/config/galleryPageContent'
import {
  galleryCategoryLabels,
  galleryPageContent,
} from '@/config/galleryPageContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { resolveRelationId } from '@/utilities/galleryMediaFolder'
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

type GalleryMediaDoc = {
  id: string | number
  alt?: string | null
  filename?: string | null
  galleryAlbum?: unknown
  galleryOrder?: number | null
  url?: string | null
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

function photoTitleFromMedia(doc: GalleryMediaDoc): string {
  if (doc.alt?.trim()) return doc.alt.trim()
  const filename = doc.filename?.trim()
  if (!filename) return 'Photo'
  return filename.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim() || 'Photo'
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

function mapMediaPhoto(doc: GalleryMediaDoc): GalleryPhoto | null {
  const image = doc.url?.trim() || getMediaUrl(doc as Parameters<typeof getMediaUrl>[0]) || ''
  if (!image) return null
  return {
    id: String(doc.id),
    title: photoTitleFromMedia(doc),
    image,
  }
}

function mergeAlbumPhotos(linked: GalleryPhoto[], manual: GalleryPhoto[]): GalleryPhoto[] {
  const seen = new Set<string>()
  const merged: GalleryPhoto[] = []

  for (const photo of [...linked, ...manual]) {
    if (seen.has(photo.image)) continue
    seen.add(photo.image)
    merged.push(photo)
  }

  return merged
}

function mapAlbumDoc(
  doc: GalleryAlbumDoc,
  linkedPhotos: GalleryPhoto[],
  fallback?: GalleryAlbum,
): GalleryAlbum | null {
  const category = (doc.category || fallback?.category || 'events') as GalleryCategory
  const fallbackPhotos = fallback?.photos ?? []
  const manualPhotos = (Array.isArray(doc.photos) ? doc.photos : [])
    .map((row, i) => mapPhoto(row, fallbackPhotos[i], i))
    .filter(Boolean) as GalleryPhoto[]

  const photos = mergeAlbumPhotos(linkedPhotos, manualPhotos)

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

async function loadLinkedGalleryPhotos(payload: NonNullable<Awaited<ReturnType<typeof tryGetPayload>>>) {
  const byAlbum = new Map<string, GalleryPhoto[]>()

  try {
    const result = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 500,
      sort: 'galleryOrder',
      where: {
        galleryAlbum: { exists: true },
      },
    })

    for (const raw of result.docs) {
      const doc = toPlain(raw) as GalleryMediaDoc & { mimeType?: string | null }
      const albumId = resolveRelationId(doc.galleryAlbum)
      if (!albumId) continue
      if (doc.mimeType && !doc.mimeType.startsWith('image/')) continue

      const photo = mapMediaPhoto(doc)
      if (!photo) continue

      const list = byAlbum.get(albumId) ?? []
      list.push(photo)
      byAlbum.set(albumId, list)
    }
  } catch {
    // keep manual photos only
  }

  return byAlbum
}

/**
 * Photo Gallery: page copy from Pages → galleryPage; albums from Gallery Albums.
 * Album photos come from Media linked to each album, plus optional manual rows.
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
    const linkedByAlbum = await loadLinkedGalleryPhotos(payload)

    const result = await payload.find({
      collection: 'gallery-albums',
      depth: 1,
      limit: 100,
      sort: 'order',
      where: { status: { equals: 'published' } },
    })

    const bySlug = new Map(d.albums.map((a) => [a.slug, a]))
    const albums = result.docs
      .map((doc) => {
        const plain = toPlain(doc) as GalleryAlbumDoc
        const linked = linkedByAlbum.get(String(plain.id)) ?? []
        return mapAlbumDoc(plain, linked, bySlug.get(doc.slug))
      })
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
