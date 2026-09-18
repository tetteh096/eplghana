import Link from 'next/link'

import type { OurJourneyContent } from '@/utilities/getOurJourneyContent'

type ChariticsOurJourneyPageProps = {
  content: OurJourneyContent
}

export function ChariticsOurJourneyPage({ content }: ChariticsOurJourneyPageProps) {
  const { hero, entries, quote, cta } = content

  return (
    <>
      <section className="epl-journey-hero">
        <div className="ul-container">
          <span className="epl-journey-hero-eyebrow">
            <span /> {hero.eyebrow} <span />
          </span>
          <h1 className="epl-journey-hero-title">{hero.title}</h1>
          <p className="epl-journey-hero-subtitle">{hero.subtitle}</p>
        </div>
      </section>

      <section className="epl-journey-timeline-section ul-section-spacing wow animate__fadeInUp">
        <div className="ul-container">
          <ol className="epl-journey-timeline">
            {entries.map((entry, index) => (
              <li
                className={`epl-journey-item${index % 2 === 1 ? ' epl-journey-item--reverse' : ''}`}
                key={`${entry.year}-${entry.title}`}
              >
                <span aria-hidden="true" className="epl-journey-marker" />
                <div className="epl-journey-card">
                  <p className="epl-journey-year">{entry.year}</p>
                  <h3 className="epl-journey-card-title">{entry.title}</h3>
                  <p className="epl-journey-card-body">{entry.body}</p>
                </div>
                {entry.statLine || entry.asideNote || entry.highlight ? (
                  <div className="epl-journey-aside">
                    {entry.statLine ? (
                      <span className="epl-journey-pill">{entry.statLine}</span>
                    ) : null}
                    {entry.asideNote ? (
                      <p className="epl-journey-aside-note">{entry.asideNote}</p>
                    ) : null}
                    {entry.highlight ? (
                      <p className="epl-journey-highlight">{entry.highlight}</p>
                    ) : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="epl-journey-quote-section ul-section-spacing">
        <div className="ul-container">
          <div className="epl-journey-quote-card">
            <div className="epl-journey-quote-person">
              <div className="epl-journey-quote-photo">
                {quote.photo ? (
                  <img alt={quote.name} src={quote.photo} />
                ) : (
                  <span>{quote.role.split(',')[0]}</span>
                )}
              </div>
              <h3 className="epl-journey-quote-name">{quote.name}</h3>
              <p className="epl-journey-quote-role">{quote.role}</p>
            </div>
            <div className="epl-journey-quote-body">
              <span className="ul-section-sub-title ul-section-sub-title--2">
                {quote.eyebrow}
              </span>
              <h2 className="epl-journey-quote-headline">“{quote.headline}”</h2>
              {quote.paragraphs.map((paragraph) => (
                <p className="epl-journey-quote-paragraph" key={paragraph}>
                  “{paragraph}”
                </p>
              ))}
              <p className="epl-journey-quote-attribution">
                — {quote.name}, {quote.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="epl-journey-cta-section ul-section-spacing">
        <div className="ul-container epl-journey-cta-inner">
          <h2 className="epl-journey-cta-title">{cta.title}</h2>
          <p className="epl-journey-cta-body">{cta.body}</p>
          <div className="epl-journey-cta-actions">
            <Link className="ul-btn" href={cta.primaryUrl}>
              {cta.primaryLabel}
            </Link>
            <Link className="epl-journey-cta-back" href={cta.secondaryUrl}>
              {cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
