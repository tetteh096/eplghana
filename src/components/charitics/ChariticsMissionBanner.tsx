'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

import { heroImageSlides } from '@/config/heroSlides'
import { eplHomeImages } from '@/config/eplMedia'
import type { SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const DEFAULT_QUOTE =
  'EPL Ghana doesn’t just train leaders; we transform Ghana’s public service from the inside out. We rigorously select and embed Africa’s brightest young professionals within key government institutions, ensuring that leadership and innovation are championed from within the civil service to drive sustainable national development.'

const SLIDE_MS = 7000
const FADE_MS = 1400

type MissionSlide = {
  src: string
  caption?: string
}

type ChariticsMissionBannerProps = {
  settings: SiteSetting
}

function buildSlides(settings: SiteSetting): MissionSlide[] {
  const fromArray =
    settings.missionBannerImages
      ?.map((row) => {
        const src = getMediaUrl(row.image)
        if (!src) return null
        return row.caption ? { src, caption: row.caption } : { src }
      })
      .filter((row): row is MissionSlide => row !== null) ?? []

  if (fromArray.length > 0) return fromArray

  const singles = [
    getMediaUrl(settings.missionBannerImage),
    getMediaUrl(settings.aboutImage),
    getMediaUrl(settings.heroImage),
  ].filter((src): src is string => Boolean(src))

  if (singles.length > 0) {
    return singles.map((src) => ({ src }))
  }

  if (eplHomeImages.missionBanner.length > 0) {
    return eplHomeImages.missionBanner.map((src) => ({ src }))
  }

  const heroSlides = heroImageSlides.map((slide) => ({ src: slide.image }))
  if (heroSlides.length > 0) return heroSlides

  return [{ src: eplHomeImages.aboutMain }]
}

export function ChariticsMissionBanner({ settings }: ChariticsMissionBannerProps) {
  const quote = settings.missionBannerQuote ?? DEFAULT_QUOTE
  const slides = useMemo(() => buildSlides(settings), [settings])
  const [activeIndex, setActiveIndex] = useState(0)
  const active = slides[activeIndex] ?? slides[0]

  useEffect(() => {
    if (slides.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, SLIDE_MS)

    return () => window.clearInterval(timer)
  }, [slides.length])

  if (!active) return null

  return (
    <section aria-label="Our mission" className="epl-mission-banner ul-cta">
      <div aria-hidden className="epl-mission-banner__slides">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            animate={{ opacity: 1, scale: 1.1 }}
            className="epl-mission-banner__slide"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, scale: 1.02 }}
            key={active.src}
            style={{ backgroundImage: `url(${active.src})` }}
            transition={{
              opacity: { duration: FADE_MS / 1000, ease: 'easeInOut' },
              scale: { duration: SLIDE_MS / 1000, ease: 'linear' },
            }}
          />
        </AnimatePresence>
      </div>

      <div aria-hidden className="epl-mission-banner__overlay" />

      <div className="ul-container epl-mission-banner__inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-60px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="ul-section-sub-title epl-mission-banner__eyebrow">Our Mission</span>
          <blockquote className="ul-cta-title epl-mission-banner__quote">{quote}</blockquote>
        </motion.div>

        {slides.length > 1 ? (
          <div
            aria-label="Mission slideshow navigation"
            className="epl-mission-banner__controls"
            role="tablist"
          >
            {slides.map((slide, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  aria-label={slide.caption ?? `Slide ${index + 1}`}
                  aria-selected={isActive}
                  className={`epl-mission-banner__dot${isActive ? ' is-active' : ''}`}
                  key={`${slide.src}-${index}`}
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  type="button"
                >
                  {isActive ? (
                    <motion.span
                      aria-hidden
                      className="epl-mission-banner__dot-progress"
                      animate={{ scaleX: 1 }}
                      initial={{ scaleX: 0 }}
                      key={activeIndex}
                      transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                    />
                  ) : null}
                </button>
              )
            })}
          </div>
        ) : null}
      </div>

      <img alt="" className="ul-cta-vector" src="/assets/img/cta-vector.svg" />
    </section>
  )
}
