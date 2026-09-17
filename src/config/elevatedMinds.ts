/** Canonical Elevated MINDS project slug and legacy URL aliases. */
export const ELEVATED_MINDS_SLUG = 'elevated-minds'
export const ELEVATED_MINDS_PATH = `/projects/${ELEVATED_MINDS_SLUG}`

export const ELEVATED_MINDS_SLUG_ALIASES = [
  ELEVATED_MINDS_SLUG,
  'epl-in-maritime',
  'eplim',
  'maritime',
] as const

export function isElevatedMindsSlug(slug: string): boolean {
  return (ELEVATED_MINDS_SLUG_ALIASES as readonly string[]).includes(slug)
}

/** Map any known Elevated MINDS alias to the canonical slug. */
export function normalizeElevatedMindsSlug(slug: string): string {
  return isElevatedMindsSlug(slug) ? ELEVATED_MINDS_SLUG : slug
}
