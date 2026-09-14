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

export type PartnerBenefit = {
  eyebrow: string
  title: string
  text: string
}

export type PartnerCategory = {
  id: string
  title: string
  description: string
  highlights: string[]
  image: string
}

export const partnersPageContent = {
  hero: {
    eyebrow: 'Partner With EPL Ghana',
    title: 'Partner With EPL Ghana',
    lead:
      "Together, we can strengthen the people and institutions shaping Ghana's public service.",
    ctaLabel: 'Start a Conversation',
    ctaHref: '#enquiry',
    image: `${EPL_MEDIA}/2025/11/LEMA25-0486-1024x682.jpg`,
  },
  collaboration: {
    eyebrow: 'Strategic Collaboration',
    title: "Invest in the Architects of Ghana's Public Sector",
    lead:
      'Public institutions only transform when the people inside them possess the tools, ethics, and vision to lead. Partnering with EPL directly places top-tier Ghanaian talent at the forefront of policy reform, digital innovation, and civic governance.',
    benefits: [
      {
        eyebrow: 'Direct Pipeline',
        title: 'Access 500+ Reformers',
        text: 'Engage vetted, high-performing public servants across 15+ ministries and regional assemblies.',
      },
      {
        eyebrow: 'Systemic Growth',
        title: 'Institutional Impact',
        text: 'Co-create actionable solutions that streamline service delivery and public accountability.',
      },
      {
        eyebrow: 'Co-Design',
        title: 'Sector-Specific Curricula',
        text: 'Tailor specialized training tracks that tackle exact bottlenecks in your domain.',
      },
      {
        eyebrow: 'Visibility',
        title: 'National Leadership Reach',
        text: 'Position your brand at high-level civil service convenings, policy roundtables, and annual summits.',
      },
    ] satisfies PartnerBenefit[],
    highlightValue: '85%',
    highlightTitle: 'Career Advancement',
    highlightText:
      'Fellows transition directly into permanent leadership and technical advisory roles in public service.',
    image: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
  },
  ecosystem: {
    eyebrow: 'Partnership Ecosystem',
    title: 'Who Can Partner With Us',
    intro: 'Click any category to explore tailored ways we can work together.',
    learnMoreLabel: 'Learn More',
    highlightsLabel: 'Key Collaboration Areas',
    categories: [
      {
        id: '01',
        title: 'Government & Public Institutions',
        description:
          'Place top-tier Fellows within key ministries, departments, and regional assemblies to accelerate policy implementation, digital transformation, and service delivery.',
        highlights: ['Civil Service Placements', 'Leadership Development', 'Policy Co-Creation'],
        image: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
      },
      {
        id: '02',
        title: 'Development Partners',
        description:
          'Co-fund and scale high-impact governance initiatives targeting gender responsiveness, peace building, climate resilience, and public sector efficiency.',
        highlights: ['Multi-Year Grants', 'Targeted Fellowships', 'Impact Measurement'],
        image: `${EPL_MEDIA}/2025/07/CSG-32-scaled.jpg`,
      },
      {
        id: '03',
        title: 'Private Sector',
        description:
          'Support capacity building and public-private dialogue to foster a business-enabling regulatory environment and sustainable economic growth.',
        highlights: ['Executive Mentorship', 'Private-Public Dialogue', 'Corporate Social Impact'],
        image: `${EPL_MEDIA}/2025/10/IMG_7245-scaled.jpg`,
      },
      {
        id: '04',
        title: 'Foundations & Philanthropies',
        description:
          'Invest in strategic endowment, leadership awards, and specialized fellowship tracks empowering young ethical leaders across Ghana.',
        highlights: ['Leadership Awards', 'Specialized Tracks', 'Alumni Network Support'],
        image: `${EPL_MEDIA}/2025/10/CSG-1-scaled.jpg`,
      },
      {
        id: '05',
        title: 'Civil Society & Media',
        description:
          'Amplify civic awareness, promote public accountability, and collaborate on evidence-based research and advocacy campaigns.',
        highlights: ['Civic Engagement', 'Research Dissemination', 'Media Collaborations'],
        image: `${EPL_MEDIA}/2025/10/CSOE-56-scaled.jpg`,
      },
      {
        id: '06',
        title: 'Academic & Research Institutions',
        description:
          'Partner on research, case study development, and curriculum design to equip Fellows with cutting-edge analytical tools.',
        highlights: ['Curriculum Co-Design', 'Policy Case Studies', 'Joint Publications'],
        image: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
      },
    ] satisfies PartnerCategory[],
  },
  network: {
    title: 'Our Partners & Supporters',
    intro: 'The organisations who make the EPL Ghana mission possible.',
  },
  partners: {
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
  form: {
    eyebrow: 'Get In Touch',
    title: "Let's Work Together",
    description: 'Complete the form and our partnerships team will be in touch.',
    submitLabel: 'Send Enquiry',
  },
}
