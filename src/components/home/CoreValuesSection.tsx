import { eplCoreValues } from '@/config/epl-defaults'
import type { SiteSetting } from '@/payload-types'

type CoreValuesSectionProps = {
  settings: SiteSetting
}

export function CoreValuesSection({ settings }: CoreValuesSectionProps) {
  const values =
    settings.coreValues && settings.coreValues.length > 0
      ? settings.coreValues
      : eplCoreValues

  return (
    <section className="epl-section bg-white">
      <div className="epl-container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="epl-section-subtitle">What We Stand For</span>
          <h2 className="epl-section-title mt-2">Our Core Values</h2>
          <p className="epl-lead mt-4">
            The principles that guide how we develop leaders and strengthen Ghana’s public service.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <article
              key={`${value.title}-${index}`}
              className="epl-card p-7"
            >
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-epl-sky text-sm font-bold text-epl-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-lg font-bold text-epl-dark">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-epl-muted">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
