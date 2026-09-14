import type { Field } from 'payload'

import { heroImageSlides } from '@/config/heroSlides'

const defaultHeroSlides = heroImageSlides.map((s) => ({
  subtitle: s.subtitle,
  title: s.title,
  titleLine1: s.titleLines?.[0] ?? '',
  titleLine2: s.titleLines?.[1] ?? '',
  titleLine3: s.titleLines?.[2] ?? '',
  description: s.description,
  ctaLabel: s.ctaLabel,
  ctaHref: s.ctaHref,
  secondaryCtaLabel: 'Learn More',
  secondaryCtaHref: '/about',
}))

const defaultStats = [
  { value: '8', label: 'Cohorts' },
  { value: '200+', label: 'Fellows' },
  { value: '15+', label: 'Institutions' },
  { value: '85%', label: 'Career Advancement' },
]

const defaultEplWay = [
  {
    number: '01',
    title: 'Think Critically',
    description: 'Solving problems with clear, smart thinking.',
    note: 'We train Fellows to look at facts, solve real problems, and make smart decisions that improve how government institutions work.',
    tone: 'blue',
    href: '/about',
  },
  {
    number: '02',
    title: 'Act Ethically',
    description: 'Leading with honesty, fairness, and truth.',
    note: 'Good leadership starts with strong values. We instill zero tolerance for corruption and a deep respect for public accountability.',
    tone: 'navy',
    href: '/about',
  },
  {
    number: '03',
    title: 'Drive Change',
    description: 'Turning good policy into real action.',
    note: 'Fellows do not just study policy—they work inside ministries and local assemblies to fix bottlenecks and help communities.',
    tone: 'gold',
    href: '/about',
  },
]

/**
 * CMS fields for the live homepage (`/`).
 * Matches ChariticsHome: Hero → EPL Way → Projects → Stats → Impact Stories → Events.
 */
