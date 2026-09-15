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
  title: string
  subtitle: string
  name: string
  detail: string
  detailLabel: string
  note?: string
  badge: string
  logo: string
  /** CSS tone class suffix; use `momo` for MTN-style cards (duplicate MTN in CMS for more options). */
  logoTone: 'momo'
}

export const donatePageContent = {
  hero: {
    eyebrow: 'Support Our Work',
    title: 'Support Our Mission',
    lead:
      'EPL Ghana depends on contributions from generous partners like you. Your gift helps develop ethical public leaders who strengthen Ghana’s institutions and serve the public good.',
    image: eplHomeImages.heroHome,
    primaryCtaLabel: 'Give Now',
    primaryCtaHref: '#ways-to-give',
    secondaryCtaLabel: 'Contact Us',
    secondaryCtaHref: '/contact',
  },
  why: {
    eyebrow: 'Why Give',
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
    eyebrow: 'Secure & Convenient',
    title: 'Ways to Give',
    intro: 'Pay online with card, or transfer directly via mobile money or bank.',
    transferLabel: 'Or transfer directly',
    bank: {
      code: 'Bank Transfer',
      title: 'GCB Bank',
      description: 'Transfer in Ghana Cedis or US Dollars.',
      accountName: 'Emerging Public Leaders of Ghana',
      accountNumberGhs: '1681180006278',
      accountNumberUsd: '1681600002975',
      branch: 'Airport City',
      bankName: 'GCB Bank',
      swift: 'GHCBGHACXXX',
      sortCode: '040168',
      note: 'Include your full name as the transfer reference. Email confirmation to info@eplghana.org.',
    },
    momo: {
      code: 'Mobile Money',
      title: 'Mobile Money',
      description: 'Send via MTN MoMo.',
      note: 'Confirm the recipient name before authorizing payment.',
      logo: '/brands/mtn-momo-mark.png',
      options: [
        {
          title: 'MTN Mobile Money',
          subtitle: 'Send via MoMo',
          name: 'Emerging Public Leaders of Ghana',
          detail: '624190',
          detailLabel: 'Merchant ID',
          badge: 'MTN MoMo',
          logo: '/brands/mtn-momo-mark.png',
          logoTone: 'momo',
        },
      ] satisfies DonateMomoOption[],
    },
    card: {
      code: 'Online',
      title: 'Pay Online with Card',
      description:
        'Complete your donation through our secure Paystack checkout — cards, mobile money, and more.',
      statusLabel: 'Recommended',
      acceptedCards: 'Visa · Mastercard · Mobile Money',
      currencies: 'GHS · USD',
      ctaLabel: 'Donate Securely',
      ctaHref: '#tiers',
      securedBy: 'Paystack',
      brands: [
        { name: 'Visa', src: '/brands/visa.svg' },
        { name: 'Mastercard', src: '/brands/mastercard.svg' },
        { name: 'Paystack', src: '/brands/paystack.svg' },
      ],
    },
  },
  tiers: {
    eyebrow: 'Your Impact',
    title: 'The Impact of Your Support',
    intro: 'Select an amount below or enter a custom gift to view payment options.',
    items: [
      {
        label: '$100',
        amountDisplay: '$100',
        amountGhs: 'GHS 1,500',
        amountUsd: 'USD 100',
        description: "Supports one Fellow's learning materials for a month",
      },
      {
        label: '$500',
        amountDisplay: '$500',
        amountGhs: 'GHS 7,500',
        amountUsd: 'USD 500',
        description: "Sponsors one Fellow's participation in a leadership convening",
      },
      {
        label: '$2,500',
        amountDisplay: '$2,500',
        amountGhs: 'GHS 37,500',
        amountUsd: 'USD 2,500',
        description: 'Provides substantial support toward one fellowship placement',
      },
      {
        label: '$10,000',
        amountDisplay: '$10,000',
        amountGhs: 'GHS 150,000',
        amountUsd: 'USD 10,000',
        description: "Sponsors an entire cohort's mentorship programme",
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
  questions: {
    title: 'Questions About Donating?',
    text: "We're happy to discuss how your contribution can make the greatest impact.",
    primaryLabel: 'Contact Us',
    primaryHref: '/contact',
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
