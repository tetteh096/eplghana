import type { GlobalConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { publicTotpReadBypass } from '@/config/security'
import { PAGE_BANNER_OPTIONS } from '@/config/pageBanners'

/**
 * Page Banners — choose a background photo for each page's blue top banner.
 *
 * The banner keeps its blue overlay on top of whatever photo you pick, so the
 * heading stays readable and on-brand. Any page left out here simply shows the
 * solid blue banner as before.
 */
export const PageBanners: GlobalConfig = {
  slug: 'page-banners',
  label: 'Page Banners',
  admin: {
    description:
      'Add a background photo to a page’s top banner. The blue overlay stays on top, so any photo still looks on-brand. Pages without a photo here stay solid blue.',
  },
  access: {
    read: () => true,
    update: canEditContent,
  },
  custom: publicTotpReadBypass,
  fields: [
    {
      name: 'banners',
      type: 'array',
      labels: { singular: 'Page banner', plural: 'Page banners' },
      admin: {
        description: 'Pick a page, then upload the photo for its top banner.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'page',
          type: 'select',
          required: true,
          options: [...PAGE_BANNER_OPTIONS],
          admin: {
            description: 'The page whose banner this photo is for.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Wide landscape photo works best (it is cropped to fill the banner).',
          },
        },
      ],
    },
  ],
}
