import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { partnersPageContent } from '../config/partnersPageContent'

/**
 * Seeds Our Partners page static copy (Pages → partnersPage).
 *
 *   pnpm -C site payload run src/scripts/seedPartnersPage.ts
 */
console.log('[partners-page] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const d = partnersPageContent

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
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch {
    cache.set(url, null)
    return null
  }
}

const partnersPage = {
  heroEyebrow: d.hero.eyebrow,
  heroLead: d.hero.lead,
  heroImage: await importImage(d.hero.image, 'EPL Ghana partners'),
  heroSecondaryImage: await importImage(d.hero.secondaryImage, 'EPL Ghana collaboration event'),
  heroStats: d.hero.stats.map((s) => ({ value: s.value, label: s.label })),
  strategicEyebrow: d.partners.eyebrow,
  strategicTitle: d.partners.title,
  strategicIntro: d.partners.intro,
  hostEyebrow: d.partnerOrganizations.eyebrow,
  hostTitle: d.partnerOrganizations.title,
  hostIntro: d.partnerOrganizations.intro,
  ctaTitle: d.cta.title,
  ctaDescription: d.cta.description,
  ctaLabel: d.cta.ctaLabel,
  ctaUrl: d.cta.ctaHref,
}

const found = await payload.find({
  collection: 'pages',
  where: { slug: { equals: '/community/partners' } },
  limit: 1,
})
if (!found.docs.length) {
  console.warn('[partners-page] no /community/partners page, run seedPages first')
  process.exit(1)
}
await payload.update({ collection: 'pages', id: found.docs[0].id, data: { partnersPage } })
console.log('[partners-page] done')
process.exit(0)
