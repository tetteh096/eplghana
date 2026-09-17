'use client'

import { useState } from 'react'

type Props = {
  adminRoute: string
  apiRoute: string
  serverURL: string
  userSlug: string
}

/**
 * Lets staff sign out if they are not ready to finish MFA setup or verification.
 *
 * Forced 2FA guards every admin *page* (including /admin/logout), so navigating
 * to the logout page just loops back to setup. Instead we hit the logout *API*
 * (which isn't guarded) to clear the session, then go to the login page.
 */
export function EplTotpExitLink({ adminRoute, apiRoute, serverURL, userSlug }: Props) {
  const [busy, setBusy] = useState(false)
  const loginUrl = `${serverURL}${adminRoute}/login`

  const handleSignOut = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (busy) return
    setBusy(true)

    try {
      await fetch(`${serverURL}${apiRoute}/${userSlug}/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch {
      // Navigate to login regardless — a failed call still drops them out.
    }

    window.location.href = loginUrl
  }

  return (
    <p className="epl-totp__exit">
      <a className="epl-totp__exit-link" href={loginUrl} onClick={handleSignOut}>
        {busy ? 'Signing out…' : 'Not ready? Sign out and return to login'}
      </a>
    </p>
  )
}
