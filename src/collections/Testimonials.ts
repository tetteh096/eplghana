import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { publicTotpReadBypass } from '@/config/security'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'featured', 'order', 'status'],
    description:
      'Published testimonials appear on the Impact page and the All Testimonials page. Featured entries also appear on the homepage.',
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: authenticatedOrPublished,
    update: canEditContent,
  },
  custom: publicTotpReadBypass,
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: { description: 'e.g. Fellow, Ministry of Finance' },
    },
    {
      name: 'cohort',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'e.g. Cohort 3. Shown next to the name on the homepage impact story cards.',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: { description: 'The testimonial text shown in the slider.' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Portrait photo, square or portrait works best.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on the homepage fellow testimonials section.',
      },
    },
    {
      name: 'storyHref',
      type: 'text',
      label: 'Read Story link',
      admin: {
        position: 'sidebar',
        description:
          'Where the "Read Their Story" button goes when this is the top featured story on the homepage. Leave blank to link to the general stories page.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft (hidden)', value: 'draft' },
        { label: 'Published (live)', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
