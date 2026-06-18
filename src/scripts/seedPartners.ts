import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { partnersPageContent } from '../config/partnersPageContent'

/**
 * Seeds partner entries into the Partners collection from config.
 *
 *   pnpm -C site payload run src/scripts/seedPartners.ts
 *   pnpm -C site payload run src/scripts/seedPartners.ts --force
 */
console.log('[partners] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force = process.argv.includes('--force') || process.env.FORCE === '1'
const d = partnersPageContent

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
      console.warn(`[partners] skip ${name} (${res.status})`)
      cache.set(url, null)
      return null
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    const mimetype = res.headers.get('content-type') || 'image/png'
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: { data: buffer, mimetype, name, size: buffer.length },
    })
    console.log(`[partners] imported ${name}`)
    const id = String(doc.id)
    cache.set(url, id)
    return id
  } catch (error) {
    console.warn(`[partners] failed ${name}: ${error}`)
    cache.set(url, null)
    return null
  }
}

const allPartners = [
  ...d.partners.items.map((p, index) => ({ ...p, group: 'strategic' as const, order: index })),
  ...d.partnerOrganizations.items.map((p, index) => ({
    ...p,
    group: 'host' as const,
    order: index,
  })),
]

let created = 0
let updated = 0
let skipped = 0

for (const partner of allPartners) {
  const existing = await payload.find({
    collection: 'partners',
    where: { name: { equals: partner.name } },
    limit: 1,
  })

  const data = {
    name: partner.name,
    group: partner.group,
    description: partner.description ?? null,
    logo: await importImage(partner.logo, partner.name),
    shortName: partner.shortName ?? null,
    websiteUrl: partner.href ?? null,
    programmes: partner.programmes?.map((name) => ({ name })) ?? [],
    order: partner.order,
    status: 'published' as const,
  }

  if (existing.docs[0]) {
    if (!force) {
      skipped++
      continue
    }
    await payload.update({ collection: 'partners', id: existing.docs[0].id, data })
    updated++
  } else {
    await payload.create({ collection: 'partners', data })
    created++
  }
}

console.log(`[partners] created=${created} updated=${updated} skipped=${skipped}`)
console.log('[partners] done')
process.exit(0)
