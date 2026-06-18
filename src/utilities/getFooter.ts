import { cache } from 'react'

import { footerLinks } from '@/config/navigation'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type FooterLink = { label: string; href: string }
export type FooterColumn = { title: string; links: FooterLink[] }

export type FooterData = {
  aboutText: string | null
  columns: FooterColumn[]
  copyright: string
}

type RawFooter = {
  aboutText?: string | null
  columns?: { title?: string | null; links?: { label?: string | null; url?: string | null }[] | null }[] | null
  copyright?: string | null
}

const DEFAULT_COPYRIGHT =
  '© {year} Emerging Public Leaders of Ghana. All rights reserved'

const fallbackColumns: FooterColumn[] = [
  {
    title: 'Quick Links',
    links: footerLinks.useful.map((l) => ({ label: l.label, href: l.href })),
  },
  {
    title: 'Our Programs',
    links: [
      { label: 'Public Service Fellowship', href: '/projects/public-service-fellowship' },
      { label: 'Women On The Rise', href: '/projects/women-on-the-rise' },
      { label: 'P.E.A.C.E', href: '/projects/peace' },
    ],
  },
]

const fallback: FooterData = {
  aboutText: null,
  columns: fallbackColumns,
  copyright: DEFAULT_COPYRIGHT,
}

/** Replace the {year} token with the current year. */
export function renderCopyright(text: string): string {
  return text.replace(/\{year\}/g, `${new Date().getFullYear()}`)
}

/**
 * Footer columns / about text / copyright from the Footer global, mapped to
 * the frontend shape. Falls back to sensible defaults when the global is empty
 * or the DB is unavailable.
 */
export const getFooter = cache(async (): Promise<FooterData> => {
  const payload = await tryGetPayload()
  if (!payload) return fallback

  try {
    const footer = toPlain(await payload.findGlobal({ slug: 'footer', depth: 1 })) as RawFooter | null
    const rawColumns = footer?.columns ?? []

    const columns: FooterColumn[] = rawColumns
      .map((col) => ({
        title: col.title ?? '',
        links: (col.links ?? [])
          .filter((l) => l?.label && l?.url)
          .map((l) => ({ label: l.label ?? '', href: l.url ?? '#' })),
      }))
      .filter((col) => col.title || col.links.length)

    return {
      aboutText: footer?.aboutText?.trim() || null,
      columns: columns.length ? columns : fallbackColumns,
      copyright: footer?.copyright?.trim() || DEFAULT_COPYRIGHT,
    }
  } catch {
    return fallback
  }
})
