import { EPL_MEDIA } from '@/config/eplMedia'

export type NewsEventHighlight = {
  slug: string
  title: string
  excerpt: string
  image: string
  href: string
}

export const newsEventsPageContent = {
  hero: {
    title: 'News & Events',
    lead: 'Stay informed on our latest stories, milestones, and upcoming engagements shaping public leadership in Ghana.',
  },
  featuredStories: [
    {
      title:
        'EPL Ghana Launches 2025 Fellowship Cohort, who will be joining a growing network of young leaders transforming governance across Ghana.',
      excerpt:
        'A new cohort of Public Service Fellows begins their journey, embedded in ministries, agencies, and commissions driving integrity and innovation.',
      image: `${EPL_MEDIA}/2025/10/CSOE-56-scaled.jpg`,
      href: '/projects/public-service-fellowship',
      ctaLabel: 'Read more',
    },
    {
      title:
        'EPL Ghana graduates 33 fellows, urges national commitment to serve and build Ghana. This story is featured on Graphic Online.',
      excerpt:
        'Staying to Build: EPL Ghana Celebrates Graduation of Sixth Cohort of Public Service Fellows alongside over 100 distinguished guests.',
      image: `${EPL_MEDIA}/2025/10/CSG-1-scaled.jpg`,
      href: '/news/staying-to-build-epl-ghana-celebrates-graduation-of-sixth-cohort-of-public-service-fellows',
      ctaLabel: 'Read more',
    },
  ] as const,
  pastEvents: [
    {
      slug: 'riwoco-2025',
      title: 'RiWoCo 2025',
      excerpt:
        'Conference Mantra; Women Arise and Shine! Women, Arise and Shine! Men, Partners and Collaborators!',
      image: `${EPL_MEDIA}/2025/11/LEMA25-0177.jpg`,
      href: '/events/riwoco-2025',
    },
    {
      slug: 'reflections-riwoco-2025',
      title: 'Reflections from the Rise Women Conference (RiWoCo2025)',
      excerpt:
        '"Three decades after the Beijing Declaration, while progress has been made, we know this truth: declarations do not change systems, people do!" ~ Juliet A. Amoah.',
      image: `${EPL_MEDIA}/2025/10/riwoco3.jpg`,
      href: '/news/breaking-barriers-empowering-women-to-attain-higher-leadership-heights-copy',
    },
    {
      slug: 'civil-service-week-2025',
      title: 'EPL Ghana participates in 2025 Civil Service Week Public Lecture',
      excerpt:
        'Develop a clear framework for interoperability: common standards and shared systems that facilitate integration across government agencies.',
      image: `${EPL_MEDIA}/2025/10/ps.jpg`,
      href: '/events/civil-service-week-2025',
    },
    {
      slug: 'psf-cohort-vi-graduation',
      title: 'Celebrating Excellence: PSF Cohort VI Graduation',
      excerpt:
        'Our community of change leaders climaxed the service year with a graduation ceremony of our Sixth Cohort of Public Service Fellows alongside over 100 distinguished guests.',
      image: `${EPL_MEDIA}/2025/07/CSG-32-scaled.jpg`,
      href: '/news/staying-to-build-epl-ghana-celebrates-graduation-of-sixth-cohort-of-public-service-fellows',
    },
    {
      slug: 'baobab-summit-2025',
      title: 'EPL Ghana at the 2025 Mastercard Foundation Baobab Summit',
      excerpt:
        "Lawrence Nii Kotey NEEQUAYE, a standout Cohort 5 Fellow and Cohort Representative, represents EPL Ghana at the Mastercard Foundation's 2025 Baobab Summit.",
      image: `${EPL_MEDIA}/2025/10/baobab-summit.jpg`,
      href: '/events/baobab-summit-2025',
    },
  ] satisfies NewsEventHighlight[],
  cta: {
    title: 'Be Part of Our Work',
    ctaLabel: 'Become a Fellow',
    ctaHref: '/contact',
    image: `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`,
  },
}

export type EventGalleryItem = {
  src: string
  caption?: string | null
}

export type EventDetail = {
  slug: string
  title: string
  excerpt: string
  image: string
  eventDate: string
  venue: string
  paragraphs: string[]
  registrationUrl?: string | null
  registrationLabel?: string | null
  gallery?: EventGalleryItem[]
}

