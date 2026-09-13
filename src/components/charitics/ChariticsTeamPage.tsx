'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { ChariticsTeamCard } from '@/components/charitics/ChariticsTeamCard'
import { EplStickyBottomTabs } from '@/components/charitics/EplStickyBottomTabs'
import { TeamMemberDrawer } from '@/components/charitics/TeamMemberDrawer'
import type { TeamMember } from '@/config/teamPageContent'
import type { TeamPageContent } from '@/utilities/getTeamContent'

type TeamTab = 'board' | 'team'

type ChariticsTeamPageProps = {
  content: TeamPageContent
}

export function ChariticsTeamPage({ content }: ChariticsTeamPageProps) {
  const { intro, boardMembers: board, staffMembers: team } = content

  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<TeamTab>('board')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [slideDirection, setSlideDirection] = useState(1)

  const tabs = useMemo(
    () =>
      [
        {
          id: 'board' as const,
          label: 'Board of Directors',
          mobileLabel: 'Board',
          count: board.length,
        },
        {
          id: 'team' as const,
          label: 'Team Members',
          mobileLabel: 'Team',
          count: team.length,
        },
      ] satisfies {
        id: TeamTab
        label: string
        mobileLabel: string
        count: number
      }[],
    [board.length, team.length],
  )

  const members = activeTab === 'board' ? board : team
  const activeTabMeta = tabs.find((tab) => tab.id === activeTab)!

  const selectedIndex = useMemo(
    () => members.findIndex((member) => member.id === selectedId),
    [members, selectedId],
  )

  const selected = selectedIndex >= 0 ? members[selectedIndex] : null

  const openMember = useCallback((member: TeamMember) => {
    setSelectedId(member.id)
    setIsDrawerOpen(true)
  }, [])

  const closePanel = useCallback(() => {
    setIsDrawerOpen(false)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedId(null)
  }, [])

  const goToMember = useCallback(
    (direction: -1 | 1) => {
      if (selectedIndex < 0 || members.length === 0) return
      setSlideDirection(direction)
      const nextIndex = (selectedIndex + direction + members.length) % members.length
      setSelectedId(members[nextIndex].id)
    },
    [members, selectedIndex],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  useEffect(() => {
    if (!isDrawerOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePanel()
      if (event.key === 'ArrowRight') goToMember(1)
      if (event.key === 'ArrowLeft') goToMember(-1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closePanel, goToMember, isDrawerOpen])

  useEffect(() => {
    if (selectedId && !members.some((member) => member.id === selectedId)) {
      setIsDrawerOpen(false)
      setSelectedId(null)
    }
  }, [members, selectedId])

  return (
    <>
      <section className="ul-team ul-inner-team epl-team-page ul-section-spacing">
        <div className="ul-container">
          <div className="ul-section-heading justify-content-center text-center epl-team-page-head wow animate__fadeInUp">
            <div className="left mx-auto">
              <span className="ul-section-sub-title">{intro.eyebrow}</span>
              <h2 className="ul-section-title">{intro.title}</h2>
              <p className="ul-section-descr epl-team-page-descr">{intro.description}</p>
            </div>
          </div>

          <div className="epl-team-detail-tabs d-none d-lg-block">
            <div className="epl-team-tabs-wrap">
              <div aria-label="Team groups" className="epl-team-tabs" role="tablist">
                {tabs.map((tab) => (
                  <button
                    aria-controls={`epl-team-panel-${tab.id}`}
                    aria-selected={activeTab === tab.id}
                    className={`epl-team-tab${activeTab === tab.id ? ' is-active' : ''}`}
                    id={`epl-team-tab-${tab.id}`}
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      closePanel()
                    }}
                    role="tab"
                    type="button"
                  >
                    <span className="epl-team-tab-label">{tab.label}</span>
                    <span className="epl-team-tab-count">{tab.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                aria-labelledby={`epl-team-tab-${activeTab}`}
                exit={{ opacity: 0, y: 8 }}
                id={`epl-team-panel-${activeTab}`}
                initial={{ opacity: 0, y: 12 }}
                key={activeTab}
                role="tabpanel"
                transition={{ duration: 0.24, ease: 'easeOut' }}
              >
                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-2 ul-team-row justify-content-center epl-team-grid">
                  {members.map((member) => (
                    <div className="col" key={member.id}>
                      <ChariticsTeamCard
                        isActive={member.id === selectedId}
                        member={member}
                        onOpen={(item) => openMember(item)}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="epl-team-mobile d-lg-none">
            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                aria-labelledby={`epl-team-tab-${activeTab}`}
                exit={{ opacity: 0, y: 8 }}
                id={`epl-team-panel-${activeTab}`}
                initial={{ opacity: 0, y: 12 }}
                key={activeTab}
                role="tabpanel"
                transition={{ duration: 0.24, ease: 'easeOut' }}
              >
                <div className="row row-cols-2 ul-team-row justify-content-center epl-team-grid">
                  {members.map((member) => (
                    <div className="col" key={member.id}>
                      <ChariticsTeamCard
                        isActive={member.id === selectedId}
                        member={member}
                        onOpen={(item) => openMember(item)}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <EplStickyBottomTabs
        activeId={activeTab}
        ariaLabel="Team groups"
        className="epl-bottom-tabs--team"
        hidden={isDrawerOpen}
        onChange={(id) => {
          setActiveTab(id as TeamTab)
          closePanel()
        }}
        panelIdPrefix="epl-team-panel-"
        tabs={tabs}
      />

      {mounted && typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence mode="wait" onExitComplete={clearSelection}>
              {isDrawerOpen && selected ? (
                <TeamMemberDrawer
                  activeTabLabel={activeTabMeta.label}
                  key="epl-team-drawer"
                  member={selected}
                  memberIndex={selectedIndex}
                  memberTotal={members.length}
                  onClose={closePanel}
                  onNext={() => goToMember(1)}
                  onPrev={() => goToMember(-1)}
                  slideDirection={slideDirection}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  )
}
