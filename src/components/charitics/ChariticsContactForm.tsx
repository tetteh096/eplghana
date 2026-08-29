'use client'

import { type FormEvent, useState } from 'react'

type ChariticsContactFormProps = {
  description?: string
  formId: string
  submitLabel: string
  variant: 'general' | 'partnership' | 'register-interest' | 'inquiry'
  sourcePage: string
  sourcePath: string
  /** Light form on white panel (partners page). Default dark for partnership on Contact. */
  tone?: 'dark' | 'light'
  /** Organisation type options for the partners page enquiry form. */
  orgTypeOptions?: string[]
  successTitle?: string
  successText?: string
  privacyHref?: string
  privacyLabel?: string
  hideDescription?: boolean
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
  inquiry: 'internship-volunteer',
} as const

export function ChariticsContactForm({
  variant,
  formId,
  submitLabel,
  description,
  tone,
  sourcePage,
  sourcePath,
  orgTypeOptions,
  successTitle,
  successText,
  privacyHref,
  privacyLabel,
  hideDescription,
}: ChariticsContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const isInquiry = variant === 'inquiry'
  const isDark = tone === 'light' ? false : variant === 'partnership'
  const isPartnersEnquiry = variant === 'partnership' && tone === 'light' && Boolean(orgTypeOptions?.length)

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
  const inputStyles = isInquiry
    ? 'w-full bg-white border border-gray-200 px-4 py-3 text-xs text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#4150A3] rounded-none'
    : isPartnersEnquiry
    ? 'w-full bg-white border border-gray-200 px-4 py-3 text-sm text-[#0C1427] placeholder:text-gray-400 focus:outline-none focus:border-[#4150A3] rounded-none'
    : isDark
    ? 'w-full bg-white border border-white/30 px-4 py-3 text-sm text-[#0C1427] placeholder:text-[#6b7280] focus:outline-none focus:border-[var(--epl-new-gold,#f5bd17)] rounded-none'
    : 'w-full bg-[#F8F9FA] border border-[#e2e5eb] px-4 py-3 text-sm text-[#0C1427] placeholder:text-[#9aa0ab] focus:outline-none focus:border-[var(--epl-new-gold,#f5bd17)] focus:bg-white rounded-none'

  const labelStyles = isInquiry
    ? 'block text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-1.5'
    : isDark
    ? 'block text-[11px] font-extrabold text-white/80 uppercase tracking-[0.08em] mb-2'
    : isPartnersEnquiry
      ? 'block text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2'
      : 'block text-[11px] font-extrabold text-[#0C1427] uppercase tracking-[0.08em] mb-2'

  const selectStyles = isPartnersEnquiry
    ? inputStyles
    : isDark
    ? 'w-full bg-white border border-white/30 px-4 py-3 text-sm text-[#0C1427] focus:outline-none focus:border-[var(--epl-new-gold,#f5bd17)] rounded-none'
    : inputStyles

  return (
    <form className={`epl-contact-form ${isInquiry ? 'figma-contact-form' : 'space-y-5'}`} onSubmit={handleSubmit}>
      {description && !hideDescription ? (
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
        isInquiry ? (
          <div className="figma-contact-form__success" role="status">
            <div className="figma-contact-form__success-icon">✓</div>
            <h4>{successTitle ?? 'Thank You for Contacting Us'}</h4>
            <p>{successText ?? 'Your message has been received. Our team will be in touch soon.'}</p>
            <button
              className="figma-contact-form__success-reset"
              onClick={() => setStatus('idle')}
              type="button"
            >
              Send Another Message
            </button>
          </div>
        ) : (
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
        )
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

      <div className={`grid grid-cols-1 ${isInquiry ? 'sm:grid-cols-2 gap-5' : 'sm:grid-cols-2 gap-5'}`}>
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
        ) : isPartnersEnquiry ? (
          <>
            <div>
              <label className={labelStyles} htmlFor={`${formId}-name`}>
                Name
              </label>
              <input
                className={inputStyles}
                disabled={status === 'submitting'}
                id={`${formId}-name`}
                name="name"
                placeholder="Your full name"
                required
                type="text"
              />
            </div>
            <div>
              <label className={labelStyles} htmlFor={`${formId}-institution`}>
                Organisation
              </label>
              <input
                className={inputStyles}
                disabled={status === 'submitting'}
                id={`${formId}-institution`}
                name="institution"
                placeholder="Organisation name"
                type="text"
              />
            </div>
          </>
        ) : isInquiry ? (
          <>
            <div>
              <label className={labelStyles} htmlFor={`${formId}-name`}>
                Full Name
              </label>
              <input
                className={inputStyles}
                disabled={status === 'submitting'}
                id={`${formId}-name`}
                name="name"
                placeholder="e.g. Kwame Mensah"
                required
                type="text"
              />
            </div>
            <div>
              <label className={labelStyles} htmlFor={`${formId}-email`}>
                Email Address
              </label>
              <input
                className={inputStyles}
                disabled={status === 'submitting'}
                id={`${formId}-email`}
                name="email"
                placeholder="you@domain.com"
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
            <div>
              <label className={labelStyles} htmlFor={`${formId}-subject`}>
                Subject / Topic
              </label>
              <input
                className={inputStyles}
                disabled={status === 'submitting'}
                id={`${formId}-subject`}
                name="subject"
                placeholder="e.g. Fellowship Enquiry / Media"
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

        {!isInquiry ? (
          <>
        <div>
          <label className={labelStyles} htmlFor={`${formId}-email`}>
            {isPartnersEnquiry ? 'Email' : 'Email Address *'}
          </label>
          <input
            className={inputStyles}
            disabled={status === 'submitting'}
            id={`${formId}-email`}
            name="email"
            placeholder={isPartnersEnquiry ? 'your@organisation.com' : 'name@organisation.org'}
            required
            type="email"
          />
        </div>

        <div>
          <label className={labelStyles} htmlFor={`${formId}-phone`}>
            Phone{isPartnersEnquiry ? '' : ' Number'}
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

        {isPartnersEnquiry ? (
          <div className="sm:col-span-2">
            <label className={labelStyles} htmlFor={`${formId}-subject`}>
              Organisation Type
            </label>
            <select
              className={selectStyles}
              defaultValue={orgTypeOptions?.[0] ?? ''}
              disabled={status === 'submitting'}
              id={`${formId}-subject`}
              name="subject"
              required
            >
              {orgTypeOptions?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {variant === 'partnership' && !isPartnersEnquiry ? (
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

          </>
        ) : null}

        <div className="sm:col-span-2">
          <label className={labelStyles} htmlFor={`${formId}-message`}>
            {isInquiry ? 'Your Message' : `Message${isPartnersEnquiry ? '' : ' *'}`}
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
                  ? 'Tell us about your interest in partnering with EPL...'
                  : isInquiry
                    ? 'How can we help you?'
                    : 'Type your message'
            }
            required
          />
        </div>

        <div className="sm:col-span-2 pt-1">
          <button
            className={
              isInquiry
                ? 'figma-contact-form__submit'
                : isPartnersEnquiry
                ? 'figma-partners-btn figma-partners-btn--primary w-full'
                : 'epl-new-btn epl-new-btn--gold w-full'
            }
            disabled={status === 'submitting'}
            style={isInquiry ? undefined : { width: '100%', minHeight: 52 }}
            type="submit"
          >
            {status === 'submitting' ? 'Sending…' : submitLabel}
          </button>
          {isInquiry && privacyHref && privacyLabel ? (
            <a className="figma-contact-form__privacy" href={privacyHref}>
              {privacyLabel}
              <span aria-hidden>→</span>
            </a>
          ) : null}
        </div>
      </div>
    </form>
  )
}
