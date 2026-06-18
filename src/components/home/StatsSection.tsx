import { eplImpactStats } from '@/config/epl-defaults'
import type { SiteSetting } from '@/payload-types'

type StatsSectionProps = {
  settings: SiteSetting
}

export function StatsSection({ settings }: StatsSectionProps) {
  const stats = settings.stats?.length ? settings.stats : eplImpactStats

  return (
    <section className="epl-gradient-cta py-16 md:py-20">
      <div className="epl-container">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            Our Impact
          </span>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Impact in Numbers</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-8 text-center backdrop-blur-sm"
            >
              <div className="text-4xl font-bold text-white md:text-5xl">{stat.value}</div>
              <div className="mt-2 text-sm font-medium text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
