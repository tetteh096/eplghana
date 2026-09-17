import type { Field } from 'payload'

import { womenOnTheRiseContent } from '@/config/womenOnTheRiseContent'

const d = womenOnTheRiseContent

/**
 * CMS fields for the live Women on the Rise page.
 * Matches ChariticsWotrDetail: Hero → Stats → About + pillars.
 */
export const wotrDetailFields: Field[] = [
  {
    type: 'collapsible',
    label: 'Hero',
    admin: {
      initCollapsed: false,
      description:
        'Full-bleed hero. Background image comes from the Featured Image field above on this project.',
    },
    fields: [
      { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
      { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
      { name: 'heroLead', type: 'textarea', defaultValue: d.hero.lead },
      { name: 'heroCtaLabel', type: 'text', defaultValue: d.hero.ctaLabel },
      { name: 'heroCtaUrl', type: 'text', defaultValue: d.hero.ctaHref },
    ],
  },
  {
    type: 'collapsible',
    label: 'Impact stats',
    admin: {
      description: 'Stat row directly under the hero (value + label).',
    },
    fields: [
      {
        name: 'impactStats',
        type: 'array',
        labels: { singular: 'Stat', plural: 'Stats' },
        defaultValue: d.impact.stats.map((s) => ({ value: s.value, label: s.label })),
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'About + pillars',
    fields: [
      { name: 'aboutEyebrow', type: 'text', defaultValue: d.aboutEyebrow },
      { name: 'aboutTitle', type: 'text', defaultValue: d.aboutTitle },
      {
        name: 'heroDescription',
        type: 'textarea',
        label: 'About body',
        defaultValue: d.hero.description,
        admin: {
          description: 'Separate paragraphs with a blank line. Shown next to the about image.',
        },
      },
      { name: 'aboutImage', type: 'upload', relationTo: 'media', label: 'About image' },
      {
        name: 'whyItMattersItems',
        type: 'array',
        label: 'Pillars',
        labels: { singular: 'Pillar', plural: 'Pillars' },
        defaultValue: d.whyItMatters.items.map((item) => ({
          title: item.title,
          description: item.description,
        })),
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
        ],
      },
    ],
  },
]
