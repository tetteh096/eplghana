import { ChariticsDirectorMessage } from '@/components/charitics/ChariticsDirectorMessage'
import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { getDirectorMessageContent } from '@/utilities/getDirectorMessageContent'

export const metadata = { title: 'Message from the Country Director' }

export default async function DirectorMessagePage() {
  const content = await getDirectorMessageContent()

  return (
    <ChariticsPageMain
      crumbs={[
        { href: '/about', label: 'About Us' },
        { label: 'Country Director’s Message' },
      ]}
      title="Message from the Country Director"
    >
      <ChariticsDirectorMessage content={content} />
    </ChariticsPageMain>
  )
}
