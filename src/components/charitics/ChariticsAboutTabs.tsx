'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { AboutContent } from '@/utilities/getAboutContent'

type ChariticsAboutTabsProps = {
  mission: AboutContent['mission']
  vision: AboutContent['vision']
  impact: AboutContent['impact']
}

const IMPACT_TAB = { id: 'tab-impact' as const, label: 'Our Impact' }

type TabId = 'tab-mission' | 'tab-vision' | 'tab-impact'

/** Charitics about.html, ul-about-tabs / ul-events */
export function ChariticsAboutTabs({ mission, vision, impact }: ChariticsAboutTabsProps) {
  const CONTENT_TABS = [
    { id: 'tab-mission' as const, label: 'Our Mission', data: mission },
    { id: 'tab-vision' as const, label: 'Our Vision', data: vision },
  ]
  const TABS = [...CONTENT_TABS, IMPACT_TAB]
  const [activeId, setActiveId] = useState<TabId>('tab-mission')

  return (
    <section className="ul-about-tabs ul-events epl-about-tabs-section ul-section-spacing pt-0">
      <div className="ul-container">
        <div className="ul-section-heading align-items-center wow animate__fadeInUp">
          <div className="left">
            <span className="ul-section-sub-title">What Drives Us</span>
            <h2 className="ul-section-title text-white">Mission, Vision &amp; Impact</h2>
          </div>
          <Link className="ul-btn" href="/get-involved">
            <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Get Involved
          </Link>
        </div>

        <div className="tab-group">
          <div className="ul-about-tabs-wrapper">
            {CONTENT_TABS.map((tab) => (
              <div
                className={`ul-tab ul-about-tab${activeId === tab.id ? ' active' : ''}`}
                id={tab.id}
                key={tab.id}
              >
                <div className="ul-about-tab-img">
                  <img alt="" src={tab.data.image} />
                </div>
                <div className="ul-about-tab-txt">
                  <h3 className="ul-about-tab-title">{tab.label}</h3>
                  <p className="ul-about-tab-descr">{tab.data.body}</p>
                </div>
              </div>
            ))}

            <div
              className={`ul-tab ul-about-tab epl-about-impact-tab${activeId === IMPACT_TAB.id ? ' active' : ''}`}
              id={IMPACT_TAB.id}
            >
              <div className="epl-about-impact-top">
                <div className="ul-about-tab-img epl-about-impact-img">
                  <img alt="EPL Ghana impact in public institutions" src={impact.image} />
                </div>
                <div className="epl-about-impact-intro">
                  <span className="epl-about-impact-eyebrow">{impact.heading}</span>
                  <h3 className="ul-about-tab-title">{IMPACT_TAB.label}</h3>
                  <p className="ul-about-tab-descr epl-about-impact-lead">{impact.intro}</p>
                </div>
              </div>

              <div className="epl-about-impact-cards">
                {impact.items.map((item, index) => (
                  <article
                    className="epl-about-impact-card"
                    key={item.title}
                  >
                    <span aria-hidden className="epl-about-impact-card-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="epl-about-impact-card-body">
                      <h4 className="epl-about-impact-card-title">{item.title}</h4>
                      <p className="epl-about-impact-card-text">{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="tab-navs ul-about-tabs-nav" role="tablist">
            {TABS.map((tab) => (
              <button
                aria-selected={activeId === tab.id}
                className={`tab-nav${activeId === tab.id ? ' active' : ''}`}
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                role="tab"
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ul-events-vectors">
          <img alt="" className="vector-2" src="/assets/img/events-vector-2.svg" />
        </div>
      </div>
    </section>
  )
}
