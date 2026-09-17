import { aboutPageRedesignImages } from '@/config/aboutPageContent'
import { getMediaUrl, resolveMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'

export type AboutCoreValue = {
  num: string
  title: string
  meaning: string
}

export type AboutContent = {
  intro: {
    eyebrow: string
    title: string
    lead: string
    image: string
  }
  story: {
    eyebrow: string
    title: string
    body: string
    image: string
  }
  mission: { eyebrow: string; title: string; body: string }
  vision: { eyebrow: string; title: string; body: string }
  coreValuesSection: {
    eyebrow: string
    title: string
    hint: string
  }
  coreValues: AboutCoreValue[]
  teamSection: {
    title: string
    intro: string
    leadershipLabel: string
    staffLabel: string
  }
  partner: {
    eyebrow: string
    title: string
    lead: string
    ctaLabel: string
    ctaHref: string
  }
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v.trim() : d)

export const aboutCoreValuesFallback: AboutCoreValue[] = [
  {
    num: '01',
    title: 'Partnership',
    meaning:
      'We work hand-in-hand with government agencies, development partners, and communities to achieve lasting national progress.',
  },
  {
    num: '02',
    title: 'Integrity',
    meaning:
      'We operate with honesty, fairness, and moral courage, modeling the exact character we expect in our Fellows.',
  },
  {
    num: '03',
    title: 'Value-Based Leadership',
    meaning:
      'We develop leaders guided not just by technical skill, but by a deep commitment to service, fairness, and public good.',
  },
  {
    num: '04',
    title: 'Excellence',
    meaning:
      'We set high standards in training, work delivery, and Fellow support. Excellence is our baseline, not an afterthought.',
  },
  {
    num: '05',
    title: 'Transparency',
    meaning:
      'We communicate openly and keep our doors open. Clear accountability builds trust with partners, Fellows, and the public.',
  },
  {
    num: '06',
    title: 'Sustainability',
    meaning:
      'We build systems, partnerships, and leadership skills designed to last and benefit Ghana for generations to come.',
  },
]

const defaults = {
  intro: {
    eyebrow: 'About EPL Ghana',
    title: 'Who We Are',
    lead:
      'A Ghanaian non-profit organization preparing ethical, critical-thinking young leaders to strengthen the civil service and serve the public good.',
  },
  story: {
    eyebrow: 'Our Story',
    title: 'A Movement for Stronger Public Service',
    body:
      'Launched in 2018, EPL Ghana was founded on the conviction that public institutions are only as strong as the people within them. Through our 12-month Emerging Public Leaders Fellowship, we place talented young Ghanaians inside public sector institutions for immersive training, executive mentorship, and hands-on service—working toward an ambitious goal of nurturing over 275 dedicated Fellows by 2030 to drive lasting national transformation.',
  },
  mission: {
    eyebrow: 'Mission',
    title: 'What We Do',
    body: "To develop ethical, critical-thinking, and change-driven public sector leaders who strengthen Ghana's institutions and serve the public good.",
  },
  vision: {
    eyebrow: 'Vision',
    title: 'Where We Are Going',
    body: 'A Ghana where public institutions are led by honest, capable, and innovative leaders committed to national development and citizen welfare.',
  },
  partner: {
    eyebrow: 'Ecosystem',
    title: 'Our Partners & Supporters',
    lead:
      'We collaborate with government ministries, international development agencies, and civil society to build public leadership capacity.',
    ctaLabel: 'Partner With Us',
    ctaHref: '/community/partners',
  },
}

function mapCoreValues(raw: unknown): AboutCoreValue[] {
  if (!Array.isArray(raw) || raw.length === 0) return aboutCoreValuesFallback

  return raw
    .map((item: any, idx: number) => {
      const fallback = aboutCoreValuesFallback[idx]
      return {
        num: txt(item?.num, fallback?.num ?? String(idx + 1).padStart(2, '0')),
        title: txt(item?.title, fallback?.title ?? ''),
        meaning: txt(item?.meaning, fallback?.meaning ?? ''),
      }
    })
    .filter((item) => item.title)
}

/**
 * About page content for the live layout (Hero → Story → Mission/Vision → Values → Team → Partners).
 */
export async function getAboutContent(): Promise<AboutContent> {
  const page = await getPage('/about')
  const a = (page?.about ?? {}) as Record<string, any>
  const payload = await tryGetPayload()

  const heroImage =
    (await resolveMediaUrl(a.introImage, payload)) ||
    getMediaUrl(a.introImage) ||
    aboutPageRedesignImages.hero
  const storyImage =
    (await resolveMediaUrl(a.introSecondaryImage, payload)) ||
    getMediaUrl(a.introSecondaryImage) ||
    aboutPageRedesignImages.story

  return {
    intro: {
      eyebrow: txt(a.introEyebrow, defaults.intro.eyebrow),
      title: txt(a.introTitle, defaults.intro.title),
      lead: txt(a.introLead, defaults.intro.lead),
      image: heroImage,
    },
    story: {
      eyebrow: txt(a.storyEyebrow, defaults.story.eyebrow),
      title: txt(a.growthTitle, defaults.story.title),
      body: txt(a.growthBody, defaults.story.body),
      image: storyImage,
    },
    mission: {
      eyebrow: txt(a.mission?.eyebrow, defaults.mission.eyebrow),
      title: txt(a.mission?.title, defaults.mission.title),
      body: txt(a.mission?.body, defaults.mission.body),
    },
    vision: {
      eyebrow: txt(a.vision?.eyebrow, defaults.vision.eyebrow),
      title: txt(a.vision?.title, defaults.vision.title),
      body: txt(a.vision?.body, defaults.vision.body),
    },
    coreValuesSection: {
      eyebrow: txt(a.coreValuesEyebrow, 'Core Values'),
      title: txt(a.coreValuesTitle, 'The principles that guide everything we do.'),
      hint: txt(a.coreValuesHint, 'Click any value to reveal its meaning.'),
    },
    coreValues: mapCoreValues(a.coreValues),
    teamSection: {
      title: txt(a.teamTitle, 'The People Behind EPL Ghana'),
      intro: txt(
        a.teamIntro,
        'Meet the dedicated board members, directors, and coordinators guiding our mission and supporting our Fellows every day.',
      ),
      leadershipLabel: txt(a.teamLeadershipLabel, 'Leadership'),
      staffLabel: txt(a.teamStaffLabel, 'Team'),
    },
    partner: {
      eyebrow: txt(a.partnerEyebrow, defaults.partner.eyebrow),
      title: txt(a.partnerTitle, defaults.partner.title),
      lead: txt(a.partnerLead, defaults.partner.lead),
      ctaLabel: txt(a.partnerCtaLabel, defaults.partner.ctaLabel),
      ctaHref: txt(a.partnerCtaUrl, defaults.partner.ctaHref),
    },
  }
}
