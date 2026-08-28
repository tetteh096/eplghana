'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { AnnualReportsPageContent } from '@/utilities/getAnnualReportsPageContent'

type ChariticsAnnualReportsPageProps = {
  content: AnnualReportsPageContent
}

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
}

export function ChariticsAnnualReportsPage({ content }: ChariticsAnnualReportsPageProps) {
  const { hero, intro, reportsSection, relatedSection, reports, relatedPublications, cta } =
    content
  const reduceMotion = useReducedMotion()

  return (
    <div className="figma-impact-page epl-annual-reports-page">
      <section className="figma-about-hero">
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
          <motion.p variants={fadeUp}>{hero.lead}</motion.p>
        </motion.div>
      </section>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        style={{ paddingBlock: '72px 40px' }}
      >
        <p
          className="figma-subtitle"
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center',
            color: '#636772',
            fontSize: '18px',
            lineHeight: 1.7,
          }}
        >
          {intro}
        </p>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        style={{ paddingBlock: '40px 100px' }}
      >
        <div
          className="figma-section-head"
          style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 48px' }}
        >
          <div className="figma-kicker figma-kicker--blue" style={{ justifyContent: 'center' }}>
            <span className="figma-kicker__line" />
            <span>{reportsSection.eyebrow}</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 800,
              color: '#0D1B3E',
              margin: '14px 0 0',
            }}
          >
            {reportsSection.title}
          </h2>
        </div>

        <MotionReveal
          stagger
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {reports.map((report) => (
            <MotionItem key={report.id}>
              <article className="epl-annual-report-card">
                <div className="epl-annual-report-file-scene" aria-hidden="true">
                  <div className="epl-annual-report-file">
                    <div className="epl-annual-report-file-stack">
                      <span className="epl-annual-report-file-sheet epl-annual-report-file-sheet--1" />
                      <span className="epl-annual-report-file-sheet epl-annual-report-file-sheet--2" />
                      <span className="epl-annual-report-file-sheet epl-annual-report-file-sheet--3" />
                    </div>
                    <div className="epl-annual-report-file-cover">
                      <ProjectDetailImage
                        alt=""
                        className="epl-annual-report-file-img"
                        fallbackClass="epl-annual-report-file-fallback"
                        src={report.coverImage}
                      />
                      <span className="epl-annual-report-file-spine" />
                      <span className="epl-annual-report-file-tab">
                        <span className="epl-annual-report-file-type">PDF</span>
                      </span>
                      <div className="epl-annual-report-file-overlay">
                        <span className="epl-annual-report-file-brand">EPL Ghana</span>
                        <span className="epl-annual-report-file-cover-title">{report.title}</span>
                        {report.year ? (
                          <span className="epl-annual-report-file-year">{report.year}</span>
                        ) : null}
                      </div>
                      <span className="epl-annual-report-file-shine" />
                    </div>
                    <span className="epl-annual-report-file-shadow" />
                  </div>
                </div>

                <div className="epl-annual-report-body">
                  <h3 className="epl-annual-report-title">{report.title}</h3>
                  <p className="epl-annual-report-descr">{report.description}</p>
                  {report.downloadUrl ? (
                    <a
                      className="epl-new-btn epl-new-btn--gold"
                      download
                      href={report.downloadUrl}
                      rel="noopener noreferrer"
                      style={{ width: 'fit-content' }}
                      target="_blank"
                    >
                      Download PDF <span>↗</span>
                    </a>
                  ) : (
                    <span className="epl-annual-report-badge">Coming soon</span>
                  )}
                </div>
              </article>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section"
        style={{ paddingBlock: '100px', background: '#F8F9FA' }}
      >
        <div className="epl-new-shell">
          <div
            className="figma-section-head"
            style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 48px' }}
          >
            <div className="figma-kicker figma-kicker--gold" style={{ justifyContent: 'center' }}>
              <span className="figma-kicker__line" />
              <span>{relatedSection.eyebrow}</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 800,
                color: '#0D1B3E',
                margin: '14px 0 0',
              }}
            >
              {relatedSection.title}
            </h2>
          </div>

          <MotionReveal
            className="epl-annual-related-grid"
            stagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '28px',
            }}
          >
            {relatedPublications.map((publication) => (
              <MotionItem key={publication.id}>
                <article className="epl-annual-publication-card">
                  <div className="epl-annual-publication-file-scene" aria-hidden="true">
                    <div className="epl-annual-publication-file">
                      <div className="epl-annual-publication-file-cover">
                        <span className="epl-annual-publication-file-type">PDF</span>
                        <span className="epl-annual-publication-file-lines" />
                      </div>
                      <span className="epl-annual-publication-file-shadow" />
                    </div>
                  </div>
                  <div className="epl-annual-publication-body">
                    <h3 className="epl-annual-publication-title">{publication.title}</h3>
                    <p className="epl-annual-publication-descr">{publication.description}</p>
                    {publication.downloadUrl ? (
                      <a
                        className="epl-annual-publication-link"
                        download
                        href={publication.downloadUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Download PDF <span>↗</span>
                      </a>
                    ) : null}
                  </div>
                </article>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="bg-[#0f1630] text-white py-16 md:py-20">
        <div className="epl-new-shell">
          <div
            style={{
              background: 'rgba(65, 80, 163, 0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '48px 40px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 28,
            }}
          >
            <div style={{ maxWidth: 640 }}>
              <h2
                style={{
                  margin: '0 0 12px',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: 800,
                  color: '#fff',
                }}
              >
                {cta.title}
              </h2>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.65 }}>
                {cta.body}
              </p>
            </div>
            <Link className="epl-new-btn epl-new-btn--gold" href={cta.ctaHref}>
              {cta.ctaLabel} <span>↗</span>
            </Link>
          </div>
        </div>
      </MotionReveal>
    </div>
  )
}
