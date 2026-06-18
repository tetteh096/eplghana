import { EPL_MEDIA } from '@/config/eplMedia'

export const peaceContent = {
  hero: {
    eyebrow: 'Peace Building Fellowship',
    title: 'P.E.A.C.E Fellows Project',
    lead:
      'The Professionals Engaged Against Conflict & Endangerment (P.E.A.C.E) Fellowship equips public sector professionals and community leaders with peacebuilding skills to strengthen civilian-security relations across northern Ghana.',
    description:
      'Led by Emerging Public Leaders of Ghana and funded by the U.S. Embassy in Ghana, this 12-month programme engages 100 participants through online symposiums and selects 25 high-performing fellows, at least 50% women, for intensive in-person training in conflict management, negotiation, and human security.',
    images: [
      `${EPL_MEDIA}/2025/10/20240830135443__MG_7840-1024x683.jpg`,
      `${EPL_MEDIA}/2025/10/Meeting-with-Deputy-Regional-Commander-2-1024x768.jpeg`,
    ],
    partners: ['U.S. Embassy in Ghana', 'Ministries of Local Government, Defense & Interior'],
    ctaLabel: 'Get Involved',
    ctaHref: '/get-involved',
  },
  aboutImage: `${EPL_MEDIA}/2023/12/HN7A8766-1-1024x469.jpg`,
  impact: {
    title: 'Programme at a Glance',
    stats: [
      {
        value: '100',
        label: 'Participants engaged via online symposiums',
        icon: `${EPL_MEDIA}/2025/10/workforce_16864433-150x150.png`,
      },
      {
        value: '25',
        label: 'High-performing fellows selected for in-person training',
        icon: `${EPL_MEDIA}/2025/11/secretary_12148726-150x150.png`,
      },
      {
        value: '50%+',
        label: 'Female representation among selected fellows',
        icon: `${EPL_MEDIA}/2025/11/competent_15870815.png`,
      },
      {
        value: '12',
        label: 'Months of leadership and peacebuilding development',
        icon: `${EPL_MEDIA}/2025/11/upload_7773505.png`,
      },
    ],
  },
  outcomes: {
    title: 'What Fellows Gain',
    items: [
      {
        title: 'Ethical & Situational Leadership',
        description:
          'Fellows develop right-conscious leadership skills, ethical decision-making, situational awareness, and conflict management, to improve security-civilian relationships and strengthen the peace architecture in northern Ghana.',
        image: `${EPL_MEDIA}/2025/10/20240830135443__MG_7840-1024x683.jpg`,
      },
      {
        title: 'Human Security & Community Impact',
        description:
          'Through human security training and 21st-century soft skills, fellows become champions of equitable justice in districts and municipalities, equipped to de-escalate community conflict and reduce the risk of extremist violence.',
        image: `${EPL_MEDIA}/2025/10/Meeting-with-Deputy-Regional-Commander-2-1024x768.jpeg`,
      },
    ],
  },
  keySuccess: {
    eyebrow: 'Programme Focus',
    stories: [
      {
        title: 'Building Peace in At-Risk Communities',
        paragraphs: [
          'The programme targets entry-level professionals within the Ministry of Local Government, Ministry of Defense, Ministry of Interior, and other security and border agencies working to build and maintain peaceful communities in northern Ghana.',
          'By increasing the capacity of young professionals, community leaders, and young people to resolve and de-escalate conflict, P.E.A.C.E contributes to strengthening public safety, building social cohesion, and enhancing service delivery of critical security agencies.',
        ],
        images: [
          `${EPL_MEDIA}/2025/10/CSOE-32-1-scaled.jpg`,
          `${EPL_MEDIA}/2025/10/image00012-scaled.jpeg`,
        ],
      },
      {
        title: 'Each-One-to-Reach-Five Cascade Model',
        paragraphs: [
          'To increase scale, reach, and impact, P.E.A.C.E Fellows adopt an each-one-to-reach-five technique, cascading newly acquired knowledge to peers, colleagues, and community stakeholders.',
          'This multiplier approach ensures that peacebuilding skills extend beyond the initial cohort, embedding early-warning capacity and negotiation expertise across Ghana’s public and security sectors.',
        ],
        images: [
          `${EPL_MEDIA}/2023/12/MG_0422-1024x683.jpg`,
          `${EPL_MEDIA}/2025/07/CSG-2-scaled.jpg`,
        ],
      },
    ],
  },
  gallery: {
    title: 'P.E.A.C.E in Action',
    items: [
      {
        src: `${EPL_MEDIA}/2025/10/20240830135443__MG_7840-1024x683.jpg`,
        layout: 'hero',
        alt: 'P.E.A.C.E fellowship session',
      },
      {
        src: `${EPL_MEDIA}/2025/10/Meeting-with-Deputy-Regional-Commander-2-1024x768.jpeg`,
        layout: 'tall',
        alt: 'Meeting with regional security leadership',
      },
      {
        src: `${EPL_MEDIA}/2025/10/CSOE-32-1-scaled.jpg`,
        layout: 'stack-a',
        alt: 'Peacebuilding workshop',
      },
      {
        src: `${EPL_MEDIA}/2025/10/image00012-scaled.jpeg`,
        layout: 'stack-b',
        alt: 'Community engagement session',
      },
      {
        src: `${EPL_MEDIA}/2023/12/HN7A8766-1-1024x469.jpg`,
        layout: 'wide',
        alt: 'Northern Ghana programme outreach',
      },
      {
        src: `${EPL_MEDIA}/2025/11/image00017-scaled.jpeg`,
        layout: 'banner',
        alt: 'Fellows in collaborative training',
      },
    ],
  },
  relatedArticles: {
    title: 'Related Articles',
    items: [
      {
        title:
          'P.E.A.C.E (Professionals Engaged Against Conflict & Endangerment) Fellows Project',
        href: '/news',
        image: `${EPL_MEDIA}/2025/10/20240830135443__MG_7840-1024x683.jpg`,
      },
      {
        title:
          'Inspiring the Next Generation of Inclusive Leaders: EPL Ghana’s Empowerment and Leadership Tour, June 2025',
        href: '/news',
        image: `${EPL_MEDIA}/2025/11/EPL-Watermark-471-of-715-scaled-e1762170976232.jpg`,
      },
      {
        title: 'Excellence In Service',
        href: '/news',
        image: `${EPL_MEDIA}/2025/07/CSG-2-scaled.jpg`,
      },
      {
        title:
          'BREAKING BARRIERS: EMPOWERING WOMEN TO ATTAIN HIGHER LEADERSHIP HEIGHTS',
        href: '/news',
        image: `${EPL_MEDIA}/2025/10/CSOE-32-1-scaled.jpg`,
      },
    ],
  },
  partnerCta: {
    title: 'Partner With Us to Build Lasting Peace',
    ctaLabel: 'Contact Us',
    ctaHref: '/contact',
    image: `${EPL_MEDIA}/2025/10/Meeting-with-Deputy-Regional-Commander-2-1024x768.jpeg`,
  },
}
