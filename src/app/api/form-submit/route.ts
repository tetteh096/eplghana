import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { FormSubmissionType } from '@/collections/FormSubmissions'
import { sendFormSubmissionEmails } from '@/email/notifications'
import { getClientIp, rateLimit } from '@/lib/rateLimit'

const FORM_SUBMIT_LIMIT = 5
const FORM_SUBMIT_WINDOW_MS = 15 * 60 * 1000

const FORM_TYPES = new Set<FormSubmissionType>([
  'register-interest',
  'internship-volunteer',
  'partnership',
])

type SubmitBody = {
  formType?: string
  firstName?: string
  lastName?: string
  name?: string
  email?: string
  phone?: string
  institution?: string
  subject?: string
  message?: string
  company?: string
}

function clean(value: unknown, max = 500): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const limit = rateLimit(`form-submit:${ip}`, FORM_SUBMIT_LIMIT, FORM_SUBMIT_WINDOW_MS)

  if (!limit.allowed) {
    return Response.json(
      { error: 'Too many submissions. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSeconds) },
      },
    )
  }

  let body: SubmitBody

  try {
    body = (await request.json()) as SubmitBody
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (clean(body.company)) {
    return Response.json({ ok: true })
  }

  const formType = clean(body.formType, 40) as FormSubmissionType
  if (!FORM_TYPES.has(formType)) {
    return Response.json({ error: 'Unknown form type.' }, { status: 400 })
  }

  const email = clean(body.email, 254)
  const message = clean(body.message, 5000)
  const phone = clean(body.phone, 40)
  const institution = clean(body.institution, 200)
  const subject = clean(body.subject, 200)

  if (!email || !isEmail(email)) {
    return Response.json({ error: 'A valid email address is required.' }, { status: 400 })
  }

  if (!message) {
    return Response.json({ error: 'Please enter a message.' }, { status: 400 })
  }

  let fullName = ''

  if (formType === 'register-interest') {
    const firstName = clean(body.firstName, 120)
    const lastName = clean(body.lastName, 120)
    if (!firstName || !lastName) {
      return Response.json({ error: 'First and last name are required.' }, { status: 400 })
    }
    fullName = `${firstName} ${lastName}`.trim()
  } else {
    fullName = clean(body.name, 240)
    if (!fullName) {
      return Response.json({ error: 'Your name is required.' }, { status: 400 })
    }
    if (formType === 'partnership' && !subject) {
      return Response.json({ error: 'Please choose a subject.' }, { status: 400 })
    }
    if (formType === 'internship-volunteer' && !subject) {
      return Response.json({ error: 'Please enter a subject.' }, { status: 400 })
    }
  }

  const payload = await getPayload({ config: configPromise })

  await payload.create({
    collection: 'form-submissions',
    data: {
      formType,
      fullName,
      email,
      phone: phone || undefined,
      institution: institution || undefined,
      subject: subject || undefined,
      message,
      status: 'new',
    },
    overrideAccess: true,
  })

  await sendFormSubmissionEmails(payload, {
    formType,
    fullName,
    email,
    phone: phone || undefined,
    institution: institution || undefined,
    subject: subject || undefined,
    message,
  })

  return Response.json({ ok: true })
}
