import { DEFAULT_MEDIA_FOLDER } from '@/config/mediaFolders'

import type { Payload } from 'payload'

export type SeedImageImporter = (url: string | undefined, alt: string) => Promise<string | null>

export function createImageImporter(payload: Payload, tag = 'seed'): SeedImageImporter {
  const cache = new Map<string, string | null>()

  return async (url: string | undefined, alt: string): Promise<string | null> => {
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
        payload.logger.warn(`[${tag}] skip ${name} (${res.status})`)
        cache.set(url, null)
        return null
      }

      const buffer = Buffer.from(await res.arrayBuffer())
      const mimetype = res.headers.get('content-type') || 'image/jpeg'
      const doc = await payload.create({
        collection: 'media',
        data: { alt, folder: DEFAULT_MEDIA_FOLDER },
        file: { data: buffer, mimetype, name, size: buffer.length },
      })

      payload.logger.info(`[${tag}] imported ${name}`)
      const id = String(doc.id)
      cache.set(url, id)
      return id
    } catch (error) {
      payload.logger.warn(`[${tag}] failed ${name}: ${error}`)
      cache.set(url, null)
      return null
    }
  }
}

export async function updatePageBySlug(
  payload: Payload,
  slug: string,
  data: Record<string, unknown>,
  tag: string,
): Promise<boolean> {
  const found = await payload.find({
    collection: 'pages',
    depth: 0,
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (!found.docs.length) {
    payload.logger.warn(`[${tag}] no page at ${slug}, run seedPages first`)
    return false
  }

  await payload.update({ collection: 'pages', id: found.docs[0].id, data })
  return true
}
