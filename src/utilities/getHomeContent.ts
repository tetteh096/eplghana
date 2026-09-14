import { eplHomeImages } from '@/config/eplMedia'
import { type HeroImageSlide, heroImageSlides } from '@/config/heroSlides'
import type { SiteSetting } from '@/payload-types'
import { resolveMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'

export type HomeStat = { value: string; label: string }

export type HomeEplWayItem = {
  number: string
  title: string
  description: string
  note: string
  tone: string
  image: string
  href: string
}

export type HomeImpactStory = {
  name: string
  cohort: string
  institution: string
  quote: string
  image: string
  storyHref?: string
}

export type HomeImpactStories = {
  eyebrow: string
  title: string
  ctaLabel: string
  ctaUrl: string
  featuredLabel: string
  featuredHeading: string
  featuredCtaLabel: string
  featured?: HomeImpactStory
  secondary: Omit<HomeImpactStory, 'storyHref'>[]
}

export type HomeProjectsSection = {
  eyebrow: string
  title: string
}

export type HomeEplWaySection = {
  eyebrow: string
  title: string
  intro: string
  cards: HomeEplWayItem[]
}

export type HomeEventsSection = {
  eyebrow: string
  title: string
  badge: string
  kicker: string
  registerLabel: string
}

export type HomeStatsSection = {
  heading: string
  stats: HomeStat[]
}

const defaultStats: HomeStat[] = [
  { value: '8', label: 'Cohorts' },
  { value: '200+', label: 'Fellows' },
  { value: '15+', label: 'Institutions' },
  { value: '85%', label: 'Career Advancement' },
]

const defaultEplWay: HomeEplWayItem[] = [
  {
    number: '01',
    title: 'Think Critically',
    description: 'Solving problems with clear, smart thinking.',
    note: 'We train Fellows to look at facts, solve real problems, and make smart decisions that improve how government institutions work.',
    tone: 'blue',
    image: eplHomeImages.aboutBlock,
    href: '/about',
  },
  {
    number: '02',
    title: 'Act Ethically',
    description: 'Leading with honesty, fairness, and truth.',
    note: 'Good leadership starts with strong values. We instill zero tolerance for corruption and a deep respect for public accountability.',
    tone: 'navy',
    image: eplHomeImages.gallery[1].src,
    href: '/about',
  },
  {
    number: '03',
    title: 'Drive Change',
    description: 'Turning good policy into real action.',
    note: 'Fellows do not just study policy—they work inside ministries and local assemblies to fix bottlenecks and help communities.',
    tone: 'gold',
    image: eplHomeImages.gallery[3].src,
    href: '/about',
  },
]

const defaultImpactStories: HomeImpactStories = {
  eyebrow: 'Impact stories',
  title: 'Real People. Real Impact.',
  ctaLabel: 'Read all stories',
  ctaUrl: '/news',
  featuredLabel: 'Featured Story',
  featuredHeading: 'From Fellow to Policy Leader',
  featuredCtaLabel: 'Read Her Story',
  featured: {
    name: 'Abena Osei-Bonsu',
    cohort: 'Cohort 3',
    institution: 'Ministry of Finance',
    quote:
      'EPL taught me that public service is not just a job—it is a responsibility to serve Ghana with honesty and excellence.',
    image: eplHomeImages.fellows.miriam,
    storyHref: '/community/current-fellows',
  },
  secondary: [
    {
      cohort: 'Cohort 7',
      name: 'Kwame Asante',
      institution: 'Ghana Health Service',
      quote:
        'The fellowship helped me modernize clinic records so patients spend less time waiting for care.',
      image: eplHomeImages.fellows.priscilla,
    },
    {
      cohort: 'Cohort 8',
      name: 'Efua Mensah',
      institution: 'Accra Metropolitan Assembly',
      quote:
        'EPL gave me practical tools to work directly with communities and solve local planning challenges.',
      image: eplHomeImages.fellows.anita,
    },
  ],
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v.trim() : d)

function titleLinesFromCms(
  s: Record<string, any>,
  fallback?: [string, string, string],
): [string, string, string] | undefined {
  const l1 = typeof s?.titleLine1 === 'string' ? s.titleLine1.trim() : ''
  const l2 = typeof s?.titleLine2 === 'string' ? s.titleLine2.trim() : ''
  const l3 = typeof s?.titleLine3 === 'string' ? s.titleLine3.trim() : ''
  if (l1 || l2 || l3) return [l1 || fallback?.[0] || '', l2 || fallback?.[1] || '', l3 || fallback?.[2] || '']
  return fallback
}

export async function getHomeContent(settings: SiteSetting): Promise<{
  settings: SiteSetting
  heroSlides: HeroImageSlide[]
  eplWaySection: HomeEplWaySection
  projectsSection: HomeProjectsSection
  statsSection: HomeStatsSection
  impactStories: HomeImpactStories
  eventsSection: HomeEventsSection
}> {
  const payload = await tryGetPayload()
  const page = await getPage('/')
  const home = (page?.home ?? {}) as Record<string, any>

  const heroImageUrl =
    (await resolveMediaUrl(home.heroSlides?.[0]?.image ?? settings.heroImage, payload)) ||
    eplHomeImages.heroHome

  const merged = {
    ...settings,
    heroImage: { url: heroImageUrl } as SiteSetting['heroImage'],
  }

  const rawSlides: any[] = Array.isArray(home.heroSlides) ? home.heroSlides : []
  const heroSlides: HeroImageSlide[] = rawSlides.length
    ? await Promise.all(
        rawSlides.map(async (s, i) => {
          const fallback = heroImageSlides[i] ?? heroImageSlides[0]
          const image =
            (await resolveMediaUrl(s?.image, payload)) ||
            fallback?.image ||
            eplHomeImages.heroDefault
          return {
            subtitle: txt(s?.subtitle, fallback?.subtitle || ''),
            title: txt(s?.title, fallback?.title || ''),
            titleLines: titleLinesFromCms(s, fallback?.titleLines),
            description: txt(s?.description, fallback?.description || ''),
            ctaLabel: txt(s?.ctaLabel, fallback?.ctaLabel || 'Get Involved'),
            ctaHref: txt(s?.ctaHref, fallback?.ctaHref || '/get-involved'),
            secondaryCtaLabel: txt(
              s?.secondaryCtaLabel,
              fallback?.secondaryCtaLabel || 'Learn More',
            ),
            secondaryCtaHref: txt(s?.secondaryCtaHref, fallback?.secondaryCtaHref || '/about'),
            image,
            thumb: image,
          }
        }),
      )
    : heroImageSlides

  const rawEplWay: any[] = Array.isArray(home.eplWay) ? home.eplWay : []
  const eplWayCards: HomeEplWayItem[] = rawEplWay.length
    ? await Promise.all(
        rawEplWay.map(async (item, i) => {
          const fallback = defaultEplWay[i] ?? defaultEplWay[0]
          return {
            number: txt(item?.number, fallback.number),
            title: txt(item?.title, fallback.title),
            description: txt(item?.description, fallback.description),
            note: txt(item?.note, fallback.note),
            tone: txt(item?.tone, fallback.tone),
            image: (await resolveMediaUrl(item?.image, payload)) || fallback.image,
            href: txt(item?.href, fallback.href),
          }
        }),
      )
    : defaultEplWay

  const rawStats: any[] = Array.isArray(home.stats) ? home.stats : []
  const stats: HomeStat[] = rawStats.length
    ? rawStats
        .map((item) => ({
          value: typeof item?.value === 'string' ? item.value.trim() : '',
          label: typeof item?.label === 'string' ? item.label.trim() : '',
        }))
        .filter((item) => item.value && item.label)
    : defaultStats

  const rawImpactStories: any[] = Array.isArray(home.impactStories) ? home.impactStories : []
  let impactStories: HomeImpactStories

  if (rawImpactStories.length) {
    const resolved = await Promise.all(
      rawImpactStories.map(async (item, i) => {
        const fallbackSecondary = defaultImpactStories.secondary[i]
        const fallbackFeatured = defaultImpactStories.featured
        const fallbackImage =
          item?.featured
            ? fallbackFeatured?.image
            : fallbackSecondary?.image || fallbackFeatured?.image || eplHomeImages.fellows.miriam
        return {
          name: txt(item?.name, ''),
          cohort: txt(item?.cohort, ''),
          institution: txt(item?.institution, ''),
          quote: txt(item?.quote, ''),
          image: (await resolveMediaUrl(item?.image, payload)) || fallbackImage || '',
          featured: Boolean(item?.featured),
          storyHref: txt(item?.storyHref, defaultImpactStories.featured?.storyHref || '/news'),
        }
      }),
    )
    const withNames = resolved.filter((item) => item.name)
    const featuredRaw = withNames.find((item) => item.featured) ?? withNames[0]
    const secondary = withNames
      .filter((item) => item !== featuredRaw)
      .map(({ name, cohort, institution, quote, image }) => ({
        name,
        cohort,
        institution,
        quote,
        image,
      }))

    impactStories = {
      eyebrow: txt(home.impactStoriesEyebrow, defaultImpactStories.eyebrow),
      title: txt(home.impactStoriesTitle, defaultImpactStories.title),
      ctaLabel: txt(home.impactStoriesCtaLabel, defaultImpactStories.ctaLabel),
      ctaUrl: txt(home.impactStoriesCtaUrl, defaultImpactStories.ctaUrl),
      featuredLabel: txt(home.impactStoriesFeaturedLabel, defaultImpactStories.featuredLabel),
      featuredHeading: txt(
        home.impactStoriesFeaturedHeading,
        defaultImpactStories.featuredHeading,
      ),
      featuredCtaLabel: txt(
        home.impactStoriesFeaturedCtaLabel,
        defaultImpactStories.featuredCtaLabel,
      ),
      featured: featuredRaw
        ? {
            name: featuredRaw.name,
            cohort: featuredRaw.cohort,
            institution: featuredRaw.institution,
            quote: featuredRaw.quote,
            image: featuredRaw.image,
            storyHref: featuredRaw.storyHref,
          }
        : undefined,
      secondary,
    }
  } else {
    impactStories = {
      ...defaultImpactStories,
      eyebrow: txt(home.impactStoriesEyebrow, defaultImpactStories.eyebrow),
      title: txt(home.impactStoriesTitle, defaultImpactStories.title),
      ctaLabel: txt(home.impactStoriesCtaLabel, defaultImpactStories.ctaLabel),
      ctaUrl: txt(home.impactStoriesCtaUrl, defaultImpactStories.ctaUrl),
      featuredLabel: txt(home.impactStoriesFeaturedLabel, defaultImpactStories.featuredLabel),
      featuredHeading: txt(
        home.impactStoriesFeaturedHeading,
        defaultImpactStories.featuredHeading,
      ),
      featuredCtaLabel: txt(
        home.impactStoriesFeaturedCtaLabel,
        defaultImpactStories.featuredCtaLabel,
      ),
    }
  }

  return {
    settings: merged,
    heroSlides,
    eplWaySection: {
      eyebrow: txt(home.eplWayEyebrow, 'How We Work'),
      title: txt(home.eplWayTitle, 'The EPL Way'),
      intro: txt(
        home.eplWayIntro,
        'We develop leaders who bring clear thinking, strong values and purposeful action to public service.',
      ),
      cards: eplWayCards,
    },
    projectsSection: {
      eyebrow: txt(home.projectsEyebrow, 'Our Work'),
      title: txt(home.projectsTitle, 'Projects That Move\nPublic Service Forward'),
    },
    statsSection: {
      heading: txt(home.statsHeading, 'Impact Numbers'),
      stats: stats.length ? stats : defaultStats,
    },
    impactStories,
    eventsSection: {
      eyebrow: txt(home.eventsEyebrow, 'Updates & events'),
      title: txt(home.eventsTitle, 'Latest Updates from EPL Ghana'),
      badge: txt(home.eventsBadge, 'Annual forum'),
      kicker: txt(home.eventsKicker, 'Upcoming event'),
      registerLabel: txt(home.eventsRegisterLabel, 'Register for event'),
    },
  }
}
