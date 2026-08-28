'use client'

import { useAuth, useConfig } from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

/**
 * Profile dropdown for the admin header (account + log out).
 * Replaces the default avatar-only link via CSS.
 * Wired via admin.components.actions in payload.config.ts.
 */
export function ProfileMenu() {
  const { user } = useAuth()
  const { config } = useConfig()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const adminRoute = config.routes.admin
  const accountHref = formatAdminURL({
    adminRoute,
    path: config.admin.routes.account,
  })
  const logoutHref = formatAdminURL({
    adminRoute,
    path: config.admin.routes.logout,
  })

  const email = user?.email ?? 'Account'
  const initial = email.charAt(0).toUpperCase()

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  return (
    <div className="epl-profile-menu" ref={menuRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className="epl-profile-menu__trigger"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span aria-hidden className="epl-profile-menu__avatar">
          {initial}
        </span>
        <span className="epl-profile-menu__email">{email}</span>
        <svg
          aria-hidden
          className={[
            'epl-profile-menu__chevron',
            open && 'epl-profile-menu__chevron--open',
          ]
            .filter(Boolean)
            .join(' ')}
          fill="none"
          height="14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="14"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="epl-profile-menu__dropdown" role="menu">
          <div className="epl-profile-menu__meta">
            <span className="epl-profile-menu__meta-label">Signed in as</span>
            <span className="epl-profile-menu__meta-email">{email}</span>
          </div>
          <button
            className="epl-profile-menu__item"
            onClick={() => {
              setOpen(false)
              router.push(accountHref)
            }}
            role="menuitem"
            type="button"
          >
            Account settings
          </button>
          <a
            className="epl-profile-menu__item epl-profile-menu__item--danger"
            href={logoutHref}
            role="menuitem"
          >
            Log out
          </a>
        </div>
      )}
    </div>
  )
}
