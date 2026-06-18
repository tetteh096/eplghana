'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { getProjectVisualClass } from '@/config/projectsPageContent'
import type { ProjectsPageContent } from '@/utilities/getProjectsPageContent'
import type { PublishedProject } from '@/utilities/getPublishedProjects'

const BENTO_PATTERN = [
  { col: 'col-lg-8', mode: 'featured' as const },
  { col: 'col-lg-4', mode: 'visual' as const },
  { col: 'col-lg-4', mode: 'visual' as const },
  { col: 'col-lg-8', mode: 'featured' as const },
  { col: 'col-lg-8', mode: 'featured' as const },
  { col: 'col-lg-4', mode: 'visual' as const },
] as const

type ChariticsProjectsPageProps = {
  content: ProjectsPageContent
}

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const colClass = 'col-md-6 col-10 col-xxs-12'

function buildBentoSlots(projectCount: number) {
  const slotCount = Math.max(6, projectCount * 2)
  return Array.from({ length: slotCount }, (_, index) => ({
    ...BENTO_PATTERN[index % BENTO_PATTERN.length],
    projectIndex: index % projectCount,
  }))
}

function projectImage(project: PublishedProject, mode: 'featured' | 'visual') {
  if (mode === 'featured') return project.wideImage ?? project.visualImage
  return project.visualImage ?? project.wideImage
}

function ProjectMedia({
  mode,
  project,
}: {
  mode: 'featured' | 'visual'
  project: PublishedProject
}) {
  const image = projectImage(project, mode)
  if (image) {
    return <img alt={project.title} src={image} />
  }

  return (
    <div
      aria-hidden
      className={`epl-project-card-visual ${getProjectVisualClass(project.slug)}`}
    />
  )
}

function FeaturedProjectCard({ project }: { project: PublishedProject }) {
  return (
    <div className="ul-project epl-project--featured">
      <div className="ul-project-img">
        <ProjectMedia mode="featured" project={project} />
      </div>
      <div className="ul-project-txt">
        <div>
          <h3 className="ul-project-title">
            <Link href={project.href}>{project.title}</Link>
          </h3>
          <p className="ul-project-descr">{project.category}</p>
        </div>
        <Link aria-label={`View ${project.title}`} className="ul-project-btn" href={project.href}>
          <i className="flaticon-up-right-arrow"></i>
        </Link>
      </div>
    </div>
  )
}

function VisualProjectCard({ project }: { project: PublishedProject }) {
  return (
    <Link
      aria-label={project.title}
      className="ul-project ul-project--sm epl-project--visual-only"
      href={project.href}
    >
      <div className="ul-project-img">
        <ProjectMedia mode="visual" project={project} />
      </div>
    </Link>
  )
}

export function ChariticsProjectsPage({ content }: ChariticsProjectsPageProps) {
  const { intro, projects, cta } = content
  const slots = projects.length > 0 ? buildBentoSlots(projects.length) : []
  const introParagraphs = [intro.description, ...intro.additionalParagraphs].filter(Boolean)

  return (
    <>
      <section className="ul-projects ul-section-spacing epl-projects-page epl-projects-bento">
        <div className="ul-container">
          <header className="epl-projects-page-head wow animate__fadeInUp">
            <span className="ul-section-sub-title">{intro.eyebrow}</span>
            <h2 className="ul-section-title">{intro.title}</h2>
            <div className="epl-projects-page-lead">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </header>

          {projects.length > 0 ? (
            <motion.div
              animate="show"
              className="row ul-bs-row justify-content-center epl-projects-page-grid"
              initial="hidden"
              variants={gridVariants}
            >
              {slots.map((slot, index) => {
                const project = projects[slot.projectIndex]

                return (
                  <motion.div
                    className={`${slot.col} ${colClass}`}
                    key={`${slot.mode}-${project.slug}-${index}`}
                    variants={cardVariants}
                  >
                    {slot.mode === 'featured' ? (
                      <FeaturedProjectCard project={project} />
                    ) : (
                      <VisualProjectCard project={project} />
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          ) : null}
        </div>
      </section>

      <section className="epl-projects-cta">
        <div className="ul-container">
          <div className="epl-projects-cta-inner">
            <h2 className="epl-projects-cta-title">{cta.title}</h2>
            <Link className="ul-btn epl-projects-cta-btn" href={cta.ctaHref}>
              <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> {cta.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
