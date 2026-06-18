import type { Field } from 'payload'

import { peaceContent } from '@/config/peaceContent'

const d = peaceContent

/** Editable content for the P.E.A.C.E detail page layout. */
export const peaceDetailFields: Field[] = [
  {
    type: 'collapsible',
    label: 'Hero',
    admin: { initCollapsed: false },
    fields: [
      { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
      { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
      { name: 'heroLead', type: 'textarea', defaultValue: d.hero.lead },
      { name: 'heroDescription', type: 'textarea', defaultValue: d.hero.description },
      {
        name: 'heroSecondaryImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Secondary hero image',
        admin: { description: 'Primary hero uses the wide card image above.' },
      },
      { name: 'heroBadgeValue', type: 'text', defaultValue: '12 Months' },
      { name: 'heroBadgeLabel', type: 'text', defaultValue: 'Peace & security leadership' },
      {
        name: 'heroPartners',
        type: 'array',
        labels: { singular: 'Partner', plural: 'Partners' },
        defaultValue: d.hero.partners.map((name) => ({ name })),
        fields: [{ name: 'name', type: 'text', required: true }],
      },
      { name: 'heroCtaLabel', type: 'text', defaultValue: d.hero.ctaLabel },
      { name: 'heroCtaUrl', type: 'text', defaultValue: d.hero.ctaHref },
    ],
  },
  {
    type: 'collapsible',
    label: 'About section',
    fields: [
      { name: 'aboutEyebrow', type: 'text', defaultValue: 'About the Programme' },
      {
        name: 'aboutTitle',
        type: 'text',
        defaultValue: 'Peacebuilding from within the public sector',
      },
      { name: 'aboutImage', type: 'upload', relationTo: 'media', label: 'About image' },
    ],
  },
  {
    type: 'collapsible',
    label: 'Programme scale',
    fields: [
      { name: 'impactTitle', type: 'text', defaultValue: d.impact.title },
      {
        name: 'impactStats',
        type: 'array',
        labels: { singular: 'Stat', plural: 'Stats' },
        defaultValue: d.impact.stats.map((s) => ({
          value: s.value,
          label: s.label,
        })),
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'textarea', required: true },
          { name: 'icon', type: 'upload', relationTo: 'media' },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'What fellows gain',
    fields: [
      { name: 'outcomesTitle', type: 'text', defaultValue: d.outcomes.title },
      {
        name: 'outcomeItems',
        type: 'array',
        labels: { singular: 'Outcome', plural: 'Outcomes' },
        defaultValue: d.outcomes.items.map((item) => ({
          title: item.title,
          description: item.description,
        })),
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
          { name: 'image', type: 'upload', relationTo: 'media' },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Programme focus stories',
    fields: [
      { name: 'keySuccessEyebrow', type: 'text', defaultValue: d.keySuccess.eyebrow },
      {
        name: 'keySuccessStories',
        type: 'array',
        labels: { singular: 'Story', plural: 'Stories' },
        defaultValue: d.keySuccess.stories.map((story) => ({
          title: story.title,
          paragraphs: story.paragraphs.map((text) => ({ text })),
        })),
        fields: [
          { name: 'title', type: 'text', required: true },
          {
            name: 'paragraphs',
            type: 'array',
            fields: [{ name: 'text', type: 'textarea', required: true }],
          },
          { name: 'imagePrimary', type: 'upload', relationTo: 'media', label: 'Main image' },
          { name: 'imageSecondary', type: 'upload', relationTo: 'media', label: 'Accent image' },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Gallery',
    fields: [
      { name: 'galleryTitle', type: 'text', defaultValue: d.gallery.title },
      {
        name: 'galleryItems',
        type: 'array',
        labels: { singular: 'Photo', plural: 'Gallery photos' },
        defaultValue: d.gallery.items.map((item) => ({
          layout: item.layout,
          alt: item.alt,
        })),
        fields: [
          { name: 'image', type: 'upload', relationTo: 'media', required: true },
          {
            name: 'layout',
            type: 'select',
            required: true,
            options: ['hero', 'tall', 'stack-a', 'stack-b', 'wide', 'banner'],
          },
          { name: 'alt', type: 'text', required: true },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Related articles',
    fields: [
      { name: 'relatedArticlesTitle', type: 'text', defaultValue: d.relatedArticles.title },
      {
        name: 'relatedArticlesItems',
        type: 'array',
        labels: { singular: 'Article', plural: 'Articles' },
        defaultValue: d.relatedArticles.items.map((item) => ({
          title: item.title,
          href: item.href,
        })),
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'href', type: 'text', required: true },
          { name: 'image', type: 'upload', relationTo: 'media' },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Partner CTA',
    fields: [
      { name: 'partnerTitle', type: 'text', defaultValue: d.partnerCta.title },
      { name: 'partnerCtaLabel', type: 'text', defaultValue: d.partnerCta.ctaLabel },
      { name: 'partnerCtaUrl', type: 'text', defaultValue: d.partnerCta.ctaHref },
      { name: 'partnerImage', type: 'upload', relationTo: 'media', label: 'Partner section image' },
    ],
  },
]
