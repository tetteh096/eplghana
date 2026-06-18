import type { Field } from 'payload'

import { womenOnTheRiseContent } from '@/config/womenOnTheRiseContent'

const d = womenOnTheRiseContent

/** Editable content for the Women on the Rise detail page layout. */
export const wotrDetailFields: Field[] = [
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
      { name: 'heroBadgeValue', type: 'text', defaultValue: 'Since 2024' },
      { name: 'heroBadgeLabel', type: 'text', defaultValue: 'Gender-responsive public service' },
      {
        name: 'heroPartners',
        type: 'array',
        labels: { singular: 'Partner', plural: 'Partners' },
        defaultValue: d.hero.partners.map((name) => ({ name })),
        fields: [{ name: 'name', type: 'text', required: true }],
      },
      {
        name: 'heroHighlights',
        type: 'array',
        labels: { singular: 'Highlight', plural: 'Hero highlights' },
        defaultValue: d.hero.highlights,
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'text', required: true },
        ],
      },
      { name: 'heroCtaLabel', type: 'text', defaultValue: d.hero.ctaLabel },
      { name: 'heroCtaUrl', type: 'text', defaultValue: d.hero.ctaHref },
      { name: 'heroSecondaryCtaLabel', type: 'text', defaultValue: d.hero.secondaryCtaLabel },
      { name: 'heroSecondaryCtaUrl', type: 'text', defaultValue: d.hero.secondaryCtaHref },
    ],
  },
  {
    type: 'collapsible',
    label: 'About section',
    fields: [
      { name: 'aboutEyebrow', type: 'text', defaultValue: 'About the Project' },
      { name: 'aboutTitle', type: 'text', defaultValue: 'Building inclusive institutions' },
      { name: 'aboutImage', type: 'upload', relationTo: 'media', label: 'About image' },
    ],
  },
  {
    type: 'collapsible',
    label: 'Why it matters',
    fields: [
      { name: 'whyItMattersEyebrow', type: 'text', defaultValue: d.whyItMatters.eyebrow },
      { name: 'whyItMattersTitle', type: 'text', defaultValue: d.whyItMatters.title },
      {
        name: 'whyItMattersItems',
        type: 'array',
        labels: { singular: 'Reason', plural: 'Reasons' },
        defaultValue: d.whyItMatters.items.map((item) => ({
          title: item.title,
          description: item.description,
          icon: item.icon,
        })),
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
          { name: 'icon', type: 'text' },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Impact stats',
    fields: [
      { name: 'impactEyebrow', type: 'text', defaultValue: 'Measurable change' },
      { name: 'impactTitle', type: 'text', defaultValue: d.impact.title },
      {
        name: 'impactStats',
        type: 'array',
        labels: { singular: 'Stat', plural: 'Stats' },
        defaultValue: d.impact.stats.map((s) => ({ value: s.value, label: s.label })),
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
    label: 'Outcomes',
    fields: [
      { name: 'outcomesEyebrow', type: 'text', defaultValue: 'What we deliver' },
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
    label: 'Key success stories',
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
      { name: 'galleryEyebrow', type: 'text', defaultValue: 'RiwoCo in pictures' },
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
    label: 'Get involved CTA',
    fields: [
      { name: 'involvedEyebrow', type: 'text', defaultValue: d.getInvolvedCta.eyebrow },
      { name: 'involvedTitle', type: 'text', defaultValue: d.getInvolvedCta.title },
      { name: 'involvedDescription', type: 'textarea', defaultValue: d.getInvolvedCta.description },
      { name: 'involvedCtaLabel', type: 'text', defaultValue: d.getInvolvedCta.ctaLabel },
      { name: 'involvedCtaUrl', type: 'text', defaultValue: d.getInvolvedCta.ctaHref },
      {
        name: 'involvedSecondaryCtaLabel',
        type: 'text',
        defaultValue: d.getInvolvedCta.secondaryCtaLabel,
      },
      {
        name: 'involvedSecondaryCtaUrl',
        type: 'text',
        defaultValue: d.getInvolvedCta.secondaryCtaHref,
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
