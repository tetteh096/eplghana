import { cache } from 'react'

import { headerCta, mainNavigation, type NavItem } from '@/config/navigation'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type HeaderCta = {
  label: string
  href: string
  enabled: boolean
}

export type HeaderData = {
  nav: NavItem[]
  cta: HeaderCta
}

type RawNavItem = {
  label?: string | null
  url?: string | null
  children?: { label?: string | null; url?: string | null }[] | null
}

type RawHeader = {
  navItems?: RawNavItem[] | null
  cta?: { enabled?: boolean | null; label?: string | null; url?: string | null } | null
}

const fallback: HeaderData = {
  nav: mainNavigation,
  cta: { ...headerCta, enabled: true },
}

/**
 * Header nav + CTA from the Header global, mapped to the frontend NavItem shape.
 * Falls back to the hardcoded navigation when the global is empty or the DB
 * is unavailable, so the site never renders without a menu.
 */
export const getHeader = cache(async (): Promise<HeaderData> => {
  const payload = await tryGetPayload()
  if (!payload) return fallback

  try {
    const header = toPlain(await payload.findGlobal({ slug: 'header', depth: 1 })) as RawHeader | null
    const items = header?.navItems ?? []
    if (!items.length) return fallback

    const nav: NavItem[] = items.map((item) => {
      const children = (item.children ?? []).filter((c) => c?.label && c?.url)
      if (children.length) {
        return {
          label: item.label ?? '',
          items: children.map((c) => ({ href: c.url ?? '#', label: c.label ?? '' })),
        }
      }
      return { href: item.url ?? '#', label: item.label ?? '' }
    })

    const ctaSrc = header?.cta
    const cta: HeaderCta = {
      enabled: ctaSrc?.enabled !== false,
      label: ctaSrc?.label?.trim() || headerCta.label,
      href: ctaSrc?.url?.trim() || headerCta.href,
    }

    return { nav, cta }
  } catch {
    return fallback
  }
})
