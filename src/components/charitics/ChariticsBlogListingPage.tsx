'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { EPL_MEDIA, eplHomeImages } from '@/config/eplMedia'
import type { BlogPostSummary } from '@/config/blogContent'
import type { BlogListingMeta } from '@/utilities/getBlogPosts'
import { formatDate } from '@/utilities/formatDate'

type ChariticsBlogListingPageProps = {
  meta?: BlogListingMeta
  posts?: BlogPostSummary[]
  recentPosts?: BlogPostSummary[]
  searchQuery?: string
  activeCategory?: string
}

export function ChariticsBlogListingPage({
  posts = [],
}: ChariticsBlogListingPageProps) {
  const [selectedEventTab, setSelectedEventTab] = useState<string>('ALL EVENTS')

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
      image: `${EPL_MEDIA}/2025/10/CSOT-78-scaled.jpg`,
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
      slug: 'inducts-largest-cohort',
      tag: 'NEWS',
      meta: '12 AUGUST 2026 · EPL COMMUNICATIONS',
      title: 'EPL Ghana Inducts Largest Cohort to Date Across 15 Public Institutions',
      excerpt:
        'Emerging Public Leaders of Ghana formally placed over 60 exceptional young public servants into key government directorates.',
      image: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
    },
    {
      slug: 'ethics-and-digital-competence',
      tag: 'BLOG',
      meta: '28 JULY 2026 · DR. NAA ADJEI-MENSAH',
      title: 'Why Ethics and Digital Competence Are the Twins of Modern Public Service',
      excerpt:
        'Examining how modern governance systems in West Africa require leaders who balance moral conviction with technological proficiency.',
      image: `${EPL_MEDIA}/2025/10/CSOT-78-scaled.jpg`,
    },
    {
      slug: 'cohort-8-regional-waste-audit',
      tag: 'NEWS',
      meta: '15 JULY 2026 · EPL POLICY DESK',
      title: 'Cohort 8 Fellows Complete Regional Waste & Water Audit in Greater Accra',
      excerpt:
        'Fellows stationed across municipal assemblies presented actionable policy frameworks to streamline regional sanitation oversight.',
      image: `${EPL_MEDIA}/2025/10/CSP64-scaled-e1760540014318.jpeg`,
    },
    {
      slug: 'power-of-mentorship',
      tag: 'BLOG',
      meta: '02 JUNE 2026 · KWAME ASANTE (COHORT 7)',
      title: 'The Power of Mentorship: From Recent Graduate to Civil Service Leader',
      excerpt:
        'A personal reflection on how dedicated executive coaching bridges the gap between academic theory and complex civil service dynamics.',
      image: `${EPL_MEDIA}/2025/10/IMG_7245-scaled.jpg`,
    },
  ]

  const displayArticles = useMemo(() => {
    if (posts && posts.length > 0) {
      return posts.map((p, idx) => ({
        slug: p.slug,
        tag: (p.categorySlug === 'blog-posts' ? 'BLOG' : 'NEWS') as string,
        meta: `${formatDate(p.publishedAt).toUpperCase()} · ${(p.author || 'EPL Ghana').toUpperCase()}`,
        title: p.title,
        excerpt: p.excerpt,
        image: p.image || fallbackArticles[idx % fallbackArticles.length].image,
      }))
    }
    return fallbackArticles
  }, [posts])

  const filteredEvents = useMemo(() => {
    if (selectedEventTab === 'ALL EVENTS') return events
    return events.filter((e) => e.category === selectedEventTab)
  }, [selectedEventTab])

  return (
    <div className="figma-news-insights-page">
      {/* 1. Hero Section */}
      <section className="figma-about-hero">
        <div
          className="figma-about-hero__bg"
          style={{ backgroundImage: `url(${eplHomeImages.aboutMain})` }}
        />
        <div className="figma-about-hero__overlay" />
        <div className="figma-about-hero__content">
          <div className="figma-kicker figma-kicker--gold">
            <span className="figma-kicker__line" />
            <span>UPDATES & ENGAGEMENT</span>
          </div>
          <h1>News & Insights</h1>
          <p>
            Stay updated with our public sector events, fellow recruitment opportunities, and thought leadership pieces.
          </p>
        </div>
      </section>

      {/* 2. Convenings & Forums (Events & Summits Section - 2 per row) */}
      <section className="figma-section epl-new-shell" style={{ paddingBlock: '80px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '44px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <div className="figma-kicker figma-kicker--gold">
              <span className="figma-kicker__line" />
              <span>CONVENINGS & FORUMS</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 3.6vw, 48px)', fontWeight: '900', color: '#0C1427', margin: '8px 0 0' }}>
              Events & Summits
            </h2>
          </div>

          {/* Event Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['ALL EVENTS', 'EPL GHANA HOSTED', 'PARTNERED EVENT', 'UPCOMING EVENT'].map((tab) => {
              const isActive = selectedEventTab === tab
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedEventTab(tab)}
                  style={{
                    padding: '10px 18px',
                    fontSize: '11px',
                    fontWeight: '850',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderRadius: '0px',
                    border: '1px solid #e2e5eb',
                    cursor: 'pointer',
                    background: isActive ? '#3F51B5' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#0C1427',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2 Cards Per Row Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: '36px',
          }}
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e5eb',
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(10, 17, 40, 0.04)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '260px', width: '100%', overflow: 'hidden' }}>
                <img
                  alt={event.title}
                  src={event.image}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    fontSize: '11px',
                    fontWeight: '850',
                    color: '#0C1427',
                    background: '#FFC107',
                    padding: '6px 12px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {event.tag}
                </span>
              </div>

              <div style={{ padding: '32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '850', color: '#0C1427', lineHeight: 1.3, margin: '0 0 12px' }}>
                  {event.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#636772', lineHeight: 1.65, margin: '0 0 20px', flex: 1 }}>
                  {event.description}
                </p>

                <div style={{ borderTop: '1px solid #f0f2f5', paddingTop: '16px', fontSize: '13px', color: '#636772' }}>
                  <p style={{ margin: '0 0 6px', fontWeight: '800', color: '#3F51B5' }}>
                    <span style={{ color: '#8891A0', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.08em', marginRight: '6px' }}>DATE:</span>
                    {event.date}
                  </p>
                  <p style={{ margin: 0 }}>📍 {event.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Articles & Thought Leadership Section */}
      <section className="figma-section epl-new-shell" style={{ paddingBlock: '90px', background: '#F8F9FA' }}>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 54px' }}>
          <div className="figma-kicker figma-kicker--gold" style={{ justifyContent: 'center', marginBottom: '12px' }}>
            <span className="figma-kicker__line" />
            <span>ARTICLES & THOUGHT LEADERSHIP</span>
            <span className="figma-kicker__line" />
          </div>
          <h2 style={{ fontSize: 'clamp(34px, 3.8vw, 50px)', fontWeight: '900', color: '#0C1427', margin: 0 }}>
            News & Blog Posts
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {displayArticles.slice(0, 4).map((article) => (
            <article
              key={article.slug}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e5eb',
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(10, 17, 40, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
              }}
            >
              <div style={{ position: 'relative', height: '190px', width: '100%', overflow: 'hidden' }}>
                <img
                  alt={article.title}
                  src={article.image}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    fontSize: '10px',
                    fontWeight: '850',
                    color: article.tag === 'BLOG' ? '#0C1427' : '#ffffff',
                    background: article.tag === 'BLOG' ? '#FFC107' : '#3F51B5',
                    padding: '4px 8px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {article.tag}
                </span>
              </div>

              <div style={{ padding: '20px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '11px', fontWeight: '750', color: '#8891A0', display: 'block', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  {article.meta}
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0C1427', lineHeight: 1.35, margin: '0 0 10px' }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#636772', lineHeight: 1.6, margin: '0 0 20px', flex: 1 }}>
                  {article.excerpt}
                </p>

                <div style={{ borderTop: '1px solid #f0f2f5', paddingTop: '14px' }}>
                  <Link
                    href={`/news/${article.slug}`}
                    style={{
                      fontSize: '12px',
                      fontWeight: '850',
                      color: '#3F51B5',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    READ FULL STORY →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {displayArticles.length > 4 ? (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link className="epl-new-btn epl-new-btn--blue" href="/news/all">
              VIEW ALL NEWS & BLOG POSTS <span>→</span>
            </Link>
          </div>
        ) : null}
      </section>

      {/* 4. Join The Movement Section (Placed down at the bottom of the page before footer) */}
      <section className="figma-section" style={{ paddingBlock: '90px', background: '#FFFFFF' }}>
        <div className="epl-new-shell">
          <div className="figma-section-head" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 54px' }}>
            <div className="figma-kicker figma-kicker--gold" style={{ justifyContent: 'center' }}>
              <span className="figma-kicker__line" />
              <span>JOIN THE MOVEMENT</span>
              <span className="figma-kicker__line" />
            </div>
            <h2 style={{ fontSize: 'clamp(34px, 3.8vw, 50px)', fontWeight: '900', color: '#0C1427', margin: '14px 0 16px' }}>
              Opportunities at EPL Ghana
            </h2>
            <p style={{ fontSize: '18px', color: '#636772', lineHeight: 1.65, margin: 0 }}>
              Whether launching your public service career or contributing your skills as a community volunteer, discover open
              pathways below.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '36px',
            }}
          >
            {/* Card 01: Fellowship */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e5eb',
                borderRadius: '0px',
                padding: '44px 36px',
                boxShadow: '0 10px 30px rgba(10, 17, 40, 0.04)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#3F51B5',
                  color: '#ffffff',
                  fontWeight: '850',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                01
              </div>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '850',
                  color: '#FFC107',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                RECRUITMENT OPEN
              </span>
              <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#0C1427', margin: '0 0 16px' }}>
                Apply to be a Fellow
              </h3>
              <p style={{ fontSize: '15px', color: '#636772', lineHeight: 1.7, marginBottom: '28px', flex: 1 }}>
                A competitive 12-month public service leadership program placing high-achieving university graduates directly
                inside Ghana&apos;s government ministries, departments, and regional agencies.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ fontSize: '14px', color: '#0C1427', fontWeight: '600' }}>
                  ✓ Full monthly stipend & placement coverage
                </li>
                <li style={{ fontSize: '14px', color: '#0C1427', fontWeight: '600' }}>
                  ✓ 1-on-1 executive mentoring from senior public leaders
                </li>
                <li style={{ fontSize: '14px', color: '#0C1427', fontWeight: '600' }}>
                  ✓ Intensive public administration & ethics curriculum
                </li>
              </ul>

              <Link
                href="/projects/public-service-fellowship"
                style={{
                  background: '#3F51B5',
                  color: '#ffffff',
                  fontWeight: '850',
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '16px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block',
                  borderRadius: '0px',
                }}
              >
                APPLY FOR FELLOWSHIP →
              </Link>
            </div>

            {/* Card 02: Volunteer */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e5eb',
                borderRadius: '0px',
                padding: '44px 36px',
                boxShadow: '0 10px 30px rgba(10, 17, 40, 0.04)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#FFC107',
                  color: '#0C1427',
                  fontWeight: '850',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                02
              </div>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '850',
                  color: '#3F51B5',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                COMMUNITY ACTION
              </span>
              <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#0C1427', margin: '0 0 16px' }}>
                Volunteer with EPL Ghana
              </h3>
              <p style={{ fontSize: '15px', color: '#636772', lineHeight: 1.7, marginBottom: '28px', flex: 1 }}>
                Lend your technical, organizational, or creative skills to support public service forums, community audits, field
                surveys, and fellow training hackathons across the country.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ fontSize: '14px', color: '#0C1427', fontWeight: '600' }}>
                  ✓ Event coordination & logistics support
                </li>
                <li style={{ fontSize: '14px', color: '#0C1427', fontWeight: '600' }}>
                  ✓ Research assistance & community data collection
                </li>
                <li style={{ fontSize: '14px', color: '#0C1427', fontWeight: '600' }}>
                  ✓ Media, photojournalism & storytelling tasks
                </li>
              </ul>

              <Link
                href="/get-involved"
                style={{
                  background: '#ffffff',
                  color: '#3F51B5',
                  border: '1.5px solid #3F51B5',
                  fontWeight: '850',
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '16px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block',
                  borderRadius: '0px',
                }}
              >
                REGISTER AS VOLUNTEER →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
