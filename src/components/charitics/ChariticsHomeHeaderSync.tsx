'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Keeps homepage header stable and resets chrome state on client navigation. */
export function ChariticsHomeHeaderSync() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    document.querySelector('.to-be-sticky')?.classList.remove('sticky')
    document.body.removeAttribute('data-hero-mode')

    if (isHome) {
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }
  }, [isHome, pathname])

  return null
}
