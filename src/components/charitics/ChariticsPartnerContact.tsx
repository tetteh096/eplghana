import type { SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export type ChariticsPartnerContactProps = {
  settings?: SiteSetting | null
  subtitle?: string
  title?: string
  image?: string
  formIdPrefix?: string
  className?: string
}

export function ChariticsPartnerContact({
  settings,
  subtitle = 'Partner with us',
  title = 'Let’s Strengthen Public Service Together',
  image,
  formIdPrefix = 'partner',
  className = '',
}: ChariticsPartnerContactProps) {
  const imageSrc =
    image ??
    getMediaUrl(settings?.aboutImage) ??
    '/assets/img/about-img.png'

  return (
    <section className={`ul-contact epl-partner-contact ${className}`.trim()}>
      <div className="ul-container">
        <div className="row g-0">
          <div className="col-lg-5">
            <div className="ul-contact-img">
              <img alt="Partner with EPL Ghana" src={imageSrc} />
            </div>
          </div>

          <div className="col-lg-7">
            <div className="ul-contact-form-wrapper">
              <span className="ul-section-sub-title">{subtitle}</span>
              <h2 className="ul-section-title">{title}</h2>

              <form action="#" className="ul-contact-form">
                <div className="row row-cols-2 row-cols-xxs-1 ul-bs-row">
                  <div className="col">
                    <div className="form-group">
                      <input
                        id={`${formIdPrefix}-contact-name`}
                        name="name"
                        placeholder="Your Name"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <input
                        id={`${formIdPrefix}-contact-email`}
                        name="email"
                        placeholder="Email Address"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <input
                        id={`${formIdPrefix}-contact-phone`}
                        name="phone"
                        placeholder="Phone Number"
                        type="tel"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <input
                        id={`${formIdPrefix}-contact-subject`}
                        name="subject"
                        placeholder="Organisation / Subject"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        id={`${formIdPrefix}-contact-msg`}
                        name="message"
                        placeholder="Tell us how you would like to partner or get involved"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="ul-btn" type="submit">
                      <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Send
                      Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
