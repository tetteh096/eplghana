import Link from 'next/link'

import { Logo } from '@/components/Logo'
import { footerLinks } from '@/config/navigation'
import type { SiteSetting } from '@/payload-types'
import { getSiteLogo } from '@/utilities/getSiteLogo'

type FooterProps = {
  settings: SiteSetting
}

const socials = [
  { key: 'facebook', label: 'Facebook' },
  { key: 'twitter', label: 'X' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'youtube', label: 'YouTube' },
] as const

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear()
  const logoUrl = getSiteLogo(settings)

  return (
    <footer className="bg-epl-dark text-white">
      <div className="epl-container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo logoUrl={logoUrl} siteName={settings.siteName ?? 'EPL Ghana'} variant="light" />
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {settings.tagline ??
              'Empowering the next generation of public sector leaders in Ghana.'}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">
            Useful Links
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {footerLinks.useful.map((link) => (
              <li key={link.label}>
                <Link className="hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">
            Resources
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {footerLinks.resources.map((link) => (
              <li key={link.label}>
                <Link className="hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">
            Contact
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>
              {settings.address ??
                'No.1 Justice Sarkodee Addo Avenue, East Legon, Accra'}
            </li>
            <li>
              <a className="hover:text-white" href={`mailto:${settings.email ?? 'info@eplghana.org'}`}>
                {settings.email ?? 'info@eplghana.org'}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`tel:${settings.phone ?? '+233246064766'}`}>
                {settings.phone ?? '+233 24 606 4766'}
              </a>
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            {socials.map(({ key, label }) => {
              const url = settings[key as keyof SiteSetting] as string | undefined
              if (!url) return null
              return (
                <a
                  key={key}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80 hover:border-white hover:text-white"
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {label}
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-white/50">
        © {year} Emerging Public Leaders of Ghana. All rights reserved.
      </div>
    </footer>
  )
}
