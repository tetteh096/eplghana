import {
  BLOG_CATEGORIES,
  blogCategoryLabel,
  type BlogCategorySlug,
} from '@/config/blogCategories'
import type { BlogPostSummary } from '@/config/blogContent'
import { blogPageContent, fallbackBlogPosts } from '@/config/blogContent'
import type { News } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { fetchWordPressPosts } from '@/utilities/fetchWordPressPost'
import { tryGetPayload } from '@/utilities/payloadSafe'

export type BlogListingMeta = {
  categories: { label: string; slug: BlogCategorySlug; count: number }[]
  tags: string[]
}

function mapTags(post: News): string[] {
  if (!Array.isArray(post.tags)) return []
  return post.tags.map((t) => t?.name?.trim()).filter(Boolean) as string[]
}

function cmsPostToSummary(post: News): BlogPostSummary | null {
  const image = getMediaUrl(post.featuredImage)
  if (!image) return null

  const categorySlug = (post.category ?? 'blog-posts') as BlogCategorySlug

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt?.split('T')[0] ?? new Date().toISOString().split('T')[0],
    image,
    category: blogCategoryLabel(categorySlug),
    categorySlug,
    author: post.author?.trim() || 'EPL Ghana',
    tags: mapTags(post),
  }
}

function computeListingMeta(posts: BlogPostSummary[]): BlogListingMeta {
  const counts: Record<BlogCategorySlug, number> = {
    'blog-posts': 0,
    germel: 0,
    programme: 0,
  }

  const tagSet = new Set<string>()

  for (const post of posts) {
    counts[post.categorySlug] = (counts[post.categorySlug] ?? 0) + 1
    for (const tag of post.tags ?? []) {
      tagSet.add(tag)
    }
  }

  const categories = (Object.keys(BLOG_CATEGORIES) as BlogCategorySlug[])
    .map((slug) => ({
      slug,
      label: BLOG_CATEGORIES[slug],
      count: counts[slug] ?? 0,
    }))
    .filter((category) => category.count > 0)

  const tags =
    tagSet.size > 0
      ? [...tagSet].sort((a, b) => a.localeCompare(b))
      : blogPageContent.tags

  return { categories, tags }
}

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  const payload = await tryGetPayload()

  if (payload) {
    try {
      const result = await payload.find({
        collection: 'news',
        depth: 1,
        limit: 100,
        sort: '-publishedAt',
        where: { status: { equals: 'published' } },
      })

      const cmsPosts = result.docs
        .map(cmsPostToSummary)
        .filter((post): post is BlogPostSummary => post !== null)

      if (cmsPosts.length > 0) {
        return cmsPosts
      }
    } catch {
      // fall through to WordPress / static content
    }
  }

  const wpPosts = await fetchWordPressPosts()
  if (wpPosts.length > 0) {
    return wpPosts
  }

  return fallbackBlogPosts
}

export async function getBlogListingData(): Promise<{
  posts: BlogPostSummary[]
  meta: BlogListingMeta
}> {
  const posts = await getBlogPosts()
  return { posts, meta: computeListingMeta(posts) }
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPostSummary[]> {
  const posts = await getBlogPosts()
  return posts.slice(0, limit)
}

/** Home blog slider, up to 5 posts, newest first. Prefers featuredOnHome when set. */
export async function getHomeBlogPosts(limit = 5): Promise<News[]> {
  const payload = await tryGetPayload()
  if (!payload) return []

  try {
    const featured = await payload.find({
      collection: 'news',
      depth: 1,
      limit,
      sort: '-publishedAt',
      where: {
        and: [{ status: { equals: 'published' } }, { featuredOnHome: { equals: true } }],
      },
    })

    const byId = new Map<string, News>()
    for (const doc of featured.docs) {
      byId.set(String(doc.id), doc)
    }

    if (byId.size < limit) {
      const latest = await payload.find({
        collection: 'news',
        depth: 1,
        limit: limit * 2,
        sort: '-publishedAt',
        where: { status: { equals: 'published' } },
      })

      for (const doc of latest.docs) {
        if (byId.size >= limit) break
        if (!byId.has(String(doc.id))) {
          byId.set(String(doc.id), doc)
        }
      }
    }

    return [...byId.values()]
      .sort(
        (a, b) =>
          new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime(),
      )
      .slice(0, limit)
  } catch {
    return []
  }
}
