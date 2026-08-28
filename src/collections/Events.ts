import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { publicTotpReadBypass } from '@/config/security'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'venue', 'status'],
    description:
      'Events with date and venue. Upcoming events appear on the home page with a countdown; past events show on News & Events.',
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
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'venue',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Event photo gallery',
      labels: { singular: 'Photo', plural: 'Photos' },
      admin: {
        description:
          'Upload photos from the event. They appear on the event page as a gentle auto-sliding gallery that pauses when a visitor hovers over it. Add a few or many, the more photos, the smoother the slide.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Optional caption shown over the photo.',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Registration',
      admin: {
        description:
          'Optional. Add a link where attendees can register (Google Form, Eventbrite, Zoom, your own page, etc.). When set, a "Register" button appears on the event page.',
      },
      fields: [
        {
          name: 'registrationUrl',
          label: 'Registration link',
          type: 'text',
          admin: {
            placeholder: 'https://forms.gle/…',
            description: 'Full URL, including https://. Leave blank if there is nothing to register for.',
          },
          validate: (value: string | string[] | null | undefined) => {
            if (!value || Array.isArray(value)) return true
            return /^https?:\/\/.+/.test(value)
              ? true
              : 'Enter a full URL starting with http:// or https://'
          },
        },
        {
          name: 'registrationLabel',
          label: 'Button label',
          type: 'text',
          defaultValue: 'Register Now',
          admin: {
            description: 'Text shown on the registration button. Defaults to "Register Now".',
            condition: (data) => Boolean(data?.registrationUrl),
          },
        },
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
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
