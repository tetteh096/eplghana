'use client'

import { useRowLabel } from '@payloadcms/ui'

type NavItemRow = {
  label?: string
  url?: string
  children?: unknown[]
}

/**
 * Row label for Header > Menu items, so each row reads as its menu label
 * (and notes when it's a dropdown) instead of "Menu item 01".
 */
export function NavItemLabel() {
  const { data, rowNumber } = useRowLabel<NavItemRow>()
  const index = `${(rowNumber ?? 0) + 1}`.padStart(2, '0')
  const label = data?.label?.trim()
  const isDropdown = Array.isArray(data?.children) && data.children.length > 0

  if (!label) {
    return <span>{`Menu item ${index}`}</span>
  }

  return (
    <span>
      {label}
      {isDropdown ? ' (dropdown)' : ''}
    </span>
  )
}
