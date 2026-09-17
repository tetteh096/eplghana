'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { MotionReveal } from '@/components/charitics/MotionReveal'
import type { PeaceProjectContent } from '@/utilities/getPeaceProjectContent'

type ChariticsPeaceDetailProps = {
  content: PeaceProjectContent
  visualClass?: string
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

/** Renders plain text with optional **bold** segments. */
function withInlineBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function AboutParagraph({ paragraph, index }: { paragraph: string; index: number }) {
  return (
    <p
      className={
        index === 0
          ? 'figma-wotr-about__paragraph figma-wotr-about__paragraph--lead'
          : 'figma-wotr-about__paragraph'
      }
    >
      {withInlineBold(paragraph)}
    </p>
  )
}

export function ChariticsPeaceDetail({ content }: ChariticsPeaceDetailProps) {
  const { hero, aboutEyebrow, aboutTitle, aboutParagraphs, modelHighlight } = content
  const reduceMotion = useReducedMotion()
  const primaryHero = hero.images[0]

  return (
    <div className="figma-peace-page">
      <section className="figma-wotr-hero figma-peace-hero">
        <motion.div
          animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.04 }}
          className="figma-wotr-hero__photo"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          style={{ backgroundImage: `url(${primaryHero})` }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
        <div className="figma-peace-hero__overlay" />

        <motion.div
          animate="show"
          className="figma-wotr-hero__content"
          initial={reduceMotion ? false : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <div className="figma-wotr-hero__copy">
            <motion.div className="figma-wotr-kicker figma-wotr-kicker--gold" variants={fadeUp}>
              <span className="figma-wotr-kicker__line" />
              <span>{hero.eyebrow}</span>
            </motion.div>
            <motion.h1 className="figma-wotr-hero__title" variants={fadeUp}>
              {hero.title}
            </motion.h1>
            <motion.p className="figma-wotr-hero__lead" variants={fadeUp}>
              {withInlineBold(hero.lead)}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link className="figma-wotr-hero__cta" href={hero.ctaHref}>
                {hero.ctaLabel}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <MotionReveal as="section" className="figma-wotr-body figma-peace-body">
        <div className="figma-wotr-shell">
          <div className="figma-peace-about">
            <div className="figma-peace-about__copy">
              <div className="figma-wotr-kicker figma-wotr-kicker--blue">
                <span className="figma-wotr-kicker__line" />
                <span>{aboutEyebrow}</span>
              </div>
              <h2 className="figma-wotr-about__title">{aboutTitle}</h2>
              {aboutParagraphs.map((paragraph, idx) => (
                <AboutParagraph index={idx} key={idx} paragraph={paragraph} />
              ))}
            </div>

            <aside className="figma-peace-highlight">
              <div className="figma-wotr-kicker figma-wotr-kicker--gold">
                <span className="figma-wotr-kicker__line" />
                <span>{modelHighlight.eyebrow}</span>
              </div>
              <h3 className="figma-peace-highlight__title">{modelHighlight.title}</h3>
              <p className="figma-peace-highlight__body">{modelHighlight.body}</p>
              <div className="figma-peace-highlight__agencies">
                <div className="figma-peace-highlight__agencies-label">
                  {modelHighlight.agenciesLabel}
                </div>
                {modelHighlight.agencies.map((agency) => (
                  <div key={agency}>• {agency}</div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </MotionReveal>
    </div>
  )
}
