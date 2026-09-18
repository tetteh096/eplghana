import { cache } from 'react'

import { DONATE_PATH, resolveDonateHref, resolveDonateLink, isDonateLabel } from '@/utilities/donateLink'

import { mainNavigation, type NavItem } from '@/config/navigation'
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
  partnerCta: HeaderCta
  topLinks: { label: string; href: string }[]
}

type RawNavChild = {
  label?: string | null
  url?: string | null
  description?: string | null
}

type RawNavItem = {
  label?: string | null
  url?: string | null
  children?: RawNavChild[] | null
}

type RawCta = {
  enabled?: boolean | null
  label?: string | null
  url?: string | null
}

type RawHeader = {
  navItems?: RawNavItem[] | null
  topLinks?: { label?: string | null; url?: string | null }[] | null
  cta?: RawCta | null
  partnerCta?: RawCta | null
}

export const TOP_LINKS: { label: string; href: string }[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Community', href: '/community/current-fellows' },
]

const fallbackCta: HeaderCta = {
  label: 'Donate',
  href: DONATE_PATH,
  enabled: true,
}

const fallbackPartnerCta: HeaderCta = {
  label: 'Partner with us',
  href: '/community/partners',
  enabled: true,
}

const fallback: HeaderData = {
  nav: mainNavigation,
  cta: fallbackCta,
  partnerCta: fallbackPartnerCta,
  topLinks: TOP_LINKS,
}

function mapCta(raw: RawCta | null | undefined, fallbackValue: HeaderCta): HeaderCta {
  const label = raw?.label?.trim() || fallbackValue.label
  const href = resolveDonateHref(raw?.url, label)
  return {
    enabled: raw?.enabled !== false,
    label,
    href: fallbackValue.href === DONATE_PATH ? DONATE_PATH : href,
  }
}

function mapNavItems(raw: RawNavItem[]): NavItem[] {
  return raw
    .filter((item) => item?.label)
    .map((item): NavItem | null => {
      const label = item.label!.trim()
      if (!label) return null

      const children = (item.children ?? [])
        .filter((child) => child?.label && child?.url)
        .map((child) => ({
          label: child.label!.trim(),
          href: resolveDonateHref(child.url!.trim(), child.label),
          ...(child.description?.trim() ? { description: child.description.trim() } : {}),
        }))

      if (children.length > 0) {
        return { label, items: children }
      }

      const href = item.url?.trim()
      if (!href) return null
      return { label, href: resolveDonateHref(href, label) }
    })
    .filter((item): item is NavItem => item !== null)
}

/** Pre-redesign Header docs still in Mongo — treat as empty so Figma nav is used. */
function isLegacyHeaderNav(nav: NavItem[], cta?: RawCta | null): boolean {
  const labels = new Set(nav.map((item) => item.label))
  if (labels.has('About Us') || labels.has('Knowledge Products')) return true
  if (cta?.label?.trim().toLowerCase() === 'contact us') return true
  return false
}

function normalizeTopLinks(links: { label: string; href: string }[]): { label: string; href: string }[] {
  return links.map(resolveDonateLink)
}

function headerNeedsDonateUrlFix(header: RawHeader | null | undefined): boolean {
  if (header?.cta?.url?.trim() !== DONATE_PATH) return true
  return (header?.navItems ?? []).some((item) =>
    (item.children ?? []).some(
      (child) => isDonateLabel(child.label) && child.url?.trim() !== DONATE_PATH,
    ),
  )
}

function buildDonateHeaderFix(header: RawHeader | null | undefined): Partial<RawHeader> {
  return {
    cta: {
      ...header?.cta,
      enabled: header?.cta?.enabled !== false,
      label: header?.cta?.label?.trim() || fallbackCta.label,
      url: DONATE_PATH,
    },
    navItems: (header?.navItems ?? []).map((item) => ({
      ...item,
      children: (item.children ?? []).map((child) =>
        isDonateLabel(child.label) ? { ...child, url: DONATE_PATH } : child,
      ),
    })),
  }
}

export function buildHeaderNavData(): RawHeader {
  return {
    navItems: mainNavigation.map((item) =>
      'items' in item
        ? {
            label: item.label,
            children: item.items.map((sub) => ({
              label: sub.label,
              url: sub.href,
              ...(sub.description ? { description: sub.description } : {}),
            })),
          }
        : { label: item.label, url: item.href },
    ),
    topLinks: TOP_LINKS.map((link) => ({ label: link.label, url: link.href })),
    cta: { enabled: true, label: fallbackCta.label, url: fallbackCta.href },
    partnerCta: {
      enabled: true,
      label: fallbackPartnerCta.label,
      url: fallbackPartnerCta.href,
    },
  }
}

/**
 * Header nav + CTAs from the Header global, mapped to the frontend shape.
 * Falls back to hardcoded navigation when the global is empty or the DB
 * is unavailable, so the site never renders without a menu.
 */
export const getHeader = cache(async (): Promise<HeaderData> => {
  const payload = await tryGetPayload()
  if (!payload) return fallback

  try {
    const headerDoc = await payload.findGlobal({ slug: 'header', depth: 0 })
    const header = toPlain(headerDoc) as RawHeader | null
    const nav = mapNavItems(header?.navItems ?? [])

    if (!nav.length || isLegacyHeaderNav(nav, header?.cta)) {
      // Upgrade stale DB menu once so Admin matches the live redesign.
      void payload
        .updateGlobal({ slug: 'header', data: buildHeaderNavData() as never })
        .catch(() => undefined)
      return {
        ...fallback,
      }
    }

    const topLinks = (header?.topLinks ?? [])
      .filter((link) => link?.label && link?.url)
      .map((link) =>
        resolveDonateLink({
          label: link.label!.trim(),
          href: link.url!.trim(),
        }),
      )

    if (headerNeedsDonateUrlFix(header)) {
      void payload
        .updateGlobal({
          slug: 'header',
          data: buildDonateHeaderFix(header) as never,
        })
        .catch(() => undefined)
    }

    return {
      nav,
      cta: mapCta(header?.cta, fallbackCta),
      partnerCta: mapCta(header?.partnerCta, fallbackPartnerCta),
      topLinks: normalizeTopLinks(topLinks.length ? topLinks : TOP_LINKS),
    }
  } catch {
    return fallback
  }
})
