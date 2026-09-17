import {
  HOME_PROJECT_DEFAULTS,
  resolveHomeProjects,
  type HomeProjectCard,
} from '@/config/homeProjects'
import type { Project } from '@/payload-types'
import { resolveMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'

export type { HomeProjectCard } from '@/config/homeProjects'

function projectSortOrder(project: Project): number {
  return project.projectsPageOrder ?? project.homeOrder ?? 999
}

async function mapProject(project: Project, payload: Awaited<ReturnType<typeof tryGetPayload>>) {
  const fallback = HOME_PROJECT_DEFAULTS.find((item) => item.slug === project.slug)
  const cmsImage = payload ? await resolveMediaUrl(project.featuredImage, payload) : null

  return {
    slug: project.slug,
    title: project.title,
    category: project.category ?? fallback?.category ?? 'Programme',
    summary: project.summary,
    image: fallback?.image ?? cmsImage ?? HOME_PROJECT_DEFAULTS[0].image,
  } satisfies HomeProjectCard
}

/** Always returns four home projects — CMS fills in details when available. */
export async function getHomeProjects(): Promise<HomeProjectCard[]> {
  const payload = await tryGetPayload()
  if (!payload) return HOME_PROJECT_DEFAULTS

  try {
    const published = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: 20,
      where: { status: { equals: 'published' } },
    })

    if (published.docs.length > 0) {
      const sorted = [...(published.docs as Project[])].sort(
        (a, b) => projectSortOrder(a) - projectSortOrder(b),
      )
      const mapped = await Promise.all(sorted.map((doc) => mapProject(doc, payload)))
      return resolveHomeProjects(mapped)
    }
  } catch {
    // Use static defaults when CMS is unavailable.
  }

  return HOME_PROJECT_DEFAULTS
}
