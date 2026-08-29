'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useMemo } from 'react'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { EPL_MEDIA, eplHomeImages, resolveProjectImage } from '@/config/eplMedia'
import type { ProjectsPageContent } from '@/utilities/getProjectsPageContent'
import type { PublishedProject } from '@/utilities/getPublishedProjects'

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

const projectFallbacks: ProjectCardFallback[] = [
  {
    slug: 'public-service-fellowship',
    badge: 'Core Programme',
    badgeType: 'gold',
    title: 'Emerging Public Leaders Fellowship',
    image: `${EPL_MEDIA}/2025/10/CSG-16-scaled.jpg`,
    description:
      'A flagship 12-month leadership development programme placing young professionals in public institutions across Ghana. Fellows receive structured mentorship, targeted training and peer learning that builds lasting leadership capacity.',
    metric: '500+ Fellows across 8 cohorts',
    href: '/projects/public-service-fellowship',
  },
  {
    slug: 'epl-in-maritime',
    badge: 'Program',
    badgeType: 'blue',
    title: 'EPL in Maritime (EPLIM)',
    image: `${EPL_MEDIA}/2025/11/LEMA25-0486-1024x682.jpg`,
    description:
      "A leadership programme developing emerging leaders in Ghana's maritime sector through practical learning, mentorship, professional development and exposure to the institutions shaping the country's maritime future.",
    metric: "Developing leaders in Ghana's maritime sector",
    href: '/projects/epl-in-maritime',
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
  maritime: 'epl-in-maritime',
  eplim: 'epl-in-maritime',
  'epl-in-maritime': 'epl-in-maritime',
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

function findFallback(project: PublishedProject): ProjectCardFallback | undefined {
  const slug = normalizeSlug(project.slug)
  return (
    projectFallbacks.find((p) => p.slug === slug) ??
    projectFallbacks.find((p) => project.title.toLowerCase().includes(p.title.toLowerCase().slice(0, 12)))
  )
}

export function ChariticsProjectsPage({ content }: ChariticsProjectsPageProps) {
  const reduceMotion = useReducedMotion()

  const projects = useMemo(() => {
    const cmsProjects = content.projects

    if (cmsProjects.length > 0) {
      return cmsProjects.map((cms) => {
        const fallback = findFallback(cms)
        const image =
          cms.wideImage ??
          resolveProjectImage(cms.slug, null) ??
          fallback?.image ??
          eplHomeImages.aboutMain

        return {
          slug: cms.slug,
          badge: cms.category || fallback?.badge || 'Programme',
          badgeType: badgeTypeFor(cms.category || '', fallback),
          title: cms.title || fallback?.title || 'Programme',
          image,
          description: cms.summary || fallback?.description || '',
          metric: metricFor(cms.slug, cms.listingMetric, fallback),
          href: cms.href || fallback?.href || `/projects/${cms.slug}`,
        }
      })
    }

    return projectFallbacks
  }, [content.projects])

  const eyebrow = content.intro.eyebrow || 'Our Programmes'
  const title = content.intro.title || 'Projects That Move Public Service Forward'
  const description =
    content.intro.description ||
    'A flagship suite of leadership development programmes placing young professionals, empowering women, building peace, and driving maritime leadership across Ghana.'
  const ctaTitle = content.cta.title || 'Be Part of Our Work'
  const ctaLabel = content.cta.ctaLabel || 'Become a Fellow'
  const ctaHref = content.cta.ctaHref || '/get-involved'

  return (
    <div className="figma-projects-page">
      <section className="figma-about-hero">
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
          className="figma-about-hero__content"
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
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOut } },
            }}
          >
            {description}
          </motion.p>
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

      <MotionReveal
        as="section"
        className="figma-section epl-textured-band"
        style={{ paddingBlock: '100px' }}
      >
        <div className="epl-new-shell">
          <div
            className="figma-section-head"
            style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}
          >
            <div className="figma-kicker figma-kicker--gold" style={{ justifyContent: 'center' }}>
              <span className="figma-kicker__line" />
              <span>GET CONNECTED</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 54px)',
                fontWeight: 800,
                color: '#ffffff',
                margin: '14px 0 16px',
              }}
            >
              {ctaTitle}
            </h2>
            <p
              style={{
                margin: '0 auto 32px',
                color: 'rgba(255,255,255,0.92)',
                fontSize: '18px',
                lineHeight: 1.65,
              }}
            >
              Whether you are an aspiring young leader, a public institution looking to host talent,
              or a strategic partner, there is a place for you in the EPL Ghana community.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link className="epl-new-btn epl-new-btn--gold" href={ctaHref}>
                {ctaLabel} <span>↗</span>
              </Link>
              <Link
                className="epl-new-btn epl-new-btn--blue"
                href="/community/partners"
                style={{ background: '#0C1427', borderColor: '#0C1427' }}
              >
                Partner With Us <span>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  )
}
