/** Stored in totpSecret when the user uses email codes instead of an authenticator app. */
export const EMAIL_MFA_SENTINEL = 'EMAIL_MFA'

export const MFA_METHODS = ['authenticator', 'email'] as const
export type MfaMethod = (typeof MFA_METHODS)[number]

export function isEmailMfaUser(user: { mfaMethod?: string | null; totpSecret?: string | null }): boolean {
  return user.mfaMethod === 'email' || user.totpSecret === EMAIL_MFA_SENTINEL
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return email
  const visible = local.slice(0, Math.min(2, local.length))
  return `${visible}${'*'.repeat(Math.max(1, local.length - visible.length))}@${domain}`
}
