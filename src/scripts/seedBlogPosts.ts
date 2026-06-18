import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { blogCategorySlugFromLabel } from '../config/blogCategories'
import { fallbackBlogPosts } from '../config/blogContent'
import { buildLexicalWithInlineImages, paragraphsToLexical } from '../utilities/blogLexical'
import { fetchWordPressPostBySlug } from '../utilities/fetchWordPressPost'

/**
 * Seeds blog posts into the News collection from live WordPress + local config.
 *
 *   pnpm -C site payload run src/scripts/seedBlogPosts.ts
 *   pnpm -C site payload run src/scripts/seedBlogPosts.ts --force
 */
console.log('[blog] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force = process.argv.includes('--force') || process.env.FORCE === '1'

const cache = new Map<string, string | null>()

async function importImage(url: string | undefined, alt: string): Promise<string | null> {
  if (!url) return null
  if (cache.has(url)) return cache.get(url) ?? null
  const name = (url.split('/').pop() ?? '').split('?')[0]
  if (!name) return null
  const existing = await payload.find({
    collection: 'media',
    depth: 0,
    where: { filename: { equals: name } },
    limit: 1,
  })
  if (existing.docs.length) {
    const id = String(existing.docs[0].id)
    cache.set(url, id)
    return id
  }
  try {
    const res = await fetch(url)
    if (!res.ok) {
      cache.set(url, null)
      return null
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    const mimetype = res.headers.get('content-type') || 'image/jpeg'
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data: buffer, mimetype, name, size: buffer.length },
    })
    console.log(`[blog] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[blog] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

let created = 0
let updated = 0
let skipped = 0

for (const [index, summary] of fallbackBlogPosts.entries()) {
  const existing = await payload.find({
    collection: 'news',
    depth: 0,
    where: { slug: { equals: summary.slug } },
    limit: 1,
  })

  if (existing.docs.length && !force) {
    skipped++
    continue
  }

  const wp = await fetchWordPressPostBySlug(summary.slug)
  const paragraphs = wp?.paragraphs?.length ? wp.paragraphs : [summary.excerpt]
  const categorySlug = summary.categorySlug ?? blogCategorySlugFromLabel(summary.category)
  const featuredOnHome = index < 3

  const featuredImageId = await importImage(summary.image, summary.title)
  const inlineImageIds: string[] = []
  for (const imageUrl of wp?.galleryImages ?? []) {
    const mediaId = await importImage(imageUrl, summary.title)
    if (mediaId) inlineImageIds.push(mediaId)
  }

  const content =
    inlineImageIds.length > 0
      ? buildLexicalWithInlineImages(paragraphs, inlineImageIds, 0)
      : paragraphsToLexical(paragraphs)

  const data = {
    title: summary.title,
    slug: summary.slug,
    excerpt: summary.excerpt,
    featuredImage: featuredImageId,
    content,
    category: categorySlug,
    tags: (summary.tags ?? []).map((name) => ({ name })),
    author: summary.author ?? 'EPL Ghana',
    featuredOnHome,
    publishedAt: `${summary.publishedAt}T12:00:00.000Z`,
    status: 'published' as const,
  }

  if (existing.docs.length) {
    await payload.update({ collection: 'news', id: existing.docs[0].id, data })
    updated++
  } else {
    await payload.create({ collection: 'news', data })
    created++
  }
}

console.log(`[blog] done, created ${created}, updated ${updated}, skipped ${skipped}`)
process.exit(0)
