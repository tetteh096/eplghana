import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { publicTotpReadBypass } from '@/config/security'

/**
 * Partners, funders/collaborators and host institutions on the Our Partners page.
 * Create, edit, publish/unpublish (draft), or delete entries here.
 */
export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Partner', plural: 'Partners' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'group', 'order', 'status'],
    description:
      'Strategic partners (funders) and host institutions shown on the Our Partners page. Set status to Published to show on the site.',
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
      name: 'group',
      type: 'select',
      required: true,
      defaultValue: 'strategic',
      options: [
        { label: 'Strategic Partner (funder)', value: 'strategic' },
        { label: 'Host Institution', value: 'host' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Short blurb shown on the partner card.' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Partner logo. If empty, initials or a short name monogram is shown.' },
    },
    {
      name: 'shortName',
      type: 'text',
      label: 'Short name / monogram',
      admin: {
        description: 'Optional abbreviation shown when there is no logo (e.g. U.S., FSD Africa).',
      },
    },
    {
      name: 'websiteUrl',
      type: 'text',
      label: 'Website URL',
      admin: { description: 'Optional link, card becomes clickable when set.' },
    },
    {
      name: 'programmes',
      type: 'array',
      label: 'Programmes supported',
      admin: {
        condition: (data) => data?.group === 'strategic',
        description: 'Optional tags shown on strategic partner cards (e.g. Public Service Fellowship).',
      },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar', description: 'Lower numbers show first within the group.' },
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
