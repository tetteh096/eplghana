import { EPL_MEDIA, eplHomeImages } from '@/config/eplMedia'

export const impactPageContent = {
  hero: {
    eyebrow: 'Our Impact',
    title: 'Our Impact',
    description:
      'See how leadership development contributes to stronger people, stronger institutions and meaningful public service.',
    image: `${EPL_MEDIA}/2025/10/CSOE-32-1-scaled.jpg`,
  },
  glance: {
    eyebrow: 'Impact at a Glance',
    title: '',
    stats: [
      {
        value: '500+',
        title: 'Fellows Developed',
        desc: 'Young public servants trained and placed in institutions across Ghana',
      },
      {
        value: '12+',
        title: 'Public Institutions',
        desc: 'Government ministries, agencies and metropolitan assemblies engaged',
      },
      {
        value: '8',
        title: 'Cohorts Completed',
        desc: 'Successive cycles of leadership development since inception',
      },
      {
        value: '85%',
        title: 'Career Advancement',
        desc: 'Fellows who report meaningful career growth post-fellowship',
      },
    ],
  },
  successStories: {
    eyebrow: 'Success Stories',
    title: 'Real People. Real Impact.',
    items: [
      {
        name: 'Abena Osei-Bonsu',
        role: 'Ministry of Finance',
        cohort: 'Cohort 8',
        image: `${EPL_MEDIA}/2025/10/CSRAW56-scaled-e1760539041848.jpg`,
        desc: 'Abena brings rigorous analytical skills to fiscal policy reform, committed to building transparent financial systems for Ghana’s future.',
      },
      {
        name: 'Kwame Asante',
        role: 'Ghana Health Service',
        cohort: 'Cohort 7',
        image: `${EPL_MEDIA}/2025/10/CSP96-scaled-e1760539888346.jpeg`,
        desc: 'Kwame works at the intersection of public health and community engagement, driving health equity across the Ashanti Region.',
      },
      {
        name: 'Efua Mensah',
        role: 'Accra Metropolitan Assembly',
        cohort: 'Cohort 8',
        image: `${EPL_MEDIA}/2025/10/CSP64-scaled-e1760540014318.jpeg`,
        desc: 'Efua leads inclusive urban planning processes that put communities at the centre of Greater Accra’s development.',
      },
    ],
  },
  communityStories: {
    eyebrow: 'Grassroots Stories',
    title: 'Community Stories & Interventions',
    intro:
      'Highlights from municipal assemblies where Fellows turned national public policies into localized community impact.',
    ctaLabel: 'See More Communities',
    ctaUrl: '/community',
    items: [
      {
        num: '01',
        region: 'Greater Accra Region',
        assembly: 'Kpone Katamanso',
        title: 'Water Sanitation & Waste Audits',
        desc: 'Audited local drain networks and eliminated unauthorized dumpsites with assembly heads.',
        image: `${EPL_MEDIA}/2025/10/20240830135443__MG_7840-1024x683.jpg`,
      },
      {
        num: '02',
        region: 'Ashanti Region',
        assembly: 'Asokore Mampong',
        title: 'Primary Health Clinic Logistics',
        desc: 'Modernized patient registration workflows to cut health record wait times by 40%.',
        image: `${EPL_MEDIA}/2025/10/Meeting-with-Deputy-Regional-Commander-2-1024x768.jpeg`,
      },
      {
        num: '03',
        region: 'Northern Region',
        assembly: 'Tamale Metropolis',
        title: 'Smallholder Farmer Market Access',
        desc: 'Connected 1,200+ grain and shea producers with extension officers and trade desks.',
        image: `${EPL_MEDIA}/2025/10/CSOE-32-1-scaled.jpg`,
      },
      {
        num: '04',
        region: 'Central Region',
        assembly: 'Cape Coast',
        title: 'Basic Education Literacy Tracking',
        desc: 'Instituted classroom resource distribution tracking across 18 public primary schools.',
        image: `${EPL_MEDIA}/2025/07/CSG-2-scaled.jpg`,
      },
    ],
  },
  testimonials: {
    eyebrow: 'Institutional Voices',
    title: 'What Our Partners & Mentors Say',
    intro:
      'Perspectives from the supervisors, leadership mentors, and public institutions collaborating with EPL Fellows.',
    items: [
      {
        category: 'Supervisors' as const,
        quote:
          'The EPL Fellows assigned to our directorate brought a level of technical rigor and proactivity that dramatically expedited our quarterly fiscal policy reviews.',
        author: 'Dr. K. Boateng',
        role: 'Director of Budget & Economic Planning',
        org: 'Ministry of Finance',
      },
      {
        category: 'Mentors' as const,
        quote:
          'Mentoring these emerging public servants has been inspiring. They are grounded in ethics, committed to institutional reform, and eager to serve the public good.',
        author: 'Prof. Naa Adjei-Mensah',
        role: 'Senior Governance Advisor & Fellow Mentor',
        org: 'Civil Service Training Institute',
      },
      {
        category: 'Partnered Institutions' as const,
        quote:
          'Partnering with EPL has enabled our assembly to build sustainable local health data systems. The calibre of talent and commitment is second to none.',
        author: 'Hon. Alfred Tagoe',
        role: 'Municipal Chief Executive',
        org: 'Accra Metropolitan Assembly',
      },
      {
        category: 'Supervisors' as const,
        quote:
          'EPL Fellows demonstrate exemplary work ethic and public integrity. They consistently go beyond routine duties to solve complex administrative bottlenecks.',
        author: 'Eunice Sarpong',
        role: 'Head of Human Resource Development',
        org: 'Ghana Health Service',
      },
      {
        category: 'Partnered Institutions' as const,
        quote:
          'Our institutional collaboration with EPL continues to yield measurable results in environmental governance and community sensitization across coastal regions.',
        author: 'Dr. Mensah Osei',
        role: 'Country Programme Director',
        org: 'UNDP Ghana',
      },
      {
        category: 'Mentors' as const,
        quote:
          'Guiding young leaders through real-world civil service challenges has shown me that Ghana’s public sector future is in capable, principled hands.',
        author: 'Kwesi Appiah-Danquah',
        role: 'Executive Coach & Public Policy Mentor',
        org: 'EPL Mentorship Network',
      },
    ],
  },
  publications: {
    eyebrow: 'Reports & Publications',
    title: 'Knowledge, Accountability & Research',
    intro:
      'Access our official governance reports, policy whitepapers, and applied research on public sector leadership in Ghana.',
    reportsHeading: 'Annual Accountability Reports',
    reportsCtaLabel: 'Download PDF',
    reportsCtaUrl: '/knowledge-products/annual-reports',
    reports: [
      {
        edition: '2025 Edition',
        title: '2025 Annual Impact Report',
        summary: 'Scaling Public Sector Transformation Across 12 Institutions',
      },
      {
        edition: '2024 Edition',
        title: '2024 Annual Impact Report',
        summary: 'Gender Inclusion & Leadership Development Milestones',
      },
      {
        edition: '2023 Edition',
        title: '2023 Annual Impact Report',
        summary: 'Cohort Expansion & Decentralized Assembly Placements',
      },
      {
        edition: '2022 Edition',
        title: '2022 Annual Impact Report',
        summary: 'Foundational Outcomes & Fellow Career Retention',
      },
    ],
    researchHeading: 'Research Studies & Policy Briefs',
    researchCtaLabel: 'Read Publication',
    researchCtaUrl: '/news#research',
    research: [
      {
        tag: 'Policy Paper',
        title: 'Ethical Leadership & Institutional Integrity in Ghana’s Civil Service',
        authorYear: 'EPL Research Desk · 2026',
        summary:
          'A qualitative and quantitative assessment on how early-career public servant placement transforms compliance and work ethic.',
      },
      {
        tag: 'Gender Study',
        title: 'Women on the Rise: Barriers to Senior Administrative Roles in Public Sector',
        authorYear: 'In Partnership with Co-Impact · 2025',
        summary:
          'Investigating organizational policies and mentorship gaps affecting female career progression across 8 key ministries.',
      },
      {
        tag: 'Field Framework',
        title: 'Local Government Decentralization & Public Service Delivery in Greater Accra',
        authorYear: 'EPL Policy Fellows Working Group · 2024',
        summary:
          'Actionable frameworks for municipal assemblies on digital revenue collection, sanitation audits, and citizen engagement.',
      },
    ],
  },
}

export type ImpactTestimonialCategory = (typeof impactPageContent.testimonials.items)[number]['category']
