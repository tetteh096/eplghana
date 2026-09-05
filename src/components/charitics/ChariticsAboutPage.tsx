'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { aboutPageRedesignImages } from '@/config/aboutPageContent'
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

const VALUE_COLORS = ['#4150A3', '#0f1630', '#4150A3', '#0f1630', '#4150A3', '#0f1630'] as const

const easeOut = [0.22, 1, 0.36, 1] as const

export function ChariticsAboutPage({
  content,
  boardMembers,
  staffMembers,
  partners,
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
  const partnerGrid = partners.slice(0, 6)
  const heroImage = intro.image || aboutPageRedesignImages.hero
  const storyImage = intro.secondaryImage || aboutPageRedesignImages.story

  const toggleFlip = (idx: number) => {
    setFlippedCards((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="figma-about-page">
      <section className="figma-about-hero figma-about-hero--redesign">
        <motion.div
          animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.04 }}
          className="figma-about-hero__bg"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          style={{ backgroundImage: `url(${heroImage})` }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
        <div className="figma-about-hero__overlay figma-about-hero__overlay--blue" />
        <motion.div
          animate="show"
          className="figma-about-hero__content figma-about-hero__content--left"
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

      <MotionReveal as="section" className="figma-about-story figma-about-story--redesign" id="story">
        <div className="epl-new-shell">
          <div className="figma-story-grid figma-story-grid--redesign">
            <div className="figma-story-copy">
              <div className="figma-kicker figma-kicker--blue">
                <span className="figma-kicker__line" />
                <span>OUR STORY</span>
              </div>
              <h2>{story.growth.title}</h2>
              <p>{story.growth.body}</p>
            </div>
            <div
              className="figma-story-media figma-story-media--redesign"
              style={{ backgroundImage: `url(${storyImage})` }}
            />
          </div>
        </div>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-mission-vision-section figma-mv-section--redesign"
        id="mission-vision"
      >
        <div className="epl-new-shell">
          <div className="figma-mv-container figma-mv-container--redesign">
            <MotionReveal className="figma-mv-box figma-mv-box--mission figma-mv-box--redesign" delay={0.05}>
              <span className="figma-mv-kicker">{mission.eyebrow.toUpperCase()}</span>
              <span className="figma-mv-subhead">{mission.title.toUpperCase()}</span>
              <hr className="figma-mv-divider" />
              <p>{mission.body}</p>
            </MotionReveal>

            <MotionReveal className="figma-mv-box figma-mv-box--vision figma-mv-box--redesign" delay={0.12}>
              <span className="figma-mv-kicker">{vision.eyebrow.toUpperCase()}</span>
              <span className="figma-mv-subhead">{vision.title.toUpperCase()}</span>
              <hr className="figma-mv-divider" />
              <p>{vision.body}</p>
            </MotionReveal>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-section figma-about-values epl-new-shell" id="values">
        <div className="figma-section-head figma-section-head--left">
          <div className="figma-kicker figma-kicker--blue">
            <span className="figma-kicker__line" />
            <span>CORE VALUES</span>
          </div>
          <h2>The principles that guide everything we do.</h2>
          <p className="figma-subtitle">Click any value to reveal its meaning.</p>
        </div>

        <MotionReveal className="figma-values-grid figma-values-grid--redesign" stagger>
          {coreValues.map((val, idx) => {
            const isFlipped = flippedCards[idx] ?? false
            const accent = VALUE_COLORS[idx % VALUE_COLORS.length]
            return (
              <MotionItem key={`${val.num}-${val.title}`}>
                <div
                  className={`figma-value-proto${isFlipped ? ' is-flipped' : ''}`}
                  onClick={() => toggleFlip(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleFlip(idx)
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="figma-value-proto__inner">
                    <div className="figma-value-proto__face figma-value-proto__face--front" style={{ background: accent }}>
                      <span className="figma-value-proto__num">{val.num}</span>
                      <h3 className="figma-value-proto__title">{val.title}</h3>
                      <span className="figma-value-proto__line" />
                      <span className="figma-value-proto__tap">Tap to reveal</span>
                    </div>
                    <div className="figma-value-proto__face figma-value-proto__face--back">
                      <span className="figma-value-proto__back-label">{val.title}</span>
                      <p>{val.meaning}</p>
                    </div>
                  </div>
                </div>
              </MotionItem>
            )
          })}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal as="section" className="figma-about-team" id="people">
        <div className="epl-new-shell">
          <div className="figma-about-team__head">
            <h2>The People Behind EPL Ghana</h2>
            <div className="figma-about-team__tabs">
              <button
                className={`figma-about-team__tab${activeTeamTab === 'leadership' ? ' is-active' : ''}`}
                onClick={() => setActiveTeamTab('leadership')}
                type="button"
              >
                Leadership
              </button>
              <button
                className={`figma-about-team__tab${activeTeamTab === 'team' ? ' is-active' : ''}`}
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
              className="figma-about-team__grid"
              exit={{ opacity: 0, y: 12 }}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              key={activeTeamTab}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              {displayedTeam.map((member) => (
                <article className="figma-about-team__card" key={member.id}>
                  <div
                    className="figma-about-team__photo"
                    style={{ backgroundImage: `url(${member.photo || eplHomeImages.fellows.miriam})` }}
                  />
                  <div className="figma-about-team__name">{member.name}</div>
                  <div className="figma-about-team__role">{member.role}</div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-about-partners" id="partners">
        <div className="epl-new-shell">
          <div className="figma-about-partners__head">
            <div className="figma-kicker figma-kicker--blue figma-kicker--center">
              <span className="figma-kicker__line" />
              <span>{partner.eyebrow.toUpperCase()}</span>
              <span className="figma-kicker__line" />
            </div>
            <h2>{partner.title}</h2>
            <p>{partner.lead}</p>
          </div>

          {partnerGrid.length > 0 ? (
            <div className="epl-marquee-wrapper">
              <div className="epl-marquee-track">
                {[...partnerGrid, ...partnerGrid].map((item, index) => (
                  <div className="epl-partner-slide-card" key={`${item.id}-${index}`}>
                    <div className="epl-partner-slide-badge">
                      {item.logo ? (
                        <img alt={item.name} decoding="async" loading="lazy" src={item.logo} />
                      ) : (
                        <span>{item.code}</span>
                      )}
                    </div>
                    <div className="epl-partner-slide-info">
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="figma-about-partners__cta">
            <Link className="figma-about-partners__btn" href="/community/partners">
              Partner With Us <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </MotionReveal>
    </div>
  )
}
