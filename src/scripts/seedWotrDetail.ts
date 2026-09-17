import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { womenOnTheRiseContent } from '../config/womenOnTheRiseContent'

/**
 * Seeds Women on the Rise detail content into Projects → wotrDetail.
 *
 *   pnpm payload run src/scripts/seedWotrDetail.ts
 *   pnpm payload run src/scripts/seedWotrDetail.ts --force
 *   FORCE=1 pnpm payload run src/scripts/seedWotrDetail.ts
 */
console.log('[wotr-detail] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force =
  process.argv.includes('--force') ||
  process.argv.includes('--force=true') ||
  process.env.FORCE === '1'
const d = womenOnTheRiseContent

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
      console.warn(`[wotr-detail] skip ${name} (${res.status})`)
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
    console.log(`[wotr-detail] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[wotr-detail] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

const found = await payload.find({
  collection: 'projects',
  where: { slug: { equals: 'women-on-the-rise' } },
  limit: 1,
})

if (!found.docs.length) {
  console.warn('[wotr-detail] no women-on-the-rise project, run seedProjects first')
  process.exit(1)
}

const existing = found.docs[0]
const detail = existing.wotrDetail as { aboutImage?: unknown; heroTitle?: unknown } | undefined
const alreadySeeded = Boolean(detail?.aboutImage || detail?.heroTitle)
if (alreadySeeded && !force) {
  console.log('[wotr-detail] already seeded, use --force to overwrite')
  process.exit(0)
}

const wotrDetail = {
  heroEyebrow: d.hero.eyebrow,
  heroTitle: d.hero.title,
  heroLead: d.hero.lead,
  heroCtaLabel: d.hero.ctaLabel,
  heroCtaUrl: d.hero.ctaHref,
  impactStats: d.impact.stats.map((stat) => ({
    value: stat.value,
    label: stat.label,
  })),
  aboutEyebrow: d.aboutEyebrow,
  aboutTitle: d.aboutTitle,
  heroDescription: d.hero.description,
  aboutImage: await importImage(d.aboutImage, 'Women On The Rise programme'),
  whyItMattersItems: d.whyItMatters.items.map((item) => ({
    title: item.title,
    description: item.description,
  })),
}

await payload.update({
  collection: 'projects',
  id: existing.id,
  data: {
    detailLayout: 'wotr',
    wotrDetail,
  },
})
console.log('[wotr-detail] wired Women on the Rise page content')
console.log('[wotr-detail] done')
process.exit(0)
