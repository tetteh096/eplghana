import type { BlogPostSummary } from '@/config/blogContent'
import { getFallbackBlogPost } from '@/config/blogContent'
import { blogCategoryLabel, type BlogCategorySlug } from '@/config/blogCategories'
import type { BlogPostDetail } from '@/utilities/fetchWordPressPost'
import { fetchWordPressPostBySlug } from '@/utilities/fetchWordPressPost'
import { lexicalToParagraphs } from '@/utilities/blogLexical'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'

function mapTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return []
  return tags.map((t) => (typeof t === 'object' && t && 'name' in t ? String(t.name) : '')).filter(Boolean)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const payload = await tryGetPayload()

  if (payload) {
    try {
      const result = await payload.find({
        collection: 'news',
        depth: 2,
        limit: 1,
        where: { slug: { equals: slug } },
      })

      const post = result.docs[0]
      if (post) {
        const image = getMediaUrl(post.featuredImage)
        const paragraphs = lexicalToParagraphs(post.content)
        const categorySlug = (post.category ?? 'blog-posts') as BlogCategorySlug
        const tags = mapTags(post.tags)

        if (image) {
          return {
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            publishedAt: post.publishedAt?.split('T')[0] ?? new Date().toISOString().split('T')[0],
            image,
            category: blogCategoryLabel(categorySlug),
            categorySlug,
            author: post.author?.trim() || 'EPL Ghana',
            tags: tags.length > 0 ? tags : ['Leadership', 'Governance'],
            paragraphs: paragraphs.length > 0 ? paragraphs : [post.excerpt],
            content: post.content as Record<string, unknown>,
            galleryImages: [],
          }
        }
      }
    } catch {
      // fall through
    }
  }

  const wpPost = await fetchWordPressPostBySlug(slug)
  if (wpPost) return wpPost

  const fallback = getFallbackBlogPost(slug)
  if (!fallback) return null

  return {
    ...fallback,
    paragraphs: [fallback.excerpt],
    galleryImages: [],
    tags: fallback.tags ?? ['Public Service Fellowship', 'Leadership'],
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const { getBlogPosts } = await import('@/utilities/getBlogPosts')
  const posts = await getBlogPosts()
  return posts.map((post) => post.slug)
}
