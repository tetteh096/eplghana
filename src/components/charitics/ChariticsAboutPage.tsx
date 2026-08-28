'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { eplHomeImages } from '@/config/eplMedia'
import type { FellowTestimonialSlide } from '@/config/fellowTestimonials'
import type { TeamMember } from '@/config/teamPageContent'
import type { SiteSetting } from '@/payload-types'
import type { AboutContent } from '@/utilities/getAboutContent'
import type { PartnerMarqueeItem } from '@/utilities/getPartnersContent'

type ChariticsAboutPageProps = {
  settings: SiteSetting
  content: AboutContent
  boardMembers: TeamMember[]
  staffMembers: TeamMember[]
  partners: PartnerMarqueeItem[]
  teamIntro?: { eyebrow: string; title: string; description?: string }
  testimonials?: FellowTestimonialSlide[]
}

const easeOut = [0.22, 1, 0.36, 1] as const

export function ChariticsAboutPage({
  content,
  boardMembers,
  staffMembers,
  partners,
  teamIntro,
}: ChariticsAboutPageProps) {
  const { intro, story, mission, vision, partner, coreValues } = content
  const [activeTeamTab, setActiveTeamTab] = useState<'leadership' | 'team'>('leadership')
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({})
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash
      if (!hash) return
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (!element) return
      window.setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
    }

    handleHashScroll()
    window.addEventListener('hashchange', handleHashScroll)
    return () => window.removeEventListener('hashchange', handleHashScroll)
  }, [])

  const displayedTeam = activeTeamTab === 'leadership' ? boardMembers : staffMembers
  const marqueePartners = partners.length ? [...partners, ...partners] : []
  const heroImage = intro.image || eplHomeImages.aboutMain
  const storyImage = intro.secondaryImage || eplHomeImages.aboutBlock

  const toggleFlip = (idx: number) => {
    setFlippedCards((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="figma-about-page">
      <section className="figma-about-hero">
        <motion.div
          animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.04 }}
          className="figma-about-hero__bg"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          style={{ backgroundImage: `url(${heroImage})` }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
        <div className="figma-about-hero__overlay" />
        <motion.div
          animate="show"
          className="figma-about-hero__content"
          initial={reduceMotion ? false : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
        >
          <motion.div
            className="figma-kicker figma-kicker--gold"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
            }}
          >
            <span className="figma-kicker__line" />
            <span>{intro.eyebrow.toUpperCase()}</span>
          </motion.div>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOut } },
            }}
          >
            {intro.title}
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOut } },
            }}
          >
            {intro.lead}
          </motion.p>
        </motion.div>
      </section>

      <MotionReveal as="section" className="figma-about-story" id="story">
        <div className="epl-new-shell">
          <div className="figma-story-grid">
            <div className="figma-story-copy">
              <div className="figma-kicker figma-kicker--blue">
                <span className="figma-kicker__line" />
                <span>OUR STORY</span>
              </div>
              <h2>{story.growth.title}</h2>
              <p>{story.growth.body}</p>
            </div>
            <div className="figma-story-media">
              <img
                alt="EPL Ghana fellows collaborating"
                decoding="async"
                loading="lazy"
                src={storyImage}
              />
            </div>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-mission-vision-section" id="mission-vision">
        <div className="epl-new-shell">
          <div className="figma-mv-container">
            <MotionReveal className="figma-mv-box figma-mv-box--mission" delay={0.05}>
              <span className="figma-mv-kicker">{mission.eyebrow.toUpperCase()}</span>
              <span className="figma-mv-subhead">{mission.title.toUpperCase()}</span>
              <hr className="figma-mv-divider" />
              <p>{mission.body}</p>
            </MotionReveal>

            <MotionReveal className="figma-mv-box figma-mv-box--vision" delay={0.12}>
              <span className="figma-mv-kicker">{vision.eyebrow.toUpperCase()}</span>
              <span className="figma-mv-subhead">{vision.title.toUpperCase()}</span>
              <hr className="figma-mv-divider" />
              <p>{vision.body}</p>
            </MotionReveal>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        id="values"
        style={{ paddingBlock: '100px' }}
      >
        <div className="figma-section-head">
          <div className="figma-kicker figma-kicker--blue">
            <span className="figma-kicker__line" />
            <span>CORE VALUES</span>
          </div>
          <h2>The principles that guide everything we do.</h2>
          <p className="figma-subtitle">Click any value to reveal its meaning.</p>
        </div>

        <MotionReveal className="figma-values-grid" stagger>
          {coreValues.map((val, idx) => {
            const isFlipped = flippedCards[idx] ?? false
            return (
              <MotionItem key={`${val.num}-${val.title}`}>
                <div
                  className={`figma-flip-card${isFlipped ? ' is-flipped' : ''}`}
                  onClick={() => toggleFlip(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleFlip(idx)
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="figma-flip-card-inner">
                    <div className={`figma-flip-face figma-flip-face--${val.color}`}>
                      <span className="figma-flip-num">{val.num}</span>
                      <h3 className="figma-flip-title">{val.title}</h3>
                      <div className="figma-flip-tap">
                        <span className="figma-flip-tap__line" />
                        <span>TAP TO REVEAL</span>
                      </div>
                    </div>
                    <div className="figma-flip-face figma-flip-face--back">
                      <span className="figma-flip-num">
                        {val.num} · {val.title}
                      </span>
                      <p className="figma-flip-desc">{val.meaning}</p>
                      <div className="figma-flip-tap" style={{ marginTop: '14px' }}>
                        <span className="figma-flip-tap__line" />
                        <span>TAP TO CLOSE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionItem>
            )
          })}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section bg-figma-paper"
        id="people"
        style={{ paddingBlock: '100px', background: '#F8F9FA' }}
      >
        <div className="epl-new-shell">
          <div
            className="figma-section-head"
            style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}
          >
            <div className="figma-kicker figma-kicker--blue" style={{ justifyContent: 'center' }}>
              <span className="figma-kicker__line" />
              <span>{(teamIntro?.eyebrow || 'Our People').toUpperCase()}</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 800,
                color: '#0D1B3E',
                margin: '14px 0 20px',
              }}
            >
              {teamIntro?.title || 'The People Behind EPL Ghana'}
            </h2>
            <div className="epl-team-tabs">
              <button
                className={`epl-team-tab-btn${activeTeamTab === 'leadership' ? ' is-active' : ''}`}
                onClick={() => setActiveTeamTab('leadership')}
                type="button"
              >
                Leadership
              </button>
              <button
                className={`epl-team-tab-btn${activeTeamTab === 'team' ? ' is-active' : ''}`}
                onClick={() => setActiveTeamTab('team')}
                type="button"
              >
                Team
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="epl-team-grid"
              exit={{ opacity: 0, y: 12 }}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              key={activeTeamTab}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              {displayedTeam.map((member) => (
                <article className="epl-team-card" key={member.id}>
                  <div className="epl-team-card__image">
                    <img
                      alt={member.name}
                      decoding="async"
                      loading="lazy"
                      src={member.photo}
                    />
                  </div>
                  <div className="epl-team-card__copy">
                    <h3>{member.name}</h3>
                    <span>{member.role}</span>
                    <p>{member.bio}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section"
        id="partners"
        style={{ paddingBlock: '100px' }}
      >
        <div className="epl-new-shell">
          <div
            className="figma-section-head"
            style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}
          >
            <div className="figma-kicker figma-kicker--blue" style={{ justifyContent: 'center' }}>
              <span className="figma-kicker__line" />
              <span>{partner.eyebrow.toUpperCase()}</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 800,
                color: '#0D1B3E',
                margin: '14px 0 12px',
              }}
            >
              {partner.title}
            </h2>
            <p
              className="figma-subtitle"
              style={{ margin: '0 auto 24px', color: '#636772', fontSize: '18px', lineHeight: 1.6 }}
            >
              {partner.lead}
            </p>
            <div>
              <Link className="epl-new-btn epl-new-btn--gold" href="/community/partners">
                Partner With Us <span>↗</span>
              </Link>
            </div>
          </div>
        </div>

        {marqueePartners.length > 0 ? (
          <div className="epl-marquee-wrapper">
            <div className="epl-marquee-track">
              {marqueePartners.map((item, index) => (
                <div className="epl-partner-slide-card" key={`${item.id}-${index}`}>
                  <div className="epl-partner-slide-badge">
                    {item.logo ? (
                      <img
                        alt={item.name}
                        decoding="async"
                        loading="lazy"
                        src={item.logo}
                      />
                    ) : (
                      <span>{item.code}</span>
                    )}
                  </div>
                  <div className="epl-partner-slide-info">
                    <h3>{item.name}</h3>
                    <span>{item.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </MotionReveal>
    </div>
  )
}
