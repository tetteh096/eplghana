import { ChariticsPartnersPage } from '@/components/charitics/ChariticsPartnersPage'
import { getPartnersPageContent } from '@/utilities/getPartnersPageContent'

export const metadata = { title: 'Partner With EPL Ghana' }

export default async function PartnerWithUsPage() {
  const content = await getPartnersPageContent()

  return (
    <main>
      <ChariticsPartnersPage content={content} />
    </main>
  )
}
