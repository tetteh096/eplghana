import { newsEventsPageContent } from '@/config/newsEventsContent'
import { getBlogPosts } from '@/utilities/getBlogPosts'
import { getPastEvents, getUpcomingEvents, type EventSummary } from '@/utilities/getEvents'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { News } from '@/payload-types'

export type NewsEventsStoryCard = {
  title: string
  excerpt: string
  image: string
  href: string
  ctaLabel: string
}

export type NewsEventsPageContent = {
  hero: {
    title: string
    lead: string
  }
  featuredSection: {
    eyebrow: string
    title: string
  }
  pastSection: {
    eyebrow: string
    title: string
  }
  upcomingSection: {
    eyebrow: string
    title: string
  }
  featuredStories: NewsEventsStoryCard[]
  upcomingEvents: EventSummary[]
  pastEvents: {
    slug: string
    title: string
    excerpt: string
    image: string
    href: string
  }[]
  cta: {
    title: string
    ctaLabel: string
    ctaHref: string
    image: string
  }
}

function mapStoryPost(post: {
  slug: string
  title: string
  excerpt: string
  image: string
}): NewsEventsStoryCard {
  return {
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    href: `/news/${post.slug}`,
    ctaLabel: 'Read more',
  }
}

async function getFeaturedStories(limit = 2): Promise<NewsEventsStoryCard[]> {
  const payload = await tryGetPayload()

  if (payload) {
    try {
      const featured = await payload.find({
        collection: 'news',
        depth: 1,
        limit,
        sort: '-publishedAt',
        where: {
          and: [{ status: { equals: 'published' } }, { featuredOnHome: { equals: true } }],
        },
      })

      const fromFeatured = featured.docs
        .map((post: News) => {
          const image = getMediaUrl(post.featuredImage)
          if (!image) return null
          return mapStoryPost({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            image,
          })
        })
        .filter(Boolean) as NewsEventsStoryCard[]

      if (fromFeatured.length >= limit) return fromFeatured.slice(0, limit)

      const remaining = limit - fromFeatured.length
      const usedSlugs = new Set(fromFeatured.map((story) => story.href))

      const latest = await payload.find({
        collection: 'news',
        depth: 1,
        limit: limit + fromFeatured.length,
        sort: '-publishedAt',
        where: { status: { equals: 'published' } },
      })

      for (const post of latest.docs) {
        const image = getMediaUrl(post.featuredImage)
        const href = `/news/${post.slug}`
        if (!image || usedSlugs.has(href)) continue
        fromFeatured.push(
          mapStoryPost({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            image,
          }),
        )
        if (fromFeatured.length >= limit) break
      }

      if (fromFeatured.length > 0) return fromFeatured
    } catch {
      // fall through
    }
  }

  const posts = await getBlogPosts()
  if (posts.length > 0) {
    return posts.slice(0, limit).map(mapStoryPost)
  }

  return newsEventsPageContent.featuredStories.map((story) => ({
    title: story.title,
    excerpt: story.excerpt,
    image: story.image,
    href: story.href,
    ctaLabel: story.ctaLabel,
  }))
}

export async function getNewsEventsPageContent(): Promise<NewsEventsPageContent> {
  const [featuredStories, upcomingEvents, pastEvents] = await Promise.all([
    getFeaturedStories(2),
    getUpcomingEvents(6),
    getPastEvents(6),
  ])

  const staticPast =
    pastEvents.length > 0
      ? pastEvents
      : newsEventsPageContent.pastEvents.map((event) => ({
          slug: event.slug,
          title: event.title,
          excerpt: event.excerpt,
          image: event.image,
          href: event.href,
        }))

  return {
    hero: newsEventsPageContent.hero,
    featuredSection: {
      eyebrow: 'Featured Stories',
      title: 'Latest from EPL Ghana',
    },
    pastSection: {
      eyebrow: 'Past Events Highlights',
      title: 'Milestones & engagements',
    },
    upcomingSection: {
      eyebrow: 'Upcoming Events',
      title: 'What’s coming up',
    },
    featuredStories:
      featuredStories.length > 0
        ? featuredStories
        : newsEventsPageContent.featuredStories.map((story) => ({
            title: story.title,
            excerpt: story.excerpt,
            image: story.image,
            href: story.href,
            ctaLabel: story.ctaLabel,
          })),
    upcomingEvents,
    pastEvents: staticPast,
    cta: newsEventsPageContent.cta,
  }
}
