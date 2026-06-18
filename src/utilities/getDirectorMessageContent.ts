import { directorMessageContent } from '@/config/aboutSectionContent'
import { teamMembers } from '@/config/teamPageContent'
import type { Team } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type DirectorMessageContent = {
  eyebrow: string
  title: string
  name: string
  role: string
  photo: string
  email?: string
  linkedin?: string
  greeting: string
  paragraphs: string[]
  signoff: string
  pullQuote: string
  teamCta: { label: string; href: string }
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)

const fallbackDirector = teamMembers.find((m) => m.id === 'exec-director')

function directorPhotoFallback(name: string): string {
  const fromStatic = teamMembers.find((m) => m.name === name)?.photo
  if (fromStatic) return fromStatic

  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0a3d6b&textColor=ffffff&fontSize=38`
}

/**
 * Country Director message: copy and optional portrait from Pages →
 * directorMessage; blank name/photo/contact fall back to the Team collection
 * (Country Director role), then config defaults.
 */
export async function getDirectorMessageContent(): Promise<DirectorMessageContent> {
  const page = await getPage('/about/director-message')
  const cms = (page?.directorMessage ?? {}) as Record<string, any>
  const d = directorMessageContent

  let name = d.name
  let role = d.role
  let photo = d.photo
  let email = d.email
  let linkedin = d.linkedin

  const payload = await tryGetPayload()
  if (payload) {
    try {
      const result = await payload.find({
        collection: 'team',
        depth: 1,
        limit: 1,
        sort: 'order',
        where: {
          and: [{ status: { equals: 'published' } }, { role: { equals: 'Country Director' } }],
        },
      })
      const doc = (toPlain(result.docs[0]) as Team | null) ?? null
      if (doc) {
        name = doc.name
        role = doc.role
        photo = getMediaUrl(doc.photo) ?? directorPhotoFallback(doc.name)
        email = doc.email ?? undefined
        linkedin = doc.linkedin ?? undefined
      }
    } catch {
      if (fallbackDirector) {
        name = fallbackDirector.name
        role = fallbackDirector.role
        photo = fallbackDirector.photo
        email = fallbackDirector.email
        linkedin = fallbackDirector.linkedin
      }
    }
  } else if (fallbackDirector) {
    name = fallbackDirector.name
    role = fallbackDirector.role
    photo = fallbackDirector.photo
    email = fallbackDirector.email
    linkedin = fallbackDirector.linkedin
  }

  const cmsPhoto = getMediaUrl(cms.photo)
  if (cmsPhoto) photo = cmsPhoto
  if (typeof cms.name === 'string' && cms.name.trim()) name = cms.name.trim()
  if (typeof cms.role === 'string' && cms.role.trim()) role = cms.role.trim()
  if (typeof cms.email === 'string' && cms.email.trim()) email = cms.email.trim()
  if (typeof cms.linkedin === 'string' && cms.linkedin.trim()) linkedin = cms.linkedin.trim()

  const paragraphs: string[] =
    Array.isArray(cms.paragraphs) && cms.paragraphs.length
      ? cms.paragraphs.map((p: any) => p?.text).filter(Boolean)
      : [...d.paragraphs]

  return {
    eyebrow: txt(cms.eyebrow, d.eyebrow),
    title: txt(cms.title, d.title),
    name,
    role,
    photo,
    email,
    linkedin,
    greeting: txt(cms.greeting, d.greeting),
    paragraphs,
    signoff: txt(cms.signoff, d.signoff),
    pullQuote: txt(cms.pullQuote, d.pullQuote),
    teamCta: {
      label: txt(cms.teamCtaLabel, 'Meet Our Team'),
      href: txt(cms.teamCtaUrl, '/about/team'),
    },
  }
}
