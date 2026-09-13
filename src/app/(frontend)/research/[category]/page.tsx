import { notFound } from 'next/navigation'

import { ChariticsResearchCategoryPage } from '@/components/charitics/ChariticsResearchCategoryPage'
import {
  getResearchCategoryContent,
  isResearchCategorySlug,
  RESEARCH_CATEGORIES,
} from '@/utilities/getResearchContent'

type PageProps = {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return RESEARCH_CATEGORIES.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { category: categorySlug } = await params
  const content = await getResearchCategoryContent(categorySlug)
  return {
    title: content?.category.title ?? 'Research',
    description: content?.category.description,
  }
}

export default async function ResearchCategoryRoute({ params }: PageProps) {
  const { category } = await params
  if (!isResearchCategorySlug(category)) notFound()

  const content = await getResearchCategoryContent(category)
  if (!content) notFound()

  return <ChariticsResearchCategoryPage content={content} />
}
