import type { Metadata } from 'next'

import { ChariticsHome } from '@/components/charitics/ChariticsHome'
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from '@/config/site'
import { getHomeContent } from '@/utilities/getHomeContent'
import { getHomeProjects } from '@/utilities/getHomeProjects'
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
  const {
    settings,
    heroSlides,
    eplWaySection,
    projectsSection,
    statsSection,
    impactStories,
    eventsSection,
  } = await getHomeContent(baseSettings)

  const empty = { docs: [] as never[] }
  const nowISO = new Date().toISOString()

  const [homeProjects, upcomingEvents] = payload
    ? await Promise.all([
        getHomeProjects(),
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
      ])
    : [await getHomeProjects(), empty]

  // No upcoming events? Show the most recent past events instead (newest first).
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
      eplWaySection={eplWaySection}
      events={events}
      eventsArePast={eventsArePast}
      eventsSection={eventsSection}
      heroSlides={heroSlides}
      impactStories={impactStories}
      projects={homeProjects}
      projectsSection={projectsSection}
      settings={settings}
      statsSection={statsSection}
    />
  )
}
