'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import type { BlogPostSummary } from '@/config/blogContent'
import { EPL_MEDIA, eplHomeImages } from '@/config/eplMedia'
import type { BlogListingMeta } from '@/utilities/getBlogPosts'
import { formatDate } from '@/utilities/formatDate'

type ChariticsBlogListingPageProps = {
  meta?: BlogListingMeta
  posts?: BlogPostSummary[]
  recentPosts?: BlogPostSummary[]
  searchQuery?: string
  activeCategory?: string
}

const EVENT_TABS = ['ALL EVENTS', 'EPL GHANA HOSTED', 'PARTNERED EVENT', 'UPCOMING EVENT'] as const

const events = [
  {
    id: 'e-1',
    tag: 'EPL HOSTED',
    category: 'EPL GHANA HOSTED',
    title: 'EPL Annual Public Leadership Forum 2026',
    description:
      'A full-day flagship convening bringing together current fellows, government heads, and institutional partners to examine ethical governance in Ghana.',
    date: '15 September 2026 · 09:00 AM - 04:30 PM',
    location: 'Accra International Conference Centre',
    image: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
  },
  {
    id: 'e-2',
    tag: 'PARTNERED EVENT',
    category: 'PARTNERED EVENT',
    title: 'Civil Service Innovation & Digital Governance Summit',
    description:
      'Co-hosted with the Ministry of Communications and UNDP Ghana to discuss institutional automation and public sector data frameworks.',
    date: '28 October 2026 · 10:00 AM - 03:00 PM',
    location: 'Kempinski Hotel Gold Coast City, Accra',
    image: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
  },
  {
    id: 'e-3',
    tag: 'UPCOMING EVENT',
    category: 'UPCOMING EVENT',
    title: 'Public Sector Career Masterclass & Fellowship Info Session',
    description:
      'An orientation for prospective young public servants covering fellowship eligibility, interview prep, and placements.',
    date: '12 November 2026 · 02:00 PM - 05:00 PM',
    location: 'Virtual (Zoom Live Stream)',
    image: `${EPL_MEDIA}/2025/10/CSRAW56-scaled-e1760539041848.jpg`,
  },
  {
    id: 'e-4',
    tag: 'EPL HOSTED',
    category: 'EPL GHANA HOSTED',
    title: 'Women in Governance Roundtable: Breaking Ceilings',
    description:
      'An interactive dialogue celebrating the leadership journeys of women leading critical ministries and civil service departments.',
    date: '05 December 2026 · 11:00 AM - 02:30 PM',
    location: 'Civil Service Training Centre, Accra',
    image: `${EPL_MEDIA}/2025/10/CSP96-scaled-e1760539888346.jpeg`,
  },
]

const fallbackArticles = [
  {
    slug: 'equipping-public-servants-gender-responsive-governance',
    tag: 'NEWS',
    meta: '3 NOVEMBER 2025 · EPL GHANA',
    title: 'Equipping Public Servants for Gender-Responsive Governance: GDO Sensitisation Workshop Held in May 2025',
    excerpt:
      'On May 13, 2025, the National Gender Diversity Taskforce and the Civil Service Training Centre convened public servants for a gender-responsive governance workshop.',
    image: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
  },
  {
    slug: 'inspiring-next-generation-inclusive-leaders',
    tag: 'NEWS',
    meta: '3 NOVEMBER 2025 · EPL GHANA',
    title: 'Inspiring the Next Generation of Inclusive Leaders: EPL Ghana’s Empowerment and Leadership Tour, June 2025',
    excerpt:
      'From June 2 to 6, 2025, Emerging Public Leaders of Ghana embarked on an Empowerment and Leadership Tour connecting fellows with institutions shaping inclusive governance.',
    image: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
  },
  {
    slug: 'validating-gender-inclusion-civil-service-sop',
    tag: 'NEWS',
    meta: '31 OCTOBER 2025 · EPL GHANA',
    title: 'Validating Gender Inclusion: Civil Service Finalises Gender Mainstreaming SOP in May 2025',
    excerpt:
      'On May 11, 2025, the Office of the Head of Civil Service, in collaboration with EPL Ghana, hosted a high-level validation session for Ghana’s gender mainstreaming SOP.',
    image: `${EPL_MEDIA}/2025/10/CSP64-scaled-e1760540014318.jpeg`,
  },
  {
    slug: 'april-2025-national-gender-diversity-taskforce',
    tag: 'NEWS',
    meta: '30 OCTOBER 2025 · EPL GHANA',
    title: 'Highlights from the April 2025 National Gender Diversity Taskforce Meeting',
    excerpt:
      'On April 8, 2025, the National Gender Diversity Taskforce, supported by EPL Ghana, convened to advance gender equity across Ghana’s public service.',
    image: `${EPL_MEDIA}/2025/10/IMG_7245-scaled.jpg`,
  },
]

