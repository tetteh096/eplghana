import Link from 'next/link'
import type { ReactNode } from 'react'

import { ChariticsScripts } from '@/components/charitics/ChariticsScripts'
import { FooterNewsletterForm } from '@/components/charitics/FooterNewsletterForm'
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconTikTok,
  IconX,
} from '@/components/charitics/SocialIcons'
import { EplHeader } from '@/components/site/EplHeader'
import { mainNavigation, type NavItem } from '@/config/navigation'
import type { SiteSetting } from '@/payload-types'
import { type FooterData, renderCopyright } from '@/utilities/getFooter'
import { TOP_LINKS, type HeaderCta } from '@/utilities/getHeader'
import { getSiteLogo } from '@/utilities/getSiteLogo'

type ChariticsChromeProps = {
  children: ReactNode
  cta?: HeaderCta
  partnerCta?: HeaderCta
  topLinks?: { label: string; href: string }[]
  footer?: FooterData
  nav?: NavItem[]
  settings: SiteSetting
}

const EXPLORE_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/impact', label: 'Impact' },
  { href: '/community', label: 'Community' },
]

const ENGAGE_LINKS = [
  { href: '/news', label: 'News & Insights' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/community/partners', label: 'Partner With Us' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact Us' },
]

function socialLinks(settings: SiteSetting) {
  const s = settings as SiteSetting & { linkedin?: string | null; tiktok?: string | null }
  return [
    { href: s.twitter?.trim() || 'https://x.com/eplghana', label: 'X', Icon: IconX },
    {
      href: s.facebook?.trim() || 'https://www.facebook.com/eplghana',
      label: 'Facebook',
      Icon: IconFacebook,
    },
    {
      href: s.instagram?.trim() || 'https://www.instagram.com/eplghana',
      label: 'Instagram',
      Icon: IconInstagram,
    },
    {
      href: s.linkedin?.trim() || 'https://www.linkedin.com/company/eplghana',
      label: 'LinkedIn',
      Icon: IconLinkedin,
    },
    {
      href: s.tiktok?.trim() || 'https://www.tiktok.com/@eplghana',
      label: 'TikTok',
      Icon: IconTikTok,
    },
  ]
}

export function ChariticsChrome({
  children,
  cta,
  partnerCta,
  topLinks = TOP_LINKS,
  footer,
  nav = mainNavigation,
  settings,
}: ChariticsChromeProps) {
  const logo = getSiteLogo(settings)
  const email = settings.email ?? 'info@eplghana.org'
  const copyright = renderCopyright(
    footer?.copyright ?? '© {year} Emerging Public Leaders of Ghana. All rights reserved.',
  )
  const socials = socialLinks(settings)
  const aboutText =
    footer?.aboutText ||
    'Developing ethical, critical-thinking and change-driven public leaders to strengthen public service institutions across Ghana.'

  return (
    <>
      <EplHeader
        donateCta={cta}
        logo={logo}
        nav={nav}
        partnerCta={partnerCta}
        topLinks={topLinks}
      />
      {children}
      <footer className="epl-figma-footer">
        <div className="epl-new-shell">
          <div className="epl-figma-footer__grid">
            <div className="epl-figma-footer__brand">
              <Link href="/">
                <img alt="Emerging Public Leaders of Ghana" className="epl-figma-footer__logo" src={logo} />
              </Link>
              <p>{aboutText}</p>
              <div aria-label="Social media" className="epl-figma-footer__socials">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    aria-label={label}
                    href={href}
                    key={label}
                    rel="noreferrer"
                    target="_blank"
                    title={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="epl-figma-footer__column">
              <h3>Explore</h3>
              <ul>
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="epl-figma-footer__column">
              <h3>Engage</h3>
              <ul>
                {ENGAGE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="epl-figma-footer__column">
              <h3>Stay Connected</h3>
              <p>Stay connected with EPL Ghana.</p>
              <p>Updates on programmes, Fellows and events.</p>
              <FooterNewsletterForm />
              <a className="epl-figma-footer__email" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          </div>

          <div className="epl-figma-footer__bottom">
            <p>{copyright}</p>
            <p>Accra, Ghana</p>
          </div>
        </div>
      </footer>
      <ChariticsScripts />
    </>
  )
}
