import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { publicTotpReadBypass } from '@/config/security'
import { aboutPageFields } from '@/collections/fields/aboutPageFields'
import { currentFellowsPageFields } from '@/collections/fields/currentFellowsPageFields'
import { donatePageFields } from '@/collections/fields/donatePageFields'
import { eplanPageFields } from '@/collections/fields/eplanPageFields'
import { galleryPageFields } from '@/collections/fields/galleryPageFields'
import { getInvolvedPageFields } from '@/collections/fields/getInvolvedPageFields'
import { homePageFields } from '@/collections/fields/homePageFields'
import { impactPageFields } from '@/collections/fields/impactPageFields'
import { partnersPageFields } from '@/collections/fields/partnersPageFields'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/**
 * Pages, the "Pages" door in the admin.
 *
 * A fixed, edit-only set of the site's real pages (seeded via
 * src/scripts/seedPages.ts). You edit a page's content with the live site
 * shown side-by-side; you cannot create or delete pages here.
 *
 * Each page's editable content lives in a group gated by its `slug`, so the
 * edit screen only shows the fields that belong to that page's design. As more
 * pages are migrated, add a new group below (condition on its slug) and wire
 * the route to read it.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    description:
      'Edit your existing pages. Pages are fixed. You edit their content, you don’t create or delete them.',
    listSearchableFields: ['title', 'slug'],
    pagination: {
      defaultLimit: 20,
      limits: [10, 20, 50],
    },
    components: {
      views: {
        list: {
          Component: '/components/admin/PagesListView#PagesListView',
        },
      },
    },
    livePreview: {
      url: ({ data }) => `${serverURL}${(data?.slug as string) || '/'}`,
    },
  },
  access: {
    create: () => false,
    delete: () => false,
    read: () => true,
    update: canEditContent,
  },
  custom: publicTotpReadBypass,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
        description: 'Page name (fixed).',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'The page URL path (fixed).',
      },
    },
    // ── Contact page ──────────────────────────────────────────────────────
    {
      type: 'group',
      name: 'contact',
      label: 'Contact page content',
      admin: {
        condition: (data) => data?.slug === '/contact',
      },
      fields: [
        {
          type: 'group',
          name: 'hero',
          label: 'Top section',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'lead', type: 'textarea' },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Photo beside the contact details. Leave empty to keep the current image.' },
            },
            {
              name: 'quickLinks',
              type: 'array',
              labels: { singular: 'Button', plural: 'Buttons' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          type: 'group',
          name: 'hub',
          label: 'Communication hub',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Communication Hub' },
            { name: 'responseLabel', type: 'text', defaultValue: 'Response Time' },
            { name: 'responseValue', type: 'text', defaultValue: 'Within 2 business days' },
            { name: 'hoursLabel', type: 'text', defaultValue: 'Office Hours' },
            { name: 'hoursValue', type: 'text', defaultValue: 'Mon – Fri, 8am – 5pm GMT' },
            { name: 'hqLabel', type: 'text', defaultValue: 'Accra HQ' },
            { name: 'hqValue', type: 'text', defaultValue: 'East Legon, Greater Accra' },
          ],
        },
        {
          type: 'group',
          name: 'channels',
          label: 'Contact channels',
          fields: [
            { name: 'phoneEyebrow', type: 'text', defaultValue: 'Direct Phone' },
            { name: 'phoneTitle', type: 'text', defaultValue: 'Speak to Our Team' },
            {
              name: 'phoneText',
              type: 'textarea',
              defaultValue: 'Call our Accra office for urgent inquiries or immediate assistance.',
            },
            { name: 'phoneCtaLabel', type: 'text', defaultValue: 'Call Now' },
            { name: 'emailEyebrow', type: 'text', defaultValue: 'Email Inbox' },
            { name: 'emailTitle', type: 'text', defaultValue: 'Write to Us' },
            {
              name: 'emailText',
              type: 'textarea',
              defaultValue: 'Send official correspondence, media requests, or general inquiries.',
            },
            { name: 'emailCtaLabel', type: 'text', defaultValue: 'Send Email' },
            { name: 'visitEyebrow', type: 'text', defaultValue: 'Visit Our Office' },
            { name: 'visitTitle', type: 'text', defaultValue: 'Accra Headquarters' },
            {
              name: 'visitText',
              type: 'textarea',
              defaultValue: 'Visits by appointment for partners, fellows, and stakeholders.',
            },
            { name: 'visitCtaLabel', type: 'text', defaultValue: 'View Map' },
          ],
        },
        {
          type: 'group',
          name: 'visit',
          label: 'Visit us',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'addressLabel', type: 'text', defaultValue: 'Office Address' },
            { name: 'phoneLabel', type: 'text', defaultValue: 'Direct Line' },
            { name: 'emailLabel', type: 'text', defaultValue: 'Official Email' },
            {
              name: 'note',
              type: 'textarea',
              defaultValue:
                'Parking is available on premises. Please schedule your appointment in advance.',
            },
          ],
        },
        {
          name: 'mapEmbedUrl',
          type: 'text',
          label: 'Google Map embed URL',
        },
        {
          type: 'group',
          name: 'form',
          label: 'Contact form',
          fields: [
            { name: 'title', type: 'text', defaultValue: 'Send Us a Message' },
            {
              name: 'intro',
              type: 'textarea',
              defaultValue: 'Fill out the form below and our team will get back to you promptly.',
            },
            { name: 'submitLabel', type: 'text', defaultValue: 'Submit Inquiry' },
            {
              name: 'successTitle',
              type: 'text',
              defaultValue: 'Thank You for Contacting Us',
            },
            {
              name: 'successText',
              type: 'textarea',
              defaultValue:
                'Your message has been successfully received. A member of the EPL Ghana team will respond to your email within 24 to 48 hours.',
            },
            {
              name: 'privacyLabel',
              type: 'text',
              defaultValue: 'View Our Privacy Note',
            },
            { name: 'privacyHref', type: 'text', defaultValue: '/privacy' },
          ],
        },
        {
          type: 'group',
          name: 'formsSection',
          label: 'Forms section heading',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'intro', type: 'textarea' },
          ],
        },
        {
          type: 'group',
          name: 'forms',
          label: 'Form panels',
          fields: [
            {
              type: 'group',
              name: 'general',
              label: 'General enquiry panel',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'submitLabel', type: 'text' },
              ],
            },
            {
              type: 'group',
              name: 'partnership',
              label: 'Partnership panel',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'submitLabel', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'newsPage',
      label: 'News page content',
      admin: { condition: (data) => data?.slug === '/news' },
      fields: [
        { name: 'heroEyebrow', type: 'text', defaultValue: 'Updates & Engagement' },
        { name: 'heroTitle', type: 'text', defaultValue: 'News & Insights' },
        {
          name: 'heroLead',
          type: 'textarea',
          defaultValue: 'Stay updated with our public sector events, fellow recruitment opportunities, and thought leadership pieces.',
        },
        { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero background' },
      ],
    },
    {
      type: 'group',
      name: 'researchPage',
      label: 'Research page content',
      admin: { condition: (data) => data?.slug === '/research' },
      fields: [
        { name: 'heroEyebrow', type: 'text', defaultValue: 'Knowledge Products' },
        { name: 'heroTitle', type: 'text', defaultValue: 'Research and Publications' },
        {
          name: 'heroLead',
          type: 'textarea',
          defaultValue: 'Explore articles, factsheets, studies, and policy briefs produced by EPL Ghana and our partners.',
        },
        { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero background' },
      ],
    },
    {
      type: 'group',
      name: 'testimonialsPage',
      label: 'Testimonials page content',
      admin: { condition: (data) => data?.slug === '/testimonials' },
      fields: [
        { name: 'heroEyebrow', type: 'text', defaultValue: 'Community Voices' },
        { name: 'heroTitle', type: 'text', defaultValue: 'All Testimonials' },
        {
          name: 'heroLead',
          type: 'textarea',
          defaultValue: 'Experiences and reflections from Fellows and members of the EPL Ghana community.',
        },
        { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Optional hero background' },
      ],
    },
    {
      type: 'group',
      name: 'privacyPage',
      label: 'Privacy page content',
      admin: { condition: (data) => data?.slug === '/privacy' },
      fields: [
        { name: 'heroEyebrow', type: 'text', defaultValue: 'Privacy' },
        { name: 'heroTitle', type: 'text', defaultValue: 'Privacy Note' },
        {
          name: 'heroLead',
          type: 'textarea',
          defaultValue: 'Your privacy matters to us. This note explains how EPL Ghana collects, uses and protects information shared through our website.',
        },
        { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Optional hero background' },
        {
          name: 'sections',
          type: 'array',
          labels: { singular: 'Privacy section', plural: 'Privacy sections' },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'body', type: 'textarea', required: true },
          ],
        },
        { name: 'backLabel', type: 'text', defaultValue: 'Back to Contact' },
        { name: 'backUrl', type: 'text', defaultValue: '/contact' },
      ],
    },
    // ── Home page ─────────────────────────────────────────────────────────
    ...homePageFields,
    // ── About page ────────────────────────────────────────────────────────
    ...aboutPageFields,
    // ── What We Do page (static copy; programme cards from Projects collection) ─
    {
      type: 'group',
      name: 'whatWeDo',
      label: 'What We Do page',
      admin: {
        condition: (data) => data?.slug === '/about/what-we-do',
        description:
          'Intro, approach, and CTA copy. Programme cards are managed in the Projects collection.',
      },
      fields: [
        {
          type: 'collapsible',
          label: 'Intro',
          fields: [
            { name: 'introEyebrow', type: 'text', defaultValue: 'What We Do' },
            {
              name: 'introTitle',
              type: 'text',
              defaultValue: 'Building ethical leaders inside Ghana’s public service',
            },
            {
              name: 'introLead',
              type: 'textarea',
              defaultValue:
                'Emerging Public Leaders of Ghana strengthens the institutions Ghanaians rely on, by investing in the young professionals who run them.',
            },
            {
              name: 'introParagraphs',
              type: 'array',
              labels: { singular: 'Paragraph', plural: 'Intro paragraphs' },
              defaultValue: [
                {
                  text: 'We recruit, place, and develop Ghana’s most promising young talent inside key public institutions, then surround them with the training, mentorship, and network they need to lead with integrity and deliver real results.',
                },
                {
                  text: 'Our work runs through a growing set of connected programmes. Each tackles a different barrier to effective public service, but they share one goal: a generation of leaders who make government work better for citizens.',
                },
              ],
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            {
              name: 'introImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Leave empty to keep the current image.' },
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Programmes section',
          fields: [
            { name: 'programmesEyebrow', type: 'text', defaultValue: 'Our Programmes' },
            {
              name: 'programmesTitle',
              type: 'text',
              defaultValue: 'Connected programmes, one mission',
            },
            { name: 'programmesCtaLabel', type: 'text', defaultValue: 'All Projects' },
            { name: 'programmesCtaUrl', type: 'text', defaultValue: '/projects' },
          ],
        },
        {
          type: 'collapsible',
          label: 'How we work',
          fields: [
            { name: 'approachEyebrow', type: 'text', defaultValue: 'How We Work' },
            { name: 'approachTitle', type: 'text', defaultValue: 'A model designed to last' },
            {
              name: 'approachSteps',
              type: 'array',
              labels: { singular: 'Step', plural: 'Steps' },
              defaultValue: [
                {
                  title: 'Recruit & Place',
                  body: 'We identify high-potential young Ghanaians and place them inside the public institutions where they can make the greatest difference.',
                },
                {
                  title: 'Train & Mentor',
                  body: 'Fellows receive a structured capacity-building curriculum, hands-on mentorship, and regular check-ins throughout their placement.',
                },
                {
                  title: 'Connect & Sustain',
                  body: 'Through our growing alumni network, fellows stay connected, sharing knowledge and reinforcing a culture of ethical, effective leadership.',
                },
              ],
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Call to action',
          fields: [
            { name: 'ctaTitle', type: 'text', defaultValue: 'See the work in action' },
            {
              name: 'ctaBody',
              type: 'textarea',
              defaultValue:
                'Explore each programme in detail, or find the right way to get involved.',
            },
            {
              name: 'ctaImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Leave empty to keep the current image.' },
            },
            { name: 'ctaPrimaryLabel', type: 'text', defaultValue: 'Explore Our Projects' },
            { name: 'ctaPrimaryUrl', type: 'text', defaultValue: '/projects' },
            { name: 'ctaSecondaryLabel', type: 'text', defaultValue: 'Get Involved' },
            { name: 'ctaSecondaryUrl', type: 'text', defaultValue: '/get-involved' },
          ],
        },
      ],
    },
    // ── Country Director message ───────────────────────────────────────────
    {
      type: 'group',
      name: 'directorMessage',
      label: 'Country Director message',
      admin: {
        condition: (data) => data?.slug === '/about/director-message',
        description:
          'Portrait card (left) and message copy (right). Leave name/photo blank to use the Country Director from the Team collection.',
      },
      fields: [
        {
          type: 'collapsible',
          label: 'Director portrait',
          admin: {
            initCollapsed: false,
          },
          fields: [
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              label: 'Portrait photo',
              admin: {
                description:
                  'Photo shown in the card on the left. Leave empty to use the Country Director’s photo from Team.',
              },
            },
            { name: 'name', type: 'text', defaultValue: 'Abena Osei' },
            { name: 'role', type: 'text', defaultValue: 'Country Director' },
            {
              name: 'email',
              type: 'email',
              admin: { description: 'Optional. Falls back to Team when empty.' },
            },
            {
              name: 'linkedin',
              type: 'text',
              admin: { description: 'Optional LinkedIn URL. Falls back to Team when empty.' },
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Page header',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'A Word From Our Leadership' },
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Message from the Country Director',
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Message',
          fields: [
            { name: 'greeting', type: 'text', defaultValue: 'Dear friends of EPL Ghana,' },
            {
              name: 'paragraphs',
              type: 'array',
              labels: { singular: 'Paragraph', plural: 'Message paragraphs' },
              defaultValue: [
                {
                  text: 'When we launched Emerging Public Leaders of Ghana, we held a simple conviction: that the strength of any nation rests on the strength of its public institutions, and that those institutions are only as strong as the people who lead them.',
                },
                {
                  text: 'Every day, our fellows prove that conviction right. They step into government agencies across Ghana not as observers, but as contributors, bringing fresh energy, new skills, and an unwavering commitment to serving citizens with integrity.',
                },
                {
                  text: 'What we are building is bigger than any single programme. We are nurturing a network of ethical, capable leaders who will shape Ghana’s public service for decades to come. That is a long-term investment, and one I am proud to lead here at home.',
                },
                {
                  text: 'To our fellows, partners, and supporters: thank you. Your belief in this mission is what makes it possible. There is much more work ahead, and I invite you to walk this journey with us.',
                },
              ],
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            {
              name: 'pullQuote',
              type: 'textarea',
              defaultValue:
                'The strength of a nation rests on the people who lead its institutions, and our job is to develop them.',
            },
            { name: 'signoff', type: 'text', defaultValue: 'With gratitude,' },
          ],
        },
        {
          type: 'collapsible',
          label: 'Footer button',
          fields: [
            { name: 'teamCtaLabel', type: 'text', defaultValue: 'Meet Our Team' },
            { name: 'teamCtaUrl', type: 'text', defaultValue: '/about/team' },
          ],
        },
      ],
    },
    // ── Our Journey (org history timeline) ───────────────────────────────
    {
      type: 'group',
      name: 'ourJourney',
      label: 'Our Journey page',
      admin: {
        condition: (data) => data?.slug === '/about/our-journey',
        description:
          'Timeline of EPL Ghana’s history, a closing director quote, and a call-to-action.',
      },
      fields: [
        {
          type: 'collapsible',
          label: 'Hero',
          admin: { initCollapsed: false },
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Our Evolution' },
            { name: 'title', type: 'text', defaultValue: 'The Journey of EPL Ghana' },
            {
              name: 'subtitle',
              type: 'textarea',
              defaultValue:
                'Rooted in Ghana since 2018. Building a thriving movement for institutional excellence and transforming public service—one leader at a time.',
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Timeline milestones',
          fields: [
            {
              name: 'entries',
              type: 'array',
              labels: { singular: 'Milestone', plural: 'Timeline milestones' },
              defaultValue: [
                {
                  year: '2018',
                  title: 'Rooted in Ghana',
                  body: 'EPL Ghana launched with an inaugural cohort of 20 trailblazers under 30 across 28 Ministries. Operating as a rigorous 2-year fellowship combining national service with professional placement, they set an enduring standard of public service excellence.',
                  statLine: '20 Trailblazers · 28 Ministries · Infinite Impact',
                  asideNote: '',
                  highlight: '',
                },
                {
                  year: '2023',
                  title: 'Program Evolution',
                  body: 'The Fellowship refined into an intensive 1-year programme for post-National Service professionals. This evolution attracted purpose-driven talent ready to deliver immediate, tangible impact in governance and policy.',
                  statLine: '',
                  asideNote: '',
                  highlight: '',
                },
                {
                  year: 'Beyond 2027',
                  title: 'The Future We Build Together',
                  body: 'Our journey continues toward a future where Ghana’s public service stands as a beacon of continental excellence. Driven by integrity and secured by dedicated leaders who choose to serve today.',
                  statLine: '',
                  asideNote: '',
                  highlight: 'Target: 275+ Fellows by 2030',
                },
              ],
              fields: [
                { name: 'year', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                {
                  name: 'statLine',
                  type: 'text',
                  admin: {
                    description:
                      'Optional small stat pill next to this milestone, e.g. "20 Trailblazers · 28 Ministries · Infinite Impact".',
                  },
                },
                {
                  name: 'asideNote',
                  type: 'text',
                  admin: { description: 'Optional short italic side note.' },
                },
                {
                  name: 'highlight',
                  type: 'text',
                  admin: {
                    description: 'Optional bold callout box, e.g. a target/goal statement.',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Director quote',
          admin: {
            description: 'Leave name/photo blank to use the Country Director from the Team collection.',
          },
          fields: [
            { name: 'quoteEyebrow', type: 'text', defaultValue: 'Director’s Perspective' },
            {
              name: 'quoteHeadline',
              type: 'text',
              defaultValue: 'Excellence is not a goal; it is our baseline.',
            },
            {
              name: 'quoteParagraphs',
              type: 'array',
              labels: { singular: 'Paragraph', plural: 'Quote paragraphs' },
              defaultValue: [
                {
                  text: 'When we look back at our evolution in Ghana, what stands out most is not just the numbers, but the character of the young people who chose to serve. Public institutions transform only when principled, capable minds step up from within.',
                },
                {
                  text: 'As we scale toward our 2030 vision of 275+ Fellows, our commitment remains absolute: cultivating leaders of unwavering integrity who ensure Ghana’s public service serves every citizen with distinction.',
                },
              ],
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
              label: 'Quote portrait photo',
              admin: {
                description: 'Leave empty to use the Country Director’s photo from Team.',
              },
            },
            {
              name: 'name',
              type: 'text',
              admin: { description: 'Leave blank to use the Country Director from Team.' },
            },
            { name: 'role', type: 'text', defaultValue: 'Country Director, EPL Ghana' },
          ],
        },
        {
          type: 'collapsible',
          label: 'Closing CTA',
          fields: [
            { name: 'ctaTitle', type: 'text', defaultValue: 'Be Part of the Next Chapter' },
            {
              name: 'ctaBody',
              type: 'textarea',
              defaultValue:
                'Discover how you can join our upcoming cohort or partner with us to strengthen public service.',
            },
            { name: 'ctaPrimaryLabel', type: 'text', defaultValue: 'Apply for Fellowship' },
            { name: 'ctaPrimaryUrl', type: 'text', defaultValue: '/contact' },
            { name: 'ctaSecondaryLabel', type: 'text', defaultValue: 'Back to Home' },
            { name: 'ctaSecondaryUrl', type: 'text', defaultValue: '/' },
          ],
        },
      ],
    },
    // ── Projects page (intro + CTA, grid from Projects collection) ───────
    {
      type: 'group',
      name: 'projects',
      label: 'Projects page',
      admin: {
        condition: (data) => data?.slug === '/projects',
        description:
          'Intro and partner CTA. The programme photo grid is built from Admin → Projects (wide/tall card images, order).',
      },
      fields: [
        {
          type: 'collapsible',
          label: 'Intro',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Our Programmes' },
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Developing leaders for Ghana’s public service',
            },
            {
              name: 'description',
              type: 'textarea',
              defaultValue:
                'At Emerging Public Leaders of Ghana (EPL Ghana), our projects are designed to strengthen public institutions and equip young professionals with the skills and values to lead transformative change.',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero background image',
              admin: {
                description: 'Full-bleed hero background. Click an image to select, then Save this page.',
              },
            },
            {
              name: 'additionalParagraphs',
              type: 'array',
              labels: { singular: 'Paragraph', plural: 'Additional paragraphs' },
              defaultValue: [
                {
                  text: 'From our flagship Public Service Fellowship to specialized initiatives implemented in collaboration with government ministries, development partners, and policy institutions, each project advances our mission of building accountable, effective, and people-centred governance.',
                },
                {
                  text: 'Through leadership development, mentorship, and capacity-building programmes, we nurture a generation of ethical public servants committed to innovation, inclusion, and national development.',
                },
              ],
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Partner CTA',
          fields: [
            {
              name: 'ctaTitle',
              type: 'text',
              defaultValue: 'Be Part of Our Work',
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              defaultValue:
                'Whether you are an aspiring young leader, a public institution looking to host talent, or a strategic partner, there is a place for you in the EPL Ghana community.',
            },
            { name: 'ctaLabel', type: 'text', defaultValue: 'Become a Fellow' },
            { name: 'ctaUrl', type: 'text', defaultValue: '/contact#partnership' },
          ],
        },
      ],
    },
    ...eplanPageFields,
    ...galleryPageFields,
    ...getInvolvedPageFields,
    ...currentFellowsPageFields,
    // ── Our Partners page (static copy; partner cards from Partners collection) ─
    ...partnersPageFields,
    ...donatePageFields,
    {
      type: 'group',
      name: 'impactPage',
      label: 'Impact page',
      admin: {
        condition: (data) => data?.slug === '/impact',
        description:
          'Edits the live Impact page. Fellows, Impact Interventions, and Publications supply the cards; set section copy here.',
      },
      fields: impactPageFields,
    },
    // ── Annual Reports page (copy; PDFs from Publications collection) ─
    {
      type: 'group',
      name: 'annualReportsPage',
      label: 'Annual Reports page',
      admin: {
        condition: (data) => data?.slug === '/knowledge-products/annual-reports',
        description:
          'Intro, section headings, and CTA. Upload reports and PDFs in the Publications collection.',
      },
      fields: [
        {
          type: 'collapsible',
          label: 'Intro',
          fields: [
            { name: 'heroEyebrow', type: 'text', defaultValue: 'Knowledge Products' },
            { name: 'heroTitle', type: 'text', defaultValue: 'Annual Reports' },
            {
              name: 'heroLead',
              type: 'textarea',
              defaultValue:
                'Explore EPL Ghana’s impact reports, programme outcomes, and accountability publications documenting our work strengthening public leadership across Ghana.',
            },
            {
              name: 'introText',
              type: 'textarea',
              defaultValue:
                'Transparency and learning are central to our mission. Our annual and impact reports capture fellow placements, programme milestones, partner collaborations, and the leadership outcomes we achieve together.',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero background image',
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Section headings',
          fields: [
            { name: 'reportsEyebrow', type: 'text', defaultValue: 'Impact Reports' },
            { name: 'reportsTitle', type: 'text', defaultValue: 'Annual publications' },
            {
              name: 'relatedEyebrow',
              type: 'text',
              defaultValue: 'Related Publications',
            },
            {
              name: 'relatedTitle',
              type: 'text',
              defaultValue: 'Research & impact documents',
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Bottom CTA',
          fields: [
            {
              name: 'ctaTitle',
              type: 'text',
              defaultValue: 'Request a printed copy or partnership briefing',
            },
            {
              name: 'ctaBody',
              type: 'textarea',
              defaultValue:
                'Contact our team for printed annual reports, programme briefings, or tailored impact summaries for your organisation.',
            },
            { name: 'ctaLabel', type: 'text', defaultValue: 'Contact Us' },
            { name: 'ctaUrl', type: 'text', defaultValue: '/contact' },
          ],
        },
      ],
    },
    // ── Our Team page (heading only, members come from the Team collection) ─
    {
      type: 'group',
      name: 'team',
      label: 'Our Team page',
      admin: {
        condition: (data) => data?.slug === '/about/team',
        description:
          'Heading for the Team page. Board and team members are managed in the Team collection.',
      },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Our People' },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Meet the leaders behind EPL Ghana',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'Our board provides strategic governance and stewardship. Our team brings the fellowship, partnerships, and programmes to life every day across Ghana’s public service.',
        },
      ],
    },
  ],
}
