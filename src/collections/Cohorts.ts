import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { publicTotpReadBypass } from '@/config/security'

/**
 * Fellowship cohorts (e.g. Cohort 7). Fellows link here; published cohorts with
 * “Show on website” appear as filter tabs on /community/current-fellows.
 */
export const Cohorts: CollectionConfig = {
  slug: 'cohorts',
  labels: { singular: 'Cohort', plural: 'Cohorts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'shortLabel', 'number', 'isDefault', 'showOnWebsite', 'status'],
    description:
      'Create cohorts here first, then assign fellows to a cohort. Open a cohort to see its members, or use the tabs on the Fellows list.',
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
      admin: { description: 'Full name shown on fellow cards, e.g. Cohort 7' },
    },
    {
      name: 'shortLabel',
      type: 'text',
      admin: {
        description: 'Short label for the website tab button, e.g. C7. Falls back to title if empty.',
      },
    },
    {
      name: 'number',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Cohort number for sorting (higher = newer). Cohort 7 → 7.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Optional intro for this cohort on the Current Fellows page.' },
    },
    {
      name: 'isDefault',
      type: 'checkbox',
      label: 'Default tab on website',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Which cohort tab opens first on /community/current-fellows. Only one should be checked.',
      },
    },
    {
      name: 'showOnWebsite',
      type: 'checkbox',
      label: 'Show on website',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Show as a filter tab on the Current Fellows page.',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Tab order on the website (lower numbers appear first).',
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
    {
      name: 'members',
      type: 'join',
      collection: 'fellows',
      on: 'cohort',
      label: 'Fellows in this cohort',
      admin: {
        description:
          'Everyone assigned to this cohort. To add someone, create or edit a Fellow and pick this cohort.',
        defaultColumns: ['name', 'institution', 'status', 'order'],
        allowCreate: true,
      },
      defaultLimit: 50,
      defaultSort: 'order',
    },
  ],
}
