import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { seedGalleryAlbums } from '../seeds/tasks/galleryAlbums'
import { seedGalleryPage } from '../seeds/tasks/galleryPage'
import { seedPages } from '../seeds/tasks/pages'

/**
 * Seeds Photo Gallery page copy + albums.
 *
 *   pnpm payload run src/scripts/seedGallery.ts
 *   set FORCE=1 && pnpm payload run src/scripts/seedGallery.ts
 */
console.log('[gallery] starting')
const payload = await getPayload({ config })

await seedPages(payload, { force: false })
await seedGalleryPage(payload)
await seedGalleryAlbums(payload)

console.log('[gallery] done')
process.exit(0)
