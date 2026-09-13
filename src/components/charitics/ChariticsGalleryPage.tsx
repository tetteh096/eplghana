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
      <section className="figma-about-hero figma-gallery-hero">
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

        <MotionReveal className="figma-gallery-albums" stagger>
          {albums.map((album) => (
            <MotionItem key={album.id}>
              <Link className="figma-gallery-album-card" href={`/gallery/${album.slug}`}>
                <div className="figma-gallery-album-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={album.title} src={album.coverImage} />
                  <span className="figma-gallery-album-card__count">
                    {album.photos.length} Photos
                  </span>
                </div>

                <div className="figma-gallery-album-card__body">
                  <span className="figma-gallery-album-card__category">{album.categoryLabel}</span>
                  <h3>{album.title}</h3>
                  <p>{album.description}</p>
                  <span className="figma-gallery-album-card__cta">{albumCtaLabel}</span>
                </div>
              </Link>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>
    </div>
  )
}
