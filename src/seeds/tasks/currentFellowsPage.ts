import type { Payload } from 'payload'

import { currentFellowsPageContent } from '@/config/currentFellowsContent'

import { createImageImporter, updatePageBySlug } from '../utils'

const TAG = 'current-fellows-page'

export async function seedCurrentFellowsPage(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)
  const d = currentFellowsPageContent

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

  await updatePageBySlug(payload, '/community/current-fellows', { currentFellowsPage }, TAG)
}
