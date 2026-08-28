import {
  boardMembers as fallbackBoard,
  staffMembers as fallbackStaff,
  teamMembers,
  teamPageIntro,
  type TeamMember,
} from '@/config/teamPageContent'
import type { Team } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type TeamPageContent = {
  intro: typeof teamPageIntro
  boardMembers: TeamMember[]
  staffMembers: TeamMember[]
}

function teamPhotoFallback(name: string): string {
  const fromStatic = teamMembers.find((m) => m.name === name)?.photo
  if (fromStatic) return fromStatic

  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0a3d6b&textColor=ffffff&fontSize=38`
}

function mapTeamDoc(doc: Team): TeamMember {
  return {
    id: String(doc.id),
    name: doc.name,
    role: doc.role,
    bio: doc.bio?.trim() || '',
    photo: getMediaUrl(doc.photo) ?? teamPhotoFallback(doc.name),
    email: doc.email ?? undefined,
    phone: doc.phone ?? undefined,
    linkedin: doc.linkedin ?? undefined,
    twitter: doc.twitter ?? undefined,
    group: doc.group,
  }
}

/**
 * Our Team page: intro from Pages → Our Team; members from the Team collection
 * with static fallbacks when the DB is empty or unavailable.
 */
export async function getTeamContent(): Promise<TeamPageContent> {
  const page = await getPage('/about/team')
  const teamPage = (page?.team ?? {}) as Record<string, string | null | undefined>

  const intro = {
    eyebrow: teamPage.eyebrow?.trim() || teamPageIntro.eyebrow,
    title: teamPage.title?.trim() || teamPageIntro.title,
    description: teamPage.description?.trim() || teamPageIntro.description,
  }

  const payload = await tryGetPayload()
  if (!payload) {
    return {
      intro,
      boardMembers: fallbackBoard,
      staffMembers: fallbackStaff,
    }
  }

  try {
    const result = await payload.find({
      collection: 'team',
      depth: 1,
      limit: 100,
      sort: 'order',
      where: { status: { equals: 'published' } },
    })

    const docs = (toPlain(result.docs) as Team[] | null) ?? []
    if (docs.length === 0) {
      return {
        intro,
        boardMembers: fallbackBoard,
        staffMembers: fallbackStaff,
      }
    }

    const members = docs.map(mapTeamDoc)
    return {
      intro,
      boardMembers: members.filter((m) => m.group === 'board'),
      staffMembers: members.filter((m) => m.group === 'team'),
    }
  } catch {
    return {
      intro,
      boardMembers: fallbackBoard,
      staffMembers: fallbackStaff,
    }
  }
}
