export const DONATE_PATH = '/donate'

export function isDonateLabel(label: string | null | undefined): boolean {
  const value = label?.trim().toLowerCase() ?? ''
  if (!value) return false
  return value === 'donate' || value.includes('donation') || value.includes('donate')
}

function toInternalPath(href: string | null | undefined): string {
  const value = href?.trim() ?? ''
  if (!value) return ''
  if (value.startsWith('/') && !value.startsWith('//')) {
    return value.split('#')[0]?.split('?')[0] ?? value
  }
  try {
    return new URL(value).pathname
  } catch {
    return value
  }
}

/** Normalize any Donate link to the internal /donate route. */
export function resolveDonateHref(
  href: string | null | undefined,
  label?: string | null,
): string {
  if (isDonateLabel(label)) return DONATE_PATH

  const path = toInternalPath(href)
  if (path === DONATE_PATH || /\/donate\/?$/.test(path)) return DONATE_PATH

  return href?.trim() || DONATE_PATH
}

export function resolveDonateLink<T extends { label: string; href: string }>(link: T): T {
  return {
    ...link,
    href: resolveDonateHref(link.href, link.label),
  }
}
