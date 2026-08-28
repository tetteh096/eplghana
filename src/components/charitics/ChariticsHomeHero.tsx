'use client'

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

type ChariticsHomeHeroProps = {
  images: string[]
  title: string
  description: string
}

const easeOut = [0.22, 1, 0.36, 1] as const
const SLIDE_MS = 6500
const FADE_S = 0.7

const contentVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
}

const titleRevealVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

export function ChariticsHomeHero({ images, title, description }: ChariticsHomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const slides = useMemo(() => {
    const unique = images.map((src) => src.trim()).filter(Boolean)
    return unique.slice(0, 3)
  }, [images])
  const [activeIndex, setActiveIndex] = useState(0)
  const active = slides[activeIndex] ?? slides[0]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 70])
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.06])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], reduceMotion ? [1, 1] : [1, 0.4])
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 36])

  useEffect(() => {
    if (slides.length <= 1 || reduceMotion) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, SLIDE_MS)

    return () => window.clearInterval(timer)
  }, [slides.length, reduceMotion])

  if (!active) return null

  return (
    <section className="epl-new-hero" ref={sectionRef}>
      <motion.div className="epl-new-hero__media" style={{ y: imageY, scale: imageScale }}>
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            alt="EPL Ghana fellows learning and working together"
            animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.04 }}
            className="epl-new-hero__image"
            decoding="async"
            exit={{ opacity: 0 }}
            fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
            initial={
              activeIndex === 0 || reduceMotion
                ? false
                : { opacity: 0, scale: 1.02 }
            }
            key={active}
            loading={activeIndex === 0 ? 'eager' : 'lazy'}
            src={active}
            transition={{
              opacity: { duration: reduceMotion ? 0 : FADE_S, ease: 'easeInOut' },
              scale: { duration: reduceMotion ? 0 : SLIDE_MS / 1000, ease: 'linear' },
            }}
          />
        </AnimatePresence>
      </motion.div>

      <motion.div
        aria-hidden
        className="epl-new-hero__shade"
        initial={false}
      />

      <motion.div className="epl-new-hero__content" style={{ opacity: contentOpacity, y: contentY }}>
        <motion.div
          animate="show"
          initial={reduceMotion ? false : 'hidden'}
          variants={contentVariants}
        >
          <motion.span className="epl-new-kicker epl-new-kicker--light" variants={riseVariants}>
            Emerging Public Leaders of Ghana
          </motion.span>

          <span className="epl-new-hero__title-mask">
            <motion.h1 variants={titleRevealVariants}>{title}</motion.h1>
          </span>

          <motion.p variants={riseVariants}>{description}</motion.p>

          <motion.div className="epl-new-hero__actions" variants={riseVariants}>
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <Link className="epl-new-btn epl-new-btn--gold" href="/get-involved">
                Get involved <span>↗</span>
              </Link>
            </motion.div>
            <motion.div whileHover={reduceMotion ? undefined : { x: 2 }}>
              <Link className="epl-new-text-action epl-new-text-action--light" href="/about">
                Discover our story <span>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {slides.length > 1 ? (
        <div aria-label="Hero image slides" className="epl-new-hero__dots" role="tablist">
          {slides.map((src, index) => {
            const isActive = index === activeIndex
            return (
              <button
                aria-label={`Show slide ${index + 1}`}
                aria-selected={isActive}
                className={`epl-new-hero__dot${isActive ? ' is-active' : ''}`}
                key={`${src}-${index}`}
                onClick={() => setActiveIndex(index)}
                role="tab"
                type="button"
              >
                {isActive && !reduceMotion ? (
                  <motion.span
                    animate={{ scaleX: 1 }}
                    aria-hidden
                    className="epl-new-hero__dot-progress"
                    initial={{ scaleX: 0 }}
                    key={`progress-${activeIndex}`}
                    transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                  />
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}

      {/* Curve lives inside the hero so the photo fills every gap */}
      <div aria-hidden className="epl-new-hero__curve">
        <svg preserveAspectRatio="none" viewBox="0 0 1440 160">
          <path d="M0,0 L0,48 C240,148 1200,148 1440,48 L1440,160 L0,160 Z" />
        </svg>
      </div>
    </section>
  )
}
