import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { canEditContent } from '@/access/canEditContent'
import { DEFAULT_MEDIA_FOLDER, MEDIA_FOLDER_OPTIONS } from '@/config/mediaFolders'
import { publicTotpReadBypass } from '@/config/security'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description:
      'Photos, logos, and documents. Pick a folder so uploads land in the right place in R2 (blog, fellows, alumni, etc.).',
    defaultColumns: ['filename', 'folder', 'alt', 'updatedAt'],
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
    // Allowlist what can be uploaded. Staff-only (create is canEditContent), but
    // this stops a compromised/curious account from storing arbitrary file types
    // (e.g. .html/.js) in the public media bucket.
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
      name: 'folder',
      type: 'select',
      required: true,
      defaultValue: DEFAULT_MEDIA_FOLDER,
      options: [...MEDIA_FOLDER_OPTIONS],
      admin: {
        position: 'sidebar',
        description: 'Storage folder in R2. New uploads are saved under this path.',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Only set R2 path prefix on new uploads — don't rewrite migrated flat files.
        if (operation === 'create' && data?.folder) {
          data.prefix = data.folder
        }
        return data
      },
    ],
  },
}
