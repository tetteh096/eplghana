import type { Payload } from 'payload'

import { galleryPageContent, type GalleryPhoto } from '@/config/galleryPageContent'

import { createImageImporter } from '../utils'

const TAG = 'gallery-albums'

export async function seedGalleryAlbums(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)
  const d = galleryPageContent

  for (let order = 0; order < d.albums.length; order++) {
    const album = d.albums[order]
    const existing = await payload.find({
      collection: 'gallery-albums',
      where: { slug: { equals: album.slug } },
      limit: 1,
    })

    const coverImage = await importImage(album.coverImage, album.title)
    const photos = (
      await Promise.all(
        album.photos.map(async (photo: GalleryPhoto) => {
          const image = await importImage(photo.image, photo.title)
          if (!image) return null
          return {
            image,
            title: photo.title,
            caption: photo.caption ?? '',
          }
        }),
      )
    ).filter((photo): photo is { image: string; title: string; caption: string } => photo !== null)

    const data = {
      title: album.title,
      slug: album.slug,
      category: album.category,
      description: album.description,
      coverImage,
      photos,
      order,
      status: 'published' as const,
    }

    if (existing.docs.length) {
      await payload.update({
        collection: 'gallery-albums',
        id: existing.docs[0].id,
        data,
      })
      payload.logger.info(`[${TAG}] updated ${album.slug}`)
    } else {
      await payload.create({
        collection: 'gallery-albums',
        data,
      })
      payload.logger.info(`[${TAG}] created ${album.slug}`)
    }
  }
}
