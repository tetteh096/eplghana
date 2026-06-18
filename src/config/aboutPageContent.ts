import type { FellowTestimonialSlide } from '@/config/fellowTestimonials'
import { EPL_MEDIA } from '@/config/eplMedia'

export const aboutPageImages = {
  intro: `${EPL_MEDIA}/2025/10/WhatsApp-Image-2025-06-12-at-09.38.56_12598d95-1000x500.jpg`,
  approach: `${EPL_MEDIA}/2023/12/HN7A8676-1000x500.jpg`,
  mission: `${EPL_MEDIA}/2025/11/CSOT-35-1000x500.jpg`,
  vision: `${EPL_MEDIA}/2025/10/CSOE-46-1000x500.jpg`,
  impact: `${EPL_MEDIA}/2025/10/CSOE-80-1-scaled-e1765441074357-1000x1000.jpg`,
  partnerIcons: {
    leadership: `${EPL_MEDIA}/2025/10/leadership_18224975.png`,
    transformation: `${EPL_MEDIA}/2025/10/data-transformation_7440452.png`,
    sustainable: `${EPL_MEDIA}/2025/10/dartboard_3578649.png`,
    measurable: `${EPL_MEDIA}/2025/10/job_16921237.png`,
  },
  fellows: {
    'Elsie Owusu-Mensah': `${EPL_MEDIA}/2025/10/CSP41-scaled-e1760352134818.jpeg`,
    'Mawulolo Anane': `${EPL_MEDIA}/2025/10/CSP25-scaled-e1760351374674.jpeg`,
    'Elsie Naa Adjeley': `${EPL_MEDIA}/2025/10/CSP3-scaled-e1760351295725.jpeg`,
    'Elita Y. Amoroh': `${EPL_MEDIA}/2025/10/CSP61-scaled-e1760351548612.jpeg`,
  },
} as const

export const aboutPageIntro = {
  eyebrow: 'About Us',
  image: aboutPageImages.intro,
  secondaryImage: aboutPageImages.approach,
  paragraphs: [
    'Launched in Ghana in 2018, Emerging Public Leaders of Ghana was established with the core belief that institutional strength begins with exceptional leadership. Our journey started with a clear vision: to empower the next generation of Ghanaian youth with the knowledge, skills, and network required to become effective, sector-strengthening agents of change within Ghana’s Public Service.',
  ],
}

export const aboutPageApproach = {
  title: 'Our Approach',
  bullets: [
    'Flagship Fellowship Programme for Ghana’s public service',
    'Tailored capacity-building with strategic partners',
    'Networks that strengthen public-facing institutions',
  ],
}

export const aboutPageStory = {
  growth: {
    title: 'Scaling our impact',
    highlight: '275+',
    highlightLabel: 'Fellows by 2030',
    body: 'Today, that vision extends far beyond our inception. We are scaling our impact, with the ambitious yet attainable goal of nurturing a vast network of over 275 dedicated Fellows by 2030. This expansion signifies our unwavering commitment to advancing the societal and economic well-being of Ghana.',
  },
  investment: {
    title: 'Investing in public service',
    body: 'At Emerging Public Leaders of Ghana, our approach is a strategic investment in the future of Ghana’s public service. We equip the nation’s most promising young talent through our flagship Fellowship Programme, and in collaboration with key strategic partners, we deliver tailored capacity-building initiatives and a robust support network.',
  },
}

export const aboutPageMission = {
  eyebrow: 'Our Mission',
  title: 'Our Mission',
  body: 'To empower the next generation of Ghanaian youth with the knowledge, skills, and network required to become effective, sector-strengthening agents of change within Ghana\'s Public Service.',
  image: aboutPageImages.mission,
}

export const aboutPageVision = {
  eyebrow: 'Our Vision',
  title: 'Our Vision',
  body: 'To be the pioneering force that defines and cultivates a lasting network of ethical, skilled, and innovative leaders driving systemic, positive change across Ghana\'s Public Service.',
  image: aboutPageImages.vision,
}

export const aboutPageImpactImage = aboutPageImages.impact

