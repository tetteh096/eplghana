import { eplFellowTestimonialsMock, type FellowTestimonialSlide } from '@/config/fellowTestimonials'
import { eplHomeImages } from '@/config/eplMedia'
import type { Testimonial } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export function resolveFellowTestimonials(testimonials: Testimonial[]): FellowTestimonialSlide[] {
  if (testimonials.length > 0) {
    return testimonials.map((testimonial, index) => ({
      id: testimonial.id,
      name: testimonial.name,
      role: testimonial.role ?? 'Fellow',
      quote: testimonial.quote,
      photo: getMediaUrl(testimonial.photo) ?? eplHomeImages.fellows.miriam,
    }))
  }

  return eplFellowTestimonialsMock
}

export type { FellowTestimonialSlide }
