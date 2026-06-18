'use client'

import { useState } from 'react'

type ProjectDetailImageProps = {
  alt: string
  className: string
  fallbackClass: string
  src: string
}

export function ProjectDetailImage({
  src,
  alt,
  className,
  fallbackClass,
}: ProjectDetailImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div aria-hidden className={fallbackClass} />
  }

  return (
    <img
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      src={src}
    />
  )
}
