import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'

const publicBase = (process.env.R2_PUBLIC_URL ?? process.env.S3_PUBLIC_URL)?.replace(/\/$/, '')
const serverBase = (process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
)

function targetUrl(filename: string, prefix?: string | null): string {
  if (publicBase) {
    const key = prefix ? `${prefix.replace(/\/$/, '')}/${filename}` : filename
    return `${publicBase}/${key}`
  }

  const path = prefix ? `${prefix}/${filename}` : filename
  return `${serverBase}/api/media/file/${path}`
}

function isBrokenUrl(url: string | null | undefined): boolean {
  if (!url) return true
  return /r2\.cloudflarestorage\.com/i.test(url)
}

console.log('[fix-media-urls] starting')
console.log('[fix-media-urls] public base =', publicBase ?? '(none — using Payload proxy)')
console.log('[fix-media-urls] server base =', serverBase)

const payload = await getPayload({ config })
const media = await payload.find({ collection: 'media', depth: 0, limit: 500, pagination: false })

let updated = 0
for (const doc of media.docs) {
  if (!doc.filename) continue

  // Migrated files live at bucket root — clear stale folder→prefix mapping.
  const prefix = ''
  const nextUrl = targetUrl(doc.filename, prefix)

  const sizes = Array.isArray(doc.sizes)
    ? doc.sizes.map((size) => {
        if (!size?.filename) return size
        return { ...size, url: targetUrl(size.filename, prefix) }
      })
    : doc.sizes

  const needsUpdate =
    doc.prefix !== prefix ||
    isBrokenUrl(doc.url) ||
    doc.url !== nextUrl ||
    (Array.isArray(sizes) &&
      sizes.some((size, index) => size?.url !== (doc.sizes as typeof sizes)?.[index]?.url))

  if (!needsUpdate) continue

  await payload.update({
    collection: 'media',
    id: doc.id,
    data: { prefix, url: nextUrl, sizes },
    overrideAccess: true,
  })
  updated++
}

console.log(`[fix-media-urls] updated ${updated} of ${media.docs.length} media records`)
console.log('[fix-media-urls] done')

process.exit(0)
