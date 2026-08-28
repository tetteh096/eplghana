import {

  annualReportsPageContent,

  type AnnualReportItem,

} from '@/config/annualReportsContent'

import type { Media, Publication } from '@/payload-types'

import { getMediaUrl, resolveMediaUrl } from '@/utilities/getMediaUrl'

import { getPage } from '@/utilities/getPage'

import { tryGetPayload } from '@/utilities/payloadSafe'



export type RelatedPublicationItem = {

  id: string

  title: string

  description: string

  downloadUrl?: string

}



export type AnnualReportsPageContent = {

  hero: { eyebrow: string; title: string; lead: string; image: string }

  intro: string

  reportsSection: { eyebrow: string; title: string }

  relatedSection: { eyebrow: string; title: string }

  reports: AnnualReportItem[]

  relatedPublications: RelatedPublicationItem[]

  cta: {

    title: string

    body: string

    ctaLabel: string

    ctaHref: string

  }

}



const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)



function normalizeTitle(title: string) {

  return title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

}



function fallbackReportDownload(title: string): string | undefined {

  const match = annualReportsPageContent.reports.find(

    (r) => normalizeTitle(r.title) === normalizeTitle(title),

  )

  return (match as AnnualReportItem | undefined)?.downloadUrl

}



function fallbackResearchDownload(title: string): string | undefined {

  const match = annualReportsPageContent.relatedPublications.find(

    (r) => normalizeTitle(r.title) === normalizeTitle(title),

  )

  return match?.downloadUrl

}



function mapAnnualReport(doc: Publication): AnnualReportItem | null {

  const coverImage =

    getMediaUrl(doc.coverImage) ||

    annualReportsPageContent.reports.find((r) => normalizeTitle(r.title) === normalizeTitle(doc.title))

      ?.coverImage



  if (!coverImage) return null



  const fileUrl = getMediaUrl(doc.file) || fallbackReportDownload(doc.title)

  const isAvailable = Boolean(fileUrl) && doc.status !== 'draft'



  return {

    id: String(doc.id),

    title: doc.title,

    year: doc.year?.trim() || '',

    description: doc.description,

    coverImage,

    downloadUrl: isAvailable ? fileUrl : undefined,

    status: isAvailable ? 'available' : 'coming-soon',

  }

}



function mapResearchPublication(doc: Publication): RelatedPublicationItem | null {

  if (doc.status === 'draft') return null



  const downloadUrl = getMediaUrl(doc.file) || fallbackResearchDownload(doc.title)

  if (!downloadUrl) return null



  return {

    id: String(doc.id),

    title: doc.title,

    description: doc.description,

    downloadUrl,

  }

}



export async function getAnnualReportsPageContent(): Promise<AnnualReportsPageContent> {

  const d = annualReportsPageContent

  const page = await getPage('/knowledge-products/annual-reports')

  const cms = (page?.annualReportsPage ?? {}) as Record<string, unknown>

  const payload = await tryGetPayload()



  let reports: AnnualReportItem[] = d.reports

  let relatedPublications: RelatedPublicationItem[] = d.relatedPublications.map((p, i) => ({

    id: `fallback-${i}`,

    title: p.title,

    description: p.description,

    downloadUrl: p.downloadUrl,

  }))



  if (payload) {

    try {

      const result = await payload.find({

        collection: 'publications',

        depth: 1,

        limit: 100,

        sort: 'order',

        where: { status: { not_equals: 'draft' } },

      })



      const annualFromCms = result.docs

        .filter((doc) => doc.category === 'annual-report')

        .map(mapAnnualReport)

        .filter((item): item is AnnualReportItem => item !== null)

        .sort((a, b) => Number(b.year) - Number(a.year))



      const researchFromCms = result.docs

        .filter((doc) => doc.category === 'research')

        .map(mapResearchPublication)

        .filter((item): item is RelatedPublicationItem => item !== null)



      if (annualFromCms.length > 0) reports = annualFromCms

      if (researchFromCms.length > 0) relatedPublications = researchFromCms

    } catch {

      // use config fallback

    }

  }



  const heroImage =
    (await resolveMediaUrl(cms.heroImage as string | Media | null | undefined, payload)) ||
    getMediaUrl(cms.heroImage as string | Media | null | undefined) ||
    d.hero.image



  return {

    hero: {

      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),

      title: txt(cms.heroTitle, d.hero.title),

      lead: txt(cms.heroLead, d.hero.lead),

      image: heroImage,

    },

    intro: txt(cms.introText, d.intro),

    reportsSection: {

      eyebrow: txt(cms.reportsEyebrow, d.reportsSection.eyebrow),

      title: txt(cms.reportsTitle, d.reportsSection.title),

    },

    relatedSection: {

      eyebrow: txt(cms.relatedEyebrow, d.relatedSection.eyebrow),

      title: txt(cms.relatedTitle, d.relatedSection.title),

    },

    reports,

    relatedPublications,

    cta: {

      title: txt(cms.ctaTitle, d.cta.title),

      body: txt(cms.ctaBody, d.cta.body),

      ctaLabel: txt(cms.ctaLabel, d.cta.ctaLabel),

      ctaHref: txt(cms.ctaUrl, d.cta.ctaHref),

    },

  }

}


