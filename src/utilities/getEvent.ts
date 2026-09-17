import { getFallbackEvent, type EventDetail } from '@/config/newsEventsContent'
import { getAllPublishedEventSlugs } from '@/utilities/getEvents'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'

function lexicalToParagraphs(content: unknown): string[] {
  if (!content || typeof content !== 'object') return []
  const root = content as { root?: { children?: unknown[] } }
  const paragraphs: string[] = []

  for (const node of root.root?.children ?? []) {
    if (
      typeof node === 'object' &&
      node !== null &&
      'type' in node &&
      node.type === 'paragraph' &&
      'children' in node &&
      Array.isArray(node.children)
    ) {
      const text = node.children
        .map((child) =>
          typeof child === 'object' && child !== null && 'text' in child
            ? String(child.text)
            : '',
        )
        .join('')
        .trim()

      if (text) paragraphs.push(text)
    }
  }

  return paragraphs
}

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  const payload = await tryGetPayload()

  if (payload) {
    try {
      const result = await payload.find({
        collection: 'events',
        depth: 1,
        limit: 1,
        where: { slug: { equals: slug } },
      })

      const event = result.docs[0]
      if (event) {
        const image = getMediaUrl(event.featuredImage)
        if (image) {
          const paragraphs = lexicalToParagraphs(event.content)
          const gallery = (event.gallery ?? [])
            .map((row) => {
              const src = getMediaUrl(row.image)
              return src ? { src, caption: row.caption ?? null } : null
            })
            .filter((row): row is { src: string; caption: string | null } => row !== null)
          return {
            slug: event.slug,
            title: event.title,
            excerpt: event.excerpt,
            image,
            eventDate: event.eventDate,
            venue: event.venue,
            paragraphs: paragraphs.length > 0 ? paragraphs : [event.excerpt],
            registrationUrl: event.registrationUrl ?? null,
            registrationLabel: event.registrationLabel ?? null,
            gallery,
          }
        }
      }
    } catch {
      // fall through
    }
  }

  return getFallbackEvent(slug) ?? null
}

export async function getAllEventSlugs(): Promise<string[]> {
  return getAllPublishedEventSlugs()
}