export const fallbackEvents: EventDetail[] = [
  {
    slug: 'riwoco-2025',
    title: 'RiWoCo 2025',
    excerpt:
      'Conference Mantra; Women Arise and Shine! Women, Arise and Shine! Men, Partners and Collaborators!',
    image: `${EPL_MEDIA}/2025/11/LEMA25-0177.jpg`,
    eventDate: '2025-11-01T09:00:00.000Z',
    venue: 'Accra, Ghana',
    paragraphs: [
      'The Rise Women Conference (RiWoCo) 2025 convened leaders, partners, and collaborators under the mantra: Women Arise and Shine!',
      'EPL Ghana’s Women On The Rise programme brought together public servants, civil society allies, and emerging leaders to reimagine inclusive governance and celebrate women driving change across Ghana.',
    ],
  },
  {
    slug: 'epl-annual-public-leadership-forum-2026',
    title: 'EPL Annual Public Leadership Forum 2026',
    excerpt:
      'A full-day flagship convening bringing together current fellows, government heads, and institutional partners to examine ethical governance in Ghana.',
    image: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
    eventDate: '2026-09-15T09:00:00.000Z',
    venue: 'Accra International Conference Centre',
    paragraphs: [
      'The EPL Annual Public Leadership Forum is our flagship convening for fellows, alumni, government leaders, and partners committed to ethical public service.',
      'Sessions examine integrity in institutions, leadership practice inside ministries and assemblies, and the partnerships that help young public servants deliver lasting reform.',
    ],
  },
  {
    slug: 'civil-service-innovation-digital-governance-summit',
    title: 'Civil Service Innovation & Digital Governance Summit',
    excerpt:
      'Co-hosted with the Ministry of Communications and UNDP Ghana to discuss institutional automation and public sector data frameworks.',
    image: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
    eventDate: '2026-10-28T10:00:00.000Z',
    venue: 'Kempinski Hotel Gold Coast City, Accra',
    paragraphs: [
      'This partnered summit brings public servants and development partners together around digital governance, automation, and interoperable data systems.',
      'Participants explore practical frameworks for institutional modernization while keeping ethics, accountability, and citizen service at the centre.',
    ],
  },
  {
    slug: 'public-sector-career-masterclass-fellowship-info',
    title: 'Public Sector Career Masterclass & Fellowship Info Session',
    excerpt:
      'An orientation for prospective young public servants covering fellowship eligibility, interview prep, and placements.',
    image: `${EPL_MEDIA}/2025/10/CSRAW56-scaled-e1760539041848.jpg`,
    eventDate: '2026-11-12T14:00:00.000Z',
    venue: 'Virtual (Zoom Live Stream)',
    paragraphs: [
      'This masterclass introduces prospective applicants to public-sector careers and the Emerging Public Leaders Fellowship pathway.',
      'Attendees learn about eligibility, interview preparation, placement expectations, and how the fellowship develops ethical, critical-thinking leaders for Ghana’s civil service.',
    ],
  },
  {
    slug: 'women-in-governance-roundtable-breaking-ceilings',
    title: 'Women in Governance Roundtable: Breaking Ceilings',
    excerpt:
      'An interactive dialogue celebrating the leadership journeys of women leading critical ministries and civil service departments.',
    image: `${EPL_MEDIA}/2025/10/CSP96-scaled-e1760539888346.jpeg`,
    eventDate: '2026-12-05T11:00:00.000Z',
    venue: 'Civil Service Training Centre, Accra',
    paragraphs: [
      'Women in Governance Roundtable convenes women leaders across ministries and departments to share journeys, barriers, and strategies for advancing into senior roles.',
      'The dialogue strengthens mentorship networks and elevates practical reforms that make Ghana’s public service more inclusive.',
    ],
  },
  {
    slug: 'civil-service-week-2025',
    title: 'EPL Ghana participates in 2025 Civil Service Week Public Lecture',
    excerpt:
      'Develop a clear framework for interoperability: common standards and shared systems that facilitate integration across government agencies.',
    image: `${EPL_MEDIA}/2025/10/ps.jpg`,
    eventDate: '2025-05-15T10:00:00.000Z',
    venue: 'Accra International Conference Centre',
    paragraphs: [
      'Emerging Public Leaders of Ghana participated in the 2025 Civil Service Week Public Lecture, contributing to national dialogue on modernising public administration.',
      'Discussions centred on interoperability: establishing common standards and shared systems that enable seamless integration across government agencies and improve service delivery for citizens.',
    ],
  },
  {
    slug: 'baobab-summit-2025',
    title: 'EPL Ghana at the 2025 Mastercard Foundation Baobab Summit',
    excerpt:
      "Lawrence Nii Kotey NEEQUAYE represents EPL Ghana as a delegate at the Mastercard Foundation's 2025 Baobab Summit.",
    image: `${EPL_MEDIA}/2025/10/baobab-summit.jpg`,
    eventDate: '2025-10-20T09:00:00.000Z',
    venue: 'Kigali, Rwanda',
    paragraphs: [
      "A leader's journey is a story still being written. Lawrence Nii Kotey NEEQUAYE, a standout Cohort 5 Fellow and Cohort Representative, took EPL Ghana's narrative to a continental stage as a delegate at the Mastercard Foundation's 2025 Baobab Summit.",
      'Representing his peers, Lawrence joined young African leaders exchanging ideas on transformative leadership, entrepreneurship, and public service excellence.',
    ],
  },
  {
    slug: 'women-on-the-rise-forum-2026',
    title: 'Women on the Rise Leadership Forum 2026',
    excerpt:
      'A national dialogue on advancing women into senior leadership roles across Ghana’s public institutions.',
    image: `${EPL_MEDIA}/2025/10/riwoco3.jpg`,
    eventDate: '2026-08-20T09:00:00.000Z',
    venue: 'Accra, Ghana',
    paragraphs: [
      'The Women on the Rise Leadership Forum convenes public servants, partners, and emerging leaders to advance gender equity in Ghana’s civil service.',
      'Sessions explore mentorship, policy reform, and practical strategies for removing barriers to women’s leadership.',
    ],
  },
]

export function getFallbackEvent(slug: string): EventDetail | undefined {
  return fallbackEvents.find((event) => event.slug === slug)
}
