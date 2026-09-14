import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { impactPageContent } from '../config/impactPageContent'

/**
 * Seeds Impact page content (Pages → impactPage) from impactPageContent.
 *
 *   pnpm payload run src/scripts/seedImpactPage.ts
 *   pnpm payload run src/scripts/seedImpactPage.ts --force
 *   FORCE=1 pnpm payload run src/scripts/seedImpactPage.ts
 */
console.log('[impact-page] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force =
  process.argv.includes('--force') ||
  process.argv.includes('--force=true') ||
  process.env.FORCE === '1'
const d = impactPageContent

const cache = new Map<string, string | null>()

async function importImage(url: string | undefined, alt: string): Promise<string | null> {
  if (!url) return null
  if (cache.has(url)) return cache.get(url) ?? null
  const name = (url.split('/').pop() ?? '').split('?')[0]
  if (!name) return null
  const existing = await payload.find({
    collection: 'media',
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
      console.warn(`[impact-page] skip ${name} (${res.status})`)
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
    console.log(`[impact-page] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[impact-page] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

const found = await payload.find({
  collection: 'pages',
  depth: 0,
  where: { slug: { equals: '/impact' } },
  limit: 1,
})

let pageId: string | number
if (found.docs.length) {
  pageId = found.docs[0].id
  const existing = found.docs[0] as { impactPage?: { glanceEyebrow?: string | null } }
  const alreadySeeded = Boolean(existing.impactPage?.glanceEyebrow)
  if (alreadySeeded && !force) {
    console.log('[impact-page] already seeded, use --force or FORCE=1 to overwrite')
    process.exit(0)
  }
} else {
  console.log('[impact-page] creating /impact page')
  const createData: Record<string, unknown> = {
    title: 'Impact',
    slug: '/impact',
  }
  const pageFields = payload.collections.pages?.config?.fields ?? []
  const hasStatus = pageFields.some(
    (f) => 'name' in f && (f as { name?: string }).name === 'status',
  )
  if (hasStatus) createData.status = 'published'

  const created = await payload.create({
    collection: 'pages',
    data: createData as { title: string; slug: string },
  })
  pageId = created.id
}

const impactPage = {
  heroEyebrow: d.hero.eyebrow,
  heroTitle: d.hero.title,
  heroDescription: d.hero.description,
  heroImage: await importImage(d.hero.image, 'EPL Ghana impact'),
  glanceEyebrow: d.glance.eyebrow,
  glanceStats: d.glance.stats.map((s) => ({
    value: s.value,
    title: s.title,
    desc: s.desc,
  })),
  successEyebrow: d.successStories.eyebrow,
  successTitle: d.successStories.title,
  communityEyebrow: d.communityStories.eyebrow,
  communityTitle: d.communityStories.title,
  communityIntro: d.communityStories.intro,
  communityCtaLabel: d.communityStories.ctaLabel,
  communityCtaUrl: d.communityStories.ctaUrl,
  testimonialsEyebrow: d.testimonials.eyebrow,
  testimonialsTitle: d.testimonials.title,
  testimonialsIntro: d.testimonials.intro,
  testimonials: d.testimonials.items.map((item) => ({
    category: item.category,
    quote: item.quote,
    author: item.author,
    role: item.role,
    org: item.org,
  })),
  publicationsEyebrow: d.publications.eyebrow,
  publicationsTitle: d.publications.title,
  publicationsIntro: d.publications.intro,
  reportsHeading: d.publications.reportsHeading,
  reportsCtaLabel: d.publications.reportsCtaLabel,
  reportsCtaUrl: d.publications.reportsCtaUrl,
  researchHeading: d.publications.researchHeading,
  researchCtaLabel: d.publications.researchCtaLabel,
  researchCtaUrl: d.publications.researchCtaUrl,
}

await payload.update({
  collection: 'pages',
  id: pageId,
  data: { impactPage },
})

console.log('[impact-page] wired Impact content + images into /impact')
console.log('[impact-page] done')
process.exit(0)
