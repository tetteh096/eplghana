export { eplCoreValuesWithIcons as eplCoreValues } from '@/config/coreValues'

export const eplImpactStats = [
  { value: '200+', label: 'Fellows Trained' },
  { value: '150+', label: 'Fellows Working Full Time' },
  { value: '40+', label: 'Public Institutions' },
  { value: '85%', label: 'Career Advancement' },
] as const

export const eplFlagshipProjects = [
  {
    slug: 'public-service-fellowship',
    title: 'Public Service Fellowship',
    category: 'Fellowship',
    summary:
      'A transformative one-year journey embedding Ghana’s brightest young professionals within key government institutions.',
  },
  {
    slug: 'women-on-the-rise',
    title: 'Women on the Rise',
    category: 'Leadership',
    summary:
      'Addressing systemic barriers that prevent women from attaining higher leadership roles in Ghana’s Public Service.',
  },
  {
    slug: 'peace',
    title: 'P.E.A.C.E',
    category: 'Peacebuilding',
    summary:
      'Professionals Engaged Against Conflict & Endangerment, equipping public servants with peacebuilding skills.',
  },
] as const
