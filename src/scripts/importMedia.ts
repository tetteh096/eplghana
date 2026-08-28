import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { contactPageContent } from '../config/contactPageContent'
import { eplCoreValuesWithIcons } from '../config/coreValues'
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
const heroImageId = await importImage(eplHomeImages.heroDefault, 'EPL Ghana hero')
const aboutImageId = await importImage(eplHomeImages.aboutMain, 'About EPL Ghana')
const aboutMissionImageId = await importImage(eplHomeImages.aboutBlock, 'EPL Ghana mission box')

const heroSlideRows = []
for (const s of heroImageSlides) {
  heroSlideRows.push({
    subtitle: s.subtitle,
    title: s.title,
    description: s.description,
    ctaLabel: s.ctaLabel,
    ctaHref: s.ctaHref,
    image: await importImage(s.image, s.subtitle),
    thumb: await importImage(s.thumb, `${s.subtitle} thumbnail`),
  })
}

const missionRows: { image: string }[] = []
for (const url of eplHomeImages.missionBanner) {
  const id = await importImage(url, 'EPL Ghana mission')
  if (id) missionRows.push({ image: id })
}

const galleryRows: { image: string; alt: string }[] = []
for (const g of eplHomeImages.gallery) {
  const id = await importImage(g.src, g.alt)
  if (id) galleryRows.push({ image: id, alt: g.alt })
}

const homeContent = {
  heroSubtitle: 'Emerging Public Leaders of Ghana',
  heroTitle: 'Nurturing a new generation of public service professionals',
  heroDescription:
    'We empower Ghanaian youth with the knowledge, skills, and network to become effective agents of change within Ghana’s Public Service.',
  heroImage: heroImageId,
  heroCtaLabel: 'Learn More',
  heroCtaUrl: '/about',
  heroStatValue: '200+',
  heroStatLabel: 'Fellows trained',
  heroSlides: heroSlideRows,
  aboutSubtitle: 'Who We Are',
  aboutTitle: 'Developing the next generation of public service professionals',
  aboutDescription:
    'At Emerging Public Leaders of Ghana, we believe Ghana’s development rests on strong Public Service institutions. We embed Africa’s brightest young professionals within government to champion leadership from inside the civil service.',
  aboutImage: aboutImageId,
  aboutCtaLabel: 'About EPL Ghana',
  aboutCtaUrl: '/about',
  aboutMissionTitle: 'Our Mission',
  aboutMissionBullets: [
    { text: 'Strengthen public institutions from within' },
    { text: 'Develop value-based sector leaders' },
  ],
  aboutMissionImage: aboutMissionImageId,
  missionBannerQuote:
    'EPL Ghana doesn’t just train leaders; we transform Ghana’s public service from the inside out. We rigorously select and embed Africa’s brightest young professionals within key government institutions, ensuring that leadership and innovation are championed from within the civil service to drive sustainable national development.',
  missionBannerImages: missionRows,
  coreValues: eplCoreValuesWithIcons.map((v) => ({ title: v.title, description: v.description })),
  stats: [
    { value: '200+', label: 'Fellows Trained' },
    { value: '150+', label: 'Fellows Working Full Time' },
    { value: '40+', label: 'Public Institutions' },
    { value: '85%', label: 'Career Advancement' },
  ],
  fellowshipTitle: 'Your chapter in public service starts here',
  fellowshipDescription:
    'Applications for the 2026 Public Service Fellowship are now closed. Register your interest below to hear about future cohorts, events, and opportunities.',
  fellowshipCtaLabel: 'Register Interest',
  fellowshipCtaUrl: '/contact',
  galleryHeading: 'Gallery',
  gallery: galleryRows,
  sections: {
    projects: { eyebrow: 'Our Work', title: 'Explore Our Projects' },
    events: { eyebrow: 'Upcoming Events', title: 'EPL Ghana Event Schedule' },
    blog: {
      eyebrow: 'Latest News',
      title: 'Read Our Latest Updates',
      intro:
        'Stories from our fellows, programs, and public service transformation work across Ghana.',
    },
  },
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
    quickLinks: d.hero.quickLinks.map((q) => ({ label: q.label, href: q.href })),
  },
  visit: { eyebrow: d.visit.eyebrow, title: d.visit.title, description: d.visit.description },
  mapEmbedUrl: d.mapEmbedUrl,
  formsSection: {
    eyebrow: d.formsSection.eyebrow,
    title: d.formsSection.title,
    intro: d.formsSection.intro,
  },
  forms: {
    general: {
      eyebrow: d.forms.general.eyebrow,
      title: d.forms.general.title,
      description: d.forms.general.description,
      submitLabel: d.forms.general.submitLabel,
    },
    partnership: {
      eyebrow: d.forms.partnership.eyebrow,
      title: d.forms.partnership.title,
      description: d.forms.partnership.description,
      submitLabel: d.forms.partnership.submitLabel,
    },
  },
}

await updatePage('/contact', { contact: contactContent })

console.log('[media] done')
process.exit(0)
