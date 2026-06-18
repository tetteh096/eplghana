import Image from 'next/image'
import Link from 'next/link'

import type { SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type HeroSectionProps = {
  settings: SiteSetting
}

export function HeroSection({ settings }: HeroSectionProps) {
  const heroImage = getMediaUrl(settings.heroImage) ?? '/images/banner-img.png'

  return (
    <section className="epl-gradient-hero relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-epl-soft/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-64 w-64 rounded-full bg-epl-secondary/10 blur-3xl" />

      <div className="epl-container grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="epl-section-subtitle">
            {settings.heroSubtitle ?? 'Emerging Public Leaders of Ghana'}
          </span>

          <h1 className="mt-4 text-4xl font-bold leading-[1.1] text-epl-dark md:text-5xl lg:text-6xl">
            {settings.heroTitle ? (
              settings.heroTitle
            ) : (
              <>
                Nurturing a new generation of{' '}
                <span className="text-epl-secondary">public service</span> professionals
              </>
            )}
          </h1>

          <p className="epl-lead mt-6 max-w-xl">
            {settings.heroDescription ??
              'We empower Ghanaian youth with the knowledge, skills, and network to become effective agents of change within Ghana’s Public Service.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="epl-btn" href={settings.heroCtaUrl ?? '/about'}>
              {settings.heroCtaLabel ?? 'Learn More'}
            </Link>
            <Link className="epl-btn-outline" href="/contact">
              Get Involved
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-epl-border bg-white p-3 shadow-xl shadow-epl-primary/10">
            <Image
              alt="EPL Ghana fellows"
              className="h-auto w-full rounded-2xl object-cover"
              height={560}
              priority
              src={heroImage}
              width={640}
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-epl-border bg-white px-5 py-4 shadow-lg md:-left-6">
            <p className="text-2xl font-bold text-epl-primary">
              {settings.heroStatValue ?? '200+'}
            </p>
            <p className="text-sm text-epl-muted">
              {settings.heroStatLabel ?? 'Fellows trained'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
