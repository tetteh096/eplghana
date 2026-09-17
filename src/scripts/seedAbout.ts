import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { aboutPageRedesignImages } from '../config/aboutPageContent'
import { aboutCoreValuesFallback } from '../utilities/getAboutContent'

/**
 * Seeds the About page content (Pages → About) for the live layout.
 *   pnpm payload run src/scripts/seedAbout.ts
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

const about = {
  introEyebrow: 'About EPL Ghana',
  introTitle: 'Who We Are',
  introLead:
    'A Ghanaian non-profit organization preparing ethical, critical-thinking young leaders to strengthen the civil service and serve the public good.',
  introImage: await importImage(aboutPageRedesignImages.hero, 'About EPL Ghana'),
  storyEyebrow: 'Our Story',
  growthTitle: 'A Movement for Stronger Public Service',
  growthBody:
    'Launched in 2018, EPL Ghana was founded on the conviction that public institutions are only as strong as the people within them. Through our 12-month Emerging Public Leaders Fellowship, we place talented young Ghanaians inside public sector institutions for immersive training, executive mentorship, and hands-on service—working toward an ambitious goal of nurturing over 275 dedicated Fellows by 2030 to drive lasting national transformation.',
  introSecondaryImage: await importImage(aboutPageRedesignImages.story, 'EPL Ghana story'),
  mission: {
    eyebrow: 'Mission',
    title: 'What We Do',
    body: "To develop ethical, critical-thinking, and change-driven public sector leaders who strengthen Ghana's institutions and serve the public good.",
  },
  vision: {
    eyebrow: 'Vision',
    title: 'Where We Are Going',
    body: 'A Ghana where public institutions are led by honest, capable, and innovative leaders committed to national development and citizen welfare.',
  },
  coreValuesEyebrow: 'Core Values',
  coreValuesTitle: 'The principles that guide everything we do.',
  coreValuesHint: 'Click any value to reveal its meaning.',
  coreValues: aboutCoreValuesFallback,
  teamTitle: 'The People Behind EPL Ghana',
  teamIntro:
    'Meet the dedicated board members, directors, and coordinators guiding our mission and supporting our Fellows every day.',
  teamLeadershipLabel: 'Leadership',
  teamStaffLabel: 'Team',
  partnerEyebrow: 'Ecosystem',
  partnerTitle: 'Our Partners & Supporters',
  partnerLead:
    'We collaborate with government ministries, international development agencies, and civil society to build public leadership capacity.',
  partnerCtaLabel: 'Partner With Us',
  partnerCtaUrl: '/community/partners',
}

const found = await payload.find({
  collection: 'pages',
  depth: 0,
  where: { slug: { equals: '/about' } },
  limit: 1,
})
if (!found.docs.length) {
  console.warn('[about] no /about page, run seedPages first')
  process.exit(1)
}
await payload.update({ collection: 'pages', id: found.docs[0].id, data: { about } })
console.log('[about] done')
process.exit(0)
