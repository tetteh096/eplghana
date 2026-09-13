import Link from 'next/link'

import type { getCommunityStoryBySlug, getCommunityStories } from '@/utilities/getImpactPageContent'

type StoryList = Awaited<ReturnType<typeof getCommunityStories>>
type StoryDetail = NonNullable<Awaited<ReturnType<typeof getCommunityStoryBySlug>>>

export function ChariticsCommunityStoriesPage({ content }: { content: StoryList }) {
  const { section, items } = content

  return (
    <div className="figma-community-story-page">
      <section className="figma-community-story-hero">
        <div className="epl-new-shell figma-community-story-hero__content">
          <div className="figma-impact-kicker">
            <span className="figma-impact-kicker__line" />
            <span>{section.eyebrow.toUpperCase()}</span>
          </div>
          <h1>{section.title}</h1>
          <p>{section.intro}</p>
        </div>
      </section>

      <section className="figma-community-story-listing epl-new-shell">
        <div className="figma-impact-communities__grid">
          {items.map((item) => (
            <Link className="figma-impact-community-card" href={item.href} key={item.slug}>
              {item.image ? (
                <div className="figma-impact-community-card__media">
                  <div
                    className="figma-impact-community-card__image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <span className="figma-impact-community-card__num">{item.num}</span>
                </div>
              ) : null}
              <div className="figma-impact-community-card__body">
                <div className="figma-impact-community-card__region">{item.region}</div>
                <h3>{item.assembly}</h3>
                <span className="figma-impact-community-card__focus">{item.title}</span>
                <p>{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export function ChariticsCommunityStoryDetail({ content }: { content: StoryDetail }) {
  const { story, related, section } = content

  return (
    <div className="figma-community-story-page">
      <section className="figma-community-story-detail epl-new-shell">
        <div className="figma-community-story-detail__nav">
          <Link href="/impact">Impact</Link>
          <span aria-hidden>/</span>
          <Link href="/impact/stories">{section.title}</Link>
        </div>

        <article className="figma-community-story-detail__card">
          {story.image ? (
            <div className="figma-community-story-detail__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={story.image} />
              <span className="figma-impact-community-card__num">{story.num}</span>
            </div>
          ) : null}
          <div className="figma-community-story-detail__copy">
            <div className="figma-impact-community-card__region">{story.region}</div>
            <h1>{story.assembly}</h1>
            <span className="figma-impact-community-card__focus">{story.title}</span>
            <p className="figma-community-story-detail__summary">{story.desc}</p>
            <div className="figma-community-story-detail__body">
              {story.body.split(/\n+/).map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <Link className="figma-impact-outline-btn" href="/impact/stories">
              All community stories <span aria-hidden>→</span>
            </Link>
          </div>
        </article>

        {related.length > 0 ? (
          <div className="figma-community-story-detail__related">
            <h2>More community stories</h2>
            <div className="figma-impact-communities__grid">
              {related.map((item) => (
                <Link className="figma-impact-community-card" href={item.href} key={item.slug}>
                  {item.image ? (
                    <div className="figma-impact-community-card__media">
                      <div
                        className="figma-impact-community-card__image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <span className="figma-impact-community-card__num">{item.num}</span>
                    </div>
                  ) : null}
                  <div className="figma-impact-community-card__body">
                    <div className="figma-impact-community-card__region">{item.region}</div>
                    <h3>{item.assembly}</h3>
                    <span className="figma-impact-community-card__focus">{item.title}</span>
                    <p>{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}
