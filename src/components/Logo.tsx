import Image from 'next/image'
import Link from 'next/link'

import { EPL_LOGO_SRC } from '@/config/brand'

type LogoProps = {
  href?: string
  logoUrl?: string | null
  siteName?: string
  variant?: 'light' | 'dark'
}

export function Logo({
  href = '/',
  logoUrl,
  siteName = 'EPL Ghana',
  variant = 'dark',
}: LogoProps) {
  const textClass = variant === 'light' ? 'text-white' : 'text-epl-primary'

  return (
    <Link className="flex items-center gap-2.5" href={href}>
      {logoUrl || EPL_LOGO_SRC ? (
        <Image
          alt={siteName}
          className="h-10 w-auto object-contain"
          height={48}
          src={logoUrl ?? EPL_LOGO_SRC}
          width={160}
        />
      ) : (
        <div className="flex items-center gap-2">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-epl-primary text-sm font-bold text-white`}
          >
            EPL
          </span>
          <div className="leading-tight">
            <span className={`block text-sm font-bold ${textClass}`}>Emerging Public</span>
            <span className={`block text-xs font-medium ${variant === 'light' ? 'text-white/80' : 'text-epl-muted'}`}>
              Leaders · Ghana
            </span>
          </div>
        </div>
      )}
    </Link>
  )
}
