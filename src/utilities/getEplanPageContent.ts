import {
  alumniPageContent,
  alumniToTeamMember,
  type AlumniSpotlight,
  type AlumniStory,
} from '@/config/alumniPageContent'
import type { Alumnus, Page } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type EplanPageContent = typeof alumniPageContent

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

function mapStoryDoc(doc: Alumnus, fallback?: AlumniStory): AlumniStory {
  return {
    id: String(doc.id),
    name: doc.name,
    cohort: doc.cohort?.trim() || fallback?.cohort || '',
    institution: doc.institution?.trim() || fallback?.institution || '',
    headline: doc.headline?.trim() || fallback?.headline || '',
    body: doc.storyBody?.trim() || fallback?.body || '',
    photo: getMediaUrl(doc.photo) ?? fallback?.photo ?? '',
    quote: doc.quote?.trim() || fallback?.quote,
  }
}

function mapFeaturedDoc(doc: Alumnus, fallback?: AlumniSpotlight): AlumniSpotlight {
  const role = doc.featuredRole?.trim() || fallback?.currentRole || doc.institution?.trim() || ''
  return {
    id: String(doc.id),
    name: doc.name,
    cohort: doc.cohort?.trim() || fallback?.cohort || '',
    currentRole: role,
    bio: doc.profileBio?.trim() || doc.storyBody?.trim() || fallback?.bio || '',
    photo: getMediaUrl(doc.photo) ?? fallback?.photo ?? '',
    linkedin: doc.linkedin ?? undefined,
  }
}

