import 'dotenv/config'

import { HeadBucketCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

import config from '../payload.config'
import { resolveR2Env } from '../storage/resolveS3Env'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const mediaDir = path.resolve(__dirname, '../../media')

function publicUrl(
  base: string,
  filename: string,
  prefix?: string | null,
): string {
  const normalized = base.replace(/\/$/, '')
  const key = prefix ? `${prefix.replace(/\/$/, '')}/${filename}` : filename
  return `${normalized}/${key}`
}

function contentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  const map: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
  }
  return map[ext] ?? 'application/octet-stream'
}

const r2 = resolveR2Env()

console.log('[r2] starting media migration')
console.log('[r2] bucket =', r2.bucket)
console.log('[r2] endpoint =', r2.endpoint)

const client = new S3Client({
  credentials: {
    accessKeyId: r2.accessKeyId,
    secretAccessKey: r2.secretAccessKey,
  },
  endpoint: r2.endpoint,
  forcePathStyle: r2.forcePathStyle,
  region: r2.region,
})

await client.send(new HeadBucketCommand({ Bucket: r2.bucket }))
console.log('[r2] bucket connection OK')

const files = fs.readdirSync(mediaDir).filter((name) => fs.statSync(path.join(mediaDir, name)).isFile())
console.log(`[r2] found ${files.length} local files in ${mediaDir}`)

let uploaded = 0
for (const filename of files) {
  const body = fs.readFileSync(path.join(mediaDir, filename))
  await client.send(
    new PutObjectCommand({
      Body: body,
      Bucket: r2.bucket,
      ContentType: contentType(filename),
      Key: filename,
    }),
  )
  uploaded++
  if (uploaded % 25 === 0) {
    console.log(`[r2] uploaded ${uploaded}/${files.length}`)
  }
}

console.log(`[r2] uploaded ${uploaded} files to bucket "${r2.bucket}"`)

if (!r2.publicUrl) {
  console.log('[r2] R2_PUBLIC_URL not set — skipping MongoDB URL updates (Payload will serve via /api/media/file/)')
  console.log('[r2] done')
  process.exit(0)
}

const payload = await getPayload({ config })
const media = await payload.find({ collection: 'media', depth: 0, limit: 500, pagination: false })

let updated = 0
for (const doc of media.docs) {
  if (!doc.filename) continue

  const nextUrl = publicUrl(r2.publicUrl, doc.filename, doc.prefix)
  const sizes = Array.isArray(doc.sizes)
    ? doc.sizes.map((size) => {
        if (!size?.filename) return size
        return { ...size, url: publicUrl(r2.publicUrl!, size.filename, doc.prefix) }
      })
    : doc.sizes

  const needsUpdate =
    doc.url !== nextUrl ||
    (Array.isArray(sizes) &&
      sizes.some((size, index) => size?.url !== (doc.sizes as typeof sizes)?.[index]?.url))

  if (!needsUpdate) continue

  await payload.update({
    collection: 'media',
    id: doc.id,
    data: { url: nextUrl, sizes },
    overrideAccess: true,
  })
  updated++
}

console.log(`[r2] updated ${updated} media records in MongoDB`)
console.log('[r2] done')

process.exit(0)
