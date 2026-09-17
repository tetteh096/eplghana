type SocialIconProps = {
  className?: string
}

export function IconFacebook({ className }: SocialIconProps) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  )
}

export function IconInstagram({ className }: SocialIconProps) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
    </svg>
  )
}

export function IconX({ className }: SocialIconProps) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.9 2H22l-7.1 8.1L23 22h-6.5l-5.1-6.7L5.7 22H2.6l7.6-8.7L1 2h6.6l4.6 6.1L18.9 2zm-1.1 18h1.8L6.3 3.9H4.4L17.8 20z" />
    </svg>
  )
}

export function IconYoutube({ className }: SocialIconProps) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
    </svg>
  )
}

export function IconLinkedin({ className }: SocialIconProps) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.5 8.5H3.7V21h2.8V8.5zM5.1 3A1.8 1.8 0 1 0 5.1 6.6 1.8 1.8 0 0 0 5.1 3zM20.3 21h-2.8v-6.1c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V21h-2.8s0-10.4 0-11.5h2.8v1.6c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4.1V21z" />
    </svg>
  )
}

export function IconTikTok({ className }: SocialIconProps) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.6 8.2a6.7 6.7 0 0 1-3.9-1.2v7.1a5.9 5.9 0 1 1-5.1-5.8v2.5a3.4 3.4 0 1 0 2.6 3.3V2.5h2.4a4.3 4.3 0 0 0 4 4v1.7z" />
    </svg>
  )
}

export function IconMail({ className }: SocialIconProps) {
  return (
    <svg aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <rect height="14" rx="2" width="18" x="3" y="5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}
