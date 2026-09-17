'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { WotrProjectContent } from '@/utilities/getWotrProjectContent'

type ChariticsWotrDetailProps = {
  content: WotrProjectContent
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

const EMPHASIS_NAMES = ['Co-Impact', 'Office of the Head of Civil Service (OHCS)'] as const

/** Render CMS paragraphs as-is; bold known partner names only when present in the text. */
function AboutParagraph({ paragraph }: { paragraph: string }) {
  const pattern = new RegExp(`(${EMPHASIS_NAMES.map(escapeRegExp).join('|')})`, 'g')
  const parts = paragraph.split(pattern)

  return (
    <p className="figma-wotr-about__paragraph">
      {parts.map((part, i) =>
        (EMPHASIS_NAMES as readonly string[]).includes(part) ? (
          <strong key={i}>{part}</strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  )
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function ChariticsWotrDetail({
  content,
  visualClass = 'epl-project-card-visual--women-on-the-rise',
}: ChariticsWotrDetailProps) {
  const { hero, aboutEyebrow, aboutTitle, aboutImage, whyItMatters, impact } = content
  const reduceMotion = useReducedMotion()
  const primaryHero = hero.images[0]
  const aboutParagraphs = hero.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)

  return (
    <div className="figma-wotr-page">
      <section className="figma-wotr-hero">
        <motion.div
          animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.04 }}
          className="figma-wotr-hero__photo"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          style={{ backgroundImage: `url(${primaryHero})` }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
        <div className="figma-wotr-hero__overlay" />

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
              {hero.lead}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link className="figma-wotr-hero__cta" href={hero.ctaHref}>
                {hero.ctaLabel}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <MotionReveal as="section" className="figma-wotr-stats">
        <div className="figma-wotr-shell">
          <MotionReveal className="figma-wotr-stats__grid" stagger>
            {impact.stats.map((s, i) => (
              <MotionItem className="figma-wotr-stat" key={i}>
                <div className="figma-wotr-stat__value">{s.value}</div>
                <div className="figma-wotr-stat__label">{s.label}</div>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>

      <MotionReveal as="section" className="figma-wotr-body">
        <div className="figma-wotr-shell">
          <div className="figma-wotr-about">
            <div className="figma-wotr-about__copy">
              <div className="figma-wotr-kicker figma-wotr-kicker--blue">
                <span className="figma-wotr-kicker__line" />
                <span>{aboutEyebrow}</span>
              </div>
              <h2 className="figma-wotr-about__title">{aboutTitle}</h2>
              {aboutParagraphs.map((paragraph, idx) => (
                <AboutParagraph key={idx} paragraph={paragraph} />
              ))}
            </div>

            <div className="figma-wotr-about__media">
              <ProjectDetailImage
                alt={aboutTitle}
                className="figma-wotr-about__img"
                fallbackClass={`epl-project-card-visual epl-wotr-about-fallback ${visualClass}`}
                src={aboutImage}
              />
            </div>
          </div>

          <MotionReveal className="figma-wotr-pillars" stagger>
            {whyItMatters.items.map((pillar, i) => (
              <MotionItem key={`${pillar.title}-${i}`}>
                <article className="figma-wotr-pillar">
                  <div className="figma-wotr-pillar__label">Pillar 0{i + 1}</div>
                  <h3 className="figma-wotr-pillar__title">{pillar.title}</h3>
                  <p className="figma-wotr-pillar__text">{pillar.description}</p>
                </article>
              </MotionItem>
            ))}
          </MotionReveal>
        </div>
      </MotionReveal>
    </div>
  )
}