export const homePageFields: Field[] = [
  {
    type: 'group',
    name: 'home',
    label: 'Home page content',
    admin: {
      condition: (data) => data?.slug === '/',
      description:
        'Edits the live homepage. Projects and Events cards come from those collections; set headings and copy here.',
    },
    fields: [
      {
        type: 'collapsible',
        label: 'Hero slides',
        fields: [
          {
            name: 'heroSlides',
            type: 'array',
            labels: { singular: 'Slide', plural: 'Hero slides' },
            defaultValue: defaultHeroSlides,
            admin: {
              description:
                'Rotating hero banner. Title lines 1–3 are the three headline rows (middle line is accented).',
            },
            fields: [
              { name: 'subtitle', type: 'text', label: 'Eyebrow' },
              { name: 'title', type: 'text', label: 'Title (fallback / accessibility)' },
              { name: 'titleLine1', type: 'text', label: 'Title line 1' },
              { name: 'titleLine2', type: 'text', label: 'Title line 2 (accent)' },
              { name: 'titleLine3', type: 'text', label: 'Title line 3' },
              { name: 'description', type: 'textarea' },
              { name: 'ctaLabel', type: 'text', label: 'Primary CTA label' },
              { name: 'ctaHref', type: 'text', label: 'Primary CTA URL' },
              {
                name: 'secondaryCtaLabel',
                type: 'text',
                label: 'Secondary CTA label',
                defaultValue: 'Learn More',
              },
              {
                name: 'secondaryCtaHref',
                type: 'text',
                label: 'Secondary CTA URL',
                defaultValue: '/about',
              },
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                label: 'Slide image',
                admin: { description: 'Full-bleed background for this slide.' },
              },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'EPL Way',
        fields: [
          {
            name: 'eplWayEyebrow',
            type: 'text',
            defaultValue: 'How We Work',
          },
          {
            name: 'eplWayTitle',
            type: 'text',
            defaultValue: 'The EPL Way',
          },
          {
            name: 'eplWayIntro',
            type: 'textarea',
            defaultValue:
              'We develop leaders who bring clear thinking, strong values and purposeful action to public service.',
          },
          {
            name: 'eplWay',
            type: 'array',
            labels: { singular: 'Card', plural: 'EPL Way cards' },
            defaultValue: defaultEplWay,
            maxRows: 3,
            fields: [
              { name: 'number', type: 'text', required: true },
              { name: 'title', type: 'text', required: true },
              { name: 'description', type: 'textarea', required: true },
              {
                name: 'note',
                type: 'textarea',
                admin: { description: 'Longer note shown on hover.' },
              },
              {
                name: 'tone',
                type: 'select',
                required: true,
                defaultValue: 'blue',
                options: [
                  { label: 'Blue', value: 'blue' },
                  { label: 'Navy', value: 'navy' },
                  { label: 'Gold', value: 'gold' },
                ],
              },
              {
                name: 'image',
                type: 'upload',
                relationTo: 'media',
                admin: { description: 'Card photo.' },
              },
              { name: 'href', type: 'text', defaultValue: '/about' },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Projects section',
        admin: {
          description:
            'Headings only. Cards come from the Projects collection (fixed home layout of four programmes).',
        },
        fields: [
          {
            name: 'projectsEyebrow',
            type: 'text',
            defaultValue: 'Our Work',
          },
          {
            name: 'projectsTitle',
            type: 'textarea',
            defaultValue: 'Projects That Move\nPublic Service Forward',
            admin: {
              description: 'Use a line break for the two-line title on the homepage.',
            },
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Impact Numbers',
        fields: [
          {
            name: 'statsHeading',
            type: 'text',
            defaultValue: 'Impact Numbers',
          },
          {
            name: 'stats',
            type: 'array',
            maxRows: 4,
            defaultValue: defaultStats,
            fields: [
              { name: 'value', type: 'text', required: true },
              { name: 'label', type: 'text', required: true },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Impact stories',
        fields: [
          {
            name: 'impactStoriesEyebrow',
            type: 'text',
            defaultValue: 'Impact stories',
          },
          {
            name: 'impactStoriesTitle',
            type: 'text',
            defaultValue: 'Real People. Real Impact.',
          },
          {
            name: 'impactStoriesCtaLabel',
            type: 'text',
            defaultValue: 'Read all stories',
          },
          {
            name: 'impactStoriesCtaUrl',
            type: 'text',
            defaultValue: '/news',
          },
          {
            name: 'impactStoriesFeaturedLabel',
            type: 'text',
            defaultValue: 'Featured Story',
          },
          {
            name: 'impactStoriesFeaturedHeading',
            type: 'text',
            defaultValue: 'From Fellow to Policy Leader',
          },
          {
            name: 'impactStoriesFeaturedCtaLabel',
            type: 'text',
            defaultValue: 'Read Her Story',
          },
          {
            name: 'impactStories',
            type: 'array',
            labels: { singular: 'Story', plural: 'Impact stories' },
            admin: {
              description:
                'Mark one as featured for the large card; others appear as secondary cards.',
            },
            fields: [
              { name: 'name', type: 'text', required: true },
              { name: 'cohort', type: 'text' },
              { name: 'institution', type: 'text' },
              { name: 'quote', type: 'textarea' },
              { name: 'image', type: 'upload', relationTo: 'media' },
              {
                name: 'featured',
                type: 'checkbox',
                defaultValue: false,
                admin: { description: 'Show as the large featured story card.' },
              },
              {
                name: 'storyHref',
                type: 'text',
                admin: { description: 'Link for the featured story CTA.' },
              },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Events section',
        admin: {
          description:
            'Headings only. Event details come from the Events collection (next upcoming, or latest past if none).',
        },
        fields: [
          {
            name: 'eventsEyebrow',
            type: 'text',
            defaultValue: 'Updates & events',
          },
          {
            name: 'eventsTitle',
            type: 'text',
            defaultValue: 'Latest Updates from EPL Ghana',
          },
          {
            name: 'eventsBadge',
            type: 'text',
            defaultValue: 'Annual forum',
            admin: { description: 'Small badge on the event image.' },
          },
          {
            name: 'eventsKicker',
            type: 'text',
            defaultValue: 'Upcoming event',
          },
          {
            name: 'eventsRegisterLabel',
            type: 'text',
            defaultValue: 'Register for event',
          },
        ],
      },
    ],
  },
]
