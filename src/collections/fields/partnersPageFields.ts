import type { Field } from 'payload'

import { partnersPageContent as d } from '@/config/partnersPageContent'

/**
 * CMS fields for the live Partners page (`/community/partners`, `/partner-with-us`).
 * Matches ChariticsPartnersPage: Hero → Strategic collaboration → Who Can Partner →
 * Our Partners & Supporters (logos from Partners collection) → Get in Touch form.
 */
export const partnersPageFields: Field[] = [
  {
    type: 'group',
    name: 'partnersPage',
    label: 'Partners page',
    admin: {
      condition: (data) => data?.slug === '/community/partners',
      description:
        'Edits the live Partners page. Partner logos in the marquee come from the Partners collection.',
    },
    fields: [
      {
        type: 'collapsible',
        label: 'Hero',
        fields: [
          { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
          { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
          { name: 'heroLead', type: 'textarea', defaultValue: d.hero.lead },
          { name: 'heroCtaLabel', type: 'text', defaultValue: d.hero.ctaLabel },
          { name: 'heroCtaUrl', type: 'text', defaultValue: d.hero.ctaHref },
          { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero background' },
        ],
      },
      {
        type: 'collapsible',
        label: 'Strategic collaboration',
        fields: [
          { name: 'collabEyebrow', type: 'text', defaultValue: d.collaboration.eyebrow },
          { name: 'collabTitle', type: 'text', defaultValue: d.collaboration.title },
          { name: 'collabLead', type: 'textarea', defaultValue: d.collaboration.lead },
          {
            name: 'collabBenefits',
            type: 'array',
            labels: { singular: 'Benefit', plural: 'Benefits' },
            defaultValue: d.collaboration.benefits,
            fields: [
              { name: 'eyebrow', type: 'text', required: true },
              { name: 'title', type: 'text', required: true },
              { name: 'text', type: 'textarea', required: true },
            ],
          },
          {
            name: 'collabHighlightValue',
            type: 'text',
            defaultValue: d.collaboration.highlightValue,
            label: 'Highlight value',
            admin: { description: 'e.g. 85%' },
          },
          {
            name: 'collabHighlightTitle',
            type: 'text',
            defaultValue: d.collaboration.highlightTitle,
            label: 'Highlight title',
            admin: { description: 'e.g. Career Advancement' },
          },
          {
            name: 'collabHighlightText',
            type: 'textarea',
            defaultValue: d.collaboration.highlightText,
            label: 'Highlight text',
          },
          {
            name: 'collabImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Collaboration section photo',
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Who Can Partner',
        fields: [
          { name: 'ecosystemEyebrow', type: 'text', defaultValue: d.ecosystem.eyebrow },
          { name: 'ecosystemTitle', type: 'text', defaultValue: d.ecosystem.title },
          { name: 'ecosystemIntro', type: 'textarea', defaultValue: d.ecosystem.intro },
          {
            name: 'ecosystemLearnMoreLabel',
            type: 'text',
            defaultValue: d.ecosystem.learnMoreLabel,
          },
          {
            name: 'ecosystemHighlightsLabel',
            type: 'text',
            defaultValue: d.ecosystem.highlightsLabel,
            label: 'Modal highlights label',
          },
          {
            name: 'ecosystemCategories',
            type: 'array',
            labels: { singular: 'Category', plural: 'Categories' },
            defaultValue: d.ecosystem.categories.map((c) => ({
              code: c.id,
              title: c.title,
              description: c.description,
              highlights: c.highlights.map((text) => ({ text })),
            })),
            fields: [
              { name: 'code', type: 'text', required: true, admin: { description: 'e.g. 01' } },
              { name: 'title', type: 'text', required: true },
              { name: 'description', type: 'textarea', required: true },
              {
                name: 'highlights',
                type: 'array',
                fields: [{ name: 'text', type: 'text', required: true }],
              },
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                label: 'Category image',
              },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Our Partners & Supporters',
        fields: [
          { name: 'networkTitle', type: 'text', defaultValue: d.network.title },
          { name: 'networkIntro', type: 'textarea', defaultValue: d.network.intro },
        ],
        admin: {
          description: 'Section headings only. Logos come from the Partners collection.',
        },
      },
      {
        type: 'collapsible',
        label: 'Get in Touch form',
        fields: [
          { name: 'formEyebrow', type: 'text', defaultValue: d.form.eyebrow },
          { name: 'formTitle', type: 'text', defaultValue: d.form.title },
          { name: 'formDescription', type: 'textarea', defaultValue: d.form.description },
          { name: 'formSubmitLabel', type: 'text', defaultValue: d.form.submitLabel },
        ],
      },
    ],
  },
]
