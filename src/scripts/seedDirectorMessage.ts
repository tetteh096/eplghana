import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { directorMessageContent } from '../config/aboutSectionContent'

/**
 * Seeds the Country Director message page (Pages → directorMessage) from the
 * existing config. Upload the portrait in admin, or leave empty to use Team.
 *
 *   pnpm -C site payload run src/scripts/seedDirectorMessage.ts
 */
console.log('[director-message] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })

const directorMessage = {
  name: directorMessageContent.name,
  role: directorMessageContent.role,
  eyebrow: directorMessageContent.eyebrow,
  title: directorMessageContent.title,
  greeting: directorMessageContent.greeting,
  paragraphs: directorMessageContent.paragraphs.map((text) => ({ text })),
  pullQuote: directorMessageContent.pullQuote,
  signoff: directorMessageContent.signoff,
  teamCtaLabel: 'Meet Our Team',
  teamCtaUrl: '/about/team',
}

const found = await payload.find({
  collection: 'pages',
  where: { slug: { equals: '/about/director-message' } },
  limit: 1,
})
if (!found.docs.length) {
  console.warn('[director-message] no /about/director-message page found, run seedPages first')
  process.exit(1)
}
await payload.update({
  collection: 'pages',
  id: found.docs[0].id,
  data: { directorMessage },
})
console.log('[director-message] wired message copy into /about/director-message')
console.log('[director-message] done')
process.exit(0)
