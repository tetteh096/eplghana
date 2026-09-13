import { eplHomeImages, EPL_MEDIA } from '@/config/eplMedia'

export type HeroImageSlide = {
  ctaHref: string
  ctaLabel: string
  description: string
  image: string
  subtitle: string
  thumb: string
  title: string
  /** Three-line homepage hero treatment; middle line is accented. */
  titleLines?: [string, string, string]
}

/** Homepage hero: each option is a rotating slide (copy + image). */
export const heroImageSlides: HeroImageSlide[] = [
  {
    subtitle: 'Emerging Public Leaders of Ghana',
    title: 'Public service is strengthened by people.',
    titleLines: ['Public service is', 'strengthened', 'by people.'],
    description:
      'We train ethical, smart, and action-driven young leaders to improve government institutions and serve Ghana.',
    ctaLabel: 'Get Involved',
    ctaHref: '/get-involved',
    image: eplHomeImages.heroHome,
    thumb: `${EPL_MEDIA}/2025/07/CSG-1024x683.jpg`,
  },
  {
    subtitle: "Developing Ghana's Future Leaders",
    title: 'Building ethical leaders for a better Ghana.',
    titleLines: ['Building ethical leaders', 'for a better', 'Ghana.'],
    description:
      'We prepare talented youth to enter the civil service, solve real problems, and make public institutions work for everyone.',
    ctaLabel: 'Get Involved',
    ctaHref: '/get-involved',
    image: eplHomeImages.projects['women-on-the-rise'],
    thumb: `${EPL_MEDIA}/2025/11/LEMA25-0447-1024x628.jpg`,
  },
  {
    subtitle: 'Strengthening Public Service',
    title: 'Good governance starts with great people.',
    titleLines: ['Good governance starts', 'with great', 'people.'],
    description:
      'We place skilled, principled young professionals inside government to make public services faster, fairer, and more reliable.',
    ctaLabel: 'Get Involved',
    ctaHref: '/get-involved',
    image: `${EPL_MEDIA}/2023/12/MG_0422-scaled.jpg`,
    thumb: `${EPL_MEDIA}/2023/12/MG_0422-768x512.jpg`,
  },
]
