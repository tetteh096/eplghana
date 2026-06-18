import {
  partnersPageContent,
  type PartnerEntry,
} from '@/config/partnersPageContent'
import type { Partner } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type PartnersPageContent = {
  hero: {
    eyebrow: string
    lead: string
    image: string
    secondaryImage: string
    stats: { value: string; label: string }[]
  }
  partners: {
    eyebrow: string
    title: string
    intro: string
    items: PartnerEntry[]
  }
  partnerOrganizations: {
    eyebrow: string
    title: string
    intro: string
    items: PartnerEntry[]
  }
  cta: {
    title: string
    description: string
    ctaLabel: string
    ctaHref: string
  }
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

function mapPartnerDoc(doc: Partner): PartnerEntry {
  const programmes = Array.isArray(doc.programmes)
    ? doc.programmes.map((p) => p?.name).filter(Boolean)
    : undefined

  return {
    id: String(doc.id),
    name: doc.name,
    description: doc.description?.trim() || undefined,
    logo: getMediaUrl(doc.logo) ?? undefined,
    href: doc.websiteUrl?.trim() || undefined,
    programmes: programmes?.length ? programmes : undefined,
    shortName: doc.shortName?.trim() || undefined,
  }
}

/**
 * Our Partners page: static copy from Pages → partnersPage; partner cards from
 * the Partners collection (strategic + host groups) with config fallback.
 */
export async function getPartnersPageContent(): Promise<PartnersPageContent> {
  const d = partnersPageContent
  const page = await getPage('/community/partners')
  const cms = (page?.partnersPage ?? {}) as Record<string, any>

  const heroStats =
    Array.isArray(cms.heroStats) && cms.heroStats.length
      ? cms.heroStats.map((s: any) => ({ value: s?.value ?? '', label: s?.label ?? '' }))
      : d.hero.stats

  let strategicItems: PartnerEntry[] = d.partners.items
  let hostItems: PartnerEntry[] = d.partnerOrganizations.items

  const payload = await tryGetPayload()
  if (payload) {
    try {
      const result = await payload.find({
        collection: 'partners',
        depth: 1,
        limit: 100,
        sort: 'order',
        where: { status: { equals: 'published' } },
      })
      const docs = (toPlain(result.docs) as Partner[] | null) ?? []
      if (docs.length > 0) {
        const strategic = docs.filter((doc) => doc.group === 'strategic').map(mapPartnerDoc)
        const host = docs.filter((doc) => doc.group === 'host').map(mapPartnerDoc)
        if (strategic.length) strategicItems = strategic
        if (host.length) hostItems = host
      }
    } catch {
      // keep config fallback
    }
  }

  return {
    hero: {
      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
      lead: txt(cms.heroLead, d.hero.lead),
      image: img(cms.heroImage, d.hero.image),
      secondaryImage: img(cms.heroSecondaryImage, d.hero.secondaryImage),
      stats: heroStats,
    },
    partners: {
      eyebrow: txt(cms.strategicEyebrow, d.partners.eyebrow),
      title: txt(cms.strategicTitle, d.partners.title),
      intro: txt(cms.strategicIntro, d.partners.intro),
      items: strategicItems,
    },
    partnerOrganizations: {
      eyebrow: txt(cms.hostEyebrow, d.partnerOrganizations.eyebrow),
      title: txt(cms.hostTitle, d.partnerOrganizations.title),
      intro: txt(cms.hostIntro, d.partnerOrganizations.intro),
      items: hostItems,
    },
    cta: {
      title: txt(cms.ctaTitle, d.cta.title),
      description: txt(cms.ctaDescription, d.cta.description),
      ctaLabel: txt(cms.ctaLabel, d.cta.ctaLabel),
      ctaHref: txt(cms.ctaUrl, d.cta.ctaHref),
    },
  }
}
