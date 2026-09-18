import { cache } from 'react'

import { resolveDonateLink } from '@/utilities/donateLink'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type FooterLink = { label: string; href: string }
export type FooterColumn = { title: string; links: FooterLink[] }

export type FooterData = {
  aboutText: string | null
  columns: FooterColumn[]
  stayConnectedTitle: string
  stayConnectedIntro: string
  stayConnectedText: string
  subscribeLabel: string
  location: string
  copyright: string
}

type RawFooter = {
  aboutText?: string | null
  columns?: { title?: string | null; links?: { label?: string | null; url?: string | null }[] | null }[] | null
  stayConnectedTitle?: string | null
  stayConnectedIntro?: string | null
  stayConnectedText?: string | null
  subscribeLabel?: string | null
  location?: string | null
  copyright?: string | null
}

const DEFAULT_COPYRIGHT =
  '© {year} Emerging Public Leaders of Ghana. All rights reserved'

const fallbackColumns: FooterColumn[] = [
  {
    title: 'Explore',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Impact', href: '/impact' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Engage',
    links: [
      { label: 'News & Insights', href: '/news' },
      { label: 'Get Involved', href: '/get-involved' },
      { label: 'Partner With Us', href: '/community/partners' },
      { label: 'Donate', href: '/donate' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

const fallback: FooterData = {
  aboutText: null,
  columns: fallbackColumns,
  stayConnectedTitle: 'Stay Connected',
  stayConnectedIntro: 'Stay connected with EPL Ghana.',
  stayConnectedText: 'Updates on programmes, Fellows and events.',
  subscribeLabel: 'Subscribe',
  location: 'Accra, Ghana',
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
    const hasLegacyFellowLabel = rawColumns.some((column) =>
      (column.links ?? []).some((link) => link.label?.trim() === 'Become a Fellow'),
    )
    const normalizedColumns = rawColumns.map((column) => ({
      ...column,
      links: (column.links ?? []).map((link) =>
        link.label?.trim() === 'Become a Fellow' ? { ...link, label: 'Contact Us' } : link,
      ),
    }))

    if (hasLegacyFellowLabel) {
      void payload
        .updateGlobal({ slug: 'footer', data: { columns: normalizedColumns } as never })
        .catch(() => undefined)
    }

    const columns: FooterColumn[] = normalizedColumns
      .map((col) => ({
        title: col.title ?? '',
        links: (col.links ?? [])
          .filter((l) => l?.label && l?.url)
          .map((l) => resolveDonateLink({ label: l.label ?? '', href: l.url ?? '#' })),
      }))
      .filter((col) => col.title || col.links.length)

    return {
      aboutText: footer?.aboutText?.trim() || null,
      columns: columns.length ? columns : fallbackColumns,
      stayConnectedTitle: footer?.stayConnectedTitle?.trim() || fallback.stayConnectedTitle,
      stayConnectedIntro: footer?.stayConnectedIntro?.trim() || fallback.stayConnectedIntro,
      stayConnectedText: footer?.stayConnectedText?.trim() || fallback.stayConnectedText,
      subscribeLabel: footer?.subscribeLabel?.trim() || fallback.subscribeLabel,
      location: footer?.location?.trim() || fallback.location,
      copyright: footer?.copyright?.trim() || DEFAULT_COPYRIGHT,
    }
  } catch {
    return fallback
  }
})
