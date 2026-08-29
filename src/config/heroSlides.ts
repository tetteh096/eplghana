import { eplHomeImages, EPL_MEDIA } from '@/config/eplMedia'

export type HeroImageSlide = {
  ctaHref: string
  ctaLabel: string
  description: string
  image: string
  subtitle: string
  thumb: string
  title: string
}

export const heroImageSlides: HeroImageSlide[] = [
  {
    subtitle: 'Public Service Fellowship',
    title: "Transform Ghana's Public Sector From Within",
    description:
      'A one-year fellowship embedding talented graduates in government institutions to drive innovation, integrity, and lasting impact.',
    ctaLabel: 'Apply Now',
    ctaHref: '/get-involved',
    image: eplHomeImages.heroHome,
    thumb: `${EPL_MEDIA}/2025/07/CSG-1024x683.jpg`,
  },
  {
    subtitle: 'Women On The Rise',
    title: 'Breaking Barriers to Leadership in Public Service',
    description:
      'A transformative initiative helping women overcome systemic barriers and rise to higher leadership across Ghana’s public institutions.',
    ctaLabel: 'Learn More',
    ctaHref: '/projects/women-on-the-rise',
    image: eplHomeImages.projects['women-on-the-rise'],
    thumb: `${EPL_MEDIA}/2025/11/LEMA25-0447-1024x628.jpg`,
  },
  {
    subtitle: 'Value-Based Leadership',
    title: 'Strengthening Institutions for National Development',
    description:
      'We develop ethical, skilled leaders who champion transparency, excellence, and sustainable change from within the civil service.',
    ctaLabel: 'About EPL Ghana',
    ctaHref: '/about',
    image: `${EPL_MEDIA}/2023/12/MG_0422-scaled.jpg`,
    thumb: `${EPL_MEDIA}/2023/12/MG_0422-768x512.jpg`,
  },
]
