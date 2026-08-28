import { ChariticsAboutPage } from '@/components/charitics/ChariticsAboutPage'
import { getAboutContent } from '@/utilities/getAboutContent'
import { getPartnersContent } from '@/utilities/getPartnersContent'
import { getTeamContent } from '@/utilities/getTeamContent'
import { getPublishedTestimonials } from '@/utilities/getTestimonials'
import { getSiteSettings, tryGetPayload } from '@/utilities/payloadSafe'
import { resolveFellowTestimonials } from '@/utilities/resolveFellowTestimonials'

export const metadata = { title: 'About Us' }

export default async function AboutPage() {
  const payload = await tryGetPayload()
  const [settings, content, team, partners, testimonials] = await Promise.all([
    getSiteSettings(1),
    getAboutContent(),
    getTeamContent(),
    getPartnersContent(),
    payload ? getPublishedTestimonials(payload, 12) : Promise.resolve([]),
  ])

  return (
    <main>
      <ChariticsAboutPage
        boardMembers={team.boardMembers}
        content={content}
        partners={partners}
        settings={settings}
        staffMembers={team.staffMembers}
        teamIntro={team.intro}
        testimonials={resolveFellowTestimonials(testimonials)}
      />
    </main>
  )
}
