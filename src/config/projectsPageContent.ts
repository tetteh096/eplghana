export const projectsPageIntro = {
  eyebrow: 'Our Programmes',
  title: 'Developing leaders for Ghana’s public service',
  description:
    'At Emerging Public Leaders of Ghana (EPL Ghana), our projects are designed to strengthen public institutions and equip young professionals with the skills and values to lead transformative change.',
  additionalParagraphs: [
    'From our flagship Public Service Fellowship to specialized initiatives implemented in collaboration with government ministries, development partners, and policy institutions, each project advances our mission of building accountable, effective, and people-centred governance.',
    'Through leadership development, mentorship, and capacity-building programmes, we nurture a generation of ethical public servants committed to innovation, inclusion, and national development.',
  ],
}

export const projectsPageCta = {
  title: 'Do You Want To Partner With Us?',
  ctaLabel: 'Contact Us',
  ctaHref: '/contact#partnership',
}

/** Slug keys map to branded gradient placeholders when no CMS image exists. */
export const projectVisualSlugs = new Set([
  'public-service-fellowship',
  'women-on-the-rise',
  'peace',
])

export function getProjectVisualClass(slug: string) {
  if (projectVisualSlugs.has(slug)) {
    return `epl-project-card-visual--${slug}`
  }
  return 'epl-project-card-visual--default'
}
