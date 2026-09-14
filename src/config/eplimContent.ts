import { EPL_MEDIA } from '@/config/eplMedia'

const ELEVATED_MINDS_SUMMARY =
  'A school-based career development programme equipping Junior and Senior High School students with the skills, knowledge, values and exposure to make informed education and career decisions.'

export const eplimContent = {
  hero: {
    eyebrow: 'School-Based Career Development',
    title: 'Elevated MINDS',
    lead: ELEVATED_MINDS_SUMMARY,
    description:
      'Elevated Minds is a structured school-based career development and readiness programme designed to equip Junior High School and Senior High School students with the skills, knowledge, values and exposure required to make informed educational and career decisions and successfully navigate key transitions into tertiary education and the world of work.\n\nThe project will establish structured career clubs in La Cluster of Schools (JHS), Mawuko Girls SHS, and either Akrofufu SHTS or Osino SHTS, reaching 500 students at critical educational transition points — 100 JHS Form 2–3 students and 400 SHS Form 2–3 students. These cohorts are preparing for BECE, WASSCE, subject and academic decisions, tertiary education and post-secondary pathways.',
    images: [
      `${EPL_MEDIA}/2025/04/HN7A4284-scaled.jpg`,
      `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`,
    ],
    partners: [
      'La Cluster of Schools (JHS)',
      'Mawuko Girls SHS',
      'Akrofufu SHTS / Osino SHTS',
    ],
    ctaLabel: 'Partner on Elevated MINDS',
    ctaHref: '/partner-with-us',
  },
  aboutEyebrow: 'Programme Overview',
  aboutTitle: 'Preparing Students for Education and Work Transitions',
  aboutImage: `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`,
  capacityBuilding: {
    eyebrow: 'Learning Model',
    title: 'Blended, Competency-Based and Experiential',
    description:
      'Elevated Minds combines structured in-person workshops, mentorship, career exposure, practical exercises and student-led activities. Students take part in career exploration assessments, pathway guidance, public speaking and communication training, research and problem-solving activities, ethical leadership exercises, mentorship, tertiary preparation clinics, interview simulations, and the development of individual Career Development Plans.',
    image: `${EPL_MEDIA}/2025/04/HN7A4284-scaled.jpg`,
  },
  whyItMatters: {
    eyebrow: 'Thematic Areas',
    title: 'Four Pillars of Career Readiness',
    items: [
      {
        title: 'Communication & Professional Skills',
        description:
          'Public speaking, workplace communication, CV and cover-letter development, and interview preparation that build confidence for tertiary and employment pathways.',
      },
      {
        title: 'Tech & Personal Branding',
        description:
          'Practical tools for presenting yourself professionally online and offline, and for navigating technology-enabled learning and career opportunities.',
      },
      {
        title: 'Leadership & Character Development',
        description:
          'Ethical leadership exercises, values formation and student-led activities that strengthen character, responsibility and service mindset.',
      },
      {
        title: 'Digital Skills & Digital Careers',
        description:
          'Foundational digital competencies and exposure to emerging digital career pathways that shape the world of work students are entering.',
      },
    ],
  },
  impact: {
    eyebrow: 'Project Aims',
    title: '500 Students. Three Pilot Schools. Clearer Pathways.',
    description:
      'Elevated Minds aims to improve critical thinking, research and problem-solving through structured modules, research mini-projects, case studies, debates and experiential learning; establish career clubs in La Cluster of Schools (JHS), Mawuko Girls SHS, and Akrofufu/Osino SHTS; conduct career clinics for 500 students; strengthen employability readiness through exploration, mentorship and tertiary guidance; and expose students to diverse career pathways through talks, professional engagement and interaction with people working across different fields.',
    image: `${EPL_MEDIA}/2025/10/CSOE-32-1-scaled.jpg`,
    ctaLabel: 'Support Elevated MINDS',
    ctaHref: '/donate',
  },
}

export { ELEVATED_MINDS_SUMMARY }
