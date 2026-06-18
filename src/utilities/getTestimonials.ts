import type { Payload } from 'payload'

import type { Testimonial } from '@/payload-types'

export async function getFeaturedTestimonials(
  payload: Payload,
  limit = 6,
): Promise<Testimonial[]> {
  const result = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit,
    sort: 'order',
    where: {
      and: [{ status: { equals: 'published' } }, { featured: { equals: true } }],
    },
  })

  return result.docs
}

export async function getPublishedTestimonials(
  payload: Payload,
  limit = 12,
): Promise<Testimonial[]> {
  const result = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit,
    sort: 'order',
    where: { status: { equals: 'published' } },
  })

  return result.docs
}
