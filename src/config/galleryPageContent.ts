import { EPL_MEDIA, eplHomeImages } from '@/config/eplMedia'

export type GalleryCategory =
  | 'events'
  | 'training'
  | 'programmes'
  | 'fellows-community'

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  events: 'Events',
  training: 'Training',
  programmes: 'Programmes',
  'fellows-community': 'Fellows Community Engagement',
}

export type GalleryPhoto = {
  id: string
  title: string
  caption?: string
  image: string
}

export type GalleryAlbum = {
  id: string
  slug: string
  title: string
  category: GalleryCategory
  categoryLabel: string
  description: string
  coverImage: string
  photos: GalleryPhoto[]
}

export const galleryPageContent = {
  hero: {
    eyebrow: 'Media & Highlights',
    title: 'Photo & Event Gallery',
    lead:
      'Visual snapshots of our Fellows in action, leadership summits, regional community engagements, and training workshops.',
    image: eplHomeImages.aboutMain,
  },
  albumsSection: {
    eyebrow: 'Organized Albums',
    title: 'Photo Folders & Collections',
  },
  albumCtaLabel: 'Open Album',
  photosSection: {
    eyebrow: 'Album Photos',
    emptyText: 'No photos in this album yet.',
  },
  albums: [
    {
      id: 'alb-1',
      slug: 'events-annual-summits',
      title: 'Events & Annual Summits',
      category: 'events' as const,
      categoryLabel: 'Events',
      description:
        'Flagship convenings, public leadership forums, and annual fellow induction ceremonies.',
      coverImage: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
      photos: [
        {
          id: 'p-1',
          title: 'EPL Annual Leadership Forum Panel Dialogue',
          image: `${EPL_MEDIA}/2025/10/CSOE-45-scaled.jpg`,
        },
        {
          id: 'p-2',
          title: 'Women in Governance Leadership Roundtable',
          image: `${EPL_MEDIA}/2023/12/MG_0422-scaled.jpg`,
        },
        {
          id: 'p-3',
          title: 'Fellows at Annual Leadership Convening',
          image: `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`,
        },
      ],
    },
    {
      id: 'alb-2',
      slug: 'executive-training-workshops',
      title: 'Executive Training Workshops',
      category: 'training' as const,
      categoryLabel: 'Training',
      description:
        'Public policy masterclasses, ethics seminars, and digital governance workshops.',
      coverImage: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
      photos: [
        {
          id: 'p-4',
          title: 'Public Policy Analysis Working Group Session',
          image: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
        },
        {
          id: 'p-5',
          title: 'Civil Service Training Centre Interactive Workshop',
          image: `${EPL_MEDIA}/2025/10/CSP96-scaled-e1760539888346.jpeg`,
        },
        {
          id: 'p-6',
          title: 'Digital Data & Record Keeping Training Hackathon',
          image: `${EPL_MEDIA}/2025/07/CSG-1024x683.jpg`,
        },
      ],
    },
    {
      id: 'alb-3',
      slug: 'fellowship-programmes',
      title: 'Fellowship Programmes',
      category: 'programmes' as const,
      categoryLabel: 'Programmes',
      description:
        'Placement orientations, cohort gatherings, and graduation celebrations across Ghana.',
      coverImage: `${EPL_MEDIA}/2025/10/CSRAW56-scaled-e1760539041848.jpg`,
      photos: [
        {
          id: 'p-7',
          title: 'Cohort 8 Induction & Placement Briefing',
          image: `${EPL_MEDIA}/2025/10/CSRAW56-scaled-e1760539041848.jpg`,
        },
        {
          id: 'p-8',
          title: 'Fellows Graduation & Certificate Presentation Ceremony',
          image: `${EPL_MEDIA}/2025/10/CSG-21-scaled.jpg`,
        },
        {
          id: 'p-9',
          title: 'Cohort Gathering & Mentorship Circle',
          image: `${EPL_MEDIA}/2025/07/CSG-32-scaled.jpg`,
        },
      ],
    },
    {
      id: 'alb-4',
      slug: 'fellows-community-engagement',
      title: 'Fellows Community Engagement',
      category: 'fellows-community' as const,
      categoryLabel: 'Fellows Community Engagement',
      description:
        'Field surveys, regional sanitation audits, and district assembly outreach initiatives.',
      coverImage: `${EPL_MEDIA}/2025/10/CSP64-scaled-e1760540014318.jpeg`,
      photos: [
        {
          id: 'p-10',
          title: 'Greater Accra Municipal Outreach & Field Survey',
          image: `${EPL_MEDIA}/2025/10/CSP64-scaled-e1760540014318.jpeg`,
        },
        {
          id: 'p-11',
          title: 'Fellows Collaboration at Ministry Placement Desk',
          image: `${EPL_MEDIA}/2025/10/IMG_7245-scaled.jpg`,
        },
        {
          id: 'p-12',
          title: 'District Assembly Community Engagement Day',
          image: `${EPL_MEDIA}/2025/10/CSOE-56-scaled.jpg`,
        },
      ],
    },
  ] satisfies GalleryAlbum[],
}
