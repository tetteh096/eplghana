import Link from 'next/link'

import { ChariticsCoreValues } from '@/components/charitics/ChariticsCoreValues'
import { EventCountdown } from '@/components/charitics/EventCountdown'
import { ChariticsHeroUnified } from '@/components/charitics/ChariticsHeroUnified'
import { ChariticsMissionBanner } from '@/components/charitics/ChariticsMissionBanner'
import { ChariticsGallery } from '@/components/charitics/ChariticsGallery'
import { ChariticsHomeSwipers } from '@/components/charitics/ChariticsHomeSwipers'
import { ChariticsFellowTestimonials } from '@/components/charitics/ChariticsFellowTestimonials'
import { ChariticsPartnerContact } from '@/components/charitics/ChariticsPartnerContact'
import { ChariticsStats } from '@/components/charitics/ChariticsStats'
import { eplHomeImages, resolveProjectImage } from '@/config/eplMedia'
import type { Event, News, Project, SiteSetting, Testimonial } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'
import { formatEventDateBadge } from '@/utilities/formatEventDate'
import type { HeroImageSlide } from '@/config/heroSlides'
import type { GalleryItem, HomeSections } from '@/utilities/getHomeContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { resolveFellowTestimonials } from '@/utilities/resolveFellowTestimonials'

const defaultSections: HomeSections = {
  projects: { eyebrow: 'Our Work', title: 'Explore Our Projects' },
  events: { eyebrow: 'Upcoming Events', title: 'EPL Ghana Event Schedule' },
  blog: {
    eyebrow: 'Latest News',
    title: 'Read Our Latest Updates',
    intro:
      'Stories from our fellows, programs, and public service transformation work across Ghana.',
  },
}

type ChariticsHomeProps = {
  settings: SiteSetting
  sections?: HomeSections
  heroSlides?: HeroImageSlide[]
  heroAvatars?: string[]
  gallery?: GalleryItem[]
  news: News[]
  projects: Project[]
  events: Event[]
  /** When true, `events` are the most recent past events (no upcoming ones). */
  eventsArePast?: boolean
  testimonials: Testimonial[]
}

const fallbackEvents = [
  {
    id: '1',
    slug: '2026-public-service-leadership-forum',
    title: '2026 Public Service Leadership Forum',
    excerpt:
      'National dialogue on integrity, innovation, and inclusive leadership across Ghana’s public institutions.',
    eventDate: '2026-10-20T09:00:00.000Z',
    venue: 'Accra International Conference Centre',
    featuredImage: null,
  },
  {
    id: '2',
    slug: '2026-fellowship-info-session',
    title: '2027 Fellowship Information Session',
    excerpt:
      'Learn about the Public Service Fellowship application process, eligibility, and what to expect during the programme year.',
    eventDate: '2026-12-15T14:00:00.000Z',
    venue: 'East Legon, Accra',
    featuredImage: null,
  },
  {
    id: '3',
    slug: 'women-on-the-rise-forum',
    title: 'Women on the Rise Leadership Forum',
    excerpt:
      'A dialogue on advancing women into senior leadership roles across Ghana’s public institutions.',
    eventDate: '2026-08-20T09:00:00.000Z',
    venue: 'Accra, Ghana',
    featuredImage: null,
  },
  {
    id: '4',
    slug: 'alumni-network-gathering',
    title: 'EPL Alumni Network Gathering',
    excerpt:
      'Reconnect with fellows, alumni, and partners driving public service transformation across the country.',
    eventDate: '2026-11-08T16:00:00.000Z',
    venue: 'No.1 Justice Sarkodee Addo Avenue, East Legon',
    featuredImage: null,
  },
]

const fallbackProjects = [
  {
    slug: 'public-service-fellowship',
    title: 'Public Service Fellowship',
    tag: 'Fellowship',
    img: eplHomeImages.projects['public-service-fellowship'],
    descr:
      'A transformative one-year journey embedding talented graduates within key government institutions.',
  },
  {
    slug: 'women-on-the-rise',
    title: 'Women on the Rise',
    tag: 'Leadership',
    img: eplHomeImages.projects['women-on-the-rise'],
    descr:
      'Addressing systemic barriers that prevent women from attaining higher leadership in public service.',
  },
  {
    slug: 'peace',
    title: 'P.E.A.C.E Fellowship',
    tag: 'Peacebuilding',
    img: eplHomeImages.projects.peace,
    descr:
      'Professionals Engaged Against Conflict & Endangerment, building peace skills in the public sector.',
  },
]

