import { ChariticsOurJourneyPage } from '@/components/charitics/ChariticsOurJourneyPage'
import { getOurJourneyContent } from '@/utilities/getOurJourneyContent'

export const metadata = { title: 'Our Journey' }

export default async function OurJourneyPage() {
  const content = await getOurJourneyContent()

  return (
    <main>
      <ChariticsOurJourneyPage content={content} />
    </main>
  )
}
