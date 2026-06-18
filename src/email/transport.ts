import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'

import { CMS_PRODUCT_NAME } from '@/config/brand'

export type EmailProvider = 'resend' | 'smtp'

/** Shared default "from" for Payload adapter + app emails. */
export function getDefaultFromAddress(): string {
  return (
    process.env.EMAIL_FROM ||
    process.env.SMTP_FROM ||
    process.env.SMTP_USER ||
    'noreply@notifymes.app'
  )
}

export function getDefaultFromName(): string {
  return process.env.EMAIL_FROM_NAME || process.env.SMTP_FROM_NAME || CMS_PRODUCT_NAME
}

function resolveProvider(): EmailProvider | null {
  const explicit = process.env.EMAIL_PROVIDER?.toLowerCase()
  if (explicit === 'resend' || explicit === 'smtp') return explicit
  if (process.env.RESEND_API_KEY) return 'resend'
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) return 'smtp'
  return null
}

/**
 * Payload email adapter — Resend (HTTP) or SMTP (Office 365 / Gmail).
 *
 * Pick explicitly with EMAIL_PROVIDER=resend|smtp, or auto-detect:
 * RESEND_API_KEY → Resend, else SMTP_* → nodemailer, else console-only.
 *
 * Resend (testing / serverless):
 *   EMAIL_PROVIDER=resend
 *   RESEND_API_KEY=re_...
 *   EMAIL_FROM=noreply@notifymes.app
 *   EMAIL_FROM_NAME=EPL Ghana CMS
 *
 * SMTP (production @eplghana.org when ready):
 *   EMAIL_PROVIDER=smtp
 *   SMTP_HOST=smtp.office365.com
 *   SMTP_PORT=587
 *   SMTP_SECURE=false
 *   SMTP_USER=info@eplghana.org
 *   SMTP_PASS=...
 */
export function getEmailAdapter() {
  const provider = resolveProvider()
  const defaultFromAddress = getDefaultFromAddress()
  const defaultFromName = getDefaultFromName()

  if (provider === 'resend') {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) return undefined

    return resendAdapter({
      apiKey,
      defaultFromAddress,
      defaultFromName,
    })
  }

  if (provider === 'smtp') {
    const host = process.env.SMTP_HOST
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    if (!host || !user || !pass) return undefined

    return nodemailerAdapter({
      defaultFromAddress: process.env.SMTP_FROM || user,
      defaultFromName,
      transportOptions: {
        auth: { pass, user },
        host,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
      },
    })
  }

  return undefined
}