const fallbackNews = [
  {
    id: 'n1',
    slug: 'psf-cohort-vi-graduation',
    title: 'PSF Cohort VI Graduation',
    excerpt: 'Celebrating the graduation of the 6th Cohort of Public Service Fellows.',
    featuredImage: eplHomeImages.news.graduation,
    publishedAt: '2025-07-03',
  },
  {
    id: 'n2',
    slug: 'women-on-the-rise-forum-recap',
    title: 'Women on the Rise: Breaking Leadership Barriers',
    excerpt:
      'Highlights from our forum on advancing women into senior leadership across Ghana’s public institutions.',
    featuredImage: eplHomeImages.gallery[2].src,
    publishedAt: '2025-10-20',
  },
  {
    id: 'n3',
    slug: '2026-fellowship-applications-open',
    title: '2026 Fellowship Applications Now Open',
    excerpt:
      'Applications for the 2026 Public Service Fellowship are open. Learn about eligibility and how to apply.',
    featuredImage: eplHomeImages.projects['public-service-fellowship'],
    publishedAt: '2025-09-15',
  },
  {
    id: 'n4',
    slug: 'peace-fellowship-spotlight',
    title: 'Inside the P.E.A.C.E Fellowship',
    excerpt:
      'How professionals engaged against conflict are building peace skills within the public sector.',
    featuredImage: eplHomeImages.projects.peace,
    publishedAt: '2025-08-12',
  },
  {
    id: 'n5',
    slug: 'fellows-driving-institutional-reform',
    title: 'Fellows Driving Institutional Reform',
    excerpt:
      'Stories from fellows championing integrity and innovation from inside Ghana’s civil service.',
    featuredImage: eplHomeImages.gallery[3].src,
    publishedAt: '2025-11-02',
  },
]

