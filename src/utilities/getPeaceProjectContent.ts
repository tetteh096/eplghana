import { peaceContent } from '@/config/peaceContent'
import { resolveProjectImage } from '@/config/eplMedia'
import type { Project } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type PeaceProjectContent = {
  hero: {
    eyebrow: string
    title: string
    lead: string
    images: [string, string]
    ctaLabel: string
    ctaHref: string
  }
  aboutEyebrow: string
  aboutTitle: string
  aboutParagraphs: string[]
  modelHighlight: typeof peaceContent.modelHighlight
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)

/**
 * P.E.A.C.E detail content from Projects → peaceDetail, layered over config defaults.
 * Live page sections only: Hero + About + model highlight.
 */
export async function getPeaceProjectContent(slug = 'peace'): Promise<PeaceProjectContent> {
  const d = peaceContent
  const cms: Record<string, any> = {}
  let heroPrimary = d.hero.images[0]
  const heroFallbackSecondary = d.hero.images[1]

  const payload = await tryGetPayload()
  if (payload) {
    try {
      const result = await payload.find({
        collection: 'projects',
        depth: 2,
        limit: 1,
        where: { slug: { equals: slug } },
      })
      const raw = result.docs[0]
      if (raw) {
        const project = toPlain(raw) as Project
        if (project?.peaceDetail) Object.assign(cms, project.peaceDetail)
        heroPrimary =
          resolveProjectImage(slug, getMediaUrl(project?.featuredImage)) ?? d.hero.images[0]

        const agencies =
          Array.isArray(cms.modelHighlightAgencies) && cms.modelHighlightAgencies.length
            ? cms.modelHighlightAgencies.map((a: any) => a?.text).filter(Boolean)
            : d.modelHighlight.agencies

        return {
          hero: {
            eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
            title: txt(cms.heroTitle, d.hero.title),
            lead: txt(cms.heroLead, d.hero.lead),
            images: [heroPrimary, heroFallbackSecondary],
            ctaLabel: txt(cms.heroCtaLabel, d.hero.ctaLabel),
            ctaHref: txt(cms.heroCtaUrl, d.hero.ctaHref),
          },
          aboutEyebrow: txt(cms.aboutEyebrow, d.aboutEyebrow),
          aboutTitle: txt(cms.aboutTitle, d.aboutTitle),
          aboutParagraphs:
            Array.isArray(cms.aboutParagraphs) && cms.aboutParagraphs.length
              ? cms.aboutParagraphs.map((p: any) => p?.text).filter(Boolean)
              : d.aboutParagraphs,
          modelHighlight: {
            eyebrow: txt(cms.modelHighlightEyebrow, d.modelHighlight.eyebrow),
            title: txt(cms.modelHighlightTitle, d.modelHighlight.title),
            body: txt(cms.modelHighlightBody, d.modelHighlight.body),
            agenciesLabel: txt(cms.modelHighlightAgenciesLabel, d.modelHighlight.agenciesLabel),
            agencies,
          },
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[getPeaceProjectContent] failed, using defaults:', err)
      }
    }
  }

  return {
    hero: {
      eyebrow: d.hero.eyebrow,
      title: d.hero.title,
      lead: d.hero.lead,
      images: [d.hero.images[0], d.hero.images[1]],
      ctaLabel: d.hero.ctaLabel,
      ctaHref: d.hero.ctaHref,
    },
    aboutEyebrow: d.aboutEyebrow,
    aboutTitle: d.aboutTitle,
    aboutParagraphs: d.aboutParagraphs,
    modelHighlight: d.modelHighlight,
  }
}
