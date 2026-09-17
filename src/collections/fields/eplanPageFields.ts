import type { Field } from 'payload'

import { alumniPageContent } from '@/config/alumniPageContent'

const d = alumniPageContent

/**
 * CMS fields for the live EPLAN page (`/community/eplan`).
 * Matches ChariticsAlumniPage: Hero → Stats → Vision → Mission → Executives → Sustain → Spotlight.
 */
export const eplanPageFields: Field[] = [
  {
    type: 'group',
    name: 'eplanPage',
    label: 'EPLAN page',
    admin: {
      condition: (data) => data?.slug === '/community/eplan',
      description:
        'Edits the live EPLAN page. Sections match the website: Hero, Vision, Mission, Executive Team, Beyond the Fellowship, and Network Spotlight.',
    },
    fields: [
      {
        type: 'collapsible',
        label: 'Hero',
        fields: [
          { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
          { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
          { name: 'heroLead', type: 'textarea', defaultValue: d.hero.lead },
          {
            name: 'heroImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Hero background image',
            admin: {
              description: 'Full-bleed hero background. Click an image to select, then Save this page.',
            },
          },
          {
            name: 'heroHighlights',
            type: 'array',
            labels: { singular: 'Stat', plural: 'Hero stats' },
            admin: {
              description: 'Stat row directly under the hero (value + label).',
            },
            defaultValue: d.hero.highlights,
            fields: [
              { name: 'value', type: 'text', required: true },
              { name: 'label', type: 'text', required: true },
            ],
          },
          { name: 'heroPrimaryCtaLabel', type: 'text', defaultValue: d.hero.primaryCta.label },
          { name: 'heroPrimaryCtaUrl', type: 'text', defaultValue: d.hero.primaryCta.href },
          { name: 'heroSecondaryCtaLabel', type: 'text', defaultValue: d.hero.secondaryCta.label },
          { name: 'heroSecondaryCtaUrl', type: 'text', defaultValue: d.hero.secondaryCta.href },
        ],
      },
      {
        type: 'collapsible',
        label: 'Vision',
        fields: [
          { name: 'visionEyebrow', type: 'text', defaultValue: d.vision.eyebrow },
          { name: 'visionText', type: 'textarea', defaultValue: d.vision.text },
        ],
      },
      {
        type: 'collapsible',
        label: 'Mission',
        fields: [
          { name: 'missionEyebrow', type: 'text', defaultValue: d.mission.eyebrow },
          { name: 'missionText', type: 'textarea', defaultValue: d.mission.text },
        ],
      },
      {
        type: 'collapsible',
        label: 'EPLAN Executive Team',
        admin: {
          description: 'Shown between Mission and Beyond the Fellowship. Add up to six executives.',
        },
        fields: [
          { name: 'executivesEyebrow', type: 'text', defaultValue: d.executives.eyebrow },
          { name: 'executivesTitle', type: 'text', defaultValue: d.executives.title },
          { name: 'executivesIntro', type: 'textarea', defaultValue: d.executives.intro },
          {
            name: 'executivesItems',
            type: 'array',
            maxRows: 6,
            labels: { singular: 'Executive', plural: 'Executives' },
            admin: {
              description:
                'Roles: President, Vice President, Secretary, Communications and Public Relation Personnel, Treasurer, Organizer. Drag to reorder.',
            },
            fields: [
              { name: 'name', type: 'text', required: true },
              { name: 'role', type: 'text', required: true },
              { name: 'bio', type: 'textarea' },
              { name: 'photo', type: 'upload', relationTo: 'media', required: true },
              { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
              { name: 'twitter', type: 'text', label: 'X / Twitter URL' },
              { name: 'facebook', type: 'text', label: 'Facebook URL' },
              { name: 'instagram', type: 'text', label: 'Instagram URL' },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Beyond the Fellowship',
        fields: [
          { name: 'sustainEyebrow', type: 'text', defaultValue: d.sustain.eyebrow },
          { name: 'sustainTitle', type: 'text', defaultValue: d.sustain.title },
          { name: 'sustainLead', type: 'textarea', defaultValue: d.sustain.lead },
          { name: 'sustainNote', type: 'textarea', defaultValue: d.sustain.note },
          {
            name: 'sustainImage',
            type: 'upload',
            relationTo: 'media',
            admin: {
              description: 'Image beside the Beyond the Fellowship copy.',
            },
          },
          { name: 'sustainImageAlt', type: 'text', defaultValue: d.sustain.imageAlt },
          {
            name: 'sustainPillars',
            type: 'array',
            labels: { singular: 'Pillar', plural: 'Pillars' },
            defaultValue: d.sustain.pillars,
            fields: [
              { name: 'num', type: 'text', required: true },
              { name: 'title', type: 'text', required: true },
              { name: 'description', type: 'textarea', required: true },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Network Spotlight',
        fields: [
          { name: 'spotlightEyebrow', type: 'text', defaultValue: d.spotlight.eyebrow },
          { name: 'spotlightTitle', type: 'text', defaultValue: d.spotlight.title },
          { name: 'spotlightIntro', type: 'textarea', defaultValue: d.spotlight.intro },
          {
            name: 'spotlightItems',
            type: 'array',
            labels: { singular: 'Highlight', plural: 'Highlights' },
            defaultValue: d.spotlight.items.map(({ tag, title, description, href }) => ({
              tag,
              title,
              description,
              href,
            })),
            fields: [
              { name: 'tag', type: 'text', required: true },
              { name: 'title', type: 'text', required: true },
              { name: 'description', type: 'textarea', required: true },
              {
                name: 'href',
                type: 'text',
                admin: { description: 'Link to blog/news detail, e.g. /news/my-story-slug' },
              },
              { name: 'image', type: 'upload', relationTo: 'media', label: 'Card image' },
            ],
          },
          {
            name: 'spotlightSupportCtaLabel',
            type: 'text',
            label: 'Bottom CTA label',
            defaultValue: d.spotlight.supportCta.label,
          },
          {
            name: 'spotlightSupportCtaUrl',
            type: 'text',
            label: 'Bottom CTA URL',
            defaultValue: d.spotlight.supportCta.href,
          },
        ],
      },
    ],
  },
]