export const aboutPageImpact = [
  {
    title: 'Institutional Impact',
    body: 'Our Fellows bring fresh energy and soft skills to their host institutions, improving efficiency and service delivery.',
  },
  {
    title: 'Policy Impact',
    body: 'Alumni are influencing critical policies in education, health, and economic development, ensuring decisions are data-driven and citizen-focused.',
  },
  {
    title: 'Cultural Impact',
    body: 'We are nurturing a new standard for public service: one defined by accountability, innovation, and a relentless focus on the public good.',
  },
] as const

export const aboutPagePartnerReasons = {
  eyebrow: 'Why Partner With Us',
  title: 'Impact built one leader at a time',
  lead:
    'At EPL, impact isn’t just something we talk about. It’s something we build, one leader at a time.',
  body:
    'We believe that real change is driven by people. That’s why we invest in individuals who go on to transform organizations, communities, and entire systems. Our approach is deeply human, yet rigorously results-driven. The outcomes speak for themselves, not just in numbers, but in the stories, strategies, and shifts our partners experience every day.',
  chooseLabel: 'Partnering with EPL means choosing:',
  items: [
    {
      title: 'Proven Leadership Development',
      body: 'We don’t just teach leadership. We cultivate leaders who can navigate complexity, inspire others, and drive meaningful outcomes.',
      icon: aboutPageImages.partnerIcons.leadership,
      accent: 'primary',
    },
    {
      title: 'Tailored Transformation',
      body: 'No one-size-fits-all frameworks. We co-create every journey to meet the real needs of your people and your organization.',
      icon: aboutPageImages.partnerIcons.transformation,
      accent: 'secondary',
    },
    {
      title: 'Sustainable Impact',
      body: 'Our work is designed to last, creating ripple effects that go far beyond the initial engagement.',
      icon: aboutPageImages.partnerIcons.sustainable,
      accent: 'deep',
    },
    {
      title: 'Measurable Progress',
      body: 'We track what matters: not vanity metrics, but real indicators of growth, resilience, and change.',
      icon: aboutPageImages.partnerIcons.measurable,
      accent: 'bright',
    },
  ],
} as const

export const aboutPageStats = [
  { value: '40+', label: 'Partner Public Institutions' },
  { value: '200+', label: 'Fellows Placed' },
  { value: '150+', label: 'Fellows Working Full Time' },
  { value: '85%', label: 'Career Advancement' },
] as const

export const aboutPageTestimonials: FellowTestimonialSlide[] = [
  {
    id: 'about-elsie-owusu',
    name: 'Elsie Owusu-Mensah',
    role: 'Fellow, NCCE',
    quote:
      'It\'s been very impactful and interesting. The call-ins, virtual training and other interactive sessions have helped shape me for the Public Sector.',
    photo: aboutPageImages.fellows['Elsie Owusu-Mensah'],
  },
  {
    id: 'about-mawulolo',
    name: 'Mawulolo Anane',
    role: 'Fellow, National Commission for Civic Education',
    quote:
      'The programme has helped me to develop my communication and public speaking skills. It has given me a new perspective on abilities and the significance of my contributions to the efficient functioning of the public sector. What I have enjoyed most is the regular check-ins, making me realize that I\'m not just part of an organization but a family that prioritizes my welfare.',
    photo: aboutPageImages.fellows['Mawulolo Anane'],
  },
  {
    id: 'about-elsie-naa',
    name: 'Elsie Naa Adjeley',
    role: 'Fellow, Ministry of Finance',
    quote:
      'EPL Ghana has been a life-changing experience. I’ve learned, grown, and connected with great minds who share the same passion for excellence and leadership.',
    photo: aboutPageImages.fellows['Elsie Naa Adjeley'],
  },
  {
    id: 'about-elita',
    name: 'Elita Y. Amoroh',
    role: 'Fellow, Ghana Commodity Exchange',
    quote:
      'Being a part of the Emerging Public Leaders of Ghana, Public Service Fellowship has been nothing short of transformative. The fellowship has challenged me to think critically about governance and accountability. Through mentorship, training, and peer learning, I have gained the confidence and capacity to lead with integrity and purpose.',
    photo: aboutPageImages.fellows['Elita Y. Amoroh'],
  },
]
