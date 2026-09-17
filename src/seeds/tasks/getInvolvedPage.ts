import type { Payload } from 'payload'

import { getInvolvedPageContent } from '@/config/getInvolvedContent'

import { updatePageBySlug } from '../utils'

const TAG = 'get-involved-page'

export async function seedGetInvolvedPage(payload: Payload): Promise<void> {
  const d = getInvolvedPageContent

  const getInvolvedPage = {
    heroEyebrow: d.eyebrow,
    fellowshipTitle: d.title,
    fellowshipDescription: d.body,
    primaryCtaLabel: d.primaryCta.label,
    primaryCtaUrl: d.primaryCta.href,
    secondaryCtaLabel: d.secondaryCta.label,
    secondaryCtaUrl: d.secondaryCta.href,
  }

  await updatePageBySlug(payload, '/get-involved', { getInvolvedPage }, TAG)
}
