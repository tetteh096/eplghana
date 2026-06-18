import type { Payload } from 'payload'

import { currentFellowsPageContent } from '@/config/currentFellowsContent'

import { createImageImporter, updatePageBySlug } from '../utils'

const TAG = 'current-fellows-page'

export async function seedCurrentFellowsPage(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)
  const d = currentFellowsPageContent

  const currentFellowsPage = {
    heroEyebrow: d.hero.eyebrow,
    heroTitle: d.hero.title,
    heroLead: d.hero.lead,
    heroImage: await importImage(d.hero.image, 'EPL Ghana fellows'),
    heroSecondaryImage: await importImage(d.hero.secondaryImage, 'Fellows at a programme event'),
    highlightsEyebrow: 'Fellows Highlight',
    highlightsTitle: 'Leaders making impact',
    cohortLabel: d.cohort.label,
    cohortCount: d.cohort.count,
    cohortDescription:
      'Cohort VII is embedded across ministries, commissions, and public agencies, driving integrity and innovation where it matters most.',
    ctaTitle: d.cta.title,
    ctaBody: d.cta.body,
    ctaLabel: d.cta.ctaLabel,
    ctaUrl: d.cta.ctaHref,
    ctaImage: await importImage(d.cta.image, 'Public Service Fellowship'),
  }

  await updatePageBySlug(payload, '/community/current-fellows', { currentFellowsPage }, TAG)
}