function mapCmsPage(cms: Record<string, any>, d: typeof alumniPageContent): EplanPageContent {
  const aboutParagraphs =
    Array.isArray(cms.aboutParagraphs) && cms.aboutParagraphs.length
      ? cms.aboutParagraphs.map((p: any) => p?.text?.trim()).filter(Boolean)
      : d.eplanAbout.paragraphs

  const heroHighlights =
    Array.isArray(cms.heroHighlights) && cms.heroHighlights.length
      ? cms.heroHighlights.map((h: any) => ({ value: h?.value ?? '', label: h?.label ?? '' }))
      : d.hero.highlights

  const impactStats =
    Array.isArray(cms.impactStats) && cms.impactStats.length
      ? cms.impactStats.map((s: any) => ({ value: s?.value ?? '', label: s?.label ?? '' }))
      : d.impact.stats

  const globalHighlights =
    Array.isArray(cms.globalHighlights) && cms.globalHighlights.length
      ? cms.globalHighlights.map((h: any) => h?.text?.trim()).filter(Boolean)
      : d.globalGathering.highlights

  const globalImages =
    Array.isArray(cms.globalImages) && cms.globalImages.length
      ? cms.globalImages.map((item: any, index: number) => {
          const fallback = d.globalGathering.images[index]
          return {
            id: fallback?.id ?? `global-${index}`,
            src: img(item?.image, fallback?.src ?? ''),
            alt: txt(item?.alt, fallback?.alt ?? ''),
            caption: txt(item?.caption, fallback?.caption ?? ''),
            layout: (item?.layout as 'featured' | 'poster' | 'standard') || fallback?.layout || 'standard',
          }
        })
      : d.globalGathering.images

  const journeySteps =
    Array.isArray(cms.journeySteps) && cms.journeySteps.length
      ? cms.journeySteps.map((s: any) => ({
          step: s?.step ?? '',
          title: s?.title ?? '',
          description: s?.description ?? '',
        }))
      : d.journey.steps

  const pathwaysItems =
    Array.isArray(cms.pathwaysItems) && cms.pathwaysItems.length
      ? cms.pathwaysItems.map((p: any) => ({
          title: p?.title ?? '',
          description: p?.description ?? '',
          icon: p?.icon ?? '',
        }))
      : d.pathways.items

  const galleryImages =
    Array.isArray(cms.galleryImages) && cms.galleryImages.length
      ? cms.galleryImages.map((g: any, index: number) => ({
          src: img(g?.image, d.gallery.images[index]?.src ?? ''),
          alt: txt(g?.alt, d.gallery.images[index]?.alt ?? ''),
        }))
      : d.gallery.images

  const newsItems =
    Array.isArray(cms.newsItems) && cms.newsItems.length
      ? cms.newsItems.map((n: any, index: number) => ({
          title: n?.title ?? '',
          excerpt: n?.excerpt ?? '',
          image: img(n?.image, d.news.items[index]?.image ?? ''),
          href: txt(n?.href, d.news.items[index]?.href ?? '#'),
        }))
      : d.news.items

  const networkBenefits =
    Array.isArray(cms.networkBenefits) && cms.networkBenefits.length
      ? cms.networkBenefits.map((b: any) => ({
          title: b?.title ?? '',
          description: b?.description ?? '',
          icon: b?.icon ?? '',
        }))
      : d.network.benefits

  return {
    hero: {
      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
      title: txt(cms.heroTitle, d.hero.title),
      subtitle: txt(cms.heroSubtitle, d.hero.subtitle),
      lead: txt(cms.heroLead, d.hero.lead),
      image: img(cms.heroImage, d.hero.image),
      secondaryImage: img(cms.heroSecondaryImage, d.hero.secondaryImage),
      badge: {
        value: txt(cms.heroBadgeValue, d.hero.badge.value),
        label: txt(cms.heroBadgeLabel, d.hero.badge.label),
      },
      highlights: heroHighlights,
      primaryCta: {
        label: txt(cms.heroPrimaryCtaLabel, d.hero.primaryCta.label),
        href: txt(cms.heroPrimaryCtaUrl, d.hero.primaryCta.href),
      },
      secondaryCta: {
        label: txt(cms.heroSecondaryCtaLabel, d.hero.secondaryCta.label),
        href: txt(cms.heroSecondaryCtaUrl, d.hero.secondaryCta.href),
      },
    },
    eplanAbout: {
      eyebrow: txt(cms.aboutEyebrow, d.eplanAbout.eyebrow),
      title: txt(cms.aboutTitle, d.eplanAbout.title),
      paragraphs: aboutParagraphs,
      image: img(cms.aboutImage, d.eplanAbout.image),
    },
    vision: {
      eyebrow: txt(cms.visionEyebrow, d.vision.eyebrow),
      title: txt(cms.visionTitle, d.vision.title),
      text: txt(cms.visionText, d.vision.text),
    },
    convening: {
      eyebrow: txt(cms.conveningEyebrow, d.convening.eyebrow),
      title: txt(cms.conveningTitle, d.convening.title),
      body: txt(cms.conveningBody, d.convening.body),
      image: img(cms.conveningImage, d.convening.image),
    },
    globalGathering: {
      eyebrow: txt(cms.globalEyebrow, d.globalGathering.eyebrow),
      title: txt(cms.globalTitle, d.globalGathering.title),
      lead: txt(cms.globalLead, d.globalGathering.lead),
      body: txt(cms.globalBody, d.globalGathering.body),
      highlights: globalHighlights,
      images: globalImages,
    },
    impact: {
      eyebrow: txt(cms.impactEyebrow, d.impact.eyebrow),
      title: txt(cms.impactTitle, d.impact.title),
      stats: impactStats,
    },
    journey: {
      eyebrow: txt(cms.journeyEyebrow, d.journey.eyebrow),
      title: txt(cms.journeyTitle, d.journey.title),
      intro: txt(cms.journeyIntro, d.journey.intro),
      steps: journeySteps,
    },
    stories: {
      eyebrow: txt(cms.storiesEyebrow, d.stories.eyebrow),
      title: txt(cms.storiesTitle, d.stories.title),
      intro: txt(cms.storiesIntro, d.stories.intro),
      items: d.stories.items,
    },
    featured: {
      eyebrow: txt(cms.featuredEyebrow, d.featured.eyebrow),
      title: txt(cms.featuredTitle, d.featured.title),
      intro: txt(cms.featuredIntro, d.featured.intro),
      items: d.featured.items,
    },
    pathways: {
      eyebrow: txt(cms.pathwaysEyebrow, d.pathways.eyebrow),
      title: txt(cms.pathwaysTitle, d.pathways.title),
      intro: txt(cms.pathwaysIntro, d.pathways.intro),
      items: pathwaysItems,
    },
    milestone: {
      eyebrow: txt(cms.milestoneEyebrow, d.milestone.eyebrow),
      title: txt(cms.milestoneTitle, d.milestone.title),
      body: txt(cms.milestoneBody, d.milestone.body),
      ctaLabel: txt(cms.milestoneCtaLabel, d.milestone.ctaLabel),
      ctaHref: txt(cms.milestoneCtaUrl, d.milestone.ctaHref),
      image: img(cms.milestoneImage, d.milestone.image),
    },
    gallery: {
      eyebrow: txt(cms.galleryEyebrow, d.gallery.eyebrow),
      title: txt(cms.galleryTitle, d.gallery.title),
      images: galleryImages,
    },
    news: {
      eyebrow: txt(cms.newsEyebrow, d.news.eyebrow),
      title: txt(cms.newsTitle, d.news.title),
      intro: txt(cms.newsIntro, d.news.intro),
      items: newsItems,
    },
    network: {
      eyebrow: txt(cms.networkEyebrow, d.network.eyebrow),
      title: txt(cms.networkTitle, d.network.title),
      intro: txt(cms.networkIntro, d.network.intro),
      benefits: networkBenefits,
      globalLink: {
        label: txt(cms.networkGlobalLinkLabel, d.network.globalLink.label),
        href: txt(cms.networkGlobalLinkUrl, d.network.globalLink.href),
      },
    },
    quote: {
      text: txt(cms.quoteText, d.quote.text),
      attribution: txt(cms.quoteAttribution, d.quote.attribution),
      role: txt(cms.quoteRole, d.quote.role),
    },
    cta: {
      title: txt(cms.ctaTitle, d.cta.title),
      body: txt(cms.ctaBody, d.cta.body),
      primaryLabel: txt(cms.ctaPrimaryLabel, d.cta.primaryLabel),
      primaryHref: txt(cms.ctaPrimaryUrl, d.cta.primaryHref),
      secondaryLabel: txt(cms.ctaSecondaryLabel, d.cta.secondaryLabel),
      secondaryHref: txt(cms.ctaSecondaryUrl, d.cta.secondaryHref),
      image: img(cms.ctaImage, d.cta.image),
    },
  }
}

