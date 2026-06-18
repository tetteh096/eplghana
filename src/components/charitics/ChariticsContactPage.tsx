import Link from 'next/link'

import { ChariticsContactForm } from '@/components/charitics/ChariticsContactForm'
import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import { contactPageContent, type ContactDetails } from '@/config/contactPageContent'

type ChariticsContactPageProps = {
  contact: ContactDetails
  content?: typeof contactPageContent
}

export function ChariticsContactPage({
  contact,
  content = contactPageContent,
}: ChariticsContactPageProps) {
  const { hero, visit, mapEmbedUrl, formsSection, forms } = content
  const phoneHref = contact.phone.replace(/\s/g, '')

  const contactMethods = [
    {
      icon: 'flaticon-phone-call',
      label: 'Phone',
      value: contact.phone,
      href: `tel:${phoneHref}`,
      className: '',
    },
    {
      icon: 'flaticon-comment',
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      className: '',
    },
    {
      icon: 'flaticon-location',
      label: 'Office',
      value: visit.title,
      detail: contact.address,
      href: '#visit',
      className: 'epl-contact-method-card--office',
    },
  ] as const

  return (
    <>
      <section className="epl-contact-hero ul-section-spacing">
        <div className="ul-container">
          <div className="epl-contact-hero-inner">
            <div className="epl-contact-hero-copy">
              <span className="ul-section-sub-title">{hero.eyebrow}</span>
              <h1 className="ul-section-title epl-contact-hero-title">{hero.title}</h1>
              <p className="epl-contact-hero-lead">{hero.lead}</p>

              <div className="epl-contact-hero-methods">
                {contactMethods.map((method) => (
                  <a
                    className={`epl-contact-method-card ${method.className}`.trim()}
                    href={method.href}
                    key={method.label}
                    title={'detail' in method ? method.detail : undefined}
                  >
                    <span className="epl-contact-method-icon">
                      <i className={method.icon}></i>
                    </span>
                    <div className="epl-contact-method-body">
                      <span className="epl-contact-method-label">{method.label}</span>
                      <span className="epl-contact-method-value">{method.value}</span>
                      {'detail' in method ? (
                        <span className="epl-contact-method-detail">{method.detail}</span>
                      ) : null}
                    </div>
                  </a>
                ))}
              </div>

              <div className="epl-contact-hero-actions">
                {hero.quickLinks.map((link) => (
                  <Link className="ul-btn epl-contact-hero-cta" href={link.href} key={link.href}>
                    <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="epl-contact-hero-media">
              <ProjectDetailImage
                alt="EPL Ghana fellows and partners"
                className="epl-contact-hero-img"
                fallbackClass="epl-contact-hero-fallback"
                src={hero.image}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="epl-contact-visit ul-section-spacing pt-0" id="visit">
        <div className="ul-container">
          <div className="epl-contact-visit-inner">
            <div className="epl-contact-visit-map">
              <iframe
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapEmbedUrl}
                title="EPL Ghana office location"
              />
            </div>
            <div className="epl-contact-visit-copy">
              <span className="ul-section-sub-title">{visit.eyebrow}</span>
              <h2 className="ul-section-title">{visit.title}</h2>
              <p className="epl-contact-visit-text">{visit.description}</p>
              <address className="epl-contact-visit-address">{contact.address}</address>
              <div className="epl-contact-visit-links">
                <a href={`tel:${phoneHref}`}>
                  <i className="flaticon-phone-call"></i> {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`}>
                  <i className="flaticon-comment"></i> {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="epl-contact-forms ul-section-spacing">
        <div className="ul-container">
          <div className="epl-fellows-section-head">
            <span className="ul-section-sub-title">{formsSection.eyebrow}</span>
            <h2 className="ul-section-title">{formsSection.title}</h2>
            <p className="epl-contact-forms-intro">{formsSection.intro}</p>
          </div>

          <div className="row ul-bs-row gy-5 align-items-stretch">
            <div className="col-lg-6" id="general-enquiry">
              <div className="epl-contact-form-panel">
                <div className="epl-contact-form-panel-head">
                  <span className="epl-contact-form-panel-icon" aria-hidden="true">
                    <i className="flaticon-comment"></i>
                  </span>
                  <div>
                    <span className="ul-section-sub-title">{forms.general.eyebrow}</span>
                    <h3 className="epl-contact-form-panel-title">{forms.general.title}</h3>
                  </div>
                </div>
                <ChariticsContactForm
                  description={forms.general.description}
                  formId="general"
                  submitLabel={forms.general.submitLabel}
                  variant="general"
                />
              </div>
            </div>

            <div className="col-lg-6" id="partnership">
              <div className="epl-contact-form-panel epl-contact-form-panel--accent">
                <div className="epl-contact-form-panel-head">
                  <span className="epl-contact-form-panel-icon epl-contact-form-panel-icon--accent" aria-hidden="true">
                    <i className="flaticon-team"></i>
                  </span>
                  <div>
                    <span className="ul-section-sub-title">{forms.partnership.eyebrow}</span>
                    <h3 className="epl-contact-form-panel-title">{forms.partnership.title}</h3>
                  </div>
                </div>
                <ChariticsContactForm
                  description={forms.partnership.description}
                  formId="partnership"
                  submitLabel={forms.partnership.submitLabel}
                  variant="partnership"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
