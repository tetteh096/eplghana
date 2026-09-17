import type { Payload } from 'payload'

import type { FormSubmissionType } from '@/collections/FormSubmissions'

export type PaymentStatus = 'none' | 'initiated' | 'completed' | 'cancelled' | 'failed'

export type RecordFormSubmissionInput = {
  formType: FormSubmissionType
  fullName: string
  email: string
  phone?: string
  institution?: string
  subject?: string
  message: string
  sourcePage: string
  sourcePath: string
  paymentReference?: string
  paymentStatus?: PaymentStatus
  status?: 'new' | 'reviewed' | 'archived'
}

export async function recordFormSubmission(
  payload: Payload,
  input: RecordFormSubmissionInput,
): Promise<string> {
  const doc = await payload.create({
    collection: 'form-submissions',
    data: {
      formType: input.formType,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone || undefined,
      institution: input.institution || undefined,
      subject: input.subject || undefined,
      message: input.message,
      sourcePage: input.sourcePage,
      sourcePath: input.sourcePath,
      paymentReference: input.paymentReference || undefined,
      paymentStatus: input.paymentStatus ?? 'none',
      status: input.status ?? 'new',
    },
    overrideAccess: true,
  })

  return String(doc.id)
}

export async function findFormSubmissionByPaymentReference(
  payload: Payload,
  paymentReference: string,
) {
  const result = await payload.find({
    collection: 'form-submissions',
    where: { paymentReference: { equals: paymentReference } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  return result.docs[0] ?? null
}

export async function updateFormSubmissionPaymentStatus(
  payload: Payload,
  paymentReference: string,
  updates: {
    paymentStatus: PaymentStatus
    message?: string
    subject?: string
  },
): Promise<boolean> {
  const existing = await findFormSubmissionByPaymentReference(payload, paymentReference)
  if (!existing) return false

  await payload.update({
    collection: 'form-submissions',
    id: existing.id,
    data: {
      paymentStatus: updates.paymentStatus,
      ...(updates.message ? { message: updates.message } : {}),
      ...(updates.subject ? { subject: updates.subject } : {}),
    },
    overrideAccess: true,
  })

  return true
}

export function formatPaymentAmount(amountMinor: number, currency: string): string {
  const major = amountMinor / 100
  return `${currency} ${major.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
