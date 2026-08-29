'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { EPL_MEDIA, eplHomeImages } from '@/config/eplMedia'
import type { BlogPostSummary } from '@/config/blogContent'
import type { BlogListingMeta } from '@/utilities/getBlogPosts'
import { formatDate } from '@/utilities/formatDate'

type ChariticsAllNewsPageProps = {
  posts: BlogPostSummary[]
  meta?: BlogListingMeta
}

const ITEMS_PER_PAGE = 10

function cleanCategoryLabel(catSlugOrName: string): string {
  const c = (catSlugOrName || '').toLowerCase()
  if (c.includes('germel')) return 'Gender & Inclusion'
  if (c.includes('blog')) return 'Blog'
  if (c.includes('programme') || c.includes('program')) return 'Programmes'
  if (c.includes('news')) return 'News'
  return catSlugOrName || 'News'
}

export function ChariticsAllNewsPage({ posts = [] }: ChariticsAllNewsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [query, setQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  const fallbackArticles = [
    {
      slug: 'inducts-largest-cohort',
      categoryLabel: 'News',
      meta: '12 August 2026 · EPL Communications',
      title: 'EPL Ghana Inducts Largest Cohort to Date Across 15 Public Institutions',
      excerpt:
        'Emerging Public Leaders of Ghana formally placed over 60 exceptional young public servants into key government directorates.',
      image: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
    },
    {
      slug: 'ethics-and-digital-competence',
      categoryLabel: 'Blog',
      meta: '28 July 2026 · Dr. Naa Adjei-Mensah',
      title: 'Why Ethics and Digital Competence Are the Twins of Modern Public Service',
      excerpt:
        'Examining how modern governance systems in West Africa require leaders who balance moral conviction with technological proficiency.',
      image: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
    },
    {
      slug: 'cohort-8-regional-waste-audit',
      categoryLabel: 'News',
      meta: '15 July 2026 · EPL Policy Desk',
      title: 'Cohort 8 Fellows Complete Regional Waste & Water Audit in Greater Accra',
      excerpt:
        'Fellows stationed across municipal assemblies presented actionable policy frameworks to streamline regional sanitation oversight.',
      image: `${EPL_MEDIA}/2025/10/CSP64-scaled-e1760540014318.jpeg`,
    },
    {
      slug: 'power-of-mentorship',
      categoryLabel: 'Blog',
      meta: '02 June 2026 · Kwame Asante (Cohort 7)',
      title: 'The Power of Mentorship: From Recent Graduate to Civil Service Leader',
      excerpt:
        'A personal reflection on how dedicated executive coaching bridges the gap between academic theory and complex civil service dynamics.',
      image: `${EPL_MEDIA}/2025/10/IMG_7245-scaled.jpg`,
    },
  ]

  const allArticles = useMemo(() => {
    if (posts && posts.length > 0) {
      return posts.map((p, idx) => ({
        slug: p.slug,
        categoryLabel: cleanCategoryLabel(p.categorySlug || p.category),
        meta: `${formatDate(p.publishedAt)} · ${p.author || 'EPL Ghana'}`,
        title: p.title,
        excerpt: p.excerpt,
        image: p.image || fallbackArticles[idx % fallbackArticles.length].image,
      }))
    }
    return fallbackArticles
  }, [posts])

  const categories = useMemo(() => {
    const list = Array.from(new Set(allArticles.map((a) => a.categoryLabel)))
    return ['All', ...list]
  }, [allArticles])

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allArticles.filter((a) => {
      const matchesCategory = selectedCategory === 'All' || a.categoryLabel === selectedCategory
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.meta.toLowerCase().includes(q)

      return matchesCategory && matchesQuery
    })
  }, [allArticles, selectedCategory, query])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, query])

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE)

  const displayedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredArticles, currentPage])

  const startCount = filteredArticles.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0
  const endCount = Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)

  return (
    <div className="figma-all-news-page">
      {/* Hero Banner */}
      <section className="figma-about-hero">
        <div
          className="figma-about-hero__bg"
          style={{ backgroundImage: `url(${eplHomeImages.aboutMain})` }}
        />
        <div className="figma-about-hero__overlay" />
        <div className="figma-about-hero__content">
          <div className="figma-kicker figma-kicker--gold">
            <span className="figma-kicker__line" />
            <span>PUBLICATIONS & INSIGHTS</span>
          </div>
          <h1>All News & Articles</h1>
          <p>
            Explore thought leadership, event recaps, policy frameworks, and fellow reflections from Emerging Public Leaders of Ghana.
          </p>
        </div>
      </section>

      {/* Directory Section */}
      <section className="figma-section epl-new-shell" style={{ paddingBlock: '80px' }}>
        {/* Search & Filter Controls */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '36px',
            flexWrap: 'wrap',
          }}
        >
          {/* Category Chips */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '12px 24px',
                    fontSize: '13px',
                    fontWeight: '850',
                    letterSpacing: '0.04em',
                    borderRadius: '0px',
                    border: '1px solid #e2e5eb',
                    cursor: 'pointer',
                    background: isActive ? '#3F51B5' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#0C1427',
                    boxShadow: isActive ? '0 4px 14px rgba(63, 81, 181, 0.25)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search Input Box */}
          <div style={{ minWidth: '280px', flex: '0 1 360px' }}>
            <input
              type="text"
              placeholder="Search by title, topic, or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px',
                border: '1px solid #e2e5eb',
                borderRadius: '0px',
                fontSize: '14px',
                outline: 'none',
                background: '#FFFFFF',
              }}
            />
          </div>
        </div>

        {/* Results Count Info */}
        <div style={{ marginBottom: '32px', fontSize: '14px', color: '#636772' }}>
          Showing <strong>{startCount} - {endCount}</strong> of <strong>{filteredArticles.length}</strong> articles
        </div>

        {/* Paginated Articles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {displayedArticles.map((article) => (
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
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden', background: '#f4f6f9' }}>
                <img
                  alt={article.title}
                  src={article.image}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    fontSize: '11px',
                    fontWeight: '850',
                    color: article.categoryLabel === 'Gender & Inclusion' ? '#0C1427' : '#ffffff',
                    background: article.categoryLabel === 'Gender & Inclusion' ? '#FFC107' : '#3F51B5',
                    padding: '5px 12px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {article.categoryLabel}
                </span>
              </div>

              <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', fontWeight: '750', color: '#8891A0', display: 'block', marginBottom: '10px' }}>
                  {article.meta}
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: '850', color: '#0C1427', lineHeight: 1.35, margin: '0 0 12px' }}>
                  {article.title}
                </h2>
                <p style={{ fontSize: '14px', color: '#636772', lineHeight: 1.65, margin: '0 0 24px', flex: 1 }}>
                  {article.excerpt}
                </p>

                <div style={{ borderTop: '1px solid #f0f2f5', paddingTop: '16px' }}>
                  <Link
                    href={`/news/${article.slug}`}
                    style={{
                      fontSize: '13px',
                      fontWeight: '850',
                      color: '#3F51B5',
                      letterSpacing: '0.04em',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    Read Full Story <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#636772', marginTop: '60px', fontSize: '16px' }}>
            No articles match your search criteria.
          </p>
        ) : null}

        {/* Pagination Controls */}
        {totalPages > 1 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              marginTop: '56px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              style={{
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: '850',
                borderRadius: '0px',
                border: '1px solid #e2e5eb',
                background: currentPage === 1 ? '#f4f6f9' : '#FFFFFF',
                color: currentPage === 1 ? '#a0a6b5' : '#0C1427',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = currentPage === pageNum
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    width: '42px',
                    height: '42px',
                    fontSize: '14px',
                    fontWeight: '850',
                    borderRadius: '0px',
                    border: '1px solid #e2e5eb',
                    background: isActive ? '#3F51B5' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#0C1427',
                    cursor: 'pointer',
                  }}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              style={{
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: '850',
                borderRadius: '0px',
                border: '1px solid #e2e5eb',
                background: currentPage === totalPages ? '#f4f6f9' : '#FFFFFF',
                color: currentPage === totalPages ? '#a0a6b5' : '#0C1427',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              Next →
            </button>
          </div>
        ) : null}
      </section>
    </div>
  )
}
