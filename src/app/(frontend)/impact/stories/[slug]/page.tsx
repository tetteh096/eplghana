import { notFound } from 'next/navigation'

import { ChariticsCommunityStoryDetail } from '@/components/charitics/ChariticsCommunityStoryDetail'
import { impactPageContent } from '@/config/impactPageContent'
import { getCommunityStoryBySlug } from '@/utilities/getImpactPageContent'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return impactPageContent.communityStories.items.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const content = await getCommunityStoryBySlug(slug)
  return {
    title: content ? `${content.story.assembly} | Community Stories` : 'Community Story',
    description: content?.story.desc,
  }
}

export default async function CommunityStoryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const content = await getCommunityStoryBySlug(slug)
  if (!content) notFound()
  return <ChariticsCommunityStoryDetail content={content} />
}
