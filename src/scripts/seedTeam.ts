import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { teamMembers } from '../config/teamPageContent'

/**
 * Seeds board and staff from config/teamPageContent.ts into the Team collection.
 *
 *   pnpm -C site payload run src/scripts/seedTeam.ts
 *   pnpm -C site payload run src/scripts/seedTeam.ts --force
 */

const force = process.argv.includes('--force')

const payload = await getPayload({ config })

let created = 0
let updated = 0
let skipped = 0

for (let index = 0; index < teamMembers.length; index++) {
  const member = teamMembers[index]
  const existing = await payload.find({
    collection: 'team',
    limit: 1,
    where: { name: { equals: member.name } },
  })

  const data = {
    name: member.name,
    role: member.role,
    group: member.group,
    bio: member.bio,
    email: member.email ?? null,
    phone: member.phone ?? null,
    linkedin: member.linkedin ?? null,
    twitter: member.twitter ?? null,
    order: index,
    status: 'published' as const,
  }

  if (existing.docs[0]) {
    if (!force) {
      skipped++
      continue
    }
    await payload.update({
      collection: 'team',
      id: existing.docs[0].id,
      data,
    })
    updated++
    continue
  }

  await payload.create({
    collection: 'team',
    data,
  })
  created++
}

payload.logger.info(
  `[EPL] Team seed complete, created ${created}, updated ${updated}, skipped ${skipped}`,
)

process.exit(0)
