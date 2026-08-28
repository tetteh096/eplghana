'use client'

import { type FormEvent, useState } from 'react'

type ChariticsContactFormProps = {
  description?: string
  formId: string
  submitLabel: string
  variant: 'general' | 'partnership' | 'register-interest'
  sourcePage: string
  sourcePath: string
  /** Light form on white panel (partners page). Default dark for partnership on Contact. */
  tone?: 'dark' | 'light'
}

const partnershipOptions = [
  { value: 'partnership', label: 'Partnership' },
  { value: 'support', label: 'Support us' },
  { value: 'fellowship', label: 'The Fellowship' },
  { value: 'internship', label: 'Internship or Volunteer' },
]

const formTypeByVariant = {
  'register-interest': 'register-interest',
  general: 'internship-volunteer',
  partnership: 'partnership',
} as const

export function ChariticsContactForm({
  variant,
  formId,
  submitLabel,
  description,
  tone,
  sourcePage,
  sourcePath,
}: ChariticsContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const isDark = tone === 'light' ? false : variant === 'partnership'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    setErrorMessage('')

    const form = event.currentTarget
    const data = new FormData(form)

    const payload = {
      formType: formTypeByVariant[variant],
      firstName: String(data.get('firstName') ?? ''),
      lastName: String(data.get('lastName') ?? ''),
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      institution: String(data.get('institution') ?? ''),
      subject: String(data.get('subject') ?? ''),
      message: String(data.get('message') ?? ''),
      company: String(data.get('company') ?? ''),
      sourcePage,
      sourcePath,
    }

    try {
      const response = await fetch('/api/form-submit', {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      const result = (await response.json().catch(() => ({}))) as { error?: string }

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.')
      }

      form.reset()
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
    }
  }

  // Dark panels use light fields + dark text so typing stays readable
  // (legacy .ul-contact-form CSS forced light backgrounds).
  const inputStyles = isDark
    ? 'w-full bg-white border border-white/30 px-4 py-3 text-sm text-[#0C1427] placeholder:text-[#6b7280] focus:outline-none focus:border-[var(--epl-new-gold,#f5bd17)] rounded-none'
    : 'w-full bg-[#F8F9FA] border border-[#e2e5eb] px-4 py-3 text-sm text-[#0C1427] placeholder:text-[#9aa0ab] focus:outline-none focus:border-[var(--epl-new-gold,#f5bd17)] focus:bg-white rounded-none'

  const labelStyles = isDark
    ? 'block text-[11px] font-extrabold text-white/80 uppercase tracking-[0.08em] mb-2'
    : 'block text-[11px] font-extrabold text-[#0C1427] uppercase tracking-[0.08em] mb-2'

  const selectStyles = isDark
    ? 'w-full bg-white border border-white/30 px-4 py-3 text-sm text-[#0C1427] focus:outline-none focus:border-[var(--epl-new-gold,#f5bd17)] rounded-none'
    : inputStyles

  return (
    <form className="epl-contact-form space-y-5" onSubmit={handleSubmit}>
      {description ? (
        <p
          className={
            isDark
              ? 'text-white/80 text-sm leading-relaxed mb-2'
              : 'text-[#636772] text-sm leading-relaxed mb-2'
          }
        >
          {description}
        </p>
      ) : null}

      {status === 'success' ? (
        <div
          className="border p-4 text-sm font-bold rounded-none"
          role="status"
          style={{
            background: 'rgba(245, 189, 23, 0.12)',
            borderColor: 'var(--epl-new-gold, #f5bd17)',
            color: '#0C1427',
          }}
        >
          Thank you. Your message has been received. Our team will be in touch soon.
        </div>
      ) : null}

      {status === 'error' ? (
        <div
          className="bg-rose-50 border border-rose-300 text-rose-900 p-4 text-sm font-bold rounded-none"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : null}

      <div className="epl-contact-form-honeypot hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input autoComplete="off" id={`${formId}-company`} name="company" tabIndex={-1} type="text" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {variant === 'register-interest' ? (
          <>
            <div>
              <label className={labelStyles} htmlFor={`${formId}-first-name`}>
                First Name *
              </label>
              <input
                className={inputStyles}
                disabled={status === 'submitting'}
                id={`${formId}-first-name`}
                name="firstName"
                placeholder="First name"
                required
                type="text"
              />
            </div>
            <div>
              <label className={labelStyles} htmlFor={`${formId}-last-name`}>
                Last Name *
              </label>
              <input
                className={inputStyles}
                disabled={status === 'submitting'}
                id={`${formId}-last-name`}
                name="lastName"
                placeholder="Last name"
                required
                type="text"
              />
            </div>
          </>
        ) : (
          <div className="sm:col-span-2">
            <label className={labelStyles} htmlFor={`${formId}-name`}>
              Your Name *
            </label>
            <input
              className={inputStyles}
              disabled={status === 'submitting'}
              id={`${formId}-name`}
              name="name"
              placeholder="Full name"
              required
              type="text"
            />
          </div>
        )}

        <div>
          <label className={labelStyles} htmlFor={`${formId}-email`}>
            Email Address *
          </label>
          <input
            className={inputStyles}
            disabled={status === 'submitting'}
            id={`${formId}-email`}
            name="email"
            placeholder="name@organisation.org"
            required
            type="email"
          />
        </div>

        <div>
          <label className={labelStyles} htmlFor={`${formId}-phone`}>
            Phone Number
          </label>
          <input
            className={inputStyles}
            disabled={status === 'submitting'}
            id={`${formId}-phone`}
            name="phone"
            placeholder="+233 ..."
            type="tel"
          />
        </div>

        {variant === 'register-interest' ? (
          <div className="sm:col-span-2">
            <label className={labelStyles} htmlFor={`${formId}-institution`}>
              Institution / Organisation
            </label>
            <input
              className={inputStyles}
              disabled={status === 'submitting'}
              id={`${formId}-institution`}
              name="institution"
              placeholder="Institution / Organisation"
              type="text"
            />
          </div>
        ) : null}

        {variant === 'partnership' ? (
          <div className="sm:col-span-2">
            <label className={labelStyles} htmlFor={`${formId}-subject`}>
              Subject *
            </label>
            <select
              className={selectStyles}
              defaultValue=""
              disabled={status === 'submitting'}
              id={`${formId}-subject`}
              name="subject"
              required
            >
              <option disabled value="">
                Select a subject
              </option>
              {partnershipOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : variant === 'general' ? (
          <div className="sm:col-span-2">
            <label className={labelStyles} htmlFor={`${formId}-subject`}>
              Subject *
            </label>
            <input
              className={inputStyles}
              disabled={status === 'submitting'}
              id={`${formId}-subject`}
              name="subject"
              placeholder="Subject"
              required
              type="text"
            />
          </div>
        ) : null}

        <div className="sm:col-span-2">
          <label className={labelStyles} htmlFor={`${formId}-message`}>
            Message *
          </label>
          <textarea
            className={`${inputStyles} min-h-[130px]`}
            disabled={status === 'submitting'}
            id={`${formId}-message`}
            name="message"
            placeholder={
              variant === 'register-interest'
                ? 'Why are you interested in the Public Service Fellowship?'
                : variant === 'partnership'
                  ? 'How would you like to partner with EPL Ghana?'
                  : 'Type your message'
            }
            required
          />
        </div>

        <div className="sm:col-span-2 pt-1">
          <button
            className="epl-new-btn epl-new-btn--gold w-full"
            disabled={status === 'submitting'}
            style={{ width: '100%', minHeight: 52 }}
            type="submit"
          >
            {status === 'submitting' ? 'Sending…' : submitLabel}
          </button>
        </div>
      </div>
    </form>
  )
}
