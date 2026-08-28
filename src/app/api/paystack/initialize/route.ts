import configPromise from '@payload-config'
import { getPayload } from 'payload'

import {
  formatPaymentAmount,
  recordFormSubmission,
  updateFormSubmissionPaymentStatus,
} from '@/lib/recordFormSubmission'
import {
  getDefaultPaystackCurrency,
  initializePaystackTransaction,
  isPaystackConfigured,
  type PaystackCurrency,
} from '@/lib/paystack'
import { resolveSourcePage, resolveSourcePath } from '@/lib/formSubmissionMeta'
import { getClientIp, rateLimit } from '@/lib/rateLimit'

const INIT_LIMIT = 10
const INIT_WINDOW_MS = 15 * 60 * 1000

type InitializeBody = {
  email?: string
  name?: string
  phone?: string
  amount?: number
  currency?: string
  tierLabel?: string
  sourcePage?: string
  sourcePath?: string
}

function clean(value: unknown, max = 240): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  if (!isPaystackConfigured()) {
    return Response.json(
      { error: 'Online card payments are not configured yet. Please use bank transfer or MoMo.' },
      { status: 503 },
    )
  }

  const ip = getClientIp(request)
  const limit = rateLimit(`paystack-init:${ip}`, INIT_LIMIT, INIT_WINDOW_MS)
  if (!limit.allowed) {
    return Response.json(
      { error: 'Too many payment attempts. Please wait a few minutes and try again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSeconds) },
      },
    )
  }

  let body: InitializeBody
  try {
    body = (await request.json()) as InitializeBody
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const email = clean(body.email, 254)
  const name = clean(body.name, 200)
  const phone = clean(body.phone, 40)
  const tierLabel = clean(body.tierLabel, 120)
  const currency = (clean(body.currency, 3).toUpperCase() || getDefaultPaystackCurrency()) as PaystackCurrency
  const amount = typeof body.amount === 'number' ? Math.round(body.amount) : 0
  const sourcePage = resolveSourcePage(
    body.sourcePage || 'Donate page — Card payment (Paystack)',
    body.sourcePath || '/donate',
  )
  const sourcePath = resolveSourcePath(body.sourcePath || '/donate')

  if (!email || !isEmail(email)) {
    return Response.json({ error: 'A valid email address is required.' }, { status: 400 })
  }

  if (!name) {
    return Response.json({ error: 'Your full name is required.' }, { status: 400 })
  }

  if (!amount || amount < 100) {
    return Response.json({ error: 'Please enter a valid donation amount.' }, { status: 400 })
  }

  if (currency !== 'GHS' && currency !== 'USD' && currency !== 'NGN') {
    return Response.json({ error: 'Unsupported currency.' }, { status: 400 })
  }

  try {
    const result = await initializePaystackTransaction({
      email,
      name,
      phone,
      amount,
      currency,
      metadata: {
        source: 'epl-donate-page',
        source_page: sourcePage,
        source_path: sourcePath,
        ...(tierLabel ? { tier_label: tierLabel } : {}),
      },
    })

    const payload = await getPayload({ config: configPromise })
    await recordFormSubmission(payload, {
      formType: 'online-donation',
      fullName: name,
      email,
      phone: phone || undefined,
      subject: `Paystack — ${result.reference}`,
      paymentReference: result.reference,
      paymentStatus: 'initiated',
      sourcePage,
      sourcePath,
      message: [
        `Payment started (not completed yet).`,
        `Amount: ${formatPaymentAmount(amount, currency)}`,
        tierLabel ? `Tier: ${tierLabel}` : null,
        `Reference: ${result.reference}`,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    return Response.json({
      accessCode: result.accessCode,
      reference: result.reference,
    })
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Could not start Paystack checkout. Please try again.',
      },
      { status: 502 },
    )
  }
}
