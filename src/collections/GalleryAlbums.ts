import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublishedOrVisible } from '@/access/authenticatedOrPublishedOrVisible'
import { publicTotpReadBypass } from '@/config/security'

/**
 * Photo gallery albums shown on /gallery. Each album has its own page at /gallery/[slug].
 */
export const GalleryAlbums: CollectionConfig = {
  slug: 'gallery-albums',
  labels: { singular: 'Gallery Album', plural: 'Gallery Albums' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'status'],
    description:
      'Photo folders for the Photo Gallery. Visitors open an album to browse all photos, then click a photo to view it.',
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: authenticatedOrPublishedOrVisible,
    update: canEditContent,
  },
  custom: publicTotpReadBypass,
  fields: [
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
        description: 'Shown on the albums grid. If empty, the first photo is used.',
      },
    },
    {
      name: 'photos',
      type: 'array',
      labels: { singular: 'Photo', plural: 'Photos' },
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
