import {
  donatePageContent,
  type DonateMomoOption,
  type DonateReason,
  type DonateTier,
} from '@/config/donatePageContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'

export type DonatePageContent = typeof donatePageContent

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

/**
 * Donate / Support page: copy and giving details from Pages → donatePage.
 */
export async function getDonatePageContent(): Promise<DonatePageContent> {
  const d = donatePageContent
  const page = await getPage('/donate')
  const cms = ((page as Record<string, any> | null)?.donatePage ?? {}) as Record<string, any>

  const reasons: DonateReason[] =
    Array.isArray(cms.whyReasons) && cms.whyReasons.length
      ? cms.whyReasons.map((r: any) => ({
          title: txt(r?.title, ''),
          text: txt(r?.text, ''),
        }))
      : d.why.reasons

  const momoOptions: DonateMomoOption[] =
    Array.isArray(cms.momoOptions) && cms.momoOptions.length
      ? cms.momoOptions.map((o: any) => ({
          name: txt(o?.name, ''),
          detail: txt(o?.detail, ''),
          note: o?.note?.trim() || undefined,
          badge: txt(o?.badge, ''),
        }))
      : d.ways.momo.options

  const tiers: DonateTier[] =
    Array.isArray(cms.tierItems) && cms.tierItems.length
      ? cms.tierItems.map((t: any) => ({
          label: txt(t?.label, ''),
          amountDisplay: txt(t?.amountDisplay, ''),
          amountGhs: txt(t?.amountGhs, ''),
          amountUsd: txt(t?.amountUsd, ''),
          description: txt(t?.description, ''),
          isCustom: Boolean(t?.isCustom),
        }))
      : d.tiers.items

  const channels =
    Array.isArray(cms.pledgeChannels) && cms.pledgeChannels.length
      ? cms.pledgeChannels.map((c: any) => txt(c?.label, '')).filter(Boolean)
      : d.pledge.channels

  return {
    hero: {
      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
      title: txt(cms.heroTitle, d.hero.title),
      lead: txt(cms.heroLead, d.hero.lead),
      image: img(cms.heroImage, d.hero.image) as (typeof d.hero.image),
      primaryCtaLabel: txt(cms.heroPrimaryCtaLabel, d.hero.primaryCtaLabel),
      primaryCtaHref: txt(cms.heroPrimaryCtaUrl, d.hero.primaryCtaHref),
      secondaryCtaLabel: txt(cms.heroSecondaryCtaLabel, d.hero.secondaryCtaLabel),
      secondaryCtaHref: txt(cms.heroSecondaryCtaUrl, d.hero.secondaryCtaHref),
    },
    why: {
      eyebrow: txt(cms.whyEyebrow, d.why.eyebrow),
      title: txt(cms.whyTitle, d.why.title),
      reasons,
    },
    ways: {
      eyebrow: txt(cms.waysEyebrow, d.ways.eyebrow),
      title: txt(cms.waysTitle, d.ways.title),
      bank: {
        code: txt(cms.bankCode, d.ways.bank.code),
        title: txt(cms.bankTitle, d.ways.bank.title),
        description: txt(cms.bankDescription, d.ways.bank.description),
        accountName: txt(cms.bankAccountName, d.ways.bank.accountName),
        accountNumberGhs: txt(cms.bankAccountGhs, d.ways.bank.accountNumberGhs),
        accountNumberUsd: txt(cms.bankAccountUsd, d.ways.bank.accountNumberUsd),
        branch: txt(cms.bankBranch, d.ways.bank.branch),
        swift: txt(cms.bankSwift, d.ways.bank.swift),
        note: txt(cms.bankNote, d.ways.bank.note),
      },
      momo: {
        code: txt(cms.momoCode, d.ways.momo.code),
        title: txt(cms.momoTitle, d.ways.momo.title),
        description: txt(cms.momoDescription, d.ways.momo.description),
        note: txt(cms.momoNote, d.ways.momo.note),
        options: momoOptions,
      },
      card: {
        code: txt(cms.cardCode, d.ways.card.code),
        title: txt(cms.cardTitle, d.ways.card.title),
        description: txt(cms.cardDescription, d.ways.card.description),
        statusLabel: txt(cms.cardStatusLabel, d.ways.card.statusLabel),
        acceptedCards: txt(cms.cardAccepted, d.ways.card.acceptedCards),
        currencies: txt(cms.cardCurrencies, d.ways.card.currencies),
        ctaLabel: txt(cms.cardCtaLabel, d.ways.card.ctaLabel),
        ctaHref: txt(cms.cardCtaUrl, d.ways.card.ctaHref),
      },
    },
    tiers: {
      eyebrow: txt(cms.tiersEyebrow, d.tiers.eyebrow),
      title: txt(cms.tiersTitle, d.tiers.title),
      intro: txt(cms.tiersIntro, d.tiers.intro),
      items: tiers,
    },
    pledge: {
      eyebrow: txt(cms.pledgeEyebrow, d.pledge.eyebrow),
      title: txt(cms.pledgeTitle, d.pledge.title),
      description: txt(cms.pledgeDescription, d.pledge.description),
      submitLabel: txt(cms.pledgeSubmitLabel, d.pledge.submitLabel),
      successTitle: txt(cms.pledgeSuccessTitle, d.pledge.successTitle),
      successText: txt(cms.pledgeSuccessText, d.pledge.successText),
      channels,
    },
    modal: d.modal,
  } as DonatePageContent
}
