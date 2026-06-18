import { eplImpactStats } from '@/config/epl-defaults'
import { EPL_MEDIA } from '@/config/eplMedia'
import type { TeamMember } from '@/config/teamPageContent'

export type AlumniSpotlight = {
  id: string
  name: string
  cohort: string
  currentRole: string
  bio: string
  photo: string
  linkedin?: string
}

export type AlumniStory = {
  id: string
  name: string
  cohort: string
  institution: string
  headline: string
  body: string
  photo: string
  quote?: string
}

export function alumniToTeamMember(alumni: AlumniSpotlight): TeamMember {
  return {
    id: alumni.id,
    name: alumni.name,
    role: `${alumni.currentRole} · ${alumni.cohort}`,
    bio: alumni.bio,
    photo: alumni.photo,
    linkedin: alumni.linkedin,
    group: 'team',
  }
}

export const alumniPageContent = {
  hero: {
    eyebrow: 'EPLAN · Public Service Fellows Network',
    title: 'Our Public Service Fellows',
    subtitle: 'Emerging Public Leaders of Ghana Alumni Network (EPLAN)',
    lead:
      'Established in May 2021, the Public Service Fellows Network (PSFN), also known as EPLAN, sustains the fellowship’s impact by fostering a lifelong community of ethical, innovative, and service-driven public leaders across Ghana’s public service.',
    image: `${EPL_MEDIA}/2023/12/MG_0422-scaled.jpg`,
    secondaryImage: `${EPL_MEDIA}/2025/07/CSG-32-scaled.jpg`,
    badge: {
      value: '100+',
      label: 'Dedicated network members',
    },
    highlights: [
      { value: 'May 2021', label: 'Network established' },
      { value: '100+', label: 'PSFN members' },
      { value: 'Annual', label: 'End-of-Year Fellows Convening' },
    ],
    primaryCta: { label: 'Partner With Us', href: '/contact' },
    secondaryCta: { label: 'Meet Current Fellows', href: '/community/current-fellows' },
  },
  eplanAbout: {
    eyebrow: 'About EPLAN',
    title: 'A lifelong community of public service leaders',
    paragraphs: [
      'The Public Service Fellows Network (PSFN), also known as the Emerging Public Leaders of Ghana Alumni Network (EPLAN), was founded by EPL Ghana following the inauguration of its first cohort from the Public Service Fellowship Programme.',
      'The network was created to sustain the fellowship’s impact through continuous learning, collaboration, and mentorship, providing a platform for members to exchange ideas, strengthen professional ties, and collectively advance effective and accountable governance across Ghana’s public service.',
      'To date, the network has grown into a vibrant community of over 100 dedicated members who continue to think critically, act ethically, and drive meaningful change across Ghana’s Public Service.',
    ],
    image: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
  },
  vision: {
    eyebrow: 'Our Vision',
    title: 'Catalysts for systemic change',
    text:
      'To be a network of ethical public servants committed to excellence; who act as catalysts to drive systemic change in Africa’s public sector.',
  },
  convening: {
    eyebrow: 'Flagship Gathering',
    title: 'Annual End-of-Year Fellows Convening',
    body:
      'The Annual End-of-Year Fellows Convening unites PSFN members in reflection and strategic dialogue on the association’s vision, achievements, and future priorities. Beyond discussions, the event provides a platform for networking, mentorship, and collaboration, strengthening bonds among members and reinforcing their shared commitment to effective, ethical, and people-centred public leadership.',
    image: `${EPL_MEDIA}/2025/10/CSG-1-scaled.jpg`,
  },
  globalGathering: {
    eyebrow: 'Global Gathering',
    title: 'Impact across Ghana and beyond',
    lead:
      'Our Fellows continue to make a lasting impact, influencing public service excellence in Ghana and beyond, shaping the landscape of public service leadership for a better tomorrow.',
    body:
      'The network exists to facilitate the personal and professional development of its members and to improve public service delivery in Ghana. PSFN pursues these objectives with the support of EPL Ghana through close engagement with the organisation’s leadership.',
    highlights: [
      'Represent Ghana at continental convenings such as the Mastercard Foundation Baobab Summit',
      'Connect with alumni across the EPL Global network in Ghana, Liberia, Kenya, and Malawi',
      'Celebrate milestones together at fellows convenings and graduation ceremonies',
    ],
    images: [
      {
        id: 'celebration',
        src: `${EPL_MEDIA}/2025/07/CSG-32-scaled.jpg`,
        alt: 'PSFN members celebrating at a fellows convening',
        caption: 'Celebrating fellowship milestones together',
        layout: 'featured',
      },
      {
        id: 'baobab',
        src: `${EPL_MEDIA}/2025/10/baobab-summit.jpg`,
        alt: 'EPL Ghana delegate at the Mastercard Foundation Baobab Summit 2025',
        caption: 'Baobab Summit 2025 · Nairobi, Kenya',
        layout: 'poster',
      },
      {
        id: 'convening',
        src: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
        alt: 'Public Service Fellows at a convening',
        caption: 'Fellows connecting at EPL Ghana convenings',
        layout: 'standard',
      },
    ],
  },
  impact: {
    eyebrow: 'Alumni Impact',
    title: 'Building Ghana’s public service, one graduate at a time',
    stats: eplImpactStats.map((stat) => ({
      value: stat.value,
      label: stat.label,
    })),
  },
  journey: {
    eyebrow: 'The Alumni Journey',
    title: 'From fellowship year to lifelong leadership',
    intro:
      'The Public Service Fellowship is a launchpad, not a finish line. Our alumni carry forward the values, skills, and relationships built during their service year.',
    steps: [
      {
        step: '01',
        title: 'Serve with Purpose',
        description:
          'Spend a transformative year embedded in a ministry, agency, or commission, contributing to real policy and programme work.',
      },
      {
        step: '02',
        title: 'Graduate & Connect',
        description:
          'Join a growing network of graduates celebrated at cohort ceremonies and connected through EPL Ghana and EPL Global.',
      },
      {
        step: '03',
        title: 'Advance & Lead',
        description:
          'Take on greater responsibility in public institutions, civil society, research, or ventures that serve communities.',
      },
      {
        step: '04',
        title: 'Mentor & Give Back',
        description:
          'Guide incoming fellows, share placement insights, and represent EPL at national and continental convenings.',
      },
    ],
  },
  stories: {
    eyebrow: 'Alumni Stories',
    title: 'Impact that continues beyond the fellowship year',
    intro:
      'Graduates are driving health reforms, representing Ghana on continental stages, and building the next generation of public servants.',
    items: [
      {
        id: 'story-paa-kwesi',
        name: 'Paa Kwesi E. A. Bonney',
        cohort: 'Cohort II',
        institution: 'Ministry of Health',
        headline: 'Health policy and community impact',
        body:
          'Balancing policy work and community impact, EPL Ghana alum Paa Kwesi E. A. Bonney drives health sector reforms at Ghana’s Ministry of Health while co-founding The Genuine Project, equipping youth with technical skills for sanitation infrastructure and civic engagement in Cape Coast.',
        photo: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
        quote:
          'The fellowship gave me the confidence to lead inside government and serve communities outside of it.',
      },
      {
        id: 'story-lawrence',
        name: 'Lawrence Nii Kotey NEEQUAYE',
        cohort: 'Cohort V',
        institution: 'Public Service Fellowship · Cohort Representative',
        headline: 'Representing Ghana at the Baobab Summit',
        body:
          'A leader’s journey is a story still being written. Lawrence Nii Kotey NEEQUAYE, a standout Cohort V Fellow and Cohort Representative, took EPL Ghana’s narrative to a continental stage as a delegate at the Mastercard Foundation’s 2025 Baobab Summit in Kigali, exchanging ideas on transformative leadership with young African changemakers.',
        photo: `${EPL_MEDIA}/2025/10/baobab-summit.jpg`,
      },
      {
        id: 'story-cohort-vi',
        name: 'Cohort VI Graduates',
        cohort: 'Class of 2025',
        institution: 'EPL Ghana · Staying to Build',
        headline: '33 fellows celebrated at graduation',
        body:
          'Staying to Build: EPL Ghana celebrated the graduation of its Sixth Cohort of Public Service Fellows alongside over 100 distinguished guests, urging a national commitment to serve and build Ghana. The ceremony marked the transition of 33 fellows into the alumni network.',
        photo: `${EPL_MEDIA}/2025/10/CSG-1-scaled.jpg`,
      },
    ] satisfies AlumniStory[],
  },
  featured: {
    eyebrow: 'Featured Graduates',
    title: 'Meet a few of our alumni',
    intro:
      'Click a profile to read their full story and learn how the fellowship shaped their path in public service.',
    items: [
      {
        id: 'alumni-paa-kwesi',
        name: 'Paa Kwesi E. A. Bonney',
        cohort: 'Cohort II',
        currentRole: 'Ministry of Health',
        bio:
          'Drives health sector reforms at Ghana’s Ministry of Health while co-founding The Genuine Project, addressing sanitation infrastructure gaps and youth civic engagement in Cape Coast communities.',
        photo: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
      },
      {
        id: 'alumni-lawrence',
        name: 'Lawrence Nii Kotey NEEQUAYE',
        cohort: 'Cohort V',
        currentRole: 'Cohort Representative · Baobab Summit Delegate',
        bio:
          'Represented EPL Ghana at the Mastercard Foundation’s 2025 Baobab Summit, joining young African leaders to exchange ideas on transformative leadership, entrepreneurship, and public service excellence.',
        photo: `${EPL_MEDIA}/2025/10/baobab-summit.jpg`,
      },
      {
        id: 'alumni-cohort-vi',
        name: 'Cohort VI Fellows',
        cohort: 'Class of 2025',
        currentRole: '33 Graduates · Staying to Build',
        bio:
          'The sixth cohort of Public Service Fellows completed their service year and joined the alumni network at a graduation ceremony attended by over 100 distinguished guests, a milestone for EPL Ghana’s growing community.',
        photo: `${EPL_MEDIA}/2025/07/CSG-32-scaled.jpg`,
      },
    ] satisfies AlumniSpotlight[],
  },
  pathways: {
    eyebrow: 'Where Are They Now',
    title: 'Careers after the fellowship',
    intro:
      'EPL alumni remain connected to public service in many forms, advancing within government, building civil society, pursuing further study, and launching ventures that serve communities.',
    items: [
      {
        title: 'Public Sector Leadership',
        description:
          'Many alumni continue in ministries, agencies, and commissions, taking on greater responsibility and shaping policy from within.',
        icon: 'flaticon-team',
      },
      {
        title: 'Civil Society & Development',
        description:
          'Graduates contribute to NGOs, international organisations, and advocacy, bridging government experience with community needs.',
        icon: 'flaticon-love',
      },
      {
        title: 'Further Study & Research',
        description:
          'Alumni pursue graduate degrees and research fellowships, bringing evidence and expertise back into public institutions.',
        icon: 'flaticon-check-mark',
      },
      {
        title: 'Entrepreneurship & Social Impact',
        description:
          'From social enterprises to community projects, fellows launch initiatives that address gaps they saw during their placements.',
        icon: 'flaticon-fast-forward-double-right-arrows-symbol',
      },
    ],
  },
  milestone: {
    eyebrow: 'Latest Milestone',
    title: 'Staying to Build, Cohort VI Graduation',
    body:
      'EPL Ghana graduates 33 fellows and urges national commitment to serve and build Ghana. Over 100 distinguished guests joined the celebration as a new class of leaders entered the alumni network.',
    ctaLabel: 'Read the graduation story',
    ctaHref:
      '/news/staying-to-build-epl-ghana-celebrates-graduation-of-sixth-cohort-of-public-service-fellows',
    image: `${EPL_MEDIA}/2025/10/CSG-1-scaled.jpg`,
  },
  gallery: {
    eyebrow: 'Community Moments',
    title: 'Graduations, convenings, and celebrations',
    images: [
      {
        src: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
        alt: 'Alumni community gathering',
      },
      {
        src: `${EPL_MEDIA}/2023/12/MG_0422-scaled.jpg`,
        alt: 'EPL Ghana graduation ceremony',
      },
      {
        src: `${EPL_MEDIA}/2025/10/CSG-1-scaled.jpg`,
        alt: 'Fellows convening group photo',
      },
    ],
  },
  news: {
    eyebrow: 'In the News',
    title: 'Alumni milestones & fellowship stories',
    intro: 'Recent highlights from the EPL Ghana community.',
    items: [
      {
        title:
          'Staying to Build: EPL Ghana Celebrates Graduation of Sixth Cohort of Public Service Fellows',
        excerpt:
          '33 fellows graduate alongside over 100 distinguished guests, marking a new chapter in the alumni network.',
        image: `${EPL_MEDIA}/2025/10/CSG-1-scaled.jpg`,
        href: '/news/staying-to-build-epl-ghana-celebrates-graduation-of-sixth-cohort-of-public-service-fellows',
      },
      {
        title: 'EPL Ghana at the 2025 Mastercard Foundation Baobab Summit',
        excerpt:
          'Lawrence Nii Kotey NEEQUAYE represents EPL Ghana on a continental stage of young African leaders.',
        image: `${EPL_MEDIA}/2025/10/baobab-summit.jpg`,
        href: '/events/baobab-summit-2025',
      },
      {
        title: 'EPL Ghana Launches 2025 Fellowship Cohort',
        excerpt:
          'A new cohort joins a growing network of young leaders transforming governance across Ghana.',
        image: `${EPL_MEDIA}/2025/10/CSOE-56-scaled.jpg`,
        href: '/projects/public-service-fellowship',
      },
    ],
  },
  network: {
    eyebrow: 'PSFN · EPLAN',
    title: 'Stay connected with the alumni network',
    intro:
      'Fellowship graduation is the beginning of membership in PSFN/EPLAN. EPL Ghana supports the network’s personal and professional development, and connects members to the broader Emerging Public Leaders community across Africa.',
    benefits: [
      {
        title: 'Mentorship',
        description: 'Guide incoming fellows and share insights from your placement year.',
        icon: 'flaticon-team',
      },
      {
        title: 'Community Events',
        description:
          'Join the Annual End-of-Year Fellows Convening, cohort reunions, and EPL Ghana gatherings.',
        icon: 'flaticon-love',
      },
      {
        title: 'Cross-Country Network',
        description: 'Connect with alumni across Ghana, Liberia, Kenya, and Malawi.',
        icon: 'flaticon-linkedin-big-logo',
      },
      {
        title: 'Leadership Convenings',
        description: 'Access career talks, workshops, and continental summits.',
        icon: 'flaticon-fast-forward-double-right-arrows-symbol',
      },
    ],
    globalLink: {
      label: 'Explore the EPL Global Alumni Network',
      href: 'https://emergingpublicleaders.org/alumni-network/',
    },
  },
  quote: {
    text:
      'This moment is critical. They have chosen one of the greatest ways to serve their country and humanity at large. I commend them and wish them the very best as they move forward to the next exciting phase of their lives.',
    attribution: 'President Ellen Johnson Sirleaf',
    role: 'Former President of Liberia · Chair Emeritus, Emerging Public Leaders',
  },
  cta: {
    title: 'Do you want to partner with us?',
    body:
      'EPL Ghana works closely with PSFN/EPLAN leadership to support alumni development and improve public service delivery. Partner with us, or register your interest in the Public Service Fellowship.',
    primaryLabel: 'Contact Us',
    primaryHref: '/contact',
    secondaryLabel: 'Register Interest',
    secondaryHref: '/get-involved#register-interest',
    image: `${EPL_MEDIA}/2025/10/WhatsApp-Image-2025-10-27-at-10.19.41-AM-e1761750334208.jpeg`,
  },
}
