import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { updateFormSubmissionPaymentStatus } from '@/lib/recordFormSubmission'
import { getClientIp, rateLimit } from '@/lib/rateLimit'

const STATUS_LIMIT = 20
const STATUS_WINDOW_MS = 15 * 60 * 1000

type StatusBody = {
  reference?: string
  status?: 'cancelled' | 'failed'
  detail?: string
}

function clean(value: unknown, max = 240): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const limit = rateLimit(`paystack-status:${ip}`, STATUS_LIMIT, STATUS_WINDOW_MS)
  if (!limit.allowed) {
    return Response.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSeconds) },
      },
    )
  }

  let body: StatusBody
  try {
    body = (await request.json()) as StatusBody
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const reference = clean(body.reference, 120)
  const status = body.status === 'failed' ? 'failed' : 'cancelled'
  const detail = clean(body.detail, 500)

  if (!reference) {
    return Response.json({ error: 'Payment reference is required.' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })
  const updated = await updateFormSubmissionPaymentStatus(payload, reference, {
    paymentStatus: status,
    message: [
      status === 'failed' ? 'Paystack payment failed.' : 'Paystack checkout was cancelled.',
      detail ? `Detail: ${detail}` : null,
      `Reference: ${reference}`,
    ]
      .filter(Boolean)
      .join('\n'),
  })

  return Response.json({ ok: true, updated })
}
