import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { ChariticsPartnersPage } from '@/components/charitics/ChariticsPartnersPage'
import { getPartnersPageContent } from '@/utilities/getPartnersPageContent'

export const metadata = { title: 'Our Partners' }

export default async function PartnersPage() {
  const content = await getPartnersPageContent()

  return (
    <ChariticsPageMain
      crumbs={[
        { href: '/community', label: 'Community' },
        { label: 'Our Partners' },
      ]}
      title="Our Partners"
    >
      <ChariticsPartnersPage content={content} />
    </ChariticsPageMain>
  )
}
