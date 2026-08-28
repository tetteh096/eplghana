import Link from 'next/link'
import type { ReactNode } from 'react'

import { ChariticsScripts } from '@/components/charitics/ChariticsScripts'
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
import {
  type FooterColumn,
  type FooterData,
  renderCopyright,
} from '@/utilities/getFooter'
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

const PROGRAMME_LINKS = [
  { href: '/projects/public-service-fellowship', label: 'Public Service Fellowship' },
  { href: '/projects/women-on-the-rise', label: 'Women On The Rise' },
  { href: '/projects/peace', label: 'P.E.A.C.E' },
  { href: '/projects/epl-in-maritime', label: 'EPL in Maritime' },
]

const QUICK_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/about/team', label: 'Our Team' },
  { href: '/projects', label: 'Projects' },
  { href: '/community', label: 'Community' },
  { href: '/community/eplan', label: 'EPLAN' },
  { href: '/contact', label: 'Contact Us' },
]

function resolveColumns(footer?: FooterData): FooterColumn[] {
  const fromCms = footer?.columns?.length ? footer.columns : []
  const quick = fromCms.find((c) => /quick/i.test(c.title))
  const programs = fromCms.find((c) => /program/i.test(c.title))

  return [
    {
      title: 'Quick Links',
      links: quick?.links?.length ? quick.links : QUICK_LINKS,
    },
    {
      title: 'Our Programs',
      links:
        programs?.links && programs.links.length >= 4 ? programs.links : PROGRAMME_LINKS,
    },
  ]
}

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
  const phone = settings.phone ?? '+233246064766'
  const address = settings.address ?? 'No. 1 Justice Sarkodee Addo Avenue, East Legon, Accra'
  const columns = resolveColumns(footer)
  const copyright = renderCopyright(
    footer?.copyright ?? '© {year} Emerging Public Leaders of Ghana. All rights reserved.',
  )
  const socials = socialLinks(settings)

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
      <footer className="epl-new-footer">
        <div className="epl-new-footer__cta">
          <div>
            <span className="epl-new-kicker epl-new-kicker--light">Build Ghana with us</span>
            <h2>
              Leadership changes institutions.
              <br />
              Let&apos;s grow it together.
            </h2>
          </div>
          <Link className="epl-new-btn epl-new-btn--gold" href="/get-involved">
            Get involved <span>↗</span>
          </Link>
        </div>
        <div className="epl-new-footer__main">
          <div className="epl-new-footer__brand">
            <Link href="/">
              <img alt="EPL Ghana" src={logo} />
            </Link>
            <p>
              {footer?.aboutText ||
                settings.tagline ||
                "Empowering the next generation of public sector leaders in Ghana's Public Service."}
            </p>
            <div className="epl-new-footer__socials" aria-label="Social media">
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
          {columns.map((column, index) => (
            <div className="epl-new-footer__column" key={`${column.title}-${index}`}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <Link href={link.href} key={`${link.href}-${link.label}`}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="epl-new-footer__column epl-new-footer__contact">
            <h3>Say hello</h3>
            <a href={`mailto:${email}`}>{email}</a>
            <a href={`tel:${phone}`}>{phone}</a>
            <p>{address}</p>
          </div>
        </div>
        <div className="epl-new-footer__bottom">
          <p>{copyright}</p>
          <div>
            <Link href="/contact">Privacy</Link>
            <Link href="/contact">Accessibility</Link>
          </div>
        </div>
      </footer>
      <ChariticsScripts />
    </>
  )
}
