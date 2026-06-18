'use client'

import Link from 'next/link'

import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { PartnersPageContent } from '@/utilities/getPartnersPageContent'
import type { PartnerEntry } from '@/config/partnersPageContent'

function partnerInitials(name: string) {
  const words = name
    .replace(/[()]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 0)
  const significant = words.filter(
    (word) =>
      word.length > 2 &&
      !['the', 'and', 'for', 'in', 'of', 'on'].includes(word.toLowerCase()),
  )
  return (
    significant
      .slice(0, 3)
      .map((word) => word[0]?.toUpperCase())
      .join('') || name.slice(0, 2).toUpperCase()
  )
}

type ChariticsPartnersPageProps = {
  content: PartnersPageContent
}

function PartnerMark({ partner, variant }: { partner: PartnerEntry; variant: 'featured' | 'card' }) {
  if (partner.logo) {
    return (
      <ProjectDetailImage
        alt={partner.name}
        className={
          variant === 'featured'
            ? 'epl-partners-featured-logo-img'
            : 'epl-partners-card-logo-img'
        }
        fallbackClass={
          variant === 'featured'
            ? 'epl-partners-featured-logo-fallback'
            : 'epl-partners-card-logo-fallback'
        }
        src={partner.logo}
      />
    )
  }

  if (variant === 'featured' && partner.shortName) {
    return <span className="epl-partners-featured-monogram">{partner.shortName}</span>
  }

  if (variant === 'card') {
    return (
      <span aria-hidden className="epl-partners-card-logo-initials">
        {partnerInitials(partner.name)}
      </span>
    )
  }

  return (
    <span aria-hidden className="epl-partners-featured-icon">
      <i className="flaticon-relationship"></i>
    </span>
  )
}

function PartnerLogoCard({ partner }: { partner: PartnerEntry }) {
  const content = (
    <>
      <div className="epl-partners-card-logo">
        <PartnerMark partner={partner} variant="card" />
      </div>
      <h3 className="epl-partners-card-name">{partner.name}</h3>
      {partner.description && (
        <p className="epl-partners-card-descr">{partner.description}</p>
      )}
    </>
  )

  if (partner.href) {
    return (
      <a
        className="epl-partners-card"
        href={partner.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {content}
      </a>
    )
  }

  return <article className="epl-partners-card">{content}</article>
}

function FeaturedPartnerCard({ partner }: { partner: PartnerEntry }) {
  const body = (
    <>
      <div className="epl-partners-featured-logo">
        <PartnerMark partner={partner} variant="featured" />
      </div>
      <div className="epl-partners-featured-body">
        <h3 className="epl-partners-featured-name">{partner.name}</h3>
        {partner.programmes && partner.programmes.length > 0 && (
          <ul className="epl-partners-programmes">
            {partner.programmes.map((programme) => (
              <li key={programme}>{programme}</li>
            ))}
          </ul>
        )}
        {partner.description && (
          <p className="epl-partners-featured-descr">{partner.description}</p>
        )}
      </div>
    </>
  )

  if (partner.href) {
    return (
      <a
        className="epl-partners-featured-card"
        href={partner.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {body}
      </a>
    )
  }

  return <article className="epl-partners-featured-card">{body}</article>
}

export function ChariticsPartnersPage({ content }: ChariticsPartnersPageProps) {
  const { hero, partners, partnerOrganizations, cta } = content

  return (
    <>
      <section className="epl-partners-intro ul-section-spacing">
        <div className="ul-container">
          <div className="row ul-bs-row gy-5 align-items-center">
            <div className="col-lg-5">
              <div className="epl-partners-intro-copy">
                <span className="ul-section-sub-title">{hero.eyebrow}</span>
                <p className="epl-partners-intro-lead">{hero.lead}</p>
                <ul className="epl-partners-intro-stats">
                  {hero.stats.map((stat) => (
                    <li key={stat.label}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="epl-partners-intro-media">
                <ProjectDetailImage
                  alt="EPL Ghana partners"
                  className="epl-partners-intro-img epl-partners-intro-img--primary"
                  fallbackClass="epl-partners-intro-fallback"
                  src={hero.image}
                />
                <ProjectDetailImage
                  alt="EPL Ghana collaboration event"
                  className="epl-partners-intro-img epl-partners-intro-img--secondary"
                  fallbackClass="epl-partners-intro-fallback epl-partners-intro-fallback--secondary"
                  src={hero.secondaryImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="epl-partners-section epl-partners-section--featured">
        <div className="ul-container">
          <div className="epl-partners-section-head">
            <span className="ul-section-sub-title">{partners.eyebrow}</span>
            <h2 className="epl-partners-section-title">{partners.title}</h2>
            <p className="epl-partners-section-intro">{partners.intro}</p>
          </div>
          <div className="epl-partners-featured-grid">
            {partners.items.map((partner) => (
              <FeaturedPartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      <section className="epl-partners-section epl-partners-section--orgs">
        <div className="ul-container">
          <div className="epl-partners-section-head">
            <span className="ul-section-sub-title">{partnerOrganizations.eyebrow}</span>
            <h2 className="epl-partners-section-title">{partnerOrganizations.title}</h2>
            <p className="epl-partners-section-intro">{partnerOrganizations.intro}</p>
          </div>
          <div className="epl-partners-grid">
            {partnerOrganizations.items.map((partner) => (
              <PartnerLogoCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      <section className="epl-partners-cta">
        <div className="ul-container">
          <div className="epl-partners-cta-inner">
            <h2 className="epl-partners-cta-title">{cta.title}</h2>
            <p className="epl-partners-cta-descr">{cta.description}</p>
            <Link className="ul-btn epl-partners-cta-btn" href={cta.ctaHref}>
              <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
              {cta.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