export function ChariticsHome({
  settings,
  sections = defaultSections,
  heroSlides,
  heroAvatars,
  gallery,
  news,
  projects,
  events,
  eventsArePast = false,
  testimonials,
}: ChariticsHomeProps) {
  const projectCards =
    projects.length > 0
      ? projects.map((p) => ({
          slug: p.slug,
          title: p.title,
          tag: p.category ?? 'Project',
          img:
            resolveProjectImage(p.slug, getMediaUrl(p.featuredImage)) ??
            eplHomeImages.projects['public-service-fellowship'],
          descr: p.summary,
        }))
      : fallbackProjects

  const eventCards =
    events.length > 0
      ? events
      : fallbackEvents

  const nextUpcomingEvent = eventCards[0]

  const fellowTestimonials = resolveFellowTestimonials(testimonials)

  const blogSlides = (news.length > 0 ? news : fallbackNews).slice(0, 5)

  return (
    <main className="epl-page-home overflow-hidden">
      <ChariticsHomeSwipers />
      {/* BANNER, one slider: original hero first, then image slides */}
      <ChariticsHeroUnified avatars={heroAvatars} settings={settings} slides={heroSlides} />

      {/* ABOUT, Charitics ul-about */}
      <section className="ul-about epl-about-section ul-section-spacing wow animate__fadeInUp">
        <div className="ul-container">
          <div className="row row-cols-md-2 row-cols-1 align-items-center gy-4 ul-about-row">
            <div className="col">
              <div className="ul-about-imgs">
                <div className="img-wrapper">
                  <img
                    alt="About EPL"
                    src={getMediaUrl(settings.aboutImage) ?? eplHomeImages.aboutMain}
                  />
                </div>
                <div className="ul-about-imgs-vectors">
                  <img
                    alt=""
                    className="vector-1"
                    src="/assets/img/about-img-vector-1.svg"
                  />
                  <img
                    alt=""
                    className="vector-2"
                    src="/assets/img/about-img-vector-2.svg"
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="ul-about-txt">
                <span className="ul-section-sub-title ul-section-sub-title--2">
                  {settings.aboutSubtitle ?? 'Who We Are'}
                </span>
                <h2 className="ul-section-title">
                  {settings.aboutTitle ??
                    'Developing the Next Generation of Public Service Professionals'}
                </h2>
                <p className="ul-section-descr">
                  {settings.aboutDescription ??
                    'At Emerging Public Leaders of Ghana, we believe Ghana’s development rests on strong Public Service institutions. We embed Africa’s brightest young professionals within government to drive change from within.'}
                </p>
                <div className="ul-about-block">
                  <div className="block-left">
                    <div className="block-heading">
                      <div className="icon">
                        <i className="flaticon-love"></i>
                      </div>
                      <h3 className="block-title">Our Mission</h3>
                    </div>
                    <ul className="block-list">
                      <li>Strengthen public institutions from within</li>
                      <li>Develop value-based sector leaders</li>
                    </ul>
                  </div>
                  <div className="block-right">
                    <img alt="" src={eplHomeImages.aboutBlock} />
                  </div>
                </div>
                <div className="ul-about-bottom">
                  <Link className="ul-btn" href={settings.aboutCtaUrl ?? '/about'}>
                    <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                    {settings.aboutCtaLabel ?? 'Explore More'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ul-about-vectors">
          <img alt="" className="vector-1" src="/assets/img/about-vector-1.png" />
        </div>
      </section>

      {/* CORE VALUES, interactive tree */}
      <ChariticsCoreValues settings={settings} />

      {/* MISSION QUOTE, crossfading photo slideshow + overlay */}
      <ChariticsMissionBanner settings={settings} />

      {/* PROJECTS SLIDER, Charitics ul-donations structure */}
      <section className="ul-donations ul-section-spacing overflow-hidden">
        <div className="ul-container">
          <div className="ul-section-heading ul-donations-heading justify-content-between text-center">
            <div className="left">
              <span className="ul-section-sub-title">
                <span className="txt">{sections.projects.eyebrow}</span>
              </span>
              <h2 className="ul-section-title">{sections.projects.title}</h2>
            </div>
            {projectCards.length > 1 ? (
              <div className="ul-slider-nav epl-donations-slider-nav ul-donations-slider-nav">
                <button aria-label="Previous project" className="prev" type="button">
                  <i className="flaticon-back"></i>
                </button>
                <button aria-label="Next project" className="next" type="button">
                  <i className="flaticon-next"></i>
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="ul-container wow animate__fadeInUp">
          <div
            className="epl-donations-slider ul-donations-slider swiper overflow-visible"
            data-slide-count={projectCards.length}
          >
            <div className="swiper-wrapper">
              {projectCards.map((item) => (
                <div className="swiper-slide" key={item.slug}>
                  <div className="ul-donation">
                    <div className="ul-donation-img">
                      <img alt={item.title} src={item.img} />
                      <span className="tag">{item.tag}</span>
                    </div>
                    <div className="ul-donation-txt">
                      <Link className="ul-donation-title" href={`/projects/${item.slug}`}>
                        {item.title}
                      </Link>
                      <p className="ul-donation-descr">{item.descr}</p>
                      <Link className="ul-donation-btn" href={`/projects/${item.slug}`}>
                        Learn more <i className="flaticon-up-right-arrow"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {projectCards.length > 1 ? (
              <div
                aria-hidden
                className="epl-donations-slider-pagination swiper-pagination"
              />
            ) : null}
          </div>
        </div>
      </section>

      {/* STATS, animated count-up counters */}
      <ChariticsStats settings={settings} />

      {/* EVENTS, Charitics ul-events */}
      <section className="ul-events epl-events-section ul-section-spacing pt-0">
        <div className="ul-container">
          <div className="ul-section-heading align-items-center wow animate__fadeInUp">
            <div className="left">
              <span className="ul-section-sub-title">
                {eventsArePast ? 'Past Events' : sections.events.eyebrow}
              </span>
              <h2 className="ul-section-title text-white">
                {eventsArePast ? 'Recent Events' : sections.events.title}
              </h2>
            </div>
            <Link className="ul-btn" href="/news/events">
              <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Explore More
            </Link>
          </div>

          {!eventsArePast && nextUpcomingEvent?.eventDate ? (
            <EventCountdown
              eventDate={nextUpcomingEvent.eventDate}
              slug={nextUpcomingEvent.slug}
              title={nextUpcomingEvent.title}
              venue={nextUpcomingEvent.venue}
            />
          ) : null}

          <div className="ul-events-wrapper">
            <div className="row ul-bs-row row-cols-lg-2 row-cols-1">
              {eventCards.map((event, index) => {
                const badge = formatEventDateBadge(event.eventDate)
                return (
                  <div
                    className="col wow animate__fadeInUp"
                    data-wow-delay={`${index * 0.12}s`}
                    key={event.id ?? event.slug}
                  >
                    <div className="ul-event">
                      <div className="ul-event-img">
                        <img
                          alt={event.title}
                          src={
                            getMediaUrl(event.featuredImage) ??
                            eplHomeImages.events[index % eplHomeImages.events.length]
                          }
                        />
                        <span className="date">
                          {badge.day} <span>{badge.month}</span>
                        </span>
                      </div>
                      <div className="ul-event-txt">
                        <h3 className="ul-event-title">
                          <Link href={`/events/${event.slug}`}>{event.title}</Link>
                        </h3>
                        <p className="ul-event-descr">{event.excerpt}</p>
                        <div className="ul-event-info">
                          <span className="ul-event-info-title">Venue</span>
                          <p className="ul-event-info-descr">{event.venue}</p>
                        </div>
                        <Link className="ul-btn" href={`/events/${event.slug}`}>
                          <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                          Event Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="ul-events-vectors">
          <img alt="" className="vector-2" src="/assets/img/events-vector-2.svg" />
        </div>
      </section>

      {/* TESTIMONIALS, reusable fellow voices component */}
      <ChariticsFellowTestimonials slides={fellowTestimonials} />

      {/* PARTNER / CONTACT, Charitics split form */}
      <ChariticsPartnerContact
        settings={settings}
        formIdPrefix="home"
        image={getMediaUrl(settings.aboutImage) ?? eplHomeImages.gallery[3].src}
      />

      {/* BLOG, latest posts slider (3 visible on desktop) */}
      <section className="ul-blogs ul-section-spacing epl-home-blogs">
        <div className="ul-blogs-container wow animate__fadeInUp">
          <div className="epl-home-blogs__head">
            <div className="ul-section-heading">
              <div className="left">
                <span className="ul-section-sub-title">{sections.blog.eyebrow}</span>
                <h2 className="ul-section-title">{sections.blog.title}</h2>
                <p className="ul-section-descr">{sections.blog.intro}</p>
              </div>
              <div className="epl-blogs-slider-nav ul-blogs-slider-nav ul-slider-nav">
                <button className="prev" type="button" aria-label="Previous blog posts">
                  <i className="flaticon-back"></i>
                </button>
                <button className="next" type="button" aria-label="Next blog posts">
                  <i className="flaticon-next"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="epl-home-blogs__slider-wrap">
            <div
              className="epl-blogs-slider ul-blogs-slider swiper"
              data-slide-count={blogSlides.length}
            >
              <div className="swiper-wrapper">
                {blogSlides.map((post, i) => {
                  const rawImage = 'featuredImage' in post ? post.featuredImage : null
                  const blogImage =
                    getMediaUrl(rawImage) ??
                    (typeof rawImage === 'string' ? rawImage : eplHomeImages.news.graduation)
                  return (
                    <div className="swiper-slide" key={post.id ?? post.slug ?? i}>
                      <div className="ul-blog epl-home-blog-card">
                        <div className="ul-blog-img">
                          <Link href={`/news/${post.slug}`}>
                            <img alt={post.title} src={blogImage} />
                          </Link>
                        </div>
                        <div className="ul-blog-txt">
                          <div className="ul-blog-infos">
                            <div className="ul-blog-info">
                              <span className="icon">
                                <i className="flaticon-calendar"></i>
                              </span>
                              <span className="text">
                                {'publishedAt' in post ? formatDate(post.publishedAt) : 'News'}
                              </span>
                            </div>
                          </div>
                          <Link className="ul-blog-title" href={`/news/${post.slug}`}>
                            {post.title}
                          </Link>
                          <p className="ul-donation-descr epl-home-blog-excerpt">
                            {'excerpt' in post ? post.excerpt : ''}
                          </p>
                          <Link className="ul-blog-btn" href={`/news/${post.slug}`}>
                            Read More{' '}
                            <span className="icon">
                              <i className="flaticon-next"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY, Charitics Home 1 full-bleed autoplay carousel */}
      <ChariticsGallery items={gallery} />
    </main>
  )
}
