import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { peaceContent } from '../config/peaceContent'

/**
 * Seeds P.E.A.C.E detail content into Projects → peaceDetail.
 *
 *   pnpm payload run src/scripts/seedPeaceDetail.ts
 *   FORCE=1 pnpm payload run src/scripts/seedPeaceDetail.ts
 */
console.log('[peace-detail] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force =
  process.argv.includes('--force') ||
  process.argv.includes('--force=true') ||
  process.env.FORCE === '1'
const d = peaceContent

const cache = new Map<string, string | null>()

async function importImage(url: string, alt: string): Promise<string | null> {
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
      console.warn(`[peace-detail] skip ${name} (${res.status})`)
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
    console.log(`[peace-detail] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[peace-detail] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

const found = await payload.find({
  collection: 'projects',
  where: { slug: { equals: 'peace' } },
  limit: 1,
})

if (!found.docs.length) {
  console.warn('[peace-detail] no peace project, run seedProjects first')
  process.exit(1)
}

const existing = found.docs[0]
const detail = existing.peaceDetail as { heroSecondaryImage?: unknown } | undefined
const alreadySeeded = Boolean(detail?.heroSecondaryImage)
if (alreadySeeded && !force) {
  console.log('[peace-detail] already seeded, use --force or FORCE=1 to overwrite')
  process.exit(0)
}

const peaceDetail = {
  heroEyebrow: d.hero.eyebrow,
  heroTitle: d.hero.title,
  heroLead: d.hero.lead,
  heroDescription: d.hero.description,
  heroSecondaryImage: await importImage(d.hero.images[1], 'P.E.A.C.E fellowship'),
  heroBadgeValue: '12 Months',
  heroBadgeLabel: 'Peace & security leadership',
  heroPartners: d.hero.partners.map((name) => ({ name })),
  heroCtaLabel: d.hero.ctaLabel,
  heroCtaUrl: d.hero.ctaHref,
  aboutEyebrow: d.aboutEyebrow,
  aboutTitle: d.aboutTitle,
  aboutImage: await importImage(d.aboutImage, 'P.E.A.C.E programme'),
  modelHighlightEyebrow: d.modelHighlight.eyebrow,
  modelHighlightTitle: d.modelHighlight.title,
  modelHighlightBody: d.modelHighlight.body,
  modelHighlightAgenciesLabel: d.modelHighlight.agenciesLabel,
  modelHighlightAgencies: d.modelHighlight.agencies.map((text) => ({ text })),
  impactTitle: d.impact.title,
  impactStats: await Promise.all(
    d.impact.stats.map(async (stat) => ({
      value: stat.value,
      label: stat.label,
      icon: await importImage(stat.icon, stat.label),
    })),
  ),
  outcomesTitle: d.outcomes.title,
  outcomeItems: await Promise.all(
    d.outcomes.items.map(async (item) => ({
      title: item.title,
      description: item.description,
      image: await importImage(item.image, item.title),
    })),
  ),
  keySuccessEyebrow: d.keySuccess.eyebrow,
  keySuccessTitle: d.keySuccess.title,
  keySuccessStories: await Promise.all(
    d.keySuccess.stories.map(async (story) => ({
      title: story.title,
      paragraphs: story.paragraphs.map((text) => ({ text })),
      imagePrimary: await importImage(story.images[0], story.title),
      imageSecondary: story.images[1]
        ? await importImage(story.images[1], `${story.title} accent`)
        : null,
    })),
  ),
  galleryEyebrow: d.gallery.eyebrow,
  galleryTitle: d.gallery.title,
  galleryItems: await Promise.all(
    d.gallery.items.map(async (item) => ({
      image: await importImage(item.src, item.alt),
      layout: item.layout,
      alt: item.alt,
    })),
  ),
  relatedArticlesEyebrow: d.relatedArticles.eyebrow,
  relatedArticlesTitle: d.relatedArticles.title,
  relatedArticlesItems: await Promise.all(
    d.relatedArticles.items.map(async (item) => ({
      title: item.title,
      href: item.href,
      image: item.image ? await importImage(item.image, item.title) : null,
    })),
  ),
  partnerTitle: d.partnerCta.title,
  partnerDescription: d.partnerCta.description,
  partnerCtaLabel: d.partnerCta.ctaLabel,
  partnerCtaUrl: d.partnerCta.ctaHref,
  partnerImage: await importImage(d.partnerCta.image, 'Partner with EPL Ghana'),
}

await payload.update({
  collection: 'projects',
  id: existing.id,
  data: {
    detailLayout: 'peace',
    peaceDetail,
  },
})
console.log('[peace-detail] wired P.E.A.C.E page content into peace project')
console.log('[peace-detail] done')
process.exit(0)
