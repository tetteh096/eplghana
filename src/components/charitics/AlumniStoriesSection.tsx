'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { AlumniStory } from '@/config/alumniPageContent'

const CAROUSEL_THRESHOLD = 3

type SwiperElement = HTMLElement & { swiper?: SwiperInstance }

type SwiperInstance = {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void
  slideNext: () => void
  slidePrev: () => void
  update: () => void
}

type SwiperConstructor = new (
  element: HTMLElement,
  options?: Record<string, unknown>,
) => SwiperInstance

const STORIES_SWIPER_OPTIONS = {
  slidesPerView: 1.1,
  spaceBetween: 20,
  grabCursor: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    768: { slidesPerView: 2.1, spaceBetween: 24 },
    1200: { slidesPerView: 3, spaceBetween: 28 },
  },
}

type AlumniStoryDrawerProps = {
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  slideDirection: number
  story: AlumniStory
  storyIndex: number
  storyTotal: number
}

function AlumniStoryDrawer({
  onClose,
  onNext,
  onPrev,
  slideDirection,
  story,
  storyIndex,
  storyTotal,
}: AlumniStoryDrawerProps) {
  return (
    <div className="epl-team-drawer-root">
      <motion.button
        animate={{ opacity: 1 }}
        aria-label="Close story"
        className="epl-team-drawer-backdrop"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        key="epl-alumni-story-backdrop"
        onClick={onClose}
        transition={{ duration: 0.28 }}
        type="button"
      />

      <motion.aside
        animate={{ x: 0 }}
        aria-labelledby="epl-alumni-story-name"
        aria-modal="true"
        className="epl-team-drawer"
        exit={{ x: '100%' }}
        initial={{ x: '100%' }}
        key="epl-alumni-story-panel"
        role="dialog"
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
      >
        <div className="epl-team-drawer-header">
          <span className="epl-team-drawer-meta">
            Alumni Story · {storyIndex + 1} / {storyTotal}
          </span>
          <button
            aria-label="Close story"
            className="epl-team-drawer-close"
            onClick={onClose}
            type="button"
          >
            <i className="flaticon-close"></i>
          </button>
        </div>

        <div className="epl-team-drawer-body">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="epl-team-drawer-content"
              exit={{ opacity: 0, x: slideDirection > 0 ? -56 : 56 }}
              initial={{ opacity: 0, x: slideDirection > 0 ? 56 : -56 }}
              key={story.id}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <div className="epl-team-drawer-photo epl-team-drawer-photo--portrait">
                <img alt={story.name} src={story.photo} />
              </div>

              <span className="epl-team-drawer-eyebrow">
                {story.institution} · {story.cohort}
              </span>
              <h2 className="epl-team-drawer-name" id="epl-alumni-story-name">
                {story.name}
              </h2>
              <p className="epl-team-drawer-role">{story.headline}</p>
              <p className="epl-team-drawer-bio">{story.body}</p>
              {story.quote ? (
                <blockquote className="epl-alumni-story-quote epl-alumni-story-quote--drawer">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="epl-team-drawer-footer">
          <button
            aria-label="Previous story"
            className="epl-team-drawer-nav-btn"
            onClick={onPrev}
            type="button"
          >
            <i className="flaticon-back"></i>
            <span>Previous</span>
          </button>
          <button
            aria-label="Next story"
            className="epl-team-drawer-nav-btn"
            onClick={onNext}
            type="button"
          >
            <span>Next</span>
            <i className="flaticon-next"></i>
          </button>
        </div>
      </motion.aside>
    </div>
  )
}

type AlumniStoryCardProps = {
  isActive?: boolean
  onOpen: (story: AlumniStory) => void
  story: AlumniStory
}

function AlumniStoryCard({ isActive = false, onOpen, story }: AlumniStoryCardProps) {
  return (
    <article className={`epl-alumni-story-card epl-alumni-story-card--clickable${isActive ? ' is-active' : ''}`}>
      <button
        aria-label={`Read ${story.name}'s story`}
        className="epl-alumni-story-card-trigger"
        onClick={() => onOpen(story)}
        type="button"
      >
        <div className="epl-alumni-story-media">
          <ProjectDetailImage
            alt={story.name}
            className="epl-alumni-story-img"
            fallbackClass="epl-alumni-story-fallback"
            src={story.photo}
          />
          <span className="epl-alumni-story-read">Read story</span>
        </div>
        <div className="epl-alumni-story-body">
          <span className="epl-alumni-story-meta">
            {story.institution} · {story.cohort}
          </span>
          <h3 className="epl-alumni-story-name">{story.name}</h3>
          <p className="epl-alumni-story-headline">{story.headline}</p>
          <p className="epl-alumni-story-text epl-alumni-story-text--teaser">{story.body}</p>
          {story.quote ? (
            <blockquote className="epl-alumni-story-quote">
              &ldquo;{story.quote}&rdquo;
            </blockquote>
          ) : null}
        </div>
      </button>
    </article>
  )
}

type AlumniStoriesSectionProps = {
  eyebrow: string
  intro: string
  items: AlumniStory[]
  title: string
}

export function AlumniStoriesSection({ eyebrow, intro, items, title }: AlumniStoriesSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [slideDirection, setSlideDirection] = useState(1)
  const useCarousel = items.length > CAROUSEL_THRESHOLD

  const selectedIndex = items.findIndex((story) => story.id === selectedId)
  const selected = selectedIndex >= 0 ? items[selectedIndex] : null
  const isDrawerOpen = Boolean(selected)

  const openStory = useCallback((story: AlumniStory) => {
    setSelectedId(story.id)
  }, [])

  const closePanel = useCallback(() => {
    setSelectedId(null)
  }, [])

  const goToStory = useCallback(
    (direction: -1 | 1) => {
      if (selectedIndex < 0 || items.length === 0) return
      setSlideDirection(direction)
      const nextIndex = (selectedIndex + direction + items.length) % items.length
      setSelectedId(items[nextIndex].id)
    },
    [items, selectedIndex],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  useEffect(() => {
    if (!isDrawerOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePanel()
      if (event.key === 'ArrowRight') goToStory(1)
      if (event.key === 'ArrowLeft') goToStory(-1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closePanel, goToStory, isDrawerOpen])

  useEffect(() => {
    if (!useCarousel || !sliderRef.current) return

    const root = sliderRef.current
    let instance: SwiperInstance | null = null
    let cancelled = false

    const init = () => {
      const Swiper = (window as Window & { Swiper?: SwiperConstructor }).Swiper
      const sliderEl = root.querySelector<SwiperElement>('.epl-alumni-stories-slider')
      if (!Swiper || !sliderEl || cancelled) return

      if (sliderEl.swiper) {
        sliderEl.swiper.destroy(true, true)
      }

      instance = new Swiper(sliderEl, {
        ...STORIES_SWIPER_OPTIONS,
        navigation: {
          nextEl: root.querySelector('.epl-alumni-stories-next'),
          prevEl: root.querySelector('.epl-alumni-stories-prev'),
        },
        observer: true,
        observeParents: true,
      })

      requestAnimationFrame(() => instance?.update())
    }

    if ((window as Window & { Swiper?: SwiperConstructor }).Swiper) {
      init()
    } else {
      const timer = window.setTimeout(init, 120)
      return () => {
        cancelled = true
        window.clearTimeout(timer)
        instance?.destroy(true, true)
      }
    }

    return () => {
      cancelled = true
      instance?.destroy(true, true)
    }
  }, [items, useCarousel])

  if (!items.length) return null

  return (
    <>
      <section className="epl-alumni-stories ul-section-spacing">
        <div className="ul-container">
          <div className="epl-alumni-section-head epl-alumni-stories-head">
            <div>
              <span className="ul-section-sub-title">{eyebrow}</span>
              <h2 className="ul-section-title">{title}</h2>
              <p className="epl-alumni-section-intro">{intro}</p>
            </div>
            {useCarousel ? (
              <div className="epl-alumni-stories-nav">
                <button
                  aria-label="Previous stories"
                  className="epl-alumni-stories-prev"
                  type="button"
                >
                  <i className="flaticon-back"></i>
                </button>
                <button aria-label="Next stories" className="epl-alumni-stories-next" type="button">
                  <i className="flaticon-next"></i>
                </button>
              </div>
            ) : null}
          </div>

          {useCarousel ? (
            <div className="epl-alumni-stories-carousel" ref={sliderRef}>
              <div className="epl-alumni-stories-slider swiper">
                <div className="swiper-wrapper">
                  {items.map((story) => (
                    <div className="swiper-slide" key={story.id}>
                      <AlumniStoryCard
                        isActive={story.id === selectedId}
                        onOpen={openStory}
                        story={story}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="row ul-bs-row gy-4">
              {items.map((story) => (
                <div className="col-lg-4" key={story.id}>
                  <AlumniStoryCard
                    isActive={story.id === selectedId}
                    onOpen={openStory}
                    story={story}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {mounted && isDrawerOpen && selected
        ? createPortal(
            <AnimatePresence mode="wait">
              <AlumniStoryDrawer
                key="epl-alumni-story-drawer"
                onClose={closePanel}
                onNext={() => goToStory(1)}
                onPrev={() => goToStory(-1)}
                slideDirection={slideDirection}
                story={selected}
                storyIndex={selectedIndex}
                storyTotal={items.length}
              />
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  )
}
