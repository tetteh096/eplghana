'use client'

import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const HERO_LINES = ['Public Service is', 'Strengthened', 'by People'] as const

const HERO_DESCRIPTION =
  'Developing ethical, critical-thinking and change-driven public leaders to strengthen public service institutions.'

const easeOut = [0.22, 1, 0.36, 1] as const

const SLIDE_INTERVAL_MS = 6000

type ChariticsHomeHeroProps = {
  image: string
  images?: string[]
}

export function ChariticsHomeHero({ image, images }: ChariticsHomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const slides = images && images.length > 1 ? images : [image]
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2 || reduceMotion) return
    const timer = setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length)
    }, SLIDE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [slides.length, reduceMotion])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1.05, 1.05] : [1.05, 1.12],
  )
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 48])
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.6],
    reduceMotion ? [1, 1] : [1, 0.35],
  )

  return (
    <section className="epl-new-hero" ref={sectionRef}>
      <motion.div
        animate={{ opacity: 1 }}
        className="epl-new-hero__media"
        initial={reduceMotion ? false : { opacity: 0 }}
        style={{ scale: imageScale }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <AnimatePresence>
          <motion.img
            alt="EPL Ghana fellows standing together overlooking the landscape"
            animate={{ opacity: 1 }}
            className="epl-new-hero__image"
            decoding="async"
            exit={{ opacity: 0 }}
            fetchPriority="high"
            initial={{ opacity: 0 }}
            key={slides[slideIndex]}
            loading="eager"
            src={slides[slideIndex]}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </motion.div>

      <div aria-hidden className="epl-new-hero__shade" />

      <motion.div
        className="epl-new-hero__content"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="epl-new-hero__eyebrow"
          initial={reduceMotion ? false : { opacity: 0, x: -24 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
        >
          <span aria-hidden className="epl-new-hero__eyebrow-line" />
          <span>Emerging Public Leaders of Ghana</span>
        </motion.div>

        <div className="epl-new-hero__title-lines">
          {HERO_LINES.map((line, index) => (
            <div
              className={`epl-new-hero__line epl-new-hero__line--${index + 1}`}
              key={line}
            >
              <div className="epl-new-hero__line-mask">
                <motion.h1
                  animate={{ opacity: 1, y: 0 }}
                  initial={reduceMotion ? false : { opacity: 0, y: 100 }}
                  transition={{
                    duration: 1,
                    delay: 0.45 + index * 0.16,
                    ease: easeOut,
                  }}
                >
                  {line}
                </motion.h1>
              </div>
            </div>
          ))}
        </div>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 1.05, ease: easeOut }}
        >
          {HERO_DESCRIPTION}
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="epl-new-hero__actions"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 1.25, ease: easeOut }}
        >
          <Link className="epl-new-hero__btn-primary" href="/get-involved">
            Get Involved
          </Link>
          <Link className="epl-new-hero__btn-secondary" href="/about">
            Learn More <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        aria-hidden
        className="epl-new-hero__scroll"
        initial={reduceMotion ? false : { opacity: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          className="epl-new-hero__scroll-line"
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: 'easeInOut',
          }}
        />
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
