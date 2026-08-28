'use client'

import Link from 'next/link'

import { ChariticsHeroCurve } from '@/components/charitics/ChariticsHeroCurve'
import { ChariticsHomeHero } from '@/components/charitics/ChariticsHomeHero'
import { ChariticsHomeStats } from '@/components/charitics/ChariticsHomeStats'
import { ChariticsProgrammeStack } from '@/components/charitics/ChariticsProgrammeStack'
import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { EditorialCountdown } from '@/components/home/EditorialCountdown'
import { eplHomeImages, resolveProjectImage } from '@/config/eplMedia'
import type { HeroImageSlide } from '@/config/heroSlides'
import { heroImageSlides } from '@/config/heroSlides'
import type { Event, News, Project, SiteSetting, Testimonial } from '@/payload-types'
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
  news: News[]
  projects: Project[]
  events: Event[]
  eventsArePast?: boolean
  testimonials: Testimonial[]
}

const fallbackProjects = [
  {
    slug: 'public-service-fellowship',
    title: 'Emerging Public Leaders Fellowship',
    category: 'Core Programme',
    summary:
      'A flagship 12-month leadership development programme placing young professionals in public institutions across Ghana. Fellows receive structured mentorship, targeted training and peer learning that builds lasting leadership capacity.',
    image: eplHomeImages.projects['public-service-fellowship'],
  },
  {
    slug: 'epl-in-maritime',
    title: 'EPL in Maritime (EPLIM)',
    category: 'Program',
    summary:
      'Developing emerging leaders for Ghana’s maritime sector through practical learning, mentorship and professional development.',
    image: eplHomeImages.gallery[4].src,
  },
  {
    slug: 'women-on-the-rise',
    title: 'Women on the Rise',
    category: 'Program',
    summary:
      'Creating the space, skills and networks women need to lead and influence Ghana’s public institutions.',
    image: eplHomeImages.projects['women-on-the-rise'],
  },
  {
    slug: 'peace',
    title: 'P.E.A.C.E.',
    category: 'Initiative',
    summary:
      'Building ethical, accountable leadership and practical peacebuilding capacity across the public sector.',
    image: eplHomeImages.projects.peace,
  },
]

const fallbackNews = [
  {
    slug: 'psf-cohort-vi-graduation',
    title: 'Celebrating the next generation of public leaders',
    excerpt:
      'A new cohort steps forward with the skills, relationships and conviction to serve Ghana.',
    publishedAt: '2025-07-03',
    image: eplHomeImages.news.graduation,
  },
  {
    slug: 'women-on-the-rise-forum-recap',
    title: 'Women are reshaping public leadership',
    excerpt:
      'Inside a growing community advancing women into positions of influence and responsibility.',
    publishedAt: '2025-10-20',
    image: eplHomeImages.gallery[2].src,
  },
  {
    slug: 'fellows-driving-institutional-reform',
    title: 'Change begins inside institutions',
    excerpt: 'Meet the fellows bringing fresh thinking, integrity and energy to public service.',
    publishedAt: '2025-11-02',
    image: eplHomeImages.gallery[3].src,
  },
]

const fallbackStats: HomeStat[] = [
  { value: '500+', label: 'Fellows' },
  { value: '12+', label: 'Public Institutions' },
  { value: '8', label: 'Cohorts' },
  { value: '85%', label: 'Career Advancement' },
]

