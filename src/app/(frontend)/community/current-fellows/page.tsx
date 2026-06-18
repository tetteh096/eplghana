import { ChariticsCurrentFellowsPage } from '@/components/charitics/ChariticsCurrentFellowsPage'
import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { getCurrentFellowsContent } from '@/utilities/getCurrentFellowsContent'

export const metadata = { title: 'Current Fellows' }

export default async function CurrentFellowsPage() {
  const content = await getCurrentFellowsContent()

  return (
    <ChariticsPageMain
      crumbs={[
        { href: '/community', label: 'Community' },
        { label: 'Current Fellows' },
      ]}
      title="Current Fellows"
    >
      <ChariticsCurrentFellowsPage content={content} />
    </ChariticsPageMain>
  )
}
