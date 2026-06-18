import { eplImpactStats } from '@/config/epl-defaults'
import { EPL_MEDIA, eplHomeImages } from '@/config/eplMedia'

export type FellowshipStep = {
  title: string
  description: string
  image: string
}

const fellowshipMedia = {
  heroPrimary: eplHomeImages.projects['public-service-fellowship'],
  heroSecondary: `${EPL_MEDIA}/2026/02/PSF-CViii-819x1024.jpg`,
  cohort: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
  placement: `${EPL_MEDIA}/2025/10/CSOE-48-1024x683.jpg`,
  training: `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`,
  mentorship: `${EPL_MEDIA}/2025/10/IMG_7245-scaled.jpg`,
  community: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
  graduation: `${EPL_MEDIA}/2023/12/MG_0422-scaled.jpg`,
  application: `${EPL_MEDIA}/2025/10/CSOT-78-1024x683.jpg`,
  partner: `${EPL_MEDIA}/2025/10/WhatsApp-Image-2025-10-27-at-10.19.41-AM-e1761750334208.jpeg`,
} as const

export const publicServiceFellowshipContent = {
  hero: {
    eyebrow: 'Fellowship Programme',
    title: 'Public Service Fellowship',
    description:
      'The Emerging Public Leaders of Ghana (EPL Ghana) Public Service Fellowship is a transformative one-year journey of growth, innovation, and leadership within Ghana’s public service.',
    images: [fellowshipMedia.heroPrimary, fellowshipMedia.heroSecondary],
    badge: {
      value: '12 Months',
      label: 'Work scholarship in public institutions',
    },
    highlights: [
      { value: '12', label: 'Months' },
      { value: '1', label: 'Year Placement' },
      { value: '275+', label: 'Fellows by 2030' },
    ],
    ctaLabel: 'Register Interest',
    ctaHref: '/get-involved#register-interest',
    secondaryCtaLabel: 'Get Involved',
    secondaryCtaHref: '/get-involved',
  },
  impact: {
    eyebrow: 'Our Impact',
    title: 'Building Ghana’s public service, one fellow at a time',
    stats: eplImpactStats.map((stat) => ({
      value: stat.value,
      label: stat.label,
    })),
  },
  whyJoin: {
    eyebrow: 'Why Join',
    title: 'What makes this fellowship different',
    items: [
      {
        title: 'Embedded in Government',
        description:
          'Spend a full year inside ministries, agencies, and commissions, contributing to real policy work, not observing from the sidelines.',
        icon: 'flaticon-love',
      },
      {
        title: 'Structured Development',
        description:
          'Benefit from employability training, mentorship, community projects, and performance reviews designed to accelerate your leadership growth.',
        icon: 'flaticon-check-mark',
      },
      {
        title: 'A Network for Life',
        description:
          'Join a growing community of alumni and peers committed to ethical, effective public service, with pathways that extend well beyond the fellowship year.',
        icon: 'flaticon-linkedin-big-logo',
      },
    ],
  },
  tabs: [
    { id: 'about' as const, label: 'About the Programme', icon: 'flaticon-love' },
    { id: 'process' as const, label: 'Application Process', icon: 'flaticon-fast-forward-double-right-arrows-symbol' },
    { id: 'eligibility' as const, label: 'Eligibility', icon: 'flaticon-check-mark' },
  ],
  programmeStructure: {
    title: 'Programme Structure',
    intro:
      'A thoughtfully crafted 12-month work scholarship aimed at cultivating the next generation of professionals in public service.',
    sidebarImage: fellowshipMedia.cohort,
    steps: [
      {
        title: 'Recruitment',
        description:
          'The recruitment phase is the critical first step where aspiring public service leaders are identified, assessed, and welcomed into the Fellowship.',
        image: fellowshipMedia.heroPrimary,
      },
      {
        title: 'Orientation & Onboarding',
        description:
          'Fellows are introduced to the programme’s values, structure, and expectations, preparing them for their public service journey.',
        image: fellowshipMedia.cohort,
      },
      {
        title: 'Work Placement',
        description:
          'Fellows are assigned to key public institutions to gain hands-on experience in governance and policy work.',
        image: fellowshipMedia.placement,
      },
      {
        title: 'Employability Skills Training',
        description:
          'Deep dive trainings build essential professional and leadership skills for effective public service.',
        image: fellowshipMedia.training,
      },
      {
        title: 'Mentor-Mentee Engagement',
        description:
          'Each Fellow is paired with a mentor who offers guidance, advice, and professional support.',
        image: fellowshipMedia.mentorship,
      },
      {
        title: 'Community Immersion Project',
        description:
          'Fellows undertake a project that addresses community needs and promotes civic responsibility.',
        image: fellowshipMedia.community,
      },
      {
        title: 'Performance Management',
        description:
          'Regular reviews ensure accountability and support Fellows’ growth and development.',
        image: fellowshipMedia.training,
      },
      {
        title: 'Inauguration Ceremony',
        description:
          'The programme concludes with a ceremony celebrating Fellows’ achievements and welcoming them to the Public Service Fellows network.',
        image: fellowshipMedia.graduation,
      },
    ] satisfies FellowshipStep[],
  },
  applicationProcess: {
    eyebrow: 'How to Apply',
    title: 'Application Process',
    intro:
      'A comprehensive, multi-stage selection process designed to identify the most promising young candidates committed to public service.',
    bannerImage: fellowshipMedia.application,
    steps: [
      {
        title: 'Online Application',
        description:
          'Complete the comprehensive application form including essays and professional references.',
        image: fellowshipMedia.heroPrimary,
      },
      {
        title: 'Initial Screening',
        description:
          'Applications reviewed by selection committee based on merit and potential.',
        image: fellowshipMedia.cohort,
      },
      {
        title: 'Assessment Center',
        description:
          'Shortlisted candidates participate in group exercises and individual assessments.',
        image: fellowshipMedia.placement,
      },
      {
        title: 'Final Interview',
        description:
          'Panel interview with senior programme leaders and government partners.',
        image: fellowshipMedia.training,
      },
      {
        title: 'Selection & Onboarding',
        description:
          'Successful candidates receive offers and begin the orientation process.',
        image: fellowshipMedia.graduation,
      },
    ] satisfies FellowshipStep[],
  },
  eligibility: {
    title: 'Eligibility Criteria',
    intro:
      'We seek exceptional young individuals committed to transforming Ghana’s public service.',
    sidebarImage: fellowshipMedia.mentorship,
    criteria: [
      'Ghanaian national with a valid National ID (Ghana Card)',
      'Full-time resident in Ghana',
      'Aged between 22 and 32 years',
      'Possess an undergraduate degree',
      'Must have completed national service and hold a national service certificate',
      'Demonstrate the ability to apply innovation to solutions in a professional working environment',
      'Maintain an active professional presence on LinkedIn, with regular engagement through industry-relevant posts, articles, and profile updates',
      'Committed to pursuing a career in public service and willing to serve for at least three (3) years after completing the Fellowship',
      'Proficient in Microsoft Office (Word, Excel, PowerPoint)',
      'Excellent written and verbal English skills',
      'Demonstrate integrity, service, nationalism, and volunteerism',
      'Ready to produce a police clearance certificate should you progress to the next stage of the selection process',
    ],
    documentsTitle: 'Documents to Upload',
    documents: [
      'Degree certificates',
      'NSS certificate / ID',
      'CV (strictly 2 pages or less)',
      'Copy of Ghana Card',
      'Passport photograph',
    ],
    inclusionNote:
      'Women, persons with disabilities, and Mastercard Scholars are encouraged to apply, we champion inclusion and diversity in every opportunity.',
  },
  applyCta: {
    eyebrow: 'Applications Open',
    title: 'Ready to transform Ghana’s public service from within?',
    description:
      'Register your interest today to be notified about upcoming fellowship applications, information sessions, and key deadlines.',
    ctaLabel: 'Register Interest',
    ctaHref: '/get-involved#register-interest',
    secondaryCtaLabel: 'Meet Current Fellows',
    secondaryCtaHref: '/community/current-fellows',
  },
  partnerCta: {
    title: 'Do You Want To Partner With Us?',
    ctaLabel: 'Contact Us',
    ctaHref: '/contact',
    image: fellowshipMedia.partner,
  },
}

export type FellowshipTabId = (typeof publicServiceFellowshipContent.tabs)[number]['id']
