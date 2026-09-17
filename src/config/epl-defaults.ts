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
      'A 12-month leadership program placing top graduates inside government ministries with expert training and one-on-one mentorship.',
  },
  {
    slug: 'elevated-minds',
    title: 'Elevated MINDS',
    category: 'Program',
    summary:
      'A school-based career development programme equipping JHS and SHS students with skills, values and exposure for informed education and career decisions.',
  },
  {
    slug: 'women-on-the-rise',
    title: 'Women on the Rise',
    category: 'Leadership',
    summary:
      'Empowering women in public service through leadership coaching, mentorship networks, and career support.',
  },
  {
    slug: 'peace',
    title: 'P.E.A.C.E',
    category: 'Peacebuilding',
    summary:
      'Training public servants and security personnel in Northern Ghana on conflict prevention, early warning, and community peace.',
  },
] as const
