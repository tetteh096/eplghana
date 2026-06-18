import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { annualReportsPageContent } from '../config/annualReportsContent'

/**
 * Seeds Annual Reports page static copy (Pages → annualReportsPage).
 *
 *   pnpm -C site payload run src/scripts/seedAnnualReportsPage.ts
 */
console.log('[annual-reports-page] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const d = annualReportsPageContent

const annualReportsPage = {
  heroLead: d.hero.lead,
  introText: d.intro,
  reportsEyebrow: 'Impact Reports',
  reportsTitle: 'Annual publications',
  relatedEyebrow: 'Related Publications',
  relatedTitle: 'Research & impact documents',
  ctaTitle: d.cta.title,
  ctaBody: d.cta.body,
  ctaLabel: d.cta.ctaLabel,
  ctaUrl: d.cta.ctaHref,
}

const found = await payload.find({
  collection: 'pages',
  where: { slug: { equals: '/knowledge-products/annual-reports' } },
  limit: 1,
})

if (!found.docs.length) {
  console.warn('[annual-reports-page] no page, run seedPages first')
  process.exit(1)
}

await payload.update({
  collection: 'pages',
  id: found.docs[0].id,
  data: { annualReportsPage },
})

console.log('[annual-reports-page] done')
process.exit(0)
