import { EPL_MEDIA } from '@/config/eplMedia'

/** Local static copies of research PDFs (from /media → /public/publications). */
export const PUBLICATION_FILES = {
  socialInclusion: '/publications/Social-Inclusion-In-Ghana_s-Public-Sector_LMS-yet-to-be-designed-Final.pdf',
  nationalGender: '/publications/National-Gender-Policy-Review-Report_final-artwork-2.pdf',
  youthPerceptions: '/publications/Youth-Perceptions-of-Public-Sector-Careers-in-Ghana.pdf',
  breakingBarriers: '/publications/Breaking-Barriers-Women-Empowerment-LMS.pdf',
} as const

export type AnnualReportItem = {
  id: string
  title: string
  year: string
  description: string
  coverImage: string
  downloadUrl?: string
  externalUrl?: string
  status: 'available' | 'coming-soon'
}

export const annualReportsPageContent = {
  hero: {
    eyebrow: 'Knowledge Products',
    title: 'Annual Reports',
    lead: 'Explore EPL Ghana’s impact reports, programme outcomes, and accountability publications documenting our work strengthening public leadership across Ghana.',
    image: `${EPL_MEDIA}/2025/07/CSG-15-1-scaled.jpg`,
  },
  intro:
    'Transparency and learning are central to our mission. Our annual and impact reports capture fellow placements, programme milestones, partner collaborations, and the leadership outcomes we achieve together.',
  reportsSection: {
    eyebrow: 'Impact Reports',
    title: 'Annual publications',
  },
  relatedSection: {
    eyebrow: 'Related Publications',
    title: 'Research & impact documents',
  },
  reports: [
    {
      id: 'impact-2024',
      title: '2024 Impact Report',
      year: '2024',
      description:
        'A comprehensive overview of fellowship placements, Women On The Rise initiatives, and governance partnerships delivered throughout 2024.',
      coverImage: `${EPL_MEDIA}/2025/07/CSG-15-1-scaled.jpg`,
      status: 'coming-soon' as const,
    },
    {
      id: 'impact-2023',
      title: '2023 Programme Report',
      year: '2023',
      description:
        'Highlights from Public Service Fellowship cohorts, alumni pathways, and institutional partnerships advancing integrity in public service.',
      coverImage: `${EPL_MEDIA}/2023/12/MG_0422-scaled.jpg`,
      status: 'coming-soon' as const,
    },
  ] satisfies AnnualReportItem[],
  relatedPublications: [
    {
      title: 'Social Inclusion in Ghana’s Public Sector',
      description: 'Research on inclusion, representation, and equitable public service delivery.',
      downloadUrl: PUBLICATION_FILES.socialInclusion,
    },
    {
      title: 'National Gender Policy Review Report',
      description: 'Analysis supporting gender-responsive governance reforms across institutions.',
      downloadUrl: PUBLICATION_FILES.nationalGender,
    },
    {
      title: 'Youth Perceptions of Public Sector Careers in Ghana',
      description: 'Insights on how young Ghanaians view careers in government and public leadership.',
      downloadUrl: PUBLICATION_FILES.youthPerceptions,
    },
    {
      title: 'Breaking Barriers — Women Empowerment',
      description: 'Research and recommendations on advancing women into higher leadership roles.',
      downloadUrl: PUBLICATION_FILES.breakingBarriers,
    },
  ],
  cta: {
    title: 'Request a printed copy or partnership briefing',
    body: 'Contact our team for printed annual reports, programme briefings, or tailored impact summaries for your organisation.',
    ctaLabel: 'Contact Us',
    ctaHref: '/contact',
  },
}
