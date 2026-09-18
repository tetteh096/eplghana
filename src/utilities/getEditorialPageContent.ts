import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'

export type EditorialHero = {
  eyebrow: string
  title: string
  lead: string
  image?: string
}

const value = (input: unknown, fallback: string): string =>
  typeof input === 'string' && input.trim() ? input.trim() : fallback

export async function getEditorialHero(
  slug: string,
  group: string,
  fallback: EditorialHero,
): Promise<EditorialHero> {
  const page = await getPage(slug)
  const content = (page?.[group] ?? {}) as Record<string, unknown>
  return {
    eyebrow: value(content.heroEyebrow, fallback.eyebrow),
    title: value(content.heroTitle, fallback.title),
    lead: value(content.heroLead, fallback.lead),
    image: getMediaUrl(content.heroImage as any) || fallback.image,
  }
}

export async function getPrivacyPageContent() {
  const page = await getPage('/privacy')
  const content = (page?.privacyPage ?? {}) as Record<string, unknown>
  const defaults = [
    ['Information We Collect', 'When you contact us, participate in our programmes, or interact with our website, we may collect information such as your name, email address, phone number and other details that you voluntarily provide.'],
    ['How We Use Your Information', 'Information provided to EPL Ghana may be used to respond to enquiries, communicate about programmes and opportunities, improve our services, and maintain our relationship with our community and partners.'],
    ['Protection of Your Information', 'We take reasonable steps to protect information entrusted to us and to prevent unauthorized access, disclosure, alteration or misuse.'],
    ['Sharing of Information', 'We do not intentionally sell personal information. Where information needs to be shared with trusted service providers or partners, we aim to do so only where appropriate and necessary for the relevant service or programme.'],
    ['Your Choices', 'You may contact EPL Ghana if you have questions about information you have provided, wish to update your details, or have concerns about how your information is being used.'],
    ['Contact Us', 'If you have any questions about this Privacy Note, please contact us at info@eplghana.org.'],
  ].map(([title, body]) => ({ title, body }))
  const sections = Array.isArray(content.sections)
    ? content.sections
        .map((section) => section as Record<string, unknown>)
        .filter((section) => typeof section.title === 'string' && typeof section.body === 'string')
        .map((section) => ({ title: String(section.title), body: String(section.body) }))
    : []

  return {
    hero: await getEditorialHero('/privacy', 'privacyPage', {
      eyebrow: 'Privacy',
      title: 'Privacy Note',
      lead: 'Your privacy matters to us. This note explains how EPL Ghana collects, uses and protects information shared through our website.',
    }),
    sections: sections.length ? sections : defaults,
    backLabel: value(content.backLabel, 'Back to Contact'),
    backUrl: value(content.backUrl, '/contact'),
  }
}
