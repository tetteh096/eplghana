import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { publicTotpReadBypass } from '@/config/security'

const storySlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/**
 * Grassroots intervention highlights shown on the Impact page.
 * Create entries here; published items appear automatically in Community Stories.
 */
export const ImpactInterventions: CollectionConfig = {
  slug: 'impact-interventions',
  labels: { singular: 'Community Story', plural: 'Community Stories' },
  admin: {
    useAsTitle: 'assembly',
    defaultColumns: ['assembly', 'region', 'title', 'order', 'status'],
    description:
      'Add, edit, and publish the Community Stories shown on /impact. Each published story gets its own readable detail page.',
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: authenticatedOrPublished,
    update: canEditContent,
  },
  custom: publicTotpReadBypass,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Focus area or category',
      admin: { description: 'For example: Quality Education & Disability Inclusion.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Page URL. It is generated from the location or title when left empty.',
      },
      hooks: {
        beforeValidate: [
          ({ siblingData, value }) =>
            storySlug(
              (typeof value === 'string' && value.trim()) ||
                (typeof siblingData?.assembly === 'string' && siblingData.assembly.trim()) ||
                (typeof siblingData?.title === 'string' && siblingData.title.trim()) ||
                'community-story',
            ),
        ],
      },
    },
    {
      name: 'region',
      type: 'text',
      required: true,
      label: 'Location',
      admin: { description: 'For example: North Tongu District, Volta Region.' },
    },
    {
      name: 'assembly',
      type: 'text',
      required: true,
      label: 'Story headline',
      admin: { description: 'For example: Inclusive Education Implementation Project.' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Card summary',
      admin: { description: 'A short introduction shown on the Impact page card.' },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      label: 'Full story',
      admin: {
        description: 'The full story shown after a visitor opens this community story.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Featured image shown on both the Impact card and story page.' },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first on the Impact page.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft (hidden)', value: 'draft' },
        { label: 'Published (live)', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
