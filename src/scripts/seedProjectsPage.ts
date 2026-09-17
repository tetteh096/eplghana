import 'dotenv/config'

import { getPayload } from 'payload'



import config from '../payload.config'

import { projectsPageCta, projectsPageIntro } from '../config/projectsPageContent'



/**

 * Seeds the Projects page copy (Pages → projects) from config.

 *

 *   pnpm -C site payload run src/scripts/seedProjectsPage.ts

 */

console.log('[projects-page] starting; DB =', process.env.DATABASE_URL)

const payload = await getPayload({ config })

const d = projectsPageIntro



const projects = {

  eyebrow: d.eyebrow,

  title: d.title,

  description: d.description,

  additionalParagraphs: d.additionalParagraphs.map((text) => ({ text })),

  ctaTitle: projectsPageCta.title,

  ctaLabel: projectsPageCta.ctaLabel,

  ctaUrl: projectsPageCta.ctaHref,

}



const found = await payload.find({

  collection: 'pages',

  where: { slug: { equals: '/projects' } },

  limit: 1,

})

if (!found.docs.length) {

  console.warn('[projects-page] no /projects page found, run seedPages first')

  process.exit(1)

}

await payload.update({ collection: 'pages', id: found.docs[0].id, data: { projects } })

console.log('[projects-page] done')

process.exit(0)


