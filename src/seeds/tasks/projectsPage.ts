import type { Payload } from 'payload'

import { projectsPageCta, projectsPageIntro } from '@/config/projectsPageContent'

import { updatePageBySlug } from '../utils'

const TAG = 'projects-page'

export async function seedProjectsPage(payload: Payload): Promise<void> {
  const d = projectsPageIntro

  const projects = {
    eyebrow: d.eyebrow,
    title: d.title,
    description: d.description,
    additionalParagraphs: d.additionalParagraphs.map((text) => ({ text })),
    ctaTitle: projectsPageCta.title,
    ctaLabel: projectsPageCta.ctaLabel,
    ctaUrl: projectsPageCta.ctaHref,
  }

  await updatePageBySlug(payload, '/projects', { projects }, TAG)
}
