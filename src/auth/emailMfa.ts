import { createHash, randomInt } from 'node:crypto'

import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import type { Auth, Payload, PayloadRequest, User } from 'payload'
import { getCookieExpiration } from 'payload'

import { sendAppEmail } from '@/email/sendAppEmail'
import { mfaOtpEmailHTML } from '@/email/templates'
import { CMS_PRODUCT_NAME } from '@/config/brand'

import { EMAIL_MFA_SENTINEL, maskEmail, type MfaMethod } from './emailMfaShared'

export { EMAIL_MFA_SENTINEL, isEmailMfaUser, maskEmail, MFA_METHODS, type MfaMethod } from './emailMfaShared'

const OTP_LENGTH = 6
const OTP_TTL_MS = 10 * 60 * 1000
const RESEND_COOLDOWN_MS = 60 * 1000
const MAX_ATTEMPTS = 5

type EmailOtpUser = User & {
  email?: string
  emailOtpAttempts?: number | null
  emailOtpExpiresAt?: string | null
  emailOtpHash?: string | null
  emailOtpSentAt?: string | null
  mfaMethod?: MfaMethod | null
  totpSecret?: string | null
}

function hashOtp(code: string, secret: string): string {
  return createHash('sha256').update(`${secret}:${code}`).digest('hex')
}

function generateOtpCode(): string {
  const max = 10 ** OTP_LENGTH
  return randomInt(0, max).toString().padStart(OTP_LENGTH, '0')
}

function jsonError(message: string, status = 400): Response {
  return Response.json({ message, ok: false }, { status })
}

