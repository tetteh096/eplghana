'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { isNavDropdown, type NavItem } from '@/config/navigation'
import { DONATE_PATH, resolveDonateHref } from '@/utilities/donateLink'
import type { HeaderCta } from '@/utilities/getHeader'

type EplHeaderProps = {
  logo: string
  nav: NavItem[]
  topLinks?: { label: string; href: string }[]
  donateCta?: HeaderCta
  partnerCta?: HeaderCta
}

const defaultTopLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Community', href: '/community/current-fellows' },
]

const defaultDonateCta: HeaderCta = {
  label: 'Donate',
  href: DONATE_PATH,
  enabled: true,
}

const defaultPartnerCta: HeaderCta = {
  label: 'Partner with us',
  href: '/community/partners',
  enabled: true,
}

export function EplHeader({
  logo,
  nav,
  topLinks = defaultTopLinks,
  donateCta = defaultDonateCta,
  partnerCta = defaultPartnerCta,
}: EplHeaderProps) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const megaSections = useMemo(
    () => nav.filter(isNavDropdown).filter((item) => item.label !== 'Home'),
    [nav],
  )

  useEffect(() => {
    if (!open) return

    const html = document.documentElement
    const body = document.body
    const scrollY = window.scrollY

    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevBodyPosition = body.style.position
    const prevBodyTop = body.style.top
    const prevBodyWidth = body.style.width

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      body.style.position = prevBodyPosition
      body.style.top = prevBodyTop
      body.style.width = prevBodyWidth
      window.scrollTo(0, scrollY)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className={`epl-new-header${open ? ' is-menu-open' : ''}`}>
      <div className="epl-new-header__inner">
        <div className="epl-new-header__brand">
          <button
            aria-controls="epl-mega-menu"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="epl-new-header__menu-toggle"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span aria-hidden className="epl-new-header__menu-icon">
              {open ? (
                <svg fill="none" height="17" viewBox="0 0 17 17" width="17">
                  <path d="M3 3l11 11M14 3L3 14" stroke="currentColor" strokeWidth="2" />
                </svg>
              ) : (
                <svg fill="none" height="17" viewBox="0 0 17 17" width="17">
                  <path d="M2 4.5h13M2 8.5h13M2 12.5h13" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </span>
            <span className="epl-new-header__menu-label">Menu</span>
          </button>

          <Link aria-label="EPL Ghana home" className="epl-new-header__logo" href="/">
            <img alt="Emerging Public Leaders of Ghana" src={logo} />
          </Link>
        </div>

        <nav aria-label="Primary" className="epl-new-header__nav">
          {topLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="epl-new-header__actions">
          {donateCta.enabled ? (
            <Link
              className="epl-new-header__donate"
              href={resolveDonateHref(donateCta.href, donateCta.label)}
            >
              {donateCta.label}
            </Link>
          ) : null}
          {partnerCta.enabled ? (
            <Link className="epl-new-header__partner" href={partnerCta.href}>
              {partnerCta.label}
            </Link>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            aria-hidden={!open}
            className="epl-mega-menu"
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            id="epl-mega-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            key="mega-menu"
            role="dialog"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="epl-mega-menu__inner">
              <div className="epl-mega-menu__grid">
                {megaSections.map((section) => (
                  <div className="epl-mega-menu__col" key={section.label}>
                    <p className="epl-mega-menu__heading">{section.label}</p>
                    <ul className="epl-mega-menu__list">
                      {section.items.map((child) => (
                        <li key={`${section.label}-${child.href}`}>
                          <Link
                            className="epl-mega-menu__link"
                            href={child.href}
                            onClick={() => setOpen(false)}
                          >
                            <span className="epl-mega-menu__title">{child.label}</span>
                            {child.description ? (
                              <span className="epl-mega-menu__desc">{child.description}</span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="epl-mega-menu__foot">
                <span>Emerging Public Leaders of Ghana</span>
                <button
                  className="epl-mega-menu__close"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  <svg fill="none" height="13" viewBox="0 0 13 13" width="13">
                    <path d="M2 2l9 9M11 2L2 11" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  Close Menu
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </header>
      <div aria-hidden className="epl-new-header-spacer" />
    </>
  )
}
