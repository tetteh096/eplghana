'use client'

import Link from 'next/link'

import { headerCta, mainNavigation, type NavItem } from '@/config/navigation'
import type { HeaderCta } from '@/utilities/getHeader'

import { useChariticsHeader } from './ChariticsHeaderProvider'
import { ChariticsNavList } from './ChariticsNavList'

type ChariticsSidebarProps = {
  cta?: HeaderCta
  logo: string
  nav?: NavItem[]
  settings: {
    facebook?: string | null
    instagram?: string | null
    twitter?: string | null
    youtube?: string | null
  }
}

export function ChariticsSidebar({
  cta,
  logo,
  nav = mainNavigation,
  settings,
}: ChariticsSidebarProps) {
  const { closeSidebar, sidebarOpen } = useChariticsHeader()
  const action: HeaderCta = cta ?? { ...headerCta, enabled: true }

  return (
    <>
      <button
        aria-hidden={!sidebarOpen}
        className={`epl-sidebar-backdrop${sidebarOpen ? ' is-visible' : ''}`}
        onClick={closeSidebar}
        tabIndex={sidebarOpen ? 0 : -1}
        type="button"
      />
      <div className={`ul-sidebar${sidebarOpen ? ' active' : ''}`}>
        <div className="ul-sidebar-header">
          <div className="ul-sidebar-header-logo">
            <Link href="/" onClick={closeSidebar}>
              <img alt="EPL Ghana" className="logo epl-brand-logo" src={logo} />
            </Link>
          </div>
          <button className="ul-sidebar-closer" onClick={closeSidebar} type="button">
            <i className="flaticon-close"></i>
          </button>
        </div>
        <div className="ul-sidebar-header-nav-wrapper d-block d-lg-none">
          <ChariticsNavList action={action} nav={nav} variant="mobile" />
        </div>
        <div className="ul-sidebar-footer">
          <span className="ul-sidebar-footer-title">Follow us</span>
          <div className="ul-sidebar-footer-social">
            {settings.facebook && (
              <a href={settings.facebook} rel="noreferrer" target="_blank">
                <i className="flaticon-facebook"></i>
              </a>
            )}
            {settings.twitter && (
              <a href={settings.twitter} rel="noreferrer" target="_blank">
                <i className="flaticon-twitter"></i>
              </a>
            )}
            {settings.instagram && (
              <a href={settings.instagram} rel="noreferrer" target="_blank">
                <i className="flaticon-instagram"></i>
              </a>
            )}
            {settings.youtube && (
              <a href={settings.youtube} rel="noreferrer" target="_blank">
                <i className="flaticon-youtube"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
