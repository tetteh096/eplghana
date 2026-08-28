import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { eplimContent } from '../config/eplimContent'

/**
 * Seeds EPLIM detail content into Projects → eplimDetail.
 *
 *   pnpm payload run src/scripts/seedEplimDetail.ts
 *   FORCE=1 pnpm payload run src/scripts/seedEplimDetail.ts
 */
console.log('[eplim-detail] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force =
  process.argv.includes('--force') ||
  process.argv.includes('--force=true') ||
  process.env.FORCE === '1'
const d = eplimContent

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
      console.warn(`[eplim-detail] skip ${name} (${res.status})`)
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
    console.log(`[eplim-detail] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[eplim-detail] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

const slugs = ['epl-in-maritime', 'eplim', 'maritime']
let existing: { id: string | number; eplimDetail?: { aboutImage?: unknown } | null } | null = null

for (const slug of slugs) {
  const found = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  if (found.docs.length) {
    existing = found.docs[0] as typeof existing
    console.log(`[eplim-detail] found project slug=${slug}`)
    break
  }
}

if (!existing) {
  console.log('[eplim-detail] creating epl-in-maritime project')
  const featuredImage = await importImage(d.hero.images[0], 'EPLIM featured')
  const created = await payload.create({
    collection: 'projects',
    data: {
      title: d.hero.title,
      slug: 'epl-in-maritime',
      category: 'Maritime',
      summary: d.hero.lead,
      detailLayout: 'eplim',
      featuredImage: featuredImage ?? undefined,
      status: 'published',
      projectsPageOrder: 3,
      featuredOnHome: true,
      homeOrder: 3,
    },
  })
  existing = created as typeof existing
}

const alreadySeeded = Boolean(existing.eplimDetail?.aboutImage)
if (alreadySeeded && !force) {
  console.log('[eplim-detail] already seeded, use --force or FORCE=1 to overwrite')
  process.exit(0)
}

const eplimDetail = {
  heroEyebrow: d.hero.eyebrow,
  heroTitle: d.hero.title,
  heroLead: d.hero.lead,
  heroDescription: d.hero.description,
  heroSecondaryImage: await importImage(d.hero.images[1], 'EPLIM capacity'),
  heroCtaLabel: d.hero.ctaLabel,
  heroCtaUrl: d.hero.ctaHref,
  aboutEyebrow: d.aboutEyebrow,
  aboutTitle: d.aboutTitle,
  aboutImage: await importImage(d.aboutImage, 'EPLIM overview'),
  capacityEyebrow: d.capacityBuilding.eyebrow,
  capacityTitle: d.capacityBuilding.title,
  capacityDescription: d.capacityBuilding.description,
  capacityImage: await importImage(d.capacityBuilding.image, 'EPLIM capacity building'),
  focusEyebrow: d.whyItMatters.eyebrow,
  focusTitle: d.whyItMatters.title,
  focusItems: d.whyItMatters.items,
  impactEyebrow: d.impact.eyebrow,
  impactTitle: d.impact.title,
  impactDescription: d.impact.description,
  impactImage: await importImage(d.impact.image, 'EPLIM impact'),
  impactCtaLabel: d.impact.ctaLabel,
  impactCtaUrl: d.impact.ctaHref,
}

await payload.update({
  collection: 'projects',
  id: existing.id,
  data: {
    detailLayout: 'eplim',
    eplimDetail,
  },
})
console.log('[eplim-detail] wired EPLIM page content')
console.log('[eplim-detail] done')
process.exit(0)
