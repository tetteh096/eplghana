import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { alumniPageContent } from '../config/alumniPageContent'

/**
 * Seeds alumni entries into the Alumni collection from config.
 *
 *   pnpm -C site payload run src/scripts/seedAlumni.ts
 *   pnpm -C site payload run src/scripts/seedAlumni.ts --force
 */
console.log('[alumni] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force = process.argv.includes('--force') || process.env.FORCE === '1'
const d = alumniPageContent

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
    console.log(`[alumni] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[alumni] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

const pairs = d.stories.items.map((story, index) => ({
  story,
  featured: d.featured.items[index],
  order: index,
}))

let created = 0
let updated = 0
let skipped = 0

for (const { story, featured, order } of pairs) {
  const name = story.name
  const existing = await payload.find({
    collection: 'alumni',
    where: { name: { equals: name } },
    limit: 1,
  })

  if (existing.docs.length && !force) {
    skipped++
    continue
  }

  const photoUrl = story.photo || featured?.photo
  const data = {
    name,
    cohort: story.cohort,
    institution: story.institution,
    featuredRole: featured?.currentRole ?? story.institution,
    photo: await importImage(photoUrl, name),
    headline: story.headline,
    storyBody: story.body,
    profileBio: featured?.bio ?? story.body,
    quote: story.quote ?? '',
    showInStories: true,
    showInFeatured: Boolean(featured),
    linkedin: featured?.linkedin ?? '',
    order,
    status: 'published' as const,
  }

  if (existing.docs.length) {
    await payload.update({ collection: 'alumni', id: existing.docs[0].id, data })
    updated++
  } else {
    await payload.create({ collection: 'alumni', data })
    created++
  }
}

console.log(`[alumni] done, created ${created}, updated ${updated}, skipped ${skipped}`)
process.exit(0)
