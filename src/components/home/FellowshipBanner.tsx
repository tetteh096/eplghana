import Link from 'next/link'

import type { SiteSetting } from '@/payload-types'

type FellowshipBannerProps = {
  settings: SiteSetting
}

export function FellowshipBanner({ settings }: FellowshipBannerProps) {
  const title =
    settings.fellowshipTitle ?? 'Your chapter in public service starts here'
  const description =
    settings.fellowshipDescription ??
    'Join the 2026 Public Service Fellowship, a transformative year inside Ghana’s ministries, agencies, and commissions, with the training, mentorship, and network to lead with integrity.'
  const ctaLabel = settings.fellowshipCtaLabel ?? 'Register Interest'
  const ctaUrl = settings.fellowshipCtaUrl ?? '/contact'

  return (
    <section className="epl-section bg-epl-mist">
      <div className="epl-container">
        <div className="epl-gradient-cta relative overflow-hidden rounded-3xl px-8 py-12 md:px-14 md:py-16">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white/90">
              Public Service Fellowship
            </span>
            <h2 className="text-2xl font-bold leading-tight text-white md:text-4xl">{title}</h2>
            <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">{description}</p>
            <Link className="epl-btn-white mt-8" href={ctaUrl}>
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
