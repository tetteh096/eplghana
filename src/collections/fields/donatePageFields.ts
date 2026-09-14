import type { Field } from 'payload'

import { donatePageContent as d } from '@/config/donatePageContent'

/**
 * CMS fields for the live Donate page (`/donate`).
 * MoMo options: MTN only by default — duplicate the MTN row in CMS to add more networks.
 */
export const donatePageFields: Field[] = [
  {
    type: 'group',
    name: 'donatePage',
    label: 'Donate page',
    admin: {
      condition: (data) => data?.slug === '/donate',
      description:
        'Edits the live Donate page: Hero, Why Give, Ways to Give (card / MoMo / bank), Impact tiers, Questions, and Pledge form.',
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
        label: 'Why Give',
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
        label: 'Ways to Give',
        fields: [
          { name: 'waysEyebrow', type: 'text', defaultValue: d.ways.eyebrow },
          { name: 'waysTitle', type: 'text', defaultValue: d.ways.title },
          { name: 'waysIntro', type: 'textarea', defaultValue: d.ways.intro },
          { name: 'transferLabel', type: 'text', defaultValue: d.ways.transferLabel },
          {
            type: 'collapsible',
            label: 'Online / Card (Paystack)',
            fields: [
              { name: 'cardStatusLabel', type: 'text', defaultValue: d.ways.card.statusLabel },
              { name: 'cardCode', type: 'text', defaultValue: d.ways.card.code },
              { name: 'cardTitle', type: 'text', defaultValue: d.ways.card.title },
              { name: 'cardDescription', type: 'textarea', defaultValue: d.ways.card.description },
              { name: 'cardCtaLabel', type: 'text', defaultValue: d.ways.card.ctaLabel },
              { name: 'cardCtaUrl', type: 'text', defaultValue: d.ways.card.ctaHref },
            ],
          },
          {
            type: 'collapsible',
            label: 'Mobile Money options',
            admin: {
              description:
                'Default is MTN only. Duplicate the MTN row and edit title/detail/logo to add Telecel, AT Money, etc.',
            },
            fields: [
              {
                name: 'momoOptions',
                type: 'array',
                labels: { singular: 'MoMo option', plural: 'MoMo options' },
                defaultValue: d.ways.momo.options,
                fields: [
                  { name: 'title', type: 'text', required: true },
                  { name: 'subtitle', type: 'text' },
                  { name: 'name', type: 'text', required: true, label: 'Merchant name' },
                  { name: 'detail', type: 'text', required: true, label: 'ID / number' },
                  { name: 'detailLabel', type: 'text', label: 'Detail label (e.g. Merchant ID)' },
                  { name: 'badge', type: 'text', required: true },
                  {
                    name: 'logo',
                    type: 'text',
                    admin: {
                      description: 'Public path, e.g. /brands/mtn-momo-mark.png',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'collapsible',
            label: 'Bank transfer (GCB)',
            fields: [
              { name: 'bankTitle', type: 'text', defaultValue: d.ways.bank.title },
              { name: 'bankBranch', type: 'text', defaultValue: d.ways.bank.branch },
              { name: 'bankAccountName', type: 'text', defaultValue: d.ways.bank.accountName },
              { name: 'bankAccountGhs', type: 'text', defaultValue: d.ways.bank.accountNumberGhs },
              { name: 'bankAccountUsd', type: 'text', defaultValue: d.ways.bank.accountNumberUsd },
              { name: 'bankName', type: 'text', defaultValue: d.ways.bank.bankName },
              { name: 'bankSwift', type: 'text', defaultValue: d.ways.bank.swift },
              { name: 'bankSortCode', type: 'text', defaultValue: d.ways.bank.sortCode },
              { name: 'bankNote', type: 'textarea', defaultValue: d.ways.bank.note },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Your Impact (tiers)',
        fields: [
          { name: 'tiersEyebrow', type: 'text', defaultValue: d.tiers.eyebrow },
          { name: 'tiersTitle', type: 'text', defaultValue: d.tiers.title },
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
        label: 'Questions band',
        fields: [
          { name: 'questionsTitle', type: 'text', defaultValue: d.questions.title },
          { name: 'questionsText', type: 'textarea', defaultValue: d.questions.text },
          { name: 'questionsPrimaryLabel', type: 'text', defaultValue: d.questions.primaryLabel },
          { name: 'questionsPrimaryUrl', type: 'text', defaultValue: d.questions.primaryHref },
          {
            name: 'questionsSecondaryLabel',
            type: 'text',
            defaultValue: d.questions.secondaryLabel,
          },
          {
            name: 'questionsSecondaryUrl',
            type: 'text',
            defaultValue: d.questions.secondaryHref,
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
            admin: {
              description: 'Preferred giving channel dropdown options (no Telecel / AT by default).',
            },
            defaultValue: d.pledge.channels.map((label) => ({ label })),
            fields: [{ name: 'label', type: 'text', required: true }],
          },
        ],
      },
    ],
  },
]
