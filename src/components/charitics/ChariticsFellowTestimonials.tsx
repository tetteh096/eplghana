'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import type { FellowTestimonialSlide } from '@/config/fellowTestimonials'

type SwiperElement = HTMLElement & { swiper?: SwiperInstance }

type SwiperInstance = {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void
  on: (event: string, handler: () => void) => void
  realIndex: number
  slideToLoop: (index: number) => void
  update: () => void
}

function destroySwiperOn(el: SwiperElement | null) {
  if (!el?.swiper) return
  el.swiper.destroy(true, true)
  el.removeAttribute('style')
  el.querySelector('.swiper-wrapper')?.removeAttribute('style')
}

type SwiperConstructor = new (
  element: HTMLElement,
  options?: Record<string, unknown>,
) => SwiperInstance

export type ChariticsFellowTestimonialsProps = {
  slides: FellowTestimonialSlide[]
  subtitle?: string
  title?: string
  allLink?: string
  allLinkLabel?: string
  showAllLink?: boolean
  className?: string
}

export function ChariticsFellowTestimonials({
  slides,
  subtitle = 'Fellow Voices',
  title = 'What Fellows Say About EPL Ghana',
  allLink = '/community/current-fellows',
  allLinkLabel = 'All Testimonials',
  showAllLink = true,
  className = '',
}: ChariticsFellowTestimonialsProps) {
  const rootRef = useRef<HTMLElement>(null)
  const swiperRef = useRef<SwiperInstance | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const active = slides[activeIndex] ?? slides[0]

  useEffect(() => {
    const root = rootRef.current
    if (!root || slides.length === 0) return

    let instance: SwiperInstance | null = null
    let cancelled = false

    const init = () => {
      const Swiper = (window as Window & { Swiper?: SwiperConstructor }).Swiper
      const sliderEl = root.querySelector<SwiperElement>('.epl-fellow-testimonials-slider')
      if (!Swiper || !sliderEl || cancelled) return

      destroySwiperOn(sliderEl)

      instance = new Swiper(sliderEl, {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        loop: slides.length > 1,
        spaceBetween: 15,
        autoplay:
          slides.length > 1
            ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false,
        navigation: {
          prevEl: root.querySelector('.epl-fellow-testimonials-slider-nav .prev'),
          nextEl: root.querySelector('.epl-fellow-testimonials-slider-nav .next'),
        },
        on: {
          slideChange(sw: SwiperInstance) {
            setActiveIndex(sw.realIndex)
          },
        },
      })
      swiperRef.current = instance
      requestAnimationFrame(() => instance?.update())
    }

    if ((window as Window & { Swiper?: SwiperConstructor }).Swiper) {
      init()
    } else {
      window.setTimeout(init, 120)
    }

    return () => {
      cancelled = true
      swiperRef.current = null
      instance?.destroy(true, true)
      destroySwiperOn(root.querySelector<SwiperElement>('.epl-fellow-testimonials-slider'))
    }
  }, [slides.length])

  if (!active || slides.length === 0) return null

  return (
    <section
      className={`ul-testimonial-2 epl-fellow-testimonials ul-section-spacing ${className}`.trim()}
      ref={rootRef}
    >
      <div className="ul-container wow animate__fadeInUp">
        <div className="ul-section-heading">
          <div>
            <span className="ul-section-sub-title">{subtitle}</span>
            <h2 className="ul-section-title">{title}</h2>
          </div>
          {showAllLink ? (
            <Link className="ul-btn" href={allLink}>
              <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> {allLinkLabel}
            </Link>
          ) : null}
        </div>

        <div className="row ul-testimonial-2-row gy-4 align-items-center">
          <div className="col-md-4">
            <div className="epl-fellow-featured">
              <div className="epl-fellow-featured-img">
                <AnimatePresence mode="wait">
                  <motion.img
                    alt={active.name}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    key={active.id}
                    src={active.photo}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="epl-fellow-featured-meta"
                  exit={{ opacity: 0, y: 8 }}
                  initial={{ opacity: 0, y: 8 }}
                  key={`${active.id}-meta`}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <h3 className="epl-fellow-featured-name">{active.name}</h3>
                  <p className="epl-fellow-featured-role">{active.role}</p>
                </motion.div>
              </AnimatePresence>
              {slides.length > 1 ? (
                <div aria-label="Select fellow" className="epl-fellow-featured-thumbs" role="tablist">
                  {slides.map((slide, index) => (
                    <button
                      aria-label={slide.name}
                      aria-selected={index === activeIndex}
                      className={`epl-fellow-thumb${index === activeIndex ? ' is-active' : ''}`}
                      key={slide.id}
                      onClick={() => {
                        swiperRef.current?.slideToLoop(index)
                        setActiveIndex(index)
                      }}
                      role="tab"
                      type="button"
                    >
                      <img alt={slide.name} src={slide.photo} />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-md-8">
            <div className="epl-fellow-testimonials-slider swiper">
              <div className="swiper-wrapper">
                {slides.map((slide) => (
                  <div className="swiper-slide" key={slide.id}>
                    <div className="ul-review ul-review-2">
                      <span className="icon">
                        <i className="flaticon-quote-1"></i>
                      </span>
                      <p className="ul-review-descr">{slide.quote}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="epl-fellow-testimonials-slider-nav ul-testimonial-2-slider-nav">
                <button className="prev" type="button">
                  <i className="flaticon-back"></i>
                </button>
                <button className="next" type="button">
                  <i className="flaticon-next"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
