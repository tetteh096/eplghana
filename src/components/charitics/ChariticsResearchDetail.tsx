import Link from 'next/link'

import type { getResearchDetailContent } from '@/utilities/getResearchContent'

type DetailContent = NonNullable<Awaited<ReturnType<typeof getResearchDetailContent>>>

type ChariticsResearchDetailProps = {
  content: DetailContent
}

export function ChariticsResearchDetail({ content }: ChariticsResearchDetailProps) {
  const { category, item, related } = content

  return (
    <div className="figma-research-page">
      <section className="figma-research-detail epl-new-shell">
        <div className="figma-research-detail__nav">
          <Link href="/research">Research</Link>
          <span aria-hidden>/</span>
          <Link href={`/research/${category.slug}`}>{category.label}</Link>
        </div>

        <article className="figma-research-detail__card">
          <div className="figma-research-detail__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={item.image} />
          </div>
          <div className="figma-research-detail__copy">
            <span className="figma-research-card__tag">{item.tag}</span>
            <h1>{item.title}</h1>
            <div className="figma-research-detail__meta">
              <span>{item.source}</span>
              {item.year ? <span>· {item.year}</span> : null}
            </div>
            <p className="figma-research-detail__summary">{item.summary}</p>
            <div className="figma-research-detail__body">
              {item.body.split(/\n+/).map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className="figma-research-detail__actions">
              {item.downloadUrl ? (
                <a
                  className="figma-research-detail__btn figma-research-detail__btn--primary"
                  href={item.downloadUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Download PDF
                </a>
              ) : null}
              <Link
                className="figma-research-detail__btn figma-research-detail__btn--outline"
                href={`/research/${category.slug}`}
              >
                Back to {category.label}
              </Link>
            </div>
          </div>
        </article>

        {related.length > 0 ? (
          <div className="figma-research-detail__related">
            <h2>More in {category.label}</h2>
            <div className="figma-research-listing__grid">
              {related.map((entry) => (
                <article className="figma-research-card" key={entry.slug}>
                  <Link
                    className="figma-research-card__media"
                    href={`/research/${category.slug}/${entry.slug}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="" src={entry.image} />
                  </Link>
                  <div className="figma-research-card__body">
                    <span className="figma-research-card__tag">{entry.tag}</span>
                    <h3>
                      <Link href={`/research/${category.slug}/${entry.slug}`}>{entry.title}</Link>
                    </h3>
                    <p>{entry.summary}</p>
                    <Link
                      className="figma-research-card__cta"
                      href={`/research/${category.slug}/${entry.slug}`}
                    >
                      Read publication <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}
