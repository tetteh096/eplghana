import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { publicTotpReadBypass } from '@/config/security'

/**
 * Team, board members and staff, shown on the Our Team page (board / team
 * tabs). Managed like any collection: create a person, set their group, upload
 * a photo. The page fetches these via getTeamContent().
 */
export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: 'Team member', plural: 'Team' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'group', 'order', 'status'],
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
    { name: 'role', type: 'text', required: true },
    {
      name: 'group',
      type: 'select',
      required: true,
      defaultValue: 'team',
      options: [
        { label: 'Board of Directors', value: 'board' },
        { label: 'Team Member', value: 'team' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar', description: 'Lower numbers show first within the group.' },
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
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
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
