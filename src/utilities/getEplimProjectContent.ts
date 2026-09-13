import { eplimContent } from '@/config/eplimContent'
import { ELEVATED_MINDS_SLUG, ELEVATED_MINDS_SLUG_ALIASES } from '@/config/elevatedMinds'
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

const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

/**
 * Elevated MINDS detail content.
 * Copy is driven by config so stale CMS maritime text cannot override;
 * CMS media still layers on when available.
 */
export async function getEplimProjectContent(
  slug = ELEVATED_MINDS_SLUG,
): Promise<EplimProjectContent> {
  const d = eplimContent
  const cms: Record<string, any> = {}
  let heroPrimary = d.hero.images[0]
  const slugCandidates = Array.from(
    new Set([ELEVATED_MINDS_SLUG, slug, ...ELEVATED_MINDS_SLUG_ALIASES].filter(Boolean)),
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
          project?.slug ?? ELEVATED_MINDS_SLUG,
          getMediaUrl(project?.featuredImage),
        ) ?? d.hero.images[0]

      const heroSecondary = img(cms.heroSecondaryImage, d.hero.images[1])

      return {
        hero: {
          ...d.hero,
          images: [heroPrimary, heroSecondary],
        },
        aboutEyebrow: d.aboutEyebrow,
        aboutTitle: d.aboutTitle,
        aboutImage: img(cms.aboutImage, d.aboutImage),
        capacityBuilding: {
          ...d.capacityBuilding,
          image: img(cms.capacityImage, d.capacityBuilding.image),
        },
        whyItMatters: d.whyItMatters,
        impact: {
          ...d.impact,
          image: img(cms.impactImage, d.impact.image),
        },
        partnerCta: d.partnerCta,
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
