'use client'

import { useConfig } from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

import type { LabelFunction, StaticLabel } from 'payload'

type SearchTarget = {
  href: string
  kind: 'collection' | 'global' | 'page'
  label: string
}

function labelFor(
  value: StaticLabel | LabelFunction | undefined,
  fallback: string,
): string {
  if (!value) return fallback
  if (typeof value === 'function') return fallback
  return typeof value === 'string' ? value : (value.en ?? fallback)
}

/**
 * Quick admin search, jump to collections/globals (with optional list search).
 * Wired via admin.components.actions in payload.config.ts.
 */
export function AdminSearch() {
  const { config } = useConfig()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const targets = useMemo<SearchTarget[]>(() => {
    const adminRoute = config.routes.admin

    return [
      {
        label: 'Dashboard',
        href: formatAdminURL({ adminRoute, path: '' }),
        kind: 'page',
      },
      ...config.collections.map((collection) => ({
        label: labelFor(collection.labels?.plural, collection.slug),
        href: formatAdminURL({
          adminRoute,
          path: `/collections/${collection.slug}`,
        }),
        kind: 'collection' as const,
      })),
      ...config.globals.map((global) => ({
        label: labelFor(global.label, global.slug),
        href: formatAdminURL({
          adminRoute,
          path: `/globals/${global.slug}`,
        }),
        kind: 'global' as const,
      })),
    ]
  }, [config])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return targets.slice(0, 8)
    return targets.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 8)
  }, [query, targets])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const go = (target: SearchTarget) => {
    const trimmed = query.trim()
    const href =
      target.kind === 'collection' && trimmed
        ? `${target.href}?search=${encodeURIComponent(trimmed)}`
        : target.href

    router.push(href)
    setOpen(false)
    setQuery('')
  }

  return (
    <div className="epl-admin-search" ref={wrapperRef}>
      <div className="epl-admin-search__field">
        <svg
          aria-hidden
          className="epl-admin-search__icon"
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
          width="16"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          aria-expanded={open}
          aria-label="Search admin"
          className="epl-admin-search__input"
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && results[0]) {
              event.preventDefault()
              go(results[0])
            }
            if (event.key === 'Escape') {
              setOpen(false)
              inputRef.current?.blur()
            }
          }}
          placeholder="Search…"
          role="combobox"
          type="search"
          value={query}
        />
        <kbd className="epl-admin-search__hint">Ctrl K</kbd>
      </div>

      {open && results.length > 0 && (
        <ul className="epl-admin-search__results" role="listbox">
          {results.map((item) => (
            <li key={item.href} role="option">
              <button
                className="epl-admin-search__result"
                onClick={() => go(item)}
                type="button"
              >
                <span className="epl-admin-search__result-label">{item.label}</span>
                <span className="epl-admin-search__result-kind">{item.kind}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
