'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

import { ProjectDetailImage } from '@/components/charitics/ProjectDetailImage'
import { EplStickyBottomTabs } from '@/components/charitics/EplStickyBottomTabs'
import type {
  FellowshipProjectContent,
  FellowshipTabId,
} from '@/utilities/getFellowshipProjectContent'

type ChariticsFellowshipDetailProps = {
  content: FellowshipProjectContent
  visualClass?: string
}

const panelVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

function SectionHead({
  eyebrow,
  title,
  centered = false,
}: {
  eyebrow?: string
  title: string
  centered?: boolean
}) {
  return (
    <div className={`epl-fellowship-section-head${centered ? ' epl-fellowship-section-head--center' : ''}`}>
      {eyebrow && <span className="ul-section-sub-title">{eyebrow}</span>}
      <h2 className="epl-fellowship-section-title">{title}</h2>
    </div>
  )
}

export function ChariticsFellowshipDetail({
  content,
  visualClass = 'epl-project-card-visual--public-service-fellowship',
}: ChariticsFellowshipDetailProps) {
  const [activeTab, setActiveTab] = useState<FellowshipTabId>('about')
  const {
    hero,
    impact,
    whyJoin,
    tabs,
    programmeStructure,
    applicationProcess,
    eligibility,
    applyCta,
    partnerCta,
  } = content

  const primaryHero = hero.images[0]
  const secondaryHero = hero.images[1] ?? primaryHero

  const stickyTabs = tabs.map((tab) => ({
    ...tab,
    mobileLabel:
      tab.id === 'about' ? 'About' : tab.id === 'process' ? 'Apply' : 'Eligible',
  }))

  const fellowshipPanel = (tabId: FellowshipTabId) => {
    if (tabId === 'about') {
      return (
        <ProgrammeStructurePanel
          intro={programmeStructure.intro}
          sidebarEyebrow={programmeStructure.sidebarEyebrow}
          sidebarImage={programmeStructure.sidebarImage}
          steps={programmeStructure.steps}
          title={programmeStructure.title}
          visualClass={visualClass}
        />
      )
    }
    if (tabId === 'process') {
      return (
        <ApplicationProcessPanel
          bannerImage={applicationProcess.bannerImage}
          eyebrow={applicationProcess.eyebrow}
          intro={applicationProcess.intro}
          steps={applicationProcess.steps}
          title={applicationProcess.title}
          visualClass={visualClass}
        />
      )
    }
    return (
      <EligibilityPanel
        criteria={eligibility.criteria}
        documents={eligibility.documents}
        documentsTitle={eligibility.documentsTitle}
        inclusionNote={eligibility.inclusionNote}
        intro={eligibility.intro}
        sidebarImage={eligibility.sidebarImage}
        title={eligibility.title}
        visualClass={visualClass}
      />
    )
  }

  return (
    <>
      <section className="epl-fellowship-hero ul-section-spacing">
        <div className="ul-container">
          <div className="row ul-bs-row gy-5 align-items-center">
            <div className="col-lg-5">
              <div className="epl-fellowship-hero-copy">
                <span className="ul-section-sub-title">{hero.eyebrow}</span>
                <h1 className="ul-section-title epl-fellowship-hero-title">{hero.title}</h1>
                <p className="epl-fellowship-hero-descr">{hero.description}</p>

                <ul className="epl-fellowship-hero-stats">
                  {hero.highlights.map((item) => (
                    <li key={item.label}>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="epl-fellowship-hero-actions">
                  <Link className="ul-btn epl-fellowship-hero-cta" href={hero.ctaHref}>
                    <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                    {hero.ctaLabel}
                  </Link>
                  <Link
                    className="ul-btn epl-fellowship-hero-cta epl-fellowship-hero-cta--secondary"
                    href={hero.secondaryCtaHref}
                  >
                    {hero.secondaryCtaLabel}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="epl-fellowship-hero-media">
                <ProjectDetailImage
                  alt={hero.title}
                  className="epl-fellowship-hero-img epl-fellowship-hero-img--primary"
                  fallbackClass={`epl-project-card-visual epl-fellowship-hero-fallback ${visualClass}`}
                  src={primaryHero}
                />
                <ProjectDetailImage
                  alt="Public Service Fellowship cohort"
                  className="epl-fellowship-hero-img epl-fellowship-hero-img--secondary"
                  fallbackClass={`epl-project-card-visual epl-fellowship-hero-fallback epl-fellowship-hero-fallback--secondary ${visualClass}`}
                  src={secondaryHero}
                />
                <div className="epl-fellowship-hero-badge" aria-hidden>
                  <strong>{hero.badge.value}</strong>
                  <span>{hero.badge.label}</span>
                </div>
                <img
                  alt=""
                  className="epl-fellowship-hero-vector"
                  src="/assets/img/about-img-vector-2.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="epl-fellowship-impact">
        <div className="ul-container">
          <SectionHead centered eyebrow={impact.eyebrow} title={impact.title} />
          <div className="epl-fellowship-impact-stats">
            {impact.stats.map((stat) => (
              <article className="epl-fellowship-impact-stat" key={stat.label}>
                <strong className="epl-fellowship-impact-value">{stat.value}</strong>
                <p className="epl-fellowship-impact-label">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-fellowship-why ul-section-spacing">
        <div className="ul-container">
          <SectionHead centered eyebrow={whyJoin.eyebrow} title={whyJoin.title} />
          <div className="epl-fellowship-why-grid">
            {whyJoin.items.map((item) => (
              <article className="epl-fellowship-why-card" key={item.title}>
                <div className="epl-fellowship-why-icon">
                  <i aria-hidden className={item.icon}></i>
                </div>
                <h3 className="epl-fellowship-why-title">{item.title}</h3>
                <p className="epl-fellowship-why-descr">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="epl-fellowship-detail ul-section-spacing">
        <div className="ul-container">
          <div className="epl-fellowship-detail-tabs d-none d-lg-block">
            <div className="epl-fellowship-tabs-wrap">
              <div aria-label="Fellowship information" className="epl-fellowship-tabs" role="tablist">
                {tabs.map((tab) => (
                  <button
                    aria-selected={activeTab === tab.id}
                    className={`epl-fellowship-tab${activeTab === tab.id ? ' is-active' : ''}`}
                    id={`fellowship-tab-${tab.id}`}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                    type="button"
                  >
                    <i aria-hidden className={`epl-fellowship-tab-icon ${tab.icon}`}></i>
                    <span className="epl-fellowship-tab-label">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                animate="show"
                aria-labelledby={`fellowship-tab-${activeTab}`}
                className="epl-fellowship-panel"
                exit="exit"
                initial="hidden"
                key={activeTab}
                role="tabpanel"
                variants={panelVariants}
              >
                {fellowshipPanel(activeTab)}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="epl-fellowship-mobile d-lg-none">
            <AnimatePresence mode="wait">
              <motion.div
                animate="show"
                aria-labelledby={`fellowship-panel-tab-${activeTab}`}
                className="epl-fellowship-panel"
                exit="exit"
                id={`fellowship-panel-${activeTab}`}
                initial="hidden"
                key={activeTab}
                role="tabpanel"
                variants={panelVariants}
              >
                {fellowshipPanel(activeTab)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <EplStickyBottomTabs
        activeId={activeTab}
        ariaLabel="Fellowship information"
        className="epl-bottom-tabs--fellowship"
        onChange={(id) => setActiveTab(id as FellowshipTabId)}
        panelIdPrefix="fellowship-panel-"
        tabs={stickyTabs}
      />

      <section className="epl-fellowship-apply-cta">
        <div className="ul-container">
          <div className="epl-fellowship-apply-cta-inner">
            <div className="epl-fellowship-apply-cta-copy">
              <span className="epl-fellowship-apply-cta-eyebrow">{applyCta.eyebrow}</span>
              <h2 className="epl-fellowship-apply-cta-title">{applyCta.title}</h2>
              <p className="epl-fellowship-apply-cta-descr">{applyCta.description}</p>
              <div className="epl-fellowship-apply-cta-actions">
                <Link className="ul-btn epl-fellowship-apply-cta-btn" href={applyCta.ctaHref}>
                  <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                  {applyCta.ctaLabel}
                </Link>
                <Link
                  className="epl-fellowship-apply-cta-link"
                  href={applyCta.secondaryCtaHref}
                >
                  {applyCta.secondaryCtaLabel} <i className="flaticon-up-right-arrow"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="epl-fellowship-partner-cta">
        <div className="ul-container">
          <div className="epl-fellowship-partner-cta-inner">
            <div className="epl-fellowship-partner-cta-copy">
              <h2 className="epl-fellowship-partner-cta-title">{partnerCta.title}</h2>
              <Link className="ul-btn epl-fellowship-partner-cta-btn" href={partnerCta.ctaHref}>
                <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
                {partnerCta.ctaLabel}
              </Link>
            </div>
            <div className="epl-fellowship-partner-cta-media">
              <ProjectDetailImage
                alt=""
                className="epl-fellowship-partner-cta-img"
                fallbackClass={`epl-project-card-visual epl-fellowship-partner-fallback ${visualClass}`}
                src={partnerCta.image}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ProgrammeStructurePanel({
  title,
  intro,
  sidebarEyebrow,
  sidebarImage,
  steps,
  visualClass,
}: {
  title: string
  intro: string
  sidebarEyebrow: string
  sidebarImage: string
  steps: { title: string; description: string; image: string }[]
  visualClass: string
}) {
  return (
    <div className="epl-fellowship-about">
      <div className="row ul-bs-row gy-5">
        <div className="col-lg-4">
          <div className="epl-fellowship-sidebar">
            <ProjectDetailImage
              alt="Public Service Fellowship programme"
              className="epl-fellowship-sidebar-img"
              fallbackClass={`epl-project-card-visual epl-fellowship-sidebar-fallback ${visualClass}`}
              src={sidebarImage}
            />
            <div className="epl-fellowship-sidebar-card">
              <span className="epl-fellowship-sidebar-eyebrow">{sidebarEyebrow}</span>
              <h2 className="epl-fellowship-panel-title">{title}</h2>
              <p className="epl-fellowship-panel-intro">{intro}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <ol className="epl-fellowship-timeline">
            {steps.map((step, index) => (
              <li className="epl-fellowship-timeline-item" key={step.title}>
                <div className="epl-fellowship-timeline-marker" aria-hidden>
                  <span>{index + 1}</span>
                </div>
                <article className="epl-fellowship-timeline-card">
                  <div className="epl-fellowship-timeline-media">
                    <ProjectDetailImage
                      alt={step.title}
                      className="epl-fellowship-timeline-img"
                      fallbackClass={`epl-project-card-visual epl-fellowship-timeline-fallback ${visualClass}`}
                      src={step.image}
                    />
                  </div>
                  <div className="epl-fellowship-timeline-body">
                    <h3 className="epl-fellowship-timeline-title">{step.title}</h3>
                    <p className="epl-fellowship-timeline-descr">{step.description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

function ApplicationProcessPanel({
  eyebrow,
  title,
  intro,
  bannerImage,
  steps,
  visualClass,
}: {
  eyebrow: string
  title: string
  intro: string
  bannerImage: string
  steps: { title: string; description: string; image: string }[]
  visualClass: string
}) {
  return (
    <div className="epl-fellowship-process">
      <div className="epl-fellowship-process-head">
        <div className="row ul-bs-row gy-4 align-items-center">
          <div className="col-lg-7">
            <span className="epl-fellowship-process-eyebrow">{eyebrow}</span>
            <h2 className="epl-fellowship-panel-title">{title}</h2>
            <p className="epl-fellowship-panel-intro epl-fellowship-panel-intro--left">{intro}</p>
          </div>
          <div className="col-lg-5">
            <div className="epl-fellowship-process-head-media">
              <ProjectDetailImage
                alt="Fellowship application process"
                className="epl-fellowship-process-head-img"
                fallbackClass={`epl-project-card-visual epl-fellowship-process-head-fallback ${visualClass}`}
                src={bannerImage}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="epl-fellowship-process-track-wrap">
        <ol className="epl-fellowship-process-track" aria-label="Application stages">
          {steps.map((step, index) => (
            <li className="epl-fellowship-process-track-item" key={step.title}>
              <span className="epl-fellowship-process-track-dot">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="epl-fellowship-process-track-label">{step.title}</span>
            </li>
          ))}
        </ol>
      </div>

      <ol className="epl-fellowship-process-steps">
        {steps.map((step, index) => (
          <li className="epl-fellowship-process-step" key={step.title}>
            <article className="epl-fellowship-process-step-card">
              <div className="epl-fellowship-process-step-thumb">
                <ProjectDetailImage
                  alt={step.title}
                  className="epl-fellowship-process-step-img"
                  fallbackClass={`epl-project-card-visual epl-fellowship-process-step-fallback ${visualClass}`}
                  src={step.image}
                />
                <span className="epl-fellowship-process-step-badge" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="epl-fellowship-process-step-body">
                <span className="epl-fellowship-process-step-stage">
                  Stage {index + 1} of {steps.length}
                </span>
                <h3 className="epl-fellowship-process-step-title">{step.title}</h3>
                <p className="epl-fellowship-process-step-descr">{step.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  )
}

function EligibilityPanel({
  title,
  intro,
  sidebarImage,
  criteria,
  documentsTitle,
  documents,
  inclusionNote,
  visualClass,
}: {
  title: string
  intro: string
  sidebarImage: string
  criteria: string[]
  documentsTitle: string
  documents: string[]
  inclusionNote: string
  visualClass: string
}) {
  return (
    <div className="epl-fellowship-eligibility">
      <div className="row ul-bs-row gy-5">
        <div className="col-lg-5">
          <div className="epl-fellowship-eligibility-visual">
            <ProjectDetailImage
              alt="Fellowship eligibility"
              className="epl-fellowship-eligibility-img"
              fallbackClass={`epl-project-card-visual epl-fellowship-eligibility-fallback ${visualClass}`}
              src={sidebarImage}
            />
            <div className="epl-fellowship-documents">
              <h3 className="epl-fellowship-documents-title">{documentsTitle}</h3>
              <ul className="epl-fellowship-documents-list">
                {documents.map((doc) => (
                  <li key={doc}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="epl-fellowship-eligibility-main">
            <h2 className="epl-fellowship-panel-title">{title}</h2>
            <p className="epl-fellowship-panel-intro epl-fellowship-panel-intro--left">{intro}</p>

            <ul className="epl-fellowship-criteria">
              {criteria.map((item) => (
                <li key={item}>
                  <i aria-hidden className="flaticon-check-mark"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="epl-fellowship-inclusion">
              <i aria-hidden className="flaticon-love"></i>
              <p>{inclusionNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
