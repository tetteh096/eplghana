import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { publicTotpReadBypass } from '@/config/security'
import { fellowshipDetailFields } from '@/collections/fields/fellowshipDetailFields'
import { peaceDetailFields } from '@/collections/fields/peaceDetailFields'
import { wotrDetailFields } from '@/collections/fields/wotrDetailFields'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/**
 * Projects, programmes shown on the Projects page bento grid, Home, and What We Do.
 * Create a project here; published items appear automatically on the site.
 */
export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'detailLayout', 'status', 'projectsPageOrder'],
    description:
      'Add or edit programmes. Set Detail layout to match the page design (Fellowship, P.E.A.C.E, etc.).',
    livePreview: {
      url: ({ data }) => `${serverURL}/projects/${(data?.slug as string) || ''}`,
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
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL path, e.g. public-service-fellowship',
      },
    },
    {
      name: 'detailLayout',
      type: 'select',
      defaultValue: 'generic',
      options: [
        { label: 'Generic (simple page)', value: 'generic' },
        { label: 'Public Service Fellowship', value: 'fellowship' },
        { label: 'Women on the Rise', value: 'wotr' },
        { label: 'P.E.A.C.E', value: 'peace' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Which detail page design this project uses.',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description used on cards and listing pages.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Wide card image',
          admin: {
            width: '50%',
            description:
              'Large landscape tile on the /projects page grid and the main hero on programme detail pages.',
          },
        },
        {
          name: 'visualImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Tall card image',
          admin: {
            width: '50%',
            description:
              'Narrow portrait tile on the /projects page grid. If empty, the wide image is used instead.',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'fellowshipDetail',
      label: 'Fellowship page content',
      admin: {
        condition: (data) => data?.detailLayout === 'fellowship',
        description:
          'Full Public Service Fellowship detail page, hero, tabs, programme steps, eligibility, and CTAs.',
      },
      fields: fellowshipDetailFields,
    },
    {
      type: 'group',
      name: 'peaceDetail',
      label: 'P.E.A.C.E page content',
      admin: {
        condition: (data) => data?.detailLayout === 'peace',
        description:
          'Full P.E.A.C.E detail page, hero, about, stats, outcomes, stories, gallery, and CTAs.',
      },
      fields: peaceDetailFields,
    },
    {
      type: 'group',
      name: 'wotrDetail',
      label: 'Women on the Rise page content',
      admin: {
        condition: (data) => data?.detailLayout === 'wotr',
        description:
          'Full Women on the Rise detail page, hero, about, why it matters, stats, gallery, and CTAs.',
      },
      fields: wotrDetailFields,
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        condition: (data) => data?.detailLayout === 'generic',
        description: 'Full project detail body (used on generic project pages).',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description:
          'Optional. Where this programme runs (e.g. “Nationwide” or “Greater Accra”). Not shown on the site yet, safe to leave blank.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'projectsPageOrder',
      type: 'number',
      label: 'Projects page order',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers show first in the Projects page bento grid.',
      },
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      label: 'Feature on Home page',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this project in the Home page Projects section.',
      },
    },
    {
      name: 'homeOrder',
      type: 'number',
      label: 'Home order',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers show first in the Home Projects section.',
      },
    },
  ],
}
