'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { CurrentFellow } from '@/config/currentFellowsContent'
import type { CurrentFellowsPageContent } from '@/utilities/getCurrentFellowsContent'

type ChariticsCurrentFellowsPageProps = {
  content: CurrentFellowsPageContent
}

type FellowDrawerProps = {
  fellow: CurrentFellow
  fellowIndex: number
  fellowTotal: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  slideDirection: number
}

function FellowDrawer({
  fellow,
  fellowIndex,
  fellowTotal,
  onClose,
  onNext,
  onPrev,
  slideDirection,
}: FellowDrawerProps) {
  const socials = [
    fellow.linkedin
      ? { href: fellow.linkedin, icon: 'flaticon-linkedin-big-logo', label: 'LinkedIn' }
      : null,
    fellow.twitter
      ? { href: fellow.twitter, icon: 'flaticon-twitter', label: 'X (Twitter)' }
      : null,
  ].filter(Boolean) as { href: string; icon: string; label: string }[]

  return (
    <div className="epl-team-drawer-root">
      <motion.button
        animate={{ opacity: 1 }}
        aria-label="Close profile"
        className="epl-team-drawer-backdrop"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        key="epl-fellow-drawer-backdrop"
        onClick={onClose}
        transition={{ duration: 0.28 }}
        type="button"
      />

      <motion.aside
        animate={{ x: 0 }}
        aria-labelledby="epl-fellow-drawer-name"
        aria-modal="true"
        className="epl-team-drawer"
        exit={{ x: '100%' }}
        initial={{ x: '100%' }}
        key="epl-fellow-drawer-panel"
        role="dialog"
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
      >
        <div className="epl-team-drawer-header">
          <span className="epl-team-drawer-meta">
            Fellow · {fellowIndex + 1} / {fellowTotal}
          </span>
          <button
            aria-label="Close profile"
            className="epl-team-drawer-close"
            onClick={onClose}
            type="button"
          >
            <i className="flaticon-close"></i>
          </button>
        </div>

        <div className="epl-team-drawer-body">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="epl-team-drawer-content"
              exit={{ opacity: 0, x: slideDirection > 0 ? -56 : 56 }}
              initial={{ opacity: 0, x: slideDirection > 0 ? 56 : -56 }}
              key={fellow.id}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <div className="epl-team-drawer-photo epl-team-drawer-photo--portrait">
                <img alt={fellow.name} src={fellow.photo} />
              </div>

              <span className="epl-team-drawer-eyebrow">Public Service Fellow</span>
              <h2 className="epl-team-drawer-name" id="epl-fellow-drawer-name">
                {fellow.name}
              </h2>
              <p className="epl-team-drawer-role">{fellow.institution}</p>
              {fellow.bio ? <p className="epl-team-drawer-bio">{fellow.bio}</p> : null}

              {socials.length > 0 ? (
                <div className="epl-team-drawer-socials">
                  <span className="epl-team-drawer-socials-label">Connect</span>
                  <div className="epl-team-drawer-socials-links">
                    {socials.map((social) => (
                      <a
                        aria-label={social.label}
                        href={social.href}
                        key={social.label}
                        rel="noreferrer"
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        title={social.label}
                      >
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {fellow.email || fellow.phone ? (
                <ul className="epl-team-drawer-contact">
                  {fellow.email ? (
                    <li>
                      <a href={`mailto:${fellow.email}`}>
                        <i className="flaticon-email"></i>
                        <span>{fellow.email}</span>
                      </a>
                    </li>
                  ) : null}
                  {fellow.phone ? (
                    <li>
                      <a href={`tel:${fellow.phone.replace(/\s/g, '')}`}>
                        <i className="flaticon-telephone-call"></i>
                        <span>{fellow.phone}</span>
                      </a>
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="epl-team-drawer-footer">
          <button
            aria-label="Previous fellow"
            className="epl-team-drawer-nav-btn"
            onClick={onPrev}
            type="button"
          >
            <i className="flaticon-back"></i>
            <span>Previous</span>
          </button>
          <button
            aria-label="Next fellow"
            className="epl-team-drawer-nav-btn"
            onClick={onNext}
            type="button"
          >
            <span>Next</span>
            <i className="flaticon-next"></i>
          </button>
        </div>
      </motion.aside>
    </div>
  )
}

type FellowCardProps = {
  fellow: CurrentFellow
  isActive?: boolean
  onOpen: (fellow: CurrentFellow) => void
}

function FellowCard({ fellow, isActive = false, onOpen }: FellowCardProps) {
  return (
    <article className={`epl-fellow-card${isActive ? ' is-active' : ''}`}>
      <button
        aria-label={`View ${fellow.name}'s profile`}
        className="epl-fellow-card-photo"
        onClick={() => onOpen(fellow)}
        type="button"
      >
        <ProjectDetailImage
          alt={fellow.name}
          className="epl-fellow-card-img"
          fallbackClass="epl-fellow-card-fallback"
          src={fellow.photo}
        />
        <span className="epl-fellow-card-view">View profile</span>
      </button>
      <div className="epl-fellow-card-body">
        <button className="epl-fellow-card-info" onClick={() => onOpen(fellow)} type="button">
          <h3 className="epl-fellow-card-name">{fellow.name}</h3>
          <p className="epl-fellow-card-institution">{fellow.institution}</p>
        </button>
      </div>
    </article>
  )
}

export function ChariticsCurrentFellowsPage({ content }: ChariticsCurrentFellowsPageProps) {
  const { hero, highlights, cohort, cta, fellows } = content
  const [query, setQuery] = useState('')
  const [institutionFilter, setInstitutionFilter] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [slideDirection, setSlideDirection] = useState(1)

  const institutions = useMemo(() => {
    const unique = new Set(fellows.map((fellow) => fellow.institution))
    return Array.from(unique).sort((a, b) => a.localeCompare(b))
  }, [fellows])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return fellows.filter((fellow) => {
      const matchesQuery =
        !q ||
        fellow.name.toLowerCase().includes(q) ||
        fellow.institution.toLowerCase().includes(q)
      const matchesInstitution =
        !institutionFilter || fellow.institution === institutionFilter
      return matchesQuery && matchesInstitution
    })
  }, [fellows, institutionFilter, query])

  const selectedIndex = useMemo(
    () => filtered.findIndex((fellow) => fellow.id === selectedId),
    [filtered, selectedId],
  )
  const selected = selectedIndex >= 0 ? filtered[selectedIndex] : null

  const openFellow = useCallback((fellow: CurrentFellow) => {
    setSelectedId(fellow.id)
    setIsDrawerOpen(true)
  }, [])

  const closePanel = useCallback(() => {
    setIsDrawerOpen(false)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedId(null)
  }, [])

  const goToFellow = useCallback(
    (direction: -1 | 1) => {
      if (selectedIndex < 0 || filtered.length === 0) return
      setSlideDirection(direction)
      const nextIndex = (selectedIndex + direction + filtered.length) % filtered.length
      setSelectedId(filtered[nextIndex].id)
    },
    [filtered, selectedIndex],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  useEffect(() => {
    if (!isDrawerOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePanel()
      if (event.key === 'ArrowRight') goToFellow(1)
      if (event.key === 'ArrowLeft') goToFellow(-1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closePanel, goToFellow, isDrawerOpen])

  useEffect(() => {
    if (selectedId && !filtered.some((fellow) => fellow.id === selectedId)) {
      setIsDrawerOpen(false)
      setSelectedId(null)
    }
  }, [filtered, selectedId])

  return (
    <>
      <section className="epl-fellows-hero ul-section-spacing">
        <div className="ul-container">
          <div className="row ul-bs-row gy-5 align-items-center">
            <div className="col-lg-6">
              <div className="epl-fellows-hero-copy">
                <span className="ul-section-sub-title">{hero.eyebrow}</span>
                <h1 className="ul-section-title epl-fellows-hero-title">{hero.title}</h1>
                <p className="epl-fellows-hero-lead">{hero.lead}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="epl-fellows-hero-media">
                <ProjectDetailImage
                  alt="EPL Ghana fellows"
                  className="epl-fellows-hero-img epl-fellows-hero-img--primary"
                  fallbackClass="epl-fellows-hero-fallback"
                  src={hero.image}
                />
                <ProjectDetailImage
                  alt="Fellows at a programme event"
                  className="epl-fellows-hero-img epl-fellows-hero-img--secondary"
                  fallbackClass="epl-fellows-hero-fallback epl-fellows-hero-fallback--secondary"
                  src={hero.secondaryImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {highlights.items.length > 0 ? (
        <section className="epl-fellows-highlights ul-section-spacing pt-0">
          <div className="ul-container">
            <div className="epl-fellows-section-head">
              <span className="ul-section-sub-title">{highlights.eyebrow}</span>
              <h2 className="ul-section-title">{highlights.title}</h2>
            </div>
            <div className="row ul-bs-row gy-4">
              {highlights.items.map((item) => (
                <div className="col-lg-6" key={item.name}>
                  <article className="epl-fellow-highlight-card">
                    <div className="epl-fellow-highlight-media">
                      <ProjectDetailImage
                        alt={item.name}
                        className="epl-fellow-highlight-img"
                        fallbackClass="epl-fellow-highlight-fallback"
                        src={item.photo}
                      />
                    </div>
                    <div className="epl-fellow-highlight-body">
                      <span className="epl-fellow-highlight-institution">{item.institution}</span>
                      <h3 className="epl-fellow-highlight-name">{item.name}</h3>
                      <p className="epl-fellow-highlight-title">{item.title}</p>
                      <p className="epl-fellow-highlight-text">{item.body}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="epl-fellows-directory ul-section-spacing">
        <div className="ul-container">
          <div className="epl-fellows-section-head epl-fellows-section-head--split">
            <div>
              <span className="ul-section-sub-title">{cohort.label}</span>
              <h2 className="ul-section-title">{cohort.count} fellows serving Ghana</h2>
              <p className="epl-fellows-directory-lead">{cohort.description}</p>
            </div>
            <label className="epl-fellows-search">
              <span className="visually-hidden">Search fellows</span>
              <i aria-hidden className="flaticon-search epl-fellows-search-icon"></i>
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or institution"
                type="search"
                value={query}
              />
            </label>
          </div>

          <div className="epl-fellows-filters" role="group" aria-label="Filter by institution">
            <button
              className={`epl-fellows-filter-chip${institutionFilter === null ? ' is-active' : ''}`}
              onClick={() => setInstitutionFilter(null)}
              type="button"
            >
              All fellows
            </button>
            {institutions.map((institution) => (
              <button
                className={`epl-fellows-filter-chip${
                  institutionFilter === institution ? ' is-active' : ''
                }`}
                key={institution}
                onClick={() =>
                  setInstitutionFilter((current) =>
                    current === institution ? null : institution,
                  )
                }
                type="button"
              >
                {institution}
              </button>
            ))}
          </div>

          <p className="epl-fellows-results-meta">
            Showing <strong>{filtered.length}</strong> of {fellows.length} fellows
          </p>

          <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-1 ul-bs-row epl-fellows-grid">
            {filtered.map((fellow) => (
              <div className="col" key={fellow.id}>
                <FellowCard
                  fellow={fellow}
                  isActive={fellow.id === selectedId}
                  onOpen={openFellow}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="epl-fellows-empty">No fellows match your search.</p>
          ) : null}
        </div>
      </section>

      <section className="epl-fellows-cta">
        <div className="ul-container">
          <div className="epl-fellows-cta-inner">
            <div className="epl-fellows-cta-copy">
              <span className="ul-section-sub-title">Create Your Journey</span>
              <h2 className="ul-section-title">{cta.title}</h2>
              <p className="epl-fellows-cta-text">{cta.body}</p>
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

      {mounted && typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence mode="wait" onExitComplete={clearSelection}>
              {isDrawerOpen && selected ? (
                <FellowDrawer
                  fellow={selected}
                  fellowIndex={selectedIndex}
                  fellowTotal={filtered.length}
                  key="epl-fellow-drawer"
                  onClose={closePanel}
                  onNext={() => goToFellow(1)}
                  onPrev={() => goToFellow(-1)}
                  slideDirection={slideDirection}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  )
}
