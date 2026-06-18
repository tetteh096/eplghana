'use client'

import { Hamburger, NavToggler, useNav } from '@payloadcms/ui'

/**
 * Sidebar collapse — rendered in the top header bar (via HeaderToolbar),
 * never on the sidebar logo.
 */
export function NavCollapseToggle() {
  const { navOpen } = useNav()

  return (
    <NavToggler className="epl-nav-collapse epl-nav-collapse--header" tabIndex={0}>
      <Hamburger closeIcon="collapse" isActive={navOpen} />
    </NavToggler>
  )
}
