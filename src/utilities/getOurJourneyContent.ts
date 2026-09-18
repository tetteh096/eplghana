import { ourJourneyContent } from '@/config/ourJourneyContent'
import { teamMembers } from '@/config/teamPageContent'
import type { Team } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type JourneyEntry = {
  year: string
  title: string
  body: string
  statLine?: string
  asideNote?: string
  highlight?: string
}

export type OurJourneyContent = {
  hero: { eyebrow: string; title: string; subtitle: string }
  entries: JourneyEntry[]
  quote: {
    eyebrow: string
    headline: string
    paragraphs: string[]
    photo?: string
    name: string
    role: string
  }
  cta: {
    title: string
    body: string
    primaryLabel: string
    primaryUrl: string
    secondaryLabel: string
    secondaryUrl: string
  }
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const opt = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim() ? v : undefined

const journeyAsideNote = (v: unknown): string | undefined => {
  const value = opt(v)
  return value === 'Sharper focus. Immediate public sector contribution.' ? undefined : value
}

const fallbackDirector = teamMembers.find((m) => m.id === 'exec-director')

/**
 * "Our Journey" timeline page: copy from Pages → ourJourney, merged over
 * static defaults. The director quote's name/photo fall back to the Team
 * collection (Country Director role) when left blank in the CMS.
 */
export async function getOurJourneyContent(): Promise<OurJourneyContent> {
  const page = await getPage('/about/our-journey')
  const cms = (page?.ourJourney ?? {}) as Record<string, any>
  const d = ourJourneyContent

  const hero = {
    eyebrow: txt(cms.eyebrow ?? cms.hero?.eyebrow, d.hero.eyebrow),
    title: txt(cms.title ?? cms.hero?.title, d.hero.title),
    subtitle: txt(cms.subtitle ?? cms.hero?.subtitle, d.hero.subtitle),
  }

  const entries: JourneyEntry[] =
    Array.isArray(cms.entries) && cms.entries.length
      ? cms.entries.map((entry: any) => ({
          year: txt(entry?.year, ''),
          title: txt(entry?.title, ''),
          body: txt(entry?.body, ''),
          statLine: opt(entry?.statLine),
          asideNote: journeyAsideNote(entry?.asideNote),
          highlight: opt(entry?.highlight),
        }))
      : d.entries

  let name = d.quote.name
  let role = d.quote.role
  let photo: string | undefined

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
        photo = getMediaUrl(doc.photo) ?? undefined
      }
    } catch {
      if (fallbackDirector) {
        name = fallbackDirector.name
        role = fallbackDirector.role
        photo = fallbackDirector.photo
      }
    }
  } else if (fallbackDirector) {
    name = fallbackDirector.name
    role = fallbackDirector.role
    photo = fallbackDirector.photo
  }

  const cmsPhoto = getMediaUrl(cms.photo)
  if (cmsPhoto) photo = cmsPhoto
  if (typeof cms.name === 'string' && cms.name.trim()) name = cms.name.trim()
  if (typeof cms.role === 'string' && cms.role.trim()) role = cms.role.trim()

  const quoteParagraphs: string[] =
    Array.isArray(cms.quoteParagraphs) && cms.quoteParagraphs.length
      ? cms.quoteParagraphs.map((p: any) => p?.text).filter(Boolean)
      : [...d.quote.paragraphs]

  return {
    hero,
    entries,
    quote: {
      eyebrow: txt(cms.quoteEyebrow, d.quote.eyebrow),
      headline: txt(cms.quoteHeadline, d.quote.headline),
      paragraphs: quoteParagraphs,
      photo,
      name,
      role,
    },
    cta: {
      title: txt(cms.ctaTitle, d.cta.title),
      body: txt(cms.ctaBody, d.cta.body),
      primaryLabel: txt(cms.ctaPrimaryLabel, d.cta.primaryLabel),
      primaryUrl: txt(cms.ctaPrimaryUrl, d.cta.primaryUrl),
      secondaryLabel: txt(cms.ctaSecondaryLabel, d.cta.secondaryLabel),
      secondaryUrl: txt(cms.ctaSecondaryUrl, d.cta.secondaryUrl),
    },
  }
}
