import { contactPageContent } from '@/config/contactPageContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'

export type ContactPageContent = typeof contactPageContent

type RawLink = { label?: string | null; href?: string | null }

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)

/**
 * Contact page content with CMS (Pages → Contact) values layered over defaults.
 */
export async function getContactContent(): Promise<ContactPageContent> {
  const page = await getPage('/contact')
  const c = ((page as Record<string, any> | null)?.contact ?? {}) as Record<string, any>
  const d = contactPageContent

  const heroImage = getMediaUrl(c?.hero?.image) || d.hero.image
  const quickLinks: RawLink[] = Array.isArray(c?.hero?.quickLinks) ? c.hero.quickLinks : []

  return {
    hero: {
      eyebrow: txt(c?.hero?.eyebrow, d.hero.eyebrow),
      title: txt(c?.hero?.title, d.hero.title),
      lead: txt(c?.hero?.lead, d.hero.lead),
      image: heroImage,
      quickLinks: quickLinks.length
        ? quickLinks
            .filter((l) => l?.label && l?.href)
            .map((l) => ({ label: l.label as string, href: l.href as string }))
        : d.hero.quickLinks,
    },
    hub: {
      eyebrow: txt(c?.hub?.eyebrow, d.hub.eyebrow),
      responseLabel: txt(c?.hub?.responseLabel, d.hub.responseLabel),
      responseValue: txt(c?.hub?.responseValue, d.hub.responseValue),
      hoursLabel: txt(c?.hub?.hoursLabel, d.hub.hoursLabel),
      hoursValue: txt(c?.hub?.hoursValue, d.hub.hoursValue),
      hqLabel: txt(c?.hub?.hqLabel, d.hub.hqLabel),
      hqValue: txt(c?.hub?.hqValue, d.hub.hqValue),
    },
    channels: {
      phone: {
        eyebrow: txt(c?.channels?.phoneEyebrow, d.channels.phone.eyebrow),
        title: txt(c?.channels?.phoneTitle, d.channels.phone.title),
        text: txt(c?.channels?.phoneText, d.channels.phone.text),
        ctaLabel: txt(c?.channels?.phoneCtaLabel, d.channels.phone.ctaLabel),
      },
      email: {
        eyebrow: txt(c?.channels?.emailEyebrow, d.channels.email.eyebrow),
        title: txt(c?.channels?.emailTitle, d.channels.email.title),
        text: txt(c?.channels?.emailText, d.channels.email.text),
        ctaLabel: txt(c?.channels?.emailCtaLabel, d.channels.email.ctaLabel),
      },
      visit: {
        eyebrow: txt(c?.channels?.visitEyebrow, d.channels.visit.eyebrow),
        title: txt(c?.channels?.visitTitle, d.channels.visit.title),
        text: txt(c?.channels?.visitText, d.channels.visit.text),
        ctaLabel: txt(c?.channels?.visitCtaLabel, d.channels.visit.ctaLabel),
      },
    },
    visit: {
      eyebrow: txt(c?.visit?.eyebrow, d.visit.eyebrow),
      title: txt(c?.visit?.title, d.visit.title),
      description: txt(c?.visit?.description, d.visit.description),
      addressLabel: txt(c?.visit?.addressLabel, d.visit.addressLabel),
      phoneLabel: txt(c?.visit?.phoneLabel, d.visit.phoneLabel),
      emailLabel: txt(c?.visit?.emailLabel, d.visit.emailLabel),
      note: txt(c?.visit?.note, d.visit.note),
    },
    mapEmbedUrl: txt(c?.mapEmbedUrl, d.mapEmbedUrl),
    formsSection: {
      eyebrow: txt(c?.formsSection?.eyebrow, d.formsSection.eyebrow),
      title: txt(c?.formsSection?.title, d.formsSection.title),
      intro: txt(c?.formsSection?.intro, d.formsSection.intro),
    },
    forms: {
      general: {
        ...d.forms.general,
        eyebrow: txt(c?.forms?.general?.eyebrow, d.forms.general.eyebrow),
        title: txt(c?.forms?.general?.title, d.forms.general.title),
        description: txt(c?.forms?.general?.description, d.forms.general.description),
        submitLabel: txt(c?.forms?.general?.submitLabel, d.forms.general.submitLabel),
      },
      partnership: {
        ...d.forms.partnership,
        eyebrow: txt(c?.forms?.partnership?.eyebrow, d.forms.partnership.eyebrow),
        title: txt(c?.forms?.partnership?.title, d.forms.partnership.title),
        description: txt(c?.forms?.partnership?.description, d.forms.partnership.description),
        submitLabel: txt(c?.forms?.partnership?.submitLabel, d.forms.partnership.submitLabel),
      },
    },
  }
}
