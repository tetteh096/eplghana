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
    title: 'Public Service Fellowship',
    category: 'Core Programme',
    summary:
      'A 12-month leadership program placing top graduates inside government ministries with expert training and one-on-one mentorship.',
    image: eplHomeImages.projects['public-service-fellowship'],
  },
  {
    slug: 'elevated-minds',
    title: 'Elevated MINDS',
    category: 'Program',
    summary:
      'A school-based career development programme equipping JHS and SHS students with skills, values and exposure for informed education and career decisions.',
    image: eplHomeImages.projects['elevated-minds'],
  },
  {
    slug: 'women-on-the-rise',
    title: 'Women on the Rise',
    category: 'Program',
    summary:
      'Empowering women in public service through leadership coaching, mentorship networks, and career support.',
    image: eplHomeImages.projects['women-on-the-rise'],
  },
  {
    slug: 'peace',
    title: 'P.E.A.C.E.',
    category: 'Initiative',
    summary:
      'Training public servants and security personnel in Northern Ghana on conflict prevention, early warning, and community peace.',
    image: eplHomeImages.projects.peace,
  },
]

/** Merge CMS project copy onto the fixed four-card layout. */
export function resolveHomeProjects(projects: HomeProjectCard[] = []): HomeProjectCard[] {
  const bySlug = new Map(projects.map((project) => [project.slug, project]))

  return HOME_PROJECT_DEFAULTS.map((fallback) => {
    const cms = bySlug.get(fallback.slug)
    if (!cms) return fallback

    return {
      slug: fallback.slug,
      title: cms.title?.trim() || fallback.title,
      category: cms.category?.trim() || fallback.category,
      summary: cms.summary?.trim() || fallback.summary,
      image: cms.image?.trim() || fallback.image,
    }
  })
}
