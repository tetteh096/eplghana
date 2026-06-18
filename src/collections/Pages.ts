import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { publicTotpReadBypass } from '@/config/security'
import { eplanPageFields } from '@/collections/fields/eplanPageFields'
import { getInvolvedPageFields } from '@/collections/fields/getInvolvedPageFields'
import { eplCoreValuesWithIcons } from '@/config/coreValues'
import { heroImageSlides } from '@/config/heroSlides'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Defaults so the Home fields open pre-filled with the real current content.
const defaultCoreValues = eplCoreValuesWithIcons.map((v) => ({
  title: v.title,
  description: v.description,
}))

const defaultStats = [
  { value: '200+', label: 'Fellows Trained' },
  { value: '150+', label: 'Fellows Working Full Time' },
  { value: '40+', label: 'Public Institutions' },
  { value: '85%', label: 'Career Advancement' },
]

const defaultHeroSlides = heroImageSlides.map((s) => ({
  subtitle: s.subtitle,
  title: s.title,
  description: s.description,
  ctaLabel: s.ctaLabel,
  ctaHref: s.ctaHref,
}))

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
          name: 'visit',
          label: 'Visit us',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          name: 'mapEmbedUrl',
          type: 'text',
          label: 'Google Map embed URL',
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
    // ── Home page ─────────────────────────────────────────────────────────
    {
      type: 'group',
      name: 'home',
      label: 'Home page content',
      admin: {
        condition: (data) => data?.slug === '/',
        description:
          'Static content for the homepage. The Projects, Events and Blog sections fill in automatically from those collections, only their headings are set here.',
      },
      fields: [
        {
          type: 'collapsible',
          label: 'Hero (top banner)',
          fields: [
            { name: 'heroSubtitle', type: 'text', defaultValue: 'Emerging Public Leaders of Ghana' },
            {
              name: 'heroTitle',
              type: 'text',
              defaultValue: 'Nurturing a new generation of public service professionals',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              defaultValue:
                'We empower Ghanaian youth with the knowledge, skills, and network to become effective agents of change within Ghana’s Public Service.',
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            { name: 'heroCtaLabel', type: 'text', defaultValue: 'Learn More' },
            { name: 'heroCtaUrl', type: 'text', defaultValue: '/about' },
            { name: 'heroStatValue', type: 'text', defaultValue: '200+' },
            { name: 'heroStatLabel', type: 'text', defaultValue: 'Fellows trained' },
            {
              name: 'heroAvatars',
              type: 'array',
              label: 'Stat avatars',
              labels: { singular: 'Avatar', plural: 'Avatars' },
              maxRows: 3,
              admin: {
                description:
                  'The small round fellow photos beside the “Fellows trained” stat (up to 3). Falls back to default fellow photos if left empty.',
                initCollapsed: true,
              },
              fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
            },
            {
              name: 'heroSlides',
              type: 'array',
              label: 'Extra hero slides',
              labels: { singular: 'Slide', plural: 'Hero slides' },
              defaultValue: defaultHeroSlides,
              admin: {
                description:
                  'The rotating banner slides shown after the main one. Leave a slide image empty to keep its current photo.',
                initCollapsed: true,
              },
              fields: [
                { name: 'subtitle', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'ctaLabel', type: 'text' },
                { name: 'ctaHref', type: 'text' },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Main slide photo (optional, falls back to the current one).' },
                },
                {
                  name: 'thumb',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Small thumbnail for the slide selector (optional).' },
                },
              ],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'About section',
          fields: [
            { name: 'aboutSubtitle', type: 'text', defaultValue: 'Who We Are' },
            {
              name: 'aboutTitle',
              type: 'text',
              defaultValue: 'Developing the next generation of public service professionals',
            },
            {
              name: 'aboutDescription',
              type: 'textarea',
              defaultValue:
                'At Emerging Public Leaders of Ghana, we believe Ghana’s development rests on strong Public Service institutions. We embed Africa’s brightest young professionals within government to champion leadership from inside the civil service.',
            },
            { name: 'aboutImage', type: 'upload', relationTo: 'media' },
            { name: 'aboutCtaLabel', type: 'text', defaultValue: 'About EPL Ghana' },
            { name: 'aboutCtaUrl', type: 'text', defaultValue: '/about' },
          ],
        },
        {
          type: 'collapsible',
          label: 'Mission banner',
          fields: [
            {
              name: 'missionBannerQuote',
              type: 'textarea',
              defaultValue:
                'EPL Ghana doesn’t just train leaders; we transform Ghana’s public service from the inside out. We rigorously select and embed Africa’s brightest young professionals within key government institutions, ensuring that leadership and innovation are championed from within the civil service to drive sustainable national development.',
            },
            {
              name: 'missionBannerImages',
              type: 'array',
              label: 'Mission banner slideshow',
              admin: {
                description: 'Photos that crossfade behind the mission quote. Falls back to hero slides if empty.',
              },
              maxRows: 8,
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Core values',
          fields: [
            {
              name: 'coreValues',
              type: 'array',
              labels: { singular: 'Value', plural: 'Core Values' },
              defaultValue: defaultCoreValues,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Impact stats',
          fields: [
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
          label: 'Fellowship banner',
          fields: [
            {
              name: 'fellowshipTitle',
              type: 'text',
              defaultValue: 'Your chapter in public service starts here',
            },
            {
              name: 'fellowshipDescription',
              type: 'textarea',
              defaultValue:
                'Join the 2026 Public Service Fellowship, a transformative year inside Ghana’s ministries, agencies, and commissions, with the training, mentorship, and network to lead with integrity.',
            },
            { name: 'fellowshipCtaLabel', type: 'text', defaultValue: 'Register Interest' },
            { name: 'fellowshipCtaUrl', type: 'text', defaultValue: '/contact' },
          ],
        },
        {
          type: 'collapsible',
          label: 'Gallery',
          fields: [
            { name: 'galleryHeading', type: 'text', defaultValue: 'Gallery' },
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Photo', plural: 'Gallery photos' },
              admin: {
                description:
                  'Photos in the home gallery strip. Add photos to replace the current set (leave empty to keep the current photos).',
                initCollapsed: true,
              },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'alt', type: 'text' },
              ],
            },
          ],
        },
        {
          type: 'group',
          name: 'sections',
          label: 'Section headings',
          admin: {
            description:
              'Headings above the auto-filled Projects, Events and Blog sections.',
          },
          fields: [
            {
              type: 'group',
              name: 'projects',
              label: 'Projects section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Our Work' },
                { name: 'title', type: 'text', defaultValue: 'Explore Our Projects' },
              ],
            },
            {
              type: 'group',
              name: 'events',
              label: 'Events section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Upcoming Events' },
                { name: 'title', type: 'text', defaultValue: 'EPL Ghana Event Schedule' },
              ],
            },
            {
              type: 'group',
              name: 'blog',
              label: 'Blog section',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Latest News' },
                { name: 'title', type: 'text', defaultValue: 'Read Our Latest Updates' },
                {
                  name: 'intro',
                  type: 'textarea',
                  defaultValue:
                    'Stories from our fellows, programs, and public service transformation work across Ghana.',
                },
              ],
            },
          ],
        },
      ],
    },
    // ── About page ────────────────────────────────────────────────────────
    {
      type: 'group',
      name: 'about',
      label: 'About page content',
      admin: {
        condition: (data) => data?.slug === '/about',
        description: 'Content for the About page (seeded from the current site content).',
      },
      fields: [
        {
          type: 'collapsible',
          label: 'Intro',
          fields: [
            { name: 'introEyebrow', type: 'text' },
            { name: 'introLead', type: 'textarea' },
            { name: 'introImage', type: 'upload', relationTo: 'media' },
            { name: 'introSecondaryImage', type: 'upload', relationTo: 'media' },
            { name: 'approachTitle', type: 'text' },
            {
              name: 'approachBullets',
              type: 'array',
              labels: { singular: 'Bullet', plural: 'Approach bullets' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Story band',
          fields: [
            { name: 'growthHighlight', type: 'text' },
            { name: 'growthHighlightLabel', type: 'text' },
            { name: 'growthTitle', type: 'text' },
            { name: 'growthBody', type: 'textarea' },
            { name: 'investmentTitle', type: 'text' },
            { name: 'investmentBody', type: 'textarea' },
          ],
        },
        {
          type: 'group',
          name: 'mission',
          label: 'Mission tab',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'body', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          type: 'group',
          name: 'vision',
          label: 'Vision tab',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'body', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          type: 'group',
          name: 'impact',
          label: 'Impact tab',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'heading', type: 'text' },
            { name: 'intro', type: 'textarea' },
            {
              name: 'items',
              type: 'array',
              labels: { singular: 'Impact item', plural: 'Impact items' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          type: 'group',
          name: 'partner',
          label: 'Why partner with us',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'lead', type: 'textarea' },
            { name: 'body', type: 'textarea' },
            { name: 'chooseLabel', type: 'text' },
            {
              name: 'items',
              type: 'array',
              labels: { singular: 'Reason', plural: 'Reasons' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                { name: 'icon', type: 'upload', relationTo: 'media' },
                {
                  name: 'accent',
                  type: 'select',
                  defaultValue: 'primary',
                  options: ['primary', 'secondary', 'deep', 'bright'],
                },
              ],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Impact stats',
          fields: [
            {
              name: 'stats',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
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
              defaultValue: 'Do You Want To Partner With Us?',
            },
            { name: 'ctaLabel', type: 'text', defaultValue: 'Contact Us' },
            { name: 'ctaUrl', type: 'text', defaultValue: '/contact#partnership' },
          ],
        },
      ],
    },
    ...eplanPageFields,
    ...getInvolvedPageFields,
    // ── Current Fellows page (static copy; directory from Fellows collection) ─
    {
      type: 'group',
      name: 'currentFellowsPage',
      label: 'Current Fellows page',
      admin: {
        condition: (data) => data?.slug === '/community/current-fellows',
        description:
          'Hero, section headings, cohort band, and CTA. Fellow photos and profiles are managed in the Fellows collection.',
      },
      fields: [
        {
          type: 'collapsible',
          label: 'Hero',
          fields: [
            { name: 'heroEyebrow', type: 'text', defaultValue: 'EPL Fellows' },
            {
              name: 'heroTitle',
              type: 'text',
              defaultValue: 'Current Public Service Fellows',
            },
            {
              name: 'heroLead',
              type: 'textarea',
              defaultValue:
                'The Public Service Fellowship brings together exceptional young Ghanaians who are redefining leadership in public service. Our current fellows are serving in key government institutions, driving innovation, integrity, and impact across the nation.',
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Hero image (primary)' },
            {
              name: 'heroSecondaryImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero image (secondary)',
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Fellows highlight section',
          fields: [
            {
              name: 'highlightsEyebrow',
              type: 'text',
              defaultValue: 'Fellows Highlight',
              admin: {
                description:
                  'Section headings only, featured fellow cards come from the Fellows collection (Featured on page).',
              },
            },
            { name: 'highlightsTitle', type: 'text', defaultValue: 'Leaders making impact' },
          ],
        },
        {
          type: 'collapsible',
          label: 'Cohort directory',
          fields: [
            { name: 'cohortLabel', type: 'text', defaultValue: 'Cohort VII Fellows' },
            {
              name: 'cohortCount',
              type: 'number',
              admin: {
                description:
                  'Optional override for the fellow count in the heading. Leave empty to use the number of published fellows.',
              },
            },
            {
              name: 'cohortDescription',
              type: 'textarea',
              defaultValue:
                'Cohort VII is embedded across ministries, commissions, and public agencies, driving integrity and innovation where it matters most.',
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Bottom CTA',
          fields: [
            { name: 'ctaTitle', type: 'text', defaultValue: 'Create Your Journey' },
            {
              name: 'ctaBody',
              type: 'textarea',
              defaultValue:
                'Learn more about the Public Service Fellowship and join the next cohort of leaders transforming governance.',
            },
            { name: 'ctaLabel', type: 'text', defaultValue: 'Learn More' },
            { name: 'ctaUrl', type: 'text', defaultValue: '/projects/public-service-fellowship' },
            { name: 'ctaImage', type: 'upload', relationTo: 'media', label: 'CTA image' },
          ],
        },
      ],
    },
    // ── Our Partners page (static copy; partner cards from Partners collection) ─
    {
      type: 'group',
      name: 'partnersPage',
      label: 'Our Partners page',
      admin: {
        condition: (data) => data?.slug === '/community/partners',
        description:
          'Intro, section headings, stats, and CTA. Partner logos and descriptions are managed in the Partners collection.',
      },
      fields: [
        {
          type: 'collapsible',
          label: 'Intro',
          fields: [
            { name: 'heroEyebrow', type: 'text', defaultValue: 'Community' },
            {
              name: 'heroLead',
              type: 'textarea',
              defaultValue:
                'EPL Ghana’s work is made possible through strategic partnerships with funders, government institutions, and collaborators who share our commitment to ethical, effective public service.',
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Intro image (primary)' },
            {
              name: 'heroSecondaryImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Intro image (secondary)',
            },
            {
              name: 'heroStats',
              type: 'array',
              labels: { singular: 'Stat', plural: 'Intro stats' },
              defaultValue: [
                { value: '4', label: 'Strategic funders & collaborators' },
                { value: '12+', label: 'Government host institutions' },
                { value: '3', label: 'Flagship fellowship programmes' },
              ],
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Strategic partners section',
          fields: [
            { name: 'strategicEyebrow', type: 'text', defaultValue: 'Strategic Partners' },
            { name: 'strategicTitle', type: 'text', defaultValue: 'Partners' },
            {
              name: 'strategicIntro',
              type: 'textarea',
              defaultValue:
                'Funders and collaborators who invest in fellowship programmes, gender equity, and peacebuilding across Ghana’s public sector.',
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Host institutions section',
          fields: [
            { name: 'hostEyebrow', type: 'text', defaultValue: 'Host Institutions' },
            { name: 'hostTitle', type: 'text', defaultValue: 'Partner Organizations' },
            {
              name: 'hostIntro',
              type: 'textarea',
              defaultValue:
                'Government ministries, agencies, and commissions where EPL fellows serve and where we deliver capacity-building and gender-responsive reforms.',
            },
          ],
        },
        {
          type: 'collapsible',
          label: 'Contact CTA',
          fields: [
            {
              name: 'ctaTitle',
              type: 'text',
              defaultValue: 'Interested in partnering with EPL Ghana?',
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              defaultValue:
                'Whether you represent a development partner, government agency, or organisation committed to public service excellence, we would love to hear from you.',
            },
            { name: 'ctaLabel', type: 'text', defaultValue: 'Contact Us' },
            { name: 'ctaUrl', type: 'text', defaultValue: '/contact#partnership' },
          ],
        },
      ],
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
