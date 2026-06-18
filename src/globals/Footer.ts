import type { GlobalConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { publicTotpReadBypass } from '@/config/security'
import { footerLinks } from '../config/navigation'

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
    title: 'Quick Links',
    links: footerLinks.useful.map((l) => ({ label: l.label, url: l.href })),
  },
  {
    title: 'Our Programs',
    links: [
      { label: 'Public Service Fellowship', url: '/projects/public-service-fellowship' },
      { label: 'Women On The Rise', url: '/projects/women-on-the-rise' },
      { label: 'P.E.A.C.E', url: '/projects/peace' },
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
