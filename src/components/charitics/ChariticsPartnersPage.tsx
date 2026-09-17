'use client'

import Link from 'next/link'
import { useState } from 'react'

import { ChariticsContactForm } from '@/components/charitics/ChariticsContactForm'
import { PartnerLogoMarquee } from '@/components/charitics/PartnerLogoMarquee'
import type { PartnerCategory } from '@/config/partnersPageContent'
import type { PartnersPageContent } from '@/utilities/getPartnersPageContent'

type ChariticsPartnersPageProps = {
  content: PartnersPageContent
}

/** Force partner card titles onto two lines (e.g. Development / Partners). */
function PartnerCardTitle({ title }: { title: string }) {
  const amp = title.indexOf(' & ')
  if (amp !== -1) {
    return (
      <>
        {title.slice(0, amp + 2)}
        <br />
        {title.slice(amp + 3)}
      </>
    )
  }
  const words = title.trim().split(/\s+/)
  if (words.length < 2) return <>{title}</>
  const mid = Math.ceil(words.length / 2)
  return (
    <>
      {words.slice(0, mid).join(' ')}
      <br />
      {words.slice(mid).join(' ')}
    </>
  )
}

export function ChariticsPartnersPage({ content }: ChariticsPartnersPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | null>(null)
  const { hero, collaboration, ecosystem, network, partners, partnerOrganizations, form } = content
  const networkPartners = [...partners.items, ...partnerOrganizations.items]

  return (
    <div className="figma-partners-page">
      <section className="figma-partners-hero">
        <div className="figma-partners-hero__bg" style={{ backgroundImage: `url(${hero.image})` }} />
        <div className="figma-partners-hero__overlay" />
        <div className="figma-partners-hero__content">
          <div className="figma-partners-hero__copy">
            <div className="figma-impact-kicker">
              <span className="figma-impact-kicker__line" />
              <span>{hero.eyebrow.toUpperCase()}</span>
            </div>
            <h1>{hero.title}</h1>
            <p>{hero.lead}</p>
            <Link className="figma-partners-btn figma-partners-btn--gold" href={hero.ctaHref}>
              {hero.ctaLabel} →
            </Link>
          </div>
        </div>
      </section>

      <section className="figma-partners-collab">
        <div className="epl-new-shell">
          <div className="figma-partners-collab__grid">
            <div className="figma-partners-collab__copy">
              <div className="figma-impact-kicker figma-impact-kicker--blue">
                <span className="figma-impact-kicker__line" />
                <span>{collaboration.eyebrow.toUpperCase()}</span>
              </div>
              <h2>{collaboration.title}</h2>
              <p>{collaboration.lead}</p>
              <div className="figma-partners-collab__benefits">
                {collaboration.benefits.map((benefit) => (
                  <article className="figma-partners-benefit" key={benefit.title}>
                    <span className="figma-partners-benefit__tag">{benefit.eyebrow}</span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="figma-partners-collab__media">
              <div
                className="figma-partners-collab__photo"
                style={{ backgroundImage: `url(${collaboration.image})` }}
              />
              <div className="figma-partners-collab__stat">
                <div className="figma-partners-collab__stat-value">{collaboration.highlightValue}</div>
                <div className="figma-partners-collab__stat-title">{collaboration.highlightTitle}</div>
                <p>{collaboration.highlightText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="figma-partners-ecosystem">
        <div className="epl-new-shell">
          <div className="figma-impact-kicker figma-impact-kicker--blue">
            <span className="figma-impact-kicker__line" />
            <span>{ecosystem.eyebrow.toUpperCase()}</span>
          </div>
          <h2>{ecosystem.title}</h2>
          <p className="figma-partners-ecosystem__intro">{ecosystem.intro}</p>
          <div className="figma-partners-ecosystem__grid">
            {ecosystem.categories.map((cat) => (
              <button
                className="figma-partners-ecosystem-card"
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                type="button"
              >
                <div
                  className="figma-partners-ecosystem-card__bg"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="figma-partners-ecosystem-card__overlay" />
                <div className="figma-partners-ecosystem-card__body">
                  <span className="figma-partners-ecosystem-card__num">{cat.id}</span>
                  <h3>
                    <PartnerCardTitle title={cat.title} />
                  </h3>
                  <p>{cat.description}</p>
                  <span className="figma-partners-ecosystem-card__cta">
                    {ecosystem.learnMoreLabel} →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedCategory ? (
        <div
          className="figma-partners-modal"
          onClick={() => setSelectedCategory(null)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setSelectedCategory(null)
          }}
          role="presentation"
        >
          <div
            className="figma-partners-modal__panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="figma-partners-modal-title"
          >
            <div
              className="figma-partners-modal__hero"
              style={{ backgroundImage: `url(${selectedCategory.image})` }}
            >
              <button
                aria-label="Close"
                className="figma-partners-modal__close"
                onClick={() => setSelectedCategory(null)}
                type="button"
              >
                ×
              </button>
              <div>
                <span className="figma-partners-modal__eyebrow">Partnership Opportunity</span>
                <h3 id="figma-partners-modal-title">{selectedCategory.title}</h3>
              </div>
            </div>
            <div className="figma-partners-modal__content">
              <p>{selectedCategory.description}</p>
              <div className="figma-partners-modal__ways">
                <span>{ecosystem.highlightsLabel}</span>
                <ul>
                  {selectedCategory.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="figma-partners-modal__actions">
                <Link className="figma-partners-btn figma-partners-btn--gold" href="/donate">
                  Donate to EPL Ghana →
                </Link>
                <Link
                  className="figma-partners-btn figma-partners-btn--outline"
                  href="#enquiry"
                  onClick={() => setSelectedCategory(null)}
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <section className="figma-partners-network">
        <div className="epl-new-shell">
          <div className="figma-partners-network__head">
            <h2>{network.title}</h2>
            <p>{network.intro}</p>
          </div>
          <PartnerLogoMarquee items={networkPartners} />
        </div>
      </section>

      <section className="figma-partners-form" id="enquiry">
        <div className="epl-new-shell figma-partners-form__shell">
          <div className="figma-partners-form__head">
            <div className="figma-partners-form__kicker">
              <span className="figma-impact-kicker__line" />
              <span>{form.eyebrow.toUpperCase()}</span>
              <span className="figma-impact-kicker__line" />
            </div>
            <h2>{form.title}</h2>
            <p>{form.description}</p>
          </div>
          <div className="figma-partners-form__card">
            <ChariticsContactForm
              formId="partners-enquiry"
              orgTypeOptions={ecosystem.categories.map((cat) => cat.title)}
              sourcePage="Partners page — Partnership form"
              sourcePath="/partner-with-us"
              submitLabel={form.submitLabel}
              tone="light"
              variant="partnership"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
