import {
  currentFellowsPageContent,
  type CurrentFellow,
} from '@/config/currentFellowsContent'
import type { Fellow } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { toPlain } from '@/utilities/toPlain'

export type FellowHighlight = {
  name: string
  institution: string
  title: string
  body: string
  photo: string
}

export type CurrentFellowsPageContent = {
  hero: (typeof currentFellowsPageContent)['hero']
  highlights: {
    eyebrow: string
    title: string
    items: FellowHighlight[]
  }
  cohort: {
    label: string
    count: number
    description: string
  }
  cta: (typeof currentFellowsPageContent)['cta']
  fellows: CurrentFellow[]
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

function fellowPhotoFallback(name: string, configPhoto?: string): string {
  if (configPhoto) return configPhoto
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0a3d6b&textColor=ffffff&fontSize=38`
}

function mapFellowDoc(doc: Fellow, configFallback?: CurrentFellow): CurrentFellow {
  return {
    id: String(doc.id),
    name: doc.name,
    institution: doc.institution,
    photo: getMediaUrl(doc.photo) ?? fellowPhotoFallback(doc.name, configFallback?.photo),
    bio: doc.bio?.trim() || configFallback?.bio || '',
    highlightTitle: doc.highlightTitle?.trim() || undefined,
    email: doc.email ?? undefined,
    phone: doc.phone ?? undefined,
    linkedin: doc.linkedin ?? undefined,
    twitter: doc.twitter ?? undefined,
    featuredOnPage: Boolean(doc.featuredOnPage),
  }
}

/**
 * Current Fellows page: static copy from Pages → currentFellowsPage; directory
 * from the Fellows collection with config fallback.
 */
export async function getCurrentFellowsContent(): Promise<CurrentFellowsPageContent> {
  const d = currentFellowsPageContent
  const page = await getPage('/community/current-fellows')
  const cms = (page?.currentFellowsPage ?? {}) as Record<string, any>

  let fellows: CurrentFellow[] = d.fellows.map((f) => ({ ...f, bio: '', featuredOnPage: false }))
  let highlights = d.highlights

  const payload = await tryGetPayload()
  if (payload) {
    try {
      const result = await payload.find({
        collection: 'fellows',
        depth: 1,
        limit: 200,
        sort: 'order',
        where: { status: { equals: 'published' } },
      })
      const docs = (toPlain(result.docs) as Fellow[] | null) ?? []
      if (docs.length > 0) {
        fellows = docs.map((doc) => {
          const fallback = d.fellows.find((f) => f.name === doc.name)
          return mapFellowDoc(doc, fallback)
        })

        const featured = fellows.filter((f) => f.featuredOnPage)
        if (featured.length > 0) {
          highlights = featured.map((f) => ({
            name: f.name,
            institution: f.institution,
            title: f.highlightTitle || f.institution,
            body: f.bio || '',
            photo: f.photo,
          }))
        }
      }
    } catch {
      // keep config fallback
    }
  }

  const cohortCount =
    typeof cms.cohortCount === 'number' && cms.cohortCount > 0
      ? cms.cohortCount
      : fellows.length

  return {
    hero: {
      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
      title: txt(cms.heroTitle, d.hero.title),
      lead: txt(cms.heroLead, d.hero.lead),
      image: img(cms.heroImage, d.hero.image),
      secondaryImage: img(cms.heroSecondaryImage, d.hero.secondaryImage),
    },
    highlights: {
      eyebrow: txt(cms.highlightsEyebrow, 'Fellows Highlight'),
      title: txt(cms.highlightsTitle, 'Leaders making impact'),
      items: highlights,
    },
    cohort: {
      label: txt(cms.cohortLabel, d.cohort.label),
      count: cohortCount,
      description: txt(
        cms.cohortDescription,
        'Cohort VII is embedded across ministries, commissions, and public agencies, driving integrity and innovation where it matters most.',
      ),
    },
    cta: {
      title: txt(cms.ctaTitle, d.cta.title),
      body: txt(cms.ctaBody, d.cta.body),
      ctaLabel: txt(cms.ctaLabel, d.cta.ctaLabel),
      ctaHref: txt(cms.ctaUrl, d.cta.ctaHref),
      image: img(cms.ctaImage, d.cta.image),
    },
    fellows,
  }
}
