import type { Metadata } from 'next'

import { ChariticsHome } from '@/components/charitics/ChariticsHome'
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from '@/config/site'
import { getHomeBlogPosts } from '@/utilities/getBlogPosts'
import { getHomeContent } from '@/utilities/getHomeContent'
import { getFeaturedTestimonials } from '@/utilities/getTestimonials'
import { getSiteSettings, tryGetPayload } from '@/utilities/payloadSafe'

export const metadata: Metadata = {
  // Home owns the brand title (the layout template would otherwise suffix it).
  title: `${SITE_SHORT_NAME} | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE_SHORT_NAME} | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: '/',
  },
}

export default async function HomePage() {
  const payload = await tryGetPayload()
  const baseSettings = await getSiteSettings(1)
  const { settings, sections, heroSlides, heroAvatars, gallery } =
    await getHomeContent(baseSettings)

  const empty = { docs: [] as never[] }
  const nowISO = new Date().toISOString()

  const [news, projects, upcomingEvents, testimonials] = payload
    ? await Promise.all([
        getHomeBlogPosts(5),
        // Home projects: featured ones first, ordered by homeOrder.
        payload.find({
          collection: 'projects',
          depth: 1,
          limit: 6,
          sort: 'homeOrder',
          where: {
            and: [{ status: { equals: 'published' } }, { featuredOnHome: { equals: true } }],
          },
        }),
        // Upcoming events only (event date in the future), soonest first.
        payload.find({
          collection: 'events',
          depth: 1,
          limit: 4,
          sort: 'eventDate',
          where: {
            and: [
              { status: { equals: 'published' } },
              { eventDate: { greater_than_equal: nowISO } },
            ],
          },
        }),
        getFeaturedTestimonials(payload, 6),
      ])
    : [empty, empty, empty, [] as never[]]

  // No upcoming events? Show the most recent past events instead (newest first),
  // and tell the component so it hides the countdown and relabels the section.
  let events = upcomingEvents.docs
  let eventsArePast = false
  if (payload && events.length === 0) {
    const past = await payload.find({
      collection: 'events',
      depth: 1,
      limit: 4,
      sort: '-eventDate',
      where: {
        and: [
          { status: { equals: 'published' } },
          { eventDate: { less_than: nowISO } },
        ],
      },
    })
    if (past.docs.length > 0) {
      events = past.docs
      eventsArePast = true
    }
  }

  return (
    <ChariticsHome
      events={events}
      eventsArePast={eventsArePast}
      gallery={gallery}
      heroAvatars={heroAvatars}
      heroSlides={heroSlides}
      news={Array.isArray(news) ? news : news.docs}
      projects={projects.docs}
      sections={sections}
      settings={settings}
      testimonials={testimonials}
    />
  )
}
