import {
  donatePageContent,
  type DonateMomoOption,
  type DonateReason,
  type DonateTier,
} from '@/config/donatePageContent'
import { getMediaUrl, resolveMediaUrl } from '@/utilities/getMediaUrl'
import { getPage } from '@/utilities/getPage'
import { tryGetPayload } from '@/utilities/payloadSafe'

export type DonatePageContent = typeof donatePageContent

const txt = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)
const img = (v: unknown, d: string) => getMediaUrl(v as any) || d

/**
 * Donate page content from Pages → donatePage, layered over donatePageContent defaults.
 */
export async function getDonatePageContent(): Promise<DonatePageContent> {
  const d = donatePageContent
  const page = await getPage('/donate')
  const cms = ((page as Record<string, any> | null)?.donatePage ?? {}) as Record<string, any>
  const payload = await tryGetPayload()

  const reasons: DonateReason[] =
    Array.isArray(cms.whyReasons) && cms.whyReasons.length
      ? cms.whyReasons.map((r: any) => ({
          title: txt(r?.title, ''),
          text: txt(r?.text, ''),
        }))
      : d.why.reasons

  const momoOptions: DonateMomoOption[] =
    Array.isArray(cms.momoOptions) && cms.momoOptions.length
      ? cms.momoOptions
          .map((opt: any, i: number) => {
            const fb = d.ways.momo.options[i] ?? d.ways.momo.options[0]
            return {
              title: txt(opt?.title, fb?.title ?? ''),
              subtitle: txt(opt?.subtitle, fb?.subtitle ?? ''),
              name: txt(opt?.name, fb?.name ?? ''),
              detail: txt(opt?.detail, fb?.detail ?? ''),
              detailLabel: txt(opt?.detailLabel, fb?.detailLabel ?? 'Merchant ID'),
              note: (typeof opt?.note === 'string' && opt.note.trim()) || undefined,
              badge: txt(opt?.badge, fb?.badge ?? ''),
              logo: txt(opt?.logo, fb?.logo ?? d.ways.momo.logo),
              logoTone: 'momo' as const,
            }
          })
          .filter(
            (opt) =>
              opt.title &&
              !/telecel/i.test(opt.title) &&
              !/telecel/i.test(opt.badge) &&
              !/\bat\s*money\b/i.test(opt.title) &&
              !/\bat\s*money\b/i.test(opt.badge),
          )
      : d.ways.momo.options

  // If CMS only had Telecel/AT (filtered out), fall back to MTN default
  const resolvedMomoOptions = momoOptions.length ? momoOptions : d.ways.momo.options

  const tiers: DonateTier[] =
    Array.isArray(cms.tierItems) && cms.tierItems.length
      ? cms.tierItems.map((t: any, i: number) => {
          const fb = d.tiers.items[i] ?? d.tiers.items[0]
          return {
            label: txt(t?.label, fb?.label ?? ''),
            amountDisplay: txt(t?.amountDisplay, fb?.amountDisplay ?? ''),
            amountGhs: txt(t?.amountGhs, fb?.amountGhs ?? ''),
            amountUsd: txt(t?.amountUsd, fb?.amountUsd ?? ''),
            description: txt(t?.description, fb?.description ?? ''),
            isCustom: Boolean(t?.isCustom),
          }
        })
      : d.tiers.items

  const channels =
    Array.isArray(cms.pledgeChannels) && cms.pledgeChannels.length
      ? cms.pledgeChannels
          .map((c: any) => txt(c?.label, ''))
          .filter(Boolean)
          // Drop legacy Telecel / AT rows still sitting in older CMS docs
          .filter(
            (label) =>
              !/telecel/i.test(label) && !/^at\s*money$/i.test(label) && !/\bat money\b/i.test(label),
          )
      : d.pledge.channels

  const heroFromCms =
    (await resolveMediaUrl(cms.heroImage, payload)) || img(cms.heroImage, '') || ''

  return {
    hero: {
      eyebrow: txt(cms.heroEyebrow, d.hero.eyebrow),
      title: txt(cms.heroTitle, d.hero.title),
      lead: txt(cms.heroLead, d.hero.lead),
      image: heroFromCms || d.hero.image,
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
      intro: txt(cms.waysIntro, d.ways.intro),
      transferLabel: txt(cms.transferLabel, d.ways.transferLabel),
      bank: {
        code: d.ways.bank.code,
        title: txt(cms.bankTitle, d.ways.bank.title),
        description: d.ways.bank.description,
        accountName: txt(cms.bankAccountName, d.ways.bank.accountName),
        accountNumberGhs: txt(cms.bankAccountGhs, d.ways.bank.accountNumberGhs),
        accountNumberUsd: txt(cms.bankAccountUsd, d.ways.bank.accountNumberUsd),
        branch: txt(cms.bankBranch, d.ways.bank.branch),
        bankName: txt(cms.bankName, d.ways.bank.bankName),
        swift: txt(cms.bankSwift, d.ways.bank.swift),
        sortCode: txt(cms.bankSortCode, d.ways.bank.sortCode),
        note: txt(cms.bankNote, d.ways.bank.note),
      },
      momo: {
        code: d.ways.momo.code,
        title: d.ways.momo.title,
        description: d.ways.momo.description,
        note: d.ways.momo.note,
        logo: d.ways.momo.logo,
        options: resolvedMomoOptions,
      },
      card: {
        code: txt(cms.cardCode, d.ways.card.code),
        title: txt(cms.cardTitle, d.ways.card.title),
        description: txt(cms.cardDescription, d.ways.card.description),
        statusLabel: txt(cms.cardStatusLabel, d.ways.card.statusLabel),
        acceptedCards: d.ways.card.acceptedCards,
        currencies: d.ways.card.currencies,
        ctaLabel: txt(cms.cardCtaLabel, d.ways.card.ctaLabel),
        ctaHref: txt(cms.cardCtaUrl, d.ways.card.ctaHref),
        securedBy: d.ways.card.securedBy,
        brands: d.ways.card.brands,
      },
    },
    tiers: {
      eyebrow: txt(cms.tiersEyebrow, d.tiers.eyebrow),
      title: txt(cms.tiersTitle, d.tiers.title),
      intro: d.tiers.intro,
      items: tiers,
    },
    questions: {
      title: txt(cms.questionsTitle, d.questions.title),
      text: txt(cms.questionsText, d.questions.text),
      primaryLabel: txt(cms.questionsPrimaryLabel, d.questions.primaryLabel),
      primaryHref: txt(cms.questionsPrimaryUrl, d.questions.primaryHref),
      secondaryLabel: txt(cms.questionsSecondaryLabel, d.questions.secondaryLabel),
      secondaryHref: txt(cms.questionsSecondaryUrl, d.questions.secondaryHref),
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
