import type { Field } from 'payload'

import { getInvolvedPageContent } from '@/config/getInvolvedContent'

const d = getInvolvedPageContent

/** Get Involved landing page copy. */
export const getInvolvedPageFields: Field[] = [
  {
    type: 'group',
    name: 'getInvolvedPage',
    label: 'Get Involved page',
    admin: {
      condition: (data) => data?.slug === '/get-involved',
      description: 'Landing page headline and call-to-action buttons.',
    },
    fields: [
      { name: 'heroEyebrow', type: 'text', defaultValue: d.eyebrow, label: 'Eyebrow' },
      { name: 'fellowshipTitle', type: 'text', defaultValue: d.title, label: 'Title' },
      {
        name: 'fellowshipDescription',
        type: 'textarea',
        defaultValue: d.body,
        label: 'Description',
      },
      {
        name: 'primaryCtaLabel',
        type: 'text',
        defaultValue: d.primaryCta.label,
        label: 'Primary button label',
      },
      { name: 'primaryCtaUrl', type: 'text', defaultValue: d.primaryCta.href, label: 'Primary button URL' },
      {
        name: 'secondaryCtaLabel',
        type: 'text',
        defaultValue: d.secondaryCta.label,
        label: 'Secondary button label',
      },
      {
        name: 'secondaryCtaUrl',
        type: 'text',
        defaultValue: d.secondaryCta.href,
        label: 'Secondary button URL',
      },
    ],
  },
]
