'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

import { AlumniStoriesSection } from '@/components/charitics/AlumniStoriesSection'
import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { EplanPageContent } from '@/utilities/getEplanPageContent'

type ChariticsAlumniPageProps = {
  content: EplanPageContent
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

function SectionHead({
  eyebrow,
  title,
  intro,
  light,
  gold,
}: {
  eyebrow: string
  title: string
  intro?: string
  light?: boolean
  gold?: boolean
}) {
  return (
    <div
      className="figma-section-head"
      style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}
    >
      <div
        className={`figma-kicker ${gold || light ? 'figma-kicker--gold' : 'figma-kicker--blue'}`}
        style={{ justifyContent: 'center' }}
      >
        <span className="figma-kicker__line" />
        <span>{eyebrow}</span>
      </div>
      <h2
        style={{
          fontSize: 'clamp(34px, 3.8vw, 52px)',
          fontWeight: 800,
          color: light ? '#fff' : '#0C1427',
          margin: '14px 0 16px',
        }}
      >
        {title}
      </h2>
      {intro ? (
        <p
          style={{
            margin: 0,
            color: light ? 'rgba(255,255,255,0.88)' : '#636772',
            fontSize: 18,
            lineHeight: 1.65,
          }}
        >
          {intro}
        </p>
      ) : null}
    </div>
  )
}

