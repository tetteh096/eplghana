import { ChariticsAboutPage } from '@/components/charitics/ChariticsAboutPage'
import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { getAboutContent } from '@/utilities/getAboutContent'
import { getPublishedTestimonials } from '@/utilities/getTestimonials'
import { getSiteSettings, tryGetPayload } from '@/utilities/payloadSafe'
import { resolveFellowTestimonials } from '@/utilities/resolveFellowTestimonials'

export const metadata = { title: 'About Us' }

export default async function AboutPage() {
  const payload = await tryGetPayload()
  const [settings, content, testimonials] = await Promise.all([
    getSiteSettings(1),
    getAboutContent(),
    payload ? getPublishedTestimonials(payload, 12) : Promise.resolve([]),
  ])

  return (
    <ChariticsPageMain title="About Us">
      <ChariticsAboutPage
        content={content}
        settings={settings}
        testimonials={resolveFellowTestimonials(testimonials)}
      />
    </ChariticsPageMain>
  )
}
