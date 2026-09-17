import {
  getResearchCategory,
  getResearchItem,
  getResearchItemsByCategory,
  isResearchCategorySlug,
  RESEARCH_CATEGORIES,
  researchPageContent,
  type ResearchCategorySlug,
  type ResearchItem,
} from '@/config/researchPageContent'
import { getMediaUrl, resolveMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function mapCmsCategory(value: string | null | undefined): ResearchCategorySlug | null {
  if (!value) return null
  if (isResearchCategorySlug(value)) return value
  if (value === 'research') return 'studies'
  return null
}

async function loadCmsItems(): Promise<ResearchItem[]> {
  const payload = await tryGetPayload()
  if (!payload) return []

  try {
    const result = await payload.find({
      collection: 'publications',
      depth: 1,
      limit: 100,
      where: {
        and: [
          { status: { not_equals: 'draft' } },
          {
            category: {
              in: ['articles', 'factsheets', 'studies', 'technical-policy-briefs', 'research'],
            },
          },
        ],
      },
      sort: 'order',
    })

    const items: ResearchItem[] = []
    for (const doc of result.docs) {
      const category = mapCmsCategory(typeof doc.category === 'string' ? doc.category : null)
      if (!category) continue

      const title = typeof doc.title === 'string' ? doc.title.trim() : ''
      if (!title) continue

      const slug =
        (typeof (doc as { slug?: string }).slug === 'string' &&
          (doc as { slug?: string }).slug?.trim()) ||
        slugify(title)

      const image =
        (await resolveMediaUrl(doc.coverImage, payload)) ||
        getMediaUrl(doc.coverImage) ||
        researchPageContent.items[0]?.image ||
        ''

      const fileUrl =
        (await resolveMediaUrl(doc.file, payload)) || getMediaUrl(doc.file) || undefined

      const description =
        typeof doc.description === 'string' ? doc.description.trim() : ''
      const bodyField = (doc as { body?: string | null }).body
      const body =
        typeof bodyField === 'string' && bodyField.trim() ? bodyField.trim() : description

      items.push({
        slug,
        category,
        tag: RESEARCH_CATEGORIES.find((c) => c.slug === category)?.label ?? 'Research',
        title,
        source: 'EPL Ghana',
        summary: description,
        body,
        image,
        downloadUrl: fileUrl || undefined,
        year: typeof doc.year === 'string' ? doc.year : undefined,
      })
    }

    return items
  } catch {
    return []
  }
}

export async function getResearchHubContent() {
  return {
    hub: researchPageContent.hub,
    categories: RESEARCH_CATEGORIES.map((category) => ({
      ...category,
      href: `/research/${category.slug}`,
    })),
  }
}

export async function getResearchCategoryContent(categorySlug: string) {
  const category = getResearchCategory(categorySlug)
  if (!category) return null

  const cmsItems = await loadCmsItems()
  const fromCms = cmsItems.filter((item) => item.category === category.slug)
  const fallback = getResearchItemsByCategory(category.slug)
  const merged = new Map<string, ResearchItem>()

  for (const item of fallback) merged.set(item.slug, item)
  for (const item of fromCms) merged.set(item.slug, item)

  return {
    category,
    items: Array.from(merged.values()),
    hub: researchPageContent.hub,
  }
}

export async function getResearchDetailContent(categorySlug: string, itemSlug: string) {
  const category = getResearchCategory(categorySlug)
  if (!category) return null

  const cmsItems = await loadCmsItems()
  const fromCms = cmsItems.find(
    (item) => item.category === category.slug && item.slug === itemSlug,
  )
  const item = fromCms ?? getResearchItem(categorySlug, itemSlug)
  if (!item) return null

  const siblings = (await getResearchCategoryContent(categorySlug))?.items ?? []

  return {
    category,
    item,
    related: siblings.filter((entry) => entry.slug !== item.slug).slice(0, 3),
  }
}

export { RESEARCH_CATEGORIES, isResearchCategorySlug }
