import { ChariticsBlogListingPage } from '@/components/charitics/ChariticsBlogListingPage'
import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { blogPageContent } from '@/config/blogContent'
import { getBlogListingData, getRecentBlogPosts } from '@/utilities/getBlogPosts'

export const metadata = { title: 'Blog' }

type PageProps = {
  searchParams: Promise<{ q?: string; category?: string }>
}

export default async function NewsPage({ searchParams }: PageProps) {
  const { q, category } = await searchParams
  const [{ posts, meta }, recentPosts] = await Promise.all([
    getBlogListingData(),
    getRecentBlogPosts(3),
  ])

  const query = q?.trim().toLowerCase() ?? ''
  const filtered = posts.filter((post) => {
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      (post.tags ?? []).some((tag) => tag.toLowerCase().includes(query))

    const matchesCategory = !category || post.categorySlug === category

    return matchesQuery && matchesCategory
  })

  return (
    <ChariticsPageMain
      crumbs={[{ href: '/knowledge-products', label: 'Knowledge Products' }, { label: 'Blog' }]}
      title={blogPageContent.hero.title}
    >
      <ChariticsBlogListingPage
        activeCategory={category}
        meta={meta}
        posts={filtered}
        recentPosts={recentPosts}
        searchQuery={q ?? ''}
      />
    </ChariticsPageMain>
  )
}
