import {
  currentFellowsPageContent,
  type CurrentFellow,
} from '@/config/currentFellowsContent'
import type { Cohort, Fellow } from '@/payload-types'
import { resolveDonateHref } from '@/utilities/donateLink'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { resolveCohortId, resolveCohortLabel } from '@/utilities/resolveCohort'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type FellowHighlight = {
  name: string
  institution: string
  title: string
  body: string
  photo: string
}

export type CurrentFellowsPageContent = {
  hero: (typeof currentFellowsPageContent)['hero']
  directory: (typeof currentFellowsPageContent)['directory']
  highlights: {
    eyebrow: string
    title: string
    items: FellowHighlight[]
  }
  cohort: {
    label: string
    count: number
    description: string
  }
  eplanPromo: (typeof currentFellowsPageContent)['eplanPromo']
  involve: (typeof currentFellowsPageContent)['involve']
  cta: (typeof currentFellowsPageContent)['cta']
  fellows: CurrentFellow[]
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d
const num = (v: unknown, d: number) => (typeof v === 'number' && v > 0 ? v : d)

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
    defaultDoc,
  }
}

/**
 * Current Fellows page: static copy from Pages → currentFellowsPage; directory
 * from the Fellows collection with config fallback.
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
  let highlights = d.highlights
  let cohortTabs = d.directory.cohortTabs
  let defaultCohort = d.directory.defaultCohort
  let cohortBand = d.cohort

  const payload = await tryGetPayload()
  if (payload) {
    try {
      const cohortData = await loadCohortTabs(payload, d.directory.cohortTabs)
      cohortTabs = cohortData.tabs
      defaultCohort = cohortData.defaultCohortId
      if (cohortData.defaultDoc) {
        cohortBand = {
          label: cohortData.defaultDoc.title,
          count: fellows.length,
          description: cohortData.defaultDoc.description?.trim() || d.cohort.description,
        }
      }

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

        const featured = fellows.filter((f) => f.featuredOnPage)
        if (featured.length > 0) {
          highlights = featured.map((f) => ({
            name: f.name,
            institution: f.institution,
            title: f.highlightTitle || f.institution,
            body: f.bio || '',
            photo: f.photo,
          }))
        }

        if (cohortData.defaultDoc) {
          const defaultId = String(cohortData.defaultDoc.id)
          cohortBand = {
            ...cohortBand,
            count: fellows.filter((f) => f.cohortId === defaultId).length || fellows.length,
          }
        }
      }
    } catch {
      // keep config fallback
    }
  }

  const heroStats =
    Array.isArray(cms.heroStats) && cms.heroStats.length
      ? cms.heroStats.map((s: any) => ({ value: s?.value ?? '', label: s?.label ?? '' }))
      : d.hero.stats

  const cohortTabsFinal =
    cohortTabs.length > 0 ? cohortTabs : d.directory.cohortTabs

  const eplanStats =
    Array.isArray(cms.eplanStats) && cms.eplanStats.length
      ? cms.eplanStats.map((s: any) => ({ value: s?.value ?? '', label: s?.label ?? '' }))
      : d.eplanPromo.stats

  const cohortCount =
    typeof cms.cohortCount === 'number' && cms.cohortCount > 0
      ? cms.cohortCount
      : cohortBand.count

  return {
    hero: {
      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
      title: txt(cms.heroTitle, d.hero.title),
      lead: txt(cms.heroLead, d.hero.lead),
      image: img(cms.heroImage, d.hero.image),
      secondaryImage: img(cms.heroSecondaryImage, d.hero.secondaryImage),
      stats: heroStats,
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
    highlights: {
      eyebrow: txt(cms.highlightsEyebrow, 'Fellows Highlight'),
      title: txt(cms.highlightsTitle, 'Leaders making impact'),
      items: highlights,
    },
    cohort: {
      label: txt(cms.cohortLabel, cohortBand.label),
      count: cohortCount,
      description: txt(cms.cohortDescription, cohortBand.description),
    },
    eplanPromo: {
      eyebrow: txt(cms.eplanEyebrow, d.eplanPromo.eyebrow),
      title: txt(cms.eplanTitle, d.eplanPromo.title),
      intro: txt(cms.eplanIntro, d.eplanPromo.intro),
      stats: eplanStats,
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
    cta: {
      title: txt(cms.ctaTitle, d.cta.title),
      body: txt(cms.ctaBody, d.cta.body),
      ctaLabel: txt(cms.ctaLabel, d.cta.ctaLabel),
      ctaHref: txt(cms.ctaUrl, d.cta.ctaHref),
      image: img(cms.ctaImage, d.cta.image),
    },
    fellows,
  }
}
