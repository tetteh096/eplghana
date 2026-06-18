import type { Field } from 'payload'

import { getInvolvedPageContent } from '@/config/getInvolvedContent'

const d = getInvolvedPageContent

/** Get Involved page, hero, pathways, and register-interest form copy. */
export const getInvolvedPageFields: Field[] = [
  {
    type: 'group',
    name: 'getInvolvedPage',
    label: 'Get Involved page',
    admin: {
      condition: (data) => data?.slug === '/get-involved',
      description:
        'Hero, engagement pathways, and fellowship register-interest form labels. Submissions appear in Form Submissions in the dashboard.',
    },
    fields: [
      {
        type: 'collapsible',
        label: 'Hero',
        fields: [
          { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
          { name: 'heroBadge', type: 'text', defaultValue: d.hero.badge },
          {
            name: 'fellowshipTitle',
            type: 'text',
            defaultValue: 'Your chapter in public service starts here',
          },
          {
            name: 'fellowshipDescription',
            type: 'textarea',
            defaultValue:
              'Join the 2026 Public Service Fellowship, a transformative year inside Ghana’s ministries, agencies, and commissions, with the training, mentorship, and network to lead with integrity.',
          },
          { name: 'fellowshipCtaLabel', type: 'text', defaultValue: 'Register Interest' },
          { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero image (primary)' },
          {
            name: 'heroSecondaryImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Hero image (secondary)',
          },
          { name: 'imageBadgeValue', type: 'text', defaultValue: d.hero.imageBadge.value },
          { name: 'imageBadgeLabel', type: 'text', defaultValue: d.hero.imageBadge.label },
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
          { name: 'secondaryCtaLabel', type: 'text', defaultValue: d.hero.secondaryCta.label },
          { name: 'secondaryCtaUrl', type: 'text', defaultValue: d.hero.secondaryCta.href },
        ],
      },
      {
        type: 'collapsible',
        label: 'Engagement pathways',
        fields: [
          { name: 'pathwaysEyebrow', type: 'text', defaultValue: 'Ways to engage' },
          {
            name: 'pathwaysTitle',
            type: 'text',
            defaultValue: 'Find your path with EPL Ghana',
          },
          {
            name: 'pathways',
            type: 'array',
            labels: { singular: 'Pathway', plural: 'Pathways' },
            defaultValue: d.pathways.map((pathway) => ({
              anchorId: pathway.id,
              title: pathway.title,
              body: pathway.body,
              bullets: pathway.bullets.map((text) => ({ text })),
              ctaLabel: pathway.ctaLabel,
              ctaHref: pathway.ctaHref,
            })),
            fields: [
              {
                name: 'anchorId',
                type: 'text',
                required: true,
                admin: { description: 'HTML id for in-page links (e.g. fellowship).' },
              },
              { name: 'title', type: 'text', required: true },
              { name: 'body', type: 'textarea', required: true },
              {
                name: 'bullets',
                type: 'array',
                labels: { singular: 'Bullet', plural: 'Bullets' },
                fields: [{ name: 'text', type: 'text', required: true }],
              },
              { name: 'ctaLabel', type: 'text', required: true },
              { name: 'ctaHref', type: 'text', required: true },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Register interest form',
        fields: [
          { name: 'registerEyebrow', type: 'text', defaultValue: d.registerInterest.eyebrow },
          { name: 'registerTitle', type: 'text', defaultValue: d.registerInterest.title },
          {
            name: 'registerDescription',
            type: 'textarea',
            defaultValue: d.registerInterest.description,
          },
          { name: 'registerSubmitLabel', type: 'text', defaultValue: d.registerInterest.submitLabel },
          {
            name: 'registerPoints',
            type: 'array',
            labels: { singular: 'Point', plural: 'Sidebar points' },
            defaultValue: [
              { text: 'Be first to know when applications open' },
              { text: 'Receive fellowship events and briefing updates' },
              { text: 'Connect with EPL Ghana’s recruitment team' },
            ],
            fields: [{ name: 'text', type: 'text', required: true }],
          },
        ],
      },
    ],
  },
]
