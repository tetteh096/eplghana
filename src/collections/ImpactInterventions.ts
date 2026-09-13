import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { publicTotpReadBypass } from '@/config/security'

/**
 * Grassroots intervention highlights shown on the Impact page.
 * Create entries here; published items appear automatically in Community Stories.
 */
export const ImpactInterventions: CollectionConfig = {
  slug: 'impact-interventions',
  labels: { singular: 'Impact Intervention', plural: 'Impact Interventions' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'region', 'assembly', 'order', 'status'],
    description:
      'Community intervention cards on /impact. Add a story here and publish it to show it on the site.',
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
      admin: { description: 'Headline for the intervention card.' },
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        description: 'URL slug for the story detail page. Derived from assembly/title if empty.',
      },
    },
    {
      name: 'region',
      type: 'text',
      required: true,
      admin: { description: 'e.g. Greater Accra Region' },
    },
    {
      name: 'assembly',
      type: 'text',
      required: true,
      admin: { description: 'Municipal assembly or locality, e.g. Kpone Katamanso' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'Short summary shown on the card.' },
    },
    {
      name: 'body',
      type: 'textarea',
      admin: {
        description: 'Full story for the detail page. Falls back to description if empty.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional photo for the community card on /impact.' },
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
