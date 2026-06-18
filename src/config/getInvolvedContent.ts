import { EPL_MEDIA } from '@/config/eplMedia'

export const getInvolvedPageContent = {
  hero: {
    eyebrow: 'Get Involved',
    badge: '2026 Fellowship · Applications Open',
    image: `${EPL_MEDIA}/2025/10/CSOT-78-scaled.jpg`,
    secondaryImage: `${EPL_MEDIA}/2026/02/PSF-CViii-819x1024.jpg`,
    imageBadge: {
      value: '2026',
      label: 'Fellowship cohort',
    },
    highlights: [
      { value: '12 months', label: 'Embedded in ministries & agencies' },
      { value: 'Training', label: 'Leadership & professional development' },
      { value: 'Network', label: 'Alumni community across Africa' },
    ],
    secondaryCta: {
      label: 'About the Fellowship',
      href: '/projects/public-service-fellowship',
    },
  },
  pathways: [
    {
      id: 'fellowship',
      title: 'Join our Fellowship',
      body: 'Our Public Service Fellowship equips the next generation of ethical, innovative leaders with the skills and networks to drive lasting change in Ghana’s public institutions.',
      bullets: [
        'Rigorous leadership and professional development training',
        'Serve in critical roles within Ghana’s public service institutions',
        'Join a network of changemakers across Africa',
        'Gain mentorship from experienced governance professionals',
      ],
      ctaLabel: 'Register Interest',
      ctaHref: '#register-interest',
    },
    {
      id: 'internship',
      title: 'Internship & Volunteering',
      body: 'Contribute your skills and build experience supporting governance, youth development, and public service excellence at EPL Ghana.',
      bullets: [
        'Work alongside experienced professionals on impactful projects',
        'Gain hands-on experience in public sector innovation',
        'Support events, research, and communications',
        'Ideal for students, graduates, and professionals giving back',
      ],
      ctaLabel: 'Contact Us',
      ctaHref: '/contact#general-enquiry',
    },
    {
      id: 'partnership',
      title: 'Partnership & Support',
      body: 'Collaborate with us to strengthen Ghana’s public institutions through funding, mentorship, placements, and strategic partnerships.',
      bullets: [
        'Government institutions and development partners',
        'Private sector and corporate social responsibility',
        'Civil society, media, and academic institutions',
        'Championing governance, youth leadership, and impact',
      ],
      ctaLabel: 'Partner With Us',
      ctaHref: '/contact#partnership',
    },
  ],
  registerInterest: {
    eyebrow: 'Register Interest',
    title: 'Public Service Fellowship',
    description:
      'Complete the form below to be notified about upcoming fellowship applications, events, and opportunities.',
    submitLabel: 'Submit Interest',
  },
}
