'use client'

import Link from 'next/link'

import type { GetInvolvedPageContent } from '@/utilities/getGetInvolvedPageContent'

type ChariticsGetInvolvedPageProps = {
  content: GetInvolvedPageContent
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

export function ChariticsGetInvolvedPage({ content }: ChariticsGetInvolvedPageProps) {
  const { eyebrow, title, body, primaryCta, secondaryCta } = content

  return (
    <div className="figma-get-involved-page">
      <section className="figma-get-involved-band">
        <div className="epl-new-shell figma-get-involved-band__inner">
          <div className="figma-get-involved-band__kicker">
            <span className="figma-impact-kicker__line" />
            <span>{eyebrow.toUpperCase()}</span>
            <span className="figma-impact-kicker__line" />
          </div>
          <h1>{title}</h1>
          <p>{body}</p>
          <div className="figma-get-involved-band__actions">
            <Link className="figma-get-involved-btn figma-get-involved-btn--primary" href={primaryCta.href}>
              <span>{primaryCta.label}</span>
              <ArrowRightIcon />
            </Link>
            <Link className="figma-get-involved-btn figma-get-involved-btn--outline" href={secondaryCta.href}>
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
