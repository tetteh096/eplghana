import type { Payload } from 'payload'

import { directorMessageContent } from '@/config/aboutSectionContent'

import { updatePageBySlug } from '../utils'

const TAG = 'director-message'

export async function seedDirectorMessage(payload: Payload): Promise<void> {
  const directorMessage = {
    name: directorMessageContent.name,
    role: directorMessageContent.role,
    eyebrow: directorMessageContent.eyebrow,
    title: directorMessageContent.title,
    greeting: directorMessageContent.greeting,
    paragraphs: directorMessageContent.paragraphs.map((text) => ({ text })),
    pullQuote: directorMessageContent.pullQuote,
    signoff: directorMessageContent.signoff,
    teamCtaLabel: 'Meet Our Team',
    teamCtaUrl: '/about/team',
  }

  await updatePageBySlug(payload, '/about/director-message', { directorMessage }, TAG)
}
