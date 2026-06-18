'use client'

import { useEffect, useRef } from 'react'

import { eplHomeImages } from '@/config/eplMedia'

type GalleryItem = { src: string; alt: string }

type ChariticsGalleryProps = {
  heading?: string
  items?: GalleryItem[]
}

type SwiperElement = HTMLElement & { swiper?: SwiperInstance }

type SwiperInstance = {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void
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

/** Charitics index.html, gallery slider (main.js) */
const GALLERY_SWIPER_OPTIONS = {
  slidesPerView: 2.2,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  spaceBetween: 15,
  grabCursor: true,
  loopAdditionalSlides: 4,
  watchSlidesProgress: true,
  breakpoints: {
    480: { slidesPerView: 3.4 },
    576: { slidesPerView: 4 },
    768: { slidesPerView: 5 },
    992: { spaceBetween: 20, slidesPerView: 5.8 },
    1680: { spaceBetween: 26, slidesPerView: 5.8 },
    1700: { spaceBetween: 30, slidesPerView: 5.8 },
  },
}

export function ChariticsGallery({ heading = 'Gallery', items }: ChariticsGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const base = items?.length ? items : eplHomeImages.gallery
  // Swiper 11 loop needs ~2× slidesPerView (5.8) so we repeat the set.
  const galleryItems = [...base, ...base, ...base]

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let instance: SwiperInstance | null = null
    let cancelled = false

    const init = () => {
      const Swiper = (window as Window & { Swiper?: SwiperConstructor }).Swiper
      const sliderEl = root.querySelector<SwiperElement>('.epl-gallery-slider')
      if (!Swiper || !sliderEl || cancelled) return

      destroySwiperOn(sliderEl)

      instance = new Swiper(sliderEl, {
        ...GALLERY_SWIPER_OPTIONS,
        observer: true,
        observeParents: true,
      })

      requestAnimationFrame(() => {
        instance?.update()
        requestAnimationFrame(() => instance?.update())
      })
    }

    if ((window as Window & { Swiper?: SwiperConstructor }).Swiper) {
      init()
    } else {
      window.setTimeout(init, 120)
    }

    return () => {
      cancelled = true
      instance?.destroy(true, true)
      destroySwiperOn(root.querySelector<SwiperElement>('.epl-gallery-slider'))
    }
  }, [])

  return (
    <>
      {heading ? (
        <div className="ul-container epl-gallery-heading">
          <span className="ul-section-sub-title">{heading}</span>
        </div>
      ) : null}

      {/* Charitics Home 1, full-width edge-to-edge gallery */}
      <div className="ul-gallery overflow-hidden ul-section-spacing mx-auto pt-0 epl-gallery-band" ref={rootRef}>
        <div className="epl-gallery-slider swiper">
          <div className="swiper-wrapper">
            {galleryItems.map((item, index) => (
              <div className="ul-gallery-item swiper-slide" key={`gallery-${item.src}-${index}`}>
                <img alt={item.alt} src={item.src} />
                <div className="ul-gallery-item-btn-wrapper">
                  <a data-fslightbox="gallery" href={item.src}>
                    <i className="flaticon-instagram"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
