'use client'

import Link from 'next/link'

import { headerCta, mainNavigation, type NavItem } from '@/config/navigation'
import type { HeaderCta } from '@/utilities/getHeader'

import { useChariticsHeader } from './ChariticsHeaderProvider'
import { ChariticsNavList } from './ChariticsNavList'

type ChariticsNavProps = {
  cta?: HeaderCta
  nav?: NavItem[]
}

export function ChariticsNav({ cta, nav = mainNavigation }: ChariticsNavProps) {
  const { openSidebar, sidebarOpen } = useChariticsHeader()
  const action: HeaderCta = cta ?? { ...headerCta, enabled: true }

  return (
    <>
      <div className="ul-header-nav-wrapper d-none d-lg-block">
        <ChariticsNavList action={action} nav={nav} variant="desktop" />
      </div>

      <div className="ul-header-actions">
        <button className="ul-header-search-opener" type="button">
          <i className="flaticon-search"></i>
        </button>
        {action.enabled && (
          <Link className="ul-btn d-sm-inline-flex d-none" href={action.href}>
            <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> {action.label}
          </Link>
        )}
        <button
          aria-expanded={sidebarOpen}
          aria-label="Open menu"
          className="ul-header-sidebar-opener d-lg-none d-inline-flex"
          onClick={openSidebar}
          type="button"
        >
          <i className="flaticon-menu"></i>
        </button>
      </div>
    </>
  )
}
