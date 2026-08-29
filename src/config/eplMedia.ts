/** Public media URLs from the live EPL Ghana WordPress site */
export const EPL_MEDIA = 'https://eplghana.org/wp-content/uploads'

export const eplHomeImages = {
  /** Full-screen home hero — EPL fellows landscape (not Unsplash) */
  heroHome: `${EPL_MEDIA}/2025/07/CSG-15-1-scaled.jpg`,
  heroDefault: `${EPL_MEDIA}/2025/07/CSG-1024x683.jpg`,
  aboutMain: `${EPL_MEDIA}/2025/07/CSG-1024x683.jpg`,
  aboutBlock: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
  missionBanner: [
    `${EPL_MEDIA}/2025/07/CSG-15-1-scaled.jpg`,
    `${EPL_MEDIA}/2025/07/CSG-36-scaled.jpg`,
    `${EPL_MEDIA}/2025/07/CSG-2-scaled.jpg`,
    `${EPL_MEDIA}/2025/11/LEMA25-0494.jpg`,
    `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`,
    `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
  ],
  gallery: [
    { src: `${EPL_MEDIA}/2025/07/CSG-1024x683.jpg`, alt: 'EPL Ghana fellows at a programme event' },
    { src: `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`, alt: 'Public service leadership session' },
    { src: `${EPL_MEDIA}/2025/11/LEMA25-2183-1024x682.jpg`, alt: 'Women On The Rise conference' },
    { src: `${EPL_MEDIA}/2025/10/IMG_7245-scaled.jpg`, alt: 'Fellows collaborating in Accra' },
    { src: `${EPL_MEDIA}/2026/02/PSF-CViii-819x1024.jpg`, alt: 'Public Service Fellowship cohort' },
    { src: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`, alt: 'EPL Ghana community gathering' },
    { src: `${EPL_MEDIA}/2023/12/MG_0422-scaled.jpg`, alt: 'Graduation celebration' },
    { src: `${EPL_MEDIA}/2025/04/HN7A4284-scaled.jpg`, alt: 'Programme workshop' },
  ],
  projects: {
    'public-service-fellowship': `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
    'women-on-the-rise': `${EPL_MEDIA}/2025/10/IMG_7245-scaled.jpg`,
    peace: `${EPL_MEDIA}/2023/12/MG_0422-scaled.jpg`,
    'epl-in-maritime': `${EPL_MEDIA}/2025/11/LEMA25-2183-1024x682.jpg`,
  },
  projectsFallback: {
    'public-service-fellowship':
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=700&fit=crop&auto=format',
    'epl-in-maritime':
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=700&fit=crop&auto=format',
    'women-on-the-rise':
      'https://images.unsplash.com/photo-1573497019236-d22bce4b7c9f?w=800&h=500&fit=crop&auto=format',
    peace:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop&auto=format',
  },
  events: [
    `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`,
    `${EPL_MEDIA}/2025/11/LEMA25-0486-1024x682.jpg`,
    `${EPL_MEDIA}/2023/12/MG_0422-1024x683.jpg`,
    `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
  ],
  news: {
    graduation: `${EPL_MEDIA}/2023/12/MG_0422-1024x683.jpg`,
  },
  fellows: {
    miriam: `${EPL_MEDIA}/2025/10/CSRAW56-scaled-e1760539041848.jpg`,
    priscilla: `${EPL_MEDIA}/2025/10/CSP96-scaled-e1760539888346.jpeg`,
    anita: `${EPL_MEDIA}/2025/10/CSP64-scaled-e1760540014318.jpeg`,
  },
} as const

export type ProjectSlug = keyof typeof eplHomeImages.projects

const flagshipProjectSlugs = new Set<string>(Object.keys(eplHomeImages.projects))

export function getProjectFallbackImage(slug: string): string | null {
  if (slug in eplHomeImages.projects) {
    return eplHomeImages.projects[slug as ProjectSlug]
  }
  return null
}

/** Curated live-site images for the three flagship programmes (override CMS until media is uploaded). */
export function resolveProjectImage(slug: string, cmsImage: string | null): string | null {
  if (flagshipProjectSlugs.has(slug)) {
    return getProjectFallbackImage(slug) ?? cmsImage
  }
  return cmsImage ?? getProjectFallbackImage(slug)
}
