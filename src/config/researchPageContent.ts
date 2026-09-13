import { eplHomeImages } from '@/config/eplMedia'
import { PUBLICATION_FILES } from '@/config/annualReportsContent'

export const RESEARCH_CATEGORIES = [
  {
    slug: 'articles',
    label: 'Articles',
    eyebrow: 'Articles',
    title: 'Articles',
    description:
      'Perspectives and commentary from EPL Ghana on leadership, public service, and institutional reform.',
  },
  {
    slug: 'factsheets',
    label: 'Factsheets',
    eyebrow: 'Factsheets',
    title: 'Factsheets',
    description:
      'Concise briefs that summarise programme outcomes, fellow placements, and key evidence for partners.',
  },
  {
    slug: 'studies',
    label: 'Studies',
    eyebrow: 'Studies',
    title: 'Research Studies',
    description:
      'Applied research on inclusion, gender, youth pathways, and public-sector careers in Ghana.',
  },
  {
    slug: 'technical-policy-briefs',
    label: 'Technical and Policy Briefs',
    eyebrow: 'Policy Briefs',
    title: 'Technical and Policy Briefs',
    description:
      'Actionable policy notes and technical briefs for ministries, assemblies, and development partners.',
  },
] as const

export type ResearchCategorySlug = (typeof RESEARCH_CATEGORIES)[number]['slug']

export type ResearchItem = {
  slug: string
  category: ResearchCategorySlug
  tag: string
  title: string
  source: string
  summary: string
  body: string
  image: string
  downloadUrl?: string
  year?: string
}

