'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import type { CurrentFellowsPageContent } from '@/utilities/getCurrentFellowsContent'

type ChariticsCurrentFellowsPageProps = {
  content: CurrentFellowsPageContent
}

type FellowItem = {
  id: string
  name: string
  role?: string
  institution: string
  cohort: string
  cohortId?: string
  photo: string
  bio?: string
}

function currentCommunityStat(stat: { value: string; label: string }) {
  const label = stat.label.trim().toLowerCase()
  if (label === 'cohorts') return { ...stat, value: '8' }
  if (label.includes('institution')) return { ...stat, value: '15+' }
  if (label === 'fellows') return { ...stat, value: '200+' }
  return stat
}

function FellowDrawer({
  fellow,
  fellowIndex,
  fellowTotal,
  onClose,
  onNext,
  onPrev,
}: {
  fellow: FellowItem
  fellowIndex: number
  fellowTotal: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  return (
    <div className="epl-team-drawer-root">
      <motion.button
        animate={{ opacity: 1 }}
        aria-label="Close profile"
        className="epl-team-drawer-backdrop"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        onClick={onClose}
        type="button"
      />
      <motion.aside
        animate={{ x: 0 }}
        aria-labelledby="epl-fellow-drawer-name"
        className="epl-team-drawer"
        exit={{ x: '100%' }}
        initial={{ x: '100%' }}
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
            X
          </button>
        </div>

        <div className="epl-team-drawer-body">
          <div className="epl-team-drawer-photo epl-team-drawer-photo--portrait">
            <img alt={fellow.name} src={fellow.photo} />
          </div>
          <span className="epl-team-drawer-eyebrow">{fellow.cohort}</span>
          <h2 className="epl-team-drawer-name" id="epl-fellow-drawer-name">
            {fellow.name}
          </h2>
          {fellow.role ? <p className="epl-team-drawer-role">{fellow.role}</p> : null}
          {fellow.institution ? (
            <p style={{ margin: '0 0 16px', color: '#636772', fontSize: 15, fontWeight: 600 }}>
              {fellow.institution}
            </p>
          ) : null}
          {fellow.bio ? <p className="epl-team-drawer-bio">{fellow.bio}</p> : null}
        </div>

        <div className="epl-team-drawer-footer">
          <button className="epl-team-drawer-nav-btn" onClick={onPrev} type="button">
            <span>Previous</span>
          </button>
          <button className="epl-team-drawer-nav-btn" onClick={onNext} type="button">
            <span>Next</span>
          </button>
        </div>
      </motion.aside>
    </div>
  )
}

export function ChariticsCurrentFellowsPage({ content }: ChariticsCurrentFellowsPageProps) {
  const { hero, directory, eplanPromo, involve } = content
  const [selectedCohort, setSelectedCohort] = useState(directory.defaultCohort)
  const [query, setQuery] = useState('')
  const [sectorFilter, setSectorFilter] = useState('All')
  const [showAll, setShowAll] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const allFellows = useMemo(() => {
    return (content.fellows ?? []).map((f, i) => ({
      id: f.id ?? `cms-${i}`,
      name: f.name,
      role: f.highlightTitle ?? directory.defaultRoleLabel,
      institution: f.institution,
      cohort: f.cohort?.trim() || 'Cohort',
      cohortId: f.cohortId,
      photo: f.photo,
      bio: f.bio,
    }))
  }, [content.fellows, directory.defaultRoleLabel])

  const sectors = useMemo(() => {
    const list = Array.from(new Set(allFellows.map((f) => f.institution)))
    return ['All', ...list]
  }, [allFellows])

  const filteredFellows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allFellows.filter((f) => {
      const matchesCohort = !selectedCohort || f.cohortId === selectedCohort
      const matchesQuery =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.institution.toLowerCase().includes(q) ||
        Boolean(f.role?.toLowerCase().includes(q))
      const matchesSector = sectorFilter === 'All' || f.institution === sectorFilter
      return matchesCohort && matchesQuery && matchesSector
    })
  }, [allFellows, selectedCohort, query, sectorFilter])

  const visibleCount = directory.initialVisibleCount || 8
  const visibleFellows = useMemo(
    () => (showAll ? filteredFellows : filteredFellows.slice(0, visibleCount)),
    [filteredFellows, showAll, visibleCount],
  )

  const selectedIndex = filteredFellows.findIndex((f) => f.id === selectedId)
  const selectedFellow = selectedIndex >= 0 ? filteredFellows[selectedIndex] : null

  const openFellow = useCallback((f: FellowItem) => setSelectedId(f.id), [])
  const closeFellow = useCallback(() => setSelectedId(null), [])

  const prevFellow = useCallback(() => {
    if (selectedIndex < 0) return
    const nextIndex = (selectedIndex - 1 + filteredFellows.length) % filteredFellows.length
    setSelectedId(filteredFellows[nextIndex].id)
  }, [filteredFellows, selectedIndex])

  const nextFellow = useCallback(() => {
    if (selectedIndex < 0) return
    const nextIndex = (selectedIndex + 1) % filteredFellows.length
    setSelectedId(filteredFellows[nextIndex].id)
  }, [filteredFellows, selectedIndex])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setSelectedCohort(directory.defaultCohort)
  }, [directory.defaultCohort])

  return (
    <div className="figma-community-page">
      <section className="figma-community-hero">
        <div className="figma-community-hero__bg" style={{ backgroundImage: `url(${hero.image})` }} />
        <div className="figma-community-hero__overlay" />
        <div className="figma-community-hero__content">
          <div className="figma-community-hero__copy">
            <div className="figma-impact-kicker">
              <span className="figma-impact-kicker__line" />
              <span>{hero.eyebrow.toUpperCase()}</span>
            </div>
            <h1>{hero.title}</h1>
            <p>{hero.lead}</p>
          </div>
          <div className="figma-community-hero__stats">
            {hero.stats.map(currentCommunityStat).map((stat) => (
              <div className="figma-community-hero__stat" key={stat.label}>
                <div className="figma-community-hero__stat-value">{stat.value}</div>
                <div className="figma-community-hero__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="figma-section epl-new-shell" style={{ paddingBlock: '80px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '36px',
          }}
        >
          {directory.cohortTabs.map((tab) => {
            const isActive = selectedCohort === tab.value
            return (
              <button
                key={tab.value}
                className={`epl-team-tab-btn${isActive ? ' is-active' : ''}`}
                onClick={() => setSelectedCohort(tab.value)}
                style={
                  isActive
                    ? { background: '#3F51B5', color: '#fff', borderColor: '#3F51B5' }
                    : { background: '#fff', color: '#0C1427' }
                }
                type="button"
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            maxWidth: '800px',
            margin: '0 auto 48px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: '260px' }}>
            <input
              onChange={(e) => setQuery(e.target.value)}
              placeholder={directory.searchPlaceholder}
              style={{
                width: '100%',
                padding: '14px 20px',
                border: '1px solid #e2e5eb',
                borderRadius: '0px',
                fontSize: '15px',
                outline: 'none',
              }}
              type="text"
              value={query}
            />
          </div>

          <div style={{ minWidth: '200px' }}>
            <select
              onChange={(e) => setSectorFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px',
                border: '1px solid #e2e5eb',
                borderRadius: '0px',
                fontSize: '15px',
                background: '#fff',
                outline: 'none',
              }}
              value={sectorFilter}
            >
              <option value="All">{directory.sectorFilterLabel}</option>
              {sectors
                .filter((s) => s !== 'All')
                .map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '28px',
          }}
        >
          {visibleFellows.map((fellow) => (
            <div
              key={fellow.id}
              onClick={() => openFellow(fellow)}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e5eb',
                borderRadius: '0px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(10, 17, 40, 0.04)',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div style={{ height: '340px', width: '100%', overflow: 'hidden', background: '#f4f6f9' }}>
                <img
                  alt={fellow.name}
                  src={fellow.photo}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>

              <div style={{ padding: '24px 20px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '850',
                    color: '#3F51B5',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  {fellow.cohort}
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0C1427', margin: '0 0 4px' }}>
                  {fellow.name}
                </h3>
                {fellow.role ? (
                  <p style={{ fontSize: '13px', fontWeight: '750', color: '#3F51B5', margin: '0 0 4px' }}>
                    {fellow.role}
                  </p>
                ) : null}
                <p style={{ fontSize: '13px', color: '#636772', margin: 0 }}>{fellow.institution}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredFellows.length > visibleCount ? (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              className="epl-new-btn epl-new-btn--blue"
              onClick={() => setShowAll((prev) => !prev)}
              type="button"
            >
              {showAll
                ? directory.showLessLabel
                : `${directory.showMoreLabel} (${filteredFellows.length - visibleCount} more)`}
            </button>
          </div>
        ) : null}

        {filteredFellows.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#636772', marginTop: '32px' }}>
            {directory.emptyStateText}
          </p>
        ) : null}
      </section>

      <section className="figma-community-eplan" id="eplan">
        <div className="epl-new-shell figma-community-eplan__inner">
          <div className="figma-impact-kicker figma-impact-kicker--gold">
            <span className="figma-impact-kicker__line" />
            <span>{eplanPromo.eyebrow.toUpperCase()}</span>
          </div>
          <h2>{eplanPromo.title}</h2>
          <p>{eplanPromo.intro}</p>
          <div className="figma-community-eplan__stats">
            {eplanPromo.stats.map(currentCommunityStat).map((stat, index) => (
              <div className="figma-community-eplan__stat" key={stat.label}>
                <div
                  className={`figma-community-eplan__stat-value${index % 2 === 0 ? ' figma-community-eplan__stat-value--gold' : ''}`}
                >
                  {stat.value}
                </div>
                <div className="figma-community-eplan__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
          <Link className="figma-community-eplan__cta" href={eplanPromo.ctaHref}>
            {eplanPromo.ctaLabel} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section className="figma-section epl-textured-band epl-textured-band--light" style={{ paddingBlock: '100px' }}>
        <div className="epl-new-shell">
          <div className="figma-section-head" style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}>
            <div className="figma-kicker figma-kicker--gold" style={{ justifyContent: 'center' }}>
              <span className="figma-kicker__line" />
              <span>{involve.eyebrow}</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 800,
                color: '#101626',
                margin: '14px 0 16px',
              }}
            >
              {involve.title}
            </h2>
            <p
              style={{
                margin: '0 auto 32px',
                color: 'rgba(16,22,38,0.72)',
                fontSize: '18px',
                lineHeight: 1.65,
              }}
            >
              {involve.body}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link className="epl-new-btn epl-new-btn--gold" href={involve.primaryHref}>
                {involve.primaryLabel}
              </Link>
              <Link
                className="epl-new-btn epl-new-btn--blue"
                href={involve.secondaryHref}
                style={{ background: '#0C1427', borderColor: '#0C1427' }}
              >
                {involve.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {mounted && selectedFellow && typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              <FellowDrawer
                fellow={selectedFellow}
                fellowIndex={selectedIndex}
                fellowTotal={filteredFellows.length}
                onClose={closeFellow}
                onNext={nextFellow}
                onPrev={prevFellow}
              />
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  )
}
