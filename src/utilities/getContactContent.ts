import { contactPageContent } from '@/config/contactPageContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'

type ContactContent = typeof contactPageContent

type RawLink = { label?: string | null; href?: string | null }

/**
 * Contact page content with CMS (Pages → Contact) values layered over the
 * hardcoded defaults in config/contactPageContent. Any field left blank in the
 * admin falls back to the default, so the page always renders fully.
 */
export async function getContactContent(): Promise<ContactContent> {
  const page = await getPage('/contact')
  const c = (page?.contact ?? {}) as Record<string, any>
  const d = contactPageContent

  const heroImage = getMediaUrl(c?.hero?.image) || d.hero.image
  const quickLinks: RawLink[] = Array.isArray(c?.hero?.quickLinks) ? c.hero.quickLinks : []

  return {
    hero: {
      eyebrow: c?.hero?.eyebrow || d.hero.eyebrow,
      title: c?.hero?.title || d.hero.title,
      lead: c?.hero?.lead || d.hero.lead,
      image: heroImage,
      quickLinks: quickLinks.length
        ? quickLinks
            .filter((l) => l?.label && l?.href)
            .map((l) => ({ label: l.label as string, href: l.href as string }))
        : d.hero.quickLinks,
    },
    visit: {
      eyebrow: c?.visit?.eyebrow || d.visit.eyebrow,
      title: c?.visit?.title || d.visit.title,
      description: c?.visit?.description || d.visit.description,
    },
    mapEmbedUrl: c?.mapEmbedUrl || d.mapEmbedUrl,
    formsSection: {
      eyebrow: c?.formsSection?.eyebrow || d.formsSection.eyebrow,
      title: c?.formsSection?.title || d.formsSection.title,
      intro: c?.formsSection?.intro || d.formsSection.intro,
    },
    forms: {
      general: {
        ...d.forms.general,
        eyebrow: c?.forms?.general?.eyebrow || d.forms.general.eyebrow,
        title: c?.forms?.general?.title || d.forms.general.title,
        description: c?.forms?.general?.description || d.forms.general.description,
        submitLabel: c?.forms?.general?.submitLabel || d.forms.general.submitLabel,
      },
      partnership: {
        ...d.forms.partnership,
        eyebrow: c?.forms?.partnership?.eyebrow || d.forms.partnership.eyebrow,
        title: c?.forms?.partnership?.title || d.forms.partnership.title,
        description: c?.forms?.partnership?.description || d.forms.partnership.description,
        submitLabel: c?.forms?.partnership?.submitLabel || d.forms.partnership.submitLabel,
      },
    },
  }
}
