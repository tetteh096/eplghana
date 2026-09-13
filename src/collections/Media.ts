import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '@/access/anyone'
import { canEditContent } from '@/access/canEditContent'
import { DEFAULT_MEDIA_FOLDER, MEDIA_FOLDER_OPTIONS } from '@/config/mediaFolders'
import { publicTotpReadBypass } from '@/config/security'
import {
  GALLERY_MEDIA_FOLDER,
  galleryAlbumStoragePrefix,
  resolveGalleryAlbumSlug,
} from '@/utilities/galleryMediaFolder'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const mediaStaticDir = path.resolve(dirname, '../../media')

function cloudStorageEnabled(): boolean {
  const hasBucket = Boolean(
    process.env.R2_BUCKET?.trim() ||
      process.env.S3_BUCKET?.trim() ||
      process.env.R2_API?.trim() ||
      process.env.S3_API?.trim(),
  )
  if (!hasBucket) return false
  if (process.env.NODE_ENV === 'production') return true
  if (process.env.R2_DISABLE_DEV === 'true' || process.env.S3_DISABLE_DEV === 'true') return false
  // Dev: use R2 whenever configured so uploads/serve stay consistent.
  return true
}

/** Strip spaces and unsafe characters so local + R2 keys stay URL-safe. */
function sanitizeUploadName(name: string): string {
  const trimmed = name.trim()
  const dot = trimmed.lastIndexOf('.')
  const base = (dot > 0 ? trimmed.slice(0, dot) : trimmed)
    .normalize('NFKD')
    .replace(/[^\w.\-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
  const ext = dot > 0 ? trimmed.slice(dot).toLowerCase().replace(/[^\w.]/g, '') : ''
  return `${base || 'upload'}${ext}`
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description:
      'Photos, logos, and documents. For the Photo Gallery: create an album in Gallery Albums, then upload here and choose that album — images appear on /gallery automatically.',
    defaultColumns: ['filename', 'galleryAlbum', 'folder', 'alt', 'updatedAt'],
    components: {
      views: {
        list: {
          Component: '/components/admin/MediaListView#MediaListView',
        },
      },
    },
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: anyone,
    update: canEditContent,
  },
  custom: publicTotpReadBypass,
  upload: {
    staticDir: mediaStaticDir,
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/avif',
      'image/svg+xml',
      'application/pdf',
    ],
  },
  fields: [
    {
      name: 'galleryAlbum',
      type: 'relationship',
      relationTo: 'gallery-albums',
      admin: {
        position: 'sidebar',
        description:
          'Link this file to a Photo Gallery album. Uploads are stored in that album’s folder and appear on the website.',
      },
    },
    {
      name: 'galleryOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => Boolean(siblingData?.galleryAlbum),
        description: 'Lower numbers appear first inside the album.',
      },
    },
    {
      name: 'folder',
      type: 'select',
      required: true,
      defaultValue: DEFAULT_MEDIA_FOLDER,
      options: [...MEDIA_FOLDER_OPTIONS],
      admin: {
        position: 'sidebar',
        description:
          'Storage folder in R2. When a Gallery album is selected, this is set to Photo Gallery automatically.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file?.name) {
          req.file.name = sanitizeUploadName(req.file.name)
        }
      },
    ],
    beforeChange: [
      async ({ data, req, operation }) => {
        if (!data) return data

        if (data.galleryAlbum && req?.payload) {
          const slug = await resolveGalleryAlbumSlug(req.payload, data.galleryAlbum)
          if (slug) {
            data.folder = GALLERY_MEDIA_FOLDER
            if (operation === 'create' && cloudStorageEnabled()) {
              data.prefix = galleryAlbumStoragePrefix(slug)
            }
          }
        } else if (operation === 'create' && cloudStorageEnabled()) {
          if (data.folder && data.folder !== GALLERY_MEDIA_FOLDER) {
            data.prefix = data.folder
          } else if (data.folder === GALLERY_MEDIA_FOLDER && !data.galleryAlbum) {
            data.prefix = GALLERY_MEDIA_FOLDER
          }
        }

        return data
      },
    ],
  },
}