export function ChariticsBlogListingPage({ posts = [] }: ChariticsBlogListingPageProps) {
  const [selectedEventTab, setSelectedEventTab] = useState<(typeof EVENT_TABS)[number]>('ALL EVENTS')

  const displayArticles = useMemo(() => {
    if (posts.length > 0) {
      return posts.map((post, index) => ({
        slug: post.slug,
        tag: post.categorySlug === 'blog-posts' ? 'BLOG' : 'NEWS',
        meta: `${formatDate(post.publishedAt).toUpperCase()} · EPL GHANA`,
        title: post.title,
        excerpt: post.excerpt,
        image: post.image || fallbackArticles[index % fallbackArticles.length].image,
      }))
    }
    return fallbackArticles
  }, [posts])

  const filteredEvents = useMemo(() => {
    if (selectedEventTab === 'ALL EVENTS') return events
    return events.filter((event) => event.category === selectedEventTab)
  }, [selectedEventTab])

  return (
    <div className="figma-news-page">
      <section className="figma-news-hero">
        <div className="figma-news-hero__bg" style={{ backgroundImage: `url(${eplHomeImages.aboutMain})` }} />
        <div className="figma-news-hero__overlay" />
        <div className="figma-news-hero__content">
          <div className="figma-news-hero__copy">
            <div className="figma-impact-kicker">
              <span className="figma-impact-kicker__line" />
              <span>UPDATES &amp; ENGAGEMENT</span>
            </div>
            <h1>News &amp; Insights</h1>
            <p>
              Stay updated with our public sector events, fellow recruitment opportunities, and thought leadership pieces.
            </p>
          </div>
        </div>
      </section>

      <section className="figma-news-events" id="events">
        <div className="epl-new-shell">
          <div className="figma-news-events__head">
            <div>
              <div className="figma-impact-kicker figma-impact-kicker--blue">
                <span className="figma-impact-kicker__line" />
                <span>CONVENINGS &amp; FORUMS</span>
              </div>
              <h2>Events &amp; Summits</h2>
            </div>
            <div className="figma-news-events__tabs">
              {EVENT_TABS.map((tab) => (
                <button
                  key={tab}
                  className={`figma-news-events__tab${selectedEventTab === tab ? ' is-active' : ''}`}
                  onClick={() => setSelectedEventTab(tab)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="figma-news-events__grid">
            {filteredEvents.map((event) => (
              <article className="figma-news-event-card" key={event.id}>
                <div className="figma-news-event-card__media">
                  <img alt={event.title} src={event.image} />
                  <span className="figma-news-event-card__tag">{event.tag}</span>
                </div>
                <div className="figma-news-event-card__body">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="figma-news-event-card__meta">
                    <p>
                      <span className="figma-news-event-card__meta-label">Date:</span>
                      {event.date}
                    </p>
                    <p className="figma-news-event-card__location">
                      <span aria-hidden className="figma-news-event-card__pin" />
                      {event.location}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="figma-news-opportunities" id="opportunities">
        <div className="epl-new-shell figma-news-opportunities__shell">
          <div className="figma-news-opportunities__head">
            <div className="figma-news-opportunities__kicker">
              <span className="figma-impact-kicker__line" />
              <span>JOIN THE MOVEMENT</span>
              <span className="figma-impact-kicker__line" />
            </div>
            <h2>Opportunities at EPL Ghana</h2>
            <p>
              Whether launching your public service career or contributing your skills as a community volunteer, discover
              open pathways below.
            </p>
          </div>

          <div className="figma-news-opportunities__grid">
            <article className="figma-news-opportunity-card">
              <div className="figma-news-opportunity-card__num figma-news-opportunity-card__num--blue">01</div>
              <span className="figma-news-opportunity-card__label figma-news-opportunity-card__label--gold">
                RECRUITMENT OPEN
              </span>
              <h3>Apply to be a Fellow</h3>
              <p>
                A competitive 12-month public service leadership program placing high-achieving university graduates
                directly inside Ghana&apos;s government ministries, departments, and regional agencies.
              </p>
              <ul>
                <li>✓ Full monthly stipend &amp; placement coverage</li>
                <li>✓ 1-on-1 executive mentoring from senior public leaders</li>
                <li>✓ Intensive public administration &amp; ethics curriculum</li>
              </ul>
              <Link className="figma-news-btn figma-news-btn--primary" href="/projects/public-service-fellowship">
                APPLY FOR FELLOWSHIP →
              </Link>
            </article>

            <article className="figma-news-opportunity-card">
              <div className="figma-news-opportunity-card__num figma-news-opportunity-card__num--gold">02</div>
              <span className="figma-news-opportunity-card__label figma-news-opportunity-card__label--blue">
                COMMUNITY ACTION
              </span>
              <h3>Volunteer with EPL Ghana</h3>
              <p>
                Lend your technical, organizational, or creative skills to support public service forums, community
                audits, field surveys, and fellow training hackathons across the country.
              </p>
              <ul>
                <li>✓ Event coordination &amp; logistics support</li>
                <li>✓ Research assistance &amp; community data collection</li>
                <li>✓ Media, photojournalism &amp; storytelling tasks</li>
              </ul>
              <Link className="figma-news-btn figma-news-btn--outline" href="/get-involved">
                REGISTER AS VOLUNTEER →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="figma-news-articles" id="blogs">
        <div className="epl-new-shell">
          <div className="figma-news-articles__head">
            <div className="figma-impact-kicker figma-impact-kicker--blue">
              <span className="figma-impact-kicker__line" />
              <span>ARTICLES &amp; THOUGHT LEADERSHIP</span>
            </div>
            <h2>News &amp; Blog Posts</h2>
          </div>

          <div className="figma-news-articles__grid">
            {displayArticles.slice(0, 4).map((article) => (
              <article className="figma-news-article-card" key={article.slug}>
                <div className="figma-news-article-card__media">
                  <img alt={article.title} src={article.image} />
                  <span
                    className={`figma-news-article-card__tag${
                      article.tag === 'BLOG' ? ' figma-news-article-card__tag--blog' : ''
                    }`}
                  >
                    {article.tag}
                  </span>
                </div>
                <div className="figma-news-article-card__body">
                  <span className="figma-news-article-card__meta">{article.meta}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="figma-news-article-card__footer">
                    <Link href={`/news/${article.slug}`}>READ FULL STORY →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="figma-news-articles__cta">
            <Link className="figma-news-btn figma-news-btn--primary" href="/news/all">
              VIEW ALL NEWS &amp; BLOG POSTS →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
