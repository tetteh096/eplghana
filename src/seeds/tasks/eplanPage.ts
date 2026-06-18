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
    heroSubtitle: d.hero.subtitle,
    heroLead: d.hero.lead,
    heroImage: await importImage(d.hero.image, 'EPL Ghana alumni graduation'),
    heroSecondaryImage: await importImage(d.hero.secondaryImage, 'EPL Ghana alumni celebration'),
    heroBadgeValue: d.hero.badge.value,
    heroBadgeLabel: d.hero.badge.label,
    heroHighlights: d.hero.highlights,
    heroPrimaryCtaLabel: d.hero.primaryCta.label,
    heroPrimaryCtaUrl: d.hero.primaryCta.href,
    heroSecondaryCtaLabel: d.hero.secondaryCta.label,
    heroSecondaryCtaUrl: d.hero.secondaryCta.href,
    aboutEyebrow: d.eplanAbout.eyebrow,
    aboutTitle: d.eplanAbout.title,
    aboutParagraphs: d.eplanAbout.paragraphs.map((text) => ({ text })),
    aboutImage: await importImage(d.eplanAbout.image, 'EPLAN members at a fellows convening'),
    visionEyebrow: d.vision.eyebrow,
    visionTitle: d.vision.title,
    visionText: d.vision.text,
    impactEyebrow: d.impact.eyebrow,
    impactTitle: d.impact.title,
    impactStats: d.impact.stats,
    conveningEyebrow: d.convening.eyebrow,
    conveningTitle: d.convening.title,
    conveningBody: d.convening.body,
    conveningImage: await importImage(d.convening.image, 'Annual End-of-Year Fellows Convening'),
    globalEyebrow: d.globalGathering.eyebrow,
    globalTitle: d.globalGathering.title,
    globalLead: d.globalGathering.lead,
    globalBody: d.globalGathering.body,
    globalHighlights: d.globalGathering.highlights.map((text) => ({ text })),
    globalImages: await Promise.all(
      d.globalGathering.images.map(async (image) => ({
        image: await importImage(image.src, image.alt),
        alt: image.alt,
        caption: image.caption,
        layout: image.layout,
      })),
    ),
    journeyEyebrow: d.journey.eyebrow,
    journeyTitle: d.journey.title,
    journeyIntro: d.journey.intro,
    journeySteps: d.journey.steps,
    storiesEyebrow: d.stories.eyebrow,
    storiesTitle: d.stories.title,
    storiesIntro: d.stories.intro,
    featuredEyebrow: d.featured.eyebrow,
    featuredTitle: d.featured.title,
    featuredIntro: d.featured.intro,
    pathwaysEyebrow: d.pathways.eyebrow,
    pathwaysTitle: d.pathways.title,
    pathwaysIntro: d.pathways.intro,
    pathwaysItems: d.pathways.items,
    milestoneEyebrow: d.milestone.eyebrow,
    milestoneTitle: d.milestone.title,
    milestoneBody: d.milestone.body,
    milestoneCtaLabel: d.milestone.ctaLabel,
    milestoneCtaUrl: d.milestone.ctaHref,
    milestoneImage: await importImage(d.milestone.image, d.milestone.title),
    galleryEyebrow: d.gallery.eyebrow,
    galleryTitle: d.gallery.title,
    galleryImages: await Promise.all(
      d.gallery.images.map(async (image) => ({
        image: await importImage(image.src, image.alt),
        alt: image.alt,
      })),
    ),
    newsEyebrow: d.news.eyebrow,
    newsTitle: d.news.title,
    newsIntro: d.news.intro,
    newsItems: await Promise.all(
      d.news.items.map(async (item) => ({
        title: item.title,
        excerpt: item.excerpt,
        image: await importImage(item.image, item.title),
        href: item.href,
      })),
    ),
    networkEyebrow: d.network.eyebrow,
    networkTitle: d.network.title,
    networkIntro: d.network.intro,
    networkBenefits: d.network.benefits,
    networkGlobalLinkLabel: d.network.globalLink.label,
    networkGlobalLinkUrl: d.network.globalLink.href,
    quoteText: d.quote.text,
    quoteAttribution: d.quote.attribution,
    quoteRole: d.quote.role,
    ctaTitle: d.cta.title,
    ctaBody: d.cta.body,
    ctaPrimaryLabel: d.cta.primaryLabel,
    ctaPrimaryUrl: d.cta.primaryHref,
    ctaSecondaryLabel: d.cta.secondaryLabel,
    ctaSecondaryUrl: d.cta.secondaryHref,
    ctaImage: await importImage(d.cta.image, 'EPLAN fellowship'),
  }

  await updatePageBySlug(payload, '/community/eplan', { eplanPage }, TAG)
}
