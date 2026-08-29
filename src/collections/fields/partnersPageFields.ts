import type { Field } from 'payload'

import { partnersPageContent as d } from '@/config/partnersPageContent'

/** Partner With Us page copy. Partner logos live in the Partners collection. */
export const partnersPageFields: Field[] = [
  {
    type: 'group',
    name: 'partnersPage',
    label: 'Our Partners page',
    admin: {
      condition: (data) => data?.slug === '/community/partners',
      description:
        'Hero, collaboration benefits, partner categories, network labels, and enquiry form. Logos and partner cards are managed in the Partners collection.',
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
          {
            name: 'heroSecondaryImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Secondary image',
          },
          {
            name: 'heroStats',
            type: 'array',
            labels: { singular: 'Stat', plural: 'Hero stats' },
            defaultValue: d.hero.stats,
            fields: [
              { name: 'value', type: 'text', required: true },
              { name: 'label', type: 'text', required: true },
            ],
          },
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
          },
          {
            name: 'collabHighlightTitle',
            type: 'text',
            defaultValue: d.collaboration.highlightTitle,
          },
          {
            name: 'collabHighlightText',
            type: 'textarea',
            defaultValue: d.collaboration.highlightText,
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
        label: 'Partnership ecosystem',
        fields: [
          { name: 'ecosystemEyebrow', type: 'text', defaultValue: d.ecosystem.eyebrow },
          { name: 'ecosystemTitle', type: 'text', defaultValue: d.ecosystem.title },
          { name: 'ecosystemIntro', type: 'textarea', defaultValue: d.ecosystem.intro },
          { name: 'ecosystemLearnMoreLabel', type: 'text', defaultValue: d.ecosystem.learnMoreLabel },
          { name: 'ecosystemCloseLabel', type: 'text', defaultValue: d.ecosystem.closeLabel },
          {
            name: 'ecosystemHighlightsLabel',
            type: 'text',
            defaultValue: d.ecosystem.highlightsLabel,
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
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Network section',
        fields: [
          { name: 'networkEyebrow', type: 'text', defaultValue: d.network.eyebrow },
          { name: 'networkTitle', type: 'text', defaultValue: d.network.title },
          { name: 'networkIntro', type: 'textarea', defaultValue: d.network.intro },
        ],
      },
      {
        type: 'collapsible',
        label: 'Strategic partners section labels',
        fields: [
          { name: 'strategicEyebrow', type: 'text', defaultValue: d.partners.eyebrow },
          { name: 'strategicTitle', type: 'text', defaultValue: d.partners.title },
          { name: 'strategicIntro', type: 'textarea', defaultValue: d.partners.intro },
        ],
      },
      {
        type: 'collapsible',
        label: 'Host institutions section labels',
        fields: [
          { name: 'hostEyebrow', type: 'text', defaultValue: d.partnerOrganizations.eyebrow },
          { name: 'hostTitle', type: 'text', defaultValue: d.partnerOrganizations.title },
          { name: 'hostIntro', type: 'textarea', defaultValue: d.partnerOrganizations.intro },
        ],
      },
      {
        type: 'collapsible',
        label: 'Enquiry form',
        fields: [
          { name: 'formEyebrow', type: 'text', defaultValue: d.form.eyebrow },
          { name: 'formTitle', type: 'text', defaultValue: d.form.title },
          { name: 'formDescription', type: 'textarea', defaultValue: d.form.description },
          { name: 'formSubmitLabel', type: 'text', defaultValue: d.form.submitLabel },
        ],
      },
      {
        type: 'collapsible',
        label: 'Contact CTA',
        fields: [
          { name: 'ctaTitle', type: 'text', defaultValue: d.cta.title },
          { name: 'ctaDescription', type: 'textarea', defaultValue: d.cta.description },
          { name: 'ctaLabel', type: 'text', defaultValue: d.cta.ctaLabel },
          { name: 'ctaUrl', type: 'text', defaultValue: d.cta.ctaHref },
        ],
      },
    ],
  },
]
