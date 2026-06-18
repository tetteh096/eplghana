import { notFound } from 'next/navigation'

import { ChariticsEventDetailPage } from '@/components/charitics/ChariticsEventDetailPage'
import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { getAllEventSlugs, getEventBySlug } from '@/utilities/getEvent'
import { getPastEvents, getUpcomingEvents } from '@/utilities/getEvents'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  return { title: event?.title ?? 'Event' }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  let otherEvents = (await getUpcomingEvents(4))
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
  let otherEventsArePast = false

  // No other upcoming events? Show recent past events instead so the strip
  // always has something to explore.
  if (otherEvents.length === 0) {
    otherEvents = (await getPastEvents(4)).filter((item) => item.slug !== slug).slice(0, 3)
    otherEventsArePast = otherEvents.length > 0
  }

  return (
    <ChariticsPageMain
      backgroundImage={event.image}
      crumbs={[
        { href: '/news/events', label: 'News & Events' },
        { label: event.title },
      ]}
      title={event.title}
    >
      <ChariticsEventDetailPage
        event={event}
        otherEvents={otherEvents}
        otherEventsArePast={otherEventsArePast}
      />
    </ChariticsPageMain>
  )
}
