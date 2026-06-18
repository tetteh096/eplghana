import { fallbackEvents, type EventDetail } from '@/config/newsEventsContent'
import type { Event } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'

export type EventSummary = {
  slug: string
  title: string
  excerpt: string
  image: string
  eventDate: string
  venue: string
  href: string
}

function mapEventDoc(doc: Event): EventSummary | null {
  const image = getMediaUrl(doc.featuredImage)
  if (!image || !doc.eventDate) return null

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    image,
    eventDate: doc.eventDate,
    venue: doc.venue,
    href: `/events/${doc.slug}`,
  }
}

function mapFallbackEvent(event: EventDetail): EventSummary {
  return {
    slug: event.slug,
    title: event.title,
    excerpt: event.excerpt,
    image: event.image,
    eventDate: event.eventDate,
    venue: event.venue,
    href: `/events/${event.slug}`,
  }
}

export async function getUpcomingEvents(limit = 4): Promise<EventSummary[]> {
  const payload = await tryGetPayload()
  const nowISO = new Date().toISOString()

  if (payload) {
    try {
      const result = await payload.find({
        collection: 'events',
        depth: 1,
        limit,
        sort: 'eventDate',
        where: {
          and: [
            { status: { equals: 'published' } },
            { eventDate: { greater_than_equal: nowISO } },
          ],
        },
      })

      const mapped = result.docs.map(mapEventDoc).filter(Boolean) as EventSummary[]
      if (mapped.length > 0) return mapped
    } catch {
      // fall through
    }
  }

  return fallbackEvents
    .filter((event) => new Date(event.eventDate).getTime() >= Date.now())
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
    .slice(0, limit)
    .map(mapFallbackEvent)
}

export async function getPastEvents(limit = 6): Promise<EventSummary[]> {
  const payload = await tryGetPayload()
  const nowISO = new Date().toISOString()

  if (payload) {
    try {
      const result = await payload.find({
        collection: 'events',
        depth: 1,
        limit,
        sort: '-eventDate',
        where: {
          and: [
            { status: { equals: 'published' } },
            { eventDate: { less_than: nowISO } },
          ],
        },
      })

      const mapped = result.docs.map(mapEventDoc).filter(Boolean) as EventSummary[]
      if (mapped.length > 0) return mapped
    } catch {
      // fall through
    }
  }

  return fallbackEvents
    .filter((event) => new Date(event.eventDate).getTime() < Date.now())
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
    .slice(0, limit)
    .map(mapFallbackEvent)
}

export async function getAllPublishedEventSlugs(): Promise<string[]> {
  const payload = await tryGetPayload()

  if (payload) {
    try {
      const result = await payload.find({
        collection: 'events',
        depth: 0,
        limit: 200,
        where: { status: { equals: 'published' } },
      })

      if (result.docs.length > 0) {
        return result.docs.map((doc) => doc.slug)
      }
    } catch {
      // fall through
    }
  }

  return fallbackEvents.map((event) => event.slug)
}
