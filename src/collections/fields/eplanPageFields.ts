import type { Field } from 'payload'

import { alumniPageContent } from '@/config/alumniPageContent'

const d = alumniPageContent

/** Static EPLAN page copy, alumni people come from the Alumni collection. */
export const eplanPageFields: Field[] = [
  {
    type: 'group',
    name: 'eplanPage',
    label: 'EPLAN page',
    admin: {
      condition: (data) => data?.slug === '/community/eplan',
      description:
        'Page copy and images. Alumni stories and featured graduates are managed in the Alumni collection; community photos below.',
    },
    fields: [
      {
        type: 'collapsible',
        label: 'Hero',
        fields: [
          { name: 'heroEyebrow', type: 'text', defaultValue: d.hero.eyebrow },
          { name: 'heroTitle', type: 'text', defaultValue: d.hero.title },
          { name: 'heroSubtitle', type: 'text', defaultValue: d.hero.subtitle },
          { name: 'heroLead', type: 'textarea', defaultValue: d.hero.lead },
          { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero image (primary)' },
          {
            name: 'heroSecondaryImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Hero image (secondary)',
          },
          { name: 'heroBadgeValue', type: 'text', defaultValue: d.hero.badge.value },
          { name: 'heroBadgeLabel', type: 'text', defaultValue: d.hero.badge.label },
          {
            name: 'heroHighlights',
            type: 'array',
            labels: { singular: 'Highlight', plural: 'Hero highlights' },
            defaultValue: d.hero.highlights,
            fields: [
              { name: 'value', type: 'text', required: true },
              { name: 'label', type: 'text', required: true },
            ],
          },
          { name: 'heroPrimaryCtaLabel', type: 'text', defaultValue: d.hero.primaryCta.label },
          { name: 'heroPrimaryCtaUrl', type: 'text', defaultValue: d.hero.primaryCta.href },
          { name: 'heroSecondaryCtaLabel', type: 'text', defaultValue: d.hero.secondaryCta.label },
          { name: 'heroSecondaryCtaUrl', type: 'text', defaultValue: d.hero.secondaryCta.href },
        ],
      },
      {
        type: 'collapsible',
        label: 'About EPLAN',
        fields: [
          { name: 'aboutEyebrow', type: 'text', defaultValue: d.eplanAbout.eyebrow },
          { name: 'aboutTitle', type: 'text', defaultValue: d.eplanAbout.title },
          {
            name: 'aboutParagraphs',
            type: 'array',
            labels: { singular: 'Paragraph', plural: 'About paragraphs' },
            defaultValue: d.eplanAbout.paragraphs.map((text) => ({ text })),
            fields: [{ name: 'text', type: 'textarea', required: true }],
          },
          { name: 'aboutImage', type: 'upload', relationTo: 'media' },
        ],
      },
      {
        type: 'collapsible',
        label: 'Vision',
        fields: [
          { name: 'visionEyebrow', type: 'text', defaultValue: d.vision.eyebrow },
          { name: 'visionTitle', type: 'text', defaultValue: d.vision.title },
          { name: 'visionText', type: 'textarea', defaultValue: d.vision.text },
        ],
      },
      {
        type: 'collapsible',
        label: 'Alumni impact stats',
        fields: [
          { name: 'impactEyebrow', type: 'text', defaultValue: d.impact.eyebrow },
          { name: 'impactTitle', type: 'text', defaultValue: d.impact.title },
          {
            name: 'impactStats',
            type: 'array',
            labels: { singular: 'Stat', plural: 'Impact stats' },
            defaultValue: d.impact.stats,
            fields: [
              { name: 'value', type: 'text', required: true },
              { name: 'label', type: 'text', required: true },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Flagship convening',
        fields: [
          { name: 'conveningEyebrow', type: 'text', defaultValue: d.convening.eyebrow },
          { name: 'conveningTitle', type: 'text', defaultValue: d.convening.title },
          { name: 'conveningBody', type: 'textarea', defaultValue: d.convening.body },
          { name: 'conveningImage', type: 'upload', relationTo: 'media' },
        ],
      },
      {
        type: 'collapsible',
        label: 'Global gathering',
        fields: [
          { name: 'globalEyebrow', type: 'text', defaultValue: d.globalGathering.eyebrow },
          { name: 'globalTitle', type: 'text', defaultValue: d.globalGathering.title },
          { name: 'globalLead', type: 'textarea', defaultValue: d.globalGathering.lead },
          { name: 'globalBody', type: 'textarea', defaultValue: d.globalGathering.body },
          {
            name: 'globalHighlights',
            type: 'array',
            labels: { singular: 'Bullet', plural: 'Global highlights' },
            defaultValue: d.globalGathering.highlights.map((text) => ({ text })),
            fields: [{ name: 'text', type: 'text', required: true }],
          },
          {
            name: 'globalImages',
            type: 'array',
            labels: { singular: 'Image', plural: 'Global showcase images' },
            fields: [
              { name: 'image', type: 'upload', relationTo: 'media', required: true },
              { name: 'alt', type: 'text', required: true },
              { name: 'caption', type: 'text' },
              {
                name: 'layout',
                type: 'select',
                defaultValue: 'standard',
                options: [
                  { label: 'Featured (wide)', value: 'featured' },
                  { label: 'Poster (contain)', value: 'poster' },
                  { label: 'Standard', value: 'standard' },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Alumni journey',
        fields: [
          { name: 'journeyEyebrow', type: 'text', defaultValue: d.journey.eyebrow },
          { name: 'journeyTitle', type: 'text', defaultValue: d.journey.title },
          { name: 'journeyIntro', type: 'textarea', defaultValue: d.journey.intro },
          {
            name: 'journeySteps',
            type: 'array',
            labels: { singular: 'Step', plural: 'Journey steps' },
            defaultValue: d.journey.steps,
            fields: [
              { name: 'step', type: 'text', required: true },
              { name: 'title', type: 'text', required: true },
              { name: 'description', type: 'textarea', required: true },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Alumni Stories section (headings only)',
        fields: [
          {
            name: 'storiesEyebrow',
            type: 'text',
            defaultValue: d.stories.eyebrow,
            admin: { description: 'Story cards come from the Alumni collection (Show in Alumni Stories).' },
          },
          { name: 'storiesTitle', type: 'text', defaultValue: d.stories.title },
          { name: 'storiesIntro', type: 'textarea', defaultValue: d.stories.intro },
        ],
      },
      {
        type: 'collapsible',
        label: 'Featured Graduates section (headings only)',
        fields: [
          {
            name: 'featuredEyebrow',
            type: 'text',
            defaultValue: d.featured.eyebrow,
            admin: {
              description: 'Profile cards come from the Alumni collection (Show in Featured Graduates).',
            },
          },
          { name: 'featuredTitle', type: 'text', defaultValue: d.featured.title },
          { name: 'featuredIntro', type: 'textarea', defaultValue: d.featured.intro },
        ],
      },
      {
        type: 'collapsible',
        label: 'Where are they now',
        fields: [
          { name: 'pathwaysEyebrow', type: 'text', defaultValue: d.pathways.eyebrow },
          { name: 'pathwaysTitle', type: 'text', defaultValue: d.pathways.title },
          { name: 'pathwaysIntro', type: 'textarea', defaultValue: d.pathways.intro },
          {
            name: 'pathwaysItems',
            type: 'array',
            labels: { singular: 'Pathway', plural: 'Career pathways' },
            defaultValue: d.pathways.items,
            fields: [
              { name: 'title', type: 'text', required: true },
              { name: 'description', type: 'textarea', required: true },
              { name: 'icon', type: 'text', required: true },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Latest milestone',
        fields: [
          { name: 'milestoneEyebrow', type: 'text', defaultValue: d.milestone.eyebrow },
          { name: 'milestoneTitle', type: 'text', defaultValue: d.milestone.title },
          { name: 'milestoneBody', type: 'textarea', defaultValue: d.milestone.body },
          { name: 'milestoneCtaLabel', type: 'text', defaultValue: d.milestone.ctaLabel },
          { name: 'milestoneCtaUrl', type: 'text', defaultValue: d.milestone.ctaHref },
          { name: 'milestoneImage', type: 'upload', relationTo: 'media' },
        ],
      },
      {
        type: 'collapsible',
        label: 'Community Moments gallery',
        fields: [
          { name: 'galleryEyebrow', type: 'text', defaultValue: d.gallery.eyebrow },
          { name: 'galleryTitle', type: 'text', defaultValue: d.gallery.title },
          {
            name: 'galleryImages',
            type: 'array',
            labels: { singular: 'Photo', plural: 'Community photos' },
            admin: { description: 'Displayed as a scrolling photo gallery on the page.' },
            fields: [
              { name: 'image', type: 'upload', relationTo: 'media', required: true },
              { name: 'alt', type: 'text', required: true },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'In the News (curated)',
        fields: [
          { name: 'newsEyebrow', type: 'text', defaultValue: d.news.eyebrow },
          { name: 'newsTitle', type: 'text', defaultValue: d.news.title },
          { name: 'newsIntro', type: 'textarea', defaultValue: d.news.intro },
          {
            name: 'newsItems',
            type: 'array',
            labels: { singular: 'Item', plural: 'News highlights' },
            defaultValue: d.news.items.map(({ title, excerpt, href }) => ({
              title,
              excerpt,
              href,
            })),
            fields: [
              { name: 'title', type: 'text', required: true },
              { name: 'excerpt', type: 'textarea', required: true },
              { name: 'image', type: 'upload', relationTo: 'media' },
              { name: 'href', type: 'text', required: true },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Network & quote',
        fields: [
          { name: 'networkEyebrow', type: 'text', defaultValue: d.network.eyebrow },
          { name: 'networkTitle', type: 'text', defaultValue: d.network.title },
          { name: 'networkIntro', type: 'textarea', defaultValue: d.network.intro },
          {
            name: 'networkBenefits',
            type: 'array',
            labels: { singular: 'Benefit', plural: 'Network benefits' },
            defaultValue: d.network.benefits,
            fields: [
              { name: 'title', type: 'text', required: true },
              { name: 'description', type: 'textarea', required: true },
              { name: 'icon', type: 'text', required: true },
            ],
          },
          { name: 'networkGlobalLinkLabel', type: 'text', defaultValue: d.network.globalLink.label },
          { name: 'networkGlobalLinkUrl', type: 'text', defaultValue: d.network.globalLink.href },
          { name: 'quoteText', type: 'textarea', defaultValue: d.quote.text },
          { name: 'quoteAttribution', type: 'text', defaultValue: d.quote.attribution },
          { name: 'quoteRole', type: 'text', defaultValue: d.quote.role },
        ],
      },
      {
        type: 'collapsible',
        label: 'Bottom CTA',
        fields: [
          { name: 'ctaTitle', type: 'text', defaultValue: d.cta.title },
          { name: 'ctaBody', type: 'textarea', defaultValue: d.cta.body },
          { name: 'ctaPrimaryLabel', type: 'text', defaultValue: d.cta.primaryLabel },
          { name: 'ctaPrimaryUrl', type: 'text', defaultValue: d.cta.primaryHref },
          { name: 'ctaSecondaryLabel', type: 'text', defaultValue: d.cta.secondaryLabel },
          { name: 'ctaSecondaryUrl', type: 'text', defaultValue: d.cta.secondaryHref },
          { name: 'ctaImage', type: 'upload', relationTo: 'media' },
        ],
      },
    ],
  },
]
