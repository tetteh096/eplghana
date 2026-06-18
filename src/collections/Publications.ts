import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublishedOrVisible } from '@/access/authenticatedOrPublishedOrVisible'
import { publicTotpReadBypass } from '@/config/security'

/**
 * Annual impact reports and research PDFs for the Annual Reports page.
 */
export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: { singular: 'Publication', plural: 'Publications' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'status', 'order'],
    description:
      'Upload PDFs for annual reports and research documents. Shown on /knowledge-products/annual-reports.',
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'research',
      options: [
        { label: 'Annual / Impact Report', value: 'annual-report' },
        { label: 'Research & Impact Document', value: 'research' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'year',
      type: 'text',
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData?.category === 'annual-report',
        description: 'e.g. 2024',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover image',
      admin: {
        condition: (_, siblingData) => siblingData?.category === 'annual-report',
        description: 'Shown on the report card (book cover style).',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'PDF file',
      admin: {
        description: 'Upload the downloadable PDF. Required when status is Published.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first within each section.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'coming-soon',
      options: [
        { label: 'Coming soon', value: 'coming-soon' },
        { label: 'Published (download available)', value: 'published' },
        { label: 'Draft (hidden)', value: 'draft' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
