import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { peaceContent } from '../config/peaceContent'

/**
 * Seeds P.E.A.C.E detail content into Projects → peaceDetail.
 * Live sections only: Hero + About + model highlight.
 *
 *   pnpm payload run src/scripts/seedPeaceDetail.ts
 *   FORCE=1 pnpm payload run src/scripts/seedPeaceDetail.ts
 */
console.log('[peace-detail] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force =
  process.argv.includes('--force') ||
  process.argv.includes('--force=true') ||
  process.env.FORCE === '1'
const d = peaceContent

const found = await payload.find({
  collection: 'projects',
  where: { slug: { equals: 'peace' } },
  limit: 1,
})

if (!found.docs.length) {
  console.warn('[peace-detail] no peace project, run seedProjects first')
  process.exit(1)
}

const existing = found.docs[0]
const detail = existing.peaceDetail as { heroLead?: unknown } | undefined
const alreadySeeded = Boolean(detail?.heroLead)
if (alreadySeeded && !force) {
  console.log('[peace-detail] already seeded, use --force or FORCE=1 to overwrite')
  process.exit(0)
}

const peaceDetail = {
  heroEyebrow: d.hero.eyebrow,
  heroTitle: d.hero.title,
  heroLead: d.hero.lead,
  heroCtaLabel: d.hero.ctaLabel,
  heroCtaUrl: d.hero.ctaHref,
  aboutEyebrow: d.aboutEyebrow,
  aboutTitle: d.aboutTitle,
  aboutParagraphs: d.aboutParagraphs.map((text) => ({ text })),
  modelHighlightEyebrow: d.modelHighlight.eyebrow,
  modelHighlightTitle: d.modelHighlight.title,
  modelHighlightBody: d.modelHighlight.body,
  modelHighlightAgenciesLabel: d.modelHighlight.agenciesLabel,
  modelHighlightAgencies: d.modelHighlight.agencies.map((text) => ({ text })),
}

await payload.update({
  collection: 'projects',
  id: existing.id,
  data: {
    detailLayout: 'peace',
    peaceDetail,
  },
})
console.log('[peace-detail] wired P.E.A.C.E page content into peace project')
console.log('[peace-detail] done')
process.exit(0)
