'use client'

import { useTheme } from '@payloadcms/ui'
import type { ReactNode } from 'react'

const iconProps = {
  fill: 'none',
  height: 16,
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 1.75,
  viewBox: '0 0 24 24',
  width: 16,
}

const options: { label: string; value: 'auto' | 'dark' | 'light'; icon: ReactNode }[] = [
  {
    label: 'Light',
    value: 'light',
    icon: (
      <svg {...iconProps} aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: (
      <svg {...iconProps} aria-hidden>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    label: 'Auto',
    value: 'auto',
    icon: (
      <svg {...iconProps} aria-hidden>
        <rect height="14" rx="2" width="20" x="2" y="3" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
]

/**
 * Compact light / dark / auto theme switcher in the admin header bar.
 * Wired via admin.components.actions in payload.config.ts.
 */
export function ThemeToggle() {
  const { autoMode, setTheme, theme } = useTheme()
  const active = autoMode ? 'auto' : theme

  const applyTheme = (value: 'auto' | 'dark' | 'light') => {
    // Payload's runtime setTheme accepts 'auto'; types only list light/dark.
    ;(setTheme as (next: 'auto' | 'dark' | 'light') => void)(value)
  }

  return (
    <div
      aria-label="Color theme"
      className="epl-theme-toggle"
      role="group"
    >
      {options.map((option) => {
        const isActive = active === option.value

        return (
          <button
            key={option.value}
            aria-label={option.label}
            aria-pressed={isActive}
            className={[
              'epl-theme-toggle__btn',
              isActive && 'epl-theme-toggle__btn--active',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => applyTheme(option.value)}
            title={option.label}
            type="button"
          >
            {option.icon}
          </button>
        )
      })}
    </div>
  )
}
