import {
  publicServiceFellowshipContent,
  type FellowshipTabId,
} from '@/config/publicServiceFellowshipContent'
import { resolveProjectImage } from '@/config/eplMedia'
import type { Project } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type FellowshipStep = {
  title: string
  description: string
  image: string
}

export type FellowshipProjectContent = {
  hero: {
    eyebrow: string
    title: string
    description: string
    images: [string, string]
    badge: { value: string; label: string }
    highlights: { value: string; label: string }[]
    ctaLabel: string
    ctaHref: string
    secondaryCtaLabel: string
    secondaryCtaHref: string
  }
  impact: {
    eyebrow: string
    title: string
    stats: { value: string; label: string }[]
  }
  whyJoin: {
    eyebrow: string
    title: string
    items: { title: string; description: string; icon: string }[]
  }
  tabs: typeof publicServiceFellowshipContent.tabs
  programmeStructure: {
    sidebarEyebrow: string
    title: string
    intro: string
    sidebarImage: string
    steps: FellowshipStep[]
  }
  applicationProcess: {
    eyebrow: string
    title: string
    intro: string
    bannerImage: string
    steps: FellowshipStep[]
  }
  eligibility: {
    title: string
    intro: string
    sidebarImage: string
    criteria: string[]
    documentsTitle: string
    documents: string[]
    inclusionNote: string
  }
  applyCta: {
    eyebrow: string
    title: string
    description: string
    ctaLabel: string
    ctaHref: string
    secondaryCtaLabel: string
    secondaryCtaHref: string
  }
  partnerCta: {
    title: string
    ctaLabel: string
    ctaHref: string
    image: string
  }
}

export type { FellowshipTabId }

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

function mapSteps(
  cmsSteps: any[] | undefined,
  defaults: FellowshipStep[],
  fallbackImage: string,
): FellowshipStep[] {
  if (!Array.isArray(cmsSteps) || cmsSteps.length === 0) return defaults
  return cmsSteps.map((step, index) => ({
    title: step?.title ?? defaults[index]?.title ?? '',
    description: step?.description ?? defaults[index]?.description ?? '',
    image: img(step?.image, defaults[index]?.image ?? fallbackImage),
  }))
}

/**
 * Public Service Fellowship detail content from Projects → fellowshipDetail,
 * layered over config defaults. Primary hero image uses the project wide card image.
 */
