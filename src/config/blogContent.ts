import { EPL_MEDIA } from '@/config/eplMedia'
import type { BlogCategorySlug } from '@/config/blogCategories'

export type BlogPostSummary = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  image: string
  category: string
  categorySlug: BlogCategorySlug
  author?: string
  tags?: string[]
}

export const blogPageContent = {
  hero: {
    title: 'Blog',
    lead: 'Reflections, programme updates, and leadership insights from EPL Ghana and our fellows.',
  },
  categories: [
    { label: 'Blog Posts', slug: 'blog-posts', count: 5 },
    { label: 'GERMEL', slug: 'germel', count: 4 },
    { label: 'Programme', slug: 'programme', count: 1 },
  ],
  tags: [
    'Public Service Fellowship',
    'Women On The Rise',
    'GERMEL',
    'Leadership',
    'Governance',
    'Gender Inclusion',
    'Graduation',
  ],
}

export const fallbackBlogPosts: BlogPostSummary[] = [
  {
    slug: 'inspiring-the-next-generation-of-inclusive-leaders-epl-ghanas-empowerment-and-leadership-tour-june-2025',
    title:
      'Inspiring the Next Generation of Inclusive Leaders: EPL Ghana’s Empowerment and Leadership Tour, June 2025',
    excerpt:
      'From June 2 to 6, 2025, Emerging Public Leaders of Ghana embarked on an Empowerment and Leadership Tour connecting fellows with institutions shaping inclusive governance.',
    publishedAt: '2025-11-03',
    image: `${EPL_MEDIA}/2025/11/EPL-Watermark-471-of-715-scaled-e1762170976232.jpg`,
    category: 'GERMEL',
    categorySlug: 'germel',
    author: 'EPL Ghana',
    tags: ['GERMEL', 'Leadership', 'Gender Inclusion'],
  },
  {
    slug: 'equipping-public-servants-for-gender-responsive-governance-gdo-sensitisation-workshop-held-in-may-2025',
    title:
      'Equipping Public Servants for Gender-Responsive Governance: GDO Sensitisation Workshop Held in May 2025',
    excerpt:
      'On May 13, 2025, the National Gender Diversity Taskforce and the Civil Service Training Centre convened public servants for a gender-responsive governance workshop.',
    publishedAt: '2025-11-03',
    image: `${EPL_MEDIA}/2025/11/image00017-scaled.jpeg`,
    category: 'GERMEL',
    categorySlug: 'germel',
    author: 'EPL Ghana',
    tags: ['GERMEL', 'Leadership', 'Gender Inclusion'],
  },
  {
    slug: 'validating-gender-inclusion-civil-service-finalises-gender-mainstreaming-sop-in-may-2025',
    title: 'Validating Gender Inclusion: Civil Service Finalises Gender Mainstreaming SOP in May 2025',
    excerpt:
      'On May 11, 2025, the Office of the Head of Civil Service, in collaboration with EPL Ghana, hosted a high-level validation session for Ghana’s gender mainstreaming SOP.',
    publishedAt: '2025-10-31',
    image: `${EPL_MEDIA}/2025/10/image00012-scaled.jpeg`,
    category: 'GERMEL',
    categorySlug: 'germel',
    author: 'EPL Ghana',
    tags: ['GERMEL', 'Leadership', 'Gender Inclusion'],
  },
  {
    slug: 'highlights-from-the-april-2025national-gender-diversity-taskforce-meeting',
    title: 'Highlights from the April 2025 National Gender Diversity Taskforce Meeting',
    excerpt:
      'On April 8, 2025, the National Gender Diversity Taskforce, supported by EPL Ghana, convened to advance gender equity across Ghana’s public service.',
    publishedAt: '2025-10-30',
    image: `${EPL_MEDIA}/2025/10/image00053-scaled.jpeg`,
    category: 'GERMEL',
    categorySlug: 'germel',
    author: 'EPL Ghana',
    tags: ['GERMEL', 'Leadership', 'Gender Inclusion'],
  },
  {
    slug: 'our-cohort-vi-fellows-distinguished-themselves-in-service-copy',
    title: 'Excellence In Service',
    excerpt:
      'Our graduating Fellows have demonstrated exceptional commitment over the past year while serving with our valued public sector partner organizations.',
    publishedAt: '2025-10-12',
    image: `${EPL_MEDIA}/2025/07/CSG-2-scaled.jpg`,
    category: 'Blog Posts',
    categorySlug: 'blog-posts',
    author: 'EPL Ghana',
    tags: ['Public Service Fellowship', 'Leadership', 'Governance'],
  },
  {
    slug: 'breaking-barriers-empowering-women-to-attain-higher-leadership-heights-copy',
    title: 'Breaking Barriers: Empowering Women to Attain Higher Leadership Heights',
    excerpt:
      'Each time a woman stands up for herself, without knowing it possibly, without claiming it, she stands up for all women.',
    publishedAt: '2025-10-10',
    image: `${EPL_MEDIA}/2025/10/CSOE-35-scaled.jpg`,
    category: 'Blog Posts',
    categorySlug: 'blog-posts',
    author: 'EPL Ghana',
    tags: ['Women On The Rise', 'Leadership', 'Gender Inclusion'],
  },
  {
    slug: 'professionals-engaged-against-conflict-and-endangerment-copy',
    title: 'P.E.A.C.E Fellows Project',
    excerpt:
      'The P.E.A.C.E (Professionals Engaged Against Conflict & Endangerment) Fellows Project is a 12-month programme strengthening peace-building capacity in public service.',
    publishedAt: '2025-10-10',
    image: `${EPL_MEDIA}/2023/12/MG_0422-scaled.jpg`,
    category: 'Programme',
    categorySlug: 'programme',
    author: 'EPL Ghana',
    tags: ['Governance', 'Leadership'],
  },
  {
    slug: 'staying-to-build-epl-ghana-celebrates-graduation-of-sixth-cohort-of-public-service-fellows',
    title: 'PSF Cohort VI Graduation',
    excerpt:
      'Staying to Build: EPL Ghana Celebrates Graduation of Sixth Cohort of Public Service Fellows, honouring 33 dynamic young leaders across Ghana.',
    publishedAt: '2025-07-03',
    image: `${EPL_MEDIA}/2025/07/CSG-22-scaled.jpg`,
    category: 'Blog Posts',
    categorySlug: 'blog-posts',
    author: 'EPL Ghana',
    tags: ['Graduation', 'Public Service Fellowship'],
  },
]

export function getFallbackBlogPost(slug: string): BlogPostSummary | undefined {
  return fallbackBlogPosts.find((post) => post.slug === slug)
}
