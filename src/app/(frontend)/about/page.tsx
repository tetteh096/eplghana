import { ChariticsAboutPage } from '@/components/charitics/ChariticsAboutPage'
import { getAboutContent } from '@/utilities/getAboutContent'
import { getPartnersContent } from '@/utilities/getPartnersContent'
import { getTeamContent } from '@/utilities/getTeamContent'

export const metadata = { title: 'About Us' }

export default async function AboutPage() {
  const [content, team, partners] = await Promise.all([
    getAboutContent(),
    getTeamContent(),
    getPartnersContent(),
  ])

  return (
    <main>
      <ChariticsAboutPage
        boardMembers={team.boardMembers}
        content={content}
        partners={partners}
        staffMembers={team.staffMembers}
      />
    </main>
  )
}
