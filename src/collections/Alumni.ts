import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { publicTotpReadBypass } from '@/config/security'

/**
 * Alumni, EPLAN / PSFN members on the EPLAN page.
 * Use showInStories and showInFeatured to control which sections each entry appears in.
 */
export const Alumni: CollectionConfig = {
  slug: 'alumni',
  labels: { singular: 'Alumnus / Alumna', plural: 'Alumni' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'cohort', 'showInStories', 'showInFeatured', 'order', 'status'],
    description:
      'Alumni stories and featured graduate profiles on the EPLAN page. Add photos and bios, visitors can click to read the full story.',
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
    { name: 'cohort', type: 'text', admin: { description: 'e.g. Cohort II or Class of 2025' } },
    {
      name: 'institution',
      type: 'text',
      admin: { description: 'Institution or programme line shown on story cards.' },
    },
    {
      name: 'featuredRole',
      type: 'text',
      label: 'Featured role line',
      admin: {
        description:
          'Role line on the Featured Graduates card (e.g. “Ministry of Health” or “Cohort Representative · Baobab Summit Delegate”).',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'headline',
      type: 'text',
      admin: { description: 'Story headline shown on the Alumni Stories card.' },
    },
    {
      name: 'storyBody',
      type: 'textarea',
      label: 'Story body',
      admin: { description: 'Full story text, shown on the card and in the story panel.' },
    },
    {
      name: 'profileBio',
      type: 'textarea',
      label: 'Featured profile bio',
      admin: { description: 'Shorter bio for the Featured Graduates drawer.' },
    },
    {
      name: 'quote',
      type: 'textarea',
      admin: { description: 'Optional pull quote on the story card.' },
    },
    {
      name: 'showInStories',
      type: 'checkbox',
      label: 'Show in Alumni Stories',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'showInFeatured',
      type: 'checkbox',
      label: 'Show in Featured Graduates',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
    {
      type: 'collapsible',
      label: 'Contact & social',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'linkedin', type: 'text' },
      ],
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