export function ChariticsHome({
  settings,
  sections,
  heroSlides,
  heroAvatars = [],
  aboutMission,
  stats: statsProp,
  heroCurve,
  eplWay,
  impactStories,
  news,
  projects,
  events,
  testimonials,
}: ChariticsHomeProps) {
  const hero = heroSlides?.[0]
  const heroImage = hero?.image ?? getMediaUrl(settings.heroImage) ?? eplHomeImages.heroDefault
  const fromCms = (heroSlides ?? []).map((slide) => slide.image).filter(Boolean)
  const fromDefaults = heroImageSlides.map((slide) => slide.image)
  const heroImages = [...fromCms, ...fromDefaults, heroImage]
    .filter((src, index, list) => Boolean(src) && list.indexOf(src) === index)
    .slice(0, 3)
  const cmsProjectCards = projects.slice(0, 4).map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category ?? 'Programme',
    summary: project.summary,
    image:
      resolveProjectImage(project.slug, getMediaUrl(project.featuredImage)) ??
      eplHomeImages.projects['public-service-fellowship'],
  }))
  const projectCards = fallbackProjects.map(
    (fallback) => cmsProjectCards.find((project) => project.slug === fallback.slug) ?? fallback,
  )
  const storyCards = news.length
    ? news.slice(0, 3).map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        image: getMediaUrl(post.featuredImage) ?? eplHomeImages.news.graduation,
      }))
    : fallbackNews
  const peopleImages = heroAvatars.length ? heroAvatars : Object.values(eplHomeImages.fellows)
  const stats = statsProp?.length ? statsProp : fallbackStats
  const wayCards =
    eplWay?.length
      ? eplWay
      : ([
          {
            number: '01',
            title: 'Think Critically',
            description: 'Analytical rigour and strategic problem-solving.',
            image: aboutMission?.image ?? eplHomeImages.aboutBlock,
            tone: 'blue',
            href: '/about/what-we-do',
          },
          {
            number: '02',
            title: 'Act Ethically',
            description: 'Integrity, transparency and values-led service.',
            image: eplHomeImages.gallery[1].src,
            tone: 'navy',
            href: '/about/what-we-do',
          },
          {
            number: '03',
            title: 'Drive Change',
            description: 'Transforming institutions and local communities.',
            image: eplHomeImages.gallery[3].src,
            tone: 'gold',
            href: '/about/what-we-do',
          },
        ] satisfies HomeEplWayItem[])
  const stories = impactStories ?? {
    eyebrow: 'Impact stories',
    title: 'Beyond the Numbers',
    ctaLabel: 'Meet more fellows',
    ctaUrl: '/community/current-fellows',
    featured: {
      name: 'Abena Osei-Bonsu',
      cohort: 'Cohort 3',
      institution: 'Ministry of Finance',
      quote:
        "EPL didn't just teach me to lead. It showed me what leadership in service to Ghana truly means.",
      image: peopleImages[0],
      storyHref: '/community/current-fellows',
    },
    secondary: [
      {
        cohort: 'Cohort 7',
        name: 'Kwame Asante',
        institution: 'Ghana Health Service',
        quote: 'The fellowship transformed how I see my role in public health.',
        image: peopleImages[1] ?? peopleImages[0],
      },
      {
        cohort: 'Cohort 8',
        name: 'Efua Mensah',
        institution: 'Accra Metropolitan Assembly',
        quote: 'EPL gave me the tools and the community to drive real change from within.',
        image: peopleImages[2] ?? peopleImages[0],
      },
    ],
  }
  const featuredStory = stories.featured
  const cmsEvent = events.find(
    (item) => item.eventDate && new Date(item.eventDate).getTime() > Date.now(),
  )
  const event = cmsEvent ?? {
    id: 'annual-leadership-forum-2026',
    slug: 'annual-leadership-forum-2026',
    title: 'EPL Annual Leadership Forum 2026',
    excerpt:
      "A full-day gathering of Ghana's emerging and established public leaders — featuring keynote addresses, panel discussions, networking and the formal welcome of Cohort 9.",
    eventDate: '2026-09-15T09:00:00.000Z',
    venue: 'Accra International Conference Centre, Accra',
    featuredImage: null,
  }
  void testimonials

  return (
    <main className="epl-new-home">
      <ChariticsHomeHero
        description={
          settings.heroDescription ||
          'Developing ethical, critical-thinking and change-driven public leaders to strengthen the institutions that serve us all.'
        }
        images={heroImages}
        title={settings.heroTitle || 'Growing leaders. Building a better Ghana.'}
      />

      <ChariticsHeroCurve
        ctaLabel={heroCurve?.ctaLabel}
        ctaUrl={heroCurve?.ctaUrl}
        description={heroCurve?.description}
        eyebrow={heroCurve?.eyebrow}
        title={heroCurve?.title}
      />

      <ChariticsHomeStats stats={stats} />

      <MotionReveal as="section" className="epl-way-section">
        <div className="epl-new-shell">
          <div className="epl-way-section__head">
            <span className="epl-new-kicker">How we lead</span>
            <h2>The EPL Way</h2>
            <p>
              We develop leaders who bring clear thinking, strong values and purposeful action to
              public service.
            </p>
          </div>
          <MotionReveal className="epl-way-grid" stagger>
            {wayCards.map((item) => (
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
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <b>Learn more →</b>
                  </div>
                </Link>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <ChariticsProgrammeStack
        eyebrow={sections?.projects.eyebrow ?? 'Our Work'}
        projects={projectCards}
        title={sections?.projects.title ?? 'Explore Our Projects'}
      />

      <MotionReveal as="section" className="epl-impact-stories epl-textured-paper">
        <div className="epl-new-shell">
          <div className="epl-new-section-head">
            <div>
              <span className="epl-new-kicker">{stories.eyebrow}</span>
              <h2>{stories.title}</h2>
            </div>
            <Link className="epl-new-text-action" href={stories.ctaUrl}>
              {stories.ctaLabel} <span>→</span>
            </Link>
          </div>
          <div className="epl-impact-stories__grid">
            {featuredStory ? (
              <MotionReveal as="article" className="epl-impact-feature">
                <div className="epl-impact-feature__image">
                  <img
                    alt={`${featuredStory.name}, EPL Ghana fellow`}
                    decoding="async"
                    loading="lazy"
                    src={featuredStory.image}
                  />
                  <span>Featured story</span>
                </div>
                <div className="epl-impact-feature__copy">
                  <span>Leadership in action</span>
                  <h3>From Fellow to Policy Leader</h3>
                  <p className="epl-impact-person">
                    {[featuredStory.name, featuredStory.cohort, featuredStory.institution]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <blockquote>“{featuredStory.quote}”</blockquote>
                  <Link
                    className="epl-new-text-action"
                    href={featuredStory.storyHref || stories.ctaUrl}
                  >
                    Read her story <span>→</span>
                  </Link>
                </div>
              </MotionReveal>
            ) : null}
            <MotionReveal className="epl-impact-stories__secondary" stagger>
              {stories.secondary.map((story) => (
                <MotionItem key={story.name}>
                  <article className="epl-impact-mini">
                    <img
                      alt={`${story.name}, EPL Ghana fellow`}
                      decoding="async"
                      loading="lazy"
                      src={story.image}
                    />
                    <div>
                      <span>{story.cohort}</span>
                      <h3>{story.name}</h3>
                      <p>{story.institution}</p>
                      <blockquote>“{story.quote}”</blockquote>
                    </div>
                  </article>
                </MotionItem>
              ))}
            </MotionReveal>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="epl-new-stories epl-new-shell">
        <div className="epl-new-section-head">
          <div>
            <span className="epl-new-kicker">Updates & events</span>
            <h2>Latest Updates from EPL Ghana</h2>
          </div>
          <Link className="epl-new-text-action" href="/news">
            Read all stories <span>→</span>
          </Link>
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
                <span className="epl-latest-event__meta-icon">□</span>
                <div>
                  <dt>Date</dt>
                  <dd>{formatDate(event.eventDate)}</dd>
                </div>
              </div>
              <div>
                <span className="epl-latest-event__meta-icon epl-latest-event__meta-icon--gold">
                  ⌖
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
        <div className="epl-latest-news-label">
          <span>Latest stories</span>
          <span>News · Insights · Fellows</span>
        </div>
            <MotionReveal className="epl-news-card-grid" stagger>
          {storyCards.slice(0, 3).map((story, index) => (
            <MotionItem className="epl-motion-cell" key={story.slug}>
              <article className="epl-news-card">
                <Link href={`/news/${story.slug}`}>
                  <div className="epl-news-card__image">
                    <img
                      alt={story.title}
                      decoding="async"
                      loading="lazy"
                      src={story.image}
                    />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="epl-news-card__copy">
                    <time>{formatDate(story.publishedAt)}</time>
                    <h3>{story.title}</h3>
                    <p>{story.excerpt}</p>
                    <b>
                      Read story <span>→</span>
                    </b>
                  </div>
                </Link>
              </article>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>
    </main>
  )
}
