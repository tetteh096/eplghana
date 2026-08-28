import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { getInvolvedPageContent } from '../config/getInvolvedContent'

/**
 * Seeds Get Involved page static copy (Pages → getInvolvedPage).
 *
 *   pnpm -C site payload run src/scripts/seedGetInvolvedPage.ts
 */
console.log('[get-involved-page] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const d = getInvolvedPageContent

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

const getInvolvedPage = {
  heroEyebrow: d.hero.eyebrow,
  heroBadge: d.hero.badge,
  fellowshipTitle: d.hero.fellowshipTitle,
  fellowshipDescription: d.hero.fellowshipDescription,
  fellowshipCtaLabel: d.hero.fellowshipCtaLabel,
  heroImage: await importImage(d.hero.image, 'Public Service Fellowship'),
  heroSecondaryImage: await importImage(d.hero.secondaryImage, 'EPL Ghana fellows'),
  imageBadgeValue: d.hero.imageBadge.value,
  imageBadgeLabel: d.hero.imageBadge.label,
  heroHighlights: d.hero.highlights,
  secondaryCtaLabel: d.hero.secondaryCta.label,
  secondaryCtaUrl: d.hero.secondaryCta.href,
  pathwaysEyebrow: 'Ways to engage',
  pathwaysTitle: 'Find your path with EPL Ghana',
  pathways: d.pathways.map((pathway) => ({
    anchorId: pathway.id,
    title: pathway.title,
    body: pathway.body,
    bullets: pathway.bullets.map((text) => ({ text })),
    ctaLabel: pathway.ctaLabel,
    ctaHref: pathway.ctaHref,
  })),
  registerEyebrow: d.registerInterest.eyebrow,
  registerTitle: d.registerInterest.title,
  registerDescription: d.registerInterest.description,
  registerSubmitLabel: d.registerInterest.submitLabel,
  registerPoints: [
    { text: 'Get notified when the next fellowship cohort opens' },
    { text: 'Receive fellowship events and briefing updates' },
    { text: 'Connect with EPL Ghana’s recruitment team' },
  ],
}

const found = await payload.find({
  collection: 'pages',
  depth: 0,
  where: { slug: { equals: '/get-involved' } },
  limit: 1,
})

if (!found.docs.length) {
  console.warn('[get-involved-page] no /get-involved page, run seedPages first')
  process.exit(1)
}

await payload.update({
  collection: 'pages',
  id: found.docs[0].id,
  data: { getInvolvedPage },
})

console.log('[get-involved-page] done')
process.exit(0)
