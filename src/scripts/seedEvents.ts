import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { fallbackEvents } from '../config/newsEventsContent'
import { paragraphsToLexical } from '../utilities/blogLexical'

/**
 * Seeds events into the Events collection from local fallback data.
 *
 *   pnpm -C site payload run src/scripts/seedEvents.ts
 *   pnpm -C site payload run src/scripts/seedEvents.ts --force
 */
console.log('[events] starting; DB =', process.env.DATABASE_URL)
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
    depth: 0,
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
    console.log(`[events] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[events] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

let created = 0
let updated = 0
let skipped = 0

for (const event of fallbackEvents) {
  const existing = await payload.find({
    collection: 'events',
    depth: 0,
    where: { slug: { equals: event.slug } },
    limit: 1,
  })

  if (existing.docs.length && !force) {
    skipped++
    continue
  }

  const data = {
    title: event.title,
    slug: event.slug,
    excerpt: event.excerpt,
    featuredImage: await importImage(event.image, event.title),
    eventDate: event.eventDate,
    venue: event.venue,
    content: paragraphsToLexical(event.paragraphs),
    status: 'published' as const,
  }

  if (existing.docs.length) {
    await payload.update({ collection: 'events', id: existing.docs[0].id, data })
    updated++
  } else {
    await payload.create({ collection: 'events', data })
    created++
  }
}

console.log(`[events] done, created ${created}, updated ${updated}, skipped ${skipped}`)
process.exit(0)
