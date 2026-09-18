export type NavLink = {
  href: string
  label: string
  description?: string
}

export type NavDropdown = {
  label: string
  items: NavLink[]
}

export type NavItem = NavLink | NavDropdown

export function isNavDropdown(item: NavItem): item is NavDropdown {
  return 'items' in item
}

export const mainNavigation: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    label: 'About',
    items: [
      { href: '/about#story', label: 'Who We Are', description: 'Our origin, purpose and journey' },
      { href: '/about/our-journey', label: 'Our Journey', description: 'From Liberia to Ghana: Our timeline' },
      { href: '/about#mission-vision', label: 'Mission & Vision', description: 'What drives us forward' },
      { href: '/about#values', label: 'Our Values', description: 'The principles we live by' },
      { href: '/about#people', label: 'Leadership & Team', description: 'The people behind EPL Ghana' },
      { href: '/about#partners', label: 'Partners', description: 'Who we work with' },
    ],
  },
  {
    label: 'Programmes',
    items: [
      {
        href: '/projects/public-service-fellowship',
        label: 'Emerging Public Leaders Fellowship',
        description: 'Our flagship 12-month programme',
      },
      {
        href: '/projects/women-on-the-rise',
        label: 'Women on the Rise',
        description: 'Empowering women in public service',
      },
      {
        href: '/projects/peace',
        label: 'P.E.A.C.E.',
        description: 'Ethical action in civic environments',
      },
      {
        href: '/projects/elevated-minds',
        label: 'Elevated MINDS',
        description: 'School-based career development for JHS and SHS students',
      },
      {
        href: '/projects',
        label: 'All projects',
        description: 'Additional EPL Ghana initiatives',
      },
    ],
  },
  {
    label: 'Impact',
    items: [
      { href: '/impact', label: 'Impact Overview', description: 'Our reach across Ghana' },
      { href: '/impact#success-stories', label: 'Success Stories', description: 'Fellows making a difference' },
      { href: '/impact#community-stories', label: 'Community Stories', description: 'Transformation across districts' },
      { href: '/impact#testimonials', label: 'Testimonials', description: 'Voices from mentors, supervisors & partners' },
      { href: '/impact#annual-reports', label: 'Annual Reports', description: 'Our accountability in numbers' },
      { href: '/research', label: 'Research & Publications', description: 'Knowledge we generate' },
    ],
  },
  {
    label: 'Community',
    items: [
      { href: '/community/current-fellows', label: 'Current Cohort', description: 'Our eighth cohort of Fellows' },
      { href: '/community/eplan', label: 'EPLAN', description: 'Alumni network of 500+ leaders' },
    ],
  },
  {
    label: 'Media & Engage',
    items: [
      { href: '/news', label: 'News & Insights', description: 'Updates, events & publications' },
      { href: '/gallery', label: 'Photo Gallery', description: 'Events, training & cohort highlights' },
      { href: '/get-involved', label: 'Get Involved', description: 'Ways to be part of our work' },
      { href: '/community/partners', label: 'Partner With Us', description: 'Strategic partnerships' },
      { href: '/donate', label: 'Donate', description: 'Support our mission' },
      { href: '/contact', label: 'Contact Us', description: 'Get in touch with EPL Ghana' },
    ],
  },
]

export const headerCta: NavLink = {
  href: '/donate',
  label: 'Donate',
}

/** Flat links for legacy Tailwind header (unused by Charitics layout). */
export const mainNav: NavLink[] = mainNavigation.flatMap((item) =>
  isNavDropdown(item) ? item.items : [item],
)

export const footerLinks = {
  useful: [
    { href: '/about', label: 'About Us' },
    { href: '/about/team', label: 'Our Team' },
    { href: '/projects', label: 'Projects' },
    { href: '/community', label: 'Community' },
    { href: '/community/eplan', label: 'EPLAN' },
    { href: '/contact', label: 'Contact Us' },
  ],
  resources: [
    { href: '/news', label: 'News & Insights' },
    { href: '/get-involved', label: 'Get Involved' },
    { href: '/community/partners', label: 'Partner With Us' },
    { href: '/donate', label: 'Donate' },
  ],
}
