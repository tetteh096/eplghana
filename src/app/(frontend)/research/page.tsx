import { ChariticsResearchHub } from '@/components/charitics/ChariticsResearchHub'
import { getResearchHubContent } from '@/utilities/getResearchContent'

export const metadata = {
  title: 'Research and Publications',
  description:
    'Articles, factsheets, studies, and technical policy briefs from Emerging Public Leaders of Ghana.',
}

export default async function ResearchPage() {
  const content = await getResearchHubContent()
  return <ChariticsResearchHub content={content} />
}
