import Link from 'next/link'

type ChariticsPlaceholderProps = {
  ctaHref?: string
  ctaLabel?: string
  description?: string
}

export function ChariticsPlaceholder({
  description = 'Content for this page is being prepared. Check back soon or get in touch with our team.',
  ctaHref = '/contact',
  ctaLabel = 'Contact Us',
}: ChariticsPlaceholderProps) {
  return (
    <section className="ul-section-spacing">
      <div className="ul-container">
        <div className="ul-donate-form-wrapper text-center mx-auto" style={{ maxWidth: 720 }}>
          <p className="ul-section-descr mb-4">{description}</p>
          <Link className="ul-btn" href={ctaHref}>
            <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
