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
}

export type FellowshipProjectContent = {
  hero: {
    eyebrow: string
    title: string
    description: string
    /** Background from project featured (wide) image */
    image: string
    ctaLabel: string
    ctaHref: string
  }
  tabs: typeof publicServiceFellowshipContent.tabs
  programmeStructure: {
    sidebarEyebrow: string
    title: string
    intro: string
    steps: FellowshipStep[]
  }
  eligibility: {
    eyebrow: string
    title: string
    criteria: string[]
    documentsTitle: string
    documentsIntro: string
    documents: string[]
    documentsCtaLabel: string
  }
  applicationProcess: {
    eyebrow: string
    title: string
    intro: string
    steps: FellowshipStep[]
  }
  applyCta: {
    eyebrow: string
    title: string
    description: string
    ctaLabel: string
    ctaHref: string
  }
}

export type { FellowshipTabId }

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)

function mapSteps(
  cmsSteps: any[] | undefined,
  defaults: { title: string; description: string }[],
): FellowshipStep[] {
  if (!Array.isArray(cmsSteps) || cmsSteps.length === 0) {
    return defaults.map(({ title, description }) => ({ title, description }))
  }
  return cmsSteps.map((step, index) => ({
    title: txt(step?.title, defaults[index]?.title ?? ''),
    description: txt(step?.description, defaults[index]?.description ?? ''),
  }))
}

function fromDefaults(heroImage: string): FellowshipProjectContent {
  const d = publicServiceFellowshipContent
  return {
    hero: {
      eyebrow: d.hero.eyebrow,
      title: d.hero.title,
      description: d.hero.description,
      image: heroImage,
      ctaLabel: d.hero.ctaLabel,
      ctaHref: d.hero.ctaHref,
    },
    tabs: d.tabs,
    programmeStructure: {
      sidebarEyebrow: d.programmeStructure.sidebarEyebrow,
      title: d.programmeStructure.title,
      intro: d.programmeStructure.intro,
      steps: d.programmeStructure.steps.map(({ title, description }) => ({ title, description })),
    },
    eligibility: {
      eyebrow: d.eligibility.eyebrow,
      title: d.eligibility.title,
      criteria: d.eligibility.criteria,
      documentsTitle: d.eligibility.documentsTitle,
      documentsIntro: d.eligibility.documentsIntro,
      documents: d.eligibility.documents,
      documentsCtaLabel: d.eligibility.documentsCtaLabel,
    },
    applicationProcess: {
      eyebrow: d.applicationProcess.eyebrow,
      title: d.applicationProcess.title,
      intro: d.applicationProcess.intro,
      steps: d.applicationProcess.steps.map(({ title, description }) => ({ title, description })),
    },
    applyCta: {
      eyebrow: d.applyCta.eyebrow,
      title: d.applyCta.title,
      description: d.applyCta.description,
      ctaLabel: d.applyCta.ctaLabel,
      ctaHref: d.applyCta.ctaHref,
    },
  }
}

/**
 * Public Service Fellowship detail content from Projects → fellowshipDetail,
 * layered over config defaults. Matches the live page sections only.
 * Hero background uses the project wide card (featured) image.
 */
export async function getFellowshipProjectContent(
  slug = 'public-service-fellowship',
): Promise<FellowshipProjectContent> {
  const d = publicServiceFellowshipContent
  const fallbackImage = d.hero.images[0]

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
        const cms = (project?.fellowshipDetail ?? {}) as Record<string, any>
        const heroImage =
          resolveProjectImage(slug, getMediaUrl(project?.featuredImage)) ?? fallbackImage

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
            image: heroImage,
            ctaLabel: txt(cms.heroCtaLabel, d.hero.ctaLabel),
            ctaHref: txt(cms.heroCtaUrl, d.hero.ctaHref),
          },
          tabs: d.tabs,
          programmeStructure: {
            sidebarEyebrow: txt(cms.structureSidebarEyebrow, d.programmeStructure.sidebarEyebrow),
            title: txt(cms.structureTitle, d.programmeStructure.title),
            intro: txt(cms.structureIntro, d.programmeStructure.intro),
            steps: mapSteps(cms.structureSteps, d.programmeStructure.steps),
          },
          eligibility: {
            eyebrow: txt(cms.eligibilityEyebrow, d.eligibility.eyebrow),
            title: txt(cms.eligibilityTitle, d.eligibility.title),
            criteria,
            documentsTitle: txt(cms.documentsTitle, d.eligibility.documentsTitle),
            documentsIntro: txt(cms.documentsIntro, d.eligibility.documentsIntro),
            documents,
            documentsCtaLabel: txt(cms.documentsCtaLabel, d.eligibility.documentsCtaLabel),
          },
          applicationProcess: {
            eyebrow: txt(cms.processEyebrow, d.applicationProcess.eyebrow),
            title: txt(cms.processTitle, d.applicationProcess.title),
            intro: txt(cms.processIntro, d.applicationProcess.intro),
            steps: mapSteps(cms.processSteps, d.applicationProcess.steps),
          },
          applyCta: {
            eyebrow: txt(cms.applyEyebrow, d.applyCta.eyebrow),
            title: txt(cms.applyTitle, d.applyCta.title),
            description: txt(cms.applyDescription, d.applyCta.description),
            ctaLabel: txt(cms.applyCtaLabel, d.applyCta.ctaLabel),
            ctaHref: txt(cms.applyCtaUrl, d.applyCta.ctaHref),
          },
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[getFellowshipProjectContent] failed, using defaults:', err)
      }
    }
  }

  return fromDefaults(fallbackImage)
}
