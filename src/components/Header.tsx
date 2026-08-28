import Link from 'next/link'

import { Logo } from '@/components/Logo'
import { MobileNav } from '@/components/MobileNav'
import { mainNav } from '@/config/navigation'
import type { SiteSetting } from '@/payload-types'
import { getSiteLogo } from '@/utilities/getSiteLogo'

type HeaderProps = {
  settings: SiteSetting
}

export function Header({ settings }: HeaderProps) {
  const logoUrl = getSiteLogo(settings)

  return (
    <header className="sticky top-0 z-50 border-b border-epl-border bg-white/95 backdrop-blur-md">
      <div className="epl-container relative flex items-center justify-between py-4">
        <Logo logoUrl={logoUrl} siteName={settings.siteName ?? 'EPL Ghana'} />

        <nav className="hidden items-center gap-7 lg:flex">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              className="text-sm font-medium text-epl-muted hover:text-epl-primary"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link className="epl-btn hidden sm:inline-flex" href="/contact">
            Get Involved
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