function emailNotConfigured(): boolean {
  return !process.env.RESEND_API_KEY && !(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

async function setTotpVerifiedCookie(req: PayloadRequest, user: EmailOtpUser): Promise<void> {
  const userSlug = req.payload.config.admin.user
  const collection = req.payload.collections[userSlug as 'users']
  const authConfig = (
    typeof collection.config.auth === 'object' ? collection.config.auth : {}
  ) as Auth
  const token = jwt.sign(
    {
      originalStrategy: user._strategy,
      userId: user.id,
    },
    req.payload.secret,
    {
      expiresIn: authConfig.tokenExpiration || 7200,
    },
  )

  const sameSite =
    typeof authConfig.cookies?.sameSite === 'string'
      ? authConfig.cookies.sameSite.toLowerCase()
      : authConfig.cookies?.sameSite
        ? 'strict'
        : undefined

  const cookieStore = await cookies()
  cookieStore.set(`${req.payload.config.cookiePrefix}-totp`, token, {
    domain: authConfig.cookies?.domain ?? undefined,
    expires: getCookieExpiration({
      seconds: authConfig.tokenExpiration || 7200,
    }),
    httpOnly: true,
    path: '/',
    sameSite: sameSite as 'lax' | 'strict' | 'none' | undefined,
    secure: authConfig.cookies?.secure,
  })
}

async function clearEmailOtpFields(payload: Payload, userId: string): Promise<void> {
  await payload.update({
    id: userId,
    collection: 'users',
    data: {
      emailOtpAttempts: 0,
      emailOtpExpiresAt: null,
      emailOtpHash: null,
      emailOtpSentAt: null,
    },
    overrideAccess: true,
  })
}

export async function sendEmailOtpHandler(req: PayloadRequest): Promise<Response> {
  const { payload, user } = req

  if (!user) {
    return jsonError('You must be signed in to request a code.', 401)
  }

  const emailUser = user as EmailOtpUser

  if (!emailUser.email) {
    return jsonError('Your account does not have an email address.')
  }

  if (emailNotConfigured()) {
    return jsonError(
      'Email is not configured on this server. Ask an administrator to set up RESEND_API_KEY or SMTP.',
      503,
    )
  }

  const sentAt = emailUser.emailOtpSentAt ? new Date(emailUser.emailOtpSentAt).getTime() : 0
  if (sentAt && Date.now() - sentAt < RESEND_COOLDOWN_MS) {
    const waitSeconds = Math.ceil((RESEND_COOLDOWN_MS - (Date.now() - sentAt)) / 1000)
    return jsonError(`Please wait ${waitSeconds}s before requesting another code.`)
  }

  const code = generateOtpCode()
  const expiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString()

  await payload.update({
    id: user.id,
    collection: 'users',
    data: {
      emailOtpAttempts: 0,
      emailOtpExpiresAt: expiresAt,
      emailOtpHash: hashOtp(code, payload.secret),
      emailOtpSentAt: new Date().toISOString(),
    },
    overrideAccess: true,
  })

  try {
    await sendAppEmail(payload, {
      to: emailUser.email,
      subject: `Your ${CMS_PRODUCT_NAME} sign-in code`,
      html: mfaOtpEmailHTML(code, emailUser.name ?? undefined),
    })
  } catch (error) {
    payload.logger.error(`[email-mfa] failed to send OTP: ${error}`)
    await clearEmailOtpFields(payload, user.id)
    return jsonError('Could not send the email. Try again in a moment.', 503)
  }

  return Response.json({
    maskedEmail: maskEmail(emailUser.email),
    ok: true,
  })
}

export async function verifyEmailOtpHandler(req: PayloadRequest): Promise<Response> {
  const { payload, user } = req

  if (!user) {
    return jsonError('You must be signed in to verify a code.', 401)
  }

  let data: { setup?: boolean; token?: string } | undefined
  try {
    data = req.json ? await req.json() : undefined
  } catch {
  }

  if (typeof data?.token !== 'string' || !/^\d{6}$/.test(data.token)) {
    return jsonError('Enter the 6-digit code from your email.')
  }

  const setup = data.setup === true
  const emailUser = user as EmailOtpUser

  if (setup) {
    if (emailUser.totpSecret && emailUser.totpSecret !== EMAIL_MFA_SENTINEL) {
      return jsonError('Two-factor authentication is already set up on this account.')
    }
  } else if (!emailUser.totpSecret) {
    return jsonError('Two-factor authentication is not set up yet.')
  }

  const freshUser = (await payload.findByID({
    id: user.id,
    collection: 'users',
    depth: 0,
    overrideAccess: true,
  })) as EmailOtpUser

  if (!freshUser.emailOtpHash || !freshUser.emailOtpExpiresAt) {
    return jsonError('No code is active. Request a new code by email first.')
  }

  if (new Date(freshUser.emailOtpExpiresAt).getTime() < Date.now()) {
    await clearEmailOtpFields(payload, user.id)
    return jsonError('That code has expired. Request a new one.')
  }

  const attempts = freshUser.emailOtpAttempts ?? 0
  if (attempts >= MAX_ATTEMPTS) {
    await clearEmailOtpFields(payload, user.id)
    return jsonError('Too many incorrect attempts. Request a new code.')
  }

  const expected = hashOtp(data.token, payload.secret)
  if (expected !== freshUser.emailOtpHash) {
    await payload.update({
      id: user.id,
      collection: 'users',
      data: {
        emailOtpAttempts: attempts + 1,
      },
      overrideAccess: true,
    })
    return jsonError('Incorrect code. Check your email and try again.')
  }

  if (setup) {
    await payload.update({
      id: user.id,
      collection: 'users',
      data: {
        emailOtpAttempts: 0,
        emailOtpExpiresAt: null,
        emailOtpHash: null,
        emailOtpSentAt: null,
        mfaMethod: 'email',
        totpSecret: EMAIL_MFA_SENTINEL,
      },
      overrideAccess: true,
    })
  } else {
    await clearEmailOtpFields(payload, user.id)
  }

  await setTotpVerifiedCookie(req, user as EmailOtpUser)

  return Response.json({ ok: true })
}
