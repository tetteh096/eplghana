'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import type { FellowshipProjectContent } from '@/utilities/getFellowshipProjectContent'

type ChariticsFellowshipDetailProps = {
  content: FellowshipProjectContent
  visualClass?: string
}

const panelVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

const easeOut = [0.22, 1, 0.36, 1] as const

function stepNum(index: number) {
  return String(index + 1).padStart(2, '0')
}

export function ChariticsFellowshipDetail({ content }: ChariticsFellowshipDetailProps) {
  const [activeTab, setActiveTab] = useState(content.tabs[0]?.id ?? 'structure')
  const reduceMotion = useReducedMotion()
  const { hero, programmeStructure, eligibility, applicationProcess, applyCta } = content
  const heroImage = hero.images[0]

  const tabs = content.tabs.length
    ? content.tabs
    : [
        { id: 'structure' as const, label: 'Programme Structure' },
        { id: 'eligibility' as const, label: 'Eligibility Criteria' },
        { id: 'process' as const, label: 'Application Process' },
      ]

  return (
    <div className="figma-fellowship-detail-page">
      <section className="figma-about-hero figma-about-hero--redesign figma-fellowship-hero">
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
            hidden: { opacity: 0, y: 24 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: easeOut, staggerChildren: 0.08 },
            },
          }}
        >
          <motion.div className="figma-kicker figma-kicker--gold" variants={panelVariants}>
            <span className="figma-kicker__line" />
            <span>{hero.eyebrow}</span>
          </motion.div>
          <motion.h1 variants={panelVariants}>{hero.title}</motion.h1>
          <motion.p variants={panelVariants}>{hero.description}</motion.p>
          <motion.div style={{ marginTop: '28px' }} variants={panelVariants}>
            <Link className="epl-new-btn epl-new-btn--gold" href={hero.ctaHref}>
              {hero.ctaLabel} <span>↗</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <div
        style={{
          background: '#0C1427',
          padding: '16px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="epl-new-shell">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  className={`epl-team-tab-btn${isActive ? ' is-active' : ''}`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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
        </div>
      </div>

      <section className="figma-section epl-new-shell" style={{ paddingBlock: '90px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'structure' && (
            <motion.div
              animate="show"
              exit="exit"
              initial="hidden"
              key="structure"
              variants={panelVariants}
            >
              <div
                className="figma-section-head"
                style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 40px' }}
              >
                <div className="figma-kicker figma-kicker--blue" style={{ justifyContent: 'center' }}>
                  <span className="figma-kicker__line" />
                  <span>{programmeStructure.sidebarEyebrow}</span>
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(36px, 4vw, 54px)',
                    fontWeight: 800,
                    color: '#0D1B3E',
                    margin: '14px 0 16px',
                  }}
                >
                  {programmeStructure.title}
                </h2>
                <p
                  className="figma-subtitle"
                  style={{ margin: '0 auto', color: '#636772', fontSize: '18px', lineHeight: 1.65 }}
                >
                  {programmeStructure.intro}
                </p>
              </div>

              <MotionReveal className="figma-structure-grid" stagger>
                {programmeStructure.steps.map((step, index) => (
                  <MotionItem key={`${step.title}-${index}`}>
                    <div className="figma-structure-card">
                      <span className="figma-structure-num">{stepNum(index)}</span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </MotionItem>
                ))}
              </MotionReveal>
            </motion.div>
          )}

          {activeTab === 'eligibility' && (
            <motion.div
              animate="show"
              exit="exit"
              initial="hidden"
              key="eligibility"
              variants={panelVariants}
            >
              <div className="figma-eligibility-layout">
                <div>
                  <div className="figma-kicker figma-kicker--gold">
                    <span className="figma-kicker__line" />
                    <span>{eligibility.eyebrow}</span>
                  </div>
                  <h2
                    style={{
                      fontSize: 'clamp(32px, 3.5vw, 48px)',
                      fontWeight: 800,
                      color: '#0C1427',
                      margin: '12px 0 28px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {eligibility.title}
                  </h2>

                  <MotionReveal stagger>
                    {eligibility.criteria.map((item, idx) => (
                      <MotionItem key={`${item}-${idx}`}>
                        <div className="figma-eligibility-item">
                          <div className="figma-eligibility-check">✓</div>
                          <span>{item}</span>
                        </div>
                      </MotionItem>
                    ))}
                  </MotionReveal>
                </div>

                <MotionReveal className="figma-checklist-card">
                  <span className="figma-checklist-kicker">Application checklist</span>
                  <h3>{eligibility.documentsTitle}</h3>
                  <p>{eligibility.documentsIntro}</p>

                  <ul className="figma-checklist-list">
                    {eligibility.documents.map((doc, idx) => (
                      <li key={`${doc}-${idx}`}>{doc}</li>
                    ))}
                  </ul>

                  <Link className="figma-checklist-btn" href={hero.ctaHref}>
                    {eligibility.documentsCtaLabel}
                  </Link>
                </MotionReveal>
              </div>
            </motion.div>
          )}

          {activeTab === 'process' && (
            <motion.div
              animate="show"
              exit="exit"
              initial="hidden"
              key="process"
              variants={panelVariants}
            >
              <div
                className="figma-section-head"
                style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}
              >
                <div className="figma-kicker figma-kicker--gold" style={{ justifyContent: 'center' }}>
                  <span className="figma-kicker__line" />
                  <span>{applicationProcess.eyebrow}</span>
                  <span className="figma-kicker__line" />
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(36px, 4vw, 54px)',
                    fontWeight: 800,
                    color: '#0C1427',
                    margin: '14px 0 16px',
                  }}
                >
                  {applicationProcess.title}
                </h2>
                {applicationProcess.intro ? (
                  <p
                    className="figma-subtitle"
                    style={{ margin: '0 auto', color: '#636772', fontSize: '18px', lineHeight: 1.65 }}
                  >
                    {applicationProcess.intro}
                  </p>
                ) : null}
              </div>

              <MotionReveal className="figma-selection-stack" stagger>
                {applicationProcess.steps.map((step, index) => (
                  <MotionItem key={`${step.title}-${index}`}>
                    <div className="figma-selection-card">
                      <span className="figma-selection-num">{stepNum(index)}</span>
                      <div className="figma-selection-body">
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  </MotionItem>
                ))}
              </MotionReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <MotionReveal
        as="section"
        className="figma-section epl-textured-band"
        style={{ paddingBlock: '100px' }}
      >
        <div className="epl-new-shell">
          <div
            className="figma-section-head"
            style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}
          >
            <div className="figma-kicker figma-kicker--gold" style={{ justifyContent: 'center' }}>
              <span className="figma-kicker__line" />
              <span>{applyCta.eyebrow}</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 800,
                color: '#ffffff',
                margin: '14px 0 16px',
              }}
            >
              {applyCta.title}
            </h2>
            <p
              style={{
                margin: '0 auto 32px',
                color: 'rgba(255,255,255,0.92)',
                fontSize: '18px',
                lineHeight: 1.65,
              }}
            >
              {applyCta.description}
            </p>
            <div>
              <Link className="epl-new-btn epl-new-btn--gold" href={applyCta.ctaHref}>
                {applyCta.ctaLabel} <span>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  )
}
