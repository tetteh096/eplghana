import type { Payload } from 'payload'

import { seedAbout } from './tasks/about'
import { seedAnnualReportsPage } from './tasks/annualReportsPage'
import { seedCurrentFellowsPage } from './tasks/currentFellowsPage'
import { seedDirectorMessage } from './tasks/directorMessage'
import { seedEplanPage } from './tasks/eplanPage'
import { seedGetInvolvedPage } from './tasks/getInvolvedPage'
import { seedHeader } from './tasks/header'
import { seedPages } from './tasks/pages'
import { seedPartnersPage } from './tasks/partnersPage'
import { seedProjectsPage } from './tasks/projectsPage'
import { seedSiteSettings } from './tasks/siteSettings'
import { seedWhatWeDo } from './tasks/whatWeDo'

type DevSeedTask = {
  name: string
  run: (payload: Payload) => Promise<void>
}

/**
 * Tasks that (re)populate page content + globals from the code defaults.
 * These OVERWRITE existing data, so they only run on a fresh database (first
 * population) or when explicitly forced — see runDevSeeds below.
 */
const contentTasks: DevSeedTask[] = [
  { name: 'about', run: seedAbout },
  { name: 'what-we-do', run: seedWhatWeDo },
  { name: 'director-message', run: seedDirectorMessage },
  { name: 'projects-page', run: seedProjectsPage },
  { name: 'current-fellows-page', run: seedCurrentFellowsPage },
  { name: 'get-involved-page', run: seedGetInvolvedPage },
  { name: 'partners-page', run: seedPartnersPage },
  { name: 'eplan-page', run: seedEplanPage },
  { name: 'annual-reports-page', run: seedAnnualReportsPage },
  { name: 'header', run: seedHeader },
  { name: 'site-settings', run: seedSiteSettings },
]

/**
 * Dev seeding strategy:
 *
 * - Pages: always create any that are missing, but only overwrite existing
 *   pages when forcing.
 * - Content + globals: these overwrite, so they run only on a fresh database
 *   (when pages were just created) or when EPL_DEV_SEED_FORCE=true.
 *
 * This keeps your CMS edits safe across restarts, while still letting you push
 * code defaults into the DB on demand by setting EPL_DEV_SEED_FORCE=true.
 */
export async function runDevSeeds(payload: Payload): Promise<void> {
  const force = process.env.EPL_DEV_SEED_FORCE === 'true'
  payload.logger.info(`[dev-seed] starting (force=${force})...`)

  const { created } = await seedPages(payload, { force })
  const isFreshDatabase = created > 0

  if (!force && !isFreshDatabase) {
    payload.logger.info(
      '[dev-seed] existing content found — preserving CMS edits. ' +
        'Set EPL_DEV_SEED_FORCE=true to push code defaults to the DB.',
    )
    payload.logger.info('[dev-seed] finished')
    return
  }

  for (const { name, run } of contentTasks) {
    try {
      await run(payload)
      payload.logger.info(`[dev-seed] done: ${name}`)
    } catch (error) {
      payload.logger.warn(`[dev-seed] failed: ${name} (${error})`)
    }
  }

  payload.logger.info('[dev-seed] finished')
}
