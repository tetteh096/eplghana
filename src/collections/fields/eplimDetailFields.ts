import type { Field } from 'payload'

import { eplimContent } from '@/config/eplimContent'

const d = eplimContent

/** Editable content for the Elevated MINDS detail page layout. */
export const eplimDetailFields: Field[] = [
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
        label: 'Secondary / capacity image',
        admin: { description: 'Primary hero uses the wide card image above.' },
      },
      { name: 'heroCtaLabel', type: 'text', defaultValue: d.hero.ctaLabel },
      { name: 'heroCtaUrl', type: 'text', defaultValue: d.hero.ctaHref },
    ],
  },
  {
    type: 'collapsible',
    label: 'Overview',
    fields: [
      { name: 'aboutEyebrow', type: 'text', defaultValue: d.aboutEyebrow },
      { name: 'aboutTitle', type: 'text', defaultValue: d.aboutTitle },
      { name: 'aboutImage', type: 'upload', relationTo: 'media', label: 'Overview image' },
    ],
  },
  {
    type: 'collapsible',
    label: 'Capacity building',
    fields: [
      { name: 'capacityEyebrow', type: 'text', defaultValue: d.capacityBuilding.eyebrow },
      { name: 'capacityTitle', type: 'text', defaultValue: d.capacityBuilding.title },
      { name: 'capacityDescription', type: 'textarea', defaultValue: d.capacityBuilding.description },
      { name: 'capacityImage', type: 'upload', relationTo: 'media', label: 'Capacity image' },
    ],
  },
  {
    type: 'collapsible',
    label: 'Core focus areas',
    fields: [
      { name: 'focusEyebrow', type: 'text', defaultValue: d.whyItMatters.eyebrow },
      { name: 'focusTitle', type: 'text', defaultValue: d.whyItMatters.title },
      {
        name: 'focusItems',
        type: 'array',
        labels: { singular: 'Focus area', plural: 'Focus areas' },
        defaultValue: d.whyItMatters.items,
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Impact & join CTA',
    fields: [
      { name: 'impactEyebrow', type: 'text', defaultValue: d.impact.eyebrow },
      { name: 'impactTitle', type: 'text', defaultValue: d.impact.title },
      { name: 'impactDescription', type: 'textarea', defaultValue: d.impact.description },
      { name: 'impactImage', type: 'upload', relationTo: 'media', label: 'Impact image' },
      { name: 'impactCtaLabel', type: 'text', defaultValue: d.impact.ctaLabel },
      { name: 'impactCtaUrl', type: 'text', defaultValue: d.impact.ctaHref },
    ],
  },
]
