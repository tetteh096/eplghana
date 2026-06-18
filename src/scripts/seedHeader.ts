import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { headerCta, isNavDropdown, mainNavigation } from '../config/navigation'

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
        children: item.items.map((sub) => ({ label: sub.label, url: sub.href })),
      }
    : { label: item.label, url: item.href },
)

const result = await payload.updateGlobal({
  slug: 'header',
  data: {
    navItems,
    cta: { enabled: true, label: headerCta.label, url: headerCta.href },
  },
})

console.log('[seed] navItems now:', Array.isArray(result?.navItems) ? result.navItems.length : 0)
console.log('[seed] done')
process.exit(0)
