'use client'

import Link from 'next/link'

import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { PeaceProjectContent } from '@/utilities/getPeaceProjectContent'

type ChariticsPeaceDetailProps = {
  content: PeaceProjectContent
  visualClass?: string
}

function SectionHead({
  eyebrow,
  title,
  centered = false,
}: {
  eyebrow?: string
  title: string
  centered?: boolean
}) {
  return (
    <div className={`epl-wotr-section-head${centered ? ' epl-wotr-section-head--center' : ''}`}>
      {eyebrow && <span className="ul-section-sub-title">{eyebrow}</span>}
      <h2 className="epl-wotr-section-title">{title}</h2>
    </div>
  )
}

export function ChariticsPeaceDetail({
  content,
  visualClass = 'epl-project-card-visual--peace',
}: ChariticsPeaceDetailProps) {
  const {
    hero,
    aboutEyebrow,
    aboutTitle,
    aboutImage,
    impact,
    outcomes,
    keySuccess,
    gallery,
    relatedArticles,
    partnerCta,
  } = content

  const primaryHero = hero.images[0]
  const secondaryHero = hero.images[1] ?? primaryHero

  return (
    <div className="epl-peace-detail">
      <section className="epl-wotr-hero ul-section-spacing">
        <div className="ul-container">
          <div className="row ul-bs-row gy-5 align-items-center">
            <div className="col-lg-5">
              <div className="epl-wotr-hero-copy">
                <span className="ul-section-sub-title">{hero.eyebrow}</span>
                <h1 className="ul-section-title epl-wotr-hero-title">{hero.title}</h1>
                <p className="epl-wotr-hero-lead">{hero.lead}</p>
                <ul className="epl-wotr-partners">
                  {hero.partners.map((partner) => (
                    <li key={partner}>{partner}</li>
                  ))}
                </ul>
                <Link className="ul-btn epl-wotr-hero-cta" href={hero.ctaHref}>
                  <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                  {hero.ctaLabel}
                </Link>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="epl-wotr-hero-media">
                <ProjectDetailImage
                  alt={hero.title}
                  className="epl-wotr-hero-img epl-wotr-hero-img--primary"
                  fallbackClass={`epl-project-card-visual epl-wotr-hero-fallback ${visualClass}`}
                  src={primaryHero}
                />
                <ProjectDetailImage
                  alt="P.E.A.C.E fellowship programme"
                  className="epl-wotr-hero-img epl-wotr-hero-img--secondary"
                  fallbackClass={`epl-project-card-visual epl-wotr-hero-fallback epl-wotr-hero-fallback--secondary ${visualClass}`}
                  src={secondaryHero}
                />
                <div className="epl-wotr-hero-badge" aria-hidden>
                  <strong>{hero.badge.value}</strong>
                  <span>{hero.badge.label}</span>
                </div>
                <img
                  alt=""
                  className="epl-wotr-hero-vector"
                  src="/assets/img/about-img-vector-2.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="epl-wotr-about">
        <div className="ul-container">
          <div className="row ul-bs-row gy-5 align-items-center epl-wotr-about-row">
            <div className="col-lg-5 order-lg-2">
              <div className="epl-wotr-about-frame">
                <ProjectDetailImage
                  alt="P.E.A.C.E fellowship programme"
                  className="epl-wotr-about-img"
                  fallbackClass={`epl-project-card-visual epl-wotr-about-fallback ${visualClass}`}
                  src={aboutImage}
                />
              </div>
            </div>
            <div className="col-lg-7 order-lg-1">
              <SectionHead eyebrow={aboutEyebrow} title={aboutTitle} />
              <p className="epl-wotr-about-text">{hero.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="epl-wotr-impact">
        <div className="ul-container">
          <SectionHead centered eyebrow="Programme scale" title={impact.title} />
          <div className="epl-wotr-stats">
            {impact.stats.map((stat) => (
              <article className="epl-wotr-stat" key={stat.label}>
                <div className="epl-wotr-stat-icon-wrap">
                  <ProjectDetailImage
                    alt=""
                    className="epl-wotr-stat-icon"
                    fallbackClass="epl-wotr-stat-icon-fallback"
                    src={stat.icon}
                  />
                </div>
                <strong className="epl-wotr-stat-value">{stat.value}</strong>
                <p className="epl-wotr-stat-label">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-wotr-outcomes ul-section-spacing">
        <div className="ul-container">
          <SectionHead eyebrow="Core competencies" title={outcomes.title} />
          <div className="epl-wotr-outcome-grid">
            {outcomes.items.map((item) => (
              <article className="epl-wotr-outcome-card" key={item.title}>
                <div className="epl-wotr-outcome-media">
                  <ProjectDetailImage
                    alt={item.title}
                    className="epl-wotr-outcome-img"
                    fallbackClass={`epl-project-card-visual epl-wotr-outcome-fallback ${visualClass}`}
                    src={item.image}
                  />
                  <div className="epl-wotr-outcome-overlay">
                    <h3 className="epl-wotr-outcome-title">{item.title}</h3>
                  </div>
                </div>
                <div className="epl-wotr-outcome-body">
                  <p className="epl-wotr-outcome-descr">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-wotr-success-band">
        <div className="ul-container">
          <span className="epl-wotr-success-band-label">{keySuccess.eyebrow}</span>
        </div>
      </section>

      <section className="epl-wotr-success ul-section-spacing">
        <div className="ul-container">
          {keySuccess.stories.map((story, storyIndex) => (
            <div className="epl-wotr-story" key={story.title}>
              <h2 className="epl-wotr-story-title">{story.title}</h2>
              <div className="row ul-bs-row gy-5 align-items-center">
                <div className={`col-lg-6${storyIndex % 2 === 1 ? ' order-lg-2' : ''}`}>
                  <div className="epl-wotr-story-copy">
                    {story.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                <div className={`col-lg-6${storyIndex % 2 === 1 ? ' order-lg-1' : ''}`}>
                  <div className="epl-wotr-story-media">
                    <ProjectDetailImage
                      alt={story.title}
                      className="epl-wotr-story-img epl-wotr-story-img--main"
                      fallbackClass={`epl-project-card-visual epl-wotr-story-fallback ${visualClass}`}
                      src={story.images[0]}
                    />
                    {story.images[1] && (
                      <ProjectDetailImage
                        alt={story.title}
                        className="epl-wotr-story-img epl-wotr-story-img--accent"
                        fallbackClass={`epl-project-card-visual epl-wotr-story-fallback ${visualClass}`}
                        src={story.images[1]}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="epl-wotr-gallery ul-section-spacing">
        <div className="ul-container">
          <SectionHead centered eyebrow="Programme gallery" title={gallery.title} />
          <div className="epl-wotr-gallery-grid">
            {gallery.items.map((item) => (
              <figure
                className={`epl-wotr-gallery-item epl-wotr-gallery-item--${item.layout}`}
                key={item.src}
              >
                <ProjectDetailImage
                  alt={item.alt}
                  className="epl-wotr-gallery-img"
                  fallbackClass={`epl-project-card-visual epl-wotr-gallery-fallback ${visualClass}`}
                  src={item.src}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-wotr-articles ul-section-spacing pt-0">
        <div className="ul-container">
          <SectionHead eyebrow="From the blog" title={relatedArticles.title} />
          <div className="epl-wotr-articles-grid">
            {relatedArticles.items.map((article) => (
              <Link className="epl-wotr-article-card" href={article.href} key={article.title}>
                {article.image && (
                  <div className="epl-wotr-article-media">
                    <ProjectDetailImage
                      alt=""
                      className="epl-wotr-article-img"
                      fallbackClass={`epl-project-card-visual epl-wotr-article-fallback ${visualClass}`}
                      src={article.image}
                    />
                  </div>
                )}
                <div className="epl-wotr-article-body">
                  <h3 className="epl-wotr-article-title">{article.title}</h3>
                  <span className="epl-wotr-article-link">
                    Read More <i className="flaticon-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-wotr-partner-cta">
        <div className="ul-container">
          <div className="epl-wotr-partner-cta-inner">
            <div className="epl-wotr-partner-cta-copy">
              <h2 className="epl-wotr-partner-cta-title">{partnerCta.title}</h2>
              <Link className="ul-btn epl-wotr-partner-cta-btn" href={partnerCta.ctaHref}>
                <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                {partnerCta.ctaLabel}
              </Link>
            </div>
            <div className="epl-wotr-partner-cta-media">
              <ProjectDetailImage
                alt=""
                className="epl-wotr-partner-cta-img"
                fallbackClass={`epl-project-card-visual epl-wotr-partner-fallback ${visualClass}`}
                src={partnerCta.image}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
