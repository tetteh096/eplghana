import Image from 'next/image'
import Link from 'next/link'

import type { SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type MissionSectionProps = {
  settings: SiteSetting
}

export function MissionSection({ settings }: MissionSectionProps) {
  const aboutImage = getMediaUrl(settings.aboutImage) ?? '/images/about-img.png'

  return (
    <section className="epl-section bg-white">
      <div className="epl-container grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-epl-border">
            <Image
              alt="EPL Ghana mission"
              className="h-auto w-full object-cover"
              height={500}
              src={aboutImage}
              width={600}
            />
          </div>
          <div className="absolute -bottom-5 -right-5 hidden rounded-2xl bg-epl-primary px-6 py-4 text-white shadow-lg md:block">
            <p className="text-sm font-medium opacity-90">Our mission</p>
            <p className="text-lg font-bold">Transform from within</p>
          </div>
        </div>

        <div>
          <span className="epl-section-subtitle">
            {settings.aboutSubtitle ?? 'Who We Are'}
          </span>
          <h2 className="epl-section-title mt-2">
            {settings.aboutTitle ?? 'Developing the next generation of public service professionals'}
          </h2>
          <p className="epl-lead mt-6">
            {settings.aboutDescription ??
              'At Emerging Public Leaders of Ghana, we believe Ghana’s development rests on strong Public Service institutions. We rigorously select and embed Africa’s brightest young professionals within government, championing leadership and innovation from inside the civil service.'}
          </p>
          <Link className="epl-btn mt-8" href={settings.aboutCtaUrl ?? '/about'}>
            {settings.aboutCtaLabel ?? 'About EPL Ghana'}
          </Link>
        </div>
      </div>
    </section>
  )
}
