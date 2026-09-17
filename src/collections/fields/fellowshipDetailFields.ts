import type { Field } from 'payload'

import { publicServiceFellowshipContent } from '@/config/publicServiceFellowshipContent'

const d = publicServiceFellowshipContent

/**
 * CMS fields for the live Public Service Fellowship detail page.
 * Matches ChariticsFellowshipDetail: Hero → Tabs → Programme Structure / Eligibility /
 * Application Process → Apply CTA. Hero image comes from the project featured (wide) image.
 */
export const fellowshipDetailFields: Field[] = [
  {
    type: 'collapsible',
    label: 'Hero',
    admin: {
      description:
        'Hero background uses the project wide card image above. Edit eyebrow, title, description, and CTA here.',
    },
    fields: [
      { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
      { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
      { name: 'heroDescription', type: 'textarea', defaultValue: d.hero.description },
      { name: 'heroCtaLabel', type: 'text', defaultValue: d.hero.ctaLabel },
      { name: 'heroCtaUrl', type: 'text', defaultValue: d.hero.ctaHref },
    ],
  },
  {
    type: 'collapsible',
    label: 'Programme structure tab',
    fields: [
      { name: 'structureSidebarEyebrow', type: 'text', defaultValue: d.programmeStructure.sidebarEyebrow },
      { name: 'structureTitle', type: 'text', defaultValue: d.programmeStructure.title },
      { name: 'structureIntro', type: 'textarea', defaultValue: d.programmeStructure.intro },
      {
        name: 'structureSteps',
        type: 'array',
        labels: { singular: 'Step', plural: 'Programme steps' },
        defaultValue: d.programmeStructure.steps.map((step) => ({
          title: step.title,
          description: step.description,
        })),
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Eligibility tab',
    fields: [
      { name: 'eligibilityEyebrow', type: 'text', defaultValue: d.eligibility.eyebrow },
      { name: 'eligibilityTitle', type: 'text', defaultValue: d.eligibility.title },
      {
        name: 'eligibilityCriteria',
        type: 'array',
        labels: { singular: 'Criterion', plural: 'Criteria' },
        defaultValue: d.eligibility.criteria.map((text) => ({ text })),
        fields: [{ name: 'text', type: 'text', required: true }],
      },
      { name: 'documentsTitle', type: 'text', defaultValue: d.eligibility.documentsTitle },
      {
        name: 'documentsIntro',
        type: 'textarea',
        defaultValue: d.eligibility.documentsIntro,
      },
      {
        name: 'documents',
        type: 'array',
        labels: { singular: 'Document', plural: 'Documents to upload' },
        defaultValue: d.eligibility.documents.map((text) => ({ text })),
        fields: [{ name: 'text', type: 'text', required: true }],
      },
      {
        name: 'documentsCtaLabel',
        type: 'text',
        defaultValue: d.eligibility.documentsCtaLabel,
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Application process tab',
    fields: [
      { name: 'processEyebrow', type: 'text', defaultValue: d.applicationProcess.eyebrow },
      { name: 'processTitle', type: 'text', defaultValue: d.applicationProcess.title },
      { name: 'processIntro', type: 'textarea', defaultValue: d.applicationProcess.intro },
      {
        name: 'processSteps',
        type: 'array',
        labels: { singular: 'Stage', plural: 'Application stages' },
        defaultValue: d.applicationProcess.steps.map((step) => ({
          title: step.title,
          description: step.description,
        })),
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Apply CTA',
    fields: [
      { name: 'applyEyebrow', type: 'text', defaultValue: d.applyCta.eyebrow },
      { name: 'applyTitle', type: 'text', defaultValue: d.applyCta.title },
      { name: 'applyDescription', type: 'textarea', defaultValue: d.applyCta.description },
      { name: 'applyCtaLabel', type: 'text', defaultValue: d.applyCta.ctaLabel },
      { name: 'applyCtaUrl', type: 'text', defaultValue: d.applyCta.ctaHref },
    ],
  },
]
