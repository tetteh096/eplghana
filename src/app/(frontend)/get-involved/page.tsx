import { ChariticsGetInvolvedPage } from '@/components/charitics/ChariticsGetInvolvedPage'
import { getGetInvolvedPageContent } from '@/utilities/getGetInvolvedPageContent'

export const metadata = { title: 'Get Involved | EPL Ghana' }

export default async function GetInvolvedPage() {
  const content = await getGetInvolvedPageContent()

  return (
    <main>
      <ChariticsGetInvolvedPage content={content} />
    </main>
  )
}
