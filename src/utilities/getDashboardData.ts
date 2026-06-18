import { formSubmissionTypes } from '@/collections/FormSubmissions'
import { getPayloadClient } from '@/utilities/getPayloadClient'

export type DashboardStat = {
  id: string
  label: string
  value: number
  hint: string
  href: string
}

export type DashboardBlogItem = {
  id: string
  title: string
  status: string
  category: string
  publishedAt: string | null
  href: string
}

export type DashboardEventItem = {
  id: string
  title: string
  eventDate: string
  venue: string
  status: string
  href: string
  isUpcoming: boolean
}

export type DashboardInboxItem = {
  id: string
  fullName: string
  formType: string
  formTypeLabel: string
  status: string
  createdAt: string
  href: string
}

export type DashboardData = {
  stats: DashboardStat[]
  recentPosts: DashboardBlogItem[]
  upcomingEvents: DashboardEventItem[]
  recentEvents: DashboardEventItem[]
  recentInbox: DashboardInboxItem[]
}

const formTypeLabels = Object.fromEntries(
  formSubmissionTypes.map((t) => [t.value, t.label]),
) as Record<string, string>

const categoryLabels: Record<string, string> = {
  'blog-posts': 'Blog',
  germel: 'GERMEL',
  programme: 'Programme',
}

function adminHref(collection: string, id?: string) {
  return id ? `/admin/collections/${collection}/${id}` : `/admin/collections/${collection}`
}

export async function getDashboardData(): Promise<DashboardData> {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()

  const [
    newsTotal,
    newsPublished,
    newsDraft,
    eventsTotal,
    eventsUpcoming,
    inboxNew,
    fellowsTotal,
    mediaTotal,
    projectsTotal,
    recentPostsResult,
    upcomingEventsResult,
    recentEventsResult,
    recentInboxResult,
  ] = await Promise.all([
    payload.count({ collection: 'news', overrideAccess: true }),
    payload.count({
      collection: 'news',
      overrideAccess: true,
      where: { status: { equals: 'published' } },
    }),
    payload.count({
      collection: 'news',
      overrideAccess: true,
      where: { status: { equals: 'draft' } },
    }),
    payload.count({ collection: 'events', overrideAccess: true }),
    payload.count({
      collection: 'events',
      overrideAccess: true,
      where: { eventDate: { greater_than_equal: now } },
    }),
    payload.count({
      collection: 'form-submissions',
      overrideAccess: true,
      where: { status: { equals: 'new' } },
    }),
    payload.count({ collection: 'fellows', overrideAccess: true }),
    payload.count({ collection: 'media', overrideAccess: true }),
    payload.count({ collection: 'projects', overrideAccess: true }),
    payload.find({
      collection: 'news',
      depth: 0,
      limit: 5,
      overrideAccess: true,
      sort: '-updatedAt',
    }),
    payload.find({
      collection: 'events',
      depth: 0,
      limit: 5,
      overrideAccess: true,
      sort: 'eventDate',
      where: { eventDate: { greater_than_equal: now } },
    }),
    payload.find({
      collection: 'events',
      depth: 0,
      limit: 4,
      overrideAccess: true,
      sort: '-eventDate',
      where: { eventDate: { less_than: now } },
    }),
    payload.find({
      collection: 'form-submissions',
      depth: 0,
      limit: 5,
      overrideAccess: true,
      sort: '-createdAt',
    }),
  ])

  const stats: DashboardStat[] = [
    {
      id: 'news',
      label: 'Blog posts',
      value: newsTotal.totalDocs,
      hint: `${newsPublished.totalDocs} live · ${newsDraft.totalDocs} draft`,
      href: adminHref('news'),
    },
    {
      id: 'events',
      label: 'Events',
      value: eventsTotal.totalDocs,
      hint: `${eventsUpcoming.totalDocs} upcoming`,
      href: adminHref('events'),
    },
    {
      id: 'inbox',
      label: 'New enquiries',
      value: inboxNew.totalDocs,
      hint: inboxNew.totalDocs === 1 ? 'Needs review' : 'In form submissions',
      href: adminHref('form-submissions'),
    },
    {
      id: 'fellows',
      label: 'Fellows',
      value: fellowsTotal.totalDocs,
      hint: 'Profiles on site',
      href: adminHref('fellows'),
    },
    {
      id: 'projects',
      label: 'Projects',
      value: projectsTotal.totalDocs,
      hint: 'Programmes listed',
      href: adminHref('projects'),
    },
    {
      id: 'media',
      label: 'Media files',
      value: mediaTotal.totalDocs,
      hint: 'Images & uploads',
      href: adminHref('media'),
    },
  ]

  const recentPosts: DashboardBlogItem[] = recentPostsResult.docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title,
    status: doc.status ?? 'draft',
    category: categoryLabels[doc.category ?? ''] ?? 'Blog',
    publishedAt: doc.publishedAt ?? null,
    href: adminHref('news', String(doc.id)),
  }))

  const mapEvent = (doc: (typeof upcomingEventsResult.docs)[number], isUpcoming: boolean) => ({
    id: String(doc.id),
    title: doc.title,
    eventDate: doc.eventDate,
    venue: doc.venue,
    status: doc.status ?? 'draft',
    href: adminHref('events', String(doc.id)),
    isUpcoming,
  })

  return {
    stats,
    recentPosts,
    upcomingEvents: upcomingEventsResult.docs.map((doc) => mapEvent(doc, true)),
    recentEvents: recentEventsResult.docs.map((doc) => mapEvent(doc, false)),
    recentInbox: recentInboxResult.docs.map((doc) => ({
      id: String(doc.id),
      fullName: doc.fullName,
      formType: doc.formType,
      formTypeLabel: formTypeLabels[doc.formType] ?? doc.formType,
      status: doc.status ?? 'new',
      createdAt: doc.createdAt,
      href: adminHref('form-submissions', String(doc.id)),
    })),
  }
}
