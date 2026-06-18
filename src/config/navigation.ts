export type NavLink = {
  href: string
  label: string
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
    label: 'About Us',
    items: [
      { href: '/about', label: 'About EPL Ghana' },
      { href: '/about/what-we-do', label: 'What We Do' },
      { href: '/about/director-message', label: 'Message from the Country Director' },
      { href: '/about/team', label: 'Our Team' },
    ],
  },
  {
    label: 'Projects',
    items: [
      { href: '/projects', label: 'All Projects' },
      { href: '/projects/public-service-fellowship', label: 'Public Service Fellowship' },
      { href: '/projects/women-on-the-rise', label: 'Women On The Rise' },
      { href: '/projects/peace', label: 'P.E.A.C.E' },
    ],
  },
  {
    label: 'Community',
    items: [
      { href: '/community/partners', label: 'Our Partners' },
      { href: '/community/current-fellows', label: 'Current Fellows' },
      { href: '/community/eplan', label: 'EPLAN' },
    ],
  },
  {
    label: 'Knowledge Products',
    items: [
      { href: '/news', label: 'Blog' },
      { href: '/news/events', label: 'News & Events' },
      { href: '/knowledge-products/annual-reports', label: 'Annual Reports' },
    ],
  },
  {
    label: 'Get Involved',
    items: [
      { href: '/get-involved', label: 'Get Involved' },
      { href: '/get-involved#register-interest', label: 'Register Fellowship Interest' },
    ],
  },
  { href: '/contact', label: 'Contact Us' },
]

export const headerCta: NavLink = {
  href: '/contact',
  label: 'Contact Us',
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
    { href: '/news', label: 'Blog' },
    { href: '/news/events', label: 'News & Events' },
    { href: '/get-involved', label: 'Get Involved' },
    { href: '/knowledge-products/annual-reports', label: 'Annual Reports' },
  ],
}
