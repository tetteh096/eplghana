import Image from 'next/image'

import type { Testimonial } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type TestimonialsSectionProps = {
  testimonials: Testimonial[]
}

const fallbackTestimonials = [
  {
    name: 'Miriam Agumo',
    role: 'Fellow, OHCS',
    quote:
      'EPL Ghana has transformed how I see public service. The mentorship and leadership training helped me grow both professionally and personally.',
  },
  {
    name: 'Priscilla Elorm',
    role: 'Fellow',
    quote:
      'It’s truly inspiring to see how passionate young people are about public service. It’s been an eye-opener and a great platform to network.',
  },
  {
    name: 'Anita Elorm',
    role: 'Fellow, OHCS',
    quote:
      'Being part of EPL Ghana means being part of a community that believes in excellence, transparency, and impact.',
  },
]

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = testimonials.length
    ? testimonials.map((t) => ({
        name: t.name,
        role: t.role,
        quote: t.quote,
        photo: getMediaUrl(t.photo),
      }))
    : fallbackTestimonials.map((t) => ({ ...t, photo: null }))

  return (
    <section className="epl-section bg-epl-sky/40">
      <div className="epl-container">
        <div className="mb-12 text-center">
          <span className="epl-section-subtitle">Testimonials</span>
          <h2 className="epl-section-title mt-2">What Fellows Say</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <blockquote key={item.name} className="epl-card flex flex-col p-8">
              <p className="flex-1 text-base leading-relaxed text-epl-muted">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-4 border-t border-epl-border pt-6">
                <Image
                  alt={item.name}
                  className="h-12 w-12 rounded-full object-cover"
                  height={48}
                  src={item.photo ?? '/images/user-1.png'}
                  width={48}
                />
                <div>
                  <cite className="not-italic font-bold text-epl-dark">{item.name}</cite>
                  <p className="text-sm text-epl-muted">{item.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
