import { EPL_MEDIA } from '@/config/eplMedia'
import type { Partner } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type PartnerMarqueeItem = {
  id: string
  name: string
  code: string
  role: string
  logo?: string
}

const fallbackPartners: PartnerMarqueeItem[] = [
  {
    id: 'mastercard-foundation',
    name: 'Mastercard Foundation',
    code: 'MC',
    role: 'Flagship Partner',
    logo: `${EPL_MEDIA}/2025/10/mastercard-foundation.png`,
  },
  {
    id: 'co-impact',
    name: 'Co-Impact',
    code: 'CI',
    role: 'Gender Equity Funder',
    logo: `${EPL_MEDIA}/2025/10/co-impact.png`,
  },
  {
    id: 'government-of-ghana',
    name: 'Government of Ghana',
    code: 'GoG',
    role: 'State Partner',
  },
  {
    id: 'civil-service-authority',
    name: 'Civil Service Authority',
    code: 'CSA',
    role: 'Institutional Partner',
  },
  {
    id: 'ohcs',
    name: 'Office of Head of Civil Service',
    code: 'OHCS',
    role: 'Lead Reform Partner',
    logo: `${EPL_MEDIA}/2025/10/ohcs.png`,
  },
  {
    id: 'undp-ghana',
    name: 'UNDP Ghana',
    code: 'UNDP',
    role: 'Development Partner',
  },
  {
    id: 'us-embassy',
    name: 'U.S. Embassy in Ghana',
    code: 'US',
    role: 'International Ally',
  },
  {
    id: 'european-union',
    name: 'European Union',
    code: 'EU',
    role: 'Strategic Funder',
  },
  {
    id: 'british-council',
    name: 'British Council',
    code: 'BC',
    role: 'Capacity Partner',
  },
]

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function mapPartnerDoc(doc: Partner): PartnerMarqueeItem {
  const programmes = Array.isArray(doc.programmes)
    ? doc.programmes.map((p) => p?.name).filter(Boolean)
    : []
  const role =
    doc.group === 'host'
      ? 'Host Institution'
      : programmes[0] ||
        (doc.description?.trim().slice(0, 48) || 'Strategic Partner')

  return {
    id: String(doc.id),
    name: doc.name,
    code: doc.shortName?.trim() || initials(doc.name),
    role,
    logo: getMediaUrl(doc.logo) ?? undefined,
  }
}

/**
 * Published partners for About marquee / partners strip.
 * Falls back to the redesign partner list when the DB is empty.
 */
export async function getPartnersContent(): Promise<PartnerMarqueeItem[]> {
  const payload = await tryGetPayload()
  if (!payload) return fallbackPartners

  try {
    const result = await payload.find({
      collection: 'partners',
      depth: 1,
      limit: 100,
      sort: 'order',
      where: { status: { equals: 'published' } },
    })
    const docs = (toPlain(result.docs) as Partner[] | null) ?? []
    if (docs.length === 0) return fallbackPartners
    return docs.map(mapPartnerDoc)
  } catch {
    return fallbackPartners
  }
}
