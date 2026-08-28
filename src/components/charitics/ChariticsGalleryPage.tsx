'use client'

import Link from 'next/link'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import type { GalleryPageContent } from '@/utilities/getGalleryContent'

type Props = {
  content: GalleryPageContent
}

export function ChariticsGalleryPage({ content }: Props) {
  const { hero, albumsSection, albumCtaLabel, albums } = content

  return (
    <div className="figma-gallery-page">
      <section className="figma-about-hero">
        <div
          className="figma-about-hero__bg"
          style={{ backgroundImage: `url(${hero.image})` }}
        />
        <div className="figma-about-hero__overlay" />
        <div className="figma-about-hero__content">
          <div className="figma-kicker figma-kicker--gold">
            <span className="figma-kicker__line" />
            <span>{hero.eyebrow}</span>
          </div>
          <h1>{hero.title}</h1>
          <p>{hero.lead}</p>
        </div>
      </section>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        style={{ paddingBlock: '80px', background: '#F8F9FA' }}
      >
        <div
          className="figma-section-head"
          style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}
        >
          <div
            className="figma-kicker figma-kicker--gold"
            style={{ justifyContent: 'center', marginBottom: '12px' }}
          >
            <span className="figma-kicker__line" />
            <span>{albumsSection.eyebrow}</span>
            <span className="figma-kicker__line" />
          </div>
          <h2
            style={{
              fontSize: 'clamp(32px, 3.6vw, 46px)',
              fontWeight: '900',
              color: '#0C1427',
              margin: 0,
            }}
          >
            {albumsSection.title}
          </h2>
        </div>

        <MotionReveal
          className="figma-gallery-albums"
          stagger
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '28px',
          }}
        >
          {albums.map((album) => (
            <MotionItem key={album.id}>
              <Link
                href={`/gallery/${album.slug}`}
                className="figma-gallery-album-card"
                style={{
                  display: 'block',
                  background: '#ffffff',
                  border: '1px solid #e2e5eb',
                  borderTop: '4px solid var(--epl-new-blue, #34439a)',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 10px 30px rgba(10, 17, 40, 0.04)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    height: '190px',
                    width: '100%',
                    overflow: 'hidden',
                    background: '#eee',
                  }}
                >
                  <img
                    alt={album.title}
                    src={album.coverImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      fontSize: '11px',
                      fontWeight: '850',
                      color: '#0C1427',
                      background: 'var(--epl-new-gold, #f5bd17)',
                      padding: '4px 10px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {album.photos.length} Photos
                  </span>
                </div>

                <div style={{ padding: '24px 20px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '850',
                      color: 'var(--epl-new-blue, #34439a)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    {album.categoryLabel}
                  </span>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: '850',
                      color: '#0C1427',
                      margin: '0 0 8px',
                    }}
                  >
                    {album.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#636772',
                      lineHeight: 1.6,
                      margin: '0 0 16px',
                    }}
                  >
                    {album.description}
                  </p>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '850',
                      color: 'var(--epl-new-blue, #34439a)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {albumCtaLabel}
                  </span>
                </div>
              </Link>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>
    </div>
  )
}
