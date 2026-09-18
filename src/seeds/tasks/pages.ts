import type { Payload } from 'payload'

import { contactPageContent } from '@/config/contactPageContent'

const d = contactPageContent

const contactContent = {
  hero: {
    eyebrow: d.hero.eyebrow,
    title: d.hero.title,
    lead: d.hero.lead,
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
  { title: 'Donate', slug: '/donate' },
  { title: 'Annual Reports', slug: '/knowledge-products/annual-reports' },
  { title: 'News & Events', slug: '/news' },
  { title: 'Research and Publications', slug: '/research' },
  { title: 'Testimonials', slug: '/testimonials' },
  { title: 'Privacy Note', slug: '/privacy' },
  { title: 'Photo Gallery', slug: '/gallery' },
  { title: 'Contact Us', slug: '/contact', contact: contactContent },
]

export type SeedPagesOptions = {
  force?: boolean
}

export type SeedPagesResult = {
  created: number
  updated: number
  skipped: number
}

export async function seedPages(
  payload: Payload,
  options: SeedPagesOptions = {},
): Promise<SeedPagesResult> {
  const { force = false } = options
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

  payload.logger.info(`[seed:pages] created=${created} updated=${updated} skipped=${skipped}`)

  return { created, updated, skipped }
}
