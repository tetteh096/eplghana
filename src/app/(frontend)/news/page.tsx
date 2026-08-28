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

  return (
    <main>
      <ChariticsBlogListingPage
        activeCategory={category}
        meta={meta}
        posts={posts}
        recentPosts={recentPosts}
        searchQuery={q ?? ''}
      />
    </main>
  )
}
