import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'

import config from '../payload.config'
import { annualReportsPageContent } from '../config/annualReportsContent'

/**
 * Seeds Publications (annual reports + research PDFs).
 * Prefers local files in public/publications and media/, then remote URLs.
 *
 *   pnpm payload run src/scripts/seedPublications.ts
 *   FORCE=1 pnpm payload run src/scripts/seedPublications.ts
 */
console.log('[publications] starting')
const payload = await getPayload({ config })
const force = process.argv.includes('--force') || process.env.FORCE === '1'

const cache = new Map<string, string | null>()
const localDirs = [
  path.join(process.cwd(), 'public', 'publications'),
  path.join(process.cwd(), 'media'),
]

const titleAliases: Record<string, string[]> = {
  'Breaking Barriers — Women Empowerment': ['Breaking Barriers, Women Empowerment'],
}

function resolveLocalFile(fileUrl: string | undefined): { name: string; absolute: string } | null {
  if (!fileUrl) return null
  const name = (fileUrl.split('/').pop() ?? '').split('?')[0]
  if (!name) return null

  for (const dir of localDirs) {
    const absolute = path.join(dir, name)
    if (fs.existsSync(absolute)) return { name, absolute }
  }
  return null
}

async function findMediaByFilename(name: string): Promise<string | null> {
  const existing = await payload.find({
    collection: 'media',
    depth: 0,
    where: { filename: { equals: name } },
    limit: 1,
  })
  return existing.docs.length ? String(existing.docs[0].id) : null
}

async function importMedia(
  url: string | undefined,
  alt: string,
  mimetype?: string,
): Promise<string | null> {
  if (!url) return null
  if (cache.has(url)) return cache.get(url) ?? null

  const local = resolveLocalFile(url)
  const name = local?.name || (url.split('/').pop() ?? '').split('?')[0]
  if (!name) return null

  const existingId = await findMediaByFilename(name)
  if (existingId) {
    cache.set(url, existingId)
    return existingId
  }

  try {
    let buffer: Buffer
    let type = mimetype || 'application/octet-stream'

    if (local) {
      buffer = fs.readFileSync(local.absolute)
      if (!mimetype) {
        type = name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg'
      }
      console.log(`[publications] using local file ${name}`)
    } else if (url.startsWith('http://') || url.startsWith('https://')) {
      const res = await fetch(url)
      if (!res.ok) {
        cache.set(url, null)
        return null
      }
      buffer = Buffer.from(await res.arrayBuffer())
      type = mimetype || res.headers.get('content-type') || type
      console.log(`[publications] imported remote ${name}`)
    } else {
      cache.set(url, null)
      return null
    }

    const doc = await payload.create({
      collection: 'media',
      data: { alt, folder: 'publications' },
      file: { data: buffer, mimetype: type, name, size: buffer.length },
    })
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
    status: report.downloadUrl ? ('published' as const) : ('coming-soon' as const),
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
  const titles = [item.title, ...(titleAliases[item.title] ?? [])]
  const existing = await payload.find({
    collection: 'publications',
    depth: 0,
    where: { title: { in: titles } },
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
  const file = item.fileUrl
    ? await importMedia(item.fileUrl, item.title, 'application/pdf')
    : undefined

  const data = {
    title: item.title,
    description: item.description,
    category: item.category,
    year: item.year,
    coverImage: coverImage || undefined,
    file: file || undefined,
    order: item.order,
    status: file ? ('published' as const) : item.status,
  }

  if (existing.docs.length) {
    await payload.update({ collection: 'publications', id: existing.docs[0].id, data })
    updated++
    console.log(`[publications] updated ${item.title}${file ? ' (+pdf)' : ''}`)
  } else {
    await payload.create({ collection: 'publications', data })
    created++
    console.log(`[publications] created ${item.title}${file ? ' (+pdf)' : ''}`)
  }
}

console.log(`[publications] done, created ${created}, updated ${updated}, skipped ${skipped}`)
process.exit(0)
