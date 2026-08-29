import { eplHomeImages } from '@/config/eplMedia'

export type HomeProjectCard = {
  slug: string
  title: string
  category: string
  summary: string
  image: string
}

/** Fixed home layout: always show these four in this order. */
export const HOME_PROJECT_DEFAULTS: HomeProjectCard[] = [
  {
    slug: 'public-service-fellowship',
    title: 'Emerging Public Leaders Fellowship',
    category: 'Core Programme',
    summary:
      'A flagship 12-month leadership development programme placing young professionals in public institutions across Ghana. Fellows receive structured mentorship, targeted training and peer learning that builds lasting leadership capacity.',
    image: eplHomeImages.projects['public-service-fellowship'],
  },
  {
    slug: 'epl-in-maritime',
    title: 'EPL in Maritime (EPLIM)',
    category: 'Program',
    summary:
      'Developing emerging leaders for Ghana’s maritime sector through practical learning, mentorship and professional development.',
    image: eplHomeImages.projects['epl-in-maritime'],
  },
  {
    slug: 'women-on-the-rise',
    title: 'Women on the Rise',
    category: 'Program',
    summary:
      'Creating the space, skills and networks women need to lead and influence Ghana’s public institutions.',
    image: eplHomeImages.projects['women-on-the-rise'],
  },
  {
    slug: 'peace',
    title: 'P.E.A.C.E.',
    category: 'Initiative',
    summary:
      'Building ethical, accountable leadership and practical peacebuilding capacity across the public sector.',
    image: eplHomeImages.projects.peace,
  },
]

/** Merge CMS project copy onto the fixed four-card layout. Images always use EPL defaults. */
export function resolveHomeProjects(projects: HomeProjectCard[] = []): HomeProjectCard[] {
  const bySlug = new Map(projects.map((project) => [project.slug, project]))

  return HOME_PROJECT_DEFAULTS.map((fallback) => {
    const cms = bySlug.get(fallback.slug)
    if (!cms) return fallback

    return {
      slug: fallback.slug,
      title: cms.title || fallback.title,
      category: cms.category || fallback.category,
      summary: cms.summary || fallback.summary,
      image: fallback.image,
    }
  })
}
