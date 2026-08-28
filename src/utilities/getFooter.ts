import { cache } from 'react'

import { resolveDonateLink } from '@/utilities/donateLink'
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

const PROGRAMME_LINKS: FooterLink[] = [
  { label: 'Public Service Fellowship', href: '/projects/public-service-fellowship' },
  { label: 'Women On The Rise', href: '/projects/women-on-the-rise' },
  { label: 'P.E.A.C.E', href: '/projects/peace' },
  { label: 'EPL in Maritime', href: '/projects/epl-in-maritime' },
]

const fallbackColumns: FooterColumn[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about/team' },
      { label: 'Projects', href: '/projects' },
      { label: 'Community', href: '/community' },
      { label: 'EPLAN', href: '/community/eplan' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Our Programs',
    links: PROGRAMME_LINKS,
  },
]

function withAllProgrammes(columns: FooterColumn[]): FooterColumn[] {
  return columns.map((col) => {
    const isPrograms = /program/i.test(col.title)
    if (!isPrograms) return col
    const hrefs = new Set(col.links.map((l) => l.href))
    const missing = PROGRAMME_LINKS.filter((l) => !hrefs.has(l.href))
    return missing.length ? { ...col, links: [...col.links, ...missing] } : col
  })
}

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
 * Footer columns / about text / copyright from the Footer global.
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
          .map((l) => resolveDonateLink({ label: l.label ?? '', href: l.url ?? '#' })),
      }))
      .filter((col) => col.title || col.links.length)

    return {
      aboutText: footer?.aboutText?.trim() || null,
      columns: withAllProgrammes(columns.length ? columns : fallbackColumns),
      copyright: footer?.copyright?.trim() || DEFAULT_COPYRIGHT,
    }
  } catch {
    return fallback
  }
})
