import type { BlogPostSummary } from '@/config/blogContent'
import { blogCategorySlugFromLabel } from '@/config/blogCategories'

export type BlogPostDetail = BlogPostSummary & {
  paragraphs: string[]
  content?: Record<string, unknown>
  blockquote?: string
  galleryImages: string[]
  tags: string[]
}

function decodeHtml(text: string): string {
  return text
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .trim()
}

function extractParagraphs(html: string): string[] {
  return [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => decodeHtml(match[1].replace(/<[^>]+>/g, '')))
    .filter((paragraph) => paragraph.length > 20)
}

function extractBlockquote(html: string): string | undefined {
  const match = html.match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i)
  if (!match) return undefined
  return decodeHtml(match[1].replace(/<[^>]+>/g, ''))
}

function extractGalleryImages(html: string): string[] {
  const images = [...html.matchAll(/src="(https:\/\/eplghana\.org\/wp-content\/uploads[^"]+)"/gi)]
    .map((match) => match[1])
  return [...new Set(images)].slice(0, 4)
}

async function fetchWordPressPostAttachments(postId: number): Promise<string[]> {
  try {
    const response = await fetch(
      `https://eplghana.org/wp-json/wp/v2/media?parent=${postId}&per_page=100`,
      { next: { revalidate: 3600 } },
    )
    if (!response.ok) return []

    const items = (await response.json()) as { mime_type?: string; source_url?: string }[]
    return items
      .filter((item) => item.mime_type?.startsWith('image/') && item.source_url)
      .map((item) => item.source_url as string)
  } catch {
    return []
  }
}

export async function fetchWordPressPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  try {
    const response = await fetch(
      `https://eplghana.org/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`,
      { next: { revalidate: 3600 } },
    )

    if (!response.ok) return null

    const data = await response.json()
    const post = data[0]
    if (!post) return null

    const featured =
      post._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
      extractGalleryImages(post.content.rendered)[0] ??
      ''

    const paragraphs = extractParagraphs(post.content.rendered)
    const attachmentImages = await fetchWordPressPostAttachments(post.id)
    const htmlImages = extractGalleryImages(post.content.rendered)
    const galleryImages = [...new Set([...attachmentImages, ...htmlImages])].filter(
      (image) => image !== featured,
    )

    return {
      slug: post.slug,
      title: decodeHtml(post.title.rendered),
      excerpt: decodeHtml(post.excerpt.rendered.replace(/<[^>]+>/g, '')),
      publishedAt: post.date.split('T')[0],
      image: featured,
      category: 'Blog Posts',
      categorySlug: 'blog-posts',
      author: 'EPL Ghana',
      paragraphs,
      blockquote: extractBlockquote(post.content.rendered),
      galleryImages,
      tags: ['Public Service Fellowship', 'Leadership', 'Governance'],
    }
  } catch {
    return null
  }
}

export async function fetchWordPressPosts(): Promise<BlogPostSummary[]> {
  try {
    const response = await fetch(
      'https://eplghana.org/wp-json/wp/v2/posts?per_page=100&_embed',
      { next: { revalidate: 3600 } },
    )

    if (!response.ok) return []

    const posts = await response.json()

    return posts.map((post: {
      slug: string
      title: { rendered: string }
      excerpt: { rendered: string }
      date: string
      content: { rendered: string }
      _embedded?: { 'wp:featuredmedia'?: { source_url: string }[] }
      categories: number[]
    }) => {
      const featured =
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
        extractGalleryImages(post.content.rendered)[0] ??
        ''

      const category =
        post.categories.includes(63) ? 'GERMEL' : post.categories.includes(6) ? 'Programme' : 'Blog Posts'
      const categorySlug = blogCategorySlugFromLabel(category)

      return {
        slug: post.slug,
        title: decodeHtml(post.title.rendered),
        excerpt: decodeHtml(post.excerpt.rendered.replace(/<[^>]+>/g, '')).slice(0, 220),
        publishedAt: post.date.split('T')[0],
        image: featured,
        category,
        categorySlug,
        author: 'EPL Ghana',
      }
    })
  } catch {
    return []
  }
}
