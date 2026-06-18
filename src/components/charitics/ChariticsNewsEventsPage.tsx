import Link from 'next/link'

import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { NewsEventsPageContent } from '@/utilities/getNewsEventsPageContent'
import { formatDate } from '@/utilities/formatDate'
import { formatEventDateBadge } from '@/utilities/formatEventDate'

type ChariticsNewsEventsPageProps = {
  content: NewsEventsPageContent
}

function SectionHead({
  eyebrow,
  title,
  light,
}: {
  eyebrow: string
  title: string
  light?: boolean
}) {
  return (
    <div className={`epl-ne-section-head${light ? ' epl-ne-section-head--light' : ''}`}>
      <span className="epl-ne-section-head__eyebrow">{eyebrow}</span>
      <h2 className="epl-ne-section-head__title">{title}</h2>
    </div>
  )
}

export function ChariticsNewsEventsPage({ content }: ChariticsNewsEventsPageProps) {
  const {
    hero,
    featuredSection,
    upcomingSection,
    pastSection,
    featuredStories,
    upcomingEvents,
    pastEvents,
    cta,
  } = content

  return (
    <div className="epl-news-events-page">
      <section className="epl-ne-intro">
        <div className="ul-container">
          <p className="epl-ne-intro__lead">{hero.lead}</p>
        </div>
      </section>

      <section className="epl-ne-section epl-ne-section--stories">
        <div className="ul-container">
          <SectionHead eyebrow={featuredSection.eyebrow} title={featuredSection.title} />
          <div className="row ul-bs-row gy-4">
            {featuredStories.map((story) => (
              <div className="col-lg-6" key={story.href}>
                <article className="epl-ne-story-card">
                  <Link className="epl-ne-story-card__media" href={story.href}>
                    <ProjectDetailImage
                      alt=""
                      className="epl-ne-story-card__img"
                      fallbackClass="epl-ne-story-card__img-fallback"
                      src={story.image}
                    />
                  </Link>
                  <div className="epl-ne-story-card__body">
                    <span className="epl-ne-story-card__tag">Story</span>
                    <h3 className="epl-ne-story-card__title">
                      <Link href={story.href}>{story.title}</Link>
                    </h3>
                    <p className="epl-ne-story-card__excerpt">{story.excerpt}</p>
                    <Link className="epl-ne-card-link" href={story.href}>
                      {story.ctaLabel} <i className="flaticon-next"></i>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {upcomingEvents.length > 0 ? (
        <section className="epl-ne-section epl-ne-section--upcoming">
          <div className="ul-container">
            <SectionHead
              eyebrow={upcomingSection.eyebrow}
              light
              title={upcomingSection.title}
            />
            <div className="row row-cols-xl-3 row-cols-lg-2 row-cols-1 ul-bs-row gy-4">
              {upcomingEvents.map((event) => {
                const badge = formatEventDateBadge(event.eventDate)
                const monthLabel = badge.monthShort ?? badge.month.slice(0, 3)

                return (
                  <div className="col" key={event.slug}>
                    <article className="epl-ne-event-card epl-ne-event-card--upcoming">
                      <div className="epl-ne-event-card__media-wrap">
                        <Link className="epl-ne-event-card__media" href={event.href}>
                          <ProjectDetailImage
                            alt=""
                            className="epl-ne-event-card__img"
                            fallbackClass="epl-ne-event-card__img-fallback"
                            src={event.image}
                          />
                        </Link>
                        <div aria-hidden className="epl-ne-date-pill">
                          <span className="epl-ne-date-pill__month">{monthLabel}</span>
                          <span className="epl-ne-date-pill__day">{badge.day}</span>
                        </div>
                      </div>
                      <div className="epl-ne-event-card__body">
                        <p className="epl-ne-event-card__meta">
                          <i className="flaticon-calendar"></i>
                          {formatDate(event.eventDate)}
                          {event.venue ? ` · ${event.venue}` : ''}
                        </p>
                        <h3 className="epl-ne-event-card__title">
                          <Link href={event.href}>{event.title}</Link>
                        </h3>
                        <p className="epl-ne-event-card__excerpt">{event.excerpt}</p>
                        <Link className="epl-ne-card-link epl-ne-card-link--on-dark" href={event.href}>
                          Event details <i className="flaticon-next"></i>
                        </Link>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="epl-ne-section epl-ne-section--past">
        <div className="ul-container">
          <SectionHead eyebrow={pastSection.eyebrow} title={pastSection.title} />
          <div className="row row-cols-xl-3 row-cols-lg-2 row-cols-1 ul-bs-row gy-4">
            {pastEvents.map((event) => (
              <div className="col" key={event.slug}>
                <article className="epl-ne-event-card">
                  <Link className="epl-ne-event-card__media" href={event.href}>
                    <ProjectDetailImage
                      alt=""
                      className="epl-ne-event-card__img"
                      fallbackClass="epl-ne-event-card__img-fallback"
                      src={event.image}
                    />
                  </Link>
                  <div className="epl-ne-event-card__body">
                    <h3 className="epl-ne-event-card__title">
                      <Link href={event.href}>{event.title}</Link>
                    </h3>
                    <p className="epl-ne-event-card__excerpt">{event.excerpt}</p>
                    <Link className="epl-ne-card-link" href={event.href}>
                      Read more <i className="flaticon-next"></i>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-ne-cta">
        <div className="ul-container">
          <div className="epl-fellows-cta-inner epl-ne-cta__inner">
            <div className="epl-fellows-cta-copy">
              <span className="ul-section-sub-title">Partner With Us</span>
              <h2 className="ul-section-title">{cta.title}</h2>
              <Link className="ul-btn" href={cta.ctaHref}>
                <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> {cta.ctaLabel}
              </Link>
            </div>
            <div className="epl-fellows-cta-media">
              <ProjectDetailImage
                alt=""
                className="epl-fellows-cta-img"
                fallbackClass="epl-fellows-cta-fallback"
                src={cta.image}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
