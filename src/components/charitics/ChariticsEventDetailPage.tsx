import type { CSSProperties } from 'react'
import Link from 'next/link'

import type { EventDetail } from '@/config/newsEventsContent'
import type { EventSummary } from '@/utilities/getEvents'
import { formatDate } from '@/utilities/formatDate'
import { formatEventDateBadge } from '@/utilities/formatEventDate'

type ChariticsEventDetailPageProps = {
  event: EventDetail
  otherEvents: EventSummary[]
  otherEventsArePast?: boolean
}

export function ChariticsEventDetailPage({
  event,
  otherEvents,
  otherEventsArePast = false,
}: ChariticsEventDetailPageProps) {
  const badge = formatEventDateBadge(event.eventDate)
  const eventTime = new Date(event.eventDate).getTime()
  const isUpcoming = Number.isFinite(eventTime) && eventTime >= Date.now()
  const registrationUrl = event.registrationUrl?.trim()
  const registrationLabel = event.registrationLabel?.trim() || 'Register Now'
  const showRegister = isUpcoming && Boolean(registrationUrl)
  const gallery = event.gallery ?? []
  // Duplicate the photos so the marquee can loop seamlessly; the second copy is
  // hidden from screen readers. Speed scales with the photo count so the slide
  // stays gentle whether there are 3 photos or 30.
  const galleryLoop = gallery.length > 0 ? [...gallery, ...gallery] : []

  return (
    <div className="ul-section-spacing epl-event-page">
      <div className="ul-container">
        <div className="epl-event-layout">
          <article className="epl-event-main">
            <div className="epl-event-detail__hero">
              <img alt={event.title} src={event.image} />
              <span
                className={`epl-event-detail__status${isUpcoming ? ' is-upcoming' : ' is-past'}`}
              >
                {isUpcoming ? 'Upcoming' : 'Past event'}
              </span>
              <span className="epl-event-detail__date">
                <strong>{badge.day}</strong>
                <span>{badge.month}</span>
              </span>
            </div>

            <div className="epl-event-detail__body">
              {event.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="epl-event-aside">
            <div className="epl-event-card">
              <h2 className="epl-event-card__title">Event details</h2>
              <ul className="epl-event-card__list">
                <li>
                  <span className="icon">
                    <i className="flaticon-calendar"></i>
                  </span>
                  <span className="text">
                    <span className="label">Date &amp; time</span>
                    {formatDate(event.eventDate)}
                  </span>
                </li>
                <li>
                  <span className="icon">
                    <i className="flaticon-pin"></i>
                  </span>
                  <span className="text">
                    <span className="label">Venue</span>
                    {event.venue}
                  </span>
                </li>
                <li>
                  <span className="icon">
                    <i className="flaticon-price-tag"></i>
                  </span>
                  <span className="text">
                    <span className="label">Status</span>
                    {isUpcoming ? 'Upcoming event' : 'This event has ended'}
                  </span>
                </li>
              </ul>

              {showRegister ? (
                <a
                  className="ul-btn epl-event-card__btn"
                  href={registrationUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                  {registrationLabel}
                </a>
              ) : (
                <p className="epl-event-card__note">
                  {isUpcoming
                    ? 'Registration details will be shared soon.'
                    : 'Registration for this event has closed.'}
                </p>
              )}

              <Link className="epl-event-card__back" href="/news/events">
                All News &amp; Events
              </Link>
            </div>
          </aside>
        </div>

        {gallery.length > 0 ? (
          <div className="epl-event-gallery">
            <h2 className="epl-event-gallery__title">Event gallery</h2>
            <p className="epl-event-gallery__hint">Hover to pause and take a closer look.</p>
            <div
              className="epl-event-gallery__marquee"
              style={{ '--epl-gallery-count': gallery.length } as CSSProperties}
            >
              <div className="epl-event-gallery__track">
                {galleryLoop.map((item, index) => (
                  <figure
                    aria-hidden={index >= gallery.length ? true : undefined}
                    className="epl-event-gallery__item"
                    key={`${item.src}-${index}`}
                  >
                    <img alt={item.caption ?? event.title} src={item.src} />
                    {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {otherEvents.length > 0 ? (
          <div className="epl-event-more">
            <h2 className="epl-event-more__title">
              {otherEventsArePast ? 'Past events' : 'More upcoming events'}
            </h2>
            <div className="epl-event-more__grid">
              {otherEvents.map((item) => {
                const itemBadge = formatEventDateBadge(item.eventDate)
                return (
                  <Link className="epl-event-more__card" href={item.href} key={item.slug}>
                    <div className="epl-event-more__img">
                      <img alt={item.title} src={item.image} />
                      <span className="date">
                        <strong>{itemBadge.day}</strong>
                        <span>{itemBadge.month}</span>
                      </span>
                    </div>
                    <div className="epl-event-more__txt">
                      <h3>{item.title}</h3>
                      <p>{item.venue}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
