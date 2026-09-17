import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { seedGetInvolvedPage } from '../seeds/tasks/getInvolvedPage'
import { seedPages } from '../seeds/tasks/pages'

/**
 * Seeds Get Involved page static copy (Pages → getInvolvedPage).
 *
 *   pnpm payload run src/scripts/seedGetInvolvedPage.ts
 */
console.log('[get-involved-page] starting')
const payload = await getPayload({ config })

await seedPages(payload, { force: false })
await seedGetInvolvedPage(payload)

console.log('[get-involved-page] done')
process.exit(0)
