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
    eyebrow: 'Flagship Programme',
    title: 'The Emerging Public Leaders Fellowship',
    description:
      "A thoughtfully crafted 12-month work scholarship cultivating Ghana's next generation of ethical, sector-strengthening public sector leaders.",
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
    ctaLabel: 'Apply for Fellowship',
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
    { id: 'structure' as const, label: 'Programme Structure', icon: 'flaticon-love' },
    { id: 'eligibility' as const, label: 'Eligibility Criteria', icon: 'flaticon-check-mark' },
    {
      id: 'process' as const,
      label: 'Application Process',
      icon: 'flaticon-fast-forward-double-right-arrows-symbol',
    },
  ],
  programmeStructure: {
    sidebarEyebrow: 'Programme Structure',
    title: 'Flagship Programme Structure',
    intro:
      'Our comprehensive model equips Fellows with hands-on institutional experience, executive mentorship, and accredited leadership training.',
    sidebarImage: fellowshipMedia.cohort,
    steps: [
      {
        title: 'Recruitment & Screening',
        description:
          'Identify, assess, and welcome aspiring public service leaders committed to transforming Ghana’s public sector.',
        image: fellowshipMedia.heroPrimary,
      },
      {
        title: 'Orientation & Onboarding',
        description:
          'Foundational grounding in public service values, civil service structure, ethics, and professional expectations.',
        image: fellowshipMedia.cohort,
      },
      {
        title: '12-Month Work Placement',
        description:
          'Hands-on experience assigned to key government ministries, departments, and metropolitan assemblies.',
        image: fellowshipMedia.placement,
      },
      {
        title: 'Employability & Leadership Training',
        description:
          'Deep-dive workshops building policy analysis, project management, and critical governance skills.',
        image: fellowshipMedia.training,
      },
      {
        title: 'Mentor-Mentee Engagement',
        description:
          'Paired 1-on-1 with senior civil servants and executive leaders for continuous career guidance.',
        image: fellowshipMedia.mentorship,
      },
      {
        title: 'Community Immersion Project',
        description:
          'Applied civic project addressing real community needs and promoting local social accountability.',
        image: fellowshipMedia.community,
      },
      {
        title: 'Performance Management',
        description:
          'Regular quarterly reviews ensuring accountability, professional growth, and institutional alignment.',
        image: fellowshipMedia.training,
      },
      {
        title: 'Inauguration Ceremony',
        description:
          'Graduation celebrating Fellows’ accomplishments and ushering them into the permanent Public Service Network.',
        image: fellowshipMedia.graduation,
      },
    ] satisfies FellowshipStep[],
  },
  applicationProcess: {
    eyebrow: 'Selection Pipeline',
    title: 'How Selection Works',
    intro:
      'A comprehensive, multi-stage selection process designed to identify the most promising young candidates committed to public service.',
    bannerImage: fellowshipMedia.application,
    steps: [
      {
        title: 'Online Application Form',
        description:
          'Submit essay responses, academic transcripts, NSS verification, and professional references.',
        image: fellowshipMedia.heroPrimary,
      },
      {
        title: 'Initial Merit Screening',
        description:
          'Independent selection committee evaluates applications based on academic record, leadership potential, and public service interest.',
        image: fellowshipMedia.cohort,
      },
      {
        title: 'Assessment Center',
        description:
          'Shortlisted candidates participate in collaborative group exercises, policy case studies, and aptitude evaluations.',
        image: fellowshipMedia.placement,
      },
      {
        title: 'Final Panel Interviews',
        description:
          'Selected finalists complete structured interviews with civil service leaders and EPL Ghana panel members.',
        image: fellowshipMedia.training,
      },
      {
        title: 'Placement & Onboarding',
        description:
          'Successful candidates are matched with host ministries, departments, and agencies and begin orientation.',
        image: fellowshipMedia.graduation,
      },
    ] satisfies FellowshipStep[],
  },
  eligibility: {
    eyebrow: 'Who Can Apply',
    title: 'Eligibility Criteria',
    intro:
      'We seek exceptional young individuals committed to transforming Ghana’s public service.',
    sidebarImage: fellowshipMedia.mentorship,
    criteria: [
      'Ghanaian National with a valid National ID (Ghana Card).',
      'Must be a full-time resident in Ghana.',
      'Aged between 22 – 32 years.',
      'Possess a recognized Undergraduate Degree.',
      'Completed National Service with a valid NSS Certificate.',
      'Demonstrate innovation, problem-solving, and professional integrity.',
      'Maintain an active professional presence on LinkedIn.',
      'Committed to pursuing a career in public service (minimum 3 years).',
      'Proficient in Microsoft Office (Word, Excel, PowerPoint).',
      'Excellent written and verbal English skills.',
    ],
    documentsTitle: 'Required Documents',
    documentsIntro:
      'Ensure you have scanned digital copies of the following documents ready prior to initiating your online application:',
    documents: [
      'Undergraduate Degree Certificate',
      'National Service Scheme (NSS) Certificate / ID',
      'Curriculum Vitae (Strictly 2 pages or less)',
      'Copy of Ghana Card',
      'Passport-sized Photograph',
    ],
    documentsCtaLabel: 'Start Application',
    inclusionNote:
      'Women, persons with disabilities, and Mastercard Scholars are encouraged to apply, we champion inclusion and diversity in every opportunity.',
  },
  applyCta: {
    eyebrow: 'Join the Cohort',
    title: 'Ready to Lead in Public Service?',
    description:
      'Applications for our next cohort of Emerging Public Leaders Fellows open annually. Register your interest to receive updates and application guides.',
    ctaLabel: 'Apply for Fellowship',
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
