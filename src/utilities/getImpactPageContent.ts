import {
  impactPageContent,
  type ImpactTestimonialCategory,
} from '@/config/impactPageContent'
import type { Fellow, Media } from '@/payload-types'
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
      slug: string
      href: string
      region: string
      assembly: string
      title: string
      desc: string
      body: string
      image: string
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
      image: string
    }[]
  }
  publications: {
    eyebrow: string
    title: string
    intro: string
    reportsHeading: string
    reportsCtaLabel: string
    reportsCtaUrl: string
    reports: { edition: string; title: string; summary: string; href?: string }[]
    researchHeading: string
    researchCtaLabel: string
    researchCtaUrl: string
    research: { tag: string; title: string; authorYear: string; summary: string; href?: string }[]
  }
}

const CATEGORIES = new Set<ImpactTestimonialCategory>([
  'Supervisors',
  'Mentors',
  'Partnered Institutions',
])

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)

import { resolveCohortLabel } from '@/utilities/resolveCohort'

function portraitFallback(name: string): string {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=4150A3&textColor=ffffff&fontSize=38`
}

async function loadSuccessStoriesFromFellows(
  payload: NonNullable<Awaited<ReturnType<typeof tryGetPayload>>>,
  defaults: ImpactPageContent['successStories']['items'],
) {
  const result = await payload.find({
    collection: 'fellows',
    depth: 1,
    limit: 3,
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
        portraitFallback(doc.name)
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

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function withStoryLinks(
  items: Array<{
    num: string
    slug?: string
    region: string
    assembly: string
    title: string
    desc: string
    body?: string
    image: string
  }>,
): ImpactPageContent['communityStories']['items'] {
  return items.map((item, index) => {
    const slug = item.slug?.trim() || slugify(item.assembly || item.title) || `story-${index + 1}`
    return {
      num: item.num,
      slug,
      href: `/impact/stories/${slug}`,
      region: item.region,
      assembly: item.assembly,
      title: item.title,
      desc: item.desc,
      body: item.body?.trim() || item.desc,
      image: item.image,
    }
  })
}

async function loadCommunityStoriesFromCollection(
  payload: NonNullable<Awaited<ReturnType<typeof tryGetPayload>>>,
  defaults: ImpactPageContent['communityStories']['items'],
) {
  const result = await payload.find({
    collection: 'impact-interventions',
    depth: 1,
    limit: 24,
    sort: 'order',
    where: { status: { equals: 'published' } },
  })

  const docs = toPlain(result.docs) as Array<{
    slug?: string | null
    region?: string | null
    assembly?: string | null
    title?: string | null
    description?: string | null
    body?: string | null
    image?: unknown
  }> | null

  if (!docs?.length) return null

  const mapped = await Promise.all(
    docs.map(async (item, index) => {
      const fb = defaults[index] ?? defaults[0]
      const media = item.image as string | number | Media | null | undefined
      const image =
        (await resolveMediaUrl(media, payload)) ||
        getMediaUrl(media) ||
        fb?.image ||
        ''
      const assembly = txt(item.assembly, fb.assembly)
      const title = txt(item.title, fb.title)
      const desc = txt(item.description, fb.desc)
      const slug =
        (typeof item.slug === 'string' && item.slug.trim()) ||
        fb?.slug ||
        slugify(assembly || title)
      return {
        num: String(index + 1).padStart(2, '0'),
        slug,
        region: txt(item.region, fb.region),
        assembly,
        title,
        desc,
        body: txt(item.body, fb.body || desc),
        image,
      }
    }),
  )

  return withStoryLinks(mapped)
}

async function loadPublicationsFromCollection(
  payload: NonNullable<Awaited<ReturnType<typeof tryGetPayload>>>,
): Promise<{
  reports: ImpactPageContent['publications']['reports']
  research: ImpactPageContent['publications']['research']
} | null> {
  const [reportsResult, researchResult] = await Promise.all([
    payload.find({
      collection: 'publications',
      depth: 1,
      limit: 8,
      sort: 'order',
      where: {
        and: [{ status: { equals: 'published' } }, { category: { equals: 'annual-report' } }],
      },
    }),
    payload.find({
      collection: 'publications',
      depth: 1,
      limit: 8,
      sort: 'order',
      where: {
        and: [
          { status: { not_equals: 'draft' } },
          {
            category: {
              in: ['research', 'studies', 'articles', 'factsheets', 'technical-policy-briefs'],
            },
          },
        ],
      },
    }),
  ])

  const reportDocs = toPlain(reportsResult.docs) ?? []
  const researchDocs = toPlain(researchResult.docs) ?? []
  if (!reportDocs.length && !researchDocs.length) return null

  const reports = await Promise.all(
    reportDocs.map(async (doc: any) => {
      const year = typeof doc?.year === 'string' && doc.year.trim() ? doc.year.trim() : ''
      const href = (await resolveMediaUrl(doc?.file, payload)) || getMediaUrl(doc?.file) || undefined
      return {
        edition: year ? `${year} Edition` : 'Annual Report',
        title: typeof doc?.title === 'string' ? doc.title : '',
        summary: typeof doc?.description === 'string' ? doc.description : '',
        href,
      }
    }),
  )

  const research = await Promise.all(
    researchDocs.map(async (doc: any) => {
      const year = typeof doc?.year === 'string' && doc.year.trim() ? doc.year.trim() : ''
      const category =
        doc?.category === 'research'
          ? 'studies'
          : typeof doc?.category === 'string'
            ? doc.category
            : 'studies'
      const slug =
        (typeof doc?.slug === 'string' && doc.slug.trim()) ||
        (typeof doc?.title === 'string'
          ? doc.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '')
          : '')
      const fileHref =
        (await resolveMediaUrl(doc?.file, payload)) || getMediaUrl(doc?.file) || undefined
      const href =
        slug &&
        ['articles', 'factsheets', 'studies', 'technical-policy-briefs'].includes(category)
          ? `/research/${category}/${slug}`
          : fileHref
      return {
        tag: 'Research',
        title: typeof doc?.title === 'string' ? doc.title : '',
        authorYear: year || 'EPL Ghana',
        summary: typeof doc?.description === 'string' ? doc.description : '',
        href,
      }
    }),
  )

  return { reports, research }
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

  const cmsHero =
    (await resolveMediaUrl(cms.heroImage, payload)) ||
    getMediaUrl(cms.heroImage) ||
    ''
  const heroImage = cmsHero || d.hero.image

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
  let communityItems: ImpactPageContent['communityStories']['items'] = withStoryLinks(
    d.communityStories.items,
  )
  let reports: ImpactPageContent['publications']['reports'] = []
  let research: ImpactPageContent['publications']['research'] = []

  if (payload) {
    try {
      const fromFellows = await loadSuccessStoriesFromFellows(payload, d.successStories.items)
      if (fromFellows?.length) successItems = fromFellows

      const fromInterventions = await loadCommunityStoriesFromCollection(
        payload,
        communityItems,
      )
      if (fromInterventions?.length) communityItems = fromInterventions

      const fromPublications = await loadPublicationsFromCollection(payload)
      if (fromPublications?.reports.length) reports = fromPublications.reports
      if (fromPublications?.research.length) research = fromPublications.research
    } catch {
      // Keep config defaults when the DB is unavailable.
    }
  }

  let testimonials: ImpactPageContent['testimonials']['items']
  if (Array.isArray(cms.testimonials) && cms.testimonials.length) {
    testimonials = payload
      ? await Promise.all(
          cms.testimonials.map(async (item: any, i: number) => {
            const fb = d.testimonials.items[i] ?? d.testimonials.items[0]
            const categoryRaw = typeof item?.category === 'string' ? item.category : ''
            const author = txt(item?.author, fb.author)
            const image =
              (await resolveMediaUrl(item?.photo, payload)) ||
              getMediaUrl(item?.photo) ||
              portraitFallback(author)
            return {
              category: (CATEGORIES.has(categoryRaw as ImpactTestimonialCategory)
                ? categoryRaw
                : fb.category) as ImpactTestimonialCategory,
              quote: txt(item?.quote, fb.quote),
              author,
              role: txt(item?.role, fb.role),
              org: txt(item?.org, fb.org),
              image,
            }
          }),
        )
      : cms.testimonials.map((item: any, i: number) => {
          const fb = d.testimonials.items[i] ?? d.testimonials.items[0]
          const categoryRaw = typeof item?.category === 'string' ? item.category : ''
          const author = txt(item?.author, fb.author)
          return {
            category: (CATEGORIES.has(categoryRaw as ImpactTestimonialCategory)
              ? categoryRaw
              : fb.category) as ImpactTestimonialCategory,
            quote: txt(item?.quote, fb.quote),
            author,
            role: txt(item?.role, fb.role),
            org: txt(item?.org, fb.org),
            image: portraitFallback(author),
          }
        })
  } else {
    testimonials = d.testimonials.items.map((item) => ({
      ...item,
      image: portraitFallback(item.author),
    }))
  }

  if (!reports.length) reports = d.publications.reports
  if (!research.length) research = d.publications.research

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

export async function getCommunityStories() {
  const content = await getImpactPageContent()
  return {
    section: {
      eyebrow: content.communityStories.eyebrow,
      title: content.communityStories.title,
      intro: content.communityStories.intro,
    },
    items: content.communityStories.items,
  }
}

export async function getCommunityStoryBySlug(slug: string) {
  const { items, section } = await getCommunityStories()
  const story = items.find((item) => item.slug === slug) ?? null
  if (!story) return null
  return {
    section,
    story,
    related: items.filter((item) => item.slug !== slug).slice(0, 3),
  }
}
