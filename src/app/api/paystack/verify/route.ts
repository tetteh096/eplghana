import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { sendFormSubmissionEmails } from '@/email/notifications'
import {
  formatPaymentAmount,
  findFormSubmissionByPaymentReference,
  updateFormSubmissionPaymentStatus,
} from '@/lib/recordFormSubmission'
import { isPaystackConfigured, verifyPaystackTransaction } from '@/lib/paystack'
import { getClientIp, rateLimit } from '@/lib/rateLimit'

const VERIFY_LIMIT = 20
const VERIFY_WINDOW_MS = 15 * 60 * 1000

type VerifyBody = {
  reference?: string
}

function clean(value: unknown, max = 120): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  if (!isPaystackConfigured()) {
    return Response.json({ error: 'Paystack is not configured.' }, { status: 503 })
  }

  const ip = getClientIp(request)
  const limit = rateLimit(`paystack-verify:${ip}`, VERIFY_LIMIT, VERIFY_WINDOW_MS)
  if (!limit.allowed) {
    return Response.json(
      { error: 'Too many verification attempts. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSeconds) },
      },
    )
  }

  let body: VerifyBody
  try {
    body = (await request.json()) as VerifyBody
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const reference = clean(body.reference, 120)
  if (!reference) {
    return Response.json({ error: 'Payment reference is required.' }, { status: 400 })
  }

  try {
    const transaction = await verifyPaystackTransaction(reference)

    if (transaction.status !== 'success') {
      return Response.json({ error: 'Payment was not successful.' }, { status: 400 })
    }

    const email = transaction.customer?.email?.trim() || 'donor@unknown'
    const donorName =
      [transaction.customer?.first_name, transaction.customer?.last_name]
        .filter(Boolean)
        .join(' ')
        .trim() ||
      (typeof transaction.metadata?.donor_name === 'string'
        ? transaction.metadata.donor_name
        : 'Online donor')

    const amount = transaction.amount ?? 0
    const currency = transaction.currency ?? 'GHS'
    const tierLabel =
      typeof transaction.metadata?.tier_label === 'string' ? transaction.metadata.tier_label : ''
    const sourcePage =
      typeof transaction.metadata?.source_page === 'string'
        ? transaction.metadata.source_page
        : 'Donate page — Card payment (Paystack)'
    const sourcePath =
      typeof transaction.metadata?.source_path === 'string' ? transaction.metadata.source_path : '/donate'

    const message = [
      `Paystack payment completed successfully.`,
      `Amount paid: ${formatPaymentAmount(amount, currency)}`,
      tierLabel ? `Tier: ${tierLabel}` : null,
      `Reference: ${reference}`,
      transaction.paid_at ? `Paid at: ${transaction.paid_at}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    const payload = await getPayload({ config: configPromise })
    const existing = await findFormSubmissionByPaymentReference(payload, reference)
    const wasCompleted = existing?.paymentStatus === 'completed'

    if (existing) {
      await updateFormSubmissionPaymentStatus(payload, reference, {
        paymentStatus: 'completed',
        subject: `Paid — ${formatPaymentAmount(amount, currency)}`,
        message,
      })
    } else {
      await payload.create({
        collection: 'form-submissions',
        data: {
          formType: 'online-donation',
          fullName: donorName,
          email,
          subject: `Paid — ${formatPaymentAmount(amount, currency)}`,
          paymentReference: reference,
          paymentStatus: 'completed',
          sourcePage,
          sourcePath,
          message,
          status: 'new',
        },
        overrideAccess: true,
      })
    }

    if (!wasCompleted) {
      await sendFormSubmissionEmails(payload, {
        formType: 'online-donation',
        fullName: donorName,
        email,
        subject: `Online donation — ${formatPaymentAmount(amount, currency)}`,
        message,
        sourcePage,
        sourcePath,
      })
    }

    return Response.json({
      success: true,
      reference,
      amount,
      currency,
      paidAt: transaction.paid_at ?? null,
    })
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : 'Could not verify payment. Please contact support.',
      },
      { status: 502 },
    )
  }
}
