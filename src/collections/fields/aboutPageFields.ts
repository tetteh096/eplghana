import type { Field } from 'payload'

const redesignIntro = {
  eyebrow: 'About EPL Ghana',
  title: 'Who We Are',
  lead:
    'A Ghanaian non-profit organization preparing ethical, critical-thinking young leaders to strengthen the civil service and serve the public good.',
}

const redesignStory = {
  eyebrow: 'Our Story',
  title: 'A Movement for Stronger Public Service',
  body:
    'Launched in 2018, EPL Ghana was founded on the conviction that public institutions are only as strong as the people within them. Through our 12-month Emerging Public Leaders Fellowship, we place talented young Ghanaians inside public sector institutions for immersive training, executive mentorship, and hands-on service—working toward an ambitious goal of nurturing over 275 dedicated Fellows by 2030 to drive lasting national transformation.',
}

const redesignMission = {
  eyebrow: 'Mission',
  title: 'What We Do',
  body: "To develop ethical, critical-thinking, and change-driven public sector leaders who strengthen Ghana's institutions and serve the public good.",
}

const redesignVision = {
  eyebrow: 'Vision',
  title: 'Where We Are Going',
  body: 'A Ghana where public institutions are led by honest, capable, and innovative leaders committed to national development and citizen welfare.',
}

const redesignCoreValues = [
  {
    num: '01',
    title: 'Partnership',
    meaning:
      'We work hand-in-hand with government agencies, development partners, and communities to achieve lasting national progress.',
  },
  {
    num: '02',
    title: 'Integrity',
    meaning:
      'We operate with honesty, fairness, and moral courage, modeling the exact character we expect in our Fellows.',
  },
  {
    num: '03',
    title: 'Value-Based Leadership',
    meaning:
      'We develop leaders guided not just by technical skill, but by a deep commitment to service, fairness, and public good.',
  },
  {
    num: '04',
    title: 'Excellence',
    meaning:
      'We set high standards in training, work delivery, and Fellow support. Excellence is our baseline, not an afterthought.',
  },
  {
    num: '05',
    title: 'Transparency',
    meaning:
      'We communicate openly and keep our doors open. Clear accountability builds trust with partners, Fellows, and the public.',
  },
  {
    num: '06',
    title: 'Sustainability',
    meaning:
      'We build systems, partnerships, and leadership skills designed to last and benefit Ghana for generations to come.',
  },
]

/**
 * CMS fields for the live About page (`/about`).
 * Matches ChariticsAboutPage: Hero → Story → Mission/Vision → Values → Team → Partners.
 */
export const aboutPageFields: Field[] = [
  {
    type: 'group',
    name: 'about',
    label: 'About page content',
    admin: {
      condition: (data) => data?.slug === '/about',
      description:
        'Edits the live About page. Team members come from the Team collection; partner logos from Partners.',
    },
    fields: [
      {
        type: 'collapsible',
        label: 'Hero',
        fields: [
          { name: 'introEyebrow', type: 'text', defaultValue: redesignIntro.eyebrow },
          { name: 'introTitle', type: 'text', defaultValue: redesignIntro.title },
          { name: 'introLead', type: 'textarea', defaultValue: redesignIntro.lead },
          {
            name: 'introImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Hero background image',
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Our Story',
        fields: [
          { name: 'storyEyebrow', type: 'text', defaultValue: redesignStory.eyebrow },
          { name: 'growthTitle', type: 'text', defaultValue: redesignStory.title },
          { name: 'growthBody', type: 'textarea', defaultValue: redesignStory.body },
          {
            name: 'introSecondaryImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Story image',
          },
        ],
      },
      {
        type: 'group',
        name: 'mission',
        label: 'Mission',
        fields: [
          { name: 'eyebrow', type: 'text', defaultValue: redesignMission.eyebrow },
          { name: 'title', type: 'text', defaultValue: redesignMission.title },
          { name: 'body', type: 'textarea', defaultValue: redesignMission.body },
        ],
      },
      {
        type: 'group',
        name: 'vision',
        label: 'Vision',
        fields: [
          { name: 'eyebrow', type: 'text', defaultValue: redesignVision.eyebrow },
          { name: 'title', type: 'text', defaultValue: redesignVision.title },
          { name: 'body', type: 'textarea', defaultValue: redesignVision.body },
        ],
      },
      {
        type: 'collapsible',
        label: 'Core values',
        fields: [
          {
            name: 'coreValuesEyebrow',
            type: 'text',
            defaultValue: 'Core Values',
          },
          {
            name: 'coreValuesTitle',
            type: 'text',
            defaultValue: 'The principles that guide everything we do.',
          },
          {
            name: 'coreValuesHint',
            type: 'text',
            defaultValue: 'Click any value to reveal its meaning.',
          },
          {
            name: 'coreValues',
            type: 'array',
            labels: { singular: 'Value', plural: 'Core values' },
            defaultValue: redesignCoreValues,
            fields: [
              { name: 'num', type: 'text', label: 'Number', defaultValue: '01' },
              { name: 'title', type: 'text', required: true },
              { name: 'meaning', type: 'textarea', required: true },
            ],
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Team section',
        admin: {
          description:
            'Headings and tab labels only. People come from the Team collection (Leadership = board, Team = staff).',
        },
        fields: [
          {
            name: 'teamTitle',
            type: 'text',
            defaultValue: 'The People Behind EPL Ghana',
          },
          {
            name: 'teamIntro',
            type: 'textarea',
            defaultValue:
              'Meet the dedicated board members, directors, and coordinators guiding our mission and supporting our Fellows every day.',
          },
          {
            name: 'teamLeadershipLabel',
            type: 'text',
            defaultValue: 'Leadership',
          },
          {
            name: 'teamStaffLabel',
            type: 'text',
            defaultValue: 'Team',
          },
        ],
      },
      {
        type: 'collapsible',
        label: 'Partners strip',
        admin: {
          description: 'Headings and CTA. Logos come from the Partners collection.',
        },
        fields: [
          {
            name: 'partnerEyebrow',
            type: 'text',
            defaultValue: 'Ecosystem',
          },
          {
            name: 'partnerTitle',
            type: 'text',
            defaultValue: 'Our Partners & Supporters',
          },
          {
            name: 'partnerLead',
            type: 'textarea',
            defaultValue:
              'We collaborate with government ministries, international development agencies, and civil society to build public leadership capacity.',
          },
          {
            name: 'partnerCtaLabel',
            type: 'text',
            defaultValue: 'Partner With Us',
          },
          {
            name: 'partnerCtaUrl',
            type: 'text',
            defaultValue: '/community/partners',
          },
        ],
      },
    ],
  },
]
