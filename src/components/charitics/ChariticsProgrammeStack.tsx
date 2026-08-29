'use client'

import Link from 'next/link'

import { MotionReveal } from '@/components/charitics/MotionReveal'
import { HOME_PROJECT_DEFAULTS, resolveHomeProjects, type HomeProjectCard } from '@/config/homeProjects'

export type ProgrammeCard = HomeProjectCard

type ChariticsProgrammeStackProps = {
  eyebrow?: string
  title?: string
  projects?: ProgrammeCard[]
}

export function ChariticsProgrammeStack({
  eyebrow = 'Our Work',
  projects = [],
}: ChariticsProgrammeStackProps) {
  const cards = resolveHomeProjects(projects.length ? projects : HOME_PROJECT_DEFAULTS)
  const featured = cards[0]
  const rest = cards.slice(1)

  if (!featured) return null

  return (
    <section className="epl-home-projects">
      <div className="epl-new-shell">
        <MotionReveal className="epl-home-projects__head">
          <div className="epl-home-projects__eyebrow">
            <span aria-hidden className="epl-home-projects__eyebrow-line" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="epl-home-projects__title">
            Projects That Move
            <br className="epl-home-projects__title-break" />
            Public Service Forward
          </h2>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <Link className="epl-home-projects__featured group" href={`/projects/${featured.slug}`}>
            <div className="epl-home-projects__featured-media">
              <img
                alt={featured.title}
                decoding="async"
                loading="lazy"
                src={featured.image}
              />
              <span className="epl-home-projects__featured-shade" />
              <div className="epl-home-projects__featured-copy">
                <span className="epl-home-projects__category">{featured.category}</span>
                <h3>{featured.title}</h3>
                <p>{featured.summary}</p>
                <strong>
                  Explore Project <span aria-hidden>→</span>
                </strong>
              </div>
            </div>
          </Link>
        </MotionReveal>

        <div className="epl-home-projects__grid">
          {rest.map((project) => (
            <Link
              className="epl-home-projects__card group"
              href={`/projects/${project.slug}`}
              key={project.slug}
            >
              <div className="epl-home-projects__card-media">
                <img alt={project.title} decoding="async" loading="lazy" src={project.image} />
                <span className="epl-home-projects__card-shade" />
                <div className="epl-home-projects__card-copy">
                  <span className="epl-home-projects__category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <strong>
                    Explore <span aria-hidden>→</span>
                  </strong>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <MotionReveal className="epl-home-projects__all" delay={0.15}>
          <Link href="/projects">
            All Projects <span aria-hidden>→</span>
          </Link>
        </MotionReveal>
      </div>
    </section>
  )
}
