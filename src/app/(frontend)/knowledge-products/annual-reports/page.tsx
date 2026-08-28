import { ChariticsAnnualReportsPage } from '@/components/charitics/ChariticsAnnualReportsPage'
import { getAnnualReportsPageContent } from '@/utilities/getAnnualReportsPageContent'

export const metadata = { title: 'Annual Reports' }

export default async function AnnualReportsPage() {
  const content = await getAnnualReportsPageContent()

  return (
    <main>
      <ChariticsAnnualReportsPage content={content} />
    </main>
  )
}
