import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { testimonialsSeed } from '../config/testimonialsContent'

/**
 * Seeds fellow testimonials into the Testimonials collection.
 *
 *   pnpm -C site payload run src/scripts/seedTestimonials.ts
 *   pnpm -C site payload run src/scripts/seedTestimonials.ts --force
 */
console.log('[testimonials] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force = process.argv.includes('--force') || process.env.FORCE === '1'

const cache = new Map<string, string | null>()

async function importImage(url: string | undefined, alt: string): Promise<string | null> {
  if (!url) return null
  if (cache.has(url)) return cache.get(url) ?? null
  const name = (url.split('/').pop() ?? '').split('?')[0]
  if (!name) return null
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: name } },
    limit: 1,
  })
  if (existing.docs.length) {
    const id = String(existing.docs[0].id)
    cache.set(url, id)
    return id
  }
  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.warn(`[testimonials] skip ${name} (${res.status})`)
      cache.set(url, null)
      return null
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    const mimetype = res.headers.get('content-type') || 'image/jpeg'
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data: buffer, mimetype, name, size: buffer.length },
    })
    console.log(`[testimonials] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[testimonials] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

let created = 0
let updated = 0
let skipped = 0

for (const testimonial of testimonialsSeed) {
  const existing = await payload.find({
    collection: 'testimonials',
    where: { name: { equals: testimonial.name } },
    limit: 1,
  })

  if (existing.docs.length && !force) {
    skipped++
    continue
  }

  const data = {
    name: testimonial.name,
    role: testimonial.role,
    quote: testimonial.quote,
    photo: await importImage(testimonial.photo, testimonial.name),
    featured: testimonial.featured,
    order: testimonial.order,
    status: 'published' as const,
  }

  if (existing.docs.length) {
    await payload.update({ collection: 'testimonials', id: existing.docs[0].id, data })
    updated++
  } else {
    await payload.create({ collection: 'testimonials', data })
    created++
  }
}

console.log(`[testimonials] done, created ${created}, updated ${updated}, skipped ${skipped}`)
process.exit(0)
