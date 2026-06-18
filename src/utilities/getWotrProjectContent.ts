import { womenOnTheRiseContent } from '@/config/womenOnTheRiseContent'
import { resolveProjectImage } from '@/config/eplMedia'
import type { Project } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type WotrGalleryItem = {
  src: string
  layout: string
  alt: string
}

export type WotrProjectContent = {
  hero: (typeof womenOnTheRiseContent)['hero'] & {
    images: [string, string]
    badge: { value: string; label: string }
  }
  aboutEyebrow: string
  aboutTitle: string
  aboutImage: string
  whyItMatters: typeof womenOnTheRiseContent.whyItMatters
  impact: typeof womenOnTheRiseContent.impact & { eyebrow: string }
  outcomes: typeof womenOnTheRiseContent.outcomes & { eyebrow: string }
  keySuccess: typeof womenOnTheRiseContent.keySuccess
  gallery: { eyebrow: string; title: string; items: WotrGalleryItem[] }
  relatedArticles: typeof womenOnTheRiseContent.relatedArticles
  getInvolvedCta: typeof womenOnTheRiseContent.getInvolvedCta
  partnerCta: typeof womenOnTheRiseContent.partnerCta
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

/**
 * Women on the Rise detail content from Projects → wotrDetail, layered over config.
 */
export async function getWotrProjectContent(
  slug = 'women-on-the-rise',
): Promise<WotrProjectContent> {
  const d = womenOnTheRiseContent
  const cms: Record<string, any> = {}
  let heroPrimary = d.hero.images[0]

  const payload = await tryGetPayload()
  if (payload) {
    try {
      const result = await payload.find({
        collection: 'projects',
        depth: 2,
        limit: 1,
        where: { slug: { equals: slug } },
      })
      const project = toPlain(result.docs[0]) as Project | null
      if (project?.wotrDetail) Object.assign(cms, project.wotrDetail)
      heroPrimary =
        resolveProjectImage(slug, getMediaUrl(project?.featuredImage)) ?? d.hero.images[0]

      const partners =
        Array.isArray(cms.heroPartners) && cms.heroPartners.length
          ? cms.heroPartners.map((p: any) => p?.name).filter(Boolean)
          : d.hero.partners

      const highlights =
        Array.isArray(cms.heroHighlights) && cms.heroHighlights.length
          ? cms.heroHighlights.map((h: any) => ({
              value: h?.value ?? '',
              label: h?.label ?? '',
            }))
          : d.hero.highlights

      const whyItMattersItems =
        Array.isArray(cms.whyItMattersItems) && cms.whyItMattersItems.length
          ? cms.whyItMattersItems.map((item: any, idx: number) => ({
              title: item?.title ?? '',
              description: item?.description ?? '',
              icon: item?.icon ?? d.whyItMatters.items[idx]?.icon ?? 'flaticon-love',
            }))
          : d.whyItMatters.items

      const impactStats =
        Array.isArray(cms.impactStats) && cms.impactStats.length
          ? cms.impactStats.map((s: any, idx: number) => ({
              value: s?.value ?? '',
              label: s?.label ?? '',
              icon: img(s?.icon, d.impact.stats[idx]?.icon ?? ''),
            }))
          : d.impact.stats

      const outcomeItems =
        Array.isArray(cms.outcomeItems) && cms.outcomeItems.length
          ? cms.outcomeItems.map((item: any, idx: number) => ({
              title: item?.title ?? '',
              description: item?.description ?? '',
              image: img(item?.image, d.outcomes.items[idx]?.image ?? heroPrimary),
            }))
          : d.outcomes.items

      const keySuccessStories =
        Array.isArray(cms.keySuccessStories) && cms.keySuccessStories.length
          ? cms.keySuccessStories.map((story: any, idx: number) => ({
              title: story?.title ?? '',
              paragraphs: Array.isArray(story.paragraphs)
                ? story.paragraphs.map((p: any) => p?.text).filter(Boolean)
                : (d.keySuccess.stories[idx]?.paragraphs ?? []),
              images: [
                img(story?.imagePrimary, d.keySuccess.stories[idx]?.images[0] ?? heroPrimary),
                img(
                  story?.imageSecondary,
                  d.keySuccess.stories[idx]?.images[1] ??
                    d.keySuccess.stories[idx]?.images[0] ??
                    heroPrimary,
                ),
              ],
            }))
          : d.keySuccess.stories

      const galleryItems: WotrGalleryItem[] =
        Array.isArray(cms.galleryItems) && cms.galleryItems.length
          ? cms.galleryItems.map((item: any, idx: number) => ({
              src: img(item?.image, d.gallery.items[idx]?.src ?? heroPrimary),
              layout: item?.layout ?? d.gallery.items[idx]?.layout ?? 'wide',
              alt: item?.alt ?? d.gallery.items[idx]?.alt ?? '',
            }))
          : d.gallery.items

      const relatedArticlesItems =
        Array.isArray(cms.relatedArticlesItems) && cms.relatedArticlesItems.length
          ? cms.relatedArticlesItems.map((item: any, idx: number) => ({
              title: item?.title ?? '',
              href: item?.href ?? '/blog',
              image: img(item?.image, d.relatedArticles.items[idx]?.image ?? ''),
            }))
          : d.relatedArticles.items

      return {
        hero: {
          eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
          title: txt(cms.heroTitle, d.hero.title),
          lead: txt(cms.heroLead, d.hero.lead),
          description: txt(cms.heroDescription, d.hero.description),
          images: [heroPrimary, img(cms.heroSecondaryImage, d.hero.images[1])],
          badge: {
            value: txt(cms.heroBadgeValue, 'Since 2024'),
            label: txt(cms.heroBadgeLabel, 'Gender-responsive public service'),
          },
          partners,
          highlights,
          ctaLabel: txt(cms.heroCtaLabel, d.hero.ctaLabel),
          ctaHref: txt(cms.heroCtaUrl, d.hero.ctaHref),
          secondaryCtaLabel: txt(cms.heroSecondaryCtaLabel, d.hero.secondaryCtaLabel),
          secondaryCtaHref: txt(cms.heroSecondaryCtaUrl, d.hero.secondaryCtaHref),
        },
        aboutEyebrow: txt(cms.aboutEyebrow, 'About the Project'),
        aboutTitle: txt(cms.aboutTitle, 'Building inclusive institutions'),
        aboutImage: img(cms.aboutImage, d.aboutImage),
        whyItMatters: {
          eyebrow: txt(cms.whyItMattersEyebrow, d.whyItMatters.eyebrow),
          title: txt(cms.whyItMattersTitle, d.whyItMatters.title),
          items: whyItMattersItems,
        },
        impact: {
          eyebrow: txt(cms.impactEyebrow, 'Measurable change'),
          title: txt(cms.impactTitle, d.impact.title),
          stats: impactStats,
        },
        outcomes: {
          eyebrow: txt(cms.outcomesEyebrow, 'What we deliver'),
          title: txt(cms.outcomesTitle, d.outcomes.title),
          items: outcomeItems,
        },
        keySuccess: {
          eyebrow: txt(cms.keySuccessEyebrow, d.keySuccess.eyebrow),
          stories: keySuccessStories,
        },
        gallery: {
          eyebrow: txt(cms.galleryEyebrow, 'RiwoCo in pictures'),
          title: txt(cms.galleryTitle, d.gallery.title),
          items: galleryItems,
        },
        relatedArticles: {
          title: txt(cms.relatedArticlesTitle, d.relatedArticles.title),
          items: relatedArticlesItems,
        },
        getInvolvedCta: {
          eyebrow: txt(cms.involvedEyebrow, d.getInvolvedCta.eyebrow),
          title: txt(cms.involvedTitle, d.getInvolvedCta.title),
          description: txt(cms.involvedDescription, d.getInvolvedCta.description),
          ctaLabel: txt(cms.involvedCtaLabel, d.getInvolvedCta.ctaLabel),
          ctaHref: txt(cms.involvedCtaUrl, d.getInvolvedCta.ctaHref),
          secondaryCtaLabel: txt(cms.involvedSecondaryCtaLabel, d.getInvolvedCta.secondaryCtaLabel),
          secondaryCtaHref: txt(cms.involvedSecondaryCtaUrl, d.getInvolvedCta.secondaryCtaHref),
        },
        partnerCta: {
          title: txt(cms.partnerTitle, d.partnerCta.title),
          ctaLabel: txt(cms.partnerCtaLabel, d.partnerCta.ctaLabel),
          ctaHref: txt(cms.partnerCtaUrl, d.partnerCta.ctaHref),
          image: img(cms.partnerImage, d.partnerCta.image),
        },
      }
    } catch {
      // fall through
    }
  }

  return {
    hero: {
      ...d.hero,
      images: [d.hero.images[0], d.hero.images[1]],
      badge: { value: 'Since 2024', label: 'Gender-responsive public service' },
    },
    aboutEyebrow: 'About the Project',
    aboutTitle: 'Building inclusive institutions',
    aboutImage: d.aboutImage,
    whyItMatters: d.whyItMatters,
    impact: { eyebrow: 'Measurable change', ...d.impact },
    outcomes: { eyebrow: 'What we deliver', ...d.outcomes },
    keySuccess: d.keySuccess,
    gallery: { eyebrow: 'RiwoCo in pictures', ...d.gallery },
    relatedArticles: d.relatedArticles,
    getInvolvedCta: d.getInvolvedCta,
    partnerCta: d.partnerCta,
  }
}
