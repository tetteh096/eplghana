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
      key === 'aboutMissionImage'
    )
      continue
    if (isMeaningful(value)) overrides[key] = value
  }

  const merged = { ...settings, ...overrides } as SiteSetting

  const heroImageUrl =
    (await resolveMediaUrl(home.heroImage ?? merged.heroImage, payload)) ||
    eplHomeImages.heroDefault

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

  return { settings: merged, sections, heroSlides, heroAvatars, gallery, aboutMission }
}
