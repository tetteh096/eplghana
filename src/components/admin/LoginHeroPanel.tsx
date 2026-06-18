'use client'

import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

const featureIconProps = {
  fill: 'none',
  height: 18,
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 1.75,
  viewBox: '0 0 24 24',
  width: 18,
}

const features = [
  {
    text: 'Update pages, news, and events',
    icon: (
      <svg {...featureIconProps} aria-hidden>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    text: 'Manage fellows, alumni, partners, and publications',
    icon: (
      <svg {...featureIconProps} aria-hidden>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
        <path d="M16 11h6M19 8v6" />
      </svg>
    ),
  },
  {
    text: 'Preview changes on the live website',
    icon: (
      <svg {...featureIconProps} aria-hidden>
        <rect height="14" rx="2" width="20" x="2" y="3" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
]

/**
 * Renders the login hero as a sibling of the form shell (not inside it),
 * so the split-screen grid can align both columns correctly.
 */
export function LoginHeroPanel() {
  const [mount, setMount] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const root = document.querySelector('.login.template-minimal')
    setMount(root instanceof HTMLElement ? root : null)
  }, [])

  if (!mount) return null

  return createPortal(
    <aside className="epl-login-hero" aria-hidden>
      <div className="epl-login-hero__glow" />
      <div className="epl-login-hero__inner">
        <p className="epl-login-hero__eyebrow">EPL Ghana</p>
        <h2 className="epl-login-hero__title">Manage the EPL Ghana website</h2>
        <p className="epl-login-hero__lead">
          Sign in to update your site: pages, news, events, and the people
          behind your programmes, all in one place.
        </p>
        <ul className="epl-login-hero__list">
          {features.map((feature) => (
            <li key={feature.text} className="epl-login-hero__item">
              <span className="epl-login-hero__item-icon">{feature.icon}</span>
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>,
    mount,
  )
}
