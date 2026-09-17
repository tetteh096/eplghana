'use client'

import { useEffect, useState, type CSSProperties } from 'react'

import { teamPhotoFallback } from '@/utilities/teamPhotoFallback'

type TeamMemberPhotoProps = {
  alt: string
  className?: string
  src: string
  style?: CSSProperties
}

const defaultPhotoStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top center',
}

/** Renders a portrait and swaps to initials if the CMS file 404s. */
export function TeamMemberPhoto({ alt, className, src, style }: TeamMemberPhotoProps) {
  const fallbackSrc = teamPhotoFallback(alt)
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc)

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc)
  }, [fallbackSrc, src])

  return (
    <img
      alt={alt}
      className={className}
      decoding="async"
      loading="lazy"
      onError={(event) => {
        if (event.currentTarget.src !== fallbackSrc) {
          event.currentTarget.src = fallbackSrc
          setCurrentSrc(fallbackSrc)
        }
      }}
      src={currentSrc}
      style={style ?? defaultPhotoStyle}
    />
  )
}
