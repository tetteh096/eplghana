'use client'

import { useEffect, useState } from 'react'

import { teamPhotoFallback } from '@/utilities/teamPhotoFallback'

type TeamMemberPhotoProps = {
  alt: string
  className?: string
  src: string
}

/** Renders a portrait and swaps to initials if the CMS file 404s. */
export function TeamMemberPhoto({ alt, className, src }: TeamMemberPhotoProps) {
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
    />
  )
}
