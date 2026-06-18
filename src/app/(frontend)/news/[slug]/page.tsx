import { notFound } from 'next/navigation'

import { ChariticsBlogDetailPage } from '@/components/charitics/ChariticsBlogDetailPage'
import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { getAllBlogSlugs, getBlogPostBySlug } from '@/utilities/getBlogPost'
import { getBlogListingData, getRecentBlogPosts } from '@/utilities/getBlogPosts'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  return { title: post?.title ?? 'Article' }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const [post, recentPosts, { meta }] = await Promise.all([
    getBlogPostBySlug(slug),
    getRecentBlogPosts(3),
    getBlogListingData(),
  ])

  if (!post) {
    notFound()
  }

  return (
    <ChariticsPageMain
      backgroundImage={post.image}
      crumbs={[
        { href: '/knowledge-products', label: 'Knowledge Products' },
        { href: '/news', label: 'Blog' },
        { label: post.title },
      ]}
      title={post.title}
    >
      <ChariticsBlogDetailPage meta={meta} post={post} recentPosts={recentPosts} />
    </ChariticsPageMain>
  )
}
