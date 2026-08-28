import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { publicTotpReadBypass } from '@/config/security'

/**
 * Fellows, current Public Service Fellows on the Current Fellows page.
 * Create, edit, publish/unpublish, or delete entries here.
 */
export const Fellows: CollectionConfig = {
  slug: 'fellows',
  labels: { singular: 'Fellow', plural: 'Fellows' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'institution', 'cohort', 'featuredOnPage', 'order', 'status'],
    listSearchableFields: ['name', 'institution'],
    description:
      'Fellow profiles for the Current Fellows directory. Use the cohort tabs above the list to separate by cohort, or open a cohort under Cohorts to see its members.',
    components: {
      views: {
        list: {
          Component: '/components/admin/FellowsListView#FellowsListView',
        },
      },
    },
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
    { name: 'institution', type: 'text', required: true },
    {
      name: 'cohort',
      type: 'relationship',
      relationTo: 'cohorts',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Which cohort this fellow belongs to. Create cohorts under Cohorts if the list is empty.',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Profile photo shown on the fellow card and in the profile panel.' },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: { description: 'Profile description shown when a visitor clicks the fellow card.' },
    },
    {
      name: 'highlightTitle',
      type: 'text',
      label: 'Highlight headline',
      admin: {
        description:
          'Optional headline for the “Fellows Highlight” section (only when Featured on page is checked).',
      },
    },
    {
      name: 'featuredOnPage',
      type: 'checkbox',
      label: 'Featured on page',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this fellow in the Fellows Highlight section at the top.',
      },
    },
    {
      name: 'featuredOnImpact',
      type: 'checkbox',
      label: 'Featured on Impact page',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Show this fellow in Success Stories on /impact. Uses Impact story below, or bio if empty.',
      },
    },
    {
      name: 'impactStory',
      type: 'textarea',
      label: 'Impact story',
      admin: {
        description:
          'Short success-story blurb for the Impact page card. Falls back to bio when empty.',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar', description: 'Lower numbers show first in the directory grid.' },
    },
    {
      type: 'collapsible',
      label: 'Contact & social',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
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
