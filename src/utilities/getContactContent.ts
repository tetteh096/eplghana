import { contactPageContent } from '@/config/contactPageContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'

export type ContactPageContent = typeof contactPageContent

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)

/**
 * Contact page content with CMS (Pages → Contact) values layered over defaults.
 */
export async function getContactContent(): Promise<ContactPageContent> {
  const page = await getPage('/contact')
  const c = ((page as Record<string, any> | null)?.contact ?? {}) as Record<string, any>
  const d = contactPageContent

  const heroImage = getMediaUrl(c?.hero?.image) || d.hero.image

  return {
    hero: {
      eyebrow: txt(c?.hero?.eyebrow, d.hero.eyebrow),
      title: txt(c?.hero?.title, d.hero.title),
      lead: txt(c?.hero?.lead, d.hero.lead),
      image: heroImage,
    },
    hq: {
      eyebrow: txt(c?.hq?.eyebrow ?? c?.visit?.eyebrow, d.hq.eyebrow),
      title: txt(c?.hq?.title, d.hq.title),
      locationLabel: txt(c?.hq?.locationLabel ?? c?.visit?.addressLabel, d.hq.locationLabel),
      emailLabel: txt(c?.hq?.emailLabel ?? c?.visit?.emailLabel, d.hq.emailLabel),
      phoneLabel: txt(c?.hq?.phoneLabel ?? c?.visit?.phoneLabel, d.hq.phoneLabel),
      hoursLabel: txt(c?.hq?.hoursLabel ?? c?.hub?.hoursLabel, d.hq.hoursLabel),
      hoursValue: txt(c?.hq?.hoursValue ?? c?.hub?.hoursValue, d.hq.hoursValue),
    },
    form: {
      title: txt(c?.form?.title ?? c?.formsSection?.title, d.form.title),
      intro: txt(c?.form?.intro ?? c?.formsSection?.intro, d.form.intro),
      submitLabel: txt(c?.form?.submitLabel ?? c?.forms?.general?.submitLabel, d.form.submitLabel),
      successTitle: txt(c?.form?.successTitle, d.form.successTitle),
      successText: txt(c?.form?.successText, d.form.successText),
      privacyLabel: txt(c?.form?.privacyLabel, d.form.privacyLabel),
      privacyHref: txt(c?.form?.privacyHref, d.form.privacyHref),
    },
    map: {
      title: txt(c?.map?.title ?? c?.visit?.title, d.map.title),
      embedUrl: txt(c?.map?.embedUrl ?? c?.mapEmbedUrl, d.map.embedUrl),
      note: txt(c?.map?.note ?? c?.visit?.note, d.map.note),
    },
  }
}
