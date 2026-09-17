#!/usr/bin/env node
// Copies every collection (documents + indexes) from one MongoDB database to another.
//
// Usage:
//   SOURCE_DATABASE_URL="mongodb+srv://.../old_db" DEST_DATABASE_URL="mongodb+srv://.../new_db" node scripts/migrate-mongo.mjs
//
// Flags:
//   --drop        Drop each destination collection before copying (clean copy). Without it,
//                 documents are inserted and duplicate _ids are skipped.
//   --only=a,b    Only migrate the listed collections (comma-separated).
//   --dry-run     Just print what would happen, don't write anything.
//
// If SOURCE_DATABASE_URL is not set, falls back to DATABASE_URL (your current .env value).

import 'dotenv/config'

import { MongoClient } from 'mongodb'

const args = process.argv.slice(2)
const drop = args.includes('--drop')
const dryRun = args.includes('--dry-run')
const onlyArg = args.find((a) => a.startsWith('--only='))
const only = onlyArg ? onlyArg.slice('--only='.length).split(',').map((s) => s.trim()) : null

const sourceUri = process.env.SOURCE_DATABASE_URL || process.env.DATABASE_URL
const destUri = process.env.DEST_DATABASE_URL

if (!sourceUri || !destUri) {
  console.error(
    '[migrate-mongo] Set SOURCE_DATABASE_URL (or DATABASE_URL) and DEST_DATABASE_URL env vars.',
  )
  process.exit(1)
}

if (sourceUri === destUri) {
  console.error('[migrate-mongo] Source and destination URIs are identical — refusing to run.')
  process.exit(1)
}

const BATCH_SIZE = 500

function dbNameFromUri(uri) {
  try {
    const withoutQuery = uri.split('?')[0]
    const name = withoutQuery.split('/').pop()
    return name || '(default)'
  } catch {
    return '(unknown)'
  }
}

console.log(`[migrate-mongo] source db: ${dbNameFromUri(sourceUri)}`)
console.log(`[migrate-mongo] dest db:   ${dbNameFromUri(destUri)}`)
if (dryRun) console.log('[migrate-mongo] DRY RUN — no writes will be made')
if (drop) console.log('[migrate-mongo] --drop is set — destination collections will be dropped first')

const sourceClient = new MongoClient(sourceUri)
const destClient = new MongoClient(destUri)

await sourceClient.connect()
await destClient.connect()

const sourceDb = sourceClient.db()
const destDb = destClient.db()

try {
  const collections = await sourceDb.listCollections({}, { nameOnly: true }).toArray()
  const names = collections
    .map((c) => c.name)
    .filter((name) => !name.startsWith('system.'))
    .filter((name) => !only || only.includes(name))
    .sort()

  if (names.length === 0) {
    console.log('[migrate-mongo] no matching collections found — nothing to do')
  }

  let grandTotal = 0

  for (const name of names) {
    const sourceCol = sourceDb.collection(name)
    const destCol = destDb.collection(name)

    const sourceCount = await sourceCol.estimatedDocumentCount()
    console.log(`[migrate-mongo] ${name}: ${sourceCount} document(s) in source`)

    if (dryRun) continue

    if (drop) {
      const exists = await destDb.listCollections({ name }).toArray()
      if (exists.length > 0) {
        await destCol.drop()
        console.log(`[migrate-mongo] ${name}: dropped existing destination collection`)
      }
    }

    // Recreate indexes (skip the default _id index, which every collection has).
    const indexes = await sourceCol.indexes()
    for (const index of indexes) {
      if (index.name === '_id_') continue
      const { key, name: indexName, ...options } = index
      try {
        await destCol.createIndex(key, { name: indexName, ...options })
      } catch (err) {
        console.warn(`[migrate-mongo] ${name}: failed to create index ${indexName}: ${err.message}`)
      }
    }

    let copied = 0
    let batch = []
    const cursor = sourceCol.find({})

    const flush = async () => {
      if (batch.length === 0) return
      try {
        const result = await destCol.insertMany(batch, { ordered: false })
        copied += result.insertedCount
      } catch (err) {
        // BulkWriteError still reports how many succeeded before duplicates/errors.
        copied += err.result?.insertedCount ?? 0
        const dupCount = err.writeErrors?.filter((e) => e.code === 11000).length ?? 0
        const otherErrors = (err.writeErrors?.length ?? 0) - dupCount
        if (dupCount) console.log(`[migrate-mongo] ${name}: skipped ${dupCount} duplicate id(s)`)
        if (otherErrors > 0) {
          console.warn(`[migrate-mongo] ${name}: ${otherErrors} document(s) failed to insert`)
        }
      }
      batch = []
    }

    for await (const doc of cursor) {
      batch.push(doc)
      if (batch.length >= BATCH_SIZE) await flush()
    }
    await flush()

    console.log(`[migrate-mongo] ${name}: copied ${copied}/${sourceCount} document(s)`)
    grandTotal += copied
  }

  if (!dryRun) {
    console.log(`[migrate-mongo] done — ${grandTotal} document(s) copied across ${names.length} collection(s)`)
  }
} finally {
  await sourceClient.close()
  await destClient.close()
}
