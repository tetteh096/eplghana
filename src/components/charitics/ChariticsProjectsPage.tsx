'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useMemo } from 'react'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { EPL_MEDIA, eplHomeImages, resolveProjectImage } from '@/config/eplMedia'
import type { ProjectsPageContent } from '@/utilities/getProjectsPageContent'

type ChariticsProjectsPageProps = {
  content: ProjectsPageContent
}

const easeOut = [0.22, 1, 0.36, 1] as const

type ProjectCardFallback = {
  slug: string
  badge: string
  badgeType: 'gold' | 'blue'
  title: string
  image: string
  description: string
  metric: string
  href: string
}

const PROJECT_PAGE_ORDER = [
  'public-service-fellowship',
  'elevated-minds',
  'women-on-the-rise',
  'peace',
] as const

const projectFallbacks: ProjectCardFallback[] = [
  {
    slug: 'public-service-fellowship',
    badge: 'Core Programme',
    badgeType: 'gold',
    title: 'Public Service Fellowship',
    image: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
    description:
      'A flagship 12-month leadership development programme placing young professionals in public institutions across Ghana. Fellows receive structured mentorship, targeted training and peer learning that builds lasting leadership capacity.',
    metric: '500+ Fellows across 8 cohorts',
    href: '/projects/public-service-fellowship',
  },
  {
    slug: 'elevated-minds',
    badge: 'Program',
    badgeType: 'blue',
    title: 'Elevated MINDS',
    image: `${EPL_MEDIA}/2025/04/HN7A4284-scaled.jpg`,
    description:
      'A school-based career development and readiness programme for JHS and SHS students, establishing career clubs across three pilot schools and reaching 500 learners at key education and work transition points.',
    metric: '500 students across 3 pilot schools',
    href: '/projects/elevated-minds',
  },
  {
    slug: 'women-on-the-rise',
    badge: 'Program',
    badgeType: 'blue',
    title: 'Women on the Rise',
    image: `${EPL_MEDIA}/2025/10/IMG_7245-scaled.jpg`,
    description:
      "Empowering women in public service through targeted leadership training, mentorship networks and deliberate spaces that amplify women's voices in institutional decision-making across Ghana.",
    metric: '120+ women leaders developed',
    href: '/projects/women-on-the-rise',
  },
  {
    slug: 'peace',
    badge: 'Initiative',
    badgeType: 'blue',
    title: 'P.E.A.C.E.',
    image: `${EPL_MEDIA}/2023/12/MG_0422-scaled.jpg`,
    description:
      'Promoting Ethical Action in Civic Environments — building ethical leadership and governance principles in public institutions through focused cohorts, peer accountability and applied research.',
    metric: 'Policy frameworks in development',
    href: '/projects/peace',
  },
]

const slugAliases: Record<string, string> = {
  maritime: 'elevated-minds',
  eplim: 'elevated-minds',
  'epl-in-maritime': 'elevated-minds',
  'elevated-minds': 'elevated-minds',
}

function normalizeSlug(slug: string): string {
  return slugAliases[slug] ?? slug
}

function badgeTypeFor(category: string, fallback?: ProjectCardFallback): 'gold' | 'blue' {
  if (fallback?.badgeType) return fallback.badgeType
  const lower = category.toLowerCase()
  if (lower.includes('core') || lower.includes('flagship')) return 'gold'
  return 'blue'
}

function metricFor(slug: string, cmsMetric: string | null | undefined, fallback?: ProjectCardFallback) {
  if (cmsMetric?.trim()) return cmsMetric.trim()
  if (fallback?.metric) return fallback.metric
  const known = projectFallbacks.find((p) => p.slug === normalizeSlug(slug))
  return known?.metric ?? 'Learn more about this programme'
}

export function ChariticsProjectsPage({ content }: ChariticsProjectsPageProps) {
  const reduceMotion = useReducedMotion()

  const projects = useMemo(() => {
    const cmsBySlug = new Map(
      content.projects.map((cms) => [normalizeSlug(cms.slug), cms] as const),
    )

    return PROJECT_PAGE_ORDER.map((slug) => {
      const fallback = projectFallbacks.find((p) => p.slug === slug)!
      const cms = cmsBySlug.get(slug)
      const image =
        cms?.wideImage ??
        resolveProjectImage(slug, null) ??
        fallback.image

      return {
        slug,
        badge: cms?.category || fallback.badge,
        badgeType: badgeTypeFor(cms?.category || '', fallback),
        title: fallback.title,
        image,
        description: cms?.summary || fallback.description,
        metric: metricFor(slug, cms?.listingMetric, fallback),
        href: cms?.href || fallback.href,
      }
    })
  }, [content.projects])

  const eyebrow = 'Our Program'
  const title = 'Projects That Move Public Service Forward'
  const ctaTitle = 'Be Part of Our Work'
  const ctaLabel = 'Become a Fellow'
  const ctaHref = '/contact'

  return (
    <div className="figma-projects-page">
      <section className="figma-about-hero figma-projects-hero">
        <motion.div
          animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.04 }}
          className="figma-about-hero__bg"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          style={{ backgroundImage: `url(${eplHomeImages.aboutMain})` }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
        <div className="figma-about-hero__overlay" />
        <motion.div
          animate="show"
          className="figma-about-hero__content figma-projects-hero__content"
          initial={reduceMotion ? false : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
        >
          <motion.div
            className="figma-kicker figma-kicker--gold"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
            }}
          >
            <span className="figma-kicker__line" />
            <span>{eyebrow.toUpperCase()}</span>
          </motion.div>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 28 },
              show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOut } },
            }}
          >
            {title}
          </motion.h1>
        </motion.div>
      </section>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        style={{ paddingBlock: '100px' }}
      >
        <MotionReveal className="figma-projects-grid" stagger>
          {projects.map((project) => (
            <MotionItem key={project.slug}>
              <article className="figma-project-card" id={project.slug}>
                <div>
                  <div className="figma-project-card__image">
                    <img
                      alt={project.title}
                      decoding="async"
                      loading="lazy"
                      src={project.image}
                    />
                  </div>
                  <span className={`figma-project-badge figma-project-badge--${project.badgeType}`}>
                    {project.badge}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                <div className="figma-project-footer">
                  <span className="figma-project-metric">{project.metric}</span>
                  <Link className="figma-project-btn" href={project.href}>
                    See More <span>→</span>
                  </Link>
                </div>
              </article>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal as="section" className="figma-section figma-projects-cta">
        <div className="epl-new-shell">
          <div className="figma-projects-cta__inner">
            <div className="figma-kicker figma-kicker--gold" style={{ justifyContent: 'center' }}>
              <span className="figma-kicker__line" />
              <span>GET CONNECTED</span>
            </div>
            <h2 className="figma-projects-cta__title">{ctaTitle}</h2>
            <p className="figma-projects-cta__text">
              Whether you are an aspiring young leader, a public institution looking to host talent,
              or a strategic partner, there is a place for you in the EPL Ghana community.
            </p>
            <div className="figma-projects-cta__actions">
              <Link className="epl-new-btn epl-new-btn--gold" href={ctaHref}>
                {ctaLabel} <span>↗</span>
              </Link>
              <Link className="epl-new-btn figma-projects-cta__partner" href="/community/partners">
                Partner With Us <span>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  )
}
