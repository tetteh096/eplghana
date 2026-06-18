import Link from 'next/link'

import type { WhatWeDoContent } from '@/utilities/getWhatWeDoContent'

type ChariticsWhatWeDoPageProps = {
  content: WhatWeDoContent
}

export function ChariticsWhatWeDoPage({ content }: ChariticsWhatWeDoPageProps) {
  const { intro, programmes, approach, cta } = content

  return (
    <>
      {/* Intro */}
      <section className="ul-about epl-about-section ul-section-spacing wow animate__fadeInUp">
        <div className="ul-container">
          <div className="row row-cols-md-2 row-cols-1 align-items-center gy-4 ul-about-row">
            <div className="col">
              <div className="ul-about-imgs epl-about-page-imgs">
                <div className="img-wrapper epl-about-img-frame">
                  <img alt="EPL Ghana fellowship programme" src={intro.image} />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="ul-about-txt">
                <span className="ul-section-sub-title ul-section-sub-title--2">
                  {intro.eyebrow}
                </span>
                <h2 className="ul-section-title epl-about-page-title">{intro.title}</h2>
                <p className="ul-section-descr epl-about-lead">{intro.lead}</p>
                {intro.paragraphs.map((paragraph) => (
                  <p className="ul-section-descr" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmes, link out to detailed Projects pages */}
      <section className="ul-projects ul-section-spacing pt-0">
        <div className="ul-container">
          <div className="ul-section-heading align-items-center wow animate__fadeInUp">
            <div className="left">
              <span className="ul-section-sub-title">{programmes.eyebrow}</span>
              <h2 className="ul-section-title">{programmes.title}</h2>
            </div>
            <Link className="ul-btn d-none d-md-inline-flex" href={programmes.ctaUrl}>
              <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
              {programmes.ctaLabel}
            </Link>
          </div>

          <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 gy-4">
            {programmes.items.map((programme) => (
              <div className="col" key={programme.slug}>
                <article className="epl-wwd-card">
                  <Link className="epl-wwd-card-media" href={programme.href}>
                    {programme.image ? (
                      <img alt={programme.title} src={programme.image} />
                    ) : (
                      <span aria-hidden className="epl-wwd-card-media-fallback" />
                    )}
                    <span className="epl-wwd-card-tag">{programme.category}</span>
                  </Link>
                  <div className="epl-wwd-card-body">
                    <h3 className="epl-wwd-card-title">
                      <Link href={programme.href}>{programme.title}</Link>
                    </h3>
                    <p className="epl-wwd-card-descr">{programme.summary}</p>
                    <Link className="epl-wwd-card-link" href={programme.href}>
                      Learn more{' '}
                      <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="ul-section-spacing pt-0 wow animate__fadeInUp">
        <div className="ul-container">
          <div className="ul-section-heading justify-content-center text-center">
            <div className="left mx-auto">
              <span className="ul-section-sub-title">{approach.eyebrow}</span>
              <h2 className="ul-section-title">{approach.title}</h2>
            </div>
          </div>

          <div className="row row-cols-md-3 row-cols-1 gy-4">
            {approach.steps.map((step, index) => (
              <div className="col" key={step.title}>
                <div className="ul-about-block epl-wwd-step">
                  <div className="block-left">
                    <div className="block-heading">
                      <div className="icon">
                        <span className="epl-step-number">{index + 1}</span>
                      </div>
                      <h3 className="block-title">{step.title}</h3>
                    </div>
                    <p className="ul-section-descr">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ul-section-spacing pt-0">
        <div className="ul-container">
          <div className="epl-wwd-cta wow animate__fadeInUp">
            <div className="epl-wwd-cta-media">
              <img alt="EPL Ghana fellows at work" src={cta.image} />
            </div>
            <div className="epl-wwd-cta-body">
              <h2 className="epl-wwd-cta-title">{cta.title}</h2>
              <p className="epl-wwd-cta-descr">{cta.body}</p>
              <div className="epl-wwd-cta-actions">
                <Link className="ul-btn" href={cta.primary.href}>
                  <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                  {cta.primary.label}
                </Link>
                <Link className="ul-btn epl-btn-ghost" href={cta.secondary.href}>
                  <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                  {cta.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
