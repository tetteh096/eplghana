'use client'

import Link from 'next/link'

import { ChariticsHomeHero } from '@/components/charitics/ChariticsHomeHero'
import { ChariticsHomeStats } from '@/components/charitics/ChariticsHomeStats'
import { ChariticsProgrammeStack } from '@/components/charitics/ChariticsProgrammeStack'
import type { HomeProjectCard } from '@/config/homeProjects'
import { resolveHomeProjects } from '@/config/homeProjects'
import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { EditorialCountdown } from '@/components/home/EditorialCountdown'
import { eplHomeImages } from '@/config/eplMedia'
import type { HeroImageSlide } from '@/config/heroSlides'
import { heroImageSlides } from '@/config/heroSlides'
import type { Event, SiteSetting } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'
import type {
  HomeEplWaySection,
  HomeEventsSection,
  HomeImpactStories,
  HomeProjectsSection,
  HomeStatsSection,
} from '@/utilities/getHomeContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type ChariticsHomeProps = {
  settings: SiteSetting
  heroSlides?: HeroImageSlide[]
  eplWaySection: HomeEplWaySection
  projectsSection: HomeProjectsSection
  statsSection: HomeStatsSection
  impactStories: HomeImpactStories
  eventsSection: HomeEventsSection
  projects: HomeProjectCard[]
  events: Event[]
  eventsArePast?: boolean
}

