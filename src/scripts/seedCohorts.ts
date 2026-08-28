import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'

/**
 * Creates Cohort 7 (+ optional Cohort 8) and links existing fellows to them.
 *
 *   pnpm payload run src/scripts/seedCohorts.ts
 *   FORCE=1 pnpm payload run src/scripts/seedCohorts.ts
 */
console.log('[cohorts] starting; DB =', process.env.DATABASE_URL)
const payload = await getPayload({ config })
const force = process.argv.includes('--force') || process.env.FORCE === '1'

type CohortSeed = {
  title: string
  shortLabel: string
  number: number
  isDefault: boolean
  showOnWebsite: boolean
  order: number
  description?: string
}

const cohortSeeds: CohortSeed[] = [
  {
    title: 'Cohort 7',
    shortLabel: 'C7',
    number: 7,
    isDefault: true,
    showOnWebsite: true,
    order: 1,
    description:
      'Cohort VII is embedded across ministries, commissions, and public agencies, driving integrity and innovation where it matters most.',
  },
  {
    title: 'Cohort 8',
    shortLabel: 'C8',
    number: 8,
    isDefault: false,
    showOnWebsite: true,
    order: 2,
    description: 'Cohort VIII fellows serving across Ghana’s public institutions.',
  },
]

const cohortIds = new Map<string, string>()

async function ensureCohort(seed: CohortSeed): Promise<string> {
  const byNumber = await payload.find({
    collection: 'cohorts',
    where: { number: { equals: seed.number } },
    limit: 1,
  })

  const data = {
    ...seed,
    status: 'published' as const,
  }

  if (byNumber.docs.length) {
    if (force) {
      await payload.update({ collection: 'cohorts', id: byNumber.docs[0].id, data })
      console.log(`[cohorts] updated ${seed.title}`)
    } else {
      console.log(`[cohorts] exists (number ${seed.number}) → ${byNumber.docs[0].title}`)
    }
    return String(byNumber.docs[0].id)
  }

  const doc = await payload.create({ collection: 'cohorts', data })
  console.log(`[cohorts] created ${seed.title}`)
  return String(doc.id)
}

for (const seed of cohortSeeds) {
  cohortIds.set(seed.title, await ensureCohort(seed))
}

const cohort7Id = cohortIds.get('Cohort 7')!
const cohort8Id = cohortIds.get('Cohort 8')!

function legacyCohortTitle(raw: unknown): string {
  const value = typeof raw === 'string' ? raw.trim().toLowerCase() : ''
  if (!value) return 'Cohort 7'
  if (value === '8' || value === 'viii' || value.includes('cohort 8') || value === 'c8') {
    return 'Cohort 8'
  }
  return 'Cohort 7'
}

function isRelationshipId(value: unknown): value is string {
  return typeof value === 'string' && /^[a-f0-9]{24}$/i.test(value)
}

let fellowsLinked = 0
let fellowsSkipped = 0

const fellows = await payload.find({ collection: 'fellows', limit: 500, depth: 0 })

for (const fellow of fellows.docs) {
  const cohortValue = fellow.cohort

  if (!force) {
    if (typeof cohortValue === 'object' && cohortValue !== null && 'id' in cohortValue) {
      fellowsSkipped++
      continue
    }
    if (isRelationshipId(cohortValue)) {
      fellowsSkipped++
      continue
    }
  }

  const cohortId =
    typeof cohortValue === 'object' && cohortValue !== null && 'id' in cohortValue
      ? String((cohortValue as { id: string }).id)
      : legacyCohortTitle(cohortValue) === 'Cohort 8'
        ? cohort8Id
        : cohort7Id

  await payload.update({
    collection: 'fellows',
    id: fellow.id,
    data: { cohort: cohortId },
  })
  fellowsLinked++
}

console.log(
  `[cohorts] done — cohorts ready: ${cohortSeeds.length}; fellows linked: ${fellowsLinked}, skipped: ${fellowsSkipped}`,
)
process.exit(0)
