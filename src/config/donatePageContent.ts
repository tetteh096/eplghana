import { eplHomeImages } from '@/config/eplMedia'

export type DonateReason = { title: string; text: string }

export type DonateTier = {
  label: string
  amountDisplay: string
  amountGhs: string
  amountUsd: string
  description: string
  isCustom?: boolean
}

export type DonateMomoOption = {
  name: string
  detail: string
  note?: string
  badge: string
}

export const donatePageContent = {
  hero: {
    eyebrow: 'Support EPL Ghana',
    title: 'Support Stronger Public Leadership',
    lead:
      "Your contribution helps EPL develop ethical, capable public leaders who strengthen Ghana's institutions and serve the public good.",
    image: eplHomeImages.aboutMain,
    primaryCtaLabel: '',
    primaryCtaHref: '#ways-to-give',
    secondaryCtaLabel: '',
    secondaryCtaHref: '#pledge',
  },
  why: {
    eyebrow: 'Why Support Matters',
    title: 'Why Your Support Matters',
    reasons: [
      {
        title: 'Leadership Development',
        text: "Funding the training, workshops and mentorship that develop Fellows' capabilities",
      },
      {
        title: 'Fellow Support',
        text: 'Enabling Fellows to focus fully on their public service placements',
      },
      {
        title: 'Community & Networks',
        text: 'Building the peer networks and alumni connections that amplify impact',
      },
      {
        title: 'Research & Knowledge',
        text: 'Generating insights that improve public service across Ghana',
      },
      {
        title: 'Programme Delivery',
        text: "Supporting end-to-end delivery of EPL's flagship fellowship",
      },
    ] satisfies DonateReason[],
  },
  ways: {
    eyebrow: 'Ways to Give',
    title: 'Direct Channels for Giving',
    bank: {
      code: '01 · Bank Transfer',
      title: 'GCB Bank',
      description: 'Direct local bank transfer or domestic wire in Ghana Cedis.',
      accountName: 'Emerging Public Leaders of Ghana',
      accountNumberGhs: '1681180006278',
      accountNumberUsd: '1681600002975',
      branch: 'Airport City',
      swift: '',
      note: 'Please use your name or pledge as the transfer reference.',
    },
    momo: {
      code: '02 · Mobile Money',
      title: 'MoMo Details',
      description: 'Donate directly using Mobile Money.',
      note: 'Confirm the recipient name before authorizing payment.',
      options: [
        {
          name: 'Emerging Public Leaders of Ghana',
          detail: '0547218843',
          badge: 'Direct',
        },
      ] satisfies DonateMomoOption[],
    },
    card: {
      code: '03 · Online Card Payment',
      title: 'Debit & Credit Card',
      description:
        'Instant, 256-bit encrypted checkout supporting Visa, Mastercard, GHLink & International cards.',
      statusLabel: 'Secure Instant Checkout',
      acceptedCards: 'Visa, Mastercard, GHLink, Apple Pay',
      currencies: 'GHS (Ghana Cedis), USD ($), GBP (£), EUR (€)',
      ctaLabel: 'Pay by Card',
      ctaHref: '#tiers',
    },
  },
  tiers: {
    eyebrow: 'Support Tiers',
    title: 'The Impact of Your Support',
    intro: 'Select an amount below or enter a customized gift to view payment options.',
    items: [
      {
        label: '$1,000',
        amountDisplay: '1,000',
        amountGhs: 'GHS 15,000',
        amountUsd: 'USD 1,000',
        description: 'Supports leadership training for one Fellow',
      },
      {
        label: '$2,000',
        amountDisplay: '2,000',
        amountGhs: 'GHS 30,000',
        amountUsd: 'USD 2,000',
        description: 'Helps fund a mentorship programme',
      },
      {
        label: '$5,000',
        amountDisplay: '5,000',
        amountGhs: 'GHS 75,000',
        amountUsd: 'USD 5,000',
        description: 'Contributes to research and publications',
      },
      {
        label: '$10,000',
        amountDisplay: '10,000',
        amountGhs: 'GHS 150,000',
        amountUsd: 'USD 10,000',
        description: 'Supports programme delivery for a cohort',
      },
      {
        label: 'Custom',
        amountDisplay: 'Custom',
        amountGhs: 'GHS Custom',
        amountUsd: 'USD Custom',
        description: 'Give any amount to support public service leadership',
        isCustom: true,
      },
    ] satisfies DonateTier[],
  },
  pledge: {
    eyebrow: 'Pledge Form',
    title: 'Make a Pledge',
    description:
      'Complete the form below and our team will follow up to facilitate receipt confirmation.',
    submitLabel: 'Submit Pledge',
    successTitle: 'Thank You for Your Support',
    successText:
      'Your pledge has been received. Our team will be in touch within 48 hours to confirm the details and next steps.',
    channels: [
      'Debit / Credit Card (Online)',
      'Bank Transfer (GCB GHS)',
      'Bank Transfer (GCB USD $)',
      'MTN MoMo',
      'Telecel Cash',
      'AT Money',
      'Cheque / In-Person',
      'International Wire',
    ],
  },
  modal: {
    selectedLabel: 'Selected Contribution',
    methodLabel: 'Select how you want to give',
    recordLabel: 'Record Pledge',
    doneLabel: 'Done',
  },
}
