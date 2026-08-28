'use client'

import { RefreshRouteOnSave as PayloadRefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Refreshes the current route when content is saved in the Payload admin
 * Live Preview iframe, so the side-by-side preview updates without a manual
 * reload. Only mounts inside the admin preview iframe — avoids background
 * network connections (and "network error" console noise) during normal browsing.
 */
export function RefreshRouteOnSave() {
  const router = useRouter()
  const [inPreview, setInPreview] = useState(false)

  useEffect(() => {
    setInPreview(window.self !== window.top)
  }, [])

  if (!inPreview) return null

  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  return (
    <PayloadRefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />
  )
}
