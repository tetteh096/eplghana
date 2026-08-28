import type { Payload } from 'payload'

import { getInvolvedPageContent } from '@/config/getInvolvedContent'

import { createImageImporter, updatePageBySlug } from '../utils'

const TAG = 'get-involved-page'

export async function seedGetInvolvedPage(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)
  const d = getInvolvedPageContent

  const getInvolvedPage = {
    heroEyebrow: d.hero.eyebrow,
    heroBadge: d.hero.badge,
    fellowshipTitle: d.hero.fellowshipTitle,
    fellowshipDescription: d.hero.fellowshipDescription,
    fellowshipCtaLabel: d.hero.fellowshipCtaLabel,
    heroImage: await importImage(d.hero.image, 'Public Service Fellowship'),
    heroSecondaryImage: await importImage(d.hero.secondaryImage, 'EPL Ghana fellows'),
    imageBadgeValue: d.hero.imageBadge.value,
    imageBadgeLabel: d.hero.imageBadge.label,
    heroHighlights: d.hero.highlights,
    secondaryCtaLabel: d.hero.secondaryCta.label,
    secondaryCtaUrl: d.hero.secondaryCta.href,
    pathwaysEyebrow: 'Ways to engage',
    pathwaysTitle: 'Find your path with EPL Ghana',
    pathways: d.pathways.map((pathway) => ({
      anchorId: pathway.id,
      title: pathway.title,
      body: pathway.body,
      bullets: pathway.bullets.map((text) => ({ text })),
      ctaLabel: pathway.ctaLabel,
      ctaHref: pathway.ctaHref,
    })),
    registerEyebrow: d.registerInterest.eyebrow,
    registerTitle: d.registerInterest.title,
    registerDescription: d.registerInterest.description,
    registerSubmitLabel: d.registerInterest.submitLabel,
    registerPoints: [
      { text: 'Get notified when the next fellowship cohort opens' },
      { text: 'Receive fellowship events and briefing updates' },
      { text: 'Connect with EPL Ghana’s recruitment team' },
    ],
  }

  await updatePageBySlug(payload, '/get-involved', { getInvolvedPage }, TAG)
}
