'use client'

import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import { TeamMemberDrawer } from '@/components/charitics/TeamMemberDrawer'
import { TeamMemberPhoto } from '@/components/charitics/TeamMemberPhoto'
import { executiveToTeamMember, type EplanExecutive } from '@/config/alumniPageContent'
import type { TeamMember } from '@/config/teamPageContent'
import type { EplanPageContent } from '@/utilities/getEplanPageContent'

type ChariticsAlumniPageProps = {
  content: EplanPageContent
}

export function ChariticsAlumniPage({ content }: ChariticsAlumniPageProps) {
  const { hero, sustain, vision, mission, executives, spotlight } = content
  const members = executives.items

  const [mounted, setMounted] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [slideDirection, setSlideDirection] = useState(1)

  const teamMembers: TeamMember[] = useMemo(
    () => members.map(executiveToTeamMember),
    [members],
  )

  const selectedIndex = useMemo(
    () => teamMembers.findIndex((member) => member.id === selectedId),
    [selectedId, teamMembers],
  )
  const selected = selectedIndex >= 0 ? teamMembers[selectedIndex] : null

  const openMember = useCallback((member: EplanExecutive) => {
    setSelectedId(member.id)
    setIsDrawerOpen(true)
  }, [])

  const closePanel = useCallback(() => {
    setIsDrawerOpen(false)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedId(null)
  }, [])

  const goToMember = useCallback(
    (direction: -1 | 1) => {
      if (selectedIndex < 0 || teamMembers.length === 0) return
      setSlideDirection(direction)
      const nextIndex = (selectedIndex + direction + teamMembers.length) % teamMembers.length
      setSelectedId(teamMembers[nextIndex].id)
    },
    [selectedIndex, teamMembers],
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
      if (event.key === 'ArrowRight') goToMember(1)
      if (event.key === 'ArrowLeft') goToMember(-1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closePanel, goToMember, isDrawerOpen])

  return (
    <div className="figma-eplan-page">
      <section className="figma-eplan-hero">
        <div className="figma-eplan-hero__bg" style={{ backgroundImage: `url(${hero.image})` }} />
        <div className="figma-eplan-hero__overlay" />
        <div className="figma-eplan-hero__content">
          <div className="figma-eplan-hero__copy">
            <div className="figma-impact-kicker">
              <span className="figma-impact-kicker__line" />
              <span>{hero.eyebrow.toUpperCase()}</span>
            </div>
            <h1>{hero.title}</h1>
            <p>{hero.lead}</p>
            <div className="figma-eplan-hero__actions">
              <Link className="figma-eplan-btn figma-eplan-btn--gold" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </Link>
              <Link className="figma-eplan-btn figma-eplan-btn--outline" href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="figma-eplan-stats">
        <div className="epl-new-shell">
          <div className="figma-eplan-stats__grid">
            {hero.highlights.map((stat, index) => (
              <div className="figma-eplan-stats__item" key={stat.label}>
                <div
                  className={`figma-eplan-stats__value${index % 2 === 0 ? ' figma-eplan-stats__value--gold' : ''}`}
                >
                  {stat.value}
                </div>
                <div className="figma-eplan-stats__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="figma-eplan-vision">
        <div className="figma-eplan-vision__inner">
          <div className="figma-eplan-vision__kicker">
            <span className="figma-impact-kicker__line" />
            <span>{vision.eyebrow.toUpperCase()}</span>
            <span className="figma-impact-kicker__line" />
          </div>
          <h2 className="figma-eplan-vision__statement">{vision.text}</h2>
        </div>
      </section>

      <section className="figma-eplan-vision figma-eplan-vision--mission">
        <div className="figma-eplan-vision__inner">
          <div className="figma-eplan-vision__kicker">
            <span className="figma-impact-kicker__line" />
            <span>{mission.eyebrow.toUpperCase()}</span>
            <span className="figma-impact-kicker__line" />
          </div>
          <h2 className="figma-eplan-vision__statement">{mission.text}</h2>
        </div>
      </section>

      {members.length > 0 ? (
        <section className="figma-eplan-executives">
          <div className="epl-new-shell">
            <div className="figma-eplan-executives__head">
              <div className="figma-impact-kicker figma-impact-kicker--blue">
                <span className="figma-impact-kicker__line" />
                <span>{executives.eyebrow.toUpperCase()}</span>
              </div>
              <h2>{executives.title}</h2>
              <p>{executives.intro}</p>
            </div>
            <div className="figma-eplan-executives__grid">
              {members.map((member) => (
                <button
                  aria-label={`View profile for ${member.role}`}
                  className={`figma-eplan-executive${member.id === selectedId ? ' is-active' : ''}`}
                  key={member.id}
                  onClick={() => openMember(member)}
                  type="button"
                >
                  <div className="figma-eplan-executive__photo">
                    <TeamMemberPhoto alt={member.name} src={member.photo} />
                    <span className="figma-eplan-executive__view">View profile</span>
                  </div>
                  <span className="figma-eplan-executive__role">{member.role}</span>
                  <span className="figma-eplan-executive__name">{member.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="figma-eplan-sustain">
        <div className="epl-new-shell">
          <div className="figma-eplan-sustain__intro">
            <div className="figma-eplan-sustain__copy">
              <div className="figma-impact-kicker figma-impact-kicker--blue">
                <span className="figma-impact-kicker__line" />
                <span>{sustain.eyebrow.toUpperCase()}</span>
              </div>
              <h2>{sustain.title}</h2>
              <p className="figma-eplan-sustain__lead">{sustain.lead}</p>
              <p className="figma-eplan-sustain__note">{sustain.note}</p>
            </div>
            <div className="figma-eplan-sustain__media">
              <ProjectDetailImage
                alt={sustain.imageAlt}
                className="w-full h-full object-cover"
                fallbackClass="epl-project-card-visual"
                src={sustain.image}
              />
            </div>
          </div>

          <div className="figma-eplan-pillars">
            {sustain.pillars.map((pillar) => (
              <article className="figma-eplan-pillar" key={pillar.num}>
                <div className="figma-eplan-pillar__num">{pillar.num}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="figma-eplan-spotlight">
        <div className="epl-new-shell">
          <div className="figma-eplan-spotlight__head">
            <div>
              <div className="figma-impact-kicker figma-impact-kicker--blue">
                <span className="figma-impact-kicker__line" />
                <span>{spotlight.eyebrow.toUpperCase()}</span>
              </div>
              <h2>{spotlight.title}</h2>
            </div>
            <p>{spotlight.intro}</p>
          </div>

          <div className="figma-eplan-spotlight__grid">
            {spotlight.items.map((item) => (
              <Link
                className="figma-eplan-spotlight-card"
                href={item.href || '/news'}
                key={item.title}
              >
                <div className="figma-eplan-spotlight-card__media">
                  <ProjectDetailImage
                    alt={item.title}
                    className="w-full h-full object-cover"
                    fallbackClass="epl-project-card-visual"
                    src={item.image}
                  />
                  <span className="figma-eplan-spotlight-card__tag">{item.tag}</span>
                </div>
                <div className="figma-eplan-spotlight-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="figma-eplan-spotlight__cta">
            <Link className="figma-eplan-btn figma-eplan-btn--primary" href={spotlight.supportCta.href}>
              {spotlight.supportCta.label}
            </Link>
          </div>
        </div>
      </section>

      {mounted && typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence mode="wait" onExitComplete={clearSelection}>
              {isDrawerOpen && selected ? (
                <TeamMemberDrawer
                  activeTabLabel="EPLAN Executive"
                  key="epl-eplan-executive-drawer"
                  member={selected}
                  memberIndex={selectedIndex}
                  memberTotal={teamMembers.length}
                  onClose={closePanel}
                  onNext={() => goToMember(1)}
                  onPrev={() => goToMember(-1)}
                  slideDirection={slideDirection}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  )
}