export const researchPageContent = {
  hub: {
    eyebrow: 'Knowledge Products',
    title: 'Research and Publications',
    lead:
      'Explore articles, factsheets, studies, and policy briefs produced by EPL Ghana and our partners.',
    image: eplHomeImages.heroHome,
  },
  items: [
    {
      slug: 'ethical-leadership-civil-service',
      category: 'articles',
      tag: 'Article',
      title: 'Ethical Leadership in Ghana’s Civil Service',
      source: 'EPL Ghana',
      summary:
        'Why early-career placements and mentorship strengthen integrity and performance in public institutions.',
      body: 'EPL Ghana’s fellowship model places talented young professionals inside government to learn by doing. This article reflects on how ethical leadership takes root when fellows are paired with supervisors, held to clear standards, and supported by a peer network that reinforces accountability. Drawing on programme experience across ministries and assemblies, it outlines practical habits that help new public servants navigate institutions while staying true to the public interest.',
      image: eplHomeImages.gallery[0].src,
      year: '2026',
    },
    {
      slug: 'from-fellowship-to-lifelong-service',
      category: 'articles',
      tag: 'Article',
      title: 'From Fellowship to Lifelong Service',
      source: 'EPL Ghana',
      summary:
        'How alumni networks turn a 12-month fellowship into durable public-sector leadership.',
      body: 'Graduation is a beginning, not an end. This piece explores how EPLAN — the Emerging Public Leaders Alumni Network — keeps fellows connected across cohorts, ministries, and regions. It highlights mentoring, knowledge sharing, and collaborative problem-solving as the mechanisms that convert individual placements into a lasting community of reformers.',
      image: eplHomeImages.gallery[5].src,
      year: '2025',
    },
    {
      slug: 'fellowship-at-a-glance',
      category: 'factsheets',
      tag: 'Factsheet',
      title: 'Public Service Fellowship at a Glance',
      source: 'EPL Ghana',
      summary:
        'A one-page overview of the fellowship model, placements, and leadership outcomes.',
      body: 'This factsheet summarises EPL Ghana’s flagship Public Service Fellowship: a 12-month programme combining institutional placement, training, and mentorship. It presents headline figures on cohorts, host institutions, and retention, and points partners to opportunities for sponsorship and collaboration.',
      image: eplHomeImages.gallery[3].src,
      year: '2026',
    },
    {
      slug: 'women-on-the-rise-snapshot',
      category: 'factsheets',
      tag: 'Factsheet',
      title: 'Women on the Rise — Programme Snapshot',
      source: 'EPL Ghana',
      summary:
        'Key facts on leadership pathways for women in Ghana’s public service.',
      body: 'Women on the Rise strengthens the pipeline of women leaders in public institutions through coaching, networks, and targeted support. This snapshot outlines programme pillars, partner roles, and the outcomes we track with host agencies.',
      image: eplHomeImages.projects['women-on-the-rise'],
      year: '2025',
    },
    {
      slug: 'social-inclusion-public-sector',
      category: 'studies',
      tag: 'Research',
      title: "Social Inclusion in Ghana's Public Sector",
      source: 'EPL Ghana',
      summary:
        'Research on inclusion, representation, and equitable public service delivery.',
      body: 'This study examines how Ghana’s public sector can become more inclusive and representative. It reviews barriers to equitable service delivery, highlights promising institutional practices, and recommends actions for ministries and local assemblies seeking to widen opportunity while improving outcomes for citizens.',
      image: eplHomeImages.aboutBlock,
      downloadUrl: PUBLICATION_FILES.socialInclusion,
      year: '2025',
    },
    {
      slug: 'national-gender-policy-review',
      category: 'studies',
      tag: 'Research',
      title: 'National Gender Policy Review Report',
      source: 'EPL Ghana',
      summary:
        'Analysis supporting gender-responsive governance reforms across institutions.',
      body: 'Commissioned to inform gender-responsive governance, this report reviews national policy frameworks and institutional practice. It identifies gaps in implementation, elevates lessons from host institutions, and proposes reforms that advance women’s leadership and equitable public service.',
      image: eplHomeImages.fellows.miriam,
      downloadUrl: PUBLICATION_FILES.nationalGender,
      year: '2025',
    },
    {
      slug: 'youth-perceptions-public-sector-careers',
      category: 'studies',
      tag: 'Research',
      title: 'Youth Perceptions of Public Sector Careers in Ghana',
      source: 'EPL Ghana',
      summary:
        'Insights on how young Ghanaians view careers in government and public leadership.',
      body: 'Young people are essential to the future of Ghana’s civil service. This study captures how youth perceive public-sector careers — including motivation, barriers, and aspirations — and what institutions can do to attract and retain ethical, capable talent.',
      image: eplHomeImages.fellows.priscilla,
      downloadUrl: PUBLICATION_FILES.youthPerceptions,
      year: '2025',
    },
    {
      slug: 'breaking-barriers-women-empowerment',
      category: 'studies',
      tag: 'Research',
      title: 'Breaking Barriers — Women Empowerment',
      source: 'EPL Ghana',
      summary:
        'Research and recommendations on advancing women into higher leadership roles.',
      body: 'Breaking Barriers documents structural and cultural obstacles that limit women’s progression into senior public roles. It combines programme learning with practical recommendations for mentorship, sponsorship, and institutional policy change.',
      image: eplHomeImages.gallery[6].src,
      downloadUrl: PUBLICATION_FILES.breakingBarriers,
      year: '2024',
    },
    {
      slug: 'local-government-service-delivery',
      category: 'technical-policy-briefs',
      tag: 'Policy Brief',
      title: 'Local Government & Public Service Delivery',
      source: 'EPL Policy Fellows Working Group',
      summary:
        'A brief for municipal assemblies on citizen engagement and service performance.',
      body: 'This technical brief offers assemblies a practical frame for improving service delivery: clearer accountability lines, citizen feedback loops, and prioritisation of high-impact operational fixes. It is written for practitioners who need concise, actionable guidance.',
      image: eplHomeImages.gallery[5].src,
      year: '2024',
    },
    {
      slug: 'integrity-systems-for-host-institutions',
      category: 'technical-policy-briefs',
      tag: 'Policy Brief',
      title: 'Integrity Systems for Host Institutions',
      source: 'EPL Ghana',
      summary:
        'Guidance for ministries hosting fellows on supervision, ethics, and learning.',
      body: 'Host institutions shape the fellowship experience. This brief outlines integrity and supervision practices that help fellows contribute meaningfully while learning institutional craft — from onboarding and task design to feedback and ethical decision-making.',
      image: eplHomeImages.gallery[1].src,
      year: '2026',
    },
  ] satisfies ResearchItem[],
}

export function isResearchCategorySlug(value: string): value is ResearchCategorySlug {
  return RESEARCH_CATEGORIES.some((category) => category.slug === value)
}

export function getResearchCategory(slug: string) {
  return RESEARCH_CATEGORIES.find((category) => category.slug === slug) ?? null
}

export function getResearchItemsByCategory(category: ResearchCategorySlug): ResearchItem[] {
  return researchPageContent.items.filter((item) => item.category === category)
}

export function getResearchItem(category: string, slug: string): ResearchItem | null {
  if (!isResearchCategorySlug(category)) return null
  return (
    researchPageContent.items.find(
      (item) => item.category === category && item.slug === slug,
    ) ?? null
  )
}
