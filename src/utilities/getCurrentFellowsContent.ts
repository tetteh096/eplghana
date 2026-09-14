import {
  currentFellowsPageContent,
  type CurrentFellow,
} from '@/config/currentFellowsContent'
import type { Cohort, Fellow } from '@/payload-types'
import { resolveDonateHref } from '@/utilities/donateLink'
import { getMediaUrl, resolveMediaUrl } from '@/utilities/getMediaUrl'
import { resolveCohortId, resolveCohortLabel } from '@/utilities/resolveCohort'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

type StatItem = { value: string; label: string }

export type CurrentFellowsPageContent = {
  hero: {
    eyebrow: string
    title: string
    lead: string
    image: string
    stats: StatItem[]
  }
  directory: {
    defaultCohort: string
    cohortTabs: { label: string; value: string }[]
    searchPlaceholder: string
    sectorFilterLabel: string
    defaultRoleLabel: string
    initialVisibleCount: number
    showMoreLabel: string
    showLessLabel: string
    emptyStateText: string
  }
  eplanPromo: {
    eyebrow: string
    title: string
    intro: string
    stats: StatItem[]
    ctaLabel: string
    ctaHref: string
  }
  involve: (typeof currentFellowsPageContent)['involve']
  fellows: CurrentFellow[]
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const num = (v: unknown, d: number) => (typeof v === 'number' && v > 0 ? v : d)

function mapStats(raw: unknown, fallback: StatItem[]): StatItem[] {
  if (!Array.isArray(raw) || !raw.length) return fallback.map((s) => ({ ...s }))
  return raw
    .map((s: any) => ({
      value: txt(s?.value, ''),
      label: txt(s?.label, ''),
    }))
    .filter((s) => s.value || s.label)
}

function fellowPhotoFallback(name: string, configPhoto?: string): string {
  if (configPhoto) return configPhoto
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0a3d6b&textColor=ffffff&fontSize=38`
}

function mapFellowDoc(doc: Fellow, configFallback?: CurrentFellow): CurrentFellow {
  return {
    id: String(doc.id),
    name: doc.name,
    institution: doc.institution,
    cohort: resolveCohortLabel(doc.cohort) || configFallback?.cohort || 'Cohort 7',
    cohortId: resolveCohortId(doc.cohort) || configFallback?.cohortId,
    photo: getMediaUrl(doc.photo) ?? fellowPhotoFallback(doc.name, configFallback?.photo),
    bio: doc.bio?.trim() || configFallback?.bio || '',
    highlightTitle: doc.highlightTitle?.trim() || undefined,
    email: doc.email ?? undefined,
    phone: doc.phone ?? undefined,
    linkedin: doc.linkedin ?? undefined,
    twitter: doc.twitter ?? undefined,
    featuredOnPage: Boolean(doc.featuredOnPage),
  }
}

async function loadCohortTabs(
  payload: NonNullable<Awaited<ReturnType<typeof tryGetPayload>>>,
  fallback: { label: string; value: string }[],
) {
  const result = await payload.find({
    collection: 'cohorts',
    depth: 0,
    limit: 20,
    sort: 'order',
    where: {
      and: [{ status: { equals: 'published' } }, { showOnWebsite: { equals: true } }],
    },
  })

  const docs = (toPlain(result.docs) as Cohort[] | null) ?? []
  if (!docs.length) return { tabs: fallback, defaultCohortId: fallback[0]?.value ?? '' }

  const tabs = docs.map((cohort) => ({
    label: cohort.shortLabel?.trim() || cohort.title,
    value: String(cohort.id),
  }))

  const defaultDoc =
    docs.find((cohort) => cohort.isDefault) ??
    [...docs].sort((a, b) => (b.number ?? 0) - (a.number ?? 0))[0]

  return {
    tabs,
    defaultCohortId: defaultDoc ? String(defaultDoc.id) : tabs[0]?.value ?? '',
  }
}

/**
 * Current Fellows page: static copy from Pages → currentFellowsPage; directory
 * from Cohorts + Fellows collections with config fallback.
 */
export async function getCurrentFellowsContent(): Promise<CurrentFellowsPageContent> {
  const d = currentFellowsPageContent
  const page = await getPage('/community/current-fellows')
  const cms = (page?.currentFellowsPage ?? {}) as Record<string, any>

  let fellows: CurrentFellow[] = d.fellows.map((f) => ({
    ...f,
    cohort: f.cohort || 'Cohort 7',
    bio: '',
    featuredOnPage: false,
  }))
  let cohortTabs = d.directory.cohortTabs
  let defaultCohort = d.directory.defaultCohort

  const payload = await tryGetPayload()
  if (payload) {
    try {
      const cohortData = await loadCohortTabs(payload, d.directory.cohortTabs)
      cohortTabs = cohortData.tabs
      defaultCohort = cohortData.defaultCohortId

      const result = await payload.find({
        collection: 'fellows',
        depth: 1,
        limit: 200,
        sort: 'order',
        where: { status: { equals: 'published' } },
      })
      const docs = (toPlain(result.docs) as Fellow[] | null) ?? []
      if (docs.length > 0) {
        fellows = docs.map((doc) => {
          const fallback = d.fellows.find((f) => f.name === doc.name)
          return mapFellowDoc(doc, fallback)
        })
      }
    } catch {
      // keep config fallback
    }
  }

  const cohortTabsFinal = cohortTabs.length > 0 ? cohortTabs : d.directory.cohortTabs

  const cmsHero =
    (await resolveMediaUrl(cms.heroImage, payload)) ||
    getMediaUrl(cms.heroImage) ||
    ''
  const heroImage =
    cmsHero.startsWith('http://') || cmsHero.startsWith('https://') ? cmsHero : d.hero.image

  return {
    hero: {
      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
      title: txt(cms.heroTitle, d.hero.title),
      lead: txt(cms.heroLead, d.hero.lead),
      image: heroImage,
      stats: mapStats(cms.heroStats, d.hero.stats),
    },
    directory: {
      defaultCohort,
      cohortTabs: cohortTabsFinal,
      searchPlaceholder: txt(cms.searchPlaceholder, d.directory.searchPlaceholder),
      sectorFilterLabel: txt(cms.sectorFilterLabel, d.directory.sectorFilterLabel),
      defaultRoleLabel: txt(cms.defaultRoleLabel, d.directory.defaultRoleLabel),
      initialVisibleCount: num(cms.initialVisibleCount, d.directory.initialVisibleCount),
      showMoreLabel: txt(cms.showMoreLabel, d.directory.showMoreLabel),
      showLessLabel: txt(cms.showLessLabel, d.directory.showLessLabel),
      emptyStateText: txt(cms.emptyStateText, d.directory.emptyStateText),
    },
    eplanPromo: {
      eyebrow: txt(cms.eplanEyebrow, d.eplanPromo.eyebrow),
      title: txt(cms.eplanTitle, d.eplanPromo.title),
      intro: txt(cms.eplanIntro, d.eplanPromo.intro),
      stats: mapStats(cms.eplanStats, d.eplanPromo.stats),
      ctaLabel: txt(cms.eplanCtaLabel, d.eplanPromo.ctaLabel),
      ctaHref: txt(cms.eplanCtaUrl, d.eplanPromo.ctaHref),
    },
    involve: {
      eyebrow: txt(cms.involveEyebrow, d.involve.eyebrow),
      title: txt(cms.involveTitle, d.involve.title),
      body: txt(cms.involveBody, d.involve.body),
      primaryLabel: txt(cms.involvePrimaryLabel, d.involve.primaryLabel),
      primaryHref: resolveDonateHref(
        txt(cms.involvePrimaryUrl, d.involve.primaryHref),
        txt(cms.involvePrimaryLabel, d.involve.primaryLabel),
      ),
      secondaryLabel: txt(cms.involveSecondaryLabel, d.involve.secondaryLabel),
      secondaryHref: txt(cms.involveSecondaryUrl, d.involve.secondaryHref),
    },
    fellows,
  }
}
