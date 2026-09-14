import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { publicServiceFellowshipContent } from '../config/publicServiceFellowshipContent'

/**
 * Seeds Public Service Fellowship detail content into Projects → fellowshipDetail
 * and sets detailLayout to fellowship. Run after seedProjects:
 *
 *   pnpm payload run src/scripts/seedFellowshipDetail.ts
 *   pnpm payload run src/scripts/seedFellowshipDetail.ts --force
 */
console.log('[fellowship-detail] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force =
  process.argv.includes('--force') ||
  process.argv.includes('--force=true') ||
  process.env.FORCE === '1'
const d = publicServiceFellowshipContent

const fellowshipDetail = {
  heroEyebrow: d.hero.eyebrow,
  heroTitle: d.hero.title,
  heroDescription: d.hero.description,
  heroCtaLabel: d.hero.ctaLabel,
  heroCtaUrl: d.hero.ctaHref,
  structureSidebarEyebrow: d.programmeStructure.sidebarEyebrow,
  structureTitle: d.programmeStructure.title,
  structureIntro: d.programmeStructure.intro,
  structureSteps: d.programmeStructure.steps.map((step) => ({
    title: step.title,
    description: step.description,
  })),
  processEyebrow: d.applicationProcess.eyebrow,
  processTitle: d.applicationProcess.title,
  processIntro: d.applicationProcess.intro,
  processSteps: d.applicationProcess.steps.map((step) => ({
    title: step.title,
    description: step.description,
  })),
  eligibilityEyebrow: d.eligibility.eyebrow,
  eligibilityTitle: d.eligibility.title,
  eligibilityCriteria: d.eligibility.criteria.map((text) => ({ text })),
  documentsTitle: d.eligibility.documentsTitle,
  documentsIntro: d.eligibility.documentsIntro,
  documents: d.eligibility.documents.map((text) => ({ text })),
  documentsCtaLabel: d.eligibility.documentsCtaLabel,
  applyEyebrow: d.applyCta.eyebrow,
  applyTitle: d.applyCta.title,
  applyDescription: d.applyCta.description,
  applyCtaLabel: d.applyCta.ctaLabel,
  applyCtaUrl: d.applyCta.ctaHref,
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
const detail = existing.fellowshipDetail as { heroTitle?: unknown } | undefined
const alreadySeeded = Boolean(detail?.heroTitle)
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
