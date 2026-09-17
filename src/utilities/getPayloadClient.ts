import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'

/** One Payload instance per request — layout + page share the same client. */
export const getPayloadClient = cache(async () => {
  const payloadConfig = await config
  return getPayload({ config: payloadConfig })
})
