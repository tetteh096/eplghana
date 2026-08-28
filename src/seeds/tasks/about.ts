import type { Payload } from 'payload'

import {
  aboutPageApproach,
  aboutPageImages,
  aboutPageImpact,
  aboutPageImpactImage,
  aboutPageIntro,
  aboutPageMission,
  aboutPagePartnerReasons,
  aboutPageStats,
  aboutPageStory,
  aboutPageVision,
} from '@/config/aboutPageContent'

import { createImageImporter, updatePageBySlug } from '../utils'

const TAG = 'about'

export async function seedAbout(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)

  const partnerItems = []
  for (const item of aboutPagePartnerReasons.items) {
    partnerItems.push({
      title: item.title,
      body: item.body,
      icon: await importImage(item.icon, item.title),
      accent: item.accent,
    })
  }

  const about = {
    introEyebrow: aboutPageIntro.eyebrow,
    introLead: aboutPageIntro.paragraphs[0],
    introImage: await importImage(aboutPageImages.intro, 'About EPL Ghana'),
    introSecondaryImage: await importImage(aboutPageImages.approach, 'EPL Ghana fellowship'),
    approachTitle: aboutPageApproach.title,
    approachBullets: aboutPageApproach.bullets.map((text) => ({ text })),
    growthHighlight: aboutPageStory.growth.highlight,
    growthHighlightLabel: aboutPageStory.growth.highlightLabel,
    growthTitle: aboutPageStory.growth.title,
    growthBody: aboutPageStory.growth.body,
    investmentTitle: aboutPageStory.investment.title,
    investmentBody: aboutPageStory.investment.body,
    mission: {
      eyebrow: aboutPageMission.eyebrow,
      title: aboutPageMission.title,
      body: aboutPageMission.body,
      image: await importImage(aboutPageMission.image, 'EPL Ghana mission'),
    },
    vision: {
      eyebrow: aboutPageVision.eyebrow,
      title: aboutPageVision.title,
      body: aboutPageVision.body,
      image: await importImage(aboutPageVision.image, 'EPL Ghana vision'),
    },
    impact: {
      image: await importImage(aboutPageImpactImage, 'EPL Ghana impact'),
      heading: 'Beyond the Numbers',
      intro: 'The human impact of embedding ethical leaders inside Ghana’s public institutions.',
      items: aboutPageImpact.map((i) => ({ title: i.title, body: i.body })),
    },
    partner: {
      eyebrow: aboutPagePartnerReasons.eyebrow,
      title: aboutPagePartnerReasons.title,
      lead: aboutPagePartnerReasons.lead,
      body: aboutPagePartnerReasons.body,
      chooseLabel: aboutPagePartnerReasons.chooseLabel,
      items: partnerItems,
    },
    stats: aboutPageStats.map((s) => ({ value: s.value, label: s.label })),
  }

  await updatePageBySlug(payload, '/about', { about }, TAG)
}
