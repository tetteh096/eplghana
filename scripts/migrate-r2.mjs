#!/usr/bin/env node
// Copies every object from one Cloudflare R2 (S3-compatible) bucket to another,
// including across different Cloudflare accounts.
//
// Usage (all required, no fallback to the app's own R2_* vars for the destination):
//   SOURCE_R2_ENDPOINT=... SOURCE_R2_BUCKET=... SOURCE_R2_ACCESS_KEY_ID=... SOURCE_R2_SECRET_ACCESS_KEY=... \
//   DEST_R2_ENDPOINT=...   DEST_R2_BUCKET=...   DEST_R2_ACCESS_KEY_ID=...   DEST_R2_SECRET_ACCESS_KEY=... \
//   node scripts/migrate-r2.mjs
//
// SOURCE_R2_* falls back to the app's current R2_* / S3_* env vars if unset.
//
// Flags:
//   --dry-run          List what would be copied, don't write anything.
//   --overwrite        Re-copy objects even if they already exist at the destination with the same size.
//   --prefix=foo/      Only migrate keys starting with this prefix.
//   --concurrency=N    How many objects to copy in parallel (default 6).

import 'dotenv/config'

import {
  HeadObjectCommand,
  ListObjectsV2Command,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const overwrite = args.includes('--overwrite')
const prefixArg = args.find((a) => a.startsWith('--prefix='))
const prefix = prefixArg ? prefixArg.slice('--prefix='.length) : undefined
const concurrencyArg = args.find((a) => a.startsWith('--concurrency='))
const concurrency = concurrencyArg ? Number(concurrencyArg.slice('--concurrency='.length)) : 6

function requireEnv(name) {
  const value = process.env[name]
  if (!value) {
    console.error(`[migrate-r2] Missing required env var: ${name}`)
    process.exit(1)
  }
  return value
}

const sourceConfig = {
  endpoint: process.env.SOURCE_R2_ENDPOINT || process.env.R2_ENDPOINT || process.env.S3_ENDPOINT,
  region: process.env.SOURCE_R2_REGION || process.env.R2_REGION || process.env.S3_REGION || 'auto',
  bucket: process.env.SOURCE_R2_BUCKET || process.env.R2_BUCKET || process.env.S3_BUCKET,
  accessKeyId:
    process.env.SOURCE_R2_ACCESS_KEY_ID ||
    process.env.R2_ACCESS_KEY_ID ||
    process.env.S3_ACCESS_KEY_ID,
  secretAccessKey:
    process.env.SOURCE_R2_SECRET_ACCESS_KEY ||
    process.env.R2_SECRET_ACCESS_KEY ||
    process.env.S3_SECRET_ACCESS_KEY,
}

if (!sourceConfig.endpoint || !sourceConfig.bucket || !sourceConfig.accessKeyId || !sourceConfig.secretAccessKey) {
  console.error(
    '[migrate-r2] Could not resolve source R2 config. Set SOURCE_R2_ENDPOINT/BUCKET/ACCESS_KEY_ID/SECRET_ACCESS_KEY or ensure R2_* is set in .env.',
  )
  process.exit(1)
}

const destConfig = {
  endpoint: requireEnv('DEST_R2_ENDPOINT'),
  region: process.env.DEST_R2_REGION || 'auto',
  bucket: requireEnv('DEST_R2_BUCKET'),
  accessKeyId: requireEnv('DEST_R2_ACCESS_KEY_ID'),
  secretAccessKey: requireEnv('DEST_R2_SECRET_ACCESS_KEY'),
}

if (sourceConfig.endpoint === destConfig.endpoint && sourceConfig.bucket === destConfig.bucket) {
  console.error('[migrate-r2] Source and destination endpoint+bucket are identical — refusing to run.')
  process.exit(1)
}

console.log(`[migrate-r2] source: ${sourceConfig.bucket} @ ${sourceConfig.endpoint}`)
console.log(`[migrate-r2] dest:   ${destConfig.bucket} @ ${destConfig.endpoint}`)
if (prefix) console.log(`[migrate-r2] prefix filter: ${prefix}`)
if (dryRun) console.log('[migrate-r2] DRY RUN — no writes will be made')

function makeClient(cfg) {
  return new S3Client({
    endpoint: cfg.endpoint,
    region: cfg.region,
    credentials: { accessKeyId: cfg.accessKeyId, secretAccessKey: cfg.secretAccessKey },
  })
}

const sourceClient = makeClient(sourceConfig)
const destClient = makeClient(destConfig)

async function listAllKeys() {
  const keys = []
  let ContinuationToken
  do {
    const page = await sourceClient.send(
      new ListObjectsV2Command({
        Bucket: sourceConfig.bucket,
        Prefix: prefix,
        ContinuationToken,
      }),
    )
    for (const obj of page.Contents ?? []) {
      keys.push({ key: obj.Key, size: obj.Size })
    }
    ContinuationToken = page.IsTruncated ? page.NextContinuationToken : undefined
  } while (ContinuationToken)
  return keys
}

async function destObjectMatches(key, size) {
  try {
    const head = await destClient.send(new HeadObjectCommand({ Bucket: destConfig.bucket, Key: key }))
    return head.ContentLength === size
  } catch {
    return false
  }
}

async function copyOne(key, size) {
  if (!overwrite && (await destObjectMatches(key, size))) {
    return 'skipped'
  }

  const got = await sourceClient.send(new GetObjectCommand({ Bucket: sourceConfig.bucket, Key: key }))

  const upload = new Upload({
    client: destClient,
    params: {
      Bucket: destConfig.bucket,
      Key: key,
      Body: got.Body,
      ContentType: got.ContentType,
      CacheControl: got.CacheControl,
      Metadata: got.Metadata,
    },
  })

  await upload.done()
  return 'copied'
}

async function runPool(items, limit, worker) {
  let index = 0
  let active = 0
  let copied = 0
  let skipped = 0
  let failed = 0

  return new Promise((resolve) => {
    const next = () => {
      if (index >= items.length && active === 0) {
        resolve({ copied, skipped, failed })
        return
      }
      while (active < limit && index < items.length) {
        const item = items[index++]
        active++
        worker(item)
          .then((result) => {
            if (result === 'copied') copied++
            else if (result === 'skipped') skipped++
          })
          .catch((err) => {
            failed++
            console.warn(`[migrate-r2] failed: ${item.key}: ${err.message}`)
          })
          .finally(() => {
            active--
            next()
          })
      }
    }
    next()
  })
}

const objects = await listAllKeys()
const totalBytes = objects.reduce((sum, o) => sum + (o.size ?? 0), 0)
console.log(`[migrate-r2] found ${objects.length} object(s), ${(totalBytes / 1024 / 1024).toFixed(1)} MB total`)

if (dryRun) {
  for (const o of objects.slice(0, 20)) {
    console.log(`[migrate-r2]   ${o.key} (${o.size} bytes)`)
  }
  if (objects.length > 20) console.log(`[migrate-r2]   ...and ${objects.length - 20} more`)
  process.exit(0)
}

let done = 0
const result = await runPool(objects, concurrency, async (o) => {
  const outcome = await copyOne(o.key, o.size)
  done++
  if (done % 25 === 0 || done === objects.length) {
    console.log(`[migrate-r2] progress: ${done}/${objects.length}`)
  }
  return outcome
})

console.log(
  `[migrate-r2] done — copied ${result.copied}, skipped ${result.skipped} (already present), failed ${result.failed}`,
)

if (result.failed > 0) process.exit(1)
