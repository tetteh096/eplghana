import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { eplFlagshipProjects } from '../config/epl-defaults'
import { eplHomeImages } from '../config/eplMedia'

/**
 * Seeds the three flagship projects into the Projects collection with wide and
 * tall card images imported into Media.
 *
 *   pnpm -C site payload run src/scripts/seedProjects.ts
 *   pnpm -C site payload run src/scripts/seedProjects.ts --force
 */
console.log('[projects] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force = process.argv.includes('--force')

const cache = new Map<string, string | null>()

async function importImage(url: string, alt: string): Promise<string | null> {
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
      console.warn(`[projects] skip ${name} (${res.status})`)
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
    console.log(`[projects] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[projects] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

const visualImages: Record<string, string> = {
  'public-service-fellowship': eplHomeImages.gallery[4].src,
  'women-on-the-rise': eplHomeImages.gallery[2].src,
  peace: eplHomeImages.gallery[1].src,
}

let created = 0
let updated = 0
let skipped = 0

for (let index = 0; index < eplFlagshipProjects.length; index++) {
  const project = eplFlagshipProjects[index]
  const wideUrl = eplHomeImages.projects[project.slug as keyof typeof eplHomeImages.projects]
  const visualUrl = visualImages[project.slug] ?? wideUrl

  const data = {
    title: project.title,
    slug: project.slug,
    category: project.category,
    summary: project.summary,
    detailLayout:
      project.slug === 'public-service-fellowship'
        ? ('fellowship' as const)
        : project.slug === 'women-on-the-rise'
          ? ('wotr' as const)
          : project.slug === 'peace'
            ? ('peace' as const)
            : ('generic' as const),
    featuredImage: await importImage(wideUrl, `${project.title}, wide card`),
    visualImage: await importImage(visualUrl, `${project.title}, tall card`),
    status: 'published' as const,
    projectsPageOrder: index,
    featuredOnHome: true,
    homeOrder: index,
  }

  const existing = await payload.find({
    collection: 'projects',
    where: { slug: { equals: project.slug } },
    limit: 1,
  })

  if (existing.docs[0]) {
    if (!force) {
      skipped++
      continue
    }
    await payload.update({ collection: 'projects', id: existing.docs[0].id, data })
    updated++
  } else {
    await payload.create({ collection: 'projects', data })
    created++
  }
}

console.log(`[projects] created=${created} updated=${updated} skipped=${skipped}`)
console.log('[projects] done')
process.exit(0)
