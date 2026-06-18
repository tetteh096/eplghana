import type { Payload } from 'payload'

import { annualReportsPageContent } from '@/config/annualReportsContent'

import { updatePageBySlug } from '../utils'

const TAG = 'annual-reports-page'

export async function seedAnnualReportsPage(payload: Payload): Promise<void> {
  const d = annualReportsPageContent

  const annualReportsPage = {
    heroLead: d.hero.lead,
    introText: d.intro,
    reportsEyebrow: 'Impact Reports',
    reportsTitle: 'Annual publications',
    relatedEyebrow: 'Related Publications',
    relatedTitle: 'Research & impact documents',
    ctaTitle: d.cta.title,
    ctaBody: d.cta.body,
    ctaLabel: d.cta.ctaLabel,
    ctaUrl: d.cta.ctaHref,
  }

  await updatePageBySlug(
    payload,
    '/knowledge-products/annual-reports',
    { annualReportsPage },
    TAG,
  )
}
