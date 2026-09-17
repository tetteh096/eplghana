import type { Field } from 'payload'

import { galleryPageContent as d } from '@/config/galleryPageContent'

/** Static Photo Gallery page copy. Albums live in the Gallery Albums collection. */
export const galleryPageFields: Field[] = [
  {
    type: 'group',
    name: 'galleryPage',
    label: 'Photo Gallery page',
    admin: {
      condition: (data) => data?.slug === '/gallery',
      description:
        'Hero and section labels. Albums and photos are managed in Gallery Albums.',
    },
    fields: [
      {
        type: 'collapsible',
        label: 'Hero',
        fields: [
          { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
          { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
          { name: 'heroLead', type: 'textarea', defaultValue: d.hero.lead },
          { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero background' },
        ],
      },
      {
        type: 'collapsible',
        label: 'Albums section',
        fields: [
          { name: 'albumsEyebrow', type: 'text', defaultValue: d.albumsSection.eyebrow },
          { name: 'albumsTitle', type: 'text', defaultValue: d.albumsSection.title },
          { name: 'albumCtaLabel', type: 'text', defaultValue: d.albumCtaLabel },
        ],
      },
      {
        type: 'collapsible',
        label: 'Album detail page',
        fields: [
          {
            name: 'photosEyebrow',
            type: 'text',
            defaultValue: d.photosSection.eyebrow,
          },
          {
            name: 'photosEmptyText',
            type: 'text',
            defaultValue: d.photosSection.emptyText,
          },
          {
            name: 'backToGalleryLabel',
            type: 'text',
            defaultValue: 'Back to Photo Gallery',
          },
        ],
      },
    ],
  },
]
