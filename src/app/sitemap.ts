import type { MetadataRoute } from 'next'

import { absoluteUrl, SITE_INDEXABLE } from '@/config/site'
import { staticProjects } from '@/config/staticProjects'
import { getAllPublishedEventSlugs } from '@/utilities/getEvents'
import { getAllBlogSlugs } from '@/utilities/getBlogPost'
import { getPublishedProjects } from '@/utilities/getPublishedProjects'

// Revalidate the sitemap hourly so new CMS content shows up without a redeploy.
export const revalidate = 3600

type Entry = MetadataRoute.Sitemap[number]

/** Top-level routes with hand-tuned priority / change frequency. */
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: Entry['changeFrequency'] }[] =
  [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about/what-we-do', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about/director-message', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/about/team', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/projects', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/community', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/community/current-fellows', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/community/alumni', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/community/partners', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/community/eplan', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/eplan', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/get-involved', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/knowledge-products', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/knowledge-products/annual-reports', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/knowledge-products/newsletter', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/news', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/news/events', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/events', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  ]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // When the deployment isn't meant to be indexed, expose an empty sitemap.
  if (!SITE_INDEXABLE) return []

  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Dynamic content — fail soft so a CMS/DB hiccup never breaks the sitemap.
  const [eventSlugs, blogSlugs, projects] = await Promise.all([
    getAllPublishedEventSlugs().catch(() => [] as string[]),
    getAllBlogSlugs().catch(() => [] as string[]),
    getPublishedProjects().catch(() => []),
  ])

  const projectSlugs = new Set<string>([
    ...staticProjects.map((p) => p.slug),
    ...projects.map((p) => p.slug),
  ])

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...[...projectSlugs].map((slug) => ({
      url: absoluteUrl(`/projects/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: absoluteUrl(`/news/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...eventSlugs.map((slug) => ({
      url: absoluteUrl(`/events/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [...staticEntries, ...dynamicEntries]
}
