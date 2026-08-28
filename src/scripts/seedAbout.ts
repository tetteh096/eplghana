import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import {
  aboutPageApproach,
  aboutPageImages,
  aboutPageImpact,
  aboutPageImpactImage,
  aboutPageIntro,
  aboutPageMission,
  aboutPagePartnerReasons,
  aboutPageStats,
  aboutPageStory,
  aboutPageVision,
} from '../config/aboutPageContent'

/**
 * Seeds the About page content (Pages → About) from the existing config and
 * imports its images into Media. Run with:
 *   pnpm -C site payload run src/scripts/seedAbout.ts
 * Idempotent: images already in Media (same filename) are reused.
 */
console.log('[about] starting; DB =', process.env.DATABASE_URL)
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
      console.warn(`[about] skip ${name} (${res.status})`)
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
    console.log(`[about] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[about] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

const partnerItems = []
for (const item of aboutPagePartnerReasons.items) {
  partnerItems.push({
    title: item.title,
    body: item.body,
    icon: await importImage(item.icon, item.title),
    accent: item.accent,
  })
}

const about = {
  introEyebrow: aboutPageIntro.eyebrow,
  introLead: aboutPageIntro.paragraphs[0],
  introImage: await importImage(aboutPageImages.intro, 'About EPL Ghana'),
  introSecondaryImage: await importImage(aboutPageImages.approach, 'EPL Ghana fellowship'),
  approachTitle: aboutPageApproach.title,
  approachBullets: aboutPageApproach.bullets.map((text) => ({ text })),
  growthHighlight: aboutPageStory.growth.highlight,
  growthHighlightLabel: aboutPageStory.growth.highlightLabel,
  growthTitle: aboutPageStory.growth.title,
  growthBody: aboutPageStory.growth.body,
  investmentTitle: aboutPageStory.investment.title,
  investmentBody: aboutPageStory.investment.body,
  mission: {
    eyebrow: aboutPageMission.eyebrow,
    title: aboutPageMission.title,
    body: aboutPageMission.body,
    image: await importImage(aboutPageMission.image, 'EPL Ghana mission'),
  },
  vision: {
    eyebrow: aboutPageVision.eyebrow,
    title: aboutPageVision.title,
    body: aboutPageVision.body,
    image: await importImage(aboutPageVision.image, 'EPL Ghana vision'),
  },
  impact: {
    image: await importImage(aboutPageImpactImage, 'EPL Ghana impact'),
    heading: 'Beyond the Numbers',
    intro: 'The human impact of embedding ethical leaders inside Ghana’s public institutions.',
    items: aboutPageImpact.map((i) => ({ title: i.title, body: i.body })),
  },
  partner: {
    eyebrow: aboutPagePartnerReasons.eyebrow,
    title: aboutPagePartnerReasons.title,
    lead: aboutPagePartnerReasons.lead,
    body: aboutPagePartnerReasons.body,
    chooseLabel: aboutPagePartnerReasons.chooseLabel,
    items: partnerItems,
  },
  stats: aboutPageStats.map((s) => ({ value: s.value, label: s.label })),
}

const found = await payload.find({
  collection: 'pages',
  where: { slug: { equals: '/about' } },
  limit: 1,
})
if (!found.docs.length) {
  console.warn('[about] no /about page found, run seedPages first')
  process.exit(1)
}
await payload.update({ collection: 'pages', id: found.docs[0].id, data: { about } })
console.log('[about] wired About content + images into /about')
console.log('[about] done')
process.exit(0)
