import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublishedOrVisible } from '@/access/authenticatedOrPublishedOrVisible'
import { publicTotpReadBypass } from '@/config/security'

/**
 * Publications for annual reports and Research & Publications pages.
 */
export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: { singular: 'Publication', plural: 'Publications' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'status', 'order'],
    description:
      'Annual reports plus research categories (articles, factsheets, studies, policy briefs) shown on /research.',
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
      name: 'slug',
      type: 'text',
      admin: {
        description: 'URL slug for research detail pages. Auto-derived from title if empty.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'Short summary shown on listing cards.' },
    },
    {
      name: 'body',
      type: 'textarea',
      admin: {
        description: 'Longer write-up for the detail page. Falls back to description if empty.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'studies',
      options: [
        { label: 'Annual / Impact Report', value: 'annual-report' },
        { label: 'Articles', value: 'articles' },
        { label: 'Factsheets', value: 'factsheets' },
        { label: 'Studies', value: 'studies' },
        { label: 'Technical and Policy Briefs', value: 'technical-policy-briefs' },
        { label: 'Research (legacy → Studies)', value: 'research' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'year',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'e.g. 2024',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover / card image',
      admin: {
        description: 'Shown on research cards and detail pages.',
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'PDF file',
      admin: {
        description: 'Optional downloadable PDF.',
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
