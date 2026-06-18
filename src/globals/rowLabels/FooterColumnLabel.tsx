'use client'

import { useRowLabel } from '@payloadcms/ui'

type FooterColumnRow = {
  title?: string
  links?: unknown[]
}

/**
 * Row label for Footer > Link columns, so each row reads as its column title
 * (with its link count) instead of "Column 01".
 */
export function FooterColumnLabel() {
  const { data, rowNumber } = useRowLabel<FooterColumnRow>()
  const index = `${(rowNumber ?? 0) + 1}`.padStart(2, '0')
  const title = data?.title?.trim()
  const count = Array.isArray(data?.links) ? data.links.length : 0

  if (!title) {
    return <span>{`Column ${index}`}</span>
  }

  return <span>{`${title}${count ? ` (${count})` : ''}`}</span>
}
