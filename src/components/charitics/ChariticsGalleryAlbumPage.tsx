'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { createPortal } from 'react-dom'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import type { GalleryAlbum, GalleryPhoto } from '@/config/galleryPageContent'
import type { GalleryPageContent } from '@/utilities/getGalleryContent'

type Props = {
  content: GalleryPageContent
  album: GalleryAlbum
}

function LightboxModal({
  photos,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  photos: GalleryPhoto[]
  index: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  const item = photos[index]
  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(12, 20, 39, 0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(920px, 100%)',
          background: '#fff',
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 20px',
            background: '#0C1427',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: '850',
              color: 'var(--epl-new-gold, #f5bd17)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {index + 1} / {photos.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            Close
          </button>
        </div>

        <div
          style={{
            maxHeight: '60vh',
            overflow: 'hidden',
            background: '#000',
            textAlign: 'center',
          }}
        >
          <img
            alt={item.title}
            src={item.image}
            style={{
              maxHeight: '60vh',
              maxWidth: '100%',
              objectFit: 'contain',
              margin: '0 auto',
            }}
          />
        </div>

        <div style={{ padding: '20px 24px', background: '#FFFFFF' }}>
          <h3
            style={{
              fontSize: '20px',
              fontWeight: '850',
              color: '#0C1427',
              margin: '0 0 6px',
            }}
          >
            {item.title}
          </h3>
          {item.caption ? (
            <p style={{ fontSize: '13px', color: '#636772', margin: '0 0 16px' }}>
              {item.caption}
            </p>
          ) : (
            <div style={{ height: 16 }} />
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <button
              type="button"
              onClick={onPrev}
              style={{
                padding: '10px 20px',
                background: 'var(--epl-new-blue, #34439a)',
                color: '#ffffff',
                border: 'none',
                fontWeight: '850',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              style={{
                padding: '10px 20px',
                background: 'var(--epl-new-blue, #34439a)',
                color: '#ffffff',
                border: 'none',
                fontWeight: '850',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ChariticsGalleryAlbumPage({ content, album }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const photos = album.photos

  const closeLightbox = () => setSelectedIndex(null)
  const prevImage = useCallback(() => {
    if (selectedIndex === null || photos.length === 0) return
    setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)
  }, [photos.length, selectedIndex])
  const nextImage = useCallback(() => {
    if (selectedIndex === null || photos.length === 0) return
    setSelectedIndex((selectedIndex + 1) % photos.length)
  }, [photos.length, selectedIndex])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIndex, prevImage, nextImage])

  return (
    <div className="figma-gallery-page">
      <section className="figma-about-hero" style={{ minHeight: '42vh' }}>
        <div
          className="figma-about-hero__bg"
          style={{ backgroundImage: `url(${album.coverImage || content.hero.image})` }}
        />
        <div className="figma-about-hero__overlay" />
        <div className="figma-about-hero__content">
          <div className="figma-kicker figma-kicker--gold">
            <span className="figma-kicker__line" />
            <span>{album.categoryLabel}</span>
          </div>
          <h1>{album.title}</h1>
          <p>{album.description}</p>
          <p style={{ marginTop: 16 }}>
            <Link
              href="/gallery"
              style={{
                color: 'var(--epl-new-gold, #f5bd17)',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontSize: 13,
                textDecoration: 'none',
              }}
            >
              {content.backToGalleryLabel}
            </Link>
          </p>
        </div>
      </section>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        style={{ paddingBlock: '80px' }}
      >
        {photos.length === 0 ? (
          <p style={{ color: '#636772' }}>{content.photosSection.emptyText}</p>
        ) : (
          <MotionReveal
            stagger
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {photos.map((item, idx) => (
              <MotionItem key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  aria-label={`View ${item.title}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: 0,
                    background: '#eee',
                    border: 'none',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    aspectRatio: '4 / 3',
                  }}
                >
                  <img
                    alt={item.title}
                    src={item.image}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </button>
              </MotionItem>
            ))}
          </MotionReveal>
        )}
      </MotionReveal>

      {mounted && selectedIndex !== null && typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              <LightboxModal
                photos={photos}
                index={selectedIndex}
                onClose={closeLightbox}
                onNext={nextImage}
                onPrev={prevImage}
              />
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  )
}
