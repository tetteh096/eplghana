import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { womenOnTheRiseContent } from '../config/womenOnTheRiseContent'

/**
 * Seeds Women on the Rise detail content into Projects → wotrDetail.
 *
 *   pnpm -C site payload run src/scripts/seedWotrDetail.ts
 */
console.log('[wotr-detail] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const d = womenOnTheRiseContent

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
      console.warn(`[wotr-detail] skip ${name} (${res.status})`)
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
    console.log(`[wotr-detail] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[wotr-detail] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

const wotrDetail = {
  heroEyebrow: d.hero.eyebrow,
  heroTitle: d.hero.title,
  heroLead: d.hero.lead,
  heroDescription: d.hero.description,
  heroSecondaryImage: await importImage(d.hero.images[1], 'Women On The Rise programme'),
  heroBadgeValue: 'Since 2024',
  heroBadgeLabel: 'Gender-responsive public service',
  heroPartners: d.hero.partners.map((name) => ({ name })),
  heroHighlights: d.hero.highlights,
  heroCtaLabel: d.hero.ctaLabel,
  heroCtaUrl: d.hero.ctaHref,
  heroSecondaryCtaLabel: d.hero.secondaryCtaLabel,
  heroSecondaryCtaUrl: d.hero.secondaryCtaHref,
  aboutEyebrow: 'About the Project',
  aboutTitle: 'Building inclusive institutions',
  aboutImage: await importImage(d.aboutImage, 'Women On The Rise programme'),
  whyItMattersEyebrow: d.whyItMatters.eyebrow,
  whyItMattersTitle: d.whyItMatters.title,
  whyItMattersItems: d.whyItMatters.items.map((item) => ({
    title: item.title,
    description: item.description,
    icon: item.icon,
  })),
  impactEyebrow: 'Measurable change',
  impactTitle: d.impact.title,
  impactStats: await Promise.all(
    d.impact.stats.map(async (stat) => ({
      value: stat.value,
      label: stat.label,
      icon: await importImage(stat.icon, stat.label),
    })),
  ),
  outcomesEyebrow: 'What we deliver',
  outcomesTitle: d.outcomes.title,
  outcomeItems: await Promise.all(
    d.outcomes.items.map(async (item) => ({
      title: item.title,
      description: item.description,
      image: await importImage(item.image, item.title),
    })),
  ),
  keySuccessEyebrow: d.keySuccess.eyebrow,
  keySuccessStories: await Promise.all(
    d.keySuccess.stories.map(async (story) => ({
      title: story.title,
      paragraphs: story.paragraphs.map((text) => ({ text })),
      imagePrimary: await importImage(story.images[0], story.title),
      imageSecondary: story.images[1]
        ? await importImage(story.images[1], `${story.title} accent`)
        : null,
    })),
  ),
  galleryEyebrow: 'RiwoCo in pictures',
  galleryTitle: d.gallery.title,
  galleryItems: await Promise.all(
    d.gallery.items.map(async (item) => ({
      image: await importImage(item.src, item.alt),
      layout: item.layout,
      alt: item.alt,
    })),
  ),
  relatedArticlesTitle: d.relatedArticles.title,
  relatedArticlesItems: await Promise.all(
    d.relatedArticles.items.map(async (item) => ({
      title: item.title,
      href: item.href,
      image: item.image ? await importImage(item.image, item.title) : null,
    })),
  ),
  involvedEyebrow: d.getInvolvedCta.eyebrow,
  involvedTitle: d.getInvolvedCta.title,
  involvedDescription: d.getInvolvedCta.description,
  involvedCtaLabel: d.getInvolvedCta.ctaLabel,
  involvedCtaUrl: d.getInvolvedCta.ctaHref,
  involvedSecondaryCtaLabel: d.getInvolvedCta.secondaryCtaLabel,
  involvedSecondaryCtaUrl: d.getInvolvedCta.secondaryCtaHref,
  partnerTitle: d.partnerCta.title,
  partnerCtaLabel: d.partnerCta.ctaLabel,
  partnerCtaUrl: d.partnerCta.ctaHref,
  partnerImage: await importImage(d.partnerCta.image, 'Partner with EPL Ghana'),
}

const found = await payload.find({
  collection: 'projects',
  where: { slug: { equals: 'women-on-the-rise' } },
  limit: 1,
})

if (!found.docs.length) {
  console.warn('[wotr-detail] no women-on-the-rise project, run seedProjects first')
  process.exit(1)
}

await payload.update({
  collection: 'projects',
  id: found.docs[0].id,
  data: {
    detailLayout: 'wotr',
    wotrDetail,
  },
})
console.log('[wotr-detail] wired Women on the Rise page content')
console.log('[wotr-detail] done')
process.exit(0)
