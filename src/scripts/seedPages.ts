import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { contactPageContent } from '../config/contactPageContent'

/**
 * Seeds the fixed set of Page documents (one per real route) so they appear in
 * the admin "Pages" list, edit-only. Run with:
 *   pnpm -C site payload run src/scripts/seedPages.ts
 *   pnpm -C site payload run src/scripts/seedPages.ts --force   (update existing)
 *
 * Uses top-level await so `payload run` waits for completion. The Contact page
 * is seeded with its full editable content; the others start as list entries
 * (title + slug) and get content as each page is migrated.
 */

const d = contactPageContent

const contactContent = {
  hero: {
    eyebrow: d.hero.eyebrow,
    title: d.hero.title,
    lead: d.hero.lead,
    quickLinks: d.hero.quickLinks.map((q) => ({ label: q.label, href: q.href })),
  },
  visit: {
    eyebrow: d.visit.eyebrow,
    title: d.visit.title,
    description: d.visit.description,
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

const pages: { title: string; slug: string; contact?: typeof contactContent }[] = [
  { title: 'Home', slug: '/' },
  { title: 'About EPL Ghana', slug: '/about' },
  { title: 'What We Do', slug: '/about/what-we-do' },
  { title: 'Message from the Country Director', slug: '/about/director-message' },
  { title: 'Our Team', slug: '/about/team' },
  { title: 'Projects', slug: '/projects' },
  { title: 'Community', slug: '/community' },
  { title: 'Our Partners', slug: '/community/partners' },
  { title: 'Current Fellows', slug: '/community/current-fellows' },
  { title: 'EPLAN', slug: '/community/eplan' },
  { title: 'Get Involved', slug: '/get-involved' },
  { title: 'Annual Reports', slug: '/knowledge-products/annual-reports' },
  { title: 'News & Events', slug: '/news' },
  { title: 'Contact Us', slug: '/contact', contact: contactContent },
]

console.log('[seed:pages] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force = process.argv.includes('--force')

let created = 0
let updated = 0
let skipped = 0

for (const page of pages) {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: page.slug } },
    limit: 1,
  })

  if (existing.docs.length) {
    if (force) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data: page })
      updated += 1
    } else {
      skipped += 1
    }
  } else {
    await payload.create({ collection: 'pages', data: page })
    created += 1
  }
}

console.log(`[seed:pages] created=${created} updated=${updated} skipped=${skipped}`)
console.log('[seed:pages] done')
process.exit(0)
