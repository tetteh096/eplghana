import type { Payload } from 'payload'

import { donatePageContent } from '@/config/donatePageContent'

import { createImageImporter, updatePageBySlug } from '../utils'

const TAG = 'donate-page'

export async function seedDonatePage(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)
  const d = donatePageContent

  const donatePage = {
    heroEyebrow: d.hero.eyebrow,
    heroTitle: d.hero.title,
    heroLead: d.hero.lead,
    heroImage: await importImage(d.hero.image, 'Support EPL Ghana'),
    heroPrimaryCtaLabel: d.hero.primaryCtaLabel,
    heroPrimaryCtaUrl: d.hero.primaryCtaHref,
    heroSecondaryCtaLabel: d.hero.secondaryCtaLabel,
    heroSecondaryCtaUrl: d.hero.secondaryCtaHref,
    whyEyebrow: d.why.eyebrow,
    whyTitle: d.why.title,
    whyReasons: d.why.reasons,
    waysEyebrow: d.ways.eyebrow,
    waysTitle: d.ways.title,
    bankCode: d.ways.bank.code,
    bankTitle: d.ways.bank.title,
    bankDescription: d.ways.bank.description,
    bankAccountName: d.ways.bank.accountName,
    bankAccountGhs: d.ways.bank.accountNumberGhs,
    bankAccountUsd: d.ways.bank.accountNumberUsd,
    bankBranch: d.ways.bank.branch,
    bankSwift: d.ways.bank.swift,
    bankNote: d.ways.bank.note,
    momoCode: d.ways.momo.code,
    momoTitle: d.ways.momo.title,
    momoDescription: d.ways.momo.description,
    momoNote: d.ways.momo.note,
    momoOptions: d.ways.momo.options,
    cardCode: d.ways.card.code,
    cardTitle: d.ways.card.title,
    cardDescription: d.ways.card.description,
    cardStatusLabel: d.ways.card.statusLabel,
    cardAccepted: d.ways.card.acceptedCards,
    cardCurrencies: d.ways.card.currencies,
    cardCtaLabel: d.ways.card.ctaLabel,
    cardCtaUrl: d.ways.card.ctaHref,
    tiersEyebrow: d.tiers.eyebrow,
    tiersTitle: d.tiers.title,
    tiersIntro: d.tiers.intro,
    tierItems: d.tiers.items.map((t) => ({
      label: t.label,
      amountDisplay: t.amountDisplay,
      amountGhs: t.amountGhs,
      amountUsd: t.amountUsd,
      description: t.description,
      isCustom: Boolean(t.isCustom),
    })),
    pledgeEyebrow: d.pledge.eyebrow,
    pledgeTitle: d.pledge.title,
    pledgeDescription: d.pledge.description,
    pledgeSubmitLabel: d.pledge.submitLabel,
    pledgeSuccessTitle: d.pledge.successTitle,
    pledgeSuccessText: d.pledge.successText,
    pledgeChannels: d.pledge.channels.map((label) => ({ label })),
  }

  await updatePageBySlug(payload, '/donate', { donatePage }, TAG)
}
