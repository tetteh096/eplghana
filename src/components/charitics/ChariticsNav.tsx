import Link from 'next/link'

import { headerCta, isNavDropdown, mainNavigation, type NavItem } from '@/config/navigation'
import type { HeaderCta } from '@/utilities/getHeader'

type ChariticsNavProps = {
  cta?: HeaderCta
  nav?: NavItem[]
}

export function ChariticsNav({ cta, nav = mainNavigation }: ChariticsNavProps) {
  const action: HeaderCta = cta ?? { ...headerCta, enabled: true }

  return (
    <>
      <div className="ul-header-nav-wrapper">
        <div className="to-go-to-sidebar-in-mobile">
          <nav className="ul-header-nav">
            {nav
              .filter((item) => isNavDropdown(item) || item.href !== action.href)
              .map((item) => {
              if (isNavDropdown(item)) {
                return (
                  <div className="has-sub-menu" key={item.label}>
                    <a role="button">{item.label}</a>
                    <div className="ul-header-submenu">
                      <ul>
                        {item.items.map((sub) => (
                          <li key={sub.href}>
                            <Link href={sub.href}>{sub.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              }

              return (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
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
        <button className="ul-header-sidebar-opener d-lg-none d-inline-flex" type="button">
          <i className="flaticon-menu"></i>
        </button>
      </div>
    </>
  )
}
