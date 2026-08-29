import type { Payload } from 'payload'

import { partnersPageContent } from '@/config/partnersPageContent'

import { createImageImporter, updatePageBySlug } from '../utils'

const TAG = 'partners-page'

export async function seedPartnersPage(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)
  const d = partnersPageContent

  const partnersPage = {
    heroEyebrow: d.hero.eyebrow,
    heroTitle: d.hero.title,
    heroLead: d.hero.lead,
    heroCtaLabel: d.hero.ctaLabel,
    heroCtaUrl: d.hero.ctaHref,
    heroImage: await importImage(d.hero.image, 'EPL Ghana partners'),
    heroSecondaryImage: await importImage(d.hero.secondaryImage, 'EPL Ghana collaboration event'),
    heroStats: d.hero.stats.map((s) => ({ value: s.value, label: s.label })),
    collabEyebrow: d.collaboration.eyebrow,
    collabTitle: d.collaboration.title,
    collabLead: d.collaboration.lead,
    collabBenefits: d.collaboration.benefits,
    collabHighlightValue: d.collaboration.highlightValue,
    collabHighlightTitle: d.collaboration.highlightTitle,
    collabHighlightText: d.collaboration.highlightText,
    collabImage: await importImage(d.collaboration.image, 'EPL Ghana community gathering'),
    ecosystemEyebrow: d.ecosystem.eyebrow,
    ecosystemTitle: d.ecosystem.title,
    ecosystemIntro: d.ecosystem.intro,
    ecosystemLearnMoreLabel: d.ecosystem.learnMoreLabel,
    ecosystemCloseLabel: d.ecosystem.closeLabel,
    ecosystemHighlightsLabel: d.ecosystem.highlightsLabel,
    ecosystemCategories: d.ecosystem.categories.map((c) => ({
      code: c.id,
      title: c.title,
      description: c.description,
      highlights: c.highlights.map((text) => ({ text })),
    })),
    networkEyebrow: d.network.eyebrow,
    networkTitle: d.network.title,
    networkIntro: d.network.intro,
    strategicEyebrow: d.partners.eyebrow,
    strategicTitle: d.partners.title,
    strategicIntro: d.partners.intro,
    hostEyebrow: d.partnerOrganizations.eyebrow,
    hostTitle: d.partnerOrganizations.title,
    hostIntro: d.partnerOrganizations.intro,
    formEyebrow: d.form.eyebrow,
    formTitle: d.form.title,
    formDescription: d.form.description,
    formSubmitLabel: d.form.submitLabel,
    ctaTitle: d.cta.title,
    ctaDescription: d.cta.description,
    ctaLabel: d.cta.ctaLabel,
    ctaUrl: d.cta.ctaHref,
  }

  await updatePageBySlug(payload, '/community/partners', { partnersPage }, TAG)
}
