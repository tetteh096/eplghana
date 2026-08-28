import { getInvolvedPageContent } from '@/config/getInvolvedContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { getSiteSettings } from '@/utilities/payloadSafe'

export type GetInvolvedPathway = {
  id: string
  title: string
  body: string
  bullets: string[]
  ctaLabel: string
  ctaHref: string
}

export type GetInvolvedPageContent = {
  hero: {
    eyebrow: string
    badge: string
    fellowshipTitle: string
    fellowshipDescription: string
    fellowshipCtaLabel: string
    image: string
    secondaryImage: string
    imageBadge: { value: string; label: string }
    highlights: { value: string; label: string }[]
    secondaryCta: { label: string; href: string }
  }
  pathwaysSection: { eyebrow: string; title: string }
  pathways: GetInvolvedPathway[]
  registerInterest: {
    eyebrow: string
    title: string
    description: string
    submitLabel: string
    points: string[]
  }
}

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as never) || d

function mapHeroBadge(raw: unknown, fallback: string): string {
  const badge = txt(raw, fallback)
  if (/applications open/i.test(badge)) return ''
  return badge
}

function mapPathways(raw: unknown, fallback: GetInvolvedPathway[]): GetInvolvedPathway[] {
  if (!Array.isArray(raw) || raw.length === 0) return fallback

  return raw.map((item, index) => {
    const row = item as Record<string, unknown>
    const bullets = Array.isArray(row.bullets)
      ? row.bullets
          .map((b) =>
            typeof b === 'object' && b && 'text' in b ? String((b as { text: string }).text) : '',
          )
          .filter(Boolean)
      : []

    const fb = fallback[index] ?? fallback[0]

    return {
      id: txt(row.anchorId, fb?.id ?? `pathway-${index}`),
      title: txt(row.title, fb?.title ?? ''),
      body: txt(row.body, fb?.body ?? ''),
      bullets: bullets.length > 0 ? bullets : (fb?.bullets ?? []),
      ctaLabel: txt(row.ctaLabel, fb?.ctaLabel ?? 'Learn more'),
      ctaHref: txt(row.ctaHref, fb?.ctaHref ?? '/contact'),
    }
  })
}

function mapPoints(raw: unknown, fallback: string[]): string[] {
  if (!Array.isArray(raw) || raw.length === 0) return fallback
  return raw
    .map((item) =>
      typeof item === 'object' && item && 'text' in item ? String((item as { text: string }).text) : '',
    )
    .filter(Boolean)
}

export async function getGetInvolvedPageContent(): Promise<GetInvolvedPageContent> {
  const d = getInvolvedPageContent
  const page = await getPage('/get-involved')
  const cms = (page?.getInvolvedPage ?? {}) as Record<string, unknown>
  const settings = await getSiteSettings(1)

  const highlights =
    Array.isArray(cms.heroHighlights) && cms.heroHighlights.length
      ? cms.heroHighlights.map((h: { value?: string; label?: string }) => ({
          value: h?.value ?? '',
          label: h?.label ?? '',
        }))
      : d.hero.highlights

  return {
    hero: {
      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
      badge: mapHeroBadge(cms.heroBadge, d.hero.badge),
      fellowshipTitle: txt(
        cms.fellowshipTitle,
        settings.fellowshipTitle ?? d.hero.fellowshipTitle,
      ),
      fellowshipDescription: txt(
        cms.fellowshipDescription,
        settings.fellowshipDescription ?? d.hero.fellowshipDescription,
      ),
      fellowshipCtaLabel: txt(
        cms.fellowshipCtaLabel,
        settings.fellowshipCtaLabel ?? d.hero.fellowshipCtaLabel,
      ),
      image: img(cms.heroImage, d.hero.image),
      secondaryImage: img(cms.heroSecondaryImage, d.hero.secondaryImage),
      imageBadge: {
        value: txt(cms.imageBadgeValue, d.hero.imageBadge.value),
        label: txt(cms.imageBadgeLabel, d.hero.imageBadge.label),
      },
      highlights,
      secondaryCta: {
        label: txt(cms.secondaryCtaLabel, d.hero.secondaryCta.label),
        href: txt(cms.secondaryCtaUrl, d.hero.secondaryCta.href),
      },
    },
    pathwaysSection: {
      eyebrow: txt(cms.pathwaysEyebrow, 'Ways to engage'),
      title: txt(cms.pathwaysTitle, 'Find your path with EPL Ghana'),
    },
    pathways: mapPathways(
      cms.pathways,
      d.pathways.map((p) => ({
        id: p.id,
        title: p.title,
        body: p.body,
        bullets: p.bullets,
        ctaLabel: p.ctaLabel,
        ctaHref: p.ctaHref,
      })),
    ),
    registerInterest: {
      eyebrow: txt(cms.registerEyebrow, d.registerInterest.eyebrow),
      title: txt(cms.registerTitle, d.registerInterest.title),
      description: txt(cms.registerDescription, d.registerInterest.description),
      submitLabel: txt(cms.registerSubmitLabel, d.registerInterest.submitLabel),
      points: mapPoints(cms.registerPoints, [
        'Get notified when the next fellowship cohort opens',
        'Receive fellowship events and briefing updates',
        'Connect with EPL Ghana’s recruitment team',
      ]),
    },
  }
}
