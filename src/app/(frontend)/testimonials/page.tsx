import { getPublishedTestimonials } from '@/utilities/getTestimonials'
import { tryGetPayload } from '@/utilities/payloadSafe'
import { resolveFellowTestimonials } from '@/utilities/resolveFellowTestimonials'
import { getEditorialHero } from '@/utilities/getEditorialPageContent'

export const metadata = {
  title: 'Testimonials',
  description: 'Stories and reflections from the EPL Ghana community.',
}

export default async function TestimonialsPage() {
  const payload = await tryGetPayload()
  const [testimonials, hero] = await Promise.all([
    payload ? getPublishedTestimonials(payload, 100).catch(() => []) : [],
    getEditorialHero('/testimonials', 'testimonialsPage', {
      eyebrow: 'Community Voices',
      title: 'All Testimonials',
      lead: 'Experiences and reflections from Fellows and members of the EPL Ghana community.',
    }),
  ])
  const items = resolveFellowTestimonials(testimonials)

  return (
    <main className="epl-testimonials-page">
      <section
        className="epl-testimonials-hero"
        style={
          hero.image
            ? { backgroundImage: `linear-gradient(rgba(15, 22, 48, .88), rgba(15, 22, 48, .88)), url(${hero.image})` }
            : undefined
        }
      >
        <div className="epl-new-shell">
          <div className="figma-impact-kicker figma-impact-kicker--center">
            <span className="figma-impact-kicker__line" />
            <span>{hero.eyebrow}</span>
            <span className="figma-impact-kicker__line" />
          </div>
          <h1>{hero.title}</h1>
          <p>{hero.lead}</p>
        </div>
      </section>

      <section className="epl-testimonials-list epl-new-shell">
        <div className="epl-testimonials-grid">
          {items.map((item) => (
            <article className="epl-testimonials-card" key={item.id}>
              <img alt={item.name} decoding="async" loading="lazy" src={item.photo} />
              <div className="epl-testimonials-card__copy">
                <span aria-hidden className="epl-testimonials-card__quote">“</span>
                <blockquote>{item.quote}</blockquote>
                <h2>{item.name}</h2>
                <p>{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
