import {
  whatWeDoApproach,
  whatWeDoCta,
  whatWeDoIntro,
  type WhatWeDoProgramme,
  whatWeDoProgrammes,
} from '@/config/aboutSectionContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { getPublishedProjects } from '@/utilities/getPublishedProjects'

export type WhatWeDoContent = {
  intro: {
    eyebrow: string
    title: string
    lead: string
    paragraphs: string[]
    image: string
  }
  programmes: {
    eyebrow: string
    title: string
    ctaLabel: string
    ctaUrl: string
    items: WhatWeDoProgramme[]
  }
  approach: {
    eyebrow: string
    title: string
    steps: { title: string; body: string }[]
  }
  cta: {
    title: string
    body: string
    image: string
    primary: { href: string; label: string }
    secondary: { href: string; label: string }
  }
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

const PROGRAMMES_EYEBROW = 'Our Programmes'
const PROGRAMMES_TITLE = 'Connected programmes, one mission'
const PROGRAMMES_CTA_LABEL = 'All Projects'
const PROGRAMMES_CTA_URL = '/projects'

function mapToProgramme(project: Awaited<ReturnType<typeof getPublishedProjects>>[number]): WhatWeDoProgramme {
  return {
    slug: project.slug,
    title: project.title,
    category: project.category,
    summary: project.summary,
    href: project.href,
    image: project.wideImage ?? project.visualImage,
  }
}

/**
 * What We Do page: static copy from Pages → What We Do; programme cards from
 * the Projects collection with config fallbacks when the DB is empty.
 */
export async function getWhatWeDoContent(): Promise<WhatWeDoContent> {
  const page = await getPage('/about/what-we-do')
  const w = (page?.whatWeDo ?? {}) as Record<string, any>

  const paragraphs: string[] =
    Array.isArray(w.introParagraphs) && w.introParagraphs.length
      ? w.introParagraphs.map((p: any) => p?.text).filter(Boolean)
      : whatWeDoIntro.paragraphs

  const steps =
    Array.isArray(w.approachSteps) && w.approachSteps.length
      ? w.approachSteps.map((s: any) => ({
          title: s?.title ?? '',
          body: s?.body ?? '',
        }))
      : whatWeDoApproach.steps

  let programmeItems: WhatWeDoProgramme[] = whatWeDoProgrammes
  const published = await getPublishedProjects()
  if (published.length > 0) {
    programmeItems = published.map(mapToProgramme)
  }

  return {
    intro: {
      eyebrow: txt(w.introEyebrow, whatWeDoIntro.eyebrow),
      title: txt(w.introTitle, whatWeDoIntro.title),
      lead: txt(w.introLead, whatWeDoIntro.lead),
      paragraphs,
      image: img(w.introImage, whatWeDoIntro.image),
    },
    programmes: {
      eyebrow: txt(w.programmesEyebrow, PROGRAMMES_EYEBROW),
      title: txt(w.programmesTitle, PROGRAMMES_TITLE),
      ctaLabel: txt(w.programmesCtaLabel, PROGRAMMES_CTA_LABEL),
      ctaUrl: txt(w.programmesCtaUrl, PROGRAMMES_CTA_URL),
      items: programmeItems,
    },
    approach: {
      eyebrow: txt(w.approachEyebrow, whatWeDoApproach.eyebrow),
      title: txt(w.approachTitle, whatWeDoApproach.title),
      steps,
    },
    cta: {
      title: txt(w.ctaTitle, whatWeDoCta.title),
      body: txt(w.ctaBody, whatWeDoCta.body),
      image: img(w.ctaImage, whatWeDoCta.image),
      primary: {
        href: txt(w.ctaPrimaryUrl, whatWeDoCta.primary.href),
        label: txt(w.ctaPrimaryLabel, whatWeDoCta.primary.label),
      },
      secondary: {
        href: txt(w.ctaSecondaryUrl, whatWeDoCta.secondary.href),
        label: txt(w.ctaSecondaryLabel, whatWeDoCta.secondary.label),
      },
    },
  }
}
