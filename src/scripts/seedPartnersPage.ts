import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { seedPartnersPage } from '../seeds/tasks/partnersPage'
import { seedPages } from '../seeds/tasks/pages'

/**
 * Seeds Our Partners page static copy (Pages → partnersPage).
 *
 *   pnpm payload run src/scripts/seedPartnersPage.ts
 */
console.log('[partners-page] starting')
const payload = await getPayload({ config })

await seedPages(payload, { force: false })
await seedPartnersPage(payload)

console.log('[partners-page] done')
process.exit(0)
