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
    ecosystemHighlightsLabel: d.ecosystem.highlightsLabel,
    ecosystemCategories: await Promise.all(
      d.ecosystem.categories.map(async (c) => ({
        code: c.id,
        title: c.title,
        description: c.description,
        highlights: c.highlights.map((text) => ({ text })),
        image: await importImage(c.image, `${c.title} partnership`),
      })),
    ),
    networkTitle: d.network.title,
    networkIntro: d.network.intro,
    formEyebrow: d.form.eyebrow,
    formTitle: d.form.title,
    formDescription: d.form.description,
    formSubmitLabel: d.form.submitLabel,
  }

  await updatePageBySlug(payload, '/community/partners', { partnersPage }, TAG)
}
