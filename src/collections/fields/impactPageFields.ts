import type { Field } from 'payload'

import { impactPageContent } from '@/config/impactPageContent'

const d = impactPageContent

/** Editable Impact page copy (Pages → impactPage when slug is /impact). */
export const impactPageFields: Field[] = [
  {
    type: 'collapsible',
    label: 'Hero',
    fields: [
      { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
      { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
      { name: 'heroDescription', type: 'textarea', defaultValue: d.hero.description },
      { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero image' },
    ],
  },
  {
    type: 'collapsible',
    label: 'Glance',
    fields: [
      { name: 'glanceEyebrow', type: 'text', defaultValue: d.glance.eyebrow },
      { name: 'glanceTitle', type: 'text', defaultValue: d.glance.title },
      {
        name: 'glanceStats',
        type: 'array',
        labels: { singular: 'Stat', plural: 'Glance stats' },
        defaultValue: d.glance.stats.map((s) => ({
          value: s.value,
          title: s.title,
          desc: s.desc,
        })),
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'desc', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Success stories',
    admin: {
      description:
        'Section headings here. Fellow cards are pulled from Fellows → tick “Featured on Impact page”. The list below is only a fallback when no fellows are featured.',
    },
    fields: [
      { name: 'successEyebrow', type: 'text', defaultValue: d.successStories.eyebrow },
      { name: 'successTitle', type: 'text', defaultValue: d.successStories.title },
      {
        name: 'successStories',
        type: 'array',
        labels: { singular: 'Story', plural: 'Success stories (fallback)' },
        defaultValue: d.successStories.items.map((item) => ({
          name: item.name,
          role: item.role,
          cohort: item.cohort,
          image: undefined,
          desc: item.desc,
        })),
        fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'role', type: 'text', required: true },
          { name: 'cohort', type: 'text', required: true },
          { name: 'image', type: 'upload', relationTo: 'media' },
          { name: 'desc', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Community',
    admin: {
      description:
        'Section headings here. Intervention cards come from Impact Interventions (create & publish there). The list below is only a fallback when the collection is empty.',
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
      {
        name: 'communityStories',
        type: 'array',
        labels: { singular: 'Story', plural: 'Community stories (fallback)' },
        defaultValue: d.communityStories.items.map((item) => ({
          num: item.num,
          region: item.region,
          assembly: item.assembly,
          title: item.title,
          desc: item.desc,
        })),
        fields: [
          { name: 'num', type: 'text', required: true },
          { name: 'region', type: 'text', required: true },
          { name: 'assembly', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'desc', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Testimonials',
    admin: {
      description:
        'Section headings here. Quote cards are edited in this list (photo optional). Falls back to config defaults only when empty.',
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
    label: 'Publications',
    admin: {
      description:
        'Section headings and fallback lists. Live report cards prefer the Publications collection (Annual / Impact Report and Research categories).',
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
      { name: 'reportsCtaUrl', type: 'text', defaultValue: d.publications.reportsCtaUrl },
      {
        name: 'annualReports',
        type: 'array',
        labels: { singular: 'Report', plural: 'Annual reports' },
        defaultValue: d.publications.reports.map((r) => ({
          edition: r.edition,
          title: r.title,
          summary: r.summary,
        })),
        fields: [
          { name: 'edition', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'summary', type: 'textarea', required: true },
        ],
      },
      { name: 'researchHeading', type: 'text', defaultValue: d.publications.researchHeading },
      { name: 'researchCtaLabel', type: 'text', defaultValue: d.publications.researchCtaLabel },
      { name: 'researchCtaUrl', type: 'text', defaultValue: d.publications.researchCtaUrl },
      {
        name: 'researchStudies',
        type: 'array',
        labels: { singular: 'Study', plural: 'Research studies' },
        defaultValue: d.publications.research.map((r) => ({
          tag: r.tag,
          title: r.title,
          authorYear: r.authorYear,
          summary: r.summary,
        })),
        fields: [
          { name: 'tag', type: 'text', required: true },
          { name: 'title', type: 'text', required: true },
          { name: 'authorYear', type: 'text', required: true },
          { name: 'summary', type: 'textarea', required: true },
        ],
      },
    ],
  },
]
