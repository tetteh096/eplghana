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
    "A non-profit organisation committed to developing Ghana's next generation of ethical, critical-thinking public servants.",
}

const REDESIGN_STORY = {
  title: 'A Movement for Stronger Public Service',
  body:
    'Launched in 2018, EPL Ghana was founded on the conviction that public institutions are only as strong as the people within them. Through our 12-month Emerging Public Leaders Fellowship, we place talented young Ghanaians inside public sector institutions for immersive training, executive mentorship, and hands-on service, working toward an ambitious goal of nurturing over 275 dedicated Fellows by 2030 to drive lasting national transformation.',
}

const REDESIGN_MISSION: TabContent = {
  eyebrow: 'Mission',
  title: 'What We Do',
  body: "To develop ethical, critical-thinking and change-driven public sector leaders who strengthen Ghana's institutions and serve the public good.",
  image: aboutPageMission.image,
}

const REDESIGN_VISION: TabContent = {
  eyebrow: 'Vision',
  title: 'Where We Are Going',
  body: 'A Ghana where public institutions are led by principled, capable and innovative leaders committed to national development and public welfare.',
  image: aboutPageVision.image,
}

const REDESIGN_PARTNER = {
  eyebrow: 'Ecosystem',
  title: 'Our Partners & Sponsors',
  lead:
    "We work with government agencies, development partners and the private sector to build Ghana's public leadership capacity.",
}

export const aboutCoreValuesFallback: AboutCoreValue[] = [
  {
    num: '01',
    title: 'Partnership',
    color: 'blue',
    meaning:
      'We believe in the core values of collaboration. By fostering strong partnerships across sectors and communities, we create meaningful connections that drive collective impact and sustainable change in public service.',
  },
  {
    num: '02',
    title: 'Integrity',
    color: 'navy',
    meaning:
      'Operating with transparency, honesty and ethical consistency in everything we do, modelling the very values we seek to develop in our Fellows.',
  },
  {
    num: '03',
    title: 'Value-Based Leadership',
    color: 'blue',
    meaning:
      'Developing leaders guided not only by competence, but by a deep commitment to public good, ethical service and institutional responsibility.',
  },
  {
    num: '04',
    title: 'Excellence',
    color: 'navy',
    meaning:
      'Maintaining the highest standards in programme design, Fellow development and organisational practice — excellence is not a goal, it is our baseline.',
  },
  {
    num: '05',
    title: 'Transparency',
    color: 'blue',
    meaning:
      'We embrace openness and clear communication in our operations and relationships. Transparency builds trust and reinforces our credibility as a public service organisation.',
  },
  {
    num: '06',
    title: 'Sustainability',
    color: 'navy',
    meaning:
      'Building systems, relationships and practices designed to endure long after any single programme, cohort or partnership.',
  },
]

const ALLOWED_COLORS = new Set(['blue', 'gold', 'navy'])

function mapCoreValues(raw: unknown): AboutCoreValue[] {
  if (!Array.isArray(raw) || raw.length === 0) return aboutCoreValuesFallback

  return raw.map((item: any, idx: number) => {
    const fallback = aboutCoreValuesFallback[idx] ?? aboutCoreValuesFallback[0]
    const colorRaw = typeof item?.color === 'string' ? item.color.trim().toLowerCase() : ''
    return {
      num: txt(item?.num, fallback.num),
      title: txt(item?.title, fallback.title),
      meaning: txt(item?.meaning, fallback.meaning),
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
