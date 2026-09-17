'use client'

import { useEffect } from 'react'

type SwiperInstance = {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void
  update: () => void
}

type SwiperConstructor = new (
  element: HTMLElement,
  options?: Record<string, unknown>,
) => SwiperInstance

type SwiperElement = HTMLElement & { swiper?: SwiperInstance }

function getSwiper(): SwiperConstructor | undefined {
  return (window as Window & { Swiper?: SwiperConstructor }).Swiper
}

function destroySwiperOn(el: SwiperElement | null) {
  if (!el?.swiper) return
  el.swiper.destroy(true, true)
  el.removeAttribute('style')
  el.querySelector('.swiper-wrapper')?.removeAttribute('style')
}

function initWhenReady(init: () => void) {
  if (getSwiper()) {
    init()
    return () => undefined
  }

  let attempts = 0
  const timer = window.setInterval(() => {
    attempts += 1
    if (getSwiper()) {
      window.clearInterval(timer)
      init()
    } else if (attempts >= 40) {
      window.clearInterval(timer)
    }
  }, 100)

  return () => window.clearInterval(timer)
}

/**
 * Homepage-only Swipers, mount on enter, destroy on leave.
 * Prevents layout distortion when navigating back via Next.js client routing.
 */
export function ChariticsHomeSwipers() {
  useEffect(() => {
    const instances: SwiperInstance[] = []
    let cancelled = false
    let clearWait: (() => void) | undefined

    const setup = () => {
      if (cancelled) return

      const Swiper = getSwiper()
      if (!Swiper) return

      const donationsEl = document.querySelector<SwiperElement>('.epl-donations-slider')
      const blogsEl = document.querySelector<SwiperElement>('.epl-blogs-slider')

      destroySwiperOn(donationsEl)
      destroySwiperOn(blogsEl)

      if (donationsEl) {
        const slideCount =
          Number(donationsEl.dataset.slideCount) ||
          donationsEl.querySelectorAll('.swiper-slide').length
        // With 3 or fewer cards everything fits at desktop, so there is nothing
        // to slide to, disable autoplay and let watchOverflow lock the track.
        const enableMotion = slideCount > 3

        instances.push(
          new Swiper(donationsEl, {
            slidesPerView: 1.08,
            spaceBetween: 16,
            watchOverflow: true,
            grabCursor: true,
            simulateTouch: true,
            touchStartPreventDefault: false,
            autoplay: enableMotion ? { delay: 4000, disableOnInteraction: false } : false,
            navigation: {
              prevEl: '.epl-donations-slider-nav .prev',
              nextEl: '.epl-donations-slider-nav .next',
            },
            pagination: {
              clickable: true,
              el: '.epl-donations-slider-pagination',
            },
            observer: true,
            observeParents: true,
            breakpoints: {
              0: { slidesPerView: 1.08, spaceBetween: 16, centeredSlides: false },
              480: { slidesPerView: 1.35, spaceBetween: 16, centeredSlides: false },
              576: { slidesPerView: 2, spaceBetween: 18, centeredSlides: false },
              768: { slidesPerView: 2.2, spaceBetween: 20, centeredSlides: false },
              992: { slidesPerView: 3, spaceBetween: 20, centeredSlides: false },
              1200: { slidesPerView: 3, spaceBetween: 24, centeredSlides: false },
              1400: { slidesPerView: 3, spaceBetween: 27, centeredSlides: false },
            },
          }),
        )
      }

      if (blogsEl) {
        const slideCount = Number(blogsEl.dataset.slideCount) || blogsEl.querySelectorAll('.swiper-slide').length
        const enableLoop = slideCount > 3

        instances.push(
          new Swiper(blogsEl, {
            slidesPerView: 1,
            centeredSlides: false,
            loop: enableLoop,
            watchOverflow: true,
            autoplay:
              slideCount > 1
                ? { delay: 4500, disableOnInteraction: false }
                : false,
            spaceBetween: 20,
            navigation: {
              nextEl: '.epl-blogs-slider-nav .next',
              prevEl: '.epl-blogs-slider-nav .prev',
            },
            observer: true,
            observeParents: true,
            breakpoints: {
              0: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              992: { slidesPerView: 2, spaceBetween: 24 },
              1200: { slidesPerView: 3, spaceBetween: 28 },
            },
          }),
        )
      }

      requestAnimationFrame(() => {
        instances.forEach((instance) => instance.update())
        window.dispatchEvent(new Event('resize'))
      })
    }

    clearWait = initWhenReady(setup)

    return () => {
      cancelled = true
      clearWait?.()
      instances.forEach((instance) => instance.destroy(true, true))
      destroySwiperOn(document.querySelector<SwiperElement>('.epl-donations-slider'))
      destroySwiperOn(document.querySelector<SwiperElement>('.epl-blogs-slider'))
    }
  }, [])

  return null
}
