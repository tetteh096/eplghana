import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { eplImpactStats } from '../config/epl-defaults'
import { publicServiceFellowshipContent } from '../config/publicServiceFellowshipContent'

/**
 * Seeds Public Service Fellowship detail content into Projects → fellowshipDetail
 * and sets detailLayout to fellowship. Run after seedProjects:
 *
 *   pnpm -C site payload run src/scripts/seedFellowshipDetail.ts
 *   pnpm -C site payload run src/scripts/seedFellowshipDetail.ts --force
 */
console.log('[fellowship-detail] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force = process.argv.includes('--force') || process.env.FORCE === '1'
const d = publicServiceFellowshipContent

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
      console.warn(`[fellowship-detail] skip ${name} (${res.status})`)
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
    console.log(`[fellowship-detail] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[fellowship-detail] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

async function stepImages(steps: { title: string; description: string; image: string }[]) {
  const out = []
  for (const step of steps) {
    out.push({
      title: step.title,
      description: step.description,
      image: await importImage(step.image, step.title),
    })
  }
  return out
}

const fellowshipDetail = {
  heroEyebrow: d.hero.eyebrow,
  heroTitle: d.hero.title,
  heroDescription: d.hero.description,
  heroSecondaryImage: await importImage(d.hero.images[1], 'Public Service Fellowship cohort'),
  badgeValue: d.hero.badge.value,
  badgeLabel: d.hero.badge.label,
  heroHighlights: d.hero.highlights,
  heroCtaLabel: d.hero.ctaLabel,
  heroCtaUrl: d.hero.ctaHref,
  heroSecondaryCtaLabel: d.hero.secondaryCtaLabel,
  heroSecondaryCtaUrl: d.hero.secondaryCtaHref,
  impactEyebrow: d.impact.eyebrow,
  impactTitle: d.impact.title,
  impactStats: eplImpactStats.map((s) => ({ value: s.value, label: s.label })),
  whyJoinEyebrow: d.whyJoin.eyebrow,
  whyJoinTitle: d.whyJoin.title,
  whyJoinItems: d.whyJoin.items.map((item) => ({
    title: item.title,
    description: item.description,
    icon: item.icon,
  })),
  structureSidebarEyebrow: '12-Month Journey',
  structureTitle: d.programmeStructure.title,
  structureIntro: d.programmeStructure.intro,
  structureSidebarImage: await importImage(
    d.programmeStructure.sidebarImage,
    'Public Service Fellowship programme',
  ),
  structureSteps: await stepImages(d.programmeStructure.steps),
  processEyebrow: d.applicationProcess.eyebrow,
  processTitle: d.applicationProcess.title,
  processIntro: d.applicationProcess.intro,
  processBannerImage: await importImage(
    d.applicationProcess.bannerImage,
    'Fellowship application process',
  ),
  processSteps: await stepImages(d.applicationProcess.steps),
  eligibilityTitle: d.eligibility.title,
  eligibilityIntro: d.eligibility.intro,
  eligibilitySidebarImage: await importImage(
    d.eligibility.sidebarImage,
    'Fellowship eligibility',
  ),
  eligibilityCriteria: d.eligibility.criteria.map((text) => ({ text })),
  documentsTitle: d.eligibility.documentsTitle,
  documents: d.eligibility.documents.map((text) => ({ text })),
  inclusionNote: d.eligibility.inclusionNote,
  applyEyebrow: d.applyCta.eyebrow,
  applyTitle: d.applyCta.title,
  applyDescription: d.applyCta.description,
  applyCtaLabel: d.applyCta.ctaLabel,
  applyCtaUrl: d.applyCta.ctaHref,
  applySecondaryCtaLabel: d.applyCta.secondaryCtaLabel,
  applySecondaryCtaUrl: d.applyCta.secondaryCtaHref,
  partnerTitle: d.partnerCta.title,
  partnerCtaLabel: d.partnerCta.ctaLabel,
  partnerCtaUrl: d.partnerCta.ctaHref,
  partnerImage: await importImage(d.partnerCta.image, 'Partner with EPL Ghana'),
}

const found = await payload.find({
  collection: 'projects',
  where: { slug: { equals: 'public-service-fellowship' } },
  limit: 1,
})

if (!found.docs.length) {
  console.warn('[fellowship-detail] no public-service-fellowship project, run seedProjects first')
  process.exit(1)
}

const existing = found.docs[0]
const detail = existing.fellowshipDetail as { heroSecondaryImage?: unknown } | undefined
const alreadySeeded = Boolean(detail?.heroSecondaryImage)
if (alreadySeeded && !force) {
  console.log('[fellowship-detail] already seeded, use --force to overwrite')
  process.exit(0)
}

await payload.update({
  collection: 'projects',
  id: existing.id,
  data: {
    detailLayout: 'fellowship',
    fellowshipDetail,
  },
})
console.log('[fellowship-detail] wired fellowship page content into public-service-fellowship')
console.log('[fellowship-detail] done')
process.exit(0)
