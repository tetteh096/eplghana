'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export type StickyBottomTab = {
  count?: number
  icon?: string
  id: string
  label: string
  mobileLabel?: string
}

type EplStickyBottomTabsProps = {
  activeId: string
  ariaLabel: string
  className?: string
  hidden?: boolean
  onChange: (id: string) => void
  panelIdPrefix?: string
  tabs: StickyBottomTab[]
}

export function EplStickyBottomTabs({
  activeId,
  ariaLabel,
  className = '',
  hidden = false,
  onChange,
  panelIdPrefix = '',
  tabs,
}: EplStickyBottomTabsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || hidden) return null

  return createPortal(
    <nav
      aria-label={ariaLabel}
      className={`epl-bottom-tabs${className ? ` ${className}` : ''}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeId === tab.id
        return (
          <button
            aria-controls={`${panelIdPrefix}${tab.id}`}
            aria-selected={isActive}
            className={`epl-bottom-tabs__btn${isActive ? ' is-active' : ''}`}
            id={`${panelIdPrefix}tab-${tab.id}`}
            key={tab.id}
            onClick={() => onChange(tab.id)}
            role="tab"
            type="button"
          >
            {tab.icon ? <i aria-hidden className={`epl-bottom-tabs__icon ${tab.icon}`}></i> : null}
            <span className="epl-bottom-tabs__label">{tab.mobileLabel ?? tab.label}</span>
            {tab.count !== undefined ? (
              <span className="epl-bottom-tabs__count">{tab.count}</span>
            ) : null}
          </button>
        )
      })}
    </nav>,
    document.body,
  )
}
