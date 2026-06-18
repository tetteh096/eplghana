import {
  aboutPageApproach,
  aboutPageImpact,
  aboutPageImpactImage,
  aboutPageIntro,
  aboutPageMission,
  aboutPagePartnerReasons,
  aboutPageStats,
  aboutPageStory,
  aboutPageVision,
} from '@/config/aboutPageContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'

type TabContent = { eyebrow: string; title: string; body: string; image: string }
type PartnerItem = { title: string; body: string; icon: string; accent: string }

export type AboutContent = {
  intro: { eyebrow: string; lead: string; image: string; secondaryImage: string }
  approach: { title: string; bullets: string[] }
  story: typeof aboutPageStory
  mission: TabContent
  vision: TabContent
  impact: { image: string; heading: string; intro: string; items: { title: string; body: string }[] }
  partner: {
    eyebrow: string
    title: string
    lead: string
    body: string
    chooseLabel: string
    items: PartnerItem[]
  }
  stats: { value: string; label: string }[]
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

const IMPACT_HEADING = 'Beyond the Numbers'
const IMPACT_INTRO =
  'The human impact of embedding ethical leaders inside Ghana’s public institutions.'

/**
 * About page content: Pages → About layered over the config defaults in
 * aboutPageContent. Blank fields fall back; images resolve to Media URLs with
 * the current photo as fallback.
 */
export async function getAboutContent(): Promise<AboutContent> {
  const page = await getPage('/about')
  const a = (page?.about ?? {}) as Record<string, any>

  const bullets: string[] = Array.isArray(a.approachBullets) && a.approachBullets.length
    ? a.approachBullets.map((b: any) => b?.text).filter(Boolean)
    : aboutPageApproach.bullets

  const tab = (cms: any, d: TabContent): TabContent => ({
    eyebrow: txt(cms?.eyebrow, d.eyebrow),
    title: txt(cms?.title, d.title),
    body: txt(cms?.body, d.body),
    image: img(cms?.image, d.image),
  })

  const impactItems = Array.isArray(a.impact?.items) && a.impact.items.length
    ? a.impact.items.map((i: any) => ({ title: i?.title ?? '', body: i?.body ?? '' }))
    : aboutPageImpact.map((i) => ({ title: i.title, body: i.body }))

  const partnerItems: PartnerItem[] =
    Array.isArray(a.partner?.items) && a.partner.items.length
      ? a.partner.items.map((i: any, idx: number) => ({
          title: i?.title ?? '',
          body: i?.body ?? '',
          icon: img(i?.icon, aboutPagePartnerReasons.items[idx]?.icon ?? ''),
          accent: i?.accent ?? aboutPagePartnerReasons.items[idx]?.accent ?? 'primary',
        }))
      : aboutPagePartnerReasons.items.map((i) => ({
          title: i.title,
          body: i.body,
          icon: i.icon,
          accent: i.accent,
        }))

  const stats = Array.isArray(a.stats) && a.stats.length
    ? a.stats.map((s: any) => ({ value: s?.value ?? '', label: s?.label ?? '' }))
    : aboutPageStats.map((s) => ({ value: s.value, label: s.label }))

  return {
    intro: {
      eyebrow: txt(a.introEyebrow, aboutPageIntro.eyebrow),
      lead: txt(a.introLead, aboutPageIntro.paragraphs[0]),
      image: img(a.introImage, aboutPageIntro.image),
      secondaryImage: img(a.introSecondaryImage, aboutPageIntro.secondaryImage),
    },
    approach: { title: txt(a.approachTitle, aboutPageApproach.title), bullets },
    story: {
      growth: {
        title: txt(a.growthTitle, aboutPageStory.growth.title),
        highlight: txt(a.growthHighlight, aboutPageStory.growth.highlight),
        highlightLabel: txt(a.growthHighlightLabel, aboutPageStory.growth.highlightLabel),
        body: txt(a.growthBody, aboutPageStory.growth.body),
      },
      investment: {
        title: txt(a.investmentTitle, aboutPageStory.investment.title),
        body: txt(a.investmentBody, aboutPageStory.investment.body),
      },
    },
    mission: tab(a.mission, aboutPageMission),
    vision: tab(a.vision, aboutPageVision),
    impact: {
      image: img(a.impact?.image, aboutPageImpactImage),
      heading: txt(a.impact?.heading, IMPACT_HEADING),
      intro: txt(a.impact?.intro, IMPACT_INTRO),
      items: impactItems,
    },
    partner: {
      eyebrow: txt(a.partner?.eyebrow, aboutPagePartnerReasons.eyebrow),
      title: txt(a.partner?.title, aboutPagePartnerReasons.title),
      lead: txt(a.partner?.lead, aboutPagePartnerReasons.lead),
      body: txt(a.partner?.body, aboutPagePartnerReasons.body),
      chooseLabel: txt(a.partner?.chooseLabel, aboutPagePartnerReasons.chooseLabel),
      items: partnerItems,
    },
    stats,
  }
}
