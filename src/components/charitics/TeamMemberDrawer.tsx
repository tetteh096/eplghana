'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { TeamMemberPhoto } from '@/components/charitics/TeamMemberPhoto'
import type { TeamMember } from '@/config/teamPageContent'

type TeamMemberDrawerProps = {
  activeTabLabel: string
  member: TeamMember
  memberIndex: number
  memberTotal: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  slideDirection: number
}

export function TeamMemberDrawer({
  activeTabLabel,
  member,
  memberIndex,
  memberTotal,
  onClose,
  onNext,
  onPrev,
  slideDirection,
}: TeamMemberDrawerProps) {
  const socials = [
    member.linkedin
      ? { href: member.linkedin, icon: 'flaticon-linkedin-big-logo', label: 'LinkedIn' }
      : null,
    member.twitter
      ? { href: member.twitter, icon: 'flaticon-twitter', label: 'X (Twitter)' }
      : null,
    member.facebook
      ? { href: member.facebook, icon: 'flaticon-facebook', label: 'Facebook' }
      : null,
    member.instagram
      ? { href: member.instagram, icon: 'flaticon-instagram', label: 'Instagram' }
      : null,
  ].filter(Boolean) as { href: string; icon: string; label: string }[]

  return (
    <div className="epl-team-drawer-root">
      <motion.button
        animate={{ opacity: 1 }}
        aria-label="Close profile"
        className="epl-team-drawer-backdrop"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        key="epl-team-drawer-backdrop"
        onClick={onClose}
        transition={{ duration: 0.28 }}
        type="button"
      />

      <motion.aside
        animate={{ x: 0 }}
        aria-labelledby="epl-team-drawer-name"
        aria-modal="true"
        className="epl-team-drawer"
        exit={{ x: '100%' }}
        initial={{ x: '100%' }}
        key="epl-team-drawer-panel"
        role="dialog"
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
      >
        <div className="epl-team-drawer-header">
          <span className="epl-team-drawer-meta">
            {activeTabLabel} · {memberIndex + 1} / {memberTotal}
          </span>
          <button
            aria-label="Close profile"
            className="epl-team-drawer-close"
            onClick={onClose}
            type="button"
          >
            <i className="flaticon-close"></i>
          </button>
        </div>

        <div className="epl-team-drawer-body">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="epl-team-drawer-content"
              exit={{ opacity: 0, x: slideDirection > 0 ? -56 : 56 }}
              initial={{ opacity: 0, x: slideDirection > 0 ? 56 : -56 }}
              key={member.id}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <div className="epl-team-drawer-photo epl-team-drawer-photo--portrait">
                <TeamMemberPhoto alt={member.name} src={member.photo} />
              </div>

              <span className="epl-team-drawer-eyebrow">{activeTabLabel}</span>
              <h2 className="epl-team-drawer-name" id="epl-team-drawer-name">
                {member.name}
              </h2>
              <p className="epl-team-drawer-role">{member.role}</p>
              {member.bio ? (
                <p className="epl-team-drawer-bio">{member.bio}</p>
              ) : (
                <p className="epl-team-drawer-bio epl-team-drawer-bio--empty">
                  Profile details for {member.name} will be published soon.
                </p>
              )}

              {socials.length > 0 ? (
                <div className="epl-team-drawer-socials">
                  <span className="epl-team-drawer-socials-label">Connect</span>
                  <div className="epl-team-drawer-socials-links">
                    {socials.map((social) => (
                      <a
                        aria-label={social.label}
                        href={social.href}
                        key={social.label}
                        rel="noreferrer"
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        title={social.label}
                      >
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {member.email || member.phone ? (
                <ul className="epl-team-drawer-contact">
                  {member.email ? (
                    <li>
                      <a href={`mailto:${member.email}`}>
                        <i className="flaticon-email"></i>
                        <span>{member.email}</span>
                      </a>
                    </li>
                  ) : null}
                  {member.phone ? (
                    <li>
                      <a href={`tel:${member.phone.replace(/\s/g, '')}`}>
                        <i className="flaticon-telephone-call"></i>
                        <span>{member.phone}</span>
                      </a>
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="epl-team-drawer-footer">
          <button
            aria-label="Previous team member"
            className="epl-team-drawer-nav-btn"
            onClick={onPrev}
            type="button"
          >
            <i className="flaticon-back"></i>
            <span>Previous</span>
          </button>
          <button
            aria-label="Next team member"
            className="epl-team-drawer-nav-btn"
            onClick={onNext}
            type="button"
          >
            <span>Next</span>
            <i className="flaticon-next"></i>
          </button>
        </div>
      </motion.aside>
    </div>
  )
}
