'use client'

import { ChariticsContactForm } from '@/components/charitics/ChariticsContactForm'
import { contactPageContent, type ContactDetails } from '@/config/contactPageContent'
import type { ContactPageContent } from '@/utilities/getContactContent'

type ChariticsContactPageProps = {
  contact: ContactDetails
  content?: ContactPageContent
}

function ContactIcon({ type }: { type: 'location' | 'email' | 'phone' }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  if (type === 'email') {
    return (
      <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" {...common}>
        <path d="M4 4h16v16H4z" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    )
  }

  if (type === 'phone') {
    return (
      <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  }

  return (
    <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" {...common}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function ChariticsContactPage({
  contact,
  content = contactPageContent,
}: ChariticsContactPageProps) {
  const { hero, hq, form, map } = content
  const phoneHref = contact.phone.replace(/\s/g, '')

  return (
    <div className="figma-contact-page">
      <section className="figma-contact-hero">
        {hero.image ? (
          <div
            className="figma-contact-hero__bg"
            style={{ backgroundImage: `url(${hero.image})` }}
          />
        ) : null}
        <div className="figma-contact-hero__overlay" />
        <div className="figma-contact-hero__content">
          <div className="figma-contact-hero__copy">
            <div className="figma-impact-kicker">
              <span className="figma-impact-kicker__line" />
              <span>{hero.eyebrow.toUpperCase()}</span>
            </div>
            <h1>{hero.title}</h1>
            <p>{hero.lead}</p>
          </div>
        </div>
      </section>

      <section className="figma-contact-main">
        <div className="epl-new-shell">
          <div className="figma-contact-main__grid">
            <aside className="figma-contact-hq">
              <div className="figma-contact-hq__eyebrow">{hq.eyebrow.toUpperCase()}</div>
              <h2>{hq.title}</h2>

              <div className="figma-contact-hq__items">
                <div className="figma-contact-hq__item">
                  <ContactIcon type="location" />
                  <div>
                    <span>{hq.locationLabel.toUpperCase()}</span>
                    <p>{contact.address}</p>
                  </div>
                </div>

                <div className="figma-contact-hq__item">
                  <ContactIcon type="email" />
                  <div>
                    <span>{hq.emailLabel.toUpperCase()}</span>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                </div>

                <div className="figma-contact-hq__item">
                  <ContactIcon type="phone" />
                  <div>
                    <span>{hq.phoneLabel.toUpperCase()}</span>
                    <a href={`tel:${phoneHref}`}>{contact.phone}</a>
                  </div>
                </div>
              </div>

              <div className="figma-contact-hq__hours">
                <strong>{hq.hoursLabel}</strong>
                <p>{hq.hoursValue}</p>
              </div>
            </aside>

            <div className="figma-contact-form-panel">
              <h3>{form.title}</h3>
              <p>{form.intro}</p>
              <ChariticsContactForm
                formId="contact-inquiry"
                hideDescription
                privacyHref={form.privacyHref}
                privacyLabel={form.privacyLabel}
                sourcePage="Contact page — General enquiry"
                sourcePath="/contact"
                submitLabel={form.submitLabel}
                successText={form.successText}
                successTitle={form.successTitle}
                tone="light"
                variant="inquiry"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="figma-contact-map" id="visit">
        <div className="epl-new-shell">
          <div className="figma-contact-map__head">
            <div className="figma-impact-kicker">
              <span className="figma-impact-kicker__line" />
              <span>{map.title.toUpperCase()}</span>
            </div>
            <p>{map.note}</p>
          </div>
          <div className="figma-contact-map__frame">
            <iframe
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={map.embedUrl}
              title="EPL Ghana office location"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
