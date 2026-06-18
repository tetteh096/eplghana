import type { Payload } from 'payload'

import { partnersPageContent } from '@/config/partnersPageContent'

import { createImageImporter, updatePageBySlug } from '../utils'

const TAG = 'partners-page'

export async function seedPartnersPage(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)
  const d = partnersPageContent

  const partnersPage = {
    heroEyebrow: d.hero.eyebrow,
    heroLead: d.hero.lead,
    heroImage: await importImage(d.hero.image, 'EPL Ghana partners'),
    heroSecondaryImage: await importImage(d.hero.secondaryImage, 'EPL Ghana collaboration event'),
    heroStats: d.hero.stats.map((s) => ({ value: s.value, label: s.label })),
    strategicEyebrow: d.partners.eyebrow,
    strategicTitle: d.partners.title,
    strategicIntro: d.partners.intro,
    hostEyebrow: d.partnerOrganizations.eyebrow,
    hostTitle: d.partnerOrganizations.title,
    hostIntro: d.partnerOrganizations.intro,
    ctaTitle: d.cta.title,
    ctaDescription: d.cta.description,
    ctaLabel: d.cta.ctaLabel,
    ctaUrl: d.cta.ctaHref,
  }

  await updatePageBySlug(payload, '/community/partners', { partnersPage }, TAG)
}
