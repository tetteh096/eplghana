import { CMS_PRODUCT_NAME } from '@/config/brand'
import { getDashboardData } from '@/utilities/getDashboardData'

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const dateTimeFmt = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  month: 'short',
})

function formatDate(value: string | null) {
  if (!value) return 'Not scheduled'
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? '—' : dateFmt.format(d)
}

function formatDateTime(value: string) {
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? '—' : dateTimeFmt.format(d)
}

function statusClass(status: string) {
  if (status === 'published') return 'epl-dash__pill epl-dash__pill--live'
  if (status === 'new') return 'epl-dash__pill epl-dash__pill--new'
  if (status === 'reviewed') return 'epl-dash__pill epl-dash__pill--muted'
  return 'epl-dash__pill epl-dash__pill--draft'
}

function statusLabel(status: string) {
  if (status === 'published') return 'Live'
  if (status === 'new') return 'New'
  if (status === 'reviewed') return 'Reviewed'
  if (status === 'archived') return 'Archived'
  return 'Draft'
}

/**
 * Full admin home dashboard: live stats, recent blog posts, events, and inbox.
 * Replaces Payload's default collection shortcut grid.
 */
export async function EplDashboard() {
  const data = await getDashboardData()
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  return (
    <div className="gutter gutter--left gutter--right dashboard epl-dashboard-shell">
      <div className="epl-dash">
      <header className="epl-dash__hero">
        <div className="epl-dash__hero-copy">
          <p className="epl-dash__eyebrow">Overview</p>
          <h1 className="epl-dash__title">{CMS_PRODUCT_NAME}</h1>
          <p className="epl-dash__lead">
            A snapshot of your site content, upcoming events, and the latest enquiries
            from visitors.
          </p>
        </div>
        <div className="epl-dash__hero-actions">
          <a className="epl-dash__action epl-dash__action--ghost" href={siteUrl} rel="noreferrer" target="_blank">
            View live site
          </a>
          <a className="epl-dash__action" href="/admin/collections/news/create">
            New blog post
          </a>
          <a className="epl-dash__action" href="/admin/collections/events/create">
            New event
          </a>
        </div>
      </header>

      <section aria-label="Site statistics" className="epl-dash__stats">
        {data.stats.map((stat) => (
          <a key={stat.id} className="epl-dash__stat" href={stat.href}>
            <span className="epl-dash__stat-value">{stat.value.toLocaleString()}</span>
            <span className="epl-dash__stat-label">{stat.label}</span>
            <span className="epl-dash__stat-hint">{stat.hint}</span>
          </a>
        ))}
      </section>

      <div className="epl-dash__panels">
        <section className="epl-dash__panel">
          <div className="epl-dash__panel-head">
            <div>
              <h2 className="epl-dash__panel-title">Recent blog posts</h2>
              <p className="epl-dash__panel-sub">Latest edits across your news articles</p>
            </div>
            <a className="epl-dash__panel-link" href="/admin/collections/news">
              All posts
            </a>
          </div>

          {data.recentPosts.length ? (
            <ul className="epl-dash__feed">
              {data.recentPosts.map((post) => (
                <li key={post.id}>
                  <a className="epl-dash__feed-item" href={post.href}>
                    <span className="epl-dash__feed-main">
                      <strong>{post.title}</strong>
                      <span className="epl-dash__feed-meta">
                        {post.category} · {formatDate(post.publishedAt)}
                      </span>
                    </span>
                    <span className={statusClass(post.status)}>{statusLabel(post.status)}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="epl-dash__empty">
              <p>No blog posts yet.</p>
              <a href="/admin/collections/news/create">Write your first article</a>
            </div>
          )}
        </section>

        <section className="epl-dash__panel">
          <div className="epl-dash__panel-head">
            <div>
              <h2 className="epl-dash__panel-title">Upcoming events</h2>
              <p className="epl-dash__panel-sub">What&apos;s next on the calendar</p>
            </div>
            <a className="epl-dash__panel-link" href="/admin/collections/events">
              All events
            </a>
          </div>

          {data.upcomingEvents.length ? (
            <ul className="epl-dash__feed">
              {data.upcomingEvents.map((event) => (
                <li key={event.id}>
                  <a className="epl-dash__feed-item" href={event.href}>
                    <span className="epl-dash__feed-main">
                      <strong>{event.title}</strong>
                      <span className="epl-dash__feed-meta">
                        {formatDateTime(event.eventDate)} · {event.venue}
                      </span>
                    </span>
                    <span className={statusClass(event.status)}>{statusLabel(event.status)}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="epl-dash__empty">
              <p>No upcoming events scheduled.</p>
              <a href="/admin/collections/events/create">Add an event</a>
            </div>
          )}

          {data.recentEvents.length ? (
            <>
              <h3 className="epl-dash__subhead">Recently held</h3>
              <ul className="epl-dash__feed epl-dash__feed--compact">
                {data.recentEvents.map((event) => (
                  <li key={event.id}>
                    <a className="epl-dash__feed-item" href={event.href}>
                      <span className="epl-dash__feed-main">
                        <strong>{event.title}</strong>
                        <span className="epl-dash__feed-meta">{formatDate(event.eventDate)}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      </div>

      <section className="epl-dash__panel epl-dash__panel--inbox">
        <div className="epl-dash__panel-head">
          <div>
            <h2 className="epl-dash__panel-title">Latest enquiries</h2>
            <p className="epl-dash__panel-sub">Register interest, internships, and partnership forms</p>
          </div>
          <a className="epl-dash__panel-link" href="/admin/collections/form-submissions">
            Open inbox
          </a>
        </div>

        {data.recentInbox.length ? (
          <ul className="epl-dash__feed epl-dash__feed--inbox">
            {data.recentInbox.map((item) => (
              <li key={item.id}>
                <a className="epl-dash__feed-item" href={item.href}>
                  <span className="epl-dash__feed-main">
                    <strong>{item.fullName}</strong>
                    <span className="epl-dash__feed-meta">
                      {item.formTypeLabel} · {formatDateTime(item.createdAt)}
                    </span>
                  </span>
                  <span className={statusClass(item.status)}>{statusLabel(item.status)}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="epl-dash__empty">
            <p>No form submissions yet. They will appear here when visitors register interest or get in touch.</p>
          </div>
        )}
      </section>
      </div>
    </div>
  )
}
