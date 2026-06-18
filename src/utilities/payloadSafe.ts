import { cache } from 'react'
import type { Payload } from 'payload'

import { defaultSiteSettings } from '@/config/defaultSiteSettings'
import { getPayloadClient } from '@/utilities/getPayloadClient'
import { toPlain } from '@/utilities/toPlain'

export const tryGetPayload = cache(async (): Promise<Payload | null> => {
  try {
    return await getPayloadClient()
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      const message = error instanceof Error ? error.message : String(error)
      console.warn(
        `[EPL] Database unavailable (${message}). Using static fallbacks. Start MongoDB: cd site && docker compose up -d`,
      )
    }
    return null
  }
})

export const getSiteSettings = cache(async (depth = 1) => {
  const payload = await tryGetPayload()
  if (!payload) {
    return defaultSiteSettings
  }

  try {
    const settings = await payload.findGlobal({ slug: 'site-settings', depth })
    return toPlain(settings) ?? defaultSiteSettings
  } catch {
    return defaultSiteSettings
  }
})
