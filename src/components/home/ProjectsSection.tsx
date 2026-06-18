import Image from 'next/image'
import Link from 'next/link'

import { eplFlagshipProjects } from '@/config/epl-defaults'
import type { Project } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type ProjectsSectionProps = {
  projects: Project[]
}

const fallbackImages = ['/images/project-1.jpg', '/images/project-2.jpg', '/images/project-3.jpg']

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const hasCmsProjects = projects.length > 0

  return (
    <section className="epl-section bg-white">
      <div className="epl-container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="epl-section-subtitle">What We Do</span>
            <h2 className="epl-section-title mt-2">Explore Our Projects</h2>
          </div>
          <Link className="epl-btn-outline" href="/projects">
            All Projects
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {hasCmsProjects
            ? projects.map((project) => {
                const imageUrl = getMediaUrl(project.featuredImage) ?? '/images/project-1.jpg'
                return (
                  <ProjectCard
                    key={project.id}
                    category={project.category}
                    imageUrl={imageUrl}
                    slug={project.slug}
                    summary={project.summary}
                    title={project.title}
                  />
                )
              })
            : eplFlagshipProjects.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  category={project.category}
                  imageUrl={fallbackImages[i] ?? '/images/project-1.jpg'}
                  slug={project.slug}
                  summary={project.summary}
                  title={project.title}
                />
              ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  category,
  imageUrl,
  slug,
  summary,
  title,
}: {
  category?: string | null
  imageUrl: string
  slug: string
  summary: string
  title: string
}) {
  return (
    <article className="epl-card group">
      <Link href={`/projects/${slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            src={imageUrl}
          />
          {category && (
            <span className="absolute left-4 top-4 rounded-full bg-epl-primary px-3 py-1 text-xs font-semibold text-white">
              {category}
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-epl-dark group-hover:text-epl-primary">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-epl-muted">{summary}</p>
        </div>
      </Link>
    </article>
  )
}
