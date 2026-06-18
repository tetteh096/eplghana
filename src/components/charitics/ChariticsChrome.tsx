import Link from 'next/link'
import type { ReactNode } from 'react'

import { ChariticsHomeHeaderSync } from '@/components/charitics/ChariticsHomeHeaderSync'
import { ChariticsNav } from '@/components/charitics/ChariticsNav'
import { ChariticsScripts } from '@/components/charitics/ChariticsScripts'
import { headerCta, mainNavigation, type NavItem } from '@/config/navigation'
import type { SiteSetting } from '@/payload-types'
import { type FooterData, renderCopyright } from '@/utilities/getFooter'
import type { HeaderCta } from '@/utilities/getHeader'
import { getSiteLogo } from '@/utilities/getSiteLogo'

type ChariticsChromeProps = {
  children: ReactNode
  cta?: HeaderCta
  footer?: FooterData
  nav?: NavItem[]
  settings: SiteSetting
}

export function ChariticsChrome({
  children,
  cta = { ...headerCta, enabled: true },
  footer,
  nav = mainNavigation,
  settings,
}: ChariticsChromeProps) {
  const logo = getSiteLogo(settings)
  const email = settings.email ?? 'info@eplghana.org'
  const phone = settings.phone ?? '+233246064766'
  const address =
    settings.address ?? 'No.1 Justice Sarkodee Addo Avenue, East Legon, Accra'

  const aboutText =
    footer?.aboutText ||
    settings.tagline ||
    'Empowering the next generation of public sector leaders in Ghana.'
  const footerColumns = footer?.columns ?? []
  const copyright = renderCopyright(
    footer?.copyright ?? '© {year} Emerging Public Leaders of Ghana. All rights reserved',
  )

  return (
    <>
      <div aria-hidden className="preloader" data-hidden="true" id="preloader">
        <div className="loader"></div>
      </div>
      <ChariticsHomeHeaderSync />

      <div className="ul-sidebar">
        <div className="ul-sidebar-header">
          <div className="ul-sidebar-header-logo">
            <Link href="/">
              <img alt="EPL Ghana" className="logo epl-brand-logo" src={logo} />
            </Link>
          </div>
          <button className="ul-sidebar-closer" type="button">
            <i className="flaticon-close"></i>
          </button>
        </div>
        <div className="ul-sidebar-header-nav-wrapper d-block d-lg-none"></div>
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

      <div className="ul-search-form-wrapper flex-grow-1 flex-shrink-0">
        <button className="ul-search-closer" type="button">
          <i className="flaticon-close"></i>
        </button>
        <form action="/news" className="ul-search-form">
          <div className="ul-search-form-right">
            <input id="ul-search" name="search" placeholder="Search Here" type="search" />
            <button type="submit">
              <span className="icon">
                <i className="flaticon-search"></i>
              </span>
            </button>
          </div>
        </form>
      </div>

      <header className="ul-header ul-header-2" id="epl-site-header">
        <div className="ul-header-top epl-header-top">
          <div className="ul-header-top-wrapper ul-header-container">
            <div className="ul-header-top-left">
              <span className="address">
                <i className="flaticon-pin"></i> {address}
              </span>
            </div>
            <div className="ul-header-top-right">
              <div className="ul-header-top-social">
                <span className="title">Follow us: </span>
                <div className="links">
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
          </div>
        </div>
        <div className="ul-header-bottom to-be-sticky">
          <div className="ul-header-bottom-wrapper ul-header-container">
            <div className="logo-container">
              <Link className="d-inline-block" href="/">
                <img alt="EPL Ghana" className="logo epl-brand-logo" src={logo} />
              </Link>
            </div>

            <ChariticsNav cta={cta} nav={nav} />
          </div>
        </div>
      </header>

      {children}

      <footer className="ul-footer">
        <div className="ul-footer-top">
          <div className="ul-footer-container">
            <div className="ul-footer-top-contact-infos">
              <div className="ul-footer-top-contact-info">
                <div className="ul-footer-top-contact-info-icon">
                  <div className="ul-footer-top-contact-info-icon-inner">
                    <i className="flaticon-pin"></i>
                  </div>
                </div>
                <div className="ul-footer-top-contact-info-txt">
                  <span className="ul-footer-top-contact-info-label">Address</span>
                  <h5 className="ul-footer-top-contact-info-address">{address}</h5>
                </div>
              </div>
              <div className="ul-footer-top-contact-info">
                <div className="ul-footer-top-contact-info-icon">
                  <div className="ul-footer-top-contact-info-icon-inner">
                    <i className="flaticon-email"></i>
                  </div>
                </div>
                <div className="ul-footer-top-contact-info-txt">
                  <span className="ul-footer-top-contact-info-label">Send Email</span>
                  <h5 className="ul-footer-top-contact-info-address">
                    <a href={`mailto:${email}`}>{email}</a>
                  </h5>
                </div>
              </div>
              <div className="ul-footer-top-contact-info">
                <div className="ul-footer-top-contact-info-icon">
                  <div className="ul-footer-top-contact-info-icon-inner">
                    <i className="flaticon-telephone-call-1"></i>
                  </div>
                </div>
                <div className="ul-footer-top-contact-info-txt">
                  <span className="ul-footer-top-contact-info-label">Call Us</span>
                  <h5 className="ul-footer-top-contact-info-address">
                    <a href={`tel:${phone}`}>{phone}</a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ul-footer-middle">
          <div className="ul-footer-container">
            <div className="ul-footer-middle-wrapper wow animate__fadeInUp">
              <div className="ul-footer-about">
                <Link href="/">
                  <img alt="EPL Ghana" className="logo epl-brand-logo epl-brand-logo--footer" src={logo} />
                </Link>
                <p className="ul-footer-about-txt">{aboutText}</p>
                <div className="ul-footer-socials">
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

              {footerColumns.map((column, index) => (
                <div
                  className={`ul-footer-widget${index === 1 ? ' ul-footer-recent-posts' : ''}`}
                  key={`${column.title}-${index}`}
                >
                  <h3 className="ul-footer-widget-title">{column.title}</h3>
                  <div className="ul-footer-widget-links">
                    {column.links.map((link) => (
                      <Link href={link.href} key={`${link.href}-${link.label}`}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="ul-footer-widget ul-nwsltr-widget">
                <h3 className="ul-footer-widget-title">Contact Us</h3>
                <div className="ul-footer-widget-links ul-footer-contact-links">
                  <a href={`mailto:${email}`}>
                    <i className="flaticon-mail"></i> {email}
                  </a>
                  <a href={`tel:${phone}`}>
                    <i className="flaticon-telephone-call"></i> {phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ul-footer-bottom">
          <div className="ul-footer-container">
            <div className="ul-footer-bottom-wrapper">
              <p className="copyright-txt">{copyright}</p>
            </div>
          </div>
        </div>

        <div className="ul-footer-vectors">
          <img alt="" className="ul-footer-vector-1" src="/assets/img/footer-vector-img.png" />
        </div>
      </footer>

      <ChariticsScripts />
    </>
  )
}
