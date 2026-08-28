import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { currentFellowsPageContent } from '../config/currentFellowsContent'

/**
 * Seeds fellow entries into the Fellows collection from config.
 *
 *   pnpm -C site payload run src/scripts/seedFellows.ts
 *   pnpm -C site payload run src/scripts/seedFellows.ts --force
 */
console.log('[fellows] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force = process.argv.includes('--force') || process.env.FORCE === '1'
const d = currentFellowsPageContent

const cohort7 = await payload.find({
  collection: 'cohorts',
  where: { title: { equals: 'Cohort 7' } },
  limit: 1,
})
const cohort7Id = cohort7.docs[0]?.id
if (!cohort7Id) {
  console.error('[fellows] Cohort 7 not found — run: pnpm payload run src/scripts/seedCohorts.ts')
  process.exit(1)
}

const highlightByName = new Map(
  d.highlights.map((h) => [h.name, { title: h.title, body: h.body }]),
)

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
      console.warn(`[fellows] skip ${name} (${res.status})`)
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
    console.log(`[fellows] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[fellows] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

let created = 0
let updated = 0
let skipped = 0

for (const [index, fellow] of d.fellows.entries()) {
  const existing = await payload.find({
    collection: 'fellows',
    where: { name: { equals: fellow.name } },
    limit: 1,
  })

  if (existing.docs.length && !force) {
    skipped++
    continue
  }

  const highlight = highlightByName.get(fellow.name)
  const data = {
    name: fellow.name,
    institution: fellow.institution,
    cohort: cohort7Id,
    photo: await importImage(fellow.photo, fellow.name),
    bio: highlight?.body ?? '',
    highlightTitle: highlight?.title ?? '',
    featuredOnPage: Boolean(highlight),
    order: index,
    status: 'published' as const,
  }

  if (existing.docs.length) {
    await payload.update({ collection: 'fellows', id: existing.docs[0].id, data })
    updated++
  } else {
    await payload.create({ collection: 'fellows', data })
    created++
  }
}

console.log(`[fellows] done, created ${created}, updated ${updated}, skipped ${skipped}`)
process.exit(0)
