import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { ChariticsTeamPage } from '@/components/charitics/ChariticsTeamPage'
import { getTeamContent } from '@/utilities/getTeamContent'

export const metadata = { title: 'Our Team' }

export default async function TeamPage() {
  const content = await getTeamContent()

  return (
    <ChariticsPageMain crumbs={[{ href: '/about', label: 'About Us' }]} title="Our Team">
      <ChariticsTeamPage content={content} />
    </ChariticsPageMain>
  )
}
