import Link from 'next/link'

import type { getResearchHubContent } from '@/utilities/getResearchContent'

type HubContent = Awaited<ReturnType<typeof getResearchHubContent>>

type ChariticsResearchHubProps = {
  content: HubContent
}

export function ChariticsResearchHub({ content }: ChariticsResearchHubProps) {
  const { hub, categories } = content

  return (
    <div className="figma-research-page">
      <section className="figma-research-hero">
        <div className="figma-research-hero__bg" style={{ backgroundImage: `url(${hub.image})` }} />
        <div className="figma-research-hero__overlay" />
        <div className="figma-research-hero__content">
          <div className="figma-research-hero__copy">
            <div className="figma-impact-kicker">
              <span className="figma-impact-kicker__line" />
              <span>{hub.eyebrow.toUpperCase()}</span>
            </div>
            <h1>{hub.title}</h1>
            <p>{hub.lead}</p>
          </div>
        </div>
      </section>

      <section className="figma-research-categories epl-new-shell">
        <div className="figma-research-categories__grid">
          {categories.map((category) => (
            <Link className="figma-research-category-card" href={category.href} key={category.slug}>
              <span className="figma-research-category-card__tag">{category.label}</span>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
              <span className="figma-research-category-card__cta">
                Browse {category.label} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
