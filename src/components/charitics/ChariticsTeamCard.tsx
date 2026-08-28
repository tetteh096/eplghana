import type { TeamMember } from '@/config/teamPageContent'

type Social = {
  href: string
  icon: string
  label: string
}

/** Build the social list in a fixed visual order, keeping only what's set. */
function buildSocials(member: TeamMember): Social[] {
  const links: Array<Social | null> = [
    member.facebook
      ? { href: member.facebook, icon: 'flaticon-facebook', label: 'Facebook' }
      : null,
    member.twitter
      ? { href: member.twitter, icon: 'flaticon-twitter', label: 'X (Twitter)' }
      : null,
    member.linkedin
      ? { href: member.linkedin, icon: 'flaticon-linkedin-big-logo', label: 'LinkedIn' }
      : null,
    member.instagram
      ? { href: member.instagram, icon: 'flaticon-instagram', label: 'Instagram' }
      : null,
    member.email
      ? { href: `mailto:${member.email}`, icon: 'flaticon-email', label: 'Email' }
      : null,
  ]

  return links.filter((link): link is Social => link !== null)
}

type ChariticsTeamCardProps = {
  isActive?: boolean
  member: TeamMember
  onOpen?: (member: TeamMember) => void
}

export function ChariticsTeamCard({ isActive = false, member, onOpen }: ChariticsTeamCardProps) {
  const socials = buildSocials(member)

  return (
    <article className={`epl-team-card${isActive ? ' is-active' : ''}`}>
      <button
        aria-label={`View ${member.name}'s profile`}
        className="epl-team-card-photo"
        onClick={() => onOpen?.(member)}
        type="button"
      >
        <img alt={member.name} src={member.photo} />
        <span className="epl-team-card-view">View profile</span>
      </button>

      <div className="epl-team-card-foot">
        <button className="epl-team-card-info" onClick={() => onOpen?.(member)} type="button">
          <h3 className="epl-team-card-name">{member.name}</h3>
          <span className="epl-team-card-role">{member.role}</span>
        </button>

        {socials.length > 0 ? (
          <div className="epl-team-card-share">
            <div className="epl-team-card-socials">
              {socials.map((social) => (
                <a
                  aria-label={`${member.name} on ${social.label}`}
                  className="epl-team-card-social"
                  href={social.href}
                  key={social.label}
                  rel="noreferrer"
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>

            <button
              aria-label={`Share ${member.name}'s profile links`}
              className="epl-team-card-share-toggle"
              type="button"
            >
              <svg
                aria-hidden
                fill="none"
                height="17"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="17"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </article>
  )
}
