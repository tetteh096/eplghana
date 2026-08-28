import type { FormSubmissionType } from '@/collections/FormSubmissions'

export const FORM_SUBMISSION_TYPES = new Set<FormSubmissionType>([
  'register-interest',
  'internship-volunteer',
  'partnership',
  'pledge',
  'online-donation',
])

export const FORM_SOURCE_LABELS: Record<string, string> = {
  '/get-involved': 'Get Involved page',
  '/contact': 'Contact page',
  '/community/partners': 'Partners page',
  '/donate': 'Donate page',
}

export function resolveSourcePage(sourcePage: string | undefined, sourcePath: string | undefined): string {
  if (sourcePage?.trim()) return sourcePage.trim()
  if (sourcePath?.trim()) {
    const base = FORM_SOURCE_LABELS[sourcePath.trim()] ?? sourcePath.trim()
    return base
  }
  return 'Website form'
}

export function resolveSourcePath(sourcePath: string | undefined): string {
  return sourcePath?.trim() || '/'
}
