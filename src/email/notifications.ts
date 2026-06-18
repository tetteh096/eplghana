import type { Payload } from 'payload'

import { CMS_PRODUCT_NAME } from '@/config/brand'
import { formSubmissionTypes } from '@/collections/FormSubmissions'
import type { FormSubmissionType } from '@/collections/FormSubmissions'

import { sendAppEmailSafe } from './sendAppEmail'
import {
  formSubmissionAutoReplyHTML,
  formSubmissionStaffEmailHTML,
  type FormSubmissionEmailData,
  welcomeUserEmailHTML,
} from './templates'

/** Where staff notification emails are sent (forms, etc.). */
export async function getStaffInboxEmail(payload: Payload): Promise<string> {
  if (process.env.EMAIL_NOTIFY_TO?.trim()) {
    return process.env.EMAIL_NOTIFY_TO.trim()
  }

  try {
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    const email = settings?.email
    if (typeof email === 'string' && email.trim()) {
      return email.trim()
    }
  } catch {
    // fall through
  }

  return 'info@eplghana.org'
}

export function getFormTypeLabel(formType: FormSubmissionType): string {
  return formSubmissionTypes.find((t) => t.value === formType)?.label ?? formType
}

export async function sendWelcomeUserEmail(
  payload: Payload,
  user: { email: string; name?: string | null },
): Promise<void> {
  await sendAppEmailSafe(
    payload,
    {
      to: user.email,
      subject: `Your ${CMS_PRODUCT_NAME} account`,
      html: welcomeUserEmailHTML(user.name ?? undefined),
    },
    'welcome-user',
  )
}

export async function sendFormSubmissionEmails(
  payload: Payload,
  data: Omit<FormSubmissionEmailData, 'formTypeLabel'> & { formType: FormSubmissionType },
): Promise<void> {
  const formTypeLabel = getFormTypeLabel(data.formType)
  const staffInbox = await getStaffInboxEmail(payload)
  const { formType: _formType, ...rest } = data

  await Promise.all([
    sendAppEmailSafe(
      payload,
      {
        to: staffInbox,
        replyTo: data.email,
        subject: `[EPL Website] ${formTypeLabel} — ${data.fullName}`,
        html: formSubmissionStaffEmailHTML({ ...rest, formTypeLabel }),
      },
      'form-staff',
    ),
    sendAppEmailSafe(
      payload,
      {
        to: data.email,
        subject: `We received your message — EPL Ghana`,
        html: formSubmissionAutoReplyHTML(data.fullName, formTypeLabel),
      },
      'form-autoreply',
    ),
  ])
}
