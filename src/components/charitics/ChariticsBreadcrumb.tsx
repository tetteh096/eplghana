import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Fragment } from 'react'

type Crumb = {
  href?: string
  label: string
}

type ChariticsBreadcrumbProps = {
  crumbs?: Crumb[]
  title: string
  /** Optional background photo; the blue overlay always sits on top. */
  backgroundImage?: string | null
}

export function ChariticsBreadcrumb({
  title,
  crumbs = [],
  backgroundImage,
}: ChariticsBreadcrumbProps) {
  // Drop the trailing crumb when it repeats the page title — the h2 already shows it.
  const trailCrumbs =
    crumbs.length > 0 &&
    crumbs[crumbs.length - 1].label === title &&
    !crumbs[crumbs.length - 1].href
      ? crumbs.slice(0, -1)
      : crumbs

  // Compose the brand blue overlay above the photo in one background-image so
  // the heading stays readable. A CSS rule with !important consumes this var
  // (the base styles set the gradient with !important, which inline can't beat).
  const heroStyle = backgroundImage
    ? ({
        '--epl-hero-bg': `linear-gradient(135deg, rgba(10, 61, 107, 0.86), rgba(13, 77, 133, 0.78) 55%, rgba(30, 107, 184, 0.7)), url("${backgroundImage}")`,
      } as CSSProperties)
    : undefined

  return (
    <section
      className={`ul-breadcrumb ul-section-spacing epl-page-breadcrumb${backgroundImage ? ' epl-page-breadcrumb--image' : ''}`}
      style={heroStyle}
    >
      <div className="ul-container">
        <h2 className="ul-breadcrumb-title">{title}</h2>
        <ul className="ul-breadcrumb-nav">
          <li>
            <Link href="/">Home</Link>
          </li>
          {trailCrumbs.map((crumb, index) => {
            const isLast = index === trailCrumbs.length - 1

            return (
              <Fragment key={`${crumb.label}-${index}`}>
                <li>
                  <span className="separator">
                    <i className="flaticon-right"></i>
                  </span>
                </li>
                <li>
                  {!isLast && crumb.href ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    crumb.label
                  )}
                </li>
              </Fragment>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
