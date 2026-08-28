'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

export type ProgrammeCard = {
  slug: string
  title: string
  category: string
  summary: string
  image: string
}

type ChariticsProgrammeStackProps = {
  eyebrow: string
  title: string
  projects: ProgrammeCard[]
}

function StackCard({
  project,
  index,
  total,
}: {
  project: ProgrammeCard
  index: number
  total: number
}) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0.94, 1],
  )
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [48, 0],
  )

  const stickyTop = `calc(96px + ${index * 18}px)`
  const zIndex = index + 1

  return (
    <article
      className="epl-programme-stack__item"
      ref={ref}
      style={{ top: stickyTop, zIndex }}
    >
      <motion.div className="epl-programme-stack__motion" style={{ scale, y }}>
        <Link className="epl-programme-stack__card" href={`/projects/${project.slug}`}>
          <img
            alt={project.title}
            decoding="async"
            loading="lazy"
            src={project.image}
          />
          <span className="epl-programme-stack__shade" />
          <div className="epl-programme-stack__copy">
            <span className="epl-programme-stack__meta">
              <b>{String(index + 1).padStart(2, '0')}</b>
              <em>{project.category}</em>
            </span>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <strong>
              Explore programme <span>→</span>
            </strong>
          </div>
          <span aria-hidden className="epl-programme-stack__count">
            {index + 1}/{total}
          </span>
        </Link>
      </motion.div>
    </article>
  )
}

export function ChariticsProgrammeStack({
  eyebrow,
  title,
  projects,
}: ChariticsProgrammeStackProps) {
  return (
    <section className="epl-programme-stack">
      <div className="epl-new-shell">
        <div className="epl-new-section-head epl-programme-stack__head">
          <div>
            <span className="epl-new-kicker">{eyebrow}</span>
            <h2>{title}</h2>
          </div>
          <Link className="epl-new-text-action" href="/projects">
            View all programmes <span>→</span>
          </Link>
        </div>

        <div className="epl-programme-stack__list">
          {projects.map((project, index) => (
            <StackCard
              index={index}
              key={project.slug}
              project={project}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
