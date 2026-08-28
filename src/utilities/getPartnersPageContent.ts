import {
  partnersPageContent,
  type PartnerBenefit,
  type PartnerCategory,
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
    title: string
    lead: string
    ctaLabel: string
    ctaHref: string
    image: string
    secondaryImage: string
    stats: { value: string; label: string }[]
  }
  collaboration: {
    eyebrow: string
    title: string
    lead: string
    benefits: PartnerBenefit[]
    highlightValue: string
    highlightTitle: string
    highlightText: string
  }
  ecosystem: {
    eyebrow: string
    title: string
    intro: string
    learnMoreLabel: string
    closeLabel: string
    highlightsLabel: string
    categories: PartnerCategory[]
  }
  network: {
    eyebrow: string
    title: string
    intro: string
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
  form: {
    eyebrow: string
    title: string
    description: string
    submitLabel: string
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
  const cms = ((page as Record<string, any> | null)?.partnersPage ?? {}) as Record<string, any>

  const heroStats =
    Array.isArray(cms.heroStats) && cms.heroStats.length
      ? cms.heroStats.map((s: any) => ({ value: s?.value ?? '', label: s?.label ?? '' }))
      : d.hero.stats

  const benefits: PartnerBenefit[] =
    Array.isArray(cms.collabBenefits) && cms.collabBenefits.length
      ? cms.collabBenefits.map((b: any) => ({
          eyebrow: txt(b?.eyebrow, ''),
          title: txt(b?.title, ''),
          text: txt(b?.text, ''),
        }))
      : d.collaboration.benefits

  const categories: PartnerCategory[] =
    Array.isArray(cms.ecosystemCategories) && cms.ecosystemCategories.length
      ? cms.ecosystemCategories.map((c: any, i: number) => ({
          id: txt(c?.code, String(i + 1).padStart(2, '0')),
          title: txt(c?.title, ''),
          description: txt(c?.description, ''),
          highlights: Array.isArray(c?.highlights)
            ? c.highlights.map((h: any) => txt(h?.text, '')).filter(Boolean)
            : [],
        }))
      : d.ecosystem.categories

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
      title: txt(cms.heroTitle, d.hero.title),
      lead: txt(cms.heroLead, d.hero.lead),
      ctaLabel: txt(cms.heroCtaLabel, d.hero.ctaLabel),
      ctaHref: txt(cms.heroCtaUrl, d.hero.ctaHref),
      image: img(cms.heroImage, d.hero.image),
      secondaryImage: img(cms.heroSecondaryImage, d.hero.secondaryImage),
      stats: heroStats,
    },
    collaboration: {
      eyebrow: txt(cms.collabEyebrow, d.collaboration.eyebrow),
      title: txt(cms.collabTitle, d.collaboration.title),
      lead: txt(cms.collabLead, d.collaboration.lead),
      benefits,
      highlightValue: txt(cms.collabHighlightValue, d.collaboration.highlightValue),
      highlightTitle: txt(cms.collabHighlightTitle, d.collaboration.highlightTitle),
      highlightText: txt(cms.collabHighlightText, d.collaboration.highlightText),
    },
    ecosystem: {
      eyebrow: txt(cms.ecosystemEyebrow, d.ecosystem.eyebrow),
      title: txt(cms.ecosystemTitle, d.ecosystem.title),
      intro: txt(cms.ecosystemIntro, d.ecosystem.intro),
      learnMoreLabel: txt(cms.ecosystemLearnMoreLabel, d.ecosystem.learnMoreLabel),
      closeLabel: txt(cms.ecosystemCloseLabel, d.ecosystem.closeLabel),
      highlightsLabel: txt(cms.ecosystemHighlightsLabel, d.ecosystem.highlightsLabel),
      categories,
    },
    network: {
      eyebrow: txt(cms.networkEyebrow, d.network.eyebrow),
      title: txt(cms.networkTitle, d.network.title),
      intro: txt(cms.networkIntro, d.network.intro),
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
    form: {
      eyebrow: txt(cms.formEyebrow, d.form.eyebrow),
      title: txt(cms.formTitle, d.form.title),
      description: txt(cms.formDescription, d.form.description),
      submitLabel: txt(cms.formSubmitLabel, d.form.submitLabel),
    },
    cta: {
      title: txt(cms.ctaTitle, d.cta.title),
      description: txt(cms.ctaDescription, d.cta.description),
      ctaLabel: txt(cms.ctaLabel, d.cta.ctaLabel),
      ctaHref: txt(cms.ctaUrl, d.cta.ctaHref),
    },
  }
}
