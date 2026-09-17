import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { contactPageContent } from '../config/contactPageContent'
import { eplHomeImages } from '../config/eplMedia'
import { heroImageSlides } from '../config/heroSlides'

/**
 * One-time importer: downloads the live-site (CDN) images into the Media
 * collection and wires them into the Home + Contact page image fields, so those
 * fields open pre-filled (instead of empty with a CDN fallback).
 *
 *   pnpm -C site payload run src/scripts/importMedia.ts
 *
 * Idempotent: an image already in Media (same filename) is reused, not
 * re-downloaded. Re-running re-applies the wiring with the latest content.
 */
console.log('[media] starting; DB =', process.env.DATABASE_URL)
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
      console.warn(`[media] skip ${name} (${res.status})`)
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
    console.log(`[media] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[media] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

async function updatePage(slug: string, data: Record<string, unknown>) {
  const found = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  if (!found.docs.length) {
    console.warn(`[media] no page for ${slug}`)
    return
  }
  await payload.update({ collection: 'pages', id: found.docs[0].id, data })
  console.log(`[media] wired images into ${slug}`)
}

// ── Home ────────────────────────────────────────────────────────────────────
const heroSlideRows = []
for (const s of heroImageSlides) {
  heroSlideRows.push({
    subtitle: s.subtitle,
    title: s.title,
    titleLine1: s.titleLines?.[0] ?? '',
    titleLine2: s.titleLines?.[1] ?? '',
    titleLine3: s.titleLines?.[2] ?? '',
    description: s.description,
    ctaLabel: s.ctaLabel,
    ctaHref: s.ctaHref,
    secondaryCtaLabel: s.secondaryCtaLabel || 'Learn More',
    secondaryCtaHref: s.secondaryCtaHref || '/about',
    image: await importImage(s.image, s.subtitle),
  })
}

const homeContent = {
  heroSlides: heroSlideRows,
  eplWayEyebrow: 'How We Work',
  eplWayTitle: 'The EPL Way',
  eplWayIntro:
    'We develop leaders who bring clear thinking, strong values and purposeful action to public service.',
  eplWay: [
    {
      number: '01',
      title: 'Think Critically',
      description: 'Solving problems with clear, smart thinking.',
      note: 'We train Fellows to look at facts, solve real problems, and make smart decisions that improve how government institutions work.',
      tone: 'blue',
      href: '/about',
      image: await importImage(eplHomeImages.aboutBlock, 'Think Critically'),
    },
    {
      number: '02',
      title: 'Act Ethically',
      description: 'Leading with honesty, fairness, and truth.',
      note: 'Good leadership starts with strong values. We instill zero tolerance for corruption and a deep respect for public accountability.',
      tone: 'navy',
      href: '/about',
      image: await importImage(eplHomeImages.gallery[1].src, 'Act Ethically'),
    },
    {
      number: '03',
      title: 'Drive Change',
      description: 'Turning good policy into real action.',
      note: 'Fellows do not just study policy—they work inside ministries and local assemblies to fix bottlenecks and help communities.',
      tone: 'gold',
      href: '/about',
      image: await importImage(eplHomeImages.gallery[3].src, 'Drive Change'),
    },
  ],
  projectsEyebrow: 'Our Work',
  projectsTitle: 'Projects That Move\nPublic Service Forward',
  statsHeading: 'Impact Numbers',
  stats: [
    { value: '8', label: 'Cohorts' },
    { value: '200+', label: 'Fellows' },
    { value: '15+', label: 'Institutions' },
    { value: '85%', label: 'Career Advancement' },
  ],
  impactStoriesEyebrow: 'Impact stories',
  impactStoriesTitle: 'Real People. Real Impact.',
  impactStoriesCtaLabel: 'Read all stories',
  impactStoriesCtaUrl: '/news',
  impactStoriesFeaturedLabel: 'Featured Story',
  impactStoriesFeaturedHeading: 'From Fellow to Policy Leader',
  impactStoriesFeaturedCtaLabel: 'Read Her Story',
  eventsEyebrow: 'Updates & events',
  eventsTitle: 'Latest Updates from EPL Ghana',
  eventsBadge: 'Annual forum',
  eventsKicker: 'Upcoming event',
  eventsRegisterLabel: 'Register for event',
}

await updatePage('/', { home: homeContent })

// ── Contact ──────────────────────────────────────────────────────────────────
const d = contactPageContent
const contactHeroId = await importImage(d.hero.image, 'Contact EPL Ghana')

const contactContent = {
  hero: {
    eyebrow: d.hero.eyebrow,
    title: d.hero.title,
    lead: d.hero.lead,
    image: contactHeroId,
  },
  visit: { title: d.map.title, note: d.map.note },
  mapEmbedUrl: d.map.embedUrl,
  formsSection: {
    title: d.form.title,
    intro: d.form.intro,
  },
  forms: {
    general: {
      submitLabel: d.form.submitLabel,
    },
  },
}

await updatePage('/contact', { contact: contactContent })

console.log('[media] done')
process.exit(0)
