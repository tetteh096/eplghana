import type { Payload } from 'payload'

import { defaultSiteSettings } from '@/config/defaultSiteSettings'

export async function seedSiteSettings(payload: Payload): Promise<void> {
  const { id: _id, ...settings } = defaultSiteSettings

  await payload.updateGlobal({
    slug: 'site-settings',
    data: settings,
  })
}
