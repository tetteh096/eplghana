export const MEDIA_FOLDER_OPTIONS = [
  { label: 'General', value: 'general' },
  { label: 'Blog / News', value: 'blog' },
  { label: 'Fellows', value: 'fellows' },
  { label: 'Alumni', value: 'alumni' },
  { label: 'Team', value: 'team' },
  { label: 'Events', value: 'events' },
  { label: 'Projects', value: 'projects' },
  { label: 'Pages & site', value: 'pages' },
  { label: 'Publications', value: 'publications' },
  { label: 'Partners', value: 'partners' },
] as const

export type MediaFolder = (typeof MEDIA_FOLDER_OPTIONS)[number]['value']

export const DEFAULT_MEDIA_FOLDER: MediaFolder = 'general'
