import { EPL_MEDIA } from '@/config/eplMedia'

/** Live Women on the Rise defaults — CMS fields in Projects → wotrDetail override these. */
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
    ctaLabel: 'Partner on Gender Initiatives',
    ctaHref: '/partner-with-us',
  },
  aboutEyebrow: 'Institutional Transformation',
  aboutTitle: 'Strengthening Gender Responsiveness in Public Service',
  aboutImage: `${EPL_MEDIA}/2025/11/LEMA25-2212-1000x1000.jpg`,
  whyItMatters: {
    items: [
      {
        title: 'National Gender Diversity Taskforce',
        description:
          'Inaugurated in October 2024 and chaired by the Head of Civil Service with representation from MoGCSP, MoF, MoH, and MoE to advocate for gender-inclusive civil service policies.',
      },
      {
        title: 'Rise Women Conference (RiWoCo)',
        description:
          'Annual strategic convening bringing together civil service heads, civil society, academia, and development partners for gender-inclusive policy dialogue.',
      },
      {
        title: 'Youth Leadership & Empowerment Tour',
        description:
          'Supported by Ghana Education Service to reach 7,000+ secondary students, encouraging girls and students with disabilities to champion equity.',
      },
    ],
  },
  impact: {
    stats: [
      { value: '80+', label: 'Gender Desk Officers Trained' },
      { value: '7,000+', label: 'Students Reached in Leadership Tours' },
      { value: '1,000+', label: 'Participants in Equity Walks' },
      { value: '23', label: 'Ministries with Mentorship Systems' },
      { value: '13', label: 'Policy Briefs & Studies Published' },
      { value: '150+', label: 'Stakeholders in RiWoCo Conferences' },
    ],
  },
}
