import type { Cohort } from '@/payload-types'

export type CohortRef = string | Cohort | null | undefined

export function resolveCohortId(cohort: CohortRef): string | undefined {
  if (!cohort || typeof cohort !== 'object') return undefined
  return String(cohort.id)
}

export function resolveCohortLabel(cohort: CohortRef): string {
  if (!cohort) return 'Cohort'
  if (typeof cohort === 'object') {
    return cohort.title?.trim() || cohort.shortLabel?.trim() || 'Cohort'
  }
  const value = cohort.trim()
  if (!value) return 'Cohort'
  return /^cohort\b/i.test(value) ? value : `Cohort ${value}`
}

export function resolveCohortShortLabel(cohort: CohortRef): string {
  if (!cohort) return 'Cohort'
  if (typeof cohort === 'object') {
    return cohort.shortLabel?.trim() || cohort.title?.trim() || 'Cohort'
  }
  return resolveCohortLabel(cohort)
}
