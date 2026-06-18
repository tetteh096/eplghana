import { EPL_MEDIA } from '@/config/eplMedia'

export type PartnerEntry = {
  id: string
  name: string
  description?: string
  logo?: string
  href?: string
  programmes?: string[]
  shortName?: string
}

export const partnersPageContent = {
  hero: {
    eyebrow: 'Community',
    lead:
      'EPL Ghana’s work is made possible through strategic partnerships with funders, government institutions, and collaborators who share our commitment to ethical, effective public service.',
    image: `${EPL_MEDIA}/2025/11/LEMA25-0486-1024x682.jpg`,
    secondaryImage: `${EPL_MEDIA}/2025/10/IMG_7245-scaled.jpg`,
    stats: [
      { value: '4', label: 'Strategic funders & collaborators' },
      { value: '12+', label: 'Government host institutions' },
      { value: '3', label: 'Flagship fellowship programmes' },
    ],
  },
  partners: {
    eyebrow: 'Strategic Partners',
    title: 'Partners',
    intro:
      'Funders and collaborators who invest in fellowship programmes, gender equity, and peacebuilding across Ghana’s public sector.',
    items: [
      {
        id: 'mastercard-foundation',
        name: 'Mastercard Foundation',
        description:
          'Flagship partner for the Public Service Fellowship, supporting youth leadership and ethical public service across Ghana.',
        logo: `${EPL_MEDIA}/2025/10/mastercard-foundation.png`,
        href: 'https://mastercardfdn.org',
        programmes: ['Public Service Fellowship'],
      },
      {
        id: 'co-impact',
        name: 'Co-Impact',
        description:
          'Funding partner for Women On The Rise and the Rise Women Conference (RiwoCo), advancing gender equity in the civil service.',
        logo: `${EPL_MEDIA}/2025/10/co-impact.png`,
        href: 'https://co-impact.org',
        programmes: ['Women On The Rise'],
      },
      {
        id: 'us-embassy',
        name: 'U.S. Embassy in Ghana',
        shortName: 'U.S.',
        description:
          'Funder of the P.E.A.C.E Fellowship programme, building peace and security leadership in northern Ghana.',
        programmes: ['P.E.A.C.E'],
      },
      {
        id: 'fsda',
        name: 'Foundation for Security and Development in Africa',
        shortName: 'FSD Africa',
        description:
          'Supporting partner for peace, security, and development leadership programming across the region.',
        programmes: ['P.E.A.C.E'],
      },
    ] satisfies PartnerEntry[],
  },
  partnerOrganizations: {
    eyebrow: 'Host Institutions',
    title: 'Partner Organizations',
    intro:
      'Government ministries, agencies, and commissions where EPL fellows serve and where we deliver capacity-building and gender-responsive reforms.',
    items: [
      {
        id: 'ohcs',
        name: 'Office of the Head of Civil Service (OHCS)',
        description:
          'Lead government partner for Women On The Rise and gender mainstreaming reforms.',
        logo: `${EPL_MEDIA}/2025/10/ohcs.png`,
      },
      {
        id: 'psc',
        name: 'Public Service Commission',
        description:
          'Supporting merit-based recruitment and professional standards across the civil service.',
      },
      {
        id: 'mof',
        name: 'Ministry of Finance',
        description:
          'Host institution for fellows contributing to fiscal policy and public financial management.',
      },
      {
        id: 'moh',
        name: 'Ministry of Health',
        description:
          'Partner ministry for fellows driving health policy and service delivery improvements.',
      },
      {
        id: 'moe',
        name: 'Ministry of Energy',
        description:
          'Host institution for fellows working on energy policy and sustainable development.',
      },
      {
        id: 'ncce',
        name: 'National Commission for Civic Education (NCCE)',
        description:
          'A leading host institution for Public Service Fellows advancing civic engagement.',
      },
      {
        id: 'ges',
        name: 'Ghana Education Service (GES)',
        description: 'Partner for STEM education and youth leadership outreach programmes.',
      },
      {
        id: 'ndpc',
        name: 'National Development Planning Commission (NDPC)',
        description: 'Collaborator on national development planning and policy research.',
      },
      {
        id: 'chraj',
        name: 'Commission on Human Rights and Administrative Justice (CHRAJ)',
        description:
          'Host institution for fellows advancing accountability and citizen rights.',
      },
      {
        id: 'gcx',
        name: 'Ghana Commodity Exchange (GCX)',
        description:
          'Partner organization supporting fellows in agricultural markets and trade policy.',
      },
      {
        id: 'nita',
        name: 'National Information Technology Agency (NITA)',
        description:
          'Digital governance partner for fellows in technology and public sector innovation.',
      },
      {
        id: 'lands-commission',
        name: 'Lands Commission',
        description: 'Host institution for fellows contributing to land administration and policy.',
      },
    ] satisfies PartnerEntry[],
  },
  cta: {
    title: 'Interested in partnering with EPL Ghana?',
    description:
      'Whether you represent a development partner, government agency, or organisation committed to public service excellence, we would love to hear from you.',
    ctaLabel: 'Contact Us',
    ctaHref: '/contact#partnership',
  },
}
