import type { Field } from 'payload'

import { eplImpactStats } from '@/config/epl-defaults'
import { publicServiceFellowshipContent } from '@/config/publicServiceFellowshipContent'

const d = publicServiceFellowshipContent

/** Editable content for the Public Service Fellowship detail page layout. */
export const fellowshipDetailFields: Field[] = [
  {
    type: 'collapsible',
    label: 'Hero',
    fields: [
      { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
      { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
      { name: 'heroDescription', type: 'textarea', defaultValue: d.hero.description },
      {
        name: 'heroSecondaryImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Secondary hero image',
        admin: { description: 'Portrait image on the right. Primary uses the wide card image above.' },
      },
      { name: 'badgeValue', type: 'text', defaultValue: d.hero.badge.value },
      { name: 'badgeLabel', type: 'text', defaultValue: d.hero.badge.label },
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
    label: 'Impact stats',
    fields: [
      { name: 'impactEyebrow', type: 'text', defaultValue: d.impact.eyebrow },
      { name: 'impactTitle', type: 'text', defaultValue: d.impact.title },
      {
        name: 'impactStats',
        type: 'array',
        labels: { singular: 'Stat', plural: 'Impact stats' },
        defaultValue: eplImpactStats.map((s) => ({ value: s.value, label: s.label })),
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'text', required: true },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Why join',
    fields: [
      { name: 'whyJoinEyebrow', type: 'text', defaultValue: d.whyJoin.eyebrow },
      { name: 'whyJoinTitle', type: 'text', defaultValue: d.whyJoin.title },
      {
        name: 'whyJoinItems',
        type: 'array',
        labels: { singular: 'Reason', plural: 'Reasons' },
        defaultValue: d.whyJoin.items.map((item) => ({
          title: item.title,
          description: item.description,
          icon: item.icon,
        })),
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
          {
            name: 'icon',
            type: 'text',
            admin: { description: 'Flaticon class, e.g. flaticon-love' },
          },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Programme structure tab',
    fields: [
      { name: 'structureSidebarEyebrow', type: 'text', defaultValue: '12-Month Journey' },
      { name: 'structureTitle', type: 'text', defaultValue: d.programmeStructure.title },
      { name: 'structureIntro', type: 'textarea', defaultValue: d.programmeStructure.intro },
      {
        name: 'structureSidebarImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Sidebar image',
      },
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
          { name: 'image', type: 'upload', relationTo: 'media' },
        ],
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
        name: 'processBannerImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Banner image',
      },
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
          { name: 'image', type: 'upload', relationTo: 'media' },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Eligibility tab',
    fields: [
      { name: 'eligibilityTitle', type: 'text', defaultValue: d.eligibility.title },
      { name: 'eligibilityIntro', type: 'textarea', defaultValue: d.eligibility.intro },
      {
        name: 'eligibilitySidebarImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Sidebar image',
      },
      {
        name: 'eligibilityCriteria',
        type: 'array',
        labels: { singular: 'Criterion', plural: 'Criteria' },
        defaultValue: d.eligibility.criteria.map((text) => ({ text })),
        fields: [{ name: 'text', type: 'text', required: true }],
      },
      { name: 'documentsTitle', type: 'text', defaultValue: d.eligibility.documentsTitle },
      {
        name: 'documents',
        type: 'array',
        labels: { singular: 'Document', plural: 'Documents to upload' },
        defaultValue: d.eligibility.documents.map((text) => ({ text })),
        fields: [{ name: 'text', type: 'text', required: true }],
      },
      { name: 'inclusionNote', type: 'textarea', defaultValue: d.eligibility.inclusionNote },
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
      { name: 'applySecondaryCtaLabel', type: 'text', defaultValue: d.applyCta.secondaryCtaLabel },
      { name: 'applySecondaryCtaUrl', type: 'text', defaultValue: d.applyCta.secondaryCtaHref },
    ],
  },
  {
    type: 'collapsible',
    label: 'Partner CTA',
    fields: [
      { name: 'partnerTitle', type: 'text', defaultValue: d.partnerCta.title },
      { name: 'partnerCtaLabel', type: 'text', defaultValue: d.partnerCta.ctaLabel },
      { name: 'partnerCtaUrl', type: 'text', defaultValue: d.partnerCta.ctaHref },
      {
        name: 'partnerImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Partner section image',
      },
    ],
  },
]
