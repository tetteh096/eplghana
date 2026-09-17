import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublishedOrVisible } from '@/access/authenticatedOrPublishedOrVisible'
import { publicTotpReadBypass } from '@/config/security'

/** Photo gallery albums on /gallery. Link uploads via Media → Gallery album. */
export const GalleryAlbums: CollectionConfig = {
  slug: 'gallery-albums',
  labels: { singular: 'Gallery Album', plural: 'Gallery Albums' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'status'],
    description:
      'Create a named photo folder for the gallery. Upload images in Media → choose this album. Visitors open the album on /gallery.',
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: authenticatedOrPublishedOrVisible,
    update: canEditContent,
  },
  custom: publicTotpReadBypass,
  fields: [
    {
      name: 'uploadHint',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/GalleryAlbumUploadHint#GalleryAlbumUploadHint',
        },
      },
    },
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path under /gallery/, e.g. events-annual-summits',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'events',
      options: [
        { label: 'Events', value: 'events' },
        { label: 'Training', value: 'training' },
        { label: 'Programmes', value: 'programmes' },
        { label: 'Fellows Community Engagement', value: 'fellows-community' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover image',
      admin: {
        description: 'Shown on the albums grid. If empty, the first linked or manual photo is used.',
      },
    },
    {
      name: 'photos',
      type: 'array',
      labels: { singular: 'Manual photo', plural: 'Manual photos (optional)' },
      admin: {
        description:
          'Optional extras. Most albums are managed by uploading to Media and selecting this album in the Gallery album field.',
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first on the gallery page.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft (hidden)', value: 'draft' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
