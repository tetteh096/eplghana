import Link from 'next/link'

import { eplHomeImages } from '@/config/eplMedia'

export type ChariticsProjectCard = {
  slug: string
  title: string
  tag: string
  img: string
  descr: string
}

const FALLBACK_PROJECTS: ChariticsProjectCard[] = [
  {
    slug: 'public-service-fellowship',
    title: 'Public Service Fellowship',
    tag: 'Fellowship',
    img: eplHomeImages.projects['public-service-fellowship'],
    descr: 'Embedding talented graduates within key government institutions.',
  },
  {
    slug: 'women-on-the-rise',
    title: 'Women on the Rise',
    tag: 'Leadership',
    img: eplHomeImages.projects['women-on-the-rise'],
    descr: 'Advancing women into higher leadership in public service.',
  },
  {
    slug: 'peace',
    title: 'P.E.A.C.E Fellowship',
    tag: 'Peacebuilding',
    img: eplHomeImages.projects.peace,
    descr: 'Building peace skills in the public sector.',
  },
  {
    slug: 'public-service-fellowship',
    title: 'Public Service Fellowship',
    tag: 'Fellowship',
    img: eplHomeImages.projects['public-service-fellowship'],
    descr: 'Embedding talented graduates within key government institutions.',
  },
]

const GRID_LAYOUT = [
  { col: 'col-lg-8', small: false },
  { col: 'col-lg-4', small: true },
  { col: 'col-lg-4', small: true },
  { col: 'col-lg-8', small: false },
] as const

type ChariticsProjectsGridProps = {
  projects: ChariticsProjectCard[]
}

export function ChariticsProjectsGrid({ projects }: ChariticsProjectsGridProps) {
  const source = projects.length > 0 ? projects : FALLBACK_PROJECTS
  const items = source.slice(0, 4)
  while (items.length < 4) {
    items.push(source[items.length % source.length])
  }

  return (
    <section className="ul-projects ul-section-spacing epl-projects-grid">
      <div className="ul-container">
        <div className="ul-section-heading text-center justify-content-center">
          <div>
            <span className="ul-section-sub-title">Our Complete Projects</span>
            <h2 className="ul-section-title">Explore the Work You Must See</h2>
          </div>
        </div>

        <div className="row ul-bs-row justify-content-center wow animate__fadeInUp">
          {GRID_LAYOUT.map((layout, index) => {
            const item = items[index]
            if (!item) return null

            return (
              <div
                className={`${layout.col} col-md-6 col-10 col-xxs-12`}
                key={`${item.slug}-${index}`}
              >
                <div className={`ul-project${layout.small ? ' ul-project--sm' : ''}`}>
                  <div className="ul-project-img">
                    <img alt={item.title} src={item.img} />
                  </div>
                  <div className="ul-project-txt">
                    <div>
                      <h3 className="ul-project-title">
                        <Link href={`/projects/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p className="ul-project-descr">{item.tag}</p>
                    </div>
                    <Link
                      aria-label={`View ${item.title}`}
                      className="ul-project-btn"
                      href={`/projects/${item.slug}`}
                    >
                      <i className="flaticon-up-right-arrow"></i>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-4 mt-md-5">
          <Link className="ul-btn" href="/projects">
            <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> View all projects
          </Link>
        </div>
      </div>
    </section>
  )
}
