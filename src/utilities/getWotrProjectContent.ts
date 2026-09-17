import { womenOnTheRiseContent } from '@/config/womenOnTheRiseContent'
import { resolveProjectImage } from '@/config/eplMedia'
import type { Project } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type WotrPillar = {
  title: string
  description: string
}

export type WotrStat = {
  value: string
  label: string
}

export type WotrProjectContent = {
  hero: {
    eyebrow: string
    title: string
    lead: string
    description: string
    images: [string, string]
    ctaLabel: string
    ctaHref: string
  }
  aboutEyebrow: string
  aboutTitle: string
  aboutImage: string
  whyItMatters: { items: WotrPillar[] }
  impact: { stats: WotrStat[] }
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

function defaults(heroPrimary?: string): WotrProjectContent {
  const d = womenOnTheRiseContent
  const primary = heroPrimary ?? d.hero.images[0]
  return {
    hero: {
      eyebrow: d.hero.eyebrow,
      title: d.hero.title,
      lead: d.hero.lead,
      description: d.hero.description,
      images: [primary, d.hero.images[1] ?? primary],
      ctaLabel: d.hero.ctaLabel,
      ctaHref: d.hero.ctaHref,
    },
    aboutEyebrow: d.aboutEyebrow,
    aboutTitle: d.aboutTitle,
    aboutImage: d.aboutImage,
    whyItMatters: {
      items: d.whyItMatters.items.map(({ title, description }) => ({ title, description })),
    },
    impact: {
      stats: d.impact.stats.map(({ value, label }) => ({ value, label })),
    },
  }
}

/**
 * Women on the Rise detail content from Projects → wotrDetail, layered over config.
 * Live layout only: Hero → Stats → About + pillars.
 */
export async function getWotrProjectContent(
  slug = 'women-on-the-rise',
): Promise<WotrProjectContent> {
  const d = womenOnTheRiseContent
  const fallback = defaults()

  const payload = await tryGetPayload()
  if (!payload) return fallback

  try {
    const result = await payload.find({
      collection: 'projects',
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug } },
    })
    const raw = result.docs[0]
    if (!raw) return fallback

    const project = toPlain(raw) as Project
    const cms = (project?.wotrDetail ?? {}) as Record<string, any>
    const heroPrimary =
      resolveProjectImage(slug, getMediaUrl(project?.featuredImage)) ?? d.hero.images[0]

    const whyItMattersItems: WotrPillar[] =
      Array.isArray(cms.whyItMattersItems) && cms.whyItMattersItems.length
        ? cms.whyItMattersItems.map((item: any) => ({
            title: txt(item?.title, ''),
            description: txt(item?.description, ''),
          }))
        : fallback.whyItMatters.items

    const impactStats: WotrStat[] =
      Array.isArray(cms.impactStats) && cms.impactStats.length
        ? cms.impactStats.map((s: any) => ({
            value: txt(s?.value, ''),
            label: txt(s?.label, ''),
          }))
        : fallback.impact.stats

    return {
      hero: {
        eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
        title: txt(cms.heroTitle, d.hero.title),
        lead: txt(cms.heroLead, d.hero.lead),
        description: txt(cms.heroDescription, d.hero.description),
        images: [heroPrimary, d.hero.images[1] ?? heroPrimary],
        ctaLabel: txt(cms.heroCtaLabel, d.hero.ctaLabel),
        ctaHref: txt(cms.heroCtaUrl, d.hero.ctaHref),
      },
      aboutEyebrow: txt(cms.aboutEyebrow, d.aboutEyebrow),
      aboutTitle: txt(cms.aboutTitle, d.aboutTitle),
      aboutImage: img(cms.aboutImage, d.aboutImage),
      whyItMatters: { items: whyItMattersItems },
      impact: { stats: impactStats },
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[getWotrProjectContent] failed, using defaults:', err)
    }
    return fallback
  }
}
