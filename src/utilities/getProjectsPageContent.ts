import { eplHomeImages } from '@/config/eplMedia'
import { projectsPageCta, projectsPageIntro } from '@/config/projectsPageContent'
import type { PublishedProject } from '@/utilities/getPublishedProjects'
import { getPublishedProjects } from '@/utilities/getPublishedProjects'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'

export type ProjectsPageContent = {
  intro: {
    eyebrow: string
    title: string
    description: string
    additionalParagraphs: string[]
    heroImage: string
  }
  cta: {
    title: string
    description: string
    ctaLabel: string
    ctaHref: string
  }
  projects: PublishedProject[]
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

function mapParagraphs(raw: unknown, fallback: string[]): string[] {
  if (!Array.isArray(raw) || raw.length === 0) return fallback
  return raw
    .map((item) =>
      typeof item === 'object' && item && 'text' in item ? String((item as { text: string }).text) : '',
    )
    .filter(Boolean)
}

/** Projects page: intro + CTA from Pages → projects; programme grid from Projects collection. */
export async function getProjectsPageContent(): Promise<ProjectsPageContent> {
  const [page, projects] = await Promise.all([getPage('/projects'), getPublishedProjects()])
  const cms = (page?.projects ?? {}) as Record<string, unknown>
  const d = projectsPageIntro

  return {
    intro: {
      eyebrow: txt(cms.eyebrow, d.eyebrow),
      title: txt(cms.title, d.title),
      description: txt(cms.description, d.description),
      additionalParagraphs: mapParagraphs(cms.additionalParagraphs, d.additionalParagraphs),
      heroImage: img(cms.heroImage, eplHomeImages.aboutMain),
    },
    cta: {
      title: txt(cms.ctaTitle, projectsPageCta.title),
      description: txt(cms.ctaDescription, projectsPageCta.description),
      ctaLabel: txt(cms.ctaLabel, projectsPageCta.ctaLabel),
      ctaHref: txt(cms.ctaUrl, projectsPageCta.ctaHref),
    },
    projects,
  }
}
