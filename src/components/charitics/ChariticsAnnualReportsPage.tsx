import Link from 'next/link'

import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import type { AnnualReportsPageContent } from '@/utilities/getAnnualReportsPageContent'

type ChariticsAnnualReportsPageProps = {
  content: AnnualReportsPageContent
}

export function ChariticsAnnualReportsPage({ content }: ChariticsAnnualReportsPageProps) {
  const { hero, intro, reportsSection, relatedSection, reports, relatedPublications, cta } =
    content

  return (
    <>
      <section className="epl-annual-intro ul-section-spacing pb-0">
        <div className="ul-container">
          <p className="epl-news-events-lead">{hero.lead}</p>
          <p className="ul-section-descr epl-annual-intro-text">{intro}</p>
        </div>
      </section>

      <section className="epl-annual-reports ul-section-spacing pt-0">
        <div className="ul-container">
          <div className="epl-fellows-section-head">
            <span className="ul-section-sub-title">{reportsSection.eyebrow}</span>
            <h2 className="ul-section-title">{reportsSection.title}</h2>
          </div>
          <div className="row row-cols-lg-2 row-cols-1 ul-bs-row gy-4 epl-annual-reports-grid">
            {reports.map((report) => (
              <article className="epl-annual-report-card" key={report.id}>
                <div className="epl-annual-report-file-scene">
                  <div className="epl-annual-report-file">
                    <div className="epl-annual-report-file-stack" aria-hidden="true">
                      <span className="epl-annual-report-file-sheet epl-annual-report-file-sheet--3" />
                      <span className="epl-annual-report-file-sheet epl-annual-report-file-sheet--2" />
                      <span className="epl-annual-report-file-sheet epl-annual-report-file-sheet--1" />
                    </div>
                    <div className="epl-annual-report-file-cover">
                      <ProjectDetailImage
                        alt={report.title}
                        className="epl-annual-report-file-img"
                        fallbackClass="epl-annual-report-file-fallback"
                        src={report.coverImage}
                      />
                      <div className="epl-annual-report-file-spine" aria-hidden="true" />
                      <div className="epl-annual-report-file-tab" aria-hidden="true">
                        <span className="epl-annual-report-file-type">PDF</span>
                      </div>
                      <div className="epl-annual-report-file-overlay" aria-hidden="true">
                        <span className="epl-annual-report-file-brand">EPL Ghana</span>
                        <strong className="epl-annual-report-file-cover-title">{report.title}</strong>
                        <span className="epl-annual-report-file-year">{report.year}</span>
                      </div>
                      <div className="epl-annual-report-file-shine" aria-hidden="true" />
                    </div>
                    <div className="epl-annual-report-file-shadow" aria-hidden="true" />
                  </div>
                </div>
                <div className="epl-annual-report-body">
                  <h3 className="epl-annual-report-title">{report.title}</h3>
                  <p className="epl-annual-report-descr">{report.description}</p>
                  {report.downloadUrl ? (
                    <a
                      className="ul-btn"
                      href={report.downloadUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Download
                      PDF
                    </a>
                  ) : (
                    <span className="epl-annual-report-badge">Coming soon</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-annual-related ul-section-spacing pt-0">
        <div className="ul-container">
          <div className="epl-fellows-section-head">
            <span className="ul-section-sub-title">{relatedSection.eyebrow}</span>
            <h2 className="ul-section-title">{relatedSection.title}</h2>
          </div>
          <div className="row row-cols-lg-2 row-cols-1 ul-bs-row gy-4">
            {relatedPublications.map((publication) => (
              <article className="epl-annual-publication-card" key={publication.id}>
                <div className="epl-annual-publication-file-scene" aria-hidden="true">
                  <div className="epl-annual-publication-file">
                    <div className="epl-annual-publication-file-cover">
                      <span className="epl-annual-publication-file-type">PDF</span>
                      <span className="epl-annual-publication-file-lines" />
                    </div>
                    <div className="epl-annual-publication-file-shadow" />
                  </div>
                </div>
                <div className="epl-annual-publication-body">
                  <h3 className="epl-annual-publication-title">{publication.title}</h3>
                  <p className="epl-annual-publication-descr">{publication.description}</p>
                  {publication.downloadUrl ? (
                    <a
                      className="epl-annual-publication-link"
                      href={publication.downloadUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Download PDF <i className="flaticon-next"></i>
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-annual-cta ul-section-spacing pt-0">
        <div className="ul-container">
          <div className="epl-annual-cta-inner">
            <h2 className="ul-section-title">{cta.title}</h2>
            <p className="ul-section-descr">{cta.body}</p>
            <Link className="ul-btn" href={cta.ctaHref}>
              <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> {cta.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
