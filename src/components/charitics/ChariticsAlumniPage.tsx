'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { AlumniStoriesSection } from '@/components/charitics/AlumniStoriesSection'
import { ChariticsGallery } from '@/components/charitics/ChariticsGallery'
import { ChariticsTeamCard } from '@/components/charitics/ChariticsTeamCard'
import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import {
  alumniToTeamMember,
  type AlumniSpotlight,
} from '@/config/alumniPageContent'
import type { TeamMember } from '@/config/teamPageContent'
import type { EplanPageContent } from '@/utilities/getEplanPageContent'

type ChariticsAlumniPageProps = {
  content: EplanPageContent
}

type AlumniDrawerProps = {
  member: TeamMember
  memberIndex: number
  memberTotal: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  slideDirection: number
}

function AlumniSpotlightDrawer({
  member,
  memberIndex,
  memberTotal,
  onClose,
  onNext,
  onPrev,
  slideDirection,
}: AlumniDrawerProps) {
  const socials = [
    member.linkedin
      ? { href: member.linkedin, icon: 'flaticon-linkedin-big-logo', label: 'LinkedIn' }
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
        key="epl-alumni-drawer-backdrop"
        onClick={onClose}
        transition={{ duration: 0.28 }}
        type="button"
      />

      <motion.aside
        animate={{ x: 0 }}
        aria-labelledby="epl-alumni-drawer-name"
        aria-modal="true"
        className="epl-team-drawer"
        exit={{ x: '100%' }}
        initial={{ x: '100%' }}
        key="epl-alumni-drawer-panel"
        role="dialog"
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
      >
        <div className="epl-team-drawer-header">
          <span className="epl-team-drawer-meta">
            Featured Graduate · {memberIndex + 1} / {memberTotal}
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
              key={member.id}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <div className="epl-team-drawer-photo epl-team-drawer-photo--portrait">
                <img alt={member.name} src={member.photo} />
              </div>

              <span className="epl-team-drawer-eyebrow">EPLAN · PSFN Member</span>
              <h2 className="epl-team-drawer-name" id="epl-alumni-drawer-name">
                {member.name}
              </h2>
              <p className="epl-team-drawer-role">{member.role}</p>
              <p className="epl-team-drawer-bio">{member.bio}</p>

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
                        target="_blank"
                        title={social.label}
                      >
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="epl-team-drawer-footer">
          <button
            aria-label="Previous alumni profile"
            className="epl-team-drawer-nav-btn"
            onClick={onPrev}
            type="button"
          >
            <i className="flaticon-back"></i>
            <span>Previous</span>
          </button>
          <button
            aria-label="Next alumni profile"
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

export function ChariticsAlumniPage({ content }: ChariticsAlumniPageProps) {
  const {
    hero,
    eplanAbout,
    vision,
    convening,
    globalGathering,
    impact,
    journey,
    stories,
    featured,
    pathways,
    milestone,
    gallery,
    news,
    network,
    quote,
    cta,
  } = content

  const featuredMembers = useMemo(
    () => featured.items.map(alumniToTeamMember),
    [featured.items],
  )

  const [activeMemberId, setActiveMemberId] = useState<string | null>(null)
  const [slideDirection, setSlideDirection] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!activeMemberId) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeMemberId])

  const activeIndex = featuredMembers.findIndex((member) => member.id === activeMemberId)
  const activeMember = activeIndex >= 0 ? featuredMembers[activeIndex] : null

  const openMember = useCallback((member: TeamMember) => {
    setActiveMemberId(member.id)
  }, [])

  const closeDrawer = useCallback(() => {
    setActiveMemberId(null)
  }, [])

  const goToMember = useCallback(
    (direction: 1 | -1) => {
      if (activeIndex < 0) return
      setSlideDirection(direction)
      const nextIndex =
        (activeIndex + direction + featuredMembers.length) % featuredMembers.length
      setActiveMemberId(featuredMembers[nextIndex]?.id ?? null)
    },
    [activeIndex, featuredMembers],
  )

  return (
    <>
      <section className="epl-alumni-hero ul-section-spacing">
        <div className="ul-container">
          <div className="row ul-bs-row gy-5 align-items-center">
            <div className="col-lg-5">
              <div className="epl-alumni-hero-copy">
                <span className="ul-section-sub-title">{hero.eyebrow}</span>
                <h1 className="ul-section-title epl-alumni-hero-title">{hero.title}</h1>
                <p className="epl-alumni-hero-subtitle">{hero.subtitle}</p>
                <p className="epl-alumni-hero-lead">{hero.lead}</p>

                <ul className="epl-alumni-hero-stats">
                  {hero.highlights.map((item) => (
                    <li key={item.label}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="epl-alumni-hero-actions">
                  <Link className="ul-btn epl-alumni-hero-cta" href={hero.primaryCta.href}>
                    <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                    {hero.primaryCta.label}
                  </Link>
                  <Link
                    className="ul-btn epl-alumni-hero-cta epl-alumni-hero-cta--secondary"
                    href={hero.secondaryCta.href}
                  >
                    {hero.secondaryCta.label}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="epl-alumni-hero-media">
                <ProjectDetailImage
                  alt="EPL Ghana alumni graduation"
                  className="epl-alumni-hero-img epl-alumni-hero-img--primary"
                  fallbackClass="epl-alumni-hero-fallback"
                  src={hero.image}
                />
                <ProjectDetailImage
                  alt="EPL Ghana alumni celebration"
                  className="epl-alumni-hero-img epl-alumni-hero-img--secondary"
                  fallbackClass="epl-alumni-hero-fallback epl-alumni-hero-fallback--secondary"
                  src={hero.secondaryImage}
                />
                <div aria-hidden className="epl-alumni-hero-badge">
                  <strong>{hero.badge.value}</strong>
                  <span>{hero.badge.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="epl-alumni-about ul-section-spacing">
        <div className="ul-container">
          <div className="row ul-bs-row gy-5 align-items-center epl-alumni-about-row">
            <div className="col-lg-6">
              <div className="epl-alumni-about-copy">
                <span className="ul-section-sub-title">{eplanAbout.eyebrow}</span>
                <h2 className="ul-section-title">{eplanAbout.title}</h2>
                {eplanAbout.paragraphs.map((paragraph) => (
                  <p className="epl-alumni-about-text" key={paragraph.slice(0, 40)}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="epl-alumni-about-media">
                <ProjectDetailImage
                  alt="EPLAN members at a fellows convening"
                  className="epl-alumni-about-img"
                  fallbackClass="epl-alumni-about-fallback"
                  src={eplanAbout.image}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="epl-alumni-vision">
        <div className="ul-container">
          <div className="epl-alumni-vision-inner">
            <span className="ul-section-sub-title">{vision.eyebrow}</span>
            <h2 className="epl-alumni-vision-title">{vision.title}</h2>
            <p className="epl-alumni-vision-text">{vision.text}</p>
          </div>
        </div>
      </section>

      <section className="epl-alumni-impact">
        <div className="ul-container">
          <div className="epl-alumni-impact-head">
            <span className="ul-section-sub-title">{impact.eyebrow}</span>
            <h2 className="epl-alumni-impact-title">{impact.title}</h2>
          </div>
          <div className="epl-alumni-impact-stats">
            {impact.stats.map((stat) => (
              <article className="epl-alumni-impact-stat" key={stat.label}>
                <strong className="epl-alumni-impact-value">{stat.value}</strong>
                <p className="epl-alumni-impact-label">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-alumni-convening ul-section-spacing">
        <div className="ul-container">
          <div className="epl-alumni-convening-inner">
            <div className="epl-alumni-convening-copy">
              <span className="ul-section-sub-title">{convening.eyebrow}</span>
              <h2 className="ul-section-title">{convening.title}</h2>
              <p className="epl-alumni-convening-text">{convening.body}</p>
            </div>
            <div className="epl-alumni-convening-media">
              <ProjectDetailImage
                alt={convening.title}
                className="epl-alumni-convening-img"
                fallbackClass="epl-alumni-convening-fallback"
                src={convening.image}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="epl-alumni-global ul-section-spacing">
        <div className="ul-container">
          <div className="epl-alumni-section-head">
            <span className="ul-section-sub-title">{globalGathering.eyebrow}</span>
            <h2 className="ul-section-title">{globalGathering.title}</h2>
            <p className="epl-alumni-section-intro">{globalGathering.lead}</p>
          </div>

          <div className="epl-alumni-global-showcase">
            {globalGathering.images.map((image) => (
              <figure
                className={`epl-alumni-global-card epl-alumni-global-card--${image.layout}`}
                key={image.id}
              >
                <div className="epl-alumni-global-card-media">
                  <ProjectDetailImage
                    alt={image.alt}
                    className={`epl-alumni-global-card-img${
                      image.layout === 'poster' ? ' epl-alumni-global-card-img--contain' : ''
                    }`}
                    fallbackClass={`epl-alumni-global-card-fallback${
                      image.layout === 'poster' ? ' epl-alumni-global-card-fallback--poster' : ''
                    }`}
                    src={image.src}
                  />
                </div>
                <figcaption className="epl-alumni-global-card-caption">{image.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="epl-alumni-global-copy">
            <p className="epl-alumni-global-copy-text">{globalGathering.body}</p>
            <ul className="epl-alumni-global-highlights">
              {globalGathering.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="epl-alumni-journey ul-section-spacing">
        <div className="ul-container">
          <div className="epl-alumni-section-head">
            <span className="ul-section-sub-title">{journey.eyebrow}</span>
            <h2 className="ul-section-title">{journey.title}</h2>
            <p className="epl-alumni-section-intro">{journey.intro}</p>
          </div>
          <div className="epl-alumni-journey-grid">
            {journey.steps.map((step) => (
              <article className="epl-alumni-journey-step" key={step.step}>
                <span className="epl-alumni-journey-num">{step.step}</span>
                <h3 className="epl-alumni-journey-title">{step.title}</h3>
                <p className="epl-alumni-journey-descr">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AlumniStoriesSection
        eyebrow={stories.eyebrow}
        intro={stories.intro}
        items={stories.items}
        title={stories.title}
      />

      <section className="epl-alumni-featured ul-section-spacing pt-0">
        <div className="ul-container">
          <div className="epl-alumni-section-head">
            <span className="ul-section-sub-title">{featured.eyebrow}</span>
            <h2 className="ul-section-title">{featured.title}</h2>
            <p className="epl-alumni-section-intro">{featured.intro}</p>
          </div>

          <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-1 ul-bs-row epl-team-grid">
            {featured.items.map((alumni: AlumniSpotlight) => {
              const member = alumniToTeamMember(alumni)
              return (
                <div className="col" key={alumni.id}>
                  <ChariticsTeamCard
                    isActive={activeMemberId === member.id}
                    member={member}
                    onOpen={openMember}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="epl-alumni-pathways">
        <div className="ul-container">
          <div className="epl-alumni-section-head">
            <span className="ul-section-sub-title">{pathways.eyebrow}</span>
            <h2 className="ul-section-title epl-alumni-pathways-title">{pathways.title}</h2>
            <p className="epl-alumni-section-intro">{pathways.intro}</p>
          </div>
          <div className="epl-alumni-pathways-grid">
            {pathways.items.map((item) => (
              <article className="epl-alumni-pathway-card" key={item.title}>
                <span aria-hidden className="epl-alumni-pathway-icon">
                  <i className={item.icon}></i>
                </span>
                <h3 className="epl-alumni-pathway-title">{item.title}</h3>
                <p className="epl-alumni-pathway-descr">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-alumni-milestone">
        <div className="ul-container">
          <div className="epl-alumni-milestone-inner">
            <div className="epl-alumni-milestone-copy">
              <span className="ul-section-sub-title">{milestone.eyebrow}</span>
              <h2 className="ul-section-title">{milestone.title}</h2>
              <p className="epl-alumni-milestone-text">{milestone.body}</p>
              <Link className="ul-btn epl-alumni-milestone-btn" href={milestone.ctaHref}>
                <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                {milestone.ctaLabel}
              </Link>
            </div>
            <div className="epl-alumni-milestone-media">
              <ProjectDetailImage
                alt={milestone.title}
                className="epl-alumni-milestone-img"
                fallbackClass="epl-alumni-milestone-fallback"
                src={milestone.image}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="epl-alumni-gallery-band">
        <div className="ul-container">
          <div className="epl-alumni-section-head epl-alumni-gallery-head">
            <span className="ul-section-sub-title">{gallery.eyebrow}</span>
            <h2 className="ul-section-title">{gallery.title}</h2>
          </div>
        </div>
        <ChariticsGallery
          items={gallery.images.map((image) => ({ src: image.src, alt: image.alt }))}
        />
      </section>

      <section className="epl-alumni-news ul-section-spacing pt-0">
        <div className="ul-container">
          <div className="epl-alumni-section-head">
            <span className="ul-section-sub-title">{news.eyebrow}</span>
            <h2 className="ul-section-title">{news.title}</h2>
            <p className="epl-alumni-section-intro">{news.intro}</p>
          </div>
          <div className="row ul-bs-row gy-4">
            {news.items.map((item) => (
              <div className="col-lg-4" key={item.href}>
                <Link className="epl-alumni-news-card" href={item.href}>
                  <div className="epl-alumni-news-media">
                    <ProjectDetailImage
                      alt=""
                      className="epl-alumni-news-img"
                      fallbackClass="epl-alumni-news-fallback"
                      src={item.image}
                    />
                  </div>
                  <div className="epl-alumni-news-body">
                    <h3 className="epl-alumni-news-title">{item.title}</h3>
                    <p className="epl-alumni-news-excerpt">{item.excerpt}</p>
                    <span className="epl-alumni-news-link">
                      Read more <i className="flaticon-right"></i>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-alumni-network ul-section-spacing">
        <div className="ul-container">
          <div className="epl-alumni-section-head">
            <span className="ul-section-sub-title">{network.eyebrow}</span>
            <h2 className="ul-section-title">{network.title}</h2>
            <p className="epl-alumni-section-intro">{network.intro}</p>
          </div>

          <div className="row ul-bs-row gy-4">
            {network.benefits.map((benefit) => (
              <div className="col-lg-3 col-md-6" key={benefit.title}>
                <article className="epl-alumni-network-card">
                  <span aria-hidden className="epl-alumni-network-icon">
                    <i className={benefit.icon}></i>
                  </span>
                  <h3 className="epl-alumni-network-card-title">{benefit.title}</h3>
                  <p className="epl-alumni-network-card-descr">{benefit.description}</p>
                </article>
              </div>
            ))}
          </div>

          <div className="row ul-bs-row gy-5 align-items-center epl-alumni-network-foot">
            <div className="col-lg-6">
              <a
                className="epl-alumni-network-link"
                href={network.globalLink.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {network.globalLink.label}
                <i aria-hidden className="flaticon-up-right-arrow"></i>
              </a>
            </div>
            <div className="col-lg-6">
              <blockquote className="epl-alumni-quote">
                <p>&ldquo;{quote.text}&rdquo;</p>
                <footer>
                  <strong>{quote.attribution}</strong>
                  <span>{quote.role}</span>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="epl-alumni-cta">
        <div className="ul-container">
          <div className="epl-alumni-cta-inner">
            <div className="epl-alumni-cta-copy">
              <span className="ul-section-sub-title">EPLAN · PSFN</span>
              <h2 className="ul-section-title">{cta.title}</h2>
              <p className="epl-alumni-cta-text">{cta.body}</p>
              <div className="epl-alumni-cta-actions">
                <Link className="ul-btn" href={cta.primaryHref}>
                  <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                  {cta.primaryLabel}
                </Link>
                <Link className="ul-btn epl-alumni-cta-btn--secondary" href={cta.secondaryHref}>
                  {cta.secondaryLabel}
                </Link>
              </div>
            </div>
            <div className="epl-alumni-cta-media">
              <ProjectDetailImage
                alt=""
                className="epl-alumni-cta-img"
                fallbackClass="epl-alumni-cta-fallback"
                src={cta.image}
              />
            </div>
          </div>
        </div>
      </section>

      {mounted && activeMember
        ? createPortal(
            <AnimatePresence>
              {activeMember ? (
                <AlumniSpotlightDrawer
                  key="epl-alumni-drawer"
                  member={activeMember}
                  memberIndex={activeIndex}
                  memberTotal={featuredMembers.length}
                  onClose={closeDrawer}
                  onNext={() => goToMember(1)}
                  onPrev={() => goToMember(-1)}
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
