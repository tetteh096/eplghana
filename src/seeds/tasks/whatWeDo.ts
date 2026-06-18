import type { Payload } from 'payload'

import {
  whatWeDoApproach,
  whatWeDoCta,
  whatWeDoIntro,
} from '@/config/aboutSectionContent'

import { createImageImporter, updatePageBySlug } from '../utils'

const TAG = 'what-we-do'

export async function seedWhatWeDo(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)

  const whatWeDo = {
    introEyebrow: whatWeDoIntro.eyebrow,
    introTitle: whatWeDoIntro.title,
    introLead: whatWeDoIntro.lead,
    introParagraphs: whatWeDoIntro.paragraphs.map((text) => ({ text })),
    introImage: await importImage(whatWeDoIntro.image, 'EPL Ghana fellowship programme'),
    programmesEyebrow: 'Our Programmes',
    programmesTitle: 'Connected programmes, one mission',
    programmesCtaLabel: 'All Projects',
    programmesCtaUrl: '/projects',
    approachEyebrow: whatWeDoApproach.eyebrow,
    approachTitle: whatWeDoApproach.title,
    approachSteps: whatWeDoApproach.steps.map((step) => ({
      title: step.title,
      body: step.body,
    })),
    ctaTitle: whatWeDoCta.title,
    ctaBody: whatWeDoCta.body,
    ctaImage: await importImage(whatWeDoCta.image, 'EPL Ghana fellows at work'),
    ctaPrimaryLabel: whatWeDoCta.primary.label,
    ctaPrimaryUrl: whatWeDoCta.primary.href,
    ctaSecondaryLabel: whatWeDoCta.secondary.label,
    ctaSecondaryUrl: whatWeDoCta.secondary.href,
  }

  await updatePageBySlug(payload, '/about/what-we-do', { whatWeDo }, TAG)
}