/**
 * EPLAN page: static copy from Pages → eplanPage; stories and featured profiles
 * from the Alumni collection with config fallback.
 */
export async function getEplanPageContent(): Promise<EplanPageContent> {
  const d = alumniPageContent
  const page = await getPage('/community/eplan')
  const cms = ((page as Page | null)?.eplanPage ?? {}) as Record<string, any>
  const content = mapCmsPage(cms, d)

  const payload = await tryGetPayload()
  if (!payload) return content

  try {
    const result = await payload.find({
      collection: 'alumni',
      depth: 1,
      limit: 100,
      sort: 'order',
      where: { status: { equals: 'published' } },
    })
    const docs = (toPlain(result.docs) as Alumnus[] | null) ?? []
    if (!docs.length) return content

    const storyDocs = docs.filter((doc) => doc.showInStories)
    const featuredDocs = docs.filter((doc) => doc.showInFeatured)

    if (storyDocs.length) {
      content.stories.items = storyDocs.map((doc) => {
        const fallback = d.stories.items.find((s) => s.name === doc.name)
        return mapStoryDoc(doc, fallback)
      })
    }

    if (featuredDocs.length) {
      content.featured.items = featuredDocs.map((doc) => {
        const fallback = d.featured.items.find((s) => s.name === doc.name)
        return mapFeaturedDoc(doc, fallback)
      })
    }
  } catch {
    // keep config fallback
  }

  return content
}

export { alumniToTeamMember }
