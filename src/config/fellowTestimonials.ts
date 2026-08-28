import { eplHomeImages } from '@/config/eplMedia'

export type FellowTestimonialSlide = {
  id: string
  name: string
  role: string
  quote: string
  photo: string
}

/** Fallback portraits from the live EPL Ghana site when CMS photos are not uploaded */
export const eplFellowTestimonialsMock: FellowTestimonialSlide[] = [
  {
    id: 'mock-1',
    name: 'Miriam Agumo',
    role: 'Fellow, Office of the Head of Civil Service',
    quote:
      'EPL Ghana has transformed how I see public service. The mentorship and leadership training helped me grow both professionally and personally.',
    photo: eplHomeImages.fellows.miriam,
  },
  {
    id: 'mock-2',
    name: 'Priscilla Elorm',
    role: 'Fellow',
    quote:
      'It’s truly inspiring to see how passionate young people are about public service. The programme has been an eye-opener, a continuous learning journey and a great platform to network and build meaningful friendships.',
    photo: eplHomeImages.fellows.priscilla,
  },
  {
    id: 'mock-3',
    name: 'Anita Elorm',
    role: 'Fellow, Office of the Head of Civil Service',
    quote:
      'Being part of EPL Ghana means being part of a community that believes in excellence, transparency, and impact. It’s more than a programme, it’s a lifelong network.',
    photo: eplHomeImages.fellows.anita,
  },
]
