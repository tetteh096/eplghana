'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import type { ImpactPageContent } from '@/utilities/getImpactPageContent'

type ChariticsImpactPageProps = {
  content: ImpactPageContent
}

type TestimonialCategory = 'All' | 'Supervisors' | 'Mentors' | 'Partnered Institutions'

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
}

export function ChariticsImpactPage({ content }: ChariticsImpactPageProps) {
  const {
    hero,
    glance,
    successStories,
    communityStories,
    testimonials,
    publications,
  } = content
  const [activeCategory, setActiveCategory] = useState<TestimonialCategory>('All')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash
    if (!hash) return
    const element = document.querySelector(hash)
    if (!element) return
    const timer = window.setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredTestimonials =
    activeCategory === 'All'
      ? testimonials.items
      : testimonials.items.filter((t) => t.category === activeCategory)

  return (
    <div className="figma-impact-page">
      <section className="figma-about-hero figma-about-hero--photo">
        <motion.div
          animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.04 }}
          className="figma-about-hero__bg"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          style={{ backgroundImage: `url(${hero.image})` }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
        <div className="figma-about-hero__overlay" />
        <motion.div
          animate="show"
          className="figma-about-hero__content"
          initial={reduceMotion ? false : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div className="figma-kicker figma-kicker--gold" variants={fadeUp}>
            <span className="figma-kicker__line" />
            <span>{hero.eyebrow}</span>
          </motion.div>
          <motion.h1 variants={fadeUp}>{hero.title}</motion.h1>
          <motion.p variants={fadeUp}>{hero.description}</motion.p>
        </motion.div>
      </section>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        id="overview"
        style={{ paddingBlock: '100px' }}
      >
        <div
          className="figma-section-head"
          style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 48px' }}
        >
          <div className="figma-kicker figma-kicker--blue" style={{ justifyContent: 'center' }}>
            <span className="figma-kicker__line" />
            <span>{glance.eyebrow}</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 800,
              color: '#0D1B3E',
              margin: '14px 0 16px',
            }}
          >
            {glance.title}
          </h2>
        </div>

        <MotionReveal
          className="epl-impact-glance-grid"
          stagger
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {glance.stats.map((item) => (
            <MotionItem key={item.title}>
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e5eb',
                  borderTop: '4px solid #FFC107',
                  padding: '36px 24px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(10, 17, 40, 0.05)',
                  height: '100%',
                }}
              >
                <strong
                  style={{
                    fontSize: 'clamp(44px, 5vw, 60px)',
                    fontWeight: 850,
                    color: '#3F51B5',
                    display: 'block',
                    lineHeight: '1',
                    marginBottom: '12px',
                  }}
                >
                  {item.value}
                </strong>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0C1427', margin: '0 0 8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#636772', margin: 0, lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section"
        id="success-stories"
        style={{ paddingBlock: '100px', background: '#F8F9FA' }}
      >
        <div className="epl-new-shell">
          <div
            className="figma-section-head"
            style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 48px' }}
          >
            <div className="figma-kicker figma-kicker--gold" style={{ justifyContent: 'center' }}>
              <span className="figma-kicker__line" />
              <span>{successStories.eyebrow}</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 800,
                color: '#0D1B3E',
                margin: '14px 0 16px',
              }}
            >
              {successStories.title}
            </h2>
          </div>

          <MotionReveal
            stagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            {successStories.items.map((story) => (
              <MotionItem key={story.name}>
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e5eb',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 30px rgba(10, 17, 40, 0.04)',
                    height: '100%',
                  }}
                >
                  <div>
                    <div
                      style={{
                        height: '210px',
                        width: '100%',
                        overflow: 'hidden',
                        marginBottom: '20px',
                        background: '#eee',
                      }}
                    >
                      <img
                        alt={story.name}
                        decoding="async"
                        loading="lazy"
                        src={story.image}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
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
                      {story.cohort}
                    </span>
                    <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0C1427', margin: '0 0 4px' }}>
                      {story.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: '#636772',
                        margin: '0 0 16px',
                      }}
                    >
                      {story.role}
                    </p>
                    <p style={{ fontSize: '15px', color: '#444854', lineHeight: 1.6 }}>{story.desc}</p>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        id="community-stories"
        style={{ paddingBlock: '100px' }}
      >
        <div
          className="figma-section-head"
          style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 48px' }}
        >
          <div className="figma-kicker figma-kicker--blue" style={{ justifyContent: 'center' }}>
            <span className="figma-kicker__line" />
            <span>{communityStories.eyebrow}</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 800,
              color: '#0D1B3E',
              margin: '14px 0 16px',
            }}
          >
            {communityStories.title}
          </h2>
          <p className="figma-subtitle" style={{ color: '#636772', fontSize: '18px' }}>
            {communityStories.intro}
          </p>
        </div>

        <MotionReveal className="epl-interventions-grid" stagger>
          {communityStories.items.map((item) => (
            <MotionItem key={item.num}>
              <div
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderLeft: '4px solid #3F51B5',
                  padding: '32px 24px',
                  height: '100%',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '850',
                    color: '#FFC107',
                    letterSpacing: '0.15em',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  {item.num}
                </span>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#3F51B5', display: 'block' }}>
                  {item.region}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#0C1427',
                    display: 'block',
                    marginBottom: '14px',
                  }}
                >
                  {item.assembly}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0C1427', margin: '0 0 10px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748B', margin: 0, lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionReveal>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link className="epl-new-btn epl-new-btn--blue" href={communityStories.ctaUrl}>
            {communityStories.ctaLabel} <span>→</span>
          </Link>
        </div>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section"
        id="testimonials"
        style={{ paddingBlock: '100px', background: '#0C1427', color: '#fff' }}
      >
        <div className="epl-new-shell">
          <div
            className="figma-section-head"
            style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 40px' }}
          >
            <div className="figma-kicker figma-kicker--gold" style={{ justifyContent: 'center' }}>
              <span className="figma-kicker__line" />
              <span>{testimonials.eyebrow}</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 800,
                color: '#ffffff',
                margin: '14px 0 16px',
              }}
            >
              {testimonials.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px' }}>{testimonials.intro}</p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}
          >
            {(['All', 'Supervisors', 'Mentors', 'Partnered Institutions'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  fontSize: '13px',
                  fontWeight: '750',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? '#FFC107' : 'rgba(255,255,255,0.2)',
                  background: activeCategory === cat ? '#FFC107' : 'transparent',
                  color: activeCategory === cat ? '#080808' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>

          <MotionReveal
            key={activeCategory}
            stagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {filteredTestimonials.map((t, idx) => (
              <MotionItem key={`${t.author}-${idx}`}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '36px 30px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '48px',
                        lineHeight: '1',
                        color: '#FFC107',
                        fontFamily: 'serif',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      “
                    </span>
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'rgba(255,255,255,0.92)',
                        lineHeight: 1.65,
                        margin: '0 0 24px',
                      }}
                    >
                      {t.quote}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#FFC107', margin: '0 0 4px' }}>
                      {t.author}
                    </h4>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#fff', margin: '0 0 2px' }}>
                      {t.role}
                    </p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>{t.org}</p>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        id="research"
        style={{ paddingBlock: '100px' }}
      >
        <div
          className="figma-section-head"
          style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 56px' }}
        >
          <div className="figma-kicker figma-kicker--blue" style={{ justifyContent: 'center' }}>
            <span className="figma-kicker__line" />
            <span>{publications.eyebrow}</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 800,
              color: '#0D1B3E',
              margin: '14px 0 16px',
            }}
          >
            {publications.title}
          </h2>
          <p className="figma-subtitle" style={{ color: '#636772', fontSize: '18px' }}>
            {publications.intro}
          </p>
        </div>

        <div style={{ marginBottom: '64px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#0C1427',
              marginBottom: '24px',
              borderBottom: '2px solid #3F51B5',
              paddingBottom: '8px',
              display: 'inline-block',
            }}
          >
            {publications.reportsHeading}
          </h3>

          <MotionReveal
            stagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {publications.reports.map((report) => (
              <MotionItem key={report.edition}>
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e5eb',
                    borderTop: '4px solid #3F51B5',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <div>
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
                      {report.edition}
                    </span>
                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#0C1427', margin: '0 0 8px' }}>
                      {report.title}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#636772', margin: '0 0 20px', lineHeight: 1.5 }}>
                      {report.summary}
                    </p>
                  </div>
                  <Link
                    className="epl-new-btn epl-new-btn--gold"
                    href={publications.reportsCtaUrl}
                    style={{ width: '100%', textAlign: 'center' }}
                  >
                    {publications.reportsCtaLabel} <span>↗</span>
                  </Link>
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>

        <div>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#0C1427',
              marginBottom: '24px',
              borderBottom: '2px solid #FFC107',
              paddingBottom: '8px',
              display: 'inline-block',
            }}
          >
            {publications.researchHeading}
          </h3>

          <MotionReveal
            stagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {publications.research.map((study) => (
              <MotionItem key={study.title}>
                <div
                  style={{
                    background: '#0C1427',
                    color: '#fff',
                    padding: '32px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderTop: '4px solid #FFC107',
                    height: '100%',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '850',
                        color: '#FFC107',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      {study.tag}
                    </span>
                    <h4 style={{ fontSize: '19px', fontWeight: '800', color: '#fff', margin: '0 0 8px' }}>
                      {study.title}
                    </h4>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: 'rgba(255,255,255,0.6)',
                        display: 'block',
                        marginBottom: '14px',
                      }}
                    >
                      {study.authorYear}
                    </span>
                    <p
                      style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.85)',
                        margin: '0 0 24px',
                        lineHeight: 1.55,
                      }}
                    >
                      {study.summary}
                    </p>
                  </div>
                  <Link
                    className="figma-project-btn"
                    href={publications.researchCtaUrl}
                    style={{ color: '#FFC107' }}
                  >
                    {publications.researchCtaLabel} <span>↗</span>
                  </Link>
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>
    </div>
  )
}
