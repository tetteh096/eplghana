import {
  aboutPageApproach,
  aboutPageImpact,
  aboutPageImpactImage,
  aboutPageIntro,
  aboutPageMission,
  aboutPagePartnerReasons,
  aboutPageRedesignImages,
  aboutPageStats,
  aboutPageStory,
  aboutPageVision,
} from '@/config/aboutPageContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'

type TabContent = { eyebrow: string; title: string; body: string; image: string }
type PartnerItem = { title: string; body: string; icon: string; accent: string }

export type AboutCoreValue = {
  num: string
  title: string
  meaning: string
  color: string
}

export type AboutContent = {
  intro: {
    eyebrow: string
    title: string
    lead: string
    image: string
    secondaryImage: string
  }
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
  coreValues: AboutCoreValue[]
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

const IMPACT_HEADING = 'Beyond the Numbers'
const IMPACT_INTRO =
  'The human impact of embedding ethical leaders inside Ghana’s public institutions.'

const REDESIGN_INTRO = {
  eyebrow: 'About EPL Ghana',
  title: 'Who We Are',
  lead:
    'A Ghanaian non-profit organization preparing ethical, critical-thinking young leaders to strengthen the civil service and serve the public good.',
}

const REDESIGN_STORY = {
  title: 'A Movement for Stronger Public Service',
  body:
    'Launched in 2018, EPL Ghana was founded on the conviction that public institutions are only as strong as the people within them. Through our 12-month Emerging Public Leaders Fellowship, we place talented young Ghanaians inside public sector institutions for immersive training, executive mentorship, and hands-on service—working toward an ambitious goal of nurturing over 275 dedicated Fellows by 2030 to drive lasting national transformation.',
}

const REDESIGN_MISSION: TabContent = {
  eyebrow: 'Mission',
  title: 'What We Do',
  body: "To develop ethical, critical-thinking, and change-driven public sector leaders who strengthen Ghana's institutions and serve the public good.",
  image: aboutPageMission.image,
}

const REDESIGN_VISION: TabContent = {
  eyebrow: 'Vision',
  title: 'Where We Are Going',
  body: 'A Ghana where public institutions are led by honest, capable, and innovative leaders committed to national development and citizen welfare.',
  image: aboutPageVision.image,
}

const REDESIGN_PARTNER = {
  eyebrow: 'Ecosystem',
  title: 'Our Partners & Supporters',
  lead:
    'We collaborate with government ministries, international development agencies, and civil society to build public leadership capacity.',
}

export const aboutCoreValuesFallback: AboutCoreValue[] = [
  {
    num: '01',
    title: 'Partnership',
    color: 'blue',
    meaning:
      'We work hand-in-hand with government agencies, development partners, and communities to achieve lasting national progress.',
  },
  {
    num: '02',
    title: 'Integrity',
    color: 'navy',
    meaning:
      'We operate with honesty, fairness, and moral courage, modeling the exact character we expect in our Fellows.',
  },
  {
    num: '03',
    title: 'Value-Based Leadership',
    color: 'blue',
    meaning:
      'We develop leaders guided not just by technical skill, but by a deep commitment to service, fairness, and public good.',
  },
  {
    num: '04',
    title: 'Excellence',
    color: 'navy',
    meaning:
      'We set high standards in training, work delivery, and Fellow support. Excellence is our baseline, not an afterthought.',
  },
  {
    num: '05',
    title: 'Transparency',
    color: 'blue',
    meaning:
      'We communicate openly and keep our doors open. Clear accountability builds trust with partners, Fellows, and the public.',
  },
  {
    num: '06',
    title: 'Sustainability',
    color: 'navy',
    meaning:
      'We build systems, partnerships, and leadership skills designed to last and benefit Ghana for generations to come.',
  },
]

const ALLOWED_COLORS = new Set(['blue', 'gold', 'navy'])

function mapCoreValues(raw: unknown): AboutCoreValue[] {
  // Homepage-approved Option A copy is the source of truth for About values.
  if (!Array.isArray(raw) || raw.length === 0) return aboutCoreValuesFallback

  return aboutCoreValuesFallback.map((fallback, idx) => {
    const item: any = raw[idx]
    const colorRaw = typeof item?.color === 'string' ? item.color.trim().toLowerCase() : ''
    return {
      num: fallback.num,
      title: fallback.title,
      meaning: fallback.meaning,
      color: ALLOWED_COLORS.has(colorRaw) ? colorRaw : fallback.color,
    }
  })
}

/**
 * About page content: Pages → About layered over the config defaults in
 * aboutPageContent. Blank fields fall back; images resolve to Media URLs with
 * the current photo as fallback.
 */
export async function getAboutContent(): Promise<AboutContent> {
  const page = await getPage('/about')
  const a = (page?.about ?? {}) as Record<string, any>

  const bullets: string[] =
    Array.isArray(a.approachBullets) && a.approachBullets.length
      ? a.approachBullets.map((b: any) => b?.text).filter(Boolean)
      : aboutPageApproach.bullets

  const tab = (cms: any, d: TabContent): TabContent => ({
    eyebrow: txt(cms?.eyebrow, d.eyebrow),
    title: txt(cms?.title, d.title),
    body: txt(cms?.body, d.body),
    image: img(cms?.image, d.image),
  })

  const impactItems =
    Array.isArray(a.impact?.items) && a.impact.items.length
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

  const stats =
    Array.isArray(a.stats) && a.stats.length
      ? a.stats.map((s: any) => ({ value: s?.value ?? '', label: s?.label ?? '' }))
      : aboutPageStats.map((s) => ({ value: s.value, label: s.label }))

  return {
    intro: {
      eyebrow: REDESIGN_INTRO.eyebrow,
      title: REDESIGN_INTRO.title,
      lead: REDESIGN_INTRO.lead,
      image: img(a.introImage, aboutPageRedesignImages.hero),
      secondaryImage: img(a.introSecondaryImage, aboutPageRedesignImages.story),
    },
    approach: { title: txt(a.approachTitle, aboutPageApproach.title), bullets },
    story: {
      growth: {
        title: REDESIGN_STORY.title,
        highlight: txt(a.growthHighlight, aboutPageStory.growth.highlight),
        highlightLabel: txt(a.growthHighlightLabel, aboutPageStory.growth.highlightLabel),
        body: REDESIGN_STORY.body,
      },
      investment: {
        title: txt(a.investmentTitle, aboutPageStory.investment.title),
        body: txt(a.investmentBody, aboutPageStory.investment.body),
      },
    },
    mission: REDESIGN_MISSION,
    vision: REDESIGN_VISION,
    impact: {
      image: img(a.impact?.image, aboutPageImpactImage),
      heading: txt(a.impact?.heading, IMPACT_HEADING),
      intro: txt(a.impact?.intro, IMPACT_INTRO),
      items: impactItems,
    },
    partner: {
      eyebrow: REDESIGN_PARTNER.eyebrow,
      title: REDESIGN_PARTNER.title,
      lead: REDESIGN_PARTNER.lead,
      body: txt(a.partner?.body, aboutPagePartnerReasons.body),
      chooseLabel: txt(a.partner?.chooseLabel, aboutPagePartnerReasons.chooseLabel),
      items: partnerItems,
    },
    stats,
    coreValues: mapCoreValues(a.coreValues),
  }
}
