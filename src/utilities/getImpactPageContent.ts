import {
  impactPageContent,
  type ImpactTestimonialCategory,
} from '@/config/impactPageContent'
import type { Fellow } from '@/payload-types'
import { getMediaUrl, resolveMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type ImpactPageContent = {
  hero: {
    eyebrow: string
    title: string
    description: string
    image: string
  }
  glance: {
    eyebrow: string
    title: string
    stats: { value: string; title: string; desc: string }[]
  }
  successStories: {
    eyebrow: string
    title: string
    items: {
      name: string
      role: string
      cohort: string
      image: string
      desc: string
    }[]
  }
  communityStories: {
    eyebrow: string
    title: string
    intro: string
    ctaLabel: string
    ctaUrl: string
    items: {
      num: string
      region: string
      assembly: string
      title: string
      desc: string
    }[]
  }
  testimonials: {
    eyebrow: string
    title: string
    intro: string
    items: {
      category: ImpactTestimonialCategory
      quote: string
      author: string
      role: string
      org: string
    }[]
  }
  publications: {
    eyebrow: string
    title: string
    intro: string
    reportsHeading: string
    reportsCtaLabel: string
    reportsCtaUrl: string
    reports: { edition: string; title: string; summary: string }[]
    researchHeading: string
    researchCtaLabel: string
    researchCtaUrl: string
    research: { tag: string; title: string; authorYear: string; summary: string }[]
  }
}

const CATEGORIES = new Set<ImpactTestimonialCategory>([
  'Supervisors',
  'Mentors',
  'Partnered Institutions',
])

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)

import { resolveCohortLabel } from '@/utilities/resolveCohort'

