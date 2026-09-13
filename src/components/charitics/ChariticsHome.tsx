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
import type { Event, SiteSetting, Testimonial } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'
import type {
  GalleryItem,
  HomeAboutMission,
  HomeEplWayItem,
  HomeHeroCurve,
  HomeImpactStories,
  HomeSections,
  HomeStat,
} from '@/utilities/getHomeContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type ChariticsHomeProps = {
  settings: SiteSetting
  sections?: HomeSections
  heroSlides?: HeroImageSlide[]
  heroAvatars?: string[]
  gallery?: GalleryItem[]
  aboutMission?: HomeAboutMission
  stats?: HomeStat[]
  heroCurve?: HomeHeroCurve
  eplWay?: HomeEplWayItem[]
  impactStories?: HomeImpactStories
  projects: HomeProjectCard[]
  events: Event[]
  eventsArePast?: boolean
  testimonials: Testimonial[]
}

export function ChariticsHome({
  settings,
  sections,
  heroSlides,
  heroAvatars = [],
  aboutMission,
  eplWay,
  impactStories,
  projects,
  events,
  testimonials,
}: ChariticsHomeProps) {
  const heroImage = getMediaUrl(settings.heroImage) || eplHomeImages.heroHome
  // Only curated photos rotate through the hero — a CMS-uploaded flyer/poster
  // in settings.heroImage must never get mixed into the slideshow.
  const heroImages = heroSlides?.length ? heroSlides.map((slide) => slide.image) : [heroImage]
  const homeHeroSlides =
    heroSlides?.length
      ? heroSlides.map((slide, index) => {
          const fallback = heroImageSlides[index] ?? heroImageSlides[0]
          return {
            ...slide,
            subtitle: fallback.subtitle,
            title: fallback.title,
            titleLines: fallback.titleLines,
            description: fallback.description,
            ctaLabel: fallback.ctaLabel,
            ctaHref: fallback.ctaHref,
            image: slide.image || fallback.image,
            thumb: slide.thumb || fallback.thumb,
          }
        })
      : heroImageSlides.map((slide, index) =>
          index === 0 ? { ...slide, image: heroImage, thumb: heroImage } : slide,
        )
  const projectCards = resolveHomeProjects(projects)
  const stats: HomeStat[] = [
    { value: '8', label: 'Cohorts' },
    { value: '200+', label: 'Fellows' },
    { value: '15+', label: 'Institutions' },
    { value: '85%', label: 'Career Advancement' },
  ]
  const wayCards = (
    eplWay?.length
      ? eplWay
      : ([
          {
            number: '01',
            title: 'Think Critically',
            description: 'Solving problems with clear, smart thinking.',
            note: 'We train Fellows to look at facts, solve real problems, and make smart decisions that improve how government institutions work.',
            image: aboutMission?.image ?? eplHomeImages.aboutBlock,
            tone: 'blue',
            href: '/about',
          },
          {
            number: '02',
            title: 'Act Ethically',
            description: 'Leading with honesty, fairness, and truth.',
            note: 'Good leadership starts with strong values. We instill zero tolerance for corruption and a deep respect for public accountability.',
            image: eplHomeImages.gallery[1].src,
            tone: 'navy',
            href: '/about',
          },
          {
            number: '03',
            title: 'Drive Change',
            description: 'Turning good policy into real action.',
            note: 'Fellows do not just study policy—they work inside ministries and local assemblies to fix bottlenecks and help communities.',
            image: eplHomeImages.gallery[3].src,
            tone: 'gold',
            href: '/about',
          },
        ] satisfies HomeEplWayItem[])
  ).map((item, index) => {
    const copy = [
      {
        description: 'Solving problems with clear, smart thinking.',
        note: 'We train Fellows to look at facts, solve real problems, and make smart decisions that improve how government institutions work.',
      },
      {
        description: 'Leading with honesty, fairness, and truth.',
        note: 'Good leadership starts with strong values. We instill zero tolerance for corruption and a deep respect for public accountability.',
      },
      {
        description: 'Turning good policy into real action.',
        note: 'Fellows do not just study policy—they work inside ministries and local assemblies to fix bottlenecks and help communities.',
      },
    ][index]

    return {
      ...item,
      href: '/about',
      description: copy?.description ?? item.description,
      note: copy?.note ?? item.note,
    }
  })

  const stories = {
    ...(impactStories ?? {
      eyebrow: 'Impact Stories',
      title: 'Real People. Real Impact.',
      ctaUrl: '/community/current-fellows',
      featured: {
        name: 'Abena Osei-Bonsu',
        cohort: 'Cohort 3',
        institution: 'Ministry of Finance',
        quote:
          'EPL taught me that public service is not just a job—it is a responsibility to serve Ghana with honesty and excellence.',
        image: eplHomeImages.fellows.miriam,
        storyHref: '/community/current-fellows',
      },
      secondary: [
        {
          cohort: 'Cohort 7',
          name: 'Kwame Asante',
          institution: 'Ghana Health Service',
          quote:
            'The fellowship helped me modernize clinic records so patients spend less time waiting for care.',
          image: eplHomeImages.fellows.priscilla,
        },
        {
          cohort: 'Cohort 8',
          name: 'Efua Mensah',
          institution: 'Accra Metropolitan Assembly',
          quote:
            'EPL gave me practical tools to work directly with communities and solve local planning challenges.',
          image: eplHomeImages.fellows.anita,
        },
      ],
    }),
    title: 'Real People. Real Impact.',
    featured: {
      ...(impactStories?.featured ?? {
        name: 'Abena Osei-Bonsu',
        cohort: 'Cohort 3',
        institution: 'Ministry of Finance',
        image: eplHomeImages.fellows.miriam,
        storyHref: '/community/current-fellows',
      }),
      quote:
        'EPL taught me that public service is not just a job—it is a responsibility to serve Ghana with honesty and excellence.',
    },
    secondary: (impactStories?.secondary?.length
      ? impactStories.secondary
      : [
          {
            cohort: 'Cohort 7',
            name: 'Kwame Asante',
            institution: 'Ghana Health Service',
            quote:
              'The fellowship helped me modernize clinic records so patients spend less time waiting for care.',
            image: eplHomeImages.fellows.priscilla,
          },
          {
            cohort: 'Cohort 8',
            name: 'Efua Mensah',
            institution: 'Accra Metropolitan Assembly',
            quote:
              'EPL gave me practical tools to work directly with communities and solve local planning challenges.',
            image: eplHomeImages.fellows.anita,
          },
        ]
    ).map((story, index) => {
      const quotes = [
        'The fellowship helped me modernize clinic records so patients spend less time waiting for care.',
        'EPL gave me practical tools to work directly with communities and solve local planning challenges.',
      ]
      return { ...story, quote: quotes[index] ?? story.quote }
    }),
  }
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
  const event = cmsEvent
    ? {
        ...cmsEvent,
        title: eventFallback.title,
        excerpt: eventFallback.excerpt,
      }
    : eventFallback
  void testimonials

  return (
    <main className="epl-new-home">
      <ChariticsHomeHero image={heroImage} images={heroImages} slides={homeHeroSlides} />

      <MotionReveal as="section" className="epl-way-section">
        <div className="epl-new-shell">
          <div className="epl-way-section__head">
            <span className="epl-new-kicker">How We Work</span>
            <h2>The EPL Way</h2>
            <p>
              We develop leaders who bring clear thinking, strong values and purposeful action to
              public service.
            </p>
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

      <ChariticsProgrammeStack projects={projectCards} />

      <ChariticsHomeStats stats={stats} />

      <MotionReveal as="section" className="epl-impact-stories">
        <div className="epl-new-shell">
          <MotionReveal className="epl-impact-stories__head">
            <div>
              <div className="epl-impact-stories__eyebrow">
                <span aria-hidden className="epl-impact-stories__eyebrow-line" />
                <span>{stories.eyebrow ?? 'Impact Stories'}</span>
                <span aria-hidden className="epl-impact-stories__eyebrow-line" />
              </div>
              <h2>{stories.title}</h2>
            </div>
            <Link className="epl-new-text-action" href="/news">
              Read all stories <span>→</span>
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
                  <span>Featured Story</span>
                  <h3>From Fellow to Policy Leader</h3>
                  <p className="epl-impact-person">
                    {[featuredStory.name, featuredStory.cohort, featuredStory.institution]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <blockquote>“{featuredStory.quote}”</blockquote>
                  <strong>
                    Read Her Story <span aria-hidden>→</span>
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
            <span className="epl-new-kicker">Updates & events</span>
            <h2>Latest Updates from EPL Ghana</h2>
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
            <span>Annual forum</span>
          </div>
          <div className="epl-latest-event__copy">
            <span className="epl-new-kicker">Upcoming event</span>
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
            <span className="epl-latest-event__countdown-label">Event countdown</span>
            <EditorialCountdown eventDate={event.eventDate} />
            <Link className="epl-latest-event__register" href={`/events/${event.slug}`}>
              Register for event <span>→</span>
            </Link>
          </div>
        </MotionReveal>
      </MotionReveal>
    </main>
  )
}
