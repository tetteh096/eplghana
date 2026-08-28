import { eplimContent } from '@/config/eplimContent'
import { resolveProjectImage } from '@/config/eplMedia'
import type { Project } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type EplimProjectContent = {
  hero: (typeof eplimContent)['hero'] & {
    images: [string, string]
  }
  aboutEyebrow: string
  aboutTitle: string
  aboutImage: string
  capacityBuilding: typeof eplimContent.capacityBuilding
  whyItMatters: typeof eplimContent.whyItMatters
  impact: typeof eplimContent.impact
  partnerCta: typeof eplimContent.partnerCta
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

/**
 * EPLIM detail content from Projects → eplimDetail, layered over config defaults.
 */
export async function getEplimProjectContent(slug = 'epl-in-maritime'): Promise<EplimProjectContent> {
  const d = eplimContent
  const cms: Record<string, any> = {}
  let heroPrimary = d.hero.images[0]
  // Prefer the canonical CMS slug first so alias routes (eplim / maritime)
  // still load the published epl-in-maritime document.
  const slugCandidates = Array.from(
    new Set(
      ['epl-in-maritime', slug, 'eplim', 'maritime'].filter(
        (value): value is string => Boolean(value),
      ),
    ),
  )

  const payload = await tryGetPayload()
  if (payload) {
    try {
      let project: Project | null = null
      for (const candidate of slugCandidates) {
        const result = await payload.find({
          collection: 'projects',
          depth: 2,
          limit: 1,
          where: { slug: { equals: candidate } },
        })
        const raw = result.docs[0]
        if (!raw) continue
        project = toPlain(raw) as Project
        break
      }

      if (project && 'eplimDetail' in project && project.eplimDetail) {
        Object.assign(cms, project.eplimDetail as Record<string, unknown>)
      }
      heroPrimary =
        resolveProjectImage(
          project?.slug ?? 'epl-in-maritime',
          getMediaUrl(project?.featuredImage),
        ) ?? d.hero.images[0]

      const focusItems =
        Array.isArray(cms.focusItems) && cms.focusItems.length
          ? cms.focusItems.map((item: any) => ({
              title: item?.title ?? '',
              description: item?.description ?? '',
            }))
          : d.whyItMatters.items

      const heroSecondary = img(cms.heroSecondaryImage, d.hero.images[1])

      if (project || Object.keys(cms).length) {
        return {
          hero: {
            eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
            title: txt(cms.heroTitle, d.hero.title),
            lead: txt(cms.heroLead, d.hero.lead),
            description: txt(cms.heroDescription, d.hero.description),
            images: [heroPrimary, heroSecondary],
            partners: d.hero.partners,
            ctaLabel: txt(cms.heroCtaLabel, d.hero.ctaLabel),
            ctaHref: txt(cms.heroCtaUrl, d.hero.ctaHref),
          },
          aboutEyebrow: txt(cms.aboutEyebrow, d.aboutEyebrow),
          aboutTitle: txt(cms.aboutTitle, d.aboutTitle),
          aboutImage: img(cms.aboutImage, d.aboutImage),
          capacityBuilding: {
            eyebrow: txt(cms.capacityEyebrow, d.capacityBuilding.eyebrow),
            title: txt(cms.capacityTitle, d.capacityBuilding.title),
            description: txt(cms.capacityDescription, d.capacityBuilding.description),
            image: img(cms.capacityImage, d.capacityBuilding.image),
          },
          whyItMatters: {
            eyebrow: txt(cms.focusEyebrow, d.whyItMatters.eyebrow),
            title: txt(cms.focusTitle, d.whyItMatters.title),
            items: focusItems,
          },
          impact: {
            eyebrow: txt(cms.impactEyebrow, d.impact.eyebrow),
            title: txt(cms.impactTitle, d.impact.title),
            description: txt(cms.impactDescription, d.impact.description),
            image: img(cms.impactImage, d.impact.image),
            ctaLabel: txt(cms.impactCtaLabel, d.impact.ctaLabel),
            ctaHref: txt(cms.impactCtaUrl, d.impact.ctaHref),
          },
          partnerCta: d.partnerCta,
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[getEplimProjectContent] failed, using defaults:', err)
      }
    }
  }

  return {
    hero: {
      ...d.hero,
      images: [d.hero.images[0], d.hero.images[1]],
    },
    aboutEyebrow: d.aboutEyebrow,
    aboutTitle: d.aboutTitle,
    aboutImage: d.aboutImage,
    capacityBuilding: d.capacityBuilding,
    whyItMatters: d.whyItMatters,
    impact: d.impact,
    partnerCta: d.partnerCta,
  }
}
