'use client'

import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import type { HeroImageSlide } from '@/config/heroSlides'
import { heroImageSlides } from '@/config/heroSlides'

const easeOut = [0.22, 1, 0.36, 1] as const

const SLIDE_INTERVAL_MS = 7000

function resolveTitleLines(slide: HeroImageSlide): [string, string, string] {
  if (slide.titleLines?.length === 3) return slide.titleLines
  const words = slide.title.trim().split(/\s+/)
  if (words.length <= 3) {
    return [words[0] ?? '', words[1] ?? '', words.slice(2).join(' ') || '.']
  }
  const third = Math.ceil(words.length / 3)
  return [
    words.slice(0, third).join(' '),
    words.slice(third, third * 2).join(' '),
    words.slice(third * 2).join(' '),
  ]
}

type ChariticsHomeHeroProps = {
  image: string
  images?: string[]
  slides?: HeroImageSlide[]
}

export function ChariticsHomeHero({ image, images, slides: slidesProp }: ChariticsHomeHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const slides: HeroImageSlide[] =
    slidesProp && slidesProp.length > 0
      ? slidesProp
      : images && images.length > 0
        ? images.map((src, index) => ({
            ...(heroImageSlides[index] ?? heroImageSlides[0]),
            image: src,
            thumb: src,
          }))
        : [
            {
              ...(heroImageSlides[0] ?? {
                subtitle: 'Emerging Public Leaders of Ghana',
                title: 'Public service is strengthened by people.',
                titleLines: ['Public service is', 'strengthened', 'by people.'] as [
                  string,
                  string,
                  string,
                ],
                description:
                  'We train ethical, smart, and action-driven young leaders to improve government institutions and serve Ghana.',
                ctaLabel: 'Get Involved',
                ctaHref: '/get-involved',
              }),
              image,
              thumb: image,
            },
          ]

  const [slideIndex, setSlideIndex] = useState(0)
  const active = slides[slideIndex] ?? slides[0]
  const titleLines = resolveTitleLines(active)

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
        <AnimatePresence mode="sync">
          <motion.img
            alt={active.title}
            animate={{ opacity: 1 }}
            className="epl-new-hero__image"
            decoding="async"
            exit={{ opacity: 0 }}
            fetchPriority="high"
            initial={{ opacity: 0 }}
            key={active.image}
            loading="eager"
            src={active.image}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </motion.div>

      <div aria-hidden className="epl-new-hero__shade" />

      <motion.div
        className="epl-new-hero__content"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            className="epl-new-hero__copy"
            key={active.title}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            <div className="epl-new-hero__eyebrow">
              <span aria-hidden className="epl-new-hero__eyebrow-line" />
              <span>{active.subtitle}</span>
            </div>

            <div className="epl-new-hero__title-lines">
              {titleLines.map((line, index) => (
                <div
                  className={`epl-new-hero__line epl-new-hero__line--${index + 1}`}
                  key={`${active.title}-${line}`}
                >
                  <div className="epl-new-hero__line-mask">
                    <h1>{line}</h1>
                  </div>
                </div>
              ))}
            </div>

            <p>{active.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="epl-new-hero__actions">
          <Link className="epl-new-hero__btn-primary" href={active.ctaHref || '/get-involved'}>
            {active.ctaLabel || 'Get Involved'}
          </Link>
          <Link className="epl-new-hero__btn-secondary" href="/about">
            Learn More <span aria-hidden>→</span>
          </Link>
        </div>

        {slides.length > 1 ? (
          <div aria-label="Hero slides" className="epl-new-hero__dots" role="tablist">
            {slides.map((slide, index) => (
              <button
                aria-label={`Show slide ${index + 1}`}
                aria-selected={index === slideIndex}
                className={`epl-new-hero__dot${index === slideIndex ? ' is-active' : ''}`}
                key={slide.image + index}
                onClick={() => setSlideIndex(index)}
                type="button"
              />
            ))}
          </div>
        ) : null}
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
