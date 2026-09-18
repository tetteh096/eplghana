import type { GlobalConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { publicTotpReadBypass } from '@/config/security'

/**
 * Site footer, editable in the admin under the "Footer" door.
 * Manages the footer link columns, the short about paragraph, and the
 * copyright line. Logo, tagline fallback, contact details and social links
 * still come from Site Settings.
 *
 * Read on the frontend via getFooter(); falls back to these defaults when the
 * global is empty. Pre-filled via field `defaultValue` so it opens populated.
 */

const defaultColumns = [
  {
    title: 'Explore',
    links: [
      { label: 'About', url: '/about' },
      { label: 'Projects', url: '/projects' },
      { label: 'Impact', url: '/impact' },
      { label: 'Community', url: '/community' },
    ],
  },
  {
    title: 'Engage',
    links: [
      { label: 'News & Insights', url: '/news' },
      { label: 'Get Involved', url: '/get-involved' },
      { label: 'Partner With Us', url: '/community/partners' },
      { label: 'Donate', url: '/donate' },
      { label: 'Contact Us', url: '/contact' },
    ],
  },
]

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    livePreview: {
      url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    },
  },
  access: {
    read: () => true,
    update: canEditContent,
  },
  custom: publicTotpReadBypass,
  fields: [
    {
      name: 'aboutText',
      type: 'textarea',
      label: 'About paragraph',
      admin: {
        description:
          'Short text under the footer logo. Leave blank to use the Site Settings tagline.',
      },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Link columns',
      labels: { singular: 'Column', plural: 'Columns' },
      defaultValue: defaultColumns,
      admin: {
        description: 'The lists of links in the footer (e.g. Quick Links, Our Programs).',
        initCollapsed: true,
        components: {
          RowLabel: '/globals/rowLabels/FooterColumnLabel#FooterColumnLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          labels: { singular: 'Link', plural: 'Links' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'stayConnectedTitle',
      type: 'text',
      label: 'Newsletter heading',
      defaultValue: 'Stay Connected',
    },
    {
      name: 'stayConnectedIntro',
      type: 'text',
      label: 'Newsletter introduction',
      defaultValue: 'Stay connected with EPL Ghana.',
    },
    {
      name: 'stayConnectedText',
      type: 'text',
      label: 'Newsletter description',
      defaultValue: 'Updates on programmes, Fellows and events.',
    },
    {
      name: 'subscribeLabel',
      type: 'text',
      label: 'Subscribe button label',
      defaultValue: 'Subscribe',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Footer location',
      defaultValue: 'Accra, Ghana',
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright line',
      defaultValue: '© {year} Emerging Public Leaders of Ghana. All rights reserved',
      admin: {
        description: 'Use {year} and it will be replaced with the current year automatically.',
      },
    },
  ],
}