export function ChariticsHome({
  settings,
  heroSlides,
  eplWaySection,
  projectsSection,
  statsSection,
  impactStories,
  eventsSection,
  projects,
  events,
  eventsArePast = false,
}: ChariticsHomeProps) {
  const heroImage = getMediaUrl(settings.heroImage) || eplHomeImages.heroHome
  const homeHeroSlides =
    heroSlides?.length
      ? heroSlides
      : heroImageSlides.map((slide, index) =>
          index === 0 ? { ...slide, image: heroImage, thumb: heroImage } : slide,
        )
  const heroImages = homeHeroSlides.map((slide) => slide.image)
  const projectCards = resolveHomeProjects(projects)
  const wayCards = eplWaySection.cards
  const stories = impactStories
  const featuredStory = stories.featured

  const cmsEvent = events.find(
    (item) => item.eventDate && new Date(item.eventDate).getTime() > Date.now(),
  )
  const eventFallback = {
    id: 'annual-leadership-forum-2026',
    slug: 'annual-leadership-forum-2026',
    title: 'EPL Annual Public Leadership Forum 2026',
    excerpt:
      'A one-day gathering bringing together Fellows, government leaders, and partners to discuss how ethical leadership improves public institutions.',
    eventDate: '2026-09-15T09:00:00.000Z',
    venue: 'Accra International Conference Centre, Accra',
    featuredImage: null as null,
  }
  const event = cmsEvent ?? events[0] ?? eventFallback
  const eventKicker = eventsArePast ? 'Recent event' : eventsSection.kicker

  return (
    <main className="epl-new-home">
      <ChariticsHomeHero image={heroImage} images={heroImages} slides={homeHeroSlides} />

      <MotionReveal as="section" className="epl-way-section">
        <div className="epl-new-shell">
          <div className="epl-way-section__head">
            <span className="epl-new-kicker">{eplWaySection.eyebrow}</span>
            <h2>{eplWaySection.title}</h2>
            <p>{eplWaySection.intro}</p>
          </div>
          <MotionReveal className="epl-way-grid" stagger>
            {wayCards.map((item) => {
              const [titleFirst, ...titleRest] = item.title.split(' ')
              const titleSecond = titleRest.join(' ')

              return (
                <MotionItem className="epl-motion-cell" key={item.number}>
                  <Link className={`epl-way-card epl-way-card--${item.tone}`} href={item.href}>
                    <img
                      alt={`EPL Ghana fellows who ${item.title.toLowerCase()}`}
                      decoding="async"
                      loading="lazy"
                      src={item.image}
                    />
                    <span className="epl-way-card__wash" />
                    <div className="epl-way-card__content">
                      <span>{item.number}</span>
                      <h3>
                        <span className="epl-way-card__title-up">{titleFirst}</span>
                        {titleSecond ? (
                          <span className="epl-way-card__title-down">{titleSecond}</span>
                        ) : null}
                      </h3>
                      <p>{item.description}</p>
                      <p className="epl-way-card__note">{item.note}</p>
                      <b aria-hidden>
                        <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
                          <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </b>
                    </div>
                  </Link>
                </MotionItem>
              )
            })}
          </MotionReveal>
        </div>
      </MotionReveal>

      <ChariticsProgrammeStack
        eyebrow={projectsSection.eyebrow}
        projects={projectCards}
        title={projectsSection.title}
      />

      <ChariticsHomeStats heading={statsSection.heading} stats={statsSection.stats} />

      <MotionReveal as="section" className="epl-impact-stories">
        <div className="epl-new-shell">
          <MotionReveal className="epl-impact-stories__head">
            <div>
              <div className="epl-impact-stories__eyebrow">
                <span aria-hidden className="epl-impact-stories__eyebrow-line" />
                <span>{stories.eyebrow}</span>
                <span aria-hidden className="epl-impact-stories__eyebrow-line" />
              </div>
              <h2>{stories.title}</h2>
            </div>
            <Link className="epl-new-text-action" href={stories.ctaUrl}>
              {stories.ctaLabel} <span>→</span>
            </Link>
          </MotionReveal>

          {featuredStory ? (
            <MotionReveal delay={0.08}>
              <Link
                className="epl-impact-feature group"
                href={featuredStory.storyHref || stories.ctaUrl}
              >
                <div className="epl-impact-feature__image">
                  <img
                    alt={`${featuredStory.name}, EPL Ghana fellow`}
                    decoding="async"
                    loading="lazy"
                    src={featuredStory.image}
                  />
                </div>
                <div className="epl-impact-feature__copy">
                  <span>{stories.featuredLabel}</span>
                  <h3>{stories.featuredHeading}</h3>
                  <p className="epl-impact-person">
                    {[featuredStory.name, featuredStory.cohort, featuredStory.institution]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <blockquote>“{featuredStory.quote}”</blockquote>
                  <strong>
                    {stories.featuredCtaLabel} <span aria-hidden>→</span>
                  </strong>
                </div>
              </Link>
            </MotionReveal>
          ) : null}

          <MotionReveal className="epl-impact-stories__secondary" delay={0.12} stagger>
            {stories.secondary.map((story) => (
              <MotionItem key={story.name}>
                <Link className="epl-impact-card group" href={stories.ctaUrl}>
                  <div className="epl-impact-card__image">
                    <img
                      alt={`${story.name}, EPL Ghana fellow`}
                      decoding="async"
                      loading="lazy"
                      src={story.image}
                    />
                  </div>
                  <div className="epl-impact-card__copy">
                    <span>{story.cohort}</span>
                    <h3>{story.name}</h3>
                    <p>{story.institution}</p>
                    <blockquote>“{story.quote}”</blockquote>
                  </div>
                </Link>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="epl-new-stories epl-new-shell">
        <div className="epl-new-section-head">
          <div>
            <span className="epl-new-kicker">{eventsSection.eyebrow}</span>
            <h2>{eventsSection.title}</h2>
          </div>
        </div>
        <MotionReveal as="article" className="epl-latest-event">
          <div className="epl-latest-event__image">
            <img
              alt={event.title}
              decoding="async"
              loading="lazy"
              src={getMediaUrl(event.featuredImage) ?? eplHomeImages.events[0]}
            />
            <span>{eventsSection.badge}</span>
          </div>
          <div className="epl-latest-event__copy">
            <span className="epl-new-kicker">{eventKicker}</span>
            <h3>{event.title}</h3>
            <p>{event.excerpt}</p>
            <dl>
              <div>
                <span className="epl-latest-event__meta-icon" aria-hidden>
                  <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
                    <rect height="18" rx="2" stroke="currentColor" strokeWidth="1.6" width="18" x="3" y="4" />
                    <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
                  </svg>
                </span>
                <div>
                  <dt>Date</dt>
                  <dd>{formatDate(event.eventDate)}</dd>
                </div>
              </div>
              <div>
                <span className="epl-latest-event__meta-icon epl-latest-event__meta-icon--gold" aria-hidden>
                  <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
                    <path
                      d="M12 22s7-7.05 7-12.5A7 7 0 0 0 5 9.5C5 14.95 12 22 12 22Z"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                    />
                    <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <div>
                  <dt>Location</dt>
                  <dd>{event.venue}</dd>
                </div>
              </div>
            </dl>
            {!eventsArePast ? (
              <>
                <span className="epl-latest-event__countdown-label">Event countdown</span>
                <EditorialCountdown eventDate={event.eventDate} />
              </>
            ) : null}
            <Link className="epl-latest-event__register" href={`/events/${event.slug}`}>
              {eventsSection.registerLabel} <span>→</span>
            </Link>
          </div>
        </MotionReveal>
      </MotionReveal>
    </main>
  )
}
