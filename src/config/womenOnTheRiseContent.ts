import { EPL_MEDIA } from '@/config/eplMedia'

/** Figma layout defaults — CMS fields in Projects → wotrDetail override these. */
export const womenOnTheRiseContent = {
  hero: {
    eyebrow: 'Gender Equity & Inclusion',
    title: 'Women on the Rise',
    lead:
      "Dismantling institutional barriers and empowering women leaders across Ghana's Civil Service.",
    description:
      'Launched in 2024 with support from Co-Impact in partnership with the Office of the Head of Civil Service (OHCS), Women on the Rise is a systemic reform initiative.\n\nThrough executive coaching, institutional gender mainstreaming SOPs, and cross-ministerial mentorship networks, Women on the Rise prepares women public servants to lead, influence policy, and occupy decision-making roles.',
    images: [
      `${EPL_MEDIA}/2025/11/LEMA25-2183-1024x682.jpg`,
      `${EPL_MEDIA}/2025/11/LEMA25-0447-1024x628.jpg`,
    ],
    partners: ['Office of the Head of Civil Service (OHCS)', 'Co-Impact'],
    highlights: [
      { value: '80+', label: 'Gender Desk Officers Trained' },
      { value: '7,000+', label: 'Students Reached in Leadership Tours' },
      { value: '1,000+', label: 'Participants in Equity Walks' },
      { value: '23', label: 'Ministries with Mentorship Systems' },
      { value: '13', label: 'Policy Briefs & Studies Published' },
      { value: '150+', label: 'Stakeholders in RiWoCo Conferences' },
    ],
    ctaLabel: 'Partner on Gender Initiatives',
    ctaHref: '/partner-with-us',
    secondaryCtaLabel: '',
    secondaryCtaHref: '/contact',
  },
  aboutEyebrow: 'Institutional Transformation',
  aboutTitle: 'Strengthening Gender Responsiveness in Public Service',
  aboutImage: `${EPL_MEDIA}/2025/11/LEMA25-2212-1000x1000.jpg`,
  whyItMatters: {
    eyebrow: '',
    title: '',
    items: [
      {
        title: 'National Gender Diversity Taskforce',
        description:
          'Inaugurated in October 2024 and chaired by the Head of Civil Service with representation from MoGCSP, MoF, MoH, and MoE to advocate for gender-inclusive civil service policies.',
        icon: 'flaticon-check-mark',
      },
      {
        title: 'Rise Women Conference (RiWoCo)',
        description:
          'Annual strategic convening bringing together civil service heads, civil society, academia, and development partners for gender-inclusive policy dialogue.',
        icon: 'flaticon-love',
      },
      {
        title: 'Youth Leadership & Empowerment Tour',
        description:
          'Supported by Ghana Education Service to reach 7,000+ secondary students, encouraging girls and students with disabilities to champion equity.',
        icon: 'flaticon-fast-forward-double-right-arrows-symbol',
      },
    ],
  },
  impact: {
    title: 'Our Impact in Numbers',
    stats: [
      {
        value: '80+',
        label: 'Gender Desk Officers Trained',
        icon: `${EPL_MEDIA}/2025/11/secretary_12148726-150x150.png`,
      },
      {
        value: '7,000+',
        label: 'Students Reached in Leadership Tours',
        icon: `${EPL_MEDIA}/2025/10/workforce_16864433-150x150.png`,
      },
      {
        value: '1,000+',
        label: 'Participants in Equity Walks',
        icon: `${EPL_MEDIA}/2025/11/competent_15870815.png`,
      },
      {
        value: '23',
        label: 'Ministries with Mentorship Systems',
        icon: `${EPL_MEDIA}/2025/10/financial_14034926-150x150.png`,
      },
      {
        value: '13',
        label: 'Policy Briefs & Studies Published',
        icon: `${EPL_MEDIA}/2025/11/upload_7773505.png`,
      },
      {
        value: '150+',
        label: 'Stakeholders in RiWoCo Conferences',
        icon: `${EPL_MEDIA}/2025/11/stakeholder_12140333.png`,
      },
    ],
  },
  outcomes: {
    title: 'Outcomes',
    items: [] as { title: string; description: string; image?: string }[],
  },
  keySuccess: {
    eyebrow: 'Key Success',
    title: 'Key Institutional Achievements',
    stories: [] as { title: string; paragraphs: string[]; images: [string, string] }[],
  },
  gallery: {
    eyebrow: 'RiwoCo in pictures',
    title: 'Excerpts from the Rise Women Conference',
    items: [] as { src: string; layout: string; alt: string }[],
  },
  relatedArticles: {
    eyebrow: 'From the blog',
    title: 'Related Articles',
    items: [] as { title: string; href: string; image?: string }[],
  },
  getInvolvedCta: {
    eyebrow: 'Join the movement',
    title: 'Help build a gender-responsive public service',
    description:
      'Partner with EPL Ghana and Women On The Rise to advance inclusive leadership, mentorship, and institutional reform across Ghana’s civil service.',
    ctaLabel: 'Get Involved',
    ctaHref: '/get-involved',
    secondaryCtaLabel: 'Read Our Blog',
    secondaryCtaHref: '/blog',
  },
  partnerCta: {
    title: 'Do You Want To Partner With Us?',
    description:
      'Collaborate with EPL Ghana to drive institutional reform and gender equality in public leadership.',
    ctaLabel: 'Contact Us',
    ctaHref: '/contact',
    image: `${EPL_MEDIA}/2025/11/LEMA25-2204-1024x682.jpg`,
  },
}
