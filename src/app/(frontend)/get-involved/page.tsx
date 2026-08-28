import { ChariticsGetInvolvedPage } from '@/components/charitics/ChariticsGetInvolvedPage'
import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { getGetInvolvedPageContent } from '@/utilities/getGetInvolvedPageContent'

export const metadata = { title: 'Get Involved' }

export default async function GetInvolvedPage() {
  const content = await getGetInvolvedPageContent()

  return (
    <ChariticsPageMain crumbs={[{ label: 'Get Involved' }]} title="Get Involved">
      <ChariticsGetInvolvedPage content={content} />
    </ChariticsPageMain>
  )
}
