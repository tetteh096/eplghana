import { eplHomeImages } from '@/config/eplMedia'
import { type HeroImageSlide, heroImageSlides } from '@/config/heroSlides'
import type { SiteSetting } from '@/payload-types'
import { resolveMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'

export type HomeSections = {
  projects: { eyebrow: string; title: string }
  events: { eyebrow: string; title: string }
  blog: { eyebrow: string; title: string; intro: string }
}

export type GalleryItem = { src: string; alt: string }

export type HomeAboutMission = {
  title: string
  bullets: string[]
  image: string
}

export type HomeStat = { value: string; label: string }

export type HomeHeroCurve = {
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaUrl: string
}

export type HomeEplWayItem = {
  number: string
  title: string
  description: string
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
  featured?: HomeImpactStory
  secondary: Omit<HomeImpactStory, 'storyHref'>[]
}

const defaultAboutMission: HomeAboutMission = {
  title: 'Our Mission',
  bullets: [
    'Strengthen public institutions from within',
    'Develop value-based sector leaders',
  ],
  image: eplHomeImages.aboutBlock,
}

const defaultSections: HomeSections = {
  projects: { eyebrow: 'Our Work', title: 'Explore Our Projects' },
  events: { eyebrow: 'Upcoming Events', title: 'EPL Ghana Event Schedule' },
  blog: {
    eyebrow: 'Latest News',
    title: 'Read Our Latest Updates',
    intro:
      'Stories from our fellows, programs, and public service transformation work across Ghana.',
  },
}

const defaultStats: HomeStat[] = [
  { value: '500+', label: 'Fellows' },
  { value: '12+', label: 'Public Institutions' },
  { value: '8', label: 'Cohorts' },
  { value: '85%', label: 'Career Advancement' },
]

const defaultHeroCurve: HomeHeroCurve = {
  eyebrow: 'What we do',
  title: 'Growing ethical public leaders who strengthen Ghana from within.',
  description:
    'Emerging Public Leaders of Ghana develops critical-thinking, values-driven professionals and places them where institutions need them most.',
  ctaLabel: 'Find out more',
  ctaUrl: '/about/what-we-do',
}

const defaultEplWay: HomeEplWayItem[] = [
  {
    number: '01',
    title: 'Think Critically',
    description: 'Analytical rigour and strategic problem-solving.',
    tone: 'blue',
    image: eplHomeImages.aboutBlock,
    href: '/about/what-we-do',
  },
  {
    number: '02',
    title: 'Act Ethically',
    description: 'Integrity, transparency and values-led service.',
    tone: 'navy',
    image: eplHomeImages.gallery[1].src,
    href: '/about/what-we-do',
  },
  {
    number: '03',
    title: 'Drive Change',
    description: 'Transforming institutions and local communities.',
    tone: 'gold',
    image: eplHomeImages.gallery[3].src,
    href: '/about/what-we-do',
  },
]

const defaultImpactStories: HomeImpactStories = {
  eyebrow: 'Impact stories',
  title: 'Beyond the Numbers',
  ctaLabel: 'Meet more fellows',
  ctaUrl: '/community/current-fellows',
  featured: {
    name: 'Abena Osei-Bonsu',
    cohort: 'Cohort 3',
    institution: 'Ministry of Finance',
    quote:
      "EPL didn't just teach me to lead. It showed me what leadership in service to Ghana truly means.",
    image: eplHomeImages.fellows.miriam,
    storyHref: '/community/current-fellows',
  },
  secondary: [
    {
      cohort: 'Cohort 7',
      name: 'Kwame Asante',
      institution: 'Ghana Health Service',
      quote: 'The fellowship transformed how I see my role in public health.',
      image: eplHomeImages.fellows.priscilla,
    },
    {
      cohort: 'Cohort 8',
      name: 'Efua Mensah',
      institution: 'Accra Metropolitan Assembly',
      quote: 'EPL gave me the tools and the community to drive real change from within.',
      image: eplHomeImages.fellows.anita,
    },
  ],
}

function isMeaningful(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim() !== ''
  if (Array.isArray(value)) return value.length > 0
  return true
}

/** Default "Fellows trained" avatar photos (real fellows) when none set in CMS. */
const defaultHeroAvatars: string[] = [
  eplHomeImages.fellows.miriam,
  eplHomeImages.fellows.priscilla,
  eplHomeImages.fellows.anita,
]

export async function getHomeContent(settings: SiteSetting): Promise<{
  settings: SiteSetting
  sections: HomeSections
  heroSlides: HeroImageSlide[]
  heroAvatars: string[]
  gallery: GalleryItem[]
  aboutMission: HomeAboutMission
  stats: HomeStat[]
  heroCurve: HomeHeroCurve
  eplWay: HomeEplWayItem[]
  impactStories: HomeImpactStories
}> {
  const payload = await tryGetPayload()
  const page = await getPage('/')
  const home = (page?.home ?? {}) as Record<string, any>

  const overrides: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(home)) {
    if (
      key === 'sections' ||
      key === 'heroSlides' ||
      key === 'heroAvatars' ||
      key === 'gallery' ||
      key === 'aboutMissionTitle' ||
      key === 'aboutMissionBullets' ||
      key === 'aboutMissionImage' ||
      key === 'stats' ||
      key === 'eplWay' ||
      key === 'impactStories' ||
      key === 'impactStoriesEyebrow' ||
      key === 'impactStoriesTitle' ||
      key === 'impactStoriesCtaLabel' ||
      key === 'impactStoriesCtaUrl' ||
      key === 'curveEyebrow' ||
      key === 'curveTitle' ||
      key === 'curveDescription' ||
      key === 'curveCtaLabel' ||
      key === 'curveCtaUrl'
    )
      continue
    if (isMeaningful(value)) overrides[key] = value
  }

  const merged = { ...settings, ...overrides } as SiteSetting

  const heroImageUrl =
    (await resolveMediaUrl(home.heroImage ?? merged.heroImage, payload)) ||
    eplHomeImages.heroHome

  // Keep a url-bearing object on settings so client-side getMediaUrl() works too.
  merged.heroImage = { url: heroImageUrl } as SiteSetting['heroImage']

  const rawSlides: any[] = Array.isArray(home.heroSlides) ? home.heroSlides : []
  const heroSlides: HeroImageSlide[] = rawSlides.length
    ? await Promise.all(
        rawSlides.map(async (s, i) => {
          const fallback = heroImageSlides[i]
          const image =
            (await resolveMediaUrl(s?.image, payload)) ||
            fallback?.image ||
            eplHomeImages.heroDefault
          const thumb =
            (await resolveMediaUrl(s?.thumb, payload)) || fallback?.thumb || image
          return {
            subtitle: s?.subtitle || fallback?.subtitle || '',
            title: s?.title || fallback?.title || '',
            description: s?.description || fallback?.description || '',
            ctaLabel: s?.ctaLabel || fallback?.ctaLabel || 'Learn More',
            ctaHref: s?.ctaHref || fallback?.ctaHref || '/about',
            image,
            thumb,
          }
        }),
      )
    : heroImageSlides

  const rawAvatars: any[] = Array.isArray(home.heroAvatars) ? home.heroAvatars : []
  const resolvedAvatars = (
    await Promise.all(rawAvatars.map((a) => resolveMediaUrl(a?.image, payload)))
  ).filter((src): src is string => Boolean(src))
  const heroAvatars: string[] = resolvedAvatars.length ? resolvedAvatars : defaultHeroAvatars

  const rawGallery: any[] = Array.isArray(home.gallery) ? home.gallery : []
  const gallery: GalleryItem[] = rawGallery.length
    ? (
        await Promise.all(
          rawGallery.map(async (g) => ({
            src: (await resolveMediaUrl(g?.image, payload)) || '',
            alt: g?.alt || '',
          })),
        )
      ).filter((g) => g.src)
    : eplHomeImages.gallery.map((g) => ({ src: g.src, alt: g.alt }))

  const s = (home.sections ?? {}) as Record<string, any>
  const sections: HomeSections = {
    projects: {
      eyebrow: s?.projects?.eyebrow || defaultSections.projects.eyebrow,
      title: s?.projects?.title || defaultSections.projects.title,
    },
    events: {
      eyebrow: s?.events?.eyebrow || defaultSections.events.eyebrow,
      title: s?.events?.title || defaultSections.events.title,
    },
    blog: {
      eyebrow: s?.blog?.eyebrow || defaultSections.blog.eyebrow,
      title: s?.blog?.title || defaultSections.blog.title,
      intro: s?.blog?.intro || defaultSections.blog.intro,
    },
  }

  const rawMissionBullets: Array<{ text?: string }> = Array.isArray(home.aboutMissionBullets)
    ? home.aboutMissionBullets
    : []
  const missionBullets = rawMissionBullets
    .map((item) => (typeof item?.text === 'string' ? item.text.trim() : ''))
    .filter(Boolean)

  const aboutMission: HomeAboutMission = {
    title:
      typeof home.aboutMissionTitle === 'string' && home.aboutMissionTitle.trim()
        ? home.aboutMissionTitle.trim()
        : defaultAboutMission.title,
    bullets: missionBullets.length > 0 ? missionBullets : defaultAboutMission.bullets,
    image:
      (await resolveMediaUrl(home.aboutMissionImage, payload)) || defaultAboutMission.image,
  }

  const rawStats: any[] = Array.isArray(home.stats) ? home.stats : []
  const stats: HomeStat[] = rawStats.length
    ? rawStats
        .map((item) => ({
          value: typeof item?.value === 'string' ? item.value.trim() : '',
          label: typeof item?.label === 'string' ? item.label.trim() : '',
        }))
        .filter((item) => item.value && item.label)
    : defaultStats

  const heroCurve: HomeHeroCurve = {
    eyebrow:
      typeof home.curveEyebrow === 'string' && home.curveEyebrow.trim()
        ? home.curveEyebrow.trim()
        : defaultHeroCurve.eyebrow,
    title:
      typeof home.curveTitle === 'string' && home.curveTitle.trim()
        ? home.curveTitle.trim()
        : defaultHeroCurve.title,
    description:
      typeof home.curveDescription === 'string' && home.curveDescription.trim()
        ? home.curveDescription.trim()
        : defaultHeroCurve.description,
    ctaLabel:
      typeof home.curveCtaLabel === 'string' && home.curveCtaLabel.trim()
        ? home.curveCtaLabel.trim()
        : defaultHeroCurve.ctaLabel,
    ctaUrl:
      typeof home.curveCtaUrl === 'string' && home.curveCtaUrl.trim()
        ? home.curveCtaUrl.trim()
        : defaultHeroCurve.ctaUrl,
  }

  const rawEplWay: any[] = Array.isArray(home.eplWay) ? home.eplWay : []
  const eplWay: HomeEplWayItem[] = rawEplWay.length
    ? await Promise.all(
        rawEplWay.map(async (item, i) => {
          const fallback = defaultEplWay[i] ?? defaultEplWay[0]
          return {
            number: item?.number || fallback.number,
            title: item?.title || fallback.title,
            description: item?.description || fallback.description,
            tone: item?.tone || fallback.tone,
            image: (await resolveMediaUrl(item?.image, payload)) || fallback.image,
            href: item?.href || fallback.href,
          }
        }),
      )
    : defaultEplWay.map((item) =>
        item.number === '01' && aboutMission.image
          ? { ...item, image: aboutMission.image }
          : item,
      )

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
            : fallbackSecondary?.image || fallbackFeatured?.image || defaultHeroAvatars[0]
        return {
          name: typeof item?.name === 'string' ? item.name.trim() : '',
          cohort: typeof item?.cohort === 'string' ? item.cohort.trim() : '',
          institution: typeof item?.institution === 'string' ? item.institution.trim() : '',
          quote: typeof item?.quote === 'string' ? item.quote.trim() : '',
          image: (await resolveMediaUrl(item?.image, payload)) || fallbackImage || '',
          featured: Boolean(item?.featured),
          storyHref:
            typeof item?.storyHref === 'string' && item.storyHref.trim()
              ? item.storyHref.trim()
              : defaultImpactStories.featured?.storyHref || '/community/current-fellows',
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
      eyebrow:
        typeof home.impactStoriesEyebrow === 'string' && home.impactStoriesEyebrow.trim()
          ? home.impactStoriesEyebrow.trim()
          : defaultImpactStories.eyebrow,
      title:
        typeof home.impactStoriesTitle === 'string' && home.impactStoriesTitle.trim()
          ? home.impactStoriesTitle.trim()
          : defaultImpactStories.title,
      ctaLabel:
        typeof home.impactStoriesCtaLabel === 'string' && home.impactStoriesCtaLabel.trim()
          ? home.impactStoriesCtaLabel.trim()
          : defaultImpactStories.ctaLabel,
      ctaUrl:
        typeof home.impactStoriesCtaUrl === 'string' && home.impactStoriesCtaUrl.trim()
          ? home.impactStoriesCtaUrl.trim()
          : defaultImpactStories.ctaUrl,
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
      eyebrow:
        typeof home.impactStoriesEyebrow === 'string' && home.impactStoriesEyebrow.trim()
          ? home.impactStoriesEyebrow.trim()
          : defaultImpactStories.eyebrow,
      title:
        typeof home.impactStoriesTitle === 'string' && home.impactStoriesTitle.trim()
          ? home.impactStoriesTitle.trim()
          : defaultImpactStories.title,
      ctaLabel:
        typeof home.impactStoriesCtaLabel === 'string' && home.impactStoriesCtaLabel.trim()
          ? home.impactStoriesCtaLabel.trim()
          : defaultImpactStories.ctaLabel,
      ctaUrl:
        typeof home.impactStoriesCtaUrl === 'string' && home.impactStoriesCtaUrl.trim()
          ? home.impactStoriesCtaUrl.trim()
          : defaultImpactStories.ctaUrl,
      featured: defaultImpactStories.featured
        ? {
            ...defaultImpactStories.featured,
            image: heroAvatars[0] || defaultImpactStories.featured.image,
          }
        : undefined,
      secondary: defaultImpactStories.secondary.map((story, i) => ({
        ...story,
        image: heroAvatars[i + 1] || story.image,
      })),
    }
  }

  return {
    settings: merged,
    sections,
    heroSlides,
    heroAvatars,
    gallery,
    aboutMission,
    stats: stats.length ? stats : defaultStats,
    heroCurve,
    eplWay,
    impactStories,
  }
}
