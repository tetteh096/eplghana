import {
  ChariticsCommunityStoriesPage,
} from '@/components/charitics/ChariticsCommunityStoryDetail'
import { getCommunityStories } from '@/utilities/getImpactPageContent'

export const metadata = {
  title: 'Community Stories & Interventions',
  description:
    'Grassroots stories from municipal assemblies where EPL Fellows turned policy into local impact.',
}

export default async function CommunityStoriesIndexPage() {
  const content = await getCommunityStories()
  return <ChariticsCommunityStoriesPage content={content} />
}
