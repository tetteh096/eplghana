import type { Payload } from 'payload'

import { isNavDropdown, mainNavigation } from '@/config/navigation'

const topLinks = [
  { label: 'About', url: '/about' },
  { label: 'Projects', url: '/projects' },
  { label: 'Community', url: '/community/current-fellows' },
]

export async function seedHeader(payload: Payload): Promise<void> {
  const navItems = mainNavigation.map((item) =>
    isNavDropdown(item)
      ? {
          label: item.label,
          children: item.items.map((sub) => ({
            label: sub.label,
            url: sub.href,
            ...(sub.description ? { description: sub.description } : {}),
          })),
        }
      : { label: item.label, url: item.href },
  )

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems,
      topLinks,
      cta: { enabled: true, label: 'Donate', url: '/donate' },
      partnerCta: { enabled: true, label: 'Partner with us', url: '/community/partners' },
    },
  })
}
