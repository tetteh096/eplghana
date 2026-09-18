import Link from 'next/link'
import { getPrivacyPageContent } from '@/utilities/getEditorialPageContent'

export const metadata = { title: 'Privacy Note' }

export default async function PrivacyPage() {
  const { hero, sections, backLabel, backUrl } = await getPrivacyPageContent()
  return (
    <main className="epl-privacy-page">
      <section
        className="epl-privacy-hero"
        style={
          hero.image
            ? { backgroundImage: `linear-gradient(rgba(15, 22, 48, .88), rgba(15, 22, 48, .88)), url(${hero.image})` }
            : undefined
        }
      >
        <div className="epl-new-shell">
          <p className="epl-privacy-eyebrow"><span /> {hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="epl-privacy-lead">{hero.lead}</p>
        </div>
      </section>

      <section className="epl-privacy-content">
        <div className="epl-new-shell">
          <div className="epl-privacy-list">
            {sections.map((section, index) => (
              <article className="epl-privacy-item" key={section.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                </div>
              </article>
            ))}
          </div>
          <Link className="epl-privacy-back" href={backUrl}>
            {backLabel} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
