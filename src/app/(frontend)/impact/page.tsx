import { ChariticsImpactPage } from '@/components/charitics/ChariticsImpactPage'
import { getImpactPageContent } from '@/utilities/getImpactPageContent'

export const metadata = {
  title: 'Impact',
  description:
    'Our reach, fellows achievements, community transformation, and research generated across Ghana.',
}

export default async function ImpactPage() {
  const content = await getImpactPageContent()

  return (
    <main>
      <ChariticsImpactPage content={content} />
    </main>
  )
}
