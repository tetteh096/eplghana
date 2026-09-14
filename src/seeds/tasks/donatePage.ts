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
    waysIntro: d.ways.intro,
    transferLabel: d.ways.transferLabel,
    bankTitle: d.ways.bank.title,
    bankAccountName: d.ways.bank.accountName,
    bankAccountGhs: d.ways.bank.accountNumberGhs,
    bankAccountUsd: d.ways.bank.accountNumberUsd,
    bankName: d.ways.bank.bankName,
    bankBranch: d.ways.bank.branch,
    bankSwift: d.ways.bank.swift,
    bankSortCode: d.ways.bank.sortCode,
    bankNote: d.ways.bank.note,
    momoOptions: d.ways.momo.options,
    cardCode: d.ways.card.code,
    cardTitle: d.ways.card.title,
    cardDescription: d.ways.card.description,
    cardStatusLabel: d.ways.card.statusLabel,
    cardCtaLabel: d.ways.card.ctaLabel,
    cardCtaUrl: d.ways.card.ctaHref,
    tiersEyebrow: d.tiers.eyebrow,
    tiersTitle: d.tiers.title,
    tierItems: d.tiers.items.map((t) => ({
      label: t.label,
      amountDisplay: t.amountDisplay,
      amountGhs: t.amountGhs,
      amountUsd: t.amountUsd,
      description: t.description,
      isCustom: Boolean(t.isCustom),
    })),
    questionsTitle: d.questions.title,
    questionsText: d.questions.text,
    questionsPrimaryLabel: d.questions.primaryLabel,
    questionsPrimaryUrl: d.questions.primaryHref,
    questionsSecondaryLabel: d.questions.secondaryLabel,
    questionsSecondaryUrl: d.questions.secondaryHref,
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
