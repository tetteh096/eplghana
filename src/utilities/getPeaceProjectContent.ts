import { peaceContent } from '@/config/peaceContent'
import { resolveProjectImage } from '@/config/eplMedia'
import type { Project } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type PeaceGalleryItem = {
  src: string
  layout: string
  alt: string
}

export type PeaceProjectContent = {
  hero: (typeof peaceContent)['hero'] & {
    images: [string, string]
    badge: { value: string; label: string }
  }
  aboutEyebrow: string
  aboutTitle: string
  aboutImage: string
  impact: typeof peaceContent.impact
  outcomes: typeof peaceContent.outcomes
  keySuccess: typeof peaceContent.keySuccess
  gallery: { title: string; items: PeaceGalleryItem[] }
  relatedArticles: typeof peaceContent.relatedArticles
  partnerCta: typeof peaceContent.partnerCta
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

/**
 * P.E.A.C.E detail content from Projects → peaceDetail, layered over config defaults.
 */
export async function getPeaceProjectContent(slug = 'peace'): Promise<PeaceProjectContent> {
  const d = peaceContent
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
      if (project?.peaceDetail) Object.assign(cms, project.peaceDetail)
      heroPrimary =
        resolveProjectImage(slug, getMediaUrl(project?.featuredImage)) ?? d.hero.images[0]

      const partners =
        Array.isArray(cms.heroPartners) && cms.heroPartners.length
          ? cms.heroPartners.map((p: any) => p?.name).filter(Boolean)
          : d.hero.partners

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

      const galleryItems: PeaceGalleryItem[] =
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
              href: item?.href ?? '/news',
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
            value: txt(cms.heroBadgeValue, '12 Months'),
            label: txt(cms.heroBadgeLabel, 'Peace & security leadership'),
          },
          partners,
          ctaLabel: txt(cms.heroCtaLabel, d.hero.ctaLabel),
          ctaHref: txt(cms.heroCtaUrl, d.hero.ctaHref),
        },
        aboutEyebrow: txt(cms.aboutEyebrow, 'About the Programme'),
        aboutTitle: txt(cms.aboutTitle, 'Peacebuilding from within the public sector'),
        aboutImage: img(cms.aboutImage, d.aboutImage),
        impact: {
          title: txt(cms.impactTitle, d.impact.title),
          stats: impactStats,
        },
        outcomes: {
          title: txt(cms.outcomesTitle, d.outcomes.title),
          items: outcomeItems,
        },
        keySuccess: {
          eyebrow: txt(cms.keySuccessEyebrow, d.keySuccess.eyebrow),
          stories: keySuccessStories,
        },
        gallery: {
          title: txt(cms.galleryTitle, d.gallery.title),
          items: galleryItems,
        },
        relatedArticles: {
          title: txt(cms.relatedArticlesTitle, d.relatedArticles.title),
          items: relatedArticlesItems,
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
      badge: { value: '12 Months', label: 'Peace & security leadership' },
    },
    aboutEyebrow: 'About the Programme',
    aboutTitle: 'Peacebuilding from within the public sector',
    aboutImage: d.aboutImage,
    impact: d.impact,
    outcomes: d.outcomes,
    keySuccess: d.keySuccess,
    gallery: d.gallery,
    relatedArticles: d.relatedArticles,
    partnerCta: d.partnerCta,
  }
}
