import { ChariticsBlogListingPage } from '@/components/charitics/ChariticsBlogListingPage'
import { eplHomeImages } from '@/config/eplMedia'
import { getBlogListingData, getRecentBlogPosts } from '@/utilities/getBlogPosts'
import { getEditorialHero } from '@/utilities/getEditorialPageContent'

export const metadata = { title: 'News & Insights' }

type PageProps = {
  searchParams: Promise<{ q?: string; category?: string }>
}

export default async function NewsPage({ searchParams }: PageProps) {
  const { q, category } = await searchParams
  const [{ posts, meta }, recentPosts, hero] = await Promise.all([
    getBlogListingData(),
    getRecentBlogPosts(3),
    getEditorialHero('/news', 'newsPage', {
      eyebrow: 'Updates & Engagement',
      title: 'News & Insights',
      lead: 'Stay updated with our public sector events, fellow recruitment opportunities, and thought leadership pieces.',
      image: eplHomeImages.aboutMain,
    }),
  ])

  return (
    <main>
      <ChariticsBlogListingPage
        activeCategory={category}
        hero={hero}
        meta={meta}
        posts={posts}
        recentPosts={recentPosts}
        searchQuery={q ?? ''}
      />
    </main>
  )
}
