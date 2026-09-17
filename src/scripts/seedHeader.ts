import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { isNavDropdown, mainNavigation } from '../config/navigation'

/**
 * One-off seed for the Header global, run with:
 *   pnpm -C site payload run src/scripts/seedHeader.ts
 *
 * Force-writes the Header menu from the default navigation. Uses top-level
 * await so `payload run` waits for it to finish (a fire-and-forget promise
 * gets cut off when module evaluation ends).
 */
console.log('[seed] starting; DB =', process.env.DATABASE_URL)

const payload = await getPayload({ config })

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

const result = await payload.updateGlobal({
  slug: 'header',
  data: {
    navItems,
    topLinks: [
      { label: 'About', url: '/about' },
      { label: 'Projects', url: '/projects' },
      { label: 'Community', url: '/community/current-fellows' },
    ],
    cta: { enabled: true, label: 'Donate', url: '/donate' },
    partnerCta: { enabled: true, label: 'Partner with us', url: '/community/partners' },
  },
})

console.log('[seed] navItems now:', Array.isArray(result?.navItems) ? result.navItems.length : 0)
console.log('[seed] done')
process.exit(0)
