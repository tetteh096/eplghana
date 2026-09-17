import type { Field } from 'payload'

import { peaceContent } from '@/config/peaceContent'

const d = peaceContent

/**
 * Editable content for the live P.E.A.C.E. detail page.
 * Matches ChariticsPeaceDetail: Hero → About + model highlight.
 * Hero image uses the project Featured (wide card) image.
 */
export const peaceDetailFields: Field[] = [
  {
    type: 'collapsible',
    label: 'Hero',
    admin: {
      initCollapsed: false,
      description:
        'Full-bleed hero. Background image is the project Featured (wide card) image above.',
    },
    fields: [
      { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
      { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
      {
        name: 'heroLead',
        type: 'textarea',
        defaultValue: d.hero.lead,
        admin: {
          description: 'Supports **bold** with double asterisks.',
        },
      },
      { name: 'heroCtaLabel', type: 'text', defaultValue: d.hero.ctaLabel },
      { name: 'heroCtaUrl', type: 'text', defaultValue: d.hero.ctaHref },
    ],
  },
  {
    type: 'collapsible',
    label: 'About + model highlight',
    fields: [
      { name: 'aboutEyebrow', type: 'text', defaultValue: d.aboutEyebrow },
      { name: 'aboutTitle', type: 'text', defaultValue: d.aboutTitle },
      {
        name: 'aboutParagraphs',
        type: 'array',
        labels: { singular: 'Paragraph', plural: 'Paragraphs' },
        admin: {
          description: 'Body paragraphs under About. Supports **bold** with double asterisks.',
        },
        defaultValue: d.aboutParagraphs.map((text) => ({ text })),
        fields: [{ name: 'text', type: 'textarea', required: true }],
      },
      { name: 'modelHighlightEyebrow', type: 'text', defaultValue: d.modelHighlight.eyebrow },
      { name: 'modelHighlightTitle', type: 'text', defaultValue: d.modelHighlight.title },
      { name: 'modelHighlightBody', type: 'textarea', defaultValue: d.modelHighlight.body },
      {
        name: 'modelHighlightAgenciesLabel',
        type: 'text',
        defaultValue: d.modelHighlight.agenciesLabel,
      },
      {
        name: 'modelHighlightAgencies',
        type: 'array',
        labels: { singular: 'Agency', plural: 'Agencies' },
        defaultValue: d.modelHighlight.agencies.map((text) => ({ text })),
        fields: [{ name: 'text', type: 'text', required: true }],
      },
    ],
  },
]
