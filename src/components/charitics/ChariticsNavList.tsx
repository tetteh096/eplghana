'use client'

import Link from 'next/link'

import { isNavDropdown, type NavItem } from '@/config/navigation'
import type { HeaderCta } from '@/utilities/getHeader'

import { useChariticsHeader } from './ChariticsHeaderProvider'

type ChariticsNavListProps = {
  action: HeaderCta
  nav: NavItem[]
  variant: 'desktop' | 'mobile'
}

export function ChariticsNavList({ action, nav, variant }: ChariticsNavListProps) {
  const { closeSidebar, mobileOpenDropdown, toggleMobileDropdown } = useChariticsHeader()
  const isMobile = variant === 'mobile'

  const items = nav.filter((item) => isNavDropdown(item) || item.href !== action.href)

  return (
    <nav className="ul-header-nav">
      {items.map((item) => {
        if (isNavDropdown(item)) {
          const key = item.label
          const isOpen = isMobile && mobileOpenDropdown === key

          return (
            <div
              className={`has-sub-menu${isOpen ? ' active' : ''}`}
              key={key}
              onClick={
                isMobile
                  ? (event) => {
                      event.preventDefault()
                      toggleMobileDropdown(key)
                    }
                  : undefined
              }
              onKeyDown={
                isMobile
                  ? (event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        toggleMobileDropdown(key)
                      }
                    }
                  : undefined
              }
              role={isMobile ? 'button' : undefined}
              tabIndex={isMobile ? 0 : undefined}
            >
              <a role="button">{item.label}</a>
              <div className="ul-header-submenu">
                <ul>
                  {item.items.map((sub) => (
                    <li key={sub.href}>
                      <Link href={sub.href} onClick={isMobile ? closeSidebar : undefined}>
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }

        return (
          <Link href={item.href} key={item.href} onClick={isMobile ? closeSidebar : undefined}>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
