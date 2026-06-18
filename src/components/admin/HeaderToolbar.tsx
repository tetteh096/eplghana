'use client'

import { AdminSearch } from './AdminSearch'
import { NavCollapseToggle } from './NavCollapseToggle'
import { ProfileMenu } from './ProfileMenu'
import { ThemeToggle } from './ThemeToggle'

/**
 * Header cluster: collapse (left, via CSS), search, theme, profile.
 * Wired via admin.components.actions in payload.config.ts.
 */
export function HeaderToolbar() {
  return (
    <>
      <NavCollapseToggle />
      <div className="epl-header-toolbar">
        <AdminSearch />
        <ThemeToggle />
        <ProfileMenu />
      </div>
    </>
  )
}
