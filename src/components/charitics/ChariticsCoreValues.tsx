'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { eplCoreValuesWithIcons } from '@/config/coreValues'
import type { SiteSetting } from '@/payload-types'

type ChariticsCoreValuesProps = {
  settings: SiteSetting
}

const iconByTitle: Record<string, string> = Object.fromEntries(
  eplCoreValuesWithIcons.map((value) => [value.title.toLowerCase(), value.icon]),
)

const detailVariants = {
  enter: { opacity: 0, x: 28, filter: 'blur(4px)' },
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -28, filter: 'blur(4px)' },
}

function resolveIcon(title: string) {
  return iconByTitle[title.toLowerCase()] ?? 'flaticon-star'
}

export function ChariticsCoreValues({ settings }: ChariticsCoreValuesProps) {
  const values = useMemo(() => {
    if (settings.coreValues && settings.coreValues.length > 0) {
      return settings.coreValues.map((value) => ({
        title: value.title,
        description: value.description,
        icon: resolveIcon(value.title),
      }))
    }
    return eplCoreValuesWithIcons
  }, [settings.coreValues])

  const [activeIndex, setActiveIndex] = useState(0)
  const active = values[activeIndex] ?? values[0]

  if (!active) return null

  return (
    <section className="epl-core-values ul-section-spacing wow animate__fadeInUp">
      <div className="ul-container">
        <motion.div
          className="epl-core-values-header text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="ul-section-sub-title epl-core-values-main-eyebrow">
            <span className="txt">What We Stand For</span>
          </span>
          <h2 className="ul-section-title epl-core-values-main-title">Our Core Values</h2>
        </motion.div>

        <div className="row row-cols-lg-2 row-cols-1 gy-5 align-items-center epl-core-values-row d-none d-lg-flex">
          <div className="col-lg-5">
            <div aria-label="Core values" className="epl-values-tree" role="list">
              {values.map((value, index) => {
                const isActive = index === activeIndex
                return (
                  <motion.div
                    className="epl-values-tree-item"
                    initial={{ opacity: 0, x: -16 }}
                    key={value.title}
                    role="listitem"
                    transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <button
                      aria-current={isActive ? 'true' : undefined}
                      aria-label={value.title}
                      className={`epl-values-tree-node${isActive ? ' is-active' : ''}`}
                      onClick={() => setActiveIndex(index)}
                      type="button"
                    >
                      <motion.span
                        animate={{ scale: isActive ? 1.08 : 1 }}
                        className="node-icon"
                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                        whileHover={{ scale: isActive ? 1.08 : 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <i className={value.icon}></i>
                      </motion.span>
                      <span className="node-label">{value.title}</span>
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="col-lg-7">
            <div className="epl-core-values-txt">
              <AnimatePresence mode="wait">
                <motion.div
                  animate="center"
                  exit="exit"
                  initial="enter"
                  key={active.title}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  variants={detailVariants}
                >
                  <h3 className="ul-section-title epl-core-values-active-title">{active.title}</h3>
                  <p className="ul-section-descr epl-core-values-active-descr">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>
              <p className="epl-core-values-hint">The principles that guide how we develop leaders and strengthen Ghana’s public service.</p>
            </div>
          </div>
        </div>

        <div className="epl-core-values-mobile d-lg-none">
          {values.map((value, index) => {
            const isOpen = index === activeIndex
            return (
              <div
                className={`epl-core-values-accordion${isOpen ? ' is-open' : ''}`}
                key={value.title}
              >
                <button
                  aria-expanded={isOpen}
                  className="epl-core-values-accordion-trigger"
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  type="button"
                >
                  <span className="epl-core-values-accordion-icon">
                    <i className={value.icon}></i>
                  </span>
                  <span className="epl-core-values-accordion-label">{value.title}</span>
                  <i
                    aria-hidden
                    className={`flaticon-down epl-core-values-accordion-chevron${isOpen ? ' is-open' : ''}`}
                  ></i>
                </button>
                <div className="epl-core-values-accordion-panel">
                  <p className="epl-core-values-accordion-descr">{value.description}</p>
                </div>
              </div>
            )
          })}
          <p className="epl-core-values-hint epl-core-values-mobile-hint">
            The principles that guide how we develop leaders and strengthen Ghana’s public service.
          </p>
        </div>
      </div>
    </section>
  )
}
