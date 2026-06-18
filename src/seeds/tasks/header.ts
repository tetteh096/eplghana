import type { Payload } from 'payload'

import { headerCta, isNavDropdown, mainNavigation } from '@/config/navigation'

export async function seedHeader(payload: Payload): Promise<void> {
  const navItems = mainNavigation.map((item) =>
    isNavDropdown(item)
      ? {
          label: item.label,
          children: item.items.map((sub) => ({ label: sub.label, url: sub.href })),
        }
      : { label: item.label, url: item.href },
  )

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems,
      cta: { enabled: true, label: headerCta.label, url: headerCta.href },
    },
  })
}
