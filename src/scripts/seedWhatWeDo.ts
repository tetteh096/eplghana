import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import {
  whatWeDoApproach,
  whatWeDoCta,
  whatWeDoIntro,
} from '../config/aboutSectionContent'

/**
 * Seeds the What We Do page content (Pages → whatWeDo) from the existing config
 * and imports its images into Media. Run with:
 *   pnpm -C site payload run src/scripts/seedWhatWeDo.ts
 * Idempotent: images already in Media (same filename) are reused.
 */
console.log('[what-we-do] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })

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
      console.warn(`[what-we-do] skip ${name} (${res.status})`)
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
    console.log(`[what-we-do] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[what-we-do] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

const whatWeDo = {
  introEyebrow: whatWeDoIntro.eyebrow,
  introTitle: whatWeDoIntro.title,
  introLead: whatWeDoIntro.lead,
  introParagraphs: whatWeDoIntro.paragraphs.map((text) => ({ text })),
  introImage: await importImage(whatWeDoIntro.image, 'EPL Ghana fellowship programme'),
  programmesEyebrow: 'Our Programmes',
  programmesTitle: 'Connected programmes, one mission',
  programmesCtaLabel: 'All Projects',
  programmesCtaUrl: '/projects',
  approachEyebrow: whatWeDoApproach.eyebrow,
  approachTitle: whatWeDoApproach.title,
  approachSteps: whatWeDoApproach.steps.map((step) => ({
    title: step.title,
    body: step.body,
  })),
  ctaTitle: whatWeDoCta.title,
  ctaBody: whatWeDoCta.body,
  ctaImage: await importImage(whatWeDoCta.image, 'EPL Ghana fellows at work'),
  ctaPrimaryLabel: whatWeDoCta.primary.label,
  ctaPrimaryUrl: whatWeDoCta.primary.href,
  ctaSecondaryLabel: whatWeDoCta.secondary.label,
  ctaSecondaryUrl: whatWeDoCta.secondary.href,
}

const found = await payload.find({
  collection: 'pages',
  where: { slug: { equals: '/about/what-we-do' } },
  limit: 1,
})
if (!found.docs.length) {
  console.warn('[what-we-do] no /about/what-we-do page found, run seedPages first')
  process.exit(1)
}
await payload.update({ collection: 'pages', id: found.docs[0].id, data: { whatWeDo } })
console.log('[what-we-do] wired What We Do content + images into /about/what-we-do')
console.log('[what-we-do] done')
process.exit(0)
