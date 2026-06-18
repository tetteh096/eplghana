import { ChariticsAboutIntro } from '@/components/charitics/ChariticsAboutIntro'
import { ChariticsAboutTabs } from '@/components/charitics/ChariticsAboutTabs'
import { ChariticsFellowTestimonials } from '@/components/charitics/ChariticsFellowTestimonials'
import { ChariticsStats } from '@/components/charitics/ChariticsStats'
import { ChariticsWhyPartner } from '@/components/charitics/ChariticsWhyPartner'
import type { FellowTestimonialSlide } from '@/config/fellowTestimonials'
import type { SiteSetting } from '@/payload-types'
import type { AboutContent } from '@/utilities/getAboutContent'

type ChariticsAboutPageProps = {
  settings: SiteSetting
  content: AboutContent
  testimonials: FellowTestimonialSlide[]
}

export function ChariticsAboutPage({
  content,
  settings,
  testimonials,
}: ChariticsAboutPageProps) {
  return (
    <>
      <ChariticsAboutIntro
        approach={content.approach}
        intro={content.intro}
        settings={settings}
        story={content.story}
      />

      <ChariticsAboutTabs
        impact={content.impact}
        mission={content.mission}
        vision={content.vision}
      />

      <ChariticsStats settings={settings} stats={content.stats} variant="about" />

      <ChariticsWhyPartner partner={content.partner} />

      <ChariticsFellowTestimonials
        allLink="/community/current-fellows"
        allLinkLabel="All Testimonials"
        showAllLink
        slides={testimonials}
        subtitle="Fellow Voices"
        title="Testimonials"
      />
    </>
  )
}
