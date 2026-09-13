export type StaticProject = {
  description: string
  slug: string
  summary: string
  title: string
}

export const staticProjects: StaticProject[] = [
  {
    slug: 'public-service-fellowship',
    title: 'Public Service Fellowship',
    summary: 'Fellowship Programme',
    description:
      'The Emerging Public Leaders of Ghana (EPL Ghana) Public Service Fellowship is a transformative one-year journey of growth, innovation, and leadership within Ghana’s public service.',
  },
  {
    slug: 'women-on-the-rise',
    title: 'Women On The Rise',
    summary: 'Women in Leadership',
    description:
      'The Women on the Rise Project strengthens Ghana’s public service to be gender-responsive, inclusive, and equitable, by dismantling institutional barriers and empowering women leaders.',
  },
  {
    slug: 'peace',
    title: 'P.E.A.C.E',
    summary: 'Peace Building Fellowship',
    description:
      'The Professionals Engaged Against Conflict & Endangerment (P.E.A.C.E) Fellowship is a 12-month initiative led by Emerging Public Leaders of Ghana, funded by the U.S. Embassy in Ghana, equipping security professionals and community leaders in northern Ghana with peacebuilding skills.',
  },
  {
    slug: 'eplim',
    title: 'Elevated MINDS',
    summary: 'School-Based Career Development',
    description:
      'A structured school-based career development and readiness programme equipping Junior and Senior High School students with the skills, knowledge, values and exposure to make informed educational and career decisions.',
  },
  {
    slug: 'maritime',
    title: 'Elevated MINDS',
    summary: 'School-Based Career Development',
    description:
      'A structured school-based career development and readiness programme equipping Junior and Senior High School students with the skills, knowledge, values and exposure to make informed educational and career decisions.',
  },
  {
    slug: 'epl-in-maritime',
    title: 'Elevated MINDS',
    summary: 'School-Based Career Development',
    description:
      'A structured school-based career development and readiness programme equipping Junior and Senior High School students with the skills, knowledge, values and exposure to make informed educational and career decisions.',
  },
  {
    slug: 'elevated-minds',
    title: 'Elevated MINDS',
    summary: 'School-Based Career Development',
    description:
      'A structured school-based career development and readiness programme equipping Junior and Senior High School students with the skills, knowledge, values and exposure to make informed educational and career decisions.',
  },
]

export function getStaticProject(slug: string) {
  return staticProjects.find((project) => project.slug === slug)
}
