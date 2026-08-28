import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { currentFellowsPageContent } from '../config/currentFellowsContent'

/**
 * Seeds Current Fellows page static copy (Pages → currentFellowsPage).
 *
 *   pnpm payload run src/scripts/seedCurrentFellowsPage.ts
 */
console.log('[current-fellows-page] starting')
const payload = await getPayload({ config })
const d = currentFellowsPageContent

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

const currentFellowsPage = {
  heroEyebrow: d.hero.eyebrow,
  heroTitle: d.hero.title,
  heroLead: d.hero.lead,
  heroImage: await importImage(d.hero.image, 'EPL Ghana fellows'),
  heroSecondaryImage: await importImage(d.hero.secondaryImage, 'Fellows at a programme event'),
  heroStats: d.hero.stats,
  defaultCohort: d.directory.defaultCohort,
  cohortTabs: d.directory.cohortTabs,
  searchPlaceholder: d.directory.searchPlaceholder,
  sectorFilterLabel: d.directory.sectorFilterLabel,
  defaultRoleLabel: d.directory.defaultRoleLabel,
  initialVisibleCount: d.directory.initialVisibleCount,
  showMoreLabel: d.directory.showMoreLabel,
  showLessLabel: d.directory.showLessLabel,
  emptyStateText: d.directory.emptyStateText,
  highlightsEyebrow: 'Fellows Highlight',
  highlightsTitle: 'Leaders making impact',
  cohortLabel: d.cohort.label,
  cohortCount: d.cohort.count,
  cohortDescription: d.cohort.description,
  eplanEyebrow: d.eplanPromo.eyebrow,
  eplanTitle: d.eplanPromo.title,
  eplanIntro: d.eplanPromo.intro,
  eplanStats: d.eplanPromo.stats,
  eplanCtaLabel: d.eplanPromo.ctaLabel,
  eplanCtaUrl: d.eplanPromo.ctaHref,
  involveEyebrow: d.involve.eyebrow,
  involveTitle: d.involve.title,
  involveBody: d.involve.body,
  involvePrimaryLabel: d.involve.primaryLabel,
  involvePrimaryUrl: d.involve.primaryHref,
  involveSecondaryLabel: d.involve.secondaryLabel,
  involveSecondaryUrl: d.involve.secondaryHref,
  ctaTitle: d.cta.title,
  ctaBody: d.cta.body,
  ctaLabel: d.cta.ctaLabel,
  ctaUrl: d.cta.ctaHref,
  ctaImage: await importImage(d.cta.image, 'Public Service Fellowship'),
}

const found = await payload.find({
  collection: 'pages',
  where: { slug: { equals: '/community/current-fellows' } },
  limit: 1,
})
if (!found.docs.length) {
  console.warn('[current-fellows-page] no /community/current-fellows page, run seedPages first')
  process.exit(1)
}
await payload.update({
  collection: 'pages',
  id: found.docs[0].id,
  data: { currentFellowsPage },
})
console.log('[current-fellows-page] done')
process.exit(0)
