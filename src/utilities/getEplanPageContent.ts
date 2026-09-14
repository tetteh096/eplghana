import {
  alumniPageContent,
  alumniToTeamMember,
} from '@/config/alumniPageContent'
import type { Page } from '@/payload-types'
import { getMediaUrl, resolveMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'

export type EplanPageContent = typeof alumniPageContent

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

/**
 * EPLAN page content for the live layout (Hero → Vision → Mission → Executives → Sustain → Spotlight).
 * Unused keys stay on the type as static fallbacks for type compatibility.
 */
export async function getEplanPageContent(): Promise<EplanPageContent> {
  const d = alumniPageContent
  const page = await getPage('/community/eplan')
  const cms = ((page as Page | null)?.eplanPage ?? {}) as Record<string, any>
  const payload = await tryGetPayload()

  const heroHighlights =
    Array.isArray(cms.heroHighlights) && cms.heroHighlights.length
      ? cms.heroHighlights.map((stat: any) => ({
          value: txt(stat?.value, ''),
          label: txt(stat?.label, ''),
        }))
      : d.hero.highlights

  const executives =
    Array.isArray(cms.executivesItems) && cms.executivesItems.length
      ? cms.executivesItems.slice(0, 6).map((member: any, index: number) => {
          const role = txt(member?.role, d.executives.items[index]?.role ?? '')
          const rawName = txt(member?.name, d.executives.items[index]?.name ?? '')
          const name =
            !rawName || rawName.toLowerCase() === role.toLowerCase()
              ? 'Profile coming soon'
              : rawName
          return {
            id: member?.id ?? `eplan-executive-${index}`,
            name,
            role,
            bio: txt(member?.bio, d.executives.items[index]?.bio ?? ''),
            photo: img(member?.photo, d.executives.items[index]?.photo ?? ''),
            linkedin: txt(member?.linkedin, '') || undefined,
            twitter: txt(member?.twitter, '') || undefined,
            facebook: txt(member?.facebook, '') || undefined,
            instagram: txt(member?.instagram, '') || undefined,
          }
        })
      : d.executives.items

  const sustainPillars =
    Array.isArray(cms.sustainPillars) && cms.sustainPillars.length
      ? cms.sustainPillars.map((p: any) => ({
          num: txt(p?.num, ''),
          title: txt(p?.title, ''),
          description: txt(p?.description, ''),
        }))
      : d.sustain.pillars

  const content: EplanPageContent = {
    ...d,
    hero: {
      ...d.hero,
      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
      title: txt(cms.heroTitle, d.hero.title),
      lead: txt(cms.heroLead, d.hero.lead),
      image: img(cms.heroImage, d.hero.image),
      highlights: heroHighlights,
      primaryCta: {
        label: txt(cms.heroPrimaryCtaLabel, d.hero.primaryCta.label),
        href: txt(cms.heroPrimaryCtaUrl, d.hero.primaryCta.href),
      },
      secondaryCta: {
        label: txt(cms.heroSecondaryCtaLabel, d.hero.secondaryCta.label),
        href: txt(cms.heroSecondaryCtaUrl, d.hero.secondaryCta.href),
      },
    },
    vision: {
      ...d.vision,
      eyebrow: txt(cms.visionEyebrow, d.vision.eyebrow)
        .replace(/\s*driving\s*/i, ' ')
        .replace(/\s+/g, ' ')
        .trim() || d.vision.eyebrow,
      text: txt(cms.visionText, d.vision.text),
    },
    mission: {
      eyebrow: txt(cms.missionEyebrow, d.mission.eyebrow),
      text: txt(cms.missionText, d.mission.text),
    },
    executives: {
      eyebrow: txt(cms.executivesEyebrow, d.executives.eyebrow),
      title: txt(cms.executivesTitle, d.executives.title),
      intro: txt(cms.executivesIntro, d.executives.intro),
      items: executives,
    },
    sustain: {
      ...d.sustain,
      eyebrow: txt(cms.sustainEyebrow, d.sustain.eyebrow),
      title: txt(cms.sustainTitle, d.sustain.title),
      lead: txt(cms.sustainLead, d.sustain.lead),
      note: txt(cms.sustainNote, d.sustain.note),
      image: img(cms.sustainImage, d.sustain.image),
      imageAlt: txt(cms.sustainImageAlt, d.sustain.imageAlt),
      pillars: sustainPillars,
    },
    spotlight: {
      ...d.spotlight,
      eyebrow: txt(cms.spotlightEyebrow, d.spotlight.eyebrow),
      title: txt(cms.spotlightTitle, d.spotlight.title),
      intro: txt(cms.spotlightIntro, d.spotlight.intro),
      items:
        Array.isArray(cms.spotlightItems) && cms.spotlightItems.length
          ? cms.spotlightItems.map((item: any, index: number) => {
              const fallback = d.spotlight.items[index]
              return {
                tag: txt(item?.tag, fallback?.tag ?? ''),
                title: txt(item?.title, fallback?.title ?? ''),
                description: txt(item?.description, fallback?.description ?? ''),
                image: img(item?.image, fallback?.image ?? ''),
                href: txt(item?.href, fallback?.href ?? '/news'),
              }
            })
          : d.spotlight.items,
      supportCta: {
        label: txt(cms.spotlightSupportCtaLabel, d.spotlight.supportCta.label),
        href: txt(cms.spotlightSupportCtaUrl, d.spotlight.supportCta.href),
      },
    },
  }

  // Prefer resolved media IDs / uploads from CMS when available (incl. local /api/media/file/).
  const heroFromCms =
    (await resolveMediaUrl(cms.heroImage, payload)) || getMediaUrl(cms.heroImage) || ''
  if (heroFromCms) content.hero.image = heroFromCms

  const sustainFromCms =
    (await resolveMediaUrl(cms.sustainImage, payload)) || getMediaUrl(cms.sustainImage) || ''
  if (sustainFromCms) content.sustain.image = sustainFromCms

  if (Array.isArray(cms.spotlightItems) && cms.spotlightItems.length) {
    content.spotlight.items = await Promise.all(
      cms.spotlightItems.map(async (item: any, index: number) => {
        const fallback = d.spotlight.items[index] ?? d.spotlight.items[0]
        const resolved =
          (await resolveMediaUrl(item?.image, payload)) || getMediaUrl(item?.image) || ''
        return {
          tag: txt(item?.tag, fallback?.tag ?? ''),
          title: txt(item?.title, fallback?.title ?? ''),
          description: txt(item?.description, fallback?.description ?? ''),
          image: resolved || fallback?.image || '',
          href: txt(item?.href, fallback?.href ?? '/news'),
        }
      }),
    )
  }

  if (Array.isArray(cms.executivesItems) && cms.executivesItems.length && payload) {
    content.executives.items = await Promise.all(
      content.executives.items.map(async (member, index) => {
        const raw = cms.executivesItems[index]
        const resolved =
          (await resolveMediaUrl(raw?.photo, payload)) || getMediaUrl(raw?.photo) || ''
        return resolved ? { ...member, photo: resolved } : member
      }),
    )
  }

  return content
}

export { alumniToTeamMember }
