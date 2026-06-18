'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { eplHomeImages } from '@/config/eplMedia'
import { type HeroImageSlide, heroImageSlides } from '@/config/heroSlides'
import type { SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type ChariticsHeroUnifiedProps = {
  settings: SiteSetting
  slides?: HeroImageSlide[]
  avatars?: string[]
}

const defaultHeroAvatars = [
  eplHomeImages.fellows.miriam,
  eplHomeImages.fellows.priscilla,
  eplHomeImages.fellows.anita,
]

type SwiperElement = HTMLElement & { swiper?: SwiperInstance }

type SwiperInstance = {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void
  realIndex: number
  update: () => void
  on: (event: string, handler: (swiper: SwiperInstance) => void) => void
}

function destroySwiperOn(el: SwiperElement | null) {
  if (!el?.swiper) return
  el.swiper.destroy(true, true)
  el.removeAttribute('style')
  el.querySelector('.swiper-wrapper')?.removeAttribute('style')
}

type SwiperConstructor = new (
  element: HTMLElement | string,
  options?: Record<string, unknown>,
) => SwiperInstance

function syncHeroSlide(root: HTMLElement, isHome1: boolean) {
  root.setAttribute('data-active-slide', isHome1 ? 'home1' : 'home2')

  const nav = root.querySelector<HTMLElement>('.epl-hero-unified-nav')
  if (!nav) return

  if (isHome1) {
    root.appendChild(nav)
    return
  }

  const home2Section = root.querySelector<HTMLElement>(
    '.epl-hero-swiper .swiper-slide-active .epl-hero-slide-home2',
  )
  if (home2Section) {
    home2Section.appendChild(nav)
  }
}

/**
 * One autoplay slider, self-contained; slide changes never touch body/header layout.
 * Slide 1 = Home 1 ul-banner. Slides 2 to 4 = Home 2 image banners.
 */
export function ChariticsHeroUnified({
  settings,
  slides = heroImageSlides,
  avatars,
}: ChariticsHeroUnifiedProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroImage = getMediaUrl(settings.heroImage) ?? eplHomeImages.heroDefault
  const statAvatars = avatars && avatars.length > 0 ? avatars : defaultHeroAvatars

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let thumbInstance: SwiperInstance | null = null
    let mainInstance: SwiperInstance | null = null
    let attempts = 0
    let timer: number | undefined

    syncHeroSlide(root, true)

    // ── Floating header over the full-screen hero ───────────────────────────
    // The header overlays the dark Home-1 banner (transparent, white text) so
    // the hero fills the screen; it flips to a solid bar on the inset image-card
    // slides (Home-2) and once you scroll past the sticky threshold (80px).
    const headerEl = document.querySelector<HTMLElement>('#epl-site-header')
    let isHome1 = true

    const syncHeaderHeight = () => {
      if (headerEl) {
        document.body.style.setProperty('--epl-header-h', `${headerEl.offsetHeight}px`)
      }
    }
    const syncHeroMode = () => {
      const overlay = isHome1 && window.scrollY <= 80
      document.body.setAttribute('data-hero-mode', overlay ? 'overlay' : 'solid')
    }

    syncHeaderHeight()
    syncHeroMode()
    window.addEventListener('scroll', syncHeroMode, { passive: true })
    window.addEventListener('resize', syncHeaderHeight)

    const init = () => {
      const Swiper = (window as Window & { Swiper?: SwiperConstructor }).Swiper
      if (!Swiper) return false

      const mainEl = root.querySelector<SwiperElement>('.epl-hero-swiper')
      const thumbEl = root.querySelector<SwiperElement>('.epl-hero-thumb-swiper')
      const prevEl = root.querySelector<HTMLElement>('.epl-hero-unified-nav .prev')
      const nextEl = root.querySelector<HTMLElement>('.epl-hero-unified-nav .next')

      if (!mainEl || !thumbEl || !prevEl || !nextEl) return false

      destroySwiperOn(mainEl)
      destroySwiperOn(thumbEl)

      thumbInstance = new Swiper(thumbEl, {
        slidesPerView: 3,
        spaceBetween: 10,
        slideToClickedSlide: true,
        loop: true,
        speed: 800,
        centeredSlides: true,
        watchSlidesProgress: true,
      })

      mainInstance = new Swiper(mainEl, {
        slidesPerView: 1,
        loop: true,
        speed: 800,
        // Collapse the wrapper to the ACTIVE slide's height (and animate it on
        // transition). Without this, the tall Home-1 banner slide forces the
        // wrapper tall, leaving a white gap below the shorter Home-2 cards.
        autoHeight: true,
        autoplay: {
          delay: 8000,
          disableOnInteraction: false,
        },
        navigation: {
          prevEl,
          nextEl,
        },
        thumbs: {
          swiper: thumbInstance,
        },
      })

      const activeMainInstance = mainInstance

      const onSlideChange = (swiper: SwiperInstance) => {
        isHome1 = swiper.realIndex === 0
        syncHeroSlide(root, isHome1)
        syncHeroMode()
      }

      onSlideChange(activeMainInstance)
      requestAnimationFrame(() => onSlideChange(activeMainInstance))
      activeMainInstance.on('slideChange', onSlideChange)
      activeMainInstance.on('slideChangeTransitionEnd', onSlideChange)

      requestAnimationFrame(() => {
        mainInstance?.update()
        thumbInstance?.update()
        window.dispatchEvent(new Event('resize'))
      })
      return true
    }

    timer = window.setInterval(() => {
      attempts += 1
      if (init() || attempts > 40) {
        window.clearInterval(timer)
      }
    }, 150)

    return () => {
      if (timer) window.clearInterval(timer)
      window.removeEventListener('scroll', syncHeroMode)
      window.removeEventListener('resize', syncHeaderHeight)
      document.body.removeAttribute('data-hero-mode')
      document.body.style.removeProperty('--epl-header-h')
      mainInstance?.destroy(true, true)
      thumbInstance?.destroy(true, true)
      const nav = root.querySelector<HTMLElement>('.epl-hero-unified-nav')
      if (nav) root.appendChild(nav)

      root.removeAttribute('data-active-slide')
      destroySwiperOn(root.querySelector<SwiperElement>('.epl-hero-swiper'))
      destroySwiperOn(root.querySelector<SwiperElement>('.epl-hero-thumb-swiper'))
    }
  }, [])

  return (
    <div className="epl-hero-unified" data-active-slide="home1" ref={rootRef}>
      <div className="epl-hero-swiper swiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <section className="ul-banner epl-hero-slide-home1">
              <div className="ul-banner-container">
                <div className="row gy-4 row-cols-lg-2 row-cols-1 align-items-center flex-column-reverse flex-lg-row">
                  <div className="col">
                    <div className="ul-banner-txt">
                      <div className="wow animate__fadeInUp">
                        <span className="ul-banner-sub-title ul-section-sub-title">
                          {settings.heroSubtitle ?? 'Emerging Public Leaders of Ghana'}
                        </span>
                        <h1 className="ul-banner-title">
                          {settings.heroTitle ??
                            'Nurturing a New Generation of Public Service Professionals'}
                        </h1>
                        <p className="ul-banner-descr">
                          {settings.heroDescription ??
                            'We empower Ghanaian youth with the knowledge, skills, and network to become effective agents of change within Ghana’s Public Service.'}
                        </p>
                        <div className="ul-banner-btns">
                          <Link className="ul-btn" href={settings.heroCtaUrl ?? '/about'}>
                            <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                            {settings.heroCtaLabel ?? 'Learn More'}
                          </Link>
                          <div className="ul-banner-stat">
                            <div className="imgs">
                              {statAvatars.map((src, i) => (
                                <img alt="EPL fellow" key={`${src}-${i}`} src={src} />
                              ))}
                              <span className="number">{settings.heroStatValue ?? '200+'}</span>
                            </div>
                            <span className="txt">
                              {settings.heroStatLabel ?? 'Fellows trained'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <img
                        alt=""
                        className="ul-banner-txt-vector"
                        src="/assets/img/vector-img.png"
                      />
                    </div>
                  </div>
                  <div className="col align-self-start">
                    <div className="ul-banner-img">
                      <div className="img-wrapper">
                        <img alt="EPL Ghana" src={heroImage} />
                      </div>
                      <div className="ul-banner-img-vectors">
                        <img
                          alt=""
                          className="vector-1 wow animate__fadeInRight"
                          src="/assets/img/banner-img-vector-1.png"
                        />
                        <img
                          alt=""
                          className="vector-2 wow animate__fadeInDown"
                          src="/assets/img/banner-img-vector-2.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {slides.map((slide) => (
            <div className="swiper-slide" key={slide.title}>
              <section className="ul-banner ul-banner-2 epl-hero-slide-home2">
                <div className="ul-banner-2-slider epl-hero-home2-frame">
                  <div className="ul-banner-2-slide">
                    <img alt="" className="ul-banner-2-slide-bg-img" src={slide.image} />
                    <div className="row gy-4 align-items-center">
                      <div className="col-md-7">
                        <div className="ul-banner-txt">
                          <div className="wow animate__fadeInUp">
                            <span className="ul-banner-sub-title ul-section-sub-title">
                              {slide.subtitle}
                            </span>
                            <h2 className="ul-banner-title">{slide.title}</h2>
                            <p className="ul-banner-descr">{slide.description}</p>
                            <div className="ul-banner-btns">
                              <Link className="ul-btn" href={slide.ctaHref}>
                                <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                                {slide.ctaLabel}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>

      <div className="ul-banner-2-slider-navigation epl-hero-unified-nav">
        <button aria-label="Previous slide" className="prev" type="button">
          <img alt="" src="/assets/img/banner-2-slider-arrow-left.svg" />
        </button>
        <div className="ul-banner-2-thumb-slider epl-hero-thumb-swiper swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img alt="Main hero" src={heroImage} />
            </div>
            {slides.map((slide) => (
              <div className="swiper-slide" key={`thumb-${slide.title}`}>
                <img alt={slide.subtitle} src={slide.thumb} />
              </div>
            ))}
          </div>
        </div>
        <button aria-label="Next slide" className="next" type="button">
          <img alt="" src="/assets/img/banner-2-slider-arrow-right.svg" />
        </button>
      </div>
    </div>
  )
}
