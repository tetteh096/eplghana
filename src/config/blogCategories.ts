export const BLOG_CATEGORIES = {
  'blog-posts': 'Blog Posts',
  germel: 'GERMEL',
  programme: 'Programme',
} as const

export type BlogCategorySlug = keyof typeof BLOG_CATEGORIES

export function blogCategoryLabel(slug: string): string {
  return BLOG_CATEGORIES[slug as BlogCategorySlug] ?? slug
}

export function blogCategorySlugFromLabel(label: string): BlogCategorySlug {
  const normalized = label.trim().toLowerCase()
  if (normalized === 'germel') return 'germel'
  if (normalized === 'programme') return 'programme'
  return 'blog-posts'
}
