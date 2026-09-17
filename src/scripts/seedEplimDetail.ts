import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { eplimContent } from '../config/eplimContent'
import { ELEVATED_MINDS_SLUG, ELEVATED_MINDS_SLUG_ALIASES } from '../config/elevatedMinds'

/**
 * Seeds Elevated MINDS detail content into Projects → eplimDetail.
 *
 *   pnpm payload run src/scripts/seedEplimDetail.ts
 *   FORCE=1 pnpm payload run src/scripts/seedEplimDetail.ts
 */
console.log('[elevated-minds] starting; DB =', process.env.DATABASE_URL)
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
      console.warn(`[elevated-minds] skip ${name} (${res.status})`)
      cache.set(url, null)
      return null
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    const mimeType = res.headers.get('content-type') || 'image/jpeg'
    const doc = await payload.create({
      collection: 'media',
      data: { alt, folder: 'projects' },
      file: { data: buffer, mimetype: mimeType, name, size: buffer.length },
    })
    const id = String(doc.id)
    cache.set(url, id)
    console.log(`[elevated-minds] imported ${name}`)
    return id
  } catch (error) {
    console.warn(`[elevated-minds] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

const slugs = [...ELEVATED_MINDS_SLUG_ALIASES]
let existing: { id: string | number; eplimDetail?: { aboutImage?: unknown } | null } | null = null
let foundSlug: string | null = null

for (const slug of slugs) {
  const found = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  if (found.docs.length) {
    existing = found.docs[0] as typeof existing
    foundSlug = slug
    console.log(`[elevated-minds] found project slug=${slug}`)
    break
  }
}

if (!existing) {
  console.log(`[elevated-minds] creating ${ELEVATED_MINDS_SLUG} project`)
  const featuredImage = await importImage(d.hero.images[0], 'Elevated MINDS featured')
  const created = await payload.create({
    collection: 'projects',
    data: {
      title: d.hero.title,
      slug: ELEVATED_MINDS_SLUG,
      category: 'Program',
      summary: d.hero.lead,
      detailLayout: 'eplim',
      featuredImage: featuredImage ?? undefined,
      status: 'published',
      projectsPageOrder: 2,
      featuredOnHome: true,
      homeOrder: 2,
    },
  })
  existing = created as typeof existing
  foundSlug = ELEVATED_MINDS_SLUG
}

const alreadySeeded = Boolean(existing.eplimDetail?.aboutImage)
if (alreadySeeded && !force && foundSlug === ELEVATED_MINDS_SLUG) {
  console.log('[elevated-minds] already seeded, use --force or FORCE=1 to overwrite')
  process.exit(0)
}

const eplimDetail = {
  heroEyebrow: d.hero.eyebrow,
  heroTitle: d.hero.title,
  heroLead: d.hero.lead,
  heroDescription: d.hero.description,
  heroCtaLabel: d.hero.ctaLabel,
  heroCtaUrl: d.hero.ctaHref,
  aboutEyebrow: d.aboutEyebrow,
  aboutTitle: d.aboutTitle,
  aboutImage: await importImage(d.aboutImage, 'Elevated MINDS overview'),
  capacityEyebrow: d.capacityBuilding.eyebrow,
  capacityTitle: d.capacityBuilding.title,
  capacityDescription: d.capacityBuilding.description,
  capacityImage: await importImage(d.capacityBuilding.image, 'Elevated MINDS capacity building'),
  focusEyebrow: d.whyItMatters.eyebrow,
  focusTitle: d.whyItMatters.title,
  focusItems: d.whyItMatters.items,
  impactEyebrow: d.impact.eyebrow,
  impactTitle: d.impact.title,
  impactDescription: d.impact.description,
  impactImage: await importImage(d.impact.image, 'Elevated MINDS impact'),
  impactCtaLabel: d.impact.ctaLabel,
  impactCtaUrl: d.impact.ctaHref,
}

await payload.update({
  collection: 'projects',
  id: existing.id,
  data: {
    title: d.hero.title,
    slug: ELEVATED_MINDS_SLUG,
    category: 'Program',
    summary: d.hero.lead,
    detailLayout: 'eplim',
    eplimDetail,
  },
})
console.log(`[elevated-minds] wired content (slug → ${ELEVATED_MINDS_SLUG})`)
console.log('[elevated-minds] done')
process.exit(0)