export async function getFellowshipProjectContent(
  slug = 'public-service-fellowship',
): Promise<FellowshipProjectContent> {
  const d = publicServiceFellowshipContent
  const cms: Record<string, any> = {}
  let heroPrimary: string = d.hero.images[0]

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
      if (project?.fellowshipDetail) {
        Object.assign(cms, project.fellowshipDetail)
      }
      heroPrimary =
        resolveProjectImage(slug, getMediaUrl(project?.featuredImage)) ?? d.hero.images[0]
      const heroSecondary = img(cms.heroSecondaryImage, d.hero.images[1])

      const highlights =
        Array.isArray(cms.heroHighlights) && cms.heroHighlights.length
          ? cms.heroHighlights.map((h: any) => ({
              value: h?.value ?? '',
              label: h?.label ?? '',
            }))
          : d.hero.highlights

      const impactStats =
        Array.isArray(cms.impactStats) && cms.impactStats.length
          ? cms.impactStats.map((s: any) => ({ value: s?.value ?? '', label: s?.label ?? '' }))
          : d.impact.stats

      const whyJoinItems =
        Array.isArray(cms.whyJoinItems) && cms.whyJoinItems.length
          ? cms.whyJoinItems.map((item: any, idx: number) => ({
              title: item?.title ?? '',
              description: item?.description ?? '',
              icon: item?.icon ?? d.whyJoin.items[idx]?.icon ?? 'flaticon-love',
            }))
          : d.whyJoin.items

      const criteria =
        Array.isArray(cms.eligibilityCriteria) && cms.eligibilityCriteria.length
          ? cms.eligibilityCriteria.map((c: any) => c?.text).filter(Boolean)
          : d.eligibility.criteria

      const documents =
        Array.isArray(cms.documents) && cms.documents.length
          ? cms.documents.map((doc: any) => doc?.text).filter(Boolean)
          : d.eligibility.documents

      return {
        hero: {
          eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
          title: txt(cms.heroTitle, d.hero.title),
          description: txt(cms.heroDescription, d.hero.description),
          images: [heroPrimary, heroSecondary],
          badge: {
            value: txt(cms.badgeValue, d.hero.badge.value),
            label: txt(cms.badgeLabel, d.hero.badge.label),
          },
          highlights,
          ctaLabel: txt(cms.heroCtaLabel, d.hero.ctaLabel),
          ctaHref: txt(cms.heroCtaUrl, d.hero.ctaHref),
          secondaryCtaLabel: txt(cms.heroSecondaryCtaLabel, d.hero.secondaryCtaLabel),
          secondaryCtaHref: txt(cms.heroSecondaryCtaUrl, d.hero.secondaryCtaHref),
        },
        impact: {
          eyebrow: txt(cms.impactEyebrow, d.impact.eyebrow),
          title: txt(cms.impactTitle, d.impact.title),
          stats: impactStats,
        },
        whyJoin: {
          eyebrow: txt(cms.whyJoinEyebrow, d.whyJoin.eyebrow),
          title: txt(cms.whyJoinTitle, d.whyJoin.title),
          items: whyJoinItems,
        },
        tabs: d.tabs,
        programmeStructure: {
          sidebarEyebrow: txt(cms.structureSidebarEyebrow, '12-Month Journey'),
          title: txt(cms.structureTitle, d.programmeStructure.title),
          intro: txt(cms.structureIntro, d.programmeStructure.intro),
          sidebarImage: img(cms.structureSidebarImage, d.programmeStructure.sidebarImage),
          steps: mapSteps(cms.structureSteps, d.programmeStructure.steps, heroPrimary),
        },
        applicationProcess: {
          eyebrow: txt(cms.processEyebrow, d.applicationProcess.eyebrow),
          title: txt(cms.processTitle, d.applicationProcess.title),
          intro: txt(cms.processIntro, d.applicationProcess.intro),
          bannerImage: img(cms.processBannerImage, d.applicationProcess.bannerImage),
          steps: mapSteps(cms.processSteps, d.applicationProcess.steps, heroPrimary),
        },
        eligibility: {
          title: txt(cms.eligibilityTitle, d.eligibility.title),
          intro: txt(cms.eligibilityIntro, d.eligibility.intro),
          sidebarImage: img(cms.eligibilitySidebarImage, d.eligibility.sidebarImage),
          criteria,
          documentsTitle: txt(cms.documentsTitle, d.eligibility.documentsTitle),
          documents,
          inclusionNote: txt(cms.inclusionNote, d.eligibility.inclusionNote),
        },
        applyCta: {
          eyebrow: txt(cms.applyEyebrow, d.applyCta.eyebrow),
          title: txt(cms.applyTitle, d.applyCta.title),
          description: txt(cms.applyDescription, d.applyCta.description),
          ctaLabel: txt(cms.applyCtaLabel, d.applyCta.ctaLabel),
          ctaHref: txt(cms.applyCtaUrl, d.applyCta.ctaHref),
          secondaryCtaLabel: txt(cms.applySecondaryCtaLabel, d.applyCta.secondaryCtaLabel),
          secondaryCtaHref: txt(cms.applySecondaryCtaUrl, d.applyCta.secondaryCtaHref),
        },
        partnerCta: {
          title: txt(cms.partnerTitle, d.partnerCta.title),
          ctaLabel: txt(cms.partnerCtaLabel, d.partnerCta.ctaLabel),
          ctaHref: txt(cms.partnerCtaUrl, d.partnerCta.ctaHref),
          image: img(cms.partnerImage, d.partnerCta.image),
        },
      }
    } catch {
      // fall through to defaults
    }
  }

  return {
    ...d,
    hero: { ...d.hero, images: [d.hero.images[0], d.hero.images[1]] },
    programmeStructure: {
      sidebarEyebrow: '12-Month Journey',
      ...d.programmeStructure,
    },
  }
}
