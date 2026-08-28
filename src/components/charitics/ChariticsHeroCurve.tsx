import Link from 'next/link'

type ChariticsHeroCurveProps = {
  eyebrow?: string
  title?: string
  description?: string
  ctaLabel?: string
  ctaUrl?: string
}

export function ChariticsHeroCurve({
  eyebrow = 'What we do',
  title = 'Growing ethical public leaders who strengthen Ghana from within.',
  description = 'Emerging Public Leaders of Ghana develops critical-thinking, values-driven professionals and places them where institutions need them most.',
  ctaLabel = 'Find out more',
  ctaUrl = '/about/what-we-do',
}: ChariticsHeroCurveProps) {
  return (
    <section aria-label="What we do" className="epl-hero-curve">
      <div className="epl-new-shell epl-hero-curve__inner">
        <span className="epl-hero-curve__eyebrow">{eyebrow}</span>
        <div className="epl-hero-curve__row">
          <div className="epl-hero-curve__copy">
            <h2>{title}</h2>
            <p>{description}</p>
            <Link className="epl-hero-curve__link" href={ctaUrl}>
              {ctaLabel} <span>→</span>
            </Link>
          </div>
          <div aria-hidden className="epl-hero-curve__mark">
            <svg fill="none" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" />
              <path
                d="M48 96 L80 42 L112 96 Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="10"
              />
              <circle cx="80" cy="104" r="10" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
