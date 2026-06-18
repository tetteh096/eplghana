import { ChariticsAnnualReportsPage } from '@/components/charitics/ChariticsAnnualReportsPage'
import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { getAnnualReportsPageContent } from '@/utilities/getAnnualReportsPageContent'

export const metadata = { title: 'Annual Reports' }

export default async function AnnualReportsPage() {
  const content = await getAnnualReportsPageContent()

  return (
    <ChariticsPageMain
      crumbs={[
        { href: '/knowledge-products', label: 'Knowledge Products' },
        { label: 'Annual Reports' },
      ]}
      title={content.hero.title}
    >
      <ChariticsAnnualReportsPage content={content} />
    </ChariticsPageMain>
  )
}
