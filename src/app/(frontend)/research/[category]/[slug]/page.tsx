import { notFound } from 'next/navigation'

import { ChariticsResearchDetail } from '@/components/charitics/ChariticsResearchDetail'
import { researchPageContent } from '@/config/researchPageContent'
import {
  getResearchDetailContent,
  isResearchCategorySlug,
} from '@/utilities/getResearchContent'

type PageProps = {
  params: Promise<{ category: string; slug: string }>
}

export function generateStaticParams() {
  return researchPageContent.items.map((item) => ({
    category: item.category,
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params
  const content = await getResearchDetailContent(category, slug)
  return {
    title: content?.item.title ?? 'Publication',
    description: content?.item.summary,
  }
}

export default async function ResearchDetailRoute({ params }: PageProps) {
  const { category, slug } = await params
  if (!isResearchCategorySlug(category)) notFound()

  const content = await getResearchDetailContent(category, slug)
  if (!content) notFound()

  return <ChariticsResearchDetail content={content} />
}
