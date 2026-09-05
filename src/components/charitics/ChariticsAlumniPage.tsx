'use client'

import Link from 'next/link'

import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { EplanPageContent } from '@/utilities/getEplanPageContent'

type ChariticsAlumniPageProps = {
  content: EplanPageContent
}

export function ChariticsAlumniPage({ content }: ChariticsAlumniPageProps) {
  const { hero, sustain, vision, mission, executives, eplanAbout, spotlight } = content

  return (
    <div className="figma-eplan-page">
      <section className="figma-eplan-hero">
        <div className="figma-eplan-hero__bg" style={{ backgroundImage: `url(${hero.image})` }} />
        <div className="figma-eplan-hero__overlay" />
        <div className="figma-eplan-hero__content">
          <div className="figma-eplan-hero__copy">
            <div className="figma-impact-kicker">
              <span className="figma-impact-kicker__line" />
              <span>{hero.eyebrow.toUpperCase()}</span>
            </div>
            <h1>{hero.title}</h1>
            <p>{hero.lead}</p>
            <div className="figma-eplan-hero__actions">
              <Link className="figma-eplan-btn figma-eplan-btn--gold" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </Link>
              <Link className="figma-eplan-btn figma-eplan-btn--outline" href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="figma-eplan-stats">
        <div className="epl-new-shell">
          <div className="figma-eplan-stats__grid">
            {hero.highlights.map((stat, index) => (
              <div className="figma-eplan-stats__item" key={stat.label}>
                <div
                  className={`figma-eplan-stats__value${index % 2 === 0 ? ' figma-eplan-stats__value--gold' : ''}`}
                >
                  {stat.value}
                </div>
                <div className="figma-eplan-stats__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="figma-eplan-vision">
        <div className="figma-eplan-vision__inner">
          <div className="figma-eplan-vision__kicker">
            <span className="figma-impact-kicker__line" />
            <span>{vision.eyebrow.toUpperCase()}</span>
            <span className="figma-impact-kicker__line" />
          </div>
          <h2>&ldquo;{vision.text}&rdquo;</h2>
          <div className="figma-eplan-vision__rule" />
          <p>{eplanAbout.paragraphs[0]}</p>
        </div>
      </section>

      <section className="figma-eplan-vision figma-eplan-vision--mission">
        <div className="figma-eplan-vision__inner">
          <div className="figma-eplan-vision__kicker">
            <span className="figma-impact-kicker__line" />
            <span>{mission.eyebrow.toUpperCase()}</span>
            <span className="figma-impact-kicker__line" />
          </div>
          <div className="figma-eplan-vision__rule" />
          <p>{mission.text}</p>
        </div>
      </section>

      {executives.items.length > 0 ? (
        <section className="figma-eplan-executives">
          <div className="epl-new-shell">
            <div className="figma-eplan-executives__head">
              <div className="figma-impact-kicker figma-impact-kicker--blue">
                <span className="figma-impact-kicker__line" />
                <span>{executives.eyebrow.toUpperCase()}</span>
              </div>
              <h2>{executives.title}</h2>
              <p>{executives.intro}</p>
            </div>
            <div className="figma-eplan-executives__grid">
              {executives.items.map((member) => (
                <article className="figma-eplan-executive-card" key={member.id}>
                  <div className="figma-eplan-executive-card__photo">
                    <ProjectDetailImage
                      alt={member.name}
                      className="w-full h-full object-cover"
                      fallbackClass="epl-project-card-visual"
                      src={member.photo}
                    />
                  </div>
                  <div className="figma-eplan-executive-card__body">
                    <h3>{member.name}</h3>
                    <span>{member.role}</span>
                    {member.bio ? <p>{member.bio}</p> : null}
                    {member.linkedin ? (
                      <a href={member.linkedin} rel="noopener noreferrer" target="_blank">
                        LinkedIn <span aria-hidden>↗</span>
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="figma-eplan-sustain">
        <div className="epl-new-shell">
          <div className="figma-eplan-sustain__intro">
            <div className="figma-eplan-sustain__copy">
              <div className="figma-impact-kicker figma-impact-kicker--blue">
                <span className="figma-impact-kicker__line" />
                <span>{sustain.eyebrow.toUpperCase()}</span>
              </div>
              <h2>{sustain.title}</h2>
              <p className="figma-eplan-sustain__lead">{sustain.lead}</p>
              <p className="figma-eplan-sustain__note">{sustain.note}</p>
            </div>
            <div className="figma-eplan-sustain__media">
              <ProjectDetailImage
                alt={sustain.imageAlt}
                className="w-full h-full object-cover"
                fallbackClass="epl-project-card-visual"
                src={sustain.image}
              />
            </div>
          </div>

          <div className="figma-eplan-pillars">
            {sustain.pillars.map((pillar) => (
              <article className="figma-eplan-pillar" key={pillar.num}>
                <div className="figma-eplan-pillar__num">{pillar.num}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="figma-eplan-spotlight">
        <div className="epl-new-shell">
          <div className="figma-eplan-spotlight__head">
            <div>
              <div className="figma-impact-kicker figma-impact-kicker--blue">
                <span className="figma-impact-kicker__line" />
                <span>{spotlight.eyebrow.toUpperCase()}</span>
              </div>
              <h2>{spotlight.title}</h2>
            </div>
            <p>{spotlight.intro}</p>
          </div>

          <div className="figma-eplan-spotlight__grid">
            {spotlight.items.map((item) => (
              <article className="figma-eplan-spotlight-card" key={item.title}>
                <div className="figma-eplan-spotlight-card__media">
                  <ProjectDetailImage
                    alt={item.title}
                    className="w-full h-full object-cover"
                    fallbackClass="epl-project-card-visual"
                    src={item.image}
                  />
                  <span className="figma-eplan-spotlight-card__tag">{item.tag}</span>
                </div>
                <div className="figma-eplan-spotlight-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="figma-eplan-spotlight__cta">
            <Link className="figma-eplan-btn figma-eplan-btn--primary" href={spotlight.supportCta.href}>
              {spotlight.supportCta.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
