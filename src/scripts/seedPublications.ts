import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { annualReportsPageContent } from '../config/annualReportsContent'

/**
 * Seeds Publications (annual reports + research PDFs).
 *
 *   pnpm -C site payload run src/scripts/seedPublications.ts
 *   pnpm -C site payload run src/scripts/seedPublications.ts --force
 */
console.log('[publications] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force = process.argv.includes('--force') || process.env.FORCE === '1'

const cache = new Map<string, string | null>()

async function importMedia(
  url: string | undefined,
  alt: string,
  mimetype?: string,
): Promise<string | null> {
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
    const type = mimetype || res.headers.get('content-type') || 'application/octet-stream'
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data: buffer, mimetype: type, name, size: buffer.length },
    })
    console.log(`[publications] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[publications] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

let created = 0
let updated = 0
let skipped = 0

const items: {
  title: string
  description: string
  category: 'annual-report' | 'research'
  year?: string
  coverImage?: string
  fileUrl?: string
  status: 'coming-soon' | 'published'
  order: number
}[] = [
  ...annualReportsPageContent.reports.map((report, index) => ({
    title: report.title,
    description: report.description,
    category: 'annual-report' as const,
    year: report.year,
    coverImage: report.coverImage,
    fileUrl: report.downloadUrl,
    status: report.status === 'available' ? ('published' as const) : ('coming-soon' as const),
    order: index,
  })),
  ...annualReportsPageContent.relatedPublications.map((pub, index) => ({
    title: pub.title,
    description: pub.description,
    category: 'research' as const,
    fileUrl: pub.downloadUrl,
    status: 'published' as const,
    order: index,
  })),
]

for (const item of items) {
  const existing = await payload.find({
    collection: 'publications',
    depth: 0,
    where: { title: { equals: item.title } },
    limit: 1,
  })

  if (existing.docs.length && !force) {
    skipped++
    continue
  }

  const coverImage =
    item.category === 'annual-report'
      ? await importMedia(item.coverImage, item.title, 'image/jpeg')
      : undefined
  const file =
    item.fileUrl && item.status === 'published'
      ? await importMedia(item.fileUrl, item.title, 'application/pdf')
      : undefined

  const data = {
    title: item.title,
    description: item.description,
    category: item.category,
    year: item.year,
    coverImage,
    file,
    order: item.order,
    status: item.status,
  }

  if (existing.docs.length) {
    await payload.update({ collection: 'publications', id: existing.docs[0].id, data })
    updated++
  } else {
    await payload.create({ collection: 'publications', data })
    created++
  }
}

console.log(`[publications] done, created ${created}, updated ${updated}, skipped ${skipped}`)
process.exit(0)
