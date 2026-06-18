import { eplFlagshipProjects } from '@/config/epl-defaults'
import { getProjectFallbackImage, resolveProjectImage } from '@/config/eplMedia'
import type { Project } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type PublishedProject = {
  category: string
  href: string
  wideImage: string | null
  visualImage: string | null
  slug: string
  summary: string
  title: string
}

function projectOrder(doc: Project): number {
  return doc.projectsPageOrder ?? doc.homeOrder ?? 999
}

function mapProject(doc: Project): PublishedProject {
  const wideImage = resolveProjectImage(doc.slug, getMediaUrl(doc.featuredImage))
  const visualImage = getMediaUrl(doc.visualImage) ?? wideImage

  return {
    category: doc.category ?? 'Programme',
    href: `/projects/${doc.slug}`,
    wideImage,
    visualImage,
    slug: doc.slug,
    summary: doc.summary,
    title: doc.title,
  }
}

function fallbackProjects(): PublishedProject[] {
  return eplFlagshipProjects.map((project) => {
    const image = getProjectFallbackImage(project.slug)
    return {
      category: project.category,
      href: `/projects/${project.slug}`,
      wideImage: image,
      visualImage: image,
      slug: project.slug,
      summary: project.summary,
      title: project.title,
    }
  })
}

/**
 * Published projects from the Projects collection, sorted for listing pages.
 * Falls back to the three flagship programmes when the DB is empty.
 */
export async function getPublishedProjects(): Promise<PublishedProject[]> {
  const payload = await tryGetPayload()
  if (!payload) return fallbackProjects()

  try {
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: 50,
      where: { status: { equals: 'published' } },
    })

    const docs = ((toPlain(result.docs) as Project[] | null) ?? []).sort(
      (a, b) => projectOrder(a) - projectOrder(b),
    )

    if (docs.length === 0) return fallbackProjects()
    return docs.map(mapProject)
  } catch {
    return fallbackProjects()
  }
}
