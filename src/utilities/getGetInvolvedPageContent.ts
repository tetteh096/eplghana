import { getInvolvedPageContent } from '@/config/getInvolvedContent'
import { getPage } from '@/utilities/getPage'

export type GetInvolvedPageContent = typeof getInvolvedPageContent

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)

/**
 * Get Involved landing page copy from Pages → getInvolvedPage with config fallback.
 */
export async function getGetInvolvedPageContent(): Promise<GetInvolvedPageContent> {
  const d = getInvolvedPageContent
  const page = await getPage('/get-involved')
  const cms = (page?.getInvolvedPage ?? {}) as Record<string, unknown>

  return {
    eyebrow: txt(cms.heroEyebrow ?? cms.eyebrow, d.eyebrow),
    title: txt(cms.fellowshipTitle ?? cms.title, d.title),
    body: txt(cms.fellowshipDescription ?? cms.body, d.body),
    primaryCta: {
      label: txt(cms.primaryCtaLabel ?? cms.fellowshipCtaLabel, d.primaryCta.label),
      href: txt(cms.primaryCtaUrl, d.primaryCta.href),
    },
    secondaryCta: {
      label: txt(cms.secondaryCtaLabel, d.secondaryCta.label),
      href: txt(cms.secondaryCtaUrl, d.secondaryCta.href),
    },
  }
}