export function ChariticsAlumniPage({ content }: ChariticsAlumniPageProps) {
  const {
    hero,
    sustain,
    vision,
    eplanAbout,
    impact,
    journey,
    stories,
    pathways,
    milestone,
    gallery,
    news,
    network,
    quote,
  } = content
  const reduceMotion = useReducedMotion()

  return (
    <div className="figma-eplan-page figma-impact-page">
      <section className="figma-about-hero" style={{ minHeight: 520 }}>
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
          style={{ maxWidth: 860, textAlign: 'left', margin: '0 auto 0 0' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <div className="epl-new-shell" style={{ paddingInline: 0 }}>
            <motion.div className="figma-kicker figma-kicker--gold" variants={fadeUp}>
              <span className="figma-kicker__line" />
              <span>{hero.eyebrow}</span>
            </motion.div>
            <motion.h1
              style={{ textAlign: 'left', maxWidth: 820, fontSize: 'clamp(40px, 5vw, 64px)' }}
              variants={fadeUp}
            >
              {hero.title}
            </motion.h1>
            <motion.p style={{ textAlign: 'left', margin: '0 0 32px', maxWidth: 680 }} variants={fadeUp}>
              {hero.lead}
            </motion.p>
            <motion.div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }} variants={fadeUp}>
              <Link className="epl-new-btn epl-new-btn--gold" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </Link>
              <Link
                className="epl-new-btn"
                href={hero.secondaryCta.href}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.45)',
                }}
              >
                {hero.secondaryCta.label}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <MotionReveal as="section" style={{ background: '#0C1427', padding: '36px 0' }}>
        <div className="epl-new-shell">
          <MotionReveal
            stagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 0,
            }}
          >
            {hero.highlights.map((stat, index) => (
              <MotionItem key={stat.label}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '12px 16px',
                    borderRight:
                      index < hero.highlights.length - 1
                        ? '1px solid rgba(255,255,255,0.15)'
                        : undefined,
                  }}
                >
                  <strong
                    style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: index % 2 === 0 ? '#FFC107' : '#fff',
                      display: 'block',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </strong>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.88)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginTop: 8,
                      display: 'block',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section"
        style={{ paddingBlock: '100px', background: '#0C1427' }}
      >
        <div className="epl-new-shell" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="figma-kicker figma-kicker--gold" style={{ justifyContent: 'center', marginBottom: 28 }}>
            <span className="figma-kicker__line" />
            <span>{vision.eyebrow}</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.35,
              margin: '0 0 28px',
              letterSpacing: '-0.02em',
            }}
          >
            “{vision.text}”
          </h2>
          <div style={{ height: 3, width: 64, background: '#FFC107', margin: '0 auto 28px' }} />
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.82)',
              margin: 0,
              maxWidth: 760,
              marginInline: 'auto',
            }}
          >
            {eplanAbout.paragraphs[0]}
          </p>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-section" style={{ paddingBlock: '100px', background: '#fff' }}>
        <div className="epl-new-shell">
          <div
            className="figma-story-grid"
            style={{ marginBottom: 72, gap: 56 }}
          >
            <div className="figma-story-copy">
              <div className="figma-kicker figma-kicker--blue" style={{ marginBottom: 16 }}>
                <span className="figma-kicker__line" />
                <span>{sustain.eyebrow}</span>
              </div>
              <h2 style={{ marginBottom: 20 }}>{sustain.title}</h2>
              <p style={{ marginBottom: 18 }}>{sustain.lead}</p>
              <p style={{ margin: 0, color: '#8891A0', fontSize: 16 }}>{sustain.note}</p>
            </div>
            <div className="figma-story-media" style={{ height: 420 }}>
              <ProjectDetailImage
                alt={sustain.imageAlt}
                className="w-full h-full object-cover"
                fallbackClass="epl-project-card-visual"
                src={sustain.image}
              />
            </div>
          </div>

          <div style={{ maxWidth: 920, margin: '0 auto' }}>
            <div className="figma-kicker figma-kicker--gold" style={{ marginBottom: 20 }}>
              <span className="figma-kicker__line" />
              <span>{sustain.pillarsEyebrow}</span>
            </div>
            <MotionReveal className="figma-selection-stack" stagger style={{ marginTop: 0 }}>
              {sustain.pillars.map((item) => (
                <MotionItem key={item.num}>
                  <div className="figma-selection-card">
                    <span className="figma-selection-num">{item.num}</span>
                    <div className="figma-selection-body">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </MotionItem>
              ))}
            </MotionReveal>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-section" style={{ paddingBlock: 100, background: '#F8F9FA' }}>
        <div className="epl-new-shell">
          <SectionHead eyebrow={impact.eyebrow} title={impact.title} />
          <MotionReveal
            stagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 20,
            }}
          >
            {impact.stats.map((stat) => (
              <MotionItem key={stat.label}>
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e5eb',
                    padding: '28px 20px',
                    textAlign: 'center',
                  }}
                >
                  <strong style={{ fontSize: 36, fontWeight: 900, color: '#3F51B5', display: 'block' }}>
                    {stat.value}
                  </strong>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#636772',
                      marginTop: 8,
                      display: 'block',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-section epl-new-shell" style={{ paddingBlock: 100 }}>
        <SectionHead eyebrow={journey.eyebrow} title={journey.title} intro={journey.intro} gold />
        <MotionReveal
          stagger
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {journey.steps.map((step) => (
            <MotionItem key={step.step}>
              <div
                style={{
                  borderLeft: '4px solid #3F51B5',
                  background: '#F4F6F9',
                  padding: '28px 24px',
                  height: '100%',
                }}
              >
                <span style={{ fontSize: 22, fontWeight: 850, color: '#3F51B5' }}>{step.step}</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0C1427', margin: '10px 0 10px' }}>
                  {step.title}
                </h3>
                <p style={{ margin: 0, color: '#636772', fontSize: 15, lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <AlumniStoriesSection
        eyebrow={stories.eyebrow}
        intro={stories.intro}
        items={stories.items}
        title={stories.title}
      />

      <MotionReveal as="section" className="figma-section" style={{ paddingBlock: 100, background: '#F8F9FA' }}>
        <div className="epl-new-shell">
          <SectionHead eyebrow={pathways.eyebrow} title={pathways.title} intro={pathways.intro} />
          <MotionReveal
            stagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 22,
            }}
          >
            {pathways.items.map((item) => (
              <MotionItem key={item.title}>
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e5eb',
                    padding: '28px 24px',
                    height: '100%',
                  }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0C1427', margin: '0 0 10px' }}>
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, color: '#636772', fontSize: 14, lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-section epl-new-shell" style={{ paddingBlock: 90 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 40,
            alignItems: 'center',
            background: '#0C1427',
            color: '#fff',
            padding: '40px',
          }}
        >
          <div>
            <div className="figma-kicker figma-kicker--gold" style={{ marginBottom: 12 }}>
              <span className="figma-kicker__line" />
              <span>{milestone.eyebrow}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, margin: '0 0 14px', color: '#fff' }}>
              {milestone.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, margin: '0 0 24px' }}>
              {milestone.body}
            </p>
            <Link className="epl-new-btn epl-new-btn--gold" href={milestone.ctaHref}>
              {milestone.ctaLabel}
            </Link>
          </div>
          <div style={{ height: 280, overflow: 'hidden' }}>
            <ProjectDetailImage
              alt={milestone.title}
              className="w-full h-full object-cover"
              fallbackClass="epl-project-card-visual"
              src={milestone.image}
            />
          </div>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-section" style={{ paddingBlock: 90, background: '#F8F9FA' }}>
        <div className="epl-new-shell">
          <SectionHead eyebrow={gallery.eyebrow} title={gallery.title} gold />
          <MotionReveal
            stagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {gallery.images.map((image) => (
              <MotionItem key={image.src}>
                <div style={{ height: 240, overflow: 'hidden' }}>
                  <ProjectDetailImage
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    fallbackClass="epl-project-card-visual"
                    src={image.src}
                  />
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-section epl-new-shell" style={{ paddingBlock: 100 }}>
        <SectionHead eyebrow={news.eyebrow} title={news.title} intro={news.intro} />
        <MotionReveal
          stagger
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {news.items.map((item) => (
            <MotionItem key={item.href}>
              <article
                style={{
                  background: '#fff',
                  border: '1px solid #e2e5eb',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <ProjectDetailImage
                    alt={item.title}
                    className="w-full h-full object-cover"
                    fallbackClass="epl-project-card-visual"
                    src={item.image}
                  />
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0C1427' }}>{item.title}</h3>
                  <p style={{ margin: 0, flex: 1, color: '#636772', fontSize: 14, lineHeight: 1.6 }}>
                    {item.excerpt}
                  </p>
                  <Link href={item.href} style={{ color: '#3F51B5', fontWeight: 800, fontSize: 14 }}>
                    {news.readMoreLabel}
                  </Link>
                </div>
              </article>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal as="section" className="figma-section" style={{ paddingBlock: 100, background: '#0C1427' }}>
        <div className="epl-new-shell">
          <SectionHead eyebrow={network.eyebrow} title={network.title} intro={network.intro} light gold />
          <MotionReveal
            stagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20,
              marginBottom: 36,
            }}
          >
            {network.benefits.map((benefit) => (
              <MotionItem key={benefit.title}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    padding: '28px 22px',
                    height: '100%',
                  }}
                >
                  <h3 style={{ margin: '0 0 10px', color: '#FFC107', fontSize: 18, fontWeight: 800 }}>
                    {benefit.title}
                  </h3>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.82)', fontSize: 14, lineHeight: 1.65 }}>
                    {benefit.description}
                  </p>
                </div>
              </MotionItem>
            ))}
          </MotionReveal>
          <div style={{ textAlign: 'center' }}>
            <a
              className="epl-new-btn epl-new-btn--gold"
              href={network.globalLink.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {network.globalLink.label}
            </a>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-section epl-new-shell" style={{ paddingBlock: 90 }}>
        <blockquote
          style={{
            maxWidth: 860,
            margin: '0 auto',
            textAlign: 'center',
            borderTop: '4px solid #FFC107',
            paddingTop: 36,
          }}
        >
          <p
            style={{
              fontSize: 'clamp(20px, 2.4vw, 28px)',
              fontWeight: 700,
              color: '#0C1427',
              lineHeight: 1.5,
              margin: '0 0 24px',
            }}
          >
            “{quote.text}”
          </p>
          <footer>
            <strong style={{ display: 'block', color: '#3F51B5', fontSize: 16 }}>{quote.attribution}</strong>
            <span style={{ color: '#636772', fontSize: 14 }}>{quote.role}</span>
          </footer>
        </blockquote>
      </MotionReveal>
    </div>
  )
}
