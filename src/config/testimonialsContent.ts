import { aboutPageTestimonials } from '@/config/aboutPageContent'
import { eplFellowTestimonialsMock } from '@/config/fellowTestimonials'

export type TestimonialSeed = {
  name: string
  role: string
  quote: string
  photo: string
  featured: boolean
  order: number
}

/** Fellow quotes for the Home and About pages, seeded into the Testimonials collection. */
export const testimonialsSeed: TestimonialSeed[] = [
  ...eplFellowTestimonialsMock.map((item, index) => ({
    name: item.name,
    role: item.role,
    quote: item.quote,
    photo: item.photo,
    featured: true,
    order: index,
  })),
  ...aboutPageTestimonials.map((item, index) => ({
    name: item.name,
    role: item.role,
    quote: item.quote,
    photo: item.photo,
    featured: false,
    order: eplFellowTestimonialsMock.length + index,
  })),
]
