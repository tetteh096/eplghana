import Link from 'next/link'

import type { getResearchCategoryContent } from '@/utilities/getResearchContent'

type CategoryContent = NonNullable<Awaited<ReturnType<typeof getResearchCategoryContent>>>

type ChariticsResearchCategoryPageProps = {
  content: CategoryContent
}

export function ChariticsResearchCategoryPage({ content }: ChariticsResearchCategoryPageProps) {
  const { category, items, hub } = content

  return (
    <div className="figma-research-page">
      <section className="figma-research-hero figma-research-hero--compact">
        <div className="figma-research-hero__bg" style={{ backgroundImage: `url(${hub.image})` }} />
        <div className="figma-research-hero__overlay" />
        <div className="figma-research-hero__content">
          <div className="figma-research-hero__copy">
            <div className="figma-impact-kicker">
              <span className="figma-impact-kicker__line" />
              <span>{category.eyebrow.toUpperCase()}</span>
            </div>
            <h1>{category.title}</h1>
            <p>{category.description}</p>
          </div>
        </div>
      </section>

      <section className="figma-research-listing epl-new-shell">
        <div className="figma-research-listing__nav">
          <Link href="/research">← All research categories</Link>
        </div>

        {items.length === 0 ? (
          <p className="figma-research-listing__empty">Publications in this category are coming soon.</p>
        ) : (
          <div className="figma-research-listing__grid">
            {items.map((item) => (
              <article className="figma-research-card" key={item.slug}>
                <Link
                  className="figma-research-card__media"
                  href={`/research/${category.slug}/${item.slug}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={item.image} />
                </Link>
                <div className="figma-research-card__body">
                  <span className="figma-research-card__tag">{item.tag}</span>
                  <h2>
                    <Link href={`/research/${category.slug}/${item.slug}`}>{item.title}</Link>
                  </h2>
                  <div className="figma-research-card__source">{item.source}</div>
                  <p>{item.summary}</p>
                  <Link
                    className="figma-research-card__cta"
                    href={`/research/${category.slug}/${item.slug}`}
                  >
                    Read publication <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
