import Link from 'next/link'

import { ChariticsContactForm } from '@/components/charitics/ChariticsContactForm'
import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { GetInvolvedPageContent } from '@/utilities/getGetInvolvedPageContent'

type ChariticsGetInvolvedPageProps = {
  content: GetInvolvedPageContent
}

export function ChariticsGetInvolvedPage({ content }: ChariticsGetInvolvedPageProps) {
  const { hero, pathwaysSection, pathways, registerInterest } = content

  return (
    <>
      <section className="epl-get-involved-hero ul-section-spacing">
        <div className="ul-container">
          <div className="epl-get-involved-hero-inner">
            <div className="epl-get-involved-hero-copy">
              <span className="ul-section-sub-title">{hero.eyebrow}</span>
              {hero.badge ? (
                <div className="epl-get-involved-hero-badge">
                  <span aria-hidden className="epl-get-involved-hero-badge-dot" />
                  {hero.badge}
                </div>
              ) : null}
              <h1 className="ul-section-title epl-get-involved-hero-title">{hero.fellowshipTitle}</h1>
              <p className="epl-get-involved-hero-lead">{hero.fellowshipDescription}</p>

              <ul className="epl-get-involved-hero-highlights">
                {hero.highlights.map((item) => (
                  <li key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>

              <div className="epl-get-involved-hero-actions">
                <Link className="ul-btn epl-get-involved-hero-cta" href="#register-interest">
                  <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                  {hero.fellowshipCtaLabel}
                </Link>
                <Link
                  className="ul-btn epl-get-involved-hero-cta epl-get-involved-hero-cta--secondary"
                  href={hero.secondaryCta.href}
                >
                  {hero.secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className="epl-get-involved-hero-media">
              <ProjectDetailImage
                alt="Public Service Fellowship"
                className="epl-get-involved-hero-img epl-get-involved-hero-img--primary"
                fallbackClass="epl-get-involved-hero-fallback"
                src={hero.image}
              />
              <ProjectDetailImage
                alt="EPL Ghana fellows"
                className="epl-get-involved-hero-img epl-get-involved-hero-img--secondary"
                fallbackClass="epl-get-involved-hero-fallback epl-get-involved-hero-fallback--secondary"
                src={hero.secondaryImage}
              />
              <div aria-hidden className="epl-get-involved-hero-image-badge">
                <strong>{hero.imageBadge.value}</strong>
                <span>{hero.imageBadge.label}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="epl-get-involved-pathways ul-section-spacing pt-0">
        <div className="ul-container">
          <div className="epl-fellows-section-head">
            <span className="ul-section-sub-title">{pathwaysSection.eyebrow}</span>
            <h2 className="ul-section-title">{pathwaysSection.title}</h2>
          </div>
          <div className="row row-cols-lg-3 row-cols-1 ul-bs-row gy-4">
            {pathways.map((pathway) => (
              <article className="epl-get-involved-card" id={pathway.id} key={pathway.id}>
                <h3 className="epl-get-involved-card-title">{pathway.title}</h3>
                <p className="epl-get-involved-card-body">{pathway.body}</p>
                <ul className="epl-get-involved-card-list">
                  {pathway.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Link className="ul-btn" href={pathway.ctaHref}>
                  <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                  {pathway.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-get-involved-register ul-section-spacing" id="register-interest">
        <div className="ul-container">
          <div className="epl-get-involved-register-inner">
            <div className="epl-get-involved-register-copy">
              <span className="ul-section-sub-title">{registerInterest.eyebrow}</span>
              <h2 className="ul-section-title">{registerInterest.title}</h2>
              <p className="ul-section-descr">{registerInterest.description}</p>
              <ul className="epl-get-involved-register-points">
                {registerInterest.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="epl-get-involved-register-form">
              <ChariticsContactForm
                formId="register-interest"
                submitLabel={registerInterest.submitLabel}
                variant="register-interest"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
