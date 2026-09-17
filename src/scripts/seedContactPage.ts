import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { contactPageContent } from '../config/contactPageContent'
import { createImageImporter, updatePageBySlug } from '../seeds/utils'
import { seedPages } from '../seeds/tasks/pages'

/**
 * Seeds Contact page content (Pages → contact).
 *
 *   pnpm payload run src/scripts/seedContactPage.ts
 */
console.log('[contact-page] starting')
const payload = await getPayload({ config })
const importImage = createImageImporter(payload, 'contact-page')
const d = contactPageContent

await seedPages(payload, { force: false })

const contact = {
  hero: {
    eyebrow: d.hero.eyebrow,
    title: d.hero.title,
    lead: d.hero.lead,
    image: await importImage(d.hero.image, 'EPL Ghana contact'),
  },
  hub: {
    hoursLabel: d.hq.hoursLabel,
    hoursValue: d.hq.hoursValue,
  },
  visit: {
    addressLabel: d.hq.locationLabel,
    phoneLabel: d.hq.phoneLabel,
    emailLabel: d.hq.emailLabel,
    title: d.map.title,
    note: d.map.note,
  },
  mapEmbedUrl: d.map.embedUrl,
  formsSection: {
    title: d.form.title,
    intro: d.form.intro,
  },
  forms: {
    general: {
      submitLabel: d.form.submitLabel,
    },
  },
}

await updatePageBySlug(payload, '/contact', { contact }, 'contact-page')
console.log('[contact-page] done')
process.exit(0)
