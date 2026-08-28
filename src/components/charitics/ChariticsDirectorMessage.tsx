import Link from 'next/link'

import type { DirectorMessageContent } from '@/utilities/getDirectorMessageContent'

type ChariticsDirectorMessageProps = {
  content: DirectorMessageContent
}

export function ChariticsDirectorMessage({ content }: ChariticsDirectorMessageProps) {
  const {
    eyebrow,
    title,
    name,
    role,
    photo,
    email,
    linkedin,
    greeting,
    paragraphs,
    signoff,
    pullQuote,
    teamCta,
  } = content

  return (
    <section className="ul-about epl-about-section epl-director-message ul-section-spacing wow animate__fadeInUp">
      <div className="ul-container">
        <div className="row row-cols-lg-2 row-cols-1 gy-4 gx-xl-5 align-items-start">
          {/* Portrait + identity */}
          <div className="col-lg-5">
            <div className="epl-director-card">
              <div className="epl-director-photo">
                {photo ? <img alt={name} src={photo} /> : null}
              </div>
              <div className="epl-director-identity">
                <h3 className="epl-director-name">{name}</h3>
                <p className="epl-director-role">{role}</p>
                <div className="epl-director-links">
                  {email ? (
                    <a aria-label={`Email ${name}`} href={`mailto:${email}`}>
                      <i className="flaticon-email"></i>
                    </a>
                  ) : null}
                  {linkedin ? (
                    <a
                      aria-label={`${name} on LinkedIn`}
                      href={linkedin}
                      rel="noreferrer"
                      target={linkedin.startsWith('http') ? '_blank' : undefined}
                    >
                      <i className="flaticon-linkedin-big-logo"></i>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="col-lg-7">
            <div className="ul-about-txt epl-director-body">
              <span className="ul-section-sub-title ul-section-sub-title--2">{eyebrow}</span>
              <h2 className="ul-section-title epl-about-page-title">{title}</h2>

              <p className="epl-director-greeting">{greeting}</p>
              {paragraphs.map((paragraph) => (
                <p className="ul-section-descr" key={paragraph}>
                  {paragraph}
                </p>
              ))}

              <blockquote className="epl-director-quote">{pullQuote}</blockquote>

              <p className="epl-director-signoff">{signoff}</p>
              <p className="epl-director-signature">
                <strong>{name}</strong>
                <span>{role}, EPL Ghana</span>
              </p>

              <Link className="ul-btn" href={teamCta.href}>
                <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                {teamCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