function fellowPhotoFallback(name: string, configPhoto?: string): string {
  if (configPhoto) return configPhoto
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0a3d6b&textColor=ffffff&fontSize=38`
}

async function loadSuccessStoriesFromFellows(
  payload: NonNullable<Awaited<ReturnType<typeof tryGetPayload>>>,
  defaults: ImpactPageContent['successStories']['items'],
) {
  const result = await payload.find({
    collection: 'fellows',
    depth: 1,
    limit: 12,
    sort: 'order',
    where: {
      and: [{ status: { equals: 'published' } }, { featuredOnImpact: { equals: true } }],
    },
  })

  const docs = (toPlain(result.docs) as Fellow[] | null) ?? []
  if (!docs.length) return null

  return Promise.all(
    docs.map(async (doc, index) => {
      const fb = defaults[index] ?? defaults[0]
      const image =
        (await resolveMediaUrl(doc.photo, payload)) ||
        getMediaUrl(doc.photo) ||
        fellowPhotoFallback(doc.name, fb?.image)
      const desc =
        doc.impactStory?.trim() || doc.bio?.trim() || fb?.desc || ''
      return {
        name: doc.name,
        role: doc.institution,
        cohort: resolveCohortLabel(doc.cohort),
        image,
        desc,
      }
    }),
  )
}

async function loadCommunityStoriesFromCollection(
  payload: NonNullable<Awaited<ReturnType<typeof tryGetPayload>>>,
  defaults: ImpactPageContent['communityStories']['items'],
) {
  const result = await payload.find({
    collection: 'impact-interventions',
    depth: 0,
    limit: 24,
    sort: 'order',
    where: { status: { equals: 'published' } },
  })

  const docs = toPlain(result.docs) as Array<{
    region?: string | null
    assembly?: string | null
    title?: string | null
    description?: string | null
  }> | null

  if (!docs?.length) return null

  return docs.map((item, index) => {
    const fb = defaults[index] ?? defaults[0]
    return {
      num: String(index + 1).padStart(2, '0'),
      region: txt(item.region, fb.region),
      assembly: txt(item.assembly, fb.assembly),
      title: txt(item.title, fb.title),
      desc: txt(item.description, fb.desc),
    }
  })
}

/**
 * Impact page content: Pages → impactPage layered over impactPageContent defaults.
 * Hero and success-story images resolve via Media URLs with config fallbacks.
 */
export async function getImpactPageContent(): Promise<ImpactPageContent> {
  const d = impactPageContent
  const page = await getPage('/impact')
  const cms = (page?.impactPage ?? {}) as Record<string, any>
  const payload = await tryGetPayload()

  const heroImage =
    (await resolveMediaUrl(cms.heroImage, payload)) ||
    getMediaUrl(cms.heroImage) ||
    d.hero.image

  const glanceStats =
    Array.isArray(cms.glanceStats) && cms.glanceStats.length
      ? cms.glanceStats.map((s: any, i: number) => {
          const fb = d.glance.stats[i] ?? d.glance.stats[0]
          return {
            value: txt(s?.value, fb.value),
            title: txt(s?.title, fb.title),
            desc: txt(s?.desc, fb.desc),
          }
        })
      : d.glance.stats

  let successItems = d.successStories.items
  let communityItems = d.communityStories.items

  if (payload) {
    try {
      const fromFellows = await loadSuccessStoriesFromFellows(payload, d.successStories.items)
      if (fromFellows?.length) successItems = fromFellows
      else if (Array.isArray(cms.successStories) && cms.successStories.length) {
        successItems = await Promise.all(
          cms.successStories.map(async (item: any, i: number) => {
            const fb = d.successStories.items[i] ?? d.successStories.items[0]
            const image =
              (await resolveMediaUrl(item?.image, payload)) ||
              getMediaUrl(item?.image) ||
              fb.image
            return {
              name: txt(item?.name, fb.name),
              role: txt(item?.role, fb.role),
              cohort: txt(item?.cohort, fb.cohort),
              image,
              desc: txt(item?.desc, fb.desc),
            }
          }),
        )
      }

      const fromInterventions = await loadCommunityStoriesFromCollection(
        payload,
        d.communityStories.items,
      )
      if (fromInterventions?.length) communityItems = fromInterventions
      else if (Array.isArray(cms.communityStories) && cms.communityStories.length) {
        communityItems = cms.communityStories.map((item: any, i: number) => {
          const fb = d.communityStories.items[i] ?? d.communityStories.items[0]
          return {
            num: txt(item?.num, fb.num),
            region: txt(item?.region, fb.region),
            assembly: txt(item?.assembly, fb.assembly),
            title: txt(item?.title, fb.title),
            desc: txt(item?.desc, fb.desc),
          }
        })
      }
    } catch {
      // Keep config defaults when the DB is unavailable.
    }
  } else if (Array.isArray(cms.successStories) && cms.successStories.length) {
    successItems = await Promise.all(
      cms.successStories.map(async (item: any, i: number) => {
        const fb = d.successStories.items[i] ?? d.successStories.items[0]
        const image = getMediaUrl(item?.image) || fb.image
        return {
          name: txt(item?.name, fb.name),
          role: txt(item?.role, fb.role),
          cohort: txt(item?.cohort, fb.cohort),
          image,
          desc: txt(item?.desc, fb.desc),
        }
      }),
    )
    if (Array.isArray(cms.communityStories) && cms.communityStories.length) {
      communityItems = cms.communityStories.map((item: any, i: number) => {
        const fb = d.communityStories.items[i] ?? d.communityStories.items[0]
        return {
          num: txt(item?.num, fb.num),
          region: txt(item?.region, fb.region),
          assembly: txt(item?.assembly, fb.assembly),
          title: txt(item?.title, fb.title),
          desc: txt(item?.desc, fb.desc),
        }
      })
    }
  }

  const testimonials =
    Array.isArray(cms.testimonials) && cms.testimonials.length
      ? cms.testimonials.map((item: any, i: number) => {
          const fb = d.testimonials.items[i] ?? d.testimonials.items[0]
          const categoryRaw = typeof item?.category === 'string' ? item.category : ''
          return {
            category: (CATEGORIES.has(categoryRaw as ImpactTestimonialCategory)
              ? categoryRaw
              : fb.category) as ImpactTestimonialCategory,
            quote: txt(item?.quote, fb.quote),
            author: txt(item?.author, fb.author),
            role: txt(item?.role, fb.role),
            org: txt(item?.org, fb.org),
          }
        })
      : d.testimonials.items

  const reports =
    Array.isArray(cms.annualReports) && cms.annualReports.length
      ? cms.annualReports.map((r: any, i: number) => {
          const fb = d.publications.reports[i] ?? d.publications.reports[0]
          return {
            edition: txt(r?.edition, fb.edition),
            title: txt(r?.title, fb.title),
            summary: txt(r?.summary, fb.summary),
          }
        })
      : d.publications.reports

  const research =
    Array.isArray(cms.researchStudies) && cms.researchStudies.length
      ? cms.researchStudies.map((r: any, i: number) => {
          const fb = d.publications.research[i] ?? d.publications.research[0]
          return {
            tag: txt(r?.tag, fb.tag),
            title: txt(r?.title, fb.title),
            authorYear: txt(r?.authorYear, fb.authorYear),
            summary: txt(r?.summary, fb.summary),
          }
        })
      : d.publications.research

  return {
    hero: {
      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
      title: txt(cms.heroTitle, d.hero.title),
      description: txt(cms.heroDescription, d.hero.description),
      image: heroImage,
    },
    glance: {
      eyebrow: txt(cms.glanceEyebrow, d.glance.eyebrow),
      title: txt(cms.glanceTitle, d.glance.title),
      stats: glanceStats,
    },
    successStories: {
      eyebrow: txt(cms.successEyebrow, d.successStories.eyebrow),
      title: txt(cms.successTitle, d.successStories.title),
      items: successItems,
    },
    communityStories: {
      eyebrow: txt(cms.communityEyebrow, d.communityStories.eyebrow),
      title: txt(cms.communityTitle, d.communityStories.title),
      intro: txt(cms.communityIntro, d.communityStories.intro),
      ctaLabel: txt(cms.communityCtaLabel, d.communityStories.ctaLabel),
      ctaUrl: txt(cms.communityCtaUrl, d.communityStories.ctaUrl),
      items: communityItems,
    },
    testimonials: {
      eyebrow: txt(cms.testimonialsEyebrow, d.testimonials.eyebrow),
      title: txt(cms.testimonialsTitle, d.testimonials.title),
      intro: txt(cms.testimonialsIntro, d.testimonials.intro),
      items: testimonials,
    },
    publications: {
      eyebrow: txt(cms.publicationsEyebrow, d.publications.eyebrow),
      title: txt(cms.publicationsTitle, d.publications.title),
      intro: txt(cms.publicationsIntro, d.publications.intro),
      reportsHeading: txt(cms.reportsHeading, d.publications.reportsHeading),
      reportsCtaLabel: txt(cms.reportsCtaLabel, d.publications.reportsCtaLabel),
      reportsCtaUrl: txt(cms.reportsCtaUrl, d.publications.reportsCtaUrl),
      reports,
      researchHeading: txt(cms.researchHeading, d.publications.researchHeading),
      researchCtaLabel: txt(cms.researchCtaLabel, d.publications.researchCtaLabel),
      researchCtaUrl: txt(cms.researchCtaUrl, d.publications.researchCtaUrl),
      research,
    },
  }
}
