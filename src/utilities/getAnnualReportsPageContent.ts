import {
  annualReportsPageContent,
  type AnnualReportItem,
} from '@/config/annualReportsContent'
import type { Publication } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'

export type RelatedPublicationItem = {
  id: string
  title: string
  description: string
  downloadUrl?: string
}

export type AnnualReportsPageContent = {
  hero: { title: string; lead: string }
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

function mapAnnualReport(doc: Publication): AnnualReportItem | null {
  const coverImage = getMediaUrl(doc.coverImage)
  if (!coverImage) return null

  const fileUrl = getMediaUrl(doc.file)
  const isPublished = doc.status === 'published' && fileUrl

  return {
    id: String(doc.id),
    title: doc.title,
    year: doc.year?.trim() || '',
    description: doc.description,
    coverImage,
    downloadUrl: isPublished ? fileUrl : undefined,
    status: isPublished ? 'available' : 'coming-soon',
  }
}

function mapResearchPublication(doc: Publication): RelatedPublicationItem | null {
  const downloadUrl = getMediaUrl(doc.file)
  if (doc.status !== 'published' || !downloadUrl) return null

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

  let reports: AnnualReportItem[] = d.reports
  let relatedPublications: RelatedPublicationItem[] = d.relatedPublications.map((p, i) => ({
    id: `fallback-${i}`,
    title: p.title,
    description: p.description,
    downloadUrl: p.downloadUrl,
  }))

  const payload = await tryGetPayload()
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

  return {
    hero: {
      title: d.hero.title,
      lead: txt(cms.heroLead, d.hero.lead),
    },
    intro: txt(cms.introText, d.intro),
    reportsSection: {
      eyebrow: txt(cms.reportsEyebrow, 'Impact Reports'),
      title: txt(cms.reportsTitle, 'Annual publications'),
    },
    relatedSection: {
      eyebrow: txt(cms.relatedEyebrow, 'Related Publications'),
      title: txt(cms.relatedTitle, 'Research & impact documents'),
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
