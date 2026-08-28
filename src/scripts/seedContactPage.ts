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
    quickLinks: d.hero.quickLinks.map((q) => ({ label: q.label, href: q.href })),
  },
  hub: {
    eyebrow: d.hub.eyebrow,
    responseLabel: d.hub.responseLabel,
    responseValue: d.hub.responseValue,
    hoursLabel: d.hub.hoursLabel,
    hoursValue: d.hub.hoursValue,
    hqLabel: d.hub.hqLabel,
    hqValue: d.hub.hqValue,
  },
  channels: {
    phoneEyebrow: d.channels.phone.eyebrow,
    phoneTitle: d.channels.phone.title,
    phoneText: d.channels.phone.text,
    phoneCtaLabel: d.channels.phone.ctaLabel,
    emailEyebrow: d.channels.email.eyebrow,
    emailTitle: d.channels.email.title,
    emailText: d.channels.email.text,
    emailCtaLabel: d.channels.email.ctaLabel,
    visitEyebrow: d.channels.visit.eyebrow,
    visitTitle: d.channels.visit.title,
    visitText: d.channels.visit.text,
    visitCtaLabel: d.channels.visit.ctaLabel,
  },
  visit: {
    eyebrow: d.visit.eyebrow,
    title: d.visit.title,
    description: d.visit.description,
    addressLabel: d.visit.addressLabel,
    phoneLabel: d.visit.phoneLabel,
    emailLabel: d.visit.emailLabel,
    note: d.visit.note,
  },
  mapEmbedUrl: d.mapEmbedUrl,
  formsSection: {
    eyebrow: d.formsSection.eyebrow,
    title: d.formsSection.title,
    intro: d.formsSection.intro,
  },
  forms: {
    general: {
      eyebrow: d.forms.general.eyebrow,
      title: d.forms.general.title,
      description: d.forms.general.description,
      submitLabel: d.forms.general.submitLabel,
    },
    partnership: {
      eyebrow: d.forms.partnership.eyebrow,
      title: d.forms.partnership.title,
      description: d.forms.partnership.description,
      submitLabel: d.forms.partnership.submitLabel,
    },
  },
}

await updatePageBySlug(payload, '/contact', { contact }, 'contact-page')
console.log('[contact-page] done')
process.exit(0)
