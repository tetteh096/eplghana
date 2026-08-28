import { ChariticsAllNewsPage } from '@/components/charitics/ChariticsAllNewsPage'
import { getBlogListingData } from '@/utilities/getBlogPosts'

export const metadata = {
  title: 'All News & Blog Posts',
  description: 'Explore all news, policy updates, and thought leadership articles from Emerging Public Leaders of Ghana.',
}

export default async function AllNewsPage() {
  const { posts, meta } = await getBlogListingData()

  return (
    <main>
      <ChariticsAllNewsPage meta={meta} posts={posts} />
    </main>
  )
}
