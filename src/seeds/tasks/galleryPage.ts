import type { Payload } from 'payload'

import { galleryPageContent } from '@/config/galleryPageContent'

import { createImageImporter, updatePageBySlug } from '../utils'

const TAG = 'gallery-page'

export async function seedGalleryPage(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)
  const d = galleryPageContent

  const galleryPage = {
    heroEyebrow: d.hero.eyebrow,
    heroTitle: d.hero.title,
    heroLead: d.hero.lead,
    heroImage: await importImage(d.hero.image, 'EPL Ghana photo gallery'),
    albumsEyebrow: d.albumsSection.eyebrow,
    albumsTitle: d.albumsSection.title,
    albumCtaLabel: d.albumCtaLabel,
    photosEyebrow: d.photosSection.eyebrow,
    photosEmptyText: d.photosSection.emptyText,
    backToGalleryLabel: 'Back to Photo Gallery',
  }

  await updatePageBySlug(payload, '/gallery', { galleryPage }, TAG)
}
