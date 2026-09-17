import type { Payload } from 'payload'

import { alumniPageContent } from '@/config/alumniPageContent'

import { createImageImporter, updatePageBySlug } from '../utils'

const TAG = 'eplan-page'

export async function seedEplanPage(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)
  const d = alumniPageContent

  const eplanPage = {
    heroEyebrow: d.hero.eyebrow,
    heroTitle: d.hero.title,
    heroLead: d.hero.lead,
    heroImage: await importImage(d.hero.image, 'EPL Ghana alumni graduation'),
    heroHighlights: d.hero.highlights,
    heroPrimaryCtaLabel: d.hero.primaryCta.label,
    heroPrimaryCtaUrl: d.hero.primaryCta.href,
    heroSecondaryCtaLabel: d.hero.secondaryCta.label,
    heroSecondaryCtaUrl: d.hero.secondaryCta.href,
    visionEyebrow: d.vision.eyebrow,
    visionText: d.vision.text,
    missionEyebrow: d.mission.eyebrow,
    missionText: d.mission.text,
    executivesEyebrow: d.executives.eyebrow,
    executivesTitle: d.executives.title,
    executivesIntro: d.executives.intro,
    sustainEyebrow: d.sustain.eyebrow,
    sustainTitle: d.sustain.title,
    sustainLead: d.sustain.lead,
    sustainNote: d.sustain.note,
    sustainImage: await importImage(d.sustain.image, d.sustain.imageAlt),
    sustainImageAlt: d.sustain.imageAlt,
    sustainPillars: d.sustain.pillars,
    spotlightEyebrow: d.spotlight.eyebrow,
    spotlightTitle: d.spotlight.title,
    spotlightIntro: d.spotlight.intro,
    spotlightItems: await Promise.all(
      d.spotlight.items.map(async (item) => ({
        tag: item.tag,
        title: item.title,
        description: item.description,
        href: item.href,
        image: await importImage(item.image, item.title),
      })),
    ),
    spotlightSupportCtaLabel: d.spotlight.supportCta.label,
    spotlightSupportCtaUrl: d.spotlight.supportCta.href,
  }

  await updatePageBySlug(payload, '/community/eplan', { eplanPage }, TAG)
}
