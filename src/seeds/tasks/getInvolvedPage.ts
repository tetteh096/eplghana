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
    fellowshipTitle: 'Your chapter in public service starts here',
    fellowshipDescription:
      'Join the 2026 Public Service Fellowship, a transformative year inside Ghana’s ministries, agencies, and commissions, with the training, mentorship, and network to lead with integrity.',
    fellowshipCtaLabel: 'Register Interest',
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
      { text: 'Be first to know when applications open' },
      { text: 'Receive fellowship events and briefing updates' },
      { text: 'Connect with EPL Ghana’s recruitment team' },
    ],
  }

  await updatePageBySlug(payload, '/get-involved', { getInvolvedPage }, TAG)
}
