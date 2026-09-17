import type { Field } from 'payload'

import { impactPageContent } from '@/config/impactPageContent'

const d = impactPageContent

/**
 * CMS fields for the live Impact page (`/impact`).
 * Matches ChariticsImpactPage: Hero → Glance → Success Stories → Community → Testimonials → Publications.
 * Cards come from Fellows, Impact Interventions, and Publications collections.
 */
export const impactPageFields: Field[] = [
  {
    type: 'collapsible',
    label: 'Hero',
    fields: [
      { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
      { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
      { name: 'heroDescription', type: 'textarea', defaultValue: d.hero.description },
      {
        name: 'heroImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Hero background image',
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Impact at a Glance',
    fields: [
      { name: 'glanceEyebrow', type: 'text', defaultValue: d.glance.eyebrow },
      {
        name: 'glanceStats',
        type: 'array',
        labels: { singular: 'Stat', plural: 'Glance stats' },
        maxRows: 4,
        defaultValue: d.glance.stats.map((s) => ({
          value: s.value,
          title: s.title,
          desc: s.desc,
        })),
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'title', type: 'text', required: true, label: 'Label' },
          { name: 'desc', type: 'textarea', required: true, label: 'Description' },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Success stories',
    admin: {
      description:
        'Headings only. Cards come from Fellows → tick “Featured on Impact page” (and set Impact story).',
    },
    fields: [
      { name: 'successEyebrow', type: 'text', defaultValue: d.successStories.eyebrow },
      { name: 'successTitle', type: 'text', defaultValue: d.successStories.title },
    ],
  },
  {
    type: 'collapsible',
    label: 'Community / Grassroots',
    admin: {
      description:
        'Headings and CTA. Cards come from the Impact Interventions collection (published).',
    },
    fields: [
      { name: 'communityEyebrow', type: 'text', defaultValue: d.communityStories.eyebrow },
      { name: 'communityTitle', type: 'text', defaultValue: d.communityStories.title },
      {
        name: 'communityIntro',
        type: 'textarea',
        defaultValue: d.communityStories.intro,
      },
      { name: 'communityCtaLabel', type: 'text', defaultValue: d.communityStories.ctaLabel },
      { name: 'communityCtaUrl', type: 'text', defaultValue: d.communityStories.ctaUrl },
    ],
  },
  {
    type: 'collapsible',
    label: 'Institutional voices (testimonials)',
    admin: {
      description:
        'Quotes shown with All / Supervisors / Mentors / Partnered Institutions filters. Photo optional.',
    },
    fields: [
      { name: 'testimonialsEyebrow', type: 'text', defaultValue: d.testimonials.eyebrow },
      { name: 'testimonialsTitle', type: 'text', defaultValue: d.testimonials.title },
      {
        name: 'testimonialsIntro',
        type: 'textarea',
        defaultValue: d.testimonials.intro,
      },
      {
        name: 'testimonials',
        type: 'array',
        labels: { singular: 'Testimonial', plural: 'Testimonials' },
        defaultValue: d.testimonials.items.map((item) => ({
          category: item.category,
          quote: item.quote,
          author: item.author,
          role: item.role,
          org: item.org,
        })),
        fields: [
          {
            name: 'category',
            type: 'select',
            required: true,
            options: [
              { label: 'Supervisors', value: 'Supervisors' },
              { label: 'Mentors', value: 'Mentors' },
              { label: 'Partnered Institutions', value: 'Partnered Institutions' },
            ],
          },
          { name: 'quote', type: 'textarea', required: true },
          { name: 'author', type: 'text', required: true },
          { name: 'role', type: 'text', required: true },
          { name: 'org', type: 'text', required: true },
          { name: 'photo', type: 'upload', relationTo: 'media', label: 'Portrait photo' },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Reports & publications',
    admin: {
      description:
        'Headings and CTA labels only. Report/research cards come from the Publications collection.',
    },
    fields: [
      { name: 'publicationsEyebrow', type: 'text', defaultValue: d.publications.eyebrow },
      { name: 'publicationsTitle', type: 'text', defaultValue: d.publications.title },
      {
        name: 'publicationsIntro',
        type: 'textarea',
        defaultValue: d.publications.intro,
      },
      { name: 'reportsHeading', type: 'text', defaultValue: d.publications.reportsHeading },
      { name: 'reportsCtaLabel', type: 'text', defaultValue: d.publications.reportsCtaLabel },
      {
        name: 'reportsCtaUrl',
        type: 'text',
        defaultValue: d.publications.reportsCtaUrl,
        admin: { description: 'Fallback link when a report has no PDF file.' },
      },
      { name: 'researchHeading', type: 'text', defaultValue: d.publications.researchHeading },
      { name: 'researchCtaLabel', type: 'text', defaultValue: d.publications.researchCtaLabel },
      {
        name: 'researchCtaUrl',
        type: 'text',
        defaultValue: d.publications.researchCtaUrl,
        admin: { description: 'Fallback link when a study has no detail URL or file.' },
      },
    ],
  },
]
