import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'

/**
 * Restores Footer global to Quick Links + Our Programs (4).
 *
 *   pnpm payload run src/scripts/seedFooter.ts
 */
console.log('[footer] starting')
const payload = await getPayload({ config })

await payload.updateGlobal({
  slug: 'footer',
  data: {
    aboutText:
      "Empowering the next generation of public sector leaders in Ghana's Public Service.",
    columns: [
      {
        title: 'Quick Links',
        links: [
          { label: 'About Us', url: '/about' },
          { label: 'Our Team', url: '/about/team' },
          { label: 'Projects', url: '/projects' },
          { label: 'Community', url: '/community' },
          { label: 'EPLAN', url: '/community/eplan' },
          { label: 'Contact Us', url: '/contact' },
        ],
      },
      {
        title: 'Our Programs',
        links: [
          { label: 'Public Service Fellowship', url: '/projects/public-service-fellowship' },
          { label: 'Women On The Rise', url: '/projects/women-on-the-rise' },
          { label: 'P.E.A.C.E', url: '/projects/peace' },
          { label: 'EPL in Maritime', url: '/projects/epl-in-maritime' },
        ],
      },
    ],
    copyright: '© {year} Emerging Public Leaders of Ghana. All rights reserved.',
  },
})

console.log('[footer] done — original layout content restored')
process.exit(0)
