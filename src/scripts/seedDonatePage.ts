import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { seedDonatePage } from '../seeds/tasks/donatePage'
import { seedPages } from '../seeds/tasks/pages'

/**
 * Seeds Donate / Support page (Pages → donatePage).
 *
 *   pnpm payload run src/scripts/seedDonatePage.ts
 */
console.log('[donate-page] starting')
const payload = await getPayload({ config })

await seedPages(payload, { force: false })
await seedDonatePage(payload)

console.log('[donate-page] done')
process.exit(0)
