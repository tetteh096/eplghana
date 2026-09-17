import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { impactPageContent } from '../config/impactPageContent'

/**
 * Seeds Impact page Success Stories (Fellows) and Community Interventions collections.
 *
 *   pnpm payload run src/scripts/seedImpactStories.ts
 *   FORCE=1 pnpm payload run src/scripts/seedImpactStories.ts
 */
console.log('[impact-stories] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force = process.argv.includes('--force') || process.env.FORCE === '1'
const d = impactPageContent

async function cohortIdForLabel(label: string): Promise<string> {
  const title = /^cohort\b/i.test(label.trim()) ? label.trim() : `Cohort ${label.trim()}`
  const found = await payload.find({
    collection: 'cohorts',
    where: { title: { equals: title } },
    limit: 1,
  })
  if (found.docs[0]?.id) return String(found.docs[0].id)
  const number = Number.parseInt(title.replace(/\D/g, ''), 10)
  const doc = await payload.create({
    collection: 'cohorts',
    data: {
      title,
      shortLabel: `C${number || title}`,
      number: number || 0,
      isDefault: false,
      showOnWebsite: true,
      order: number || 99,
      status: 'published',
    },
  })
  return String(doc.id)
}

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
      console.warn(`[impact-stories] skip ${name} (${res.status})`)
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
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[impact-stories] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

let fellowsCreated = 0
let fellowsUpdated = 0
let fellowsSkipped = 0

for (const [index, story] of d.successStories.items.entries()) {
  const existing = await payload.find({
    collection: 'fellows',
    where: { name: { equals: story.name } },
    limit: 1,
  })

  if (existing.docs.length && !force) {
    fellowsSkipped++
    continue
  }

  const data = {
    name: story.name,
    institution: story.role,
    cohort: await cohortIdForLabel(story.cohort),
    photo: await importImage(story.image, story.name),
    bio: story.desc,
    impactStory: story.desc,
    featuredOnImpact: true,
    order: index,
    status: 'published' as const,
  }

  if (existing.docs.length) {
    await payload.update({ collection: 'fellows', id: existing.docs[0].id, data })
    fellowsUpdated++
  } else {
    await payload.create({ collection: 'fellows', data })
    fellowsCreated++
  }
}

let interventionsCreated = 0
let interventionsUpdated = 0
let interventionsSkipped = 0

for (const [index, item] of d.communityStories.items.entries()) {
  const existing = await payload.find({
    collection: 'impact-interventions',
    where: {
      and: [{ title: { equals: item.title } }, { assembly: { equals: item.assembly } }],
    },
    limit: 1,
  })

  if (existing.docs.length && !force) {
    interventionsSkipped++
    continue
  }

  const data = {
    title: item.title,
    slug: item.slug,
    region: item.region,
    assembly: item.assembly,
    description: item.desc,
    body: item.body,
    order: index,
    status: 'published' as const,
  }

  if (existing.docs.length) {
    await payload.update({ collection: 'impact-interventions', id: existing.docs[0].id, data })
    interventionsUpdated++
  } else {
    await payload.create({ collection: 'impact-interventions', data })
    interventionsCreated++
  }
}

console.log(
  `[impact-stories] done — fellows: ${fellowsCreated} created, ${fellowsUpdated} updated, ${fellowsSkipped} skipped; interventions: ${interventionsCreated} created, ${interventionsUpdated} updated, ${interventionsSkipped} skipped`,
)
process.exit(0)
