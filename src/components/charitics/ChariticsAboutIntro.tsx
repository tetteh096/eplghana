import type { SiteSetting } from '@/payload-types'
import type { AboutContent } from '@/utilities/getAboutContent'

type ChariticsAboutIntroProps = {
  settings: SiteSetting
  intro: AboutContent['intro']
  approach: AboutContent['approach']
  story: AboutContent['story']
}

export function ChariticsAboutIntro({
  settings,
  intro,
  approach,
  story,
}: ChariticsAboutIntroProps) {
  const aboutImage = intro.image
  const secondaryImage = intro.secondaryImage
  const leadParagraph = intro.lead

  return (
    <section className="ul-about epl-about-section epl-about-page-intro ul-section-spacing wow animate__fadeInUp">
      <div className="ul-container">
        <div className="row row-cols-md-2 row-cols-1 align-items-center gy-4 ul-about-row">
          <div className="col">
            <div className="ul-about-imgs epl-about-page-imgs">
              <div className="img-wrapper epl-about-img-frame">
                <img alt="About EPL Ghana" src={aboutImage} />
              </div>
              <div className="img-wrapper epl-about-img-frame epl-about-img-frame--secondary">
                <img alt="EPL Ghana fellowship programme" src={secondaryImage} />
              </div>
              <div className="ul-about-imgs-vectors">
                <img alt="" className="vector-1" src="/assets/img/about-img-vector-1.svg" />
                <img alt="" className="vector-2" src="/assets/img/about-img-vector-2.svg" />
              </div>
            </div>
          </div>

          <div className="col">
            <div className="ul-about-txt">
              <span className="ul-section-sub-title ul-section-sub-title--2">
                {intro.eyebrow}
              </span>
              <h2 className="ul-section-title epl-about-page-title">
                {settings.aboutTitle ??
                  'Developing the next generation of public service professionals'}
              </h2>
              <p className="ul-section-descr epl-about-lead">{leadParagraph}</p>

              <div className="ul-about-block epl-about-approach-card">
                <div className="block-left">
                  <div className="block-heading">
                    <div className="icon">
                      <i className="flaticon-love"></i>
                    </div>
                    <h3 className="block-title">{approach.title}</h3>
                  </div>
                  <ul className="block-list">
                    {approach.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="epl-about-story-band">
          <div className="row g-4 g-xl-5 align-items-stretch">
            <div className="col-lg-4">
              <div className="epl-about-story-stat">
                <span className="epl-about-story-stat-value">{story.growth.highlight}</span>
                <span className="epl-about-story-stat-label">{story.growth.highlightLabel}</span>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="epl-about-story-copy">
                <article className="epl-about-story-block">
                  <h3 className="epl-about-story-heading">{story.growth.title}</h3>
                  <p className="epl-about-story-text">{story.growth.body}</p>
                </article>
                <article className="epl-about-story-block">
                  <h3 className="epl-about-story-heading">{story.investment.title}</h3>
                  <p className="epl-about-story-text">{story.investment.body}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ul-about-vectors">
        <img alt="" className="vector-1" src="/assets/img/about-vector-1.png" />
      </div>
    </section>
  )
}
