import { eplHomeImages } from '@/config/eplMedia'
import { type HeroImageSlide, heroImageSlides } from '@/config/heroSlides'
import type { SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'

export type HomeSections = {
  projects: { eyebrow: string; title: string }
  events: { eyebrow: string; title: string }
  blog: { eyebrow: string; title: string; intro: string }
}

export type GalleryItem = { src: string; alt: string }

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

/**
 * Home page content: the editable static fields from Pages → Home layered over
 * Site Settings (so any field left blank falls back to Site Settings, and if
 * the Home page isn't migrated/DB is down it's just Site Settings). Returns a
 * Site-Settings-shaped object so the existing home sub-components are unchanged,
 * plus the editable section headings.
 */
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
}> {
  const page = await getPage('/')
  const home = (page?.home ?? {}) as Record<string, any>

  const overrides: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(home)) {
    if (key === 'sections' || key === 'heroSlides' || key === 'heroAvatars' || key === 'gallery')
      continue
    if (isMeaningful(value)) overrides[key] = value
  }

  const merged = { ...settings, ...overrides } as SiteSetting

  // Extra hero slides: CMS slides if present, else the config defaults. Each
  // slide's image/thumb falls back to the matching default photo when not set.
  const rawSlides: any[] = Array.isArray(home.heroSlides) ? home.heroSlides : []
  const heroSlides: HeroImageSlide[] = rawSlides.length
    ? rawSlides.map((s, i) => {
        const fallback = heroImageSlides[i]
        return {
          subtitle: s?.subtitle || fallback?.subtitle || '',
          title: s?.title || fallback?.title || '',
          description: s?.description || fallback?.description || '',
          ctaLabel: s?.ctaLabel || fallback?.ctaLabel || 'Learn More',
          ctaHref: s?.ctaHref || fallback?.ctaHref || '/about',
          image: getMediaUrl(s?.image) || fallback?.image || eplHomeImages.heroDefault,
          thumb: getMediaUrl(s?.thumb) || fallback?.thumb || eplHomeImages.heroDefault,
        }
      })
    : heroImageSlides

  // Hero stat avatars: CMS photos if present, else the default fellow photos.
  const rawAvatars: any[] = Array.isArray(home.heroAvatars) ? home.heroAvatars : []
  const resolvedAvatars = rawAvatars
    .map((a) => getMediaUrl(a?.image) || '')
    .filter((src) => src)
  const heroAvatars: string[] = resolvedAvatars.length ? resolvedAvatars : defaultHeroAvatars

  // Gallery: CMS photos if present, else the config defaults.
  const rawGallery: any[] = Array.isArray(home.gallery) ? home.gallery : []
  const gallery: GalleryItem[] = rawGallery.length
    ? rawGallery
        .map((g) => ({ src: getMediaUrl(g?.image) || '', alt: g?.alt || '' }))
        .filter((g) => g.src)
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

  return { settings: merged, sections, heroSlides, heroAvatars, gallery }
}
