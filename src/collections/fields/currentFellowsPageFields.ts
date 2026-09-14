import type { Field } from 'payload'

import { currentFellowsPageContent } from '@/config/currentFellowsContent'

const d = currentFellowsPageContent

/**
 * CMS fields for the live Current Fellows page (`/community/current-fellows`).
 * Matches ChariticsCurrentFellowsPage: Hero → Directory → EPLAN promo → Get Involved.
 * Cohort tabs come from the Cohorts collection; fellow cards from Fellows.
 */
export const currentFellowsPageFields: Field[] = [
  {
    type: 'group',
    name: 'currentFellowsPage',
    label: 'Current Fellows page',
    admin: {
      condition: (data) => data?.slug === '/community/current-fellows',
      description:
        'Edits the live Current Fellows page. Sections match the website: Hero (with stats), Directory labels (cohort tabs from Cohorts; cards from Fellows), EPLAN promo, and Get Involved.',
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
            name: 'heroStats',
            type: 'array',
            labels: { singular: 'Stat', plural: 'Hero stats' },
            admin: {
              description: 'Four stats shown in the hero (value + label).',
            },
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
        label: 'Directory controls',
        admin: {
          description:
            'Search and labels for the fellow grid. Cohort filter tabs come from the Cohorts collection (published + “Show on website”). Fellow cards come from the Fellows collection.',
        },
        fields: [
          {
            name: 'searchPlaceholder',
            type: 'text',
            defaultValue: d.directory.searchPlaceholder,
          },
          {
            name: 'sectorFilterLabel',
            type: 'text',
            defaultValue: d.directory.sectorFilterLabel,
          },
          {
            name: 'defaultRoleLabel',
            type: 'text',
            defaultValue: d.directory.defaultRoleLabel,
          },
          {
            name: 'initialVisibleCount',
            type: 'number',
            defaultValue: d.directory.initialVisibleCount,
          },
          {
            name: 'showMoreLabel',
            type: 'text',
            defaultValue: d.directory.showMoreLabel,
          },
          {
            name: 'showLessLabel',
            type: 'text',
            defaultValue: d.directory.showLessLabel,
          },
          {
            name: 'emptyStateText',
            type: 'text',
            defaultValue: d.directory.emptyStateText,
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'EPLAN promo',
        fields: [
          { name: 'eplanEyebrow', type: 'text', defaultValue: d.eplanPromo.eyebrow },
          { name: 'eplanTitle', type: 'text', defaultValue: d.eplanPromo.title },
          { name: 'eplanIntro', type: 'textarea', defaultValue: d.eplanPromo.intro },
          {
            name: 'eplanStats',
            type: 'array',
            labels: { singular: 'Stat', plural: 'EPLAN stats' },
            defaultValue: d.eplanPromo.stats,
            fields: [
              { name: 'value', type: 'text', required: true },
              { name: 'label', type: 'text', required: true },
            ],
          },
          { name: 'eplanCtaLabel', type: 'text', defaultValue: d.eplanPromo.ctaLabel },
          { name: 'eplanCtaUrl', type: 'text', defaultValue: d.eplanPromo.ctaHref },
        ],
      },
      {
        type: 'collapsible',
        label: 'Get Involved',
        fields: [
          { name: 'involveEyebrow', type: 'text', defaultValue: d.involve.eyebrow },
          { name: 'involveTitle', type: 'text', defaultValue: d.involve.title },
          { name: 'involveBody', type: 'textarea', defaultValue: d.involve.body },
          { name: 'involvePrimaryLabel', type: 'text', defaultValue: d.involve.primaryLabel },
          { name: 'involvePrimaryUrl', type: 'text', defaultValue: d.involve.primaryHref },
          {
            name: 'involveSecondaryLabel',
            type: 'text',
            defaultValue: d.involve.secondaryLabel,
          },
          {
            name: 'involveSecondaryUrl',
            type: 'text',
            defaultValue: d.involve.secondaryHref,
          },
        ],
      },
    ],
  },
]
