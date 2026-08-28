import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'

const payload = await getPayload({ config })

const result = await payload.find({
  collection: 'projects',
  depth: 0,
  limit: 20,
  overrideAccess: true,
  where: {
    or: [
      { slug: { equals: 'epl-in-maritime' } },
      { slug: { equals: 'eplim' } },
      { slug: { equals: 'maritime' } },
    ],
  },
})

console.log(`[eplim-debug] found ${result.docs.length} docs`)
for (const d of result.docs) {
  const e = (d as { eplimDetail?: { heroTitle?: string } }).eplimDetail
  console.log(
    JSON.stringify(
      {
        id: d.id,
        slug: d.slug,
        status: d.status,
        title: d.title,
        heroTitle: e?.heroTitle,
        updatedAt: d.updatedAt,
      },
      null,
      2,
    ),
  )
}

process.exit(0)
