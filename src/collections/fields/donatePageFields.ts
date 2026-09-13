import type { Field } from 'payload'

import { donatePageContent as d } from '@/config/donatePageContent'

/** Donate / Support page copy and giving details. */
export const donatePageFields: Field[] = [
  {
    type: 'group',
    name: 'donatePage',
    label: 'Donate page',
    admin: {
      condition: (data) => data?.slug === '/donate',
      description:
        'Hero, why support, bank / MoMo / card details, support tiers, and pledge form labels.',
    },
    fields: [
      {
        type: 'collapsible',
        label: 'Hero',
        fields: [
          { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
          { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
          { name: 'heroLead', type: 'textarea', defaultValue: d.hero.lead },
          { name: 'heroImage', type: 'upload', relationTo: 'media' },
          { name: 'heroPrimaryCtaLabel', type: 'text', defaultValue: d.hero.primaryCtaLabel },
          { name: 'heroPrimaryCtaUrl', type: 'text', defaultValue: d.hero.primaryCtaHref },
          { name: 'heroSecondaryCtaLabel', type: 'text', defaultValue: d.hero.secondaryCtaLabel },
          { name: 'heroSecondaryCtaUrl', type: 'text', defaultValue: d.hero.secondaryCtaHref },
        ],
      },
      {
        type: 'collapsible',
        label: 'Why support matters',
        fields: [
          { name: 'whyEyebrow', type: 'text', defaultValue: d.why.eyebrow },
          { name: 'whyTitle', type: 'text', defaultValue: d.why.title },
          {
            name: 'whyReasons',
            type: 'array',
            defaultValue: d.why.reasons,
            fields: [
              { name: 'title', type: 'text', required: true },
              { name: 'text', type: 'textarea', required: true },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Ways to give',
        fields: [
          { name: 'waysEyebrow', type: 'text', defaultValue: d.ways.eyebrow },
          { name: 'waysTitle', type: 'text', defaultValue: d.ways.title },
          { name: 'bankCode', type: 'text', defaultValue: d.ways.bank.code },
          { name: 'bankTitle', type: 'text', defaultValue: d.ways.bank.title },
          { name: 'bankDescription', type: 'textarea', defaultValue: d.ways.bank.description },
          { name: 'bankAccountName', type: 'text', defaultValue: d.ways.bank.accountName },
          { name: 'bankAccountGhs', type: 'text', defaultValue: d.ways.bank.accountNumberGhs },
          { name: 'bankAccountUsd', type: 'text', defaultValue: d.ways.bank.accountNumberUsd },
          { name: 'bankName', type: 'text', defaultValue: d.ways.bank.bankName },
          { name: 'bankBranch', type: 'text', defaultValue: d.ways.bank.branch },
          { name: 'bankSwift', type: 'text', defaultValue: d.ways.bank.swift },
          { name: 'bankSortCode', type: 'text', defaultValue: d.ways.bank.sortCode },
          { name: 'bankNote', type: 'text', defaultValue: d.ways.bank.note },
          { name: 'momoCode', type: 'text', defaultValue: d.ways.momo.code },
          { name: 'momoTitle', type: 'text', defaultValue: d.ways.momo.title },
          { name: 'momoDescription', type: 'textarea', defaultValue: d.ways.momo.description },
          { name: 'momoNote', type: 'text', defaultValue: d.ways.momo.note },
          { name: 'momoLogo', type: 'text', defaultValue: d.ways.momo.logo },
          {
            name: 'momoOptions',
            type: 'array',
            defaultValue: d.ways.momo.options,
            fields: [
              { name: 'title', type: 'text', required: true },
              { name: 'subtitle', type: 'text' },
              { name: 'name', type: 'text', required: true },
              { name: 'detail', type: 'text', required: true },
              { name: 'detailLabel', type: 'text' },
              { name: 'note', type: 'text' },
              { name: 'badge', type: 'text', required: true },
              { name: 'logo', type: 'text' },
              {
                name: 'logoTone',
                type: 'select',
                options: [
                  { label: 'MoMo', value: 'momo' },
                  { label: 'Telecel', value: 'telecel' },
                  { label: 'AT Money', value: 'at' },
                ],
              },
            ],
          },
          { name: 'cardCode', type: 'text', defaultValue: d.ways.card.code },
          { name: 'cardTitle', type: 'text', defaultValue: d.ways.card.title },
          { name: 'cardDescription', type: 'textarea', defaultValue: d.ways.card.description },
          { name: 'cardStatusLabel', type: 'text', defaultValue: d.ways.card.statusLabel },
          { name: 'cardAccepted', type: 'text', defaultValue: d.ways.card.acceptedCards },
          { name: 'cardCurrencies', type: 'text', defaultValue: d.ways.card.currencies },
          { name: 'cardCtaLabel', type: 'text', defaultValue: d.ways.card.ctaLabel },
          { name: 'cardCtaUrl', type: 'text', defaultValue: d.ways.card.ctaHref },
        ],
      },
      {
        type: 'collapsible',
        label: 'Support tiers',
        fields: [
          { name: 'tiersEyebrow', type: 'text', defaultValue: d.tiers.eyebrow },
          { name: 'tiersTitle', type: 'text', defaultValue: d.tiers.title },
          { name: 'tiersIntro', type: 'textarea', defaultValue: d.tiers.intro },
          {
            name: 'tierItems',
            type: 'array',
            defaultValue: d.tiers.items.map((t) => ({
              label: t.label,
              amountDisplay: t.amountDisplay,
              amountGhs: t.amountGhs,
              amountUsd: t.amountUsd,
              description: t.description,
              isCustom: Boolean(t.isCustom),
            })),
            fields: [
              { name: 'label', type: 'text', required: true },
              { name: 'amountDisplay', type: 'text', required: true },
              { name: 'amountGhs', type: 'text', required: true },
              { name: 'amountUsd', type: 'text', required: true },
              { name: 'description', type: 'textarea', required: true },
              { name: 'isCustom', type: 'checkbox', defaultValue: false },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Pledge form',
        fields: [
          { name: 'pledgeEyebrow', type: 'text', defaultValue: d.pledge.eyebrow },
          { name: 'pledgeTitle', type: 'text', defaultValue: d.pledge.title },
          { name: 'pledgeDescription', type: 'textarea', defaultValue: d.pledge.description },
          { name: 'pledgeSubmitLabel', type: 'text', defaultValue: d.pledge.submitLabel },
          { name: 'pledgeSuccessTitle', type: 'text', defaultValue: d.pledge.successTitle },
          { name: 'pledgeSuccessText', type: 'textarea', defaultValue: d.pledge.successText },
          {
            name: 'pledgeChannels',
            type: 'array',
            defaultValue: d.pledge.channels.map((label) => ({ label })),
            fields: [{ name: 'label', type: 'text', required: true }],
          },
        ],
      },
    ],
  },
]
