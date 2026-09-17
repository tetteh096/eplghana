import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { alumniPageContent } from '../config/alumniPageContent'

/**
 * Seeds EPLAN page static copy (Pages → eplanPage) for the live layout.
 *
 *   pnpm -C site payload run src/scripts/seedEplanPage.ts
 */
console.log('[eplan-page] starting')
const payload = await getPayload({ config })
const d = alumniPageContent

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

const eplanPage = {
  heroEyebrow: d.hero.eyebrow,
  heroTitle: d.hero.title,
  heroLead: d.hero.lead,
  heroImage: await importImage(d.hero.image, 'EPL Ghana alumni graduation'),
  heroHighlights: d.hero.highlights,
  heroPrimaryCtaLabel: d.hero.primaryCta.label,
  heroPrimaryCtaUrl: d.hero.primaryCta.href,
  heroSecondaryCtaLabel: d.hero.secondaryCta.label,
  heroSecondaryCtaUrl: d.hero.secondaryCta.href,
  visionEyebrow: d.vision.eyebrow,
  visionText: d.vision.text,
  missionEyebrow: d.mission.eyebrow,
  missionText: d.mission.text,
  executivesEyebrow: d.executives.eyebrow,
  executivesTitle: d.executives.title,
  executivesIntro: d.executives.intro,
  sustainEyebrow: d.sustain.eyebrow,
  sustainTitle: d.sustain.title,
  sustainLead: d.sustain.lead,
  sustainNote: d.sustain.note,
  sustainImage: await importImage(d.sustain.image, d.sustain.imageAlt),
  sustainImageAlt: d.sustain.imageAlt,
  sustainPillars: d.sustain.pillars,
  spotlightEyebrow: d.spotlight.eyebrow,
  spotlightTitle: d.spotlight.title,
  spotlightIntro: d.spotlight.intro,
  spotlightItems: await Promise.all(
    d.spotlight.items.map(async (item) => ({
      tag: item.tag,
      title: item.title,
      description: item.description,
      href: item.href,
      image: await importImage(item.image, item.title),
    })),
  ),
  spotlightSupportCtaLabel: d.spotlight.supportCta.label,
  spotlightSupportCtaUrl: d.spotlight.supportCta.href,
}

const found = await payload.find({
  collection: 'pages',
  depth: 0,
  where: { slug: { equals: '/community/eplan' } },
  limit: 1,
})
if (!found.docs.length) {
  console.warn('[eplan-page] no /community/eplan page, run seedPages first')
  process.exit(1)
}
await payload.update({ collection: 'pages', id: found.docs[0].id, data: { eplanPage } })
console.log('[eplan-page] done')
process.exit(0)
