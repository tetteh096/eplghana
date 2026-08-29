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

function StatIcon({ type }: { type: 'people' | 'building' | 'award' | 'trend' }) {
  const common = { width: 26, height: 26, fill: 'none', stroke: '#4150A3', strokeWidth: 2 }
  if (type === 'people') {
    return (
      <svg aria-hidden viewBox="0 0 24 24" {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  if (type === 'building') {
    return (
      <svg aria-hidden viewBox="0 0 24 24" {...common}>
        <rect height="16" rx="1" width="16" x="4" y="4" />
        <path d="M9 20v-4h6v4" />
        <path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01" />
      </svg>
    )
  }
  if (type === 'award') {
    return (
      <svg aria-hidden viewBox="0 0 24 24" {...common}>
        <circle cx="12" cy="8" r="6" />
        <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11" />
      </svg>
    )
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" {...common}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

const statIcons = ['people', 'building', 'award', 'trend'] as const

export function ChariticsImpactPage({ content }: ChariticsImpactPageProps) {
  const { hero, glance, successStories, communityStories, testimonials, publications } = content
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

  const featuredStories = successStories.items.slice(0, 3)

  return (
    <div className="figma-impact-page">
      <section className="figma-impact-hero">
        <motion.div
          animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.04 }}
          className="figma-impact-hero__bg"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          style={{ backgroundImage: `url(${hero.image})` }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
        <div className="figma-impact-hero__overlay" />
        <motion.div
          animate="show"
          className="figma-impact-hero__content epl-new-shell"
          initial={reduceMotion ? false : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div className="figma-impact-kicker figma-impact-kicker--center" variants={fadeUp}>
            <span className="figma-impact-kicker__line" />
            <span>{hero.eyebrow.toUpperCase()}</span>
          </motion.div>
          <motion.h1 variants={fadeUp}>{hero.title}</motion.h1>
          <motion.p variants={fadeUp}>{hero.description}</motion.p>
        </motion.div>
      </section>

      <MotionReveal as="section" className="figma-impact-glance epl-new-shell" id="overview">
        <div className="figma-impact-kicker">
          <span className="figma-impact-kicker__line" />
          <span>{glance.eyebrow.toUpperCase()}</span>
        </div>
        {glance.title ? <h2 className="figma-impact-glance__title">{glance.title}</h2> : null}
        <MotionReveal className="figma-impact-glance__grid" stagger>
          {glance.stats.map((item, index) => (
            <MotionItem key={item.title}>
              <div className="figma-impact-stat">
                <StatIcon type={statIcons[index % statIcons.length]} />
                <div className="figma-impact-stat__value">{item.value}</div>
                <div className="figma-impact-stat__label">{item.title}</div>
                <p>{item.desc}</p>
              </div>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal as="section" className="figma-impact-stories epl-new-shell" id="success-stories">
        <div className="figma-impact-section-head figma-impact-section-head--stories">
          <div className="figma-impact-kicker">
            <span className="figma-impact-kicker__line" />
            <span>{successStories.eyebrow.toUpperCase()}</span>
          </div>
          {successStories.title ? <h2>{successStories.title}</h2> : null}
        </div>
        <MotionReveal className="figma-impact-stories__grid" stagger>
          {featuredStories.map((story) => (
            <MotionItem key={story.name}>
              <article className="figma-impact-story-card">
                <div
                  className="figma-impact-story-card__image"
                  style={{ backgroundImage: `url(${story.image})` }}
                />
                <div className="figma-impact-story-card__body">
                  <span className="figma-impact-story-card__cohort">{story.cohort}</span>
                  <h3>{story.name}</h3>
                  <div className="figma-impact-story-card__role">{story.role}</div>
                  <p>{story.desc}</p>
                </div>
              </article>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal as="section" className="figma-impact-communities epl-new-shell" id="community-stories">
        <div className="figma-impact-communities__head">
          <div>
            <div className="figma-impact-kicker">
              <span className="figma-impact-kicker__line" />
              <span>{communityStories.eyebrow.toUpperCase()}</span>
            </div>
            <h2>{communityStories.title}</h2>
          </div>
          <p>{communityStories.intro}</p>
        </div>

        <MotionReveal className="figma-impact-communities__grid" stagger>
          {communityStories.items.map((item) => (
            <MotionItem key={item.num}>
              <article className="figma-impact-community-card">
                {item.image ? (
                  <div className="figma-impact-community-card__media">
                    <div
                      className="figma-impact-community-card__image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <span className="figma-impact-community-card__num">{item.num}</span>
                  </div>
                ) : (
                  <div className="figma-impact-community-card__media figma-impact-community-card__media--compact">
                    <span className="figma-impact-community-card__num">{item.num}</span>
                  </div>
                )}
                <div className="figma-impact-community-card__body">
                  <div className="figma-impact-community-card__region">{item.region}</div>
                  <h3>{item.assembly}</h3>
                  <span className="figma-impact-community-card__focus">{item.title}</span>
                  <p>{item.desc}</p>
                </div>
              </article>
            </MotionItem>
          ))}
        </MotionReveal>

        <div className="figma-impact-communities__cta">
          <Link className="figma-impact-outline-btn" href={communityStories.ctaUrl}>
            {communityStories.ctaLabel} <span aria-hidden>→</span>
          </Link>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-impact-testimonials epl-new-shell" id="testimonials">
        <div className="figma-impact-testimonials__head">
          <div className="figma-impact-kicker figma-impact-kicker--center">
            <span className="figma-impact-kicker__line" />
            <span>{testimonials.eyebrow.toUpperCase()}</span>
            <span className="figma-impact-kicker__line" />
          </div>
          <h2>{testimonials.title}</h2>
          <p>{testimonials.intro}</p>
        </div>

        <div className="figma-impact-testimonials__tabs">
          {(['All', 'Supervisors', 'Mentors', 'Partnered Institutions'] as const).map((cat) => (
            <button
              className={`figma-impact-testimonials__tab${activeCategory === cat ? ' is-active' : ''}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        <MotionReveal className="figma-impact-testimonials__grid" key={activeCategory} stagger>
          {filteredTestimonials.map((t, idx) => (
            <MotionItem key={`${t.author}-${idx}`}>
              <article className="figma-impact-testimonial-card">
                <div>
                  <span className="figma-impact-testimonial-card__quote">“</span>
                  <blockquote>{t.quote}</blockquote>
                </div>
                <div className="figma-impact-testimonial-card__author">
                  <img alt={t.author} decoding="async" loading="lazy" src={t.image} />
                  <div>
                    <div className="figma-impact-testimonial-card__name">{t.author}</div>
                    <div className="figma-impact-testimonial-card__role">{t.role}</div>
                    <div className="figma-impact-testimonial-card__org">{t.org}</div>
                  </div>
                </div>
              </article>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal as="section" className="figma-impact-publications epl-new-shell" id="research">
        <div className="figma-impact-publications__head">
          <div className="figma-impact-kicker figma-impact-kicker--center">
            <span className="figma-impact-kicker__line" />
            <span>{publications.eyebrow.toUpperCase()}</span>
            <span className="figma-impact-kicker__line" />
          </div>
          <h2>{publications.title}</h2>
          <p>{publications.intro}</p>
        </div>

        <div className="figma-impact-publications__block">
          <div className="figma-impact-publications__subhead">
            <span className="figma-impact-publications__subline figma-impact-publications__subline--blue" />
            <h3>{publications.reportsHeading}</h3>
          </div>
          <MotionReveal className="figma-impact-reports__grid" stagger>
            {publications.reports.map((report) => (
              <MotionItem key={report.edition}>
                <article className="figma-impact-report-card">
                  <div>
                    <span className="figma-impact-report-card__edition">{report.edition}</span>
                    <h4>{report.title}</h4>
                    <p>{report.summary}</p>
                  </div>
                  <Link
                    className="figma-impact-report-card__cta"
                    href={report.href || publications.reportsCtaUrl}
                    {...(report.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span>{publications.reportsCtaLabel}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </article>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>

        <div className="figma-impact-publications__block">
          <div className="figma-impact-publications__subhead">
            <span className="figma-impact-publications__subline figma-impact-publications__subline--gold" />
            <h3>{publications.researchHeading}</h3>
          </div>
          <MotionReveal className="figma-impact-research__grid" stagger>
            {publications.research.map((study) => (
              <MotionItem key={study.title}>
                <article className="figma-impact-research-card">
                  <div>
                    <span className="figma-impact-research-card__tag">{study.tag}</span>
                    <h4>{study.title}</h4>
                    <div className="figma-impact-research-card__author">{study.authorYear}</div>
                    <p>{study.summary}</p>
                  </div>
                  <Link
                    className="figma-impact-research-card__cta"
                    href={study.href || publications.researchCtaUrl}
                    {...(study.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span>{publications.researchCtaLabel}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </article>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>
    </div>
  )
}
