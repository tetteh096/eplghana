import { aboutPageImages } from '@/config/aboutPageContent'
import { eplFlagshipProjects } from '@/config/epl-defaults'
import { eplHomeImages, getProjectFallbackImage } from '@/config/eplMedia'
import { teamMembers } from '@/config/teamPageContent'

/* -------------------------------------------------------------------------- */
/*  What We Do                                                                */
/* -------------------------------------------------------------------------- */

export const whatWeDoIntro = {
  eyebrow: 'What We Do',
  title: 'Building ethical leaders inside Ghana’s public service',
  lead:
    'Emerging Public Leaders of Ghana strengthens the institutions Ghanaians rely on, by investing in the young professionals who run them.',
  paragraphs: [
    'We recruit, place, and develop Ghana’s most promising young talent inside key public institutions, then surround them with the training, mentorship, and network they need to lead with integrity and deliver real results.',
    'Our work runs through a growing set of connected programmes. Each tackles a different barrier to effective public service, but they share one goal: a generation of leaders who make government work better for citizens.',
  ],
  image: aboutPageImages.intro,
}

export type WhatWeDoProgramme = {
  slug: string
  title: string
  category: string
  summary: string
  href: string
  image: string | null
}

/** The three flagship programmes, linked through to their detailed Projects pages. */
export const whatWeDoProgrammes: WhatWeDoProgramme[] = eplFlagshipProjects.map(
  (project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    summary: project.summary,
    href: `/projects/${project.slug}`,
    image: getProjectFallbackImage(project.slug),
  }),
)

export const whatWeDoApproach = {
  eyebrow: 'How We Work',
  title: 'A model designed to last',
  steps: [
    {
      title: 'Recruit & Place',
      body: 'We identify high-potential young Ghanaians and place them inside the public institutions where they can make the greatest difference.',
    },
    {
      title: 'Train & Mentor',
      body: 'Fellows receive a structured capacity-building curriculum, hands-on mentorship, and regular check-ins throughout their placement.',
    },
    {
      title: 'Connect & Sustain',
      body: 'Through our growing alumni network, fellows stay connected, sharing knowledge and reinforcing a culture of ethical, effective leadership.',
    },
  ],
}

export const whatWeDoCta = {
  title: 'See the work in action',
  body: 'Explore each programme in detail, or find the right way to get involved.',
  image: eplHomeImages.events[1],
  primary: { href: '/projects', label: 'Explore Our Projects' },
  secondary: { href: '/get-involved', label: 'Get Involved' },
}

/* -------------------------------------------------------------------------- */
/*  Message from the Country Director                                         */
/* -------------------------------------------------------------------------- */

const countryDirector = teamMembers.find((member) => member.id === 'exec-director')

export const directorMessageContent = {
  eyebrow: 'A Word From Our Leadership',
  title: 'Message from the Country Director',
  name: countryDirector?.name ?? 'Abena Osei',
  role: countryDirector?.role ?? 'Country Director',
  photo: countryDirector?.photo ?? '',
  email: countryDirector?.email,
  linkedin: countryDirector?.linkedin,
  greeting: 'Dear friends of EPL Ghana,',
  paragraphs: [
    'When we launched Emerging Public Leaders of Ghana, we held a simple conviction: that the strength of any nation rests on the strength of its public institutions, and that those institutions are only as strong as the people who lead them.',
    'Every day, our fellows prove that conviction right. They step into government agencies across Ghana not as observers, but as contributors, bringing fresh energy, new skills, and an unwavering commitment to serving citizens with integrity.',
    'What we are building is bigger than any single programme. We are nurturing a network of ethical, capable leaders who will shape Ghana’s public service for decades to come. That is a long-term investment, and one I am proud to lead here at home.',
    'To our fellows, partners, and supporters: thank you. Your belief in this mission is what makes it possible. There is much more work ahead, and I invite you to walk this journey with us.',
  ],
  signoff: 'With gratitude,',
  pullQuote:
    'The strength of a nation rests on the people who lead its institutions, and our job is to develop them.',
} as const
