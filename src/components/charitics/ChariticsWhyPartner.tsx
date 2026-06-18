import Link from 'next/link'

import type { AboutContent } from '@/utilities/getAboutContent'

type ChariticsWhyPartnerProps = {
  partner: AboutContent['partner']
}

export function ChariticsWhyPartner({ partner }: ChariticsWhyPartnerProps) {
  const { eyebrow, title, lead, body, chooseLabel, items } = partner

  return (
    <section className="epl-why-partner ul-section-spacing wow animate__fadeInUp">
      <div className="ul-container">
        <div className="epl-why-partner-panel">
          <div className="ul-section-heading justify-content-between epl-why-partner-head">
            <div className="left">
              <span className="ul-section-sub-title">{eyebrow}</span>
              <h2 className="ul-section-title">{title}</h2>
            </div>
            <div className="right d-none d-md-block">
              <Link className="ul-btn" href="/contact">
                <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Partner With Us
              </Link>
            </div>
          </div>

          <div className="epl-why-partner-copy">
            <p className="epl-why-partner-lead">{lead}</p>
            <p className="epl-why-partner-body">{body}</p>
          </div>
          <p className="epl-why-partner-choose">{chooseLabel}</p>

          <div className="row row-cols-xl-4 row-cols-md-2 row-cols-1 gy-4 epl-why-partner-grid">
            {items.map((item) => (
              <div className="col" key={item.title}>
                <article className={`epl-partner-card epl-partner-card--${item.accent}`}>
                  <div className="epl-partner-card-icon" aria-hidden>
                    <img alt="" src={item.icon} />
                  </div>
                  <h3 className="epl-partner-card-title">{item.title}</h3>
                  <p className="epl-partner-card-descr">{item.body}</p>
                  <img
                    alt=""
                    aria-hidden
                    className="epl-partner-card-splash"
                    src="/assets/img/cta-vector.svg"
                  />
                </article>
              </div>
            ))}
          </div>

          <div className="epl-why-partner-foot d-md-none">
            <Link className="ul-btn" href="/contact">
              <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
