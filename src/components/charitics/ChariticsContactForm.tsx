'use client'

import { type FormEvent, useState } from 'react'

type ChariticsContactFormProps = {
  description?: string
  formId: string
  submitLabel: string
  variant: 'general' | 'partnership' | 'register-interest'
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
}: ChariticsContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

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

  return (
    <form className="ul-contact-form ul-form epl-contact-form" onSubmit={handleSubmit}>
      {description ? <p className="epl-contact-form-lead">{description}</p> : null}

      {status === 'success' ? (
        <p className="epl-form-feedback epl-form-feedback--success" role="status">
          Thank you. Your message has been received. Our team will be in touch soon.
        </p>
      ) : null}

      {status === 'error' ? (
        <p className="epl-form-feedback epl-form-feedback--error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="epl-contact-form-honeypot" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input autoComplete="off" id={`${formId}-company`} name="company" tabIndex={-1} type="text" />
      </div>

      <div className="row row-cols-2 row-cols-xxs-1 ul-bs-row">
        {variant === 'register-interest' ? (
          <>
            <div className="col">
              <div className="form-group">
                <label className="visually-hidden" htmlFor={`${formId}-first-name`}>
                  First name
                </label>
                <input
                  disabled={status === 'submitting'}
                  id={`${formId}-first-name`}
                  name="firstName"
                  placeholder="First Name *"
                  required
                  type="text"
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="visually-hidden" htmlFor={`${formId}-last-name`}>
                  Last name
                </label>
                <input
                  disabled={status === 'submitting'}
                  id={`${formId}-last-name`}
                  name="lastName"
                  placeholder="Last Name *"
                  required
                  type="text"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="col-12">
            <div className="form-group">
              <label className="visually-hidden" htmlFor={`${formId}-name`}>
                Your name
              </label>
              <input
                disabled={status === 'submitting'}
                id={`${formId}-name`}
                name="name"
                placeholder="Your Name *"
                required
                type="text"
              />
            </div>
          </div>
        )}

        <div className="col">
          <div className="form-group">
            <label className="visually-hidden" htmlFor={`${formId}-email`}>
              Email address
            </label>
            <input
              disabled={status === 'submitting'}
              id={`${formId}-email`}
              name="email"
              placeholder="Email Address *"
              required
              type="email"
            />
          </div>
        </div>

        <div className="col">
          <div className="form-group">
            <label className="visually-hidden" htmlFor={`${formId}-phone`}>
              Phone number
            </label>
            <input
              disabled={status === 'submitting'}
              id={`${formId}-phone`}
              name="phone"
              placeholder="Phone Number"
              type="tel"
            />
          </div>
        </div>

        {variant === 'register-interest' ? (
          <div className="col-12">
            <div className="form-group">
              <label className="visually-hidden" htmlFor={`${formId}-institution`}>
                Institution or organisation
              </label>
              <input
                disabled={status === 'submitting'}
                id={`${formId}-institution`}
                name="institution"
                placeholder="Institution / Organisation"
                type="text"
              />
            </div>
          </div>
        ) : null}

        {variant === 'partnership' ? (
          <div className="col-12">
            <div className="form-group">
              <label className="visually-hidden" htmlFor={`${formId}-subject`}>
                Subject
              </label>
              <select
                defaultValue=""
                disabled={status === 'submitting'}
                id={`${formId}-subject`}
                name="subject"
                required
              >
                <option disabled value="">
                  Subject *
                </option>
                {partnershipOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : variant === 'general' ? (
          <div className="col-12">
            <div className="form-group">
              <label className="visually-hidden" htmlFor={`${formId}-subject`}>
                Subject
              </label>
              <input
                disabled={status === 'submitting'}
                id={`${formId}-subject`}
                name="subject"
                placeholder="Subject *"
                required
                type="text"
              />
            </div>
          </div>
        ) : null}

        <div className="col-12">
          <div className="form-group">
            <label className="visually-hidden" htmlFor={`${formId}-message`}>
              Message
            </label>
            <textarea
              disabled={status === 'submitting'}
              id={`${formId}-message`}
              name="message"
              placeholder={
                variant === 'register-interest'
                  ? 'Why are you interested in the Public Service Fellowship? *'
                  : variant === 'partnership'
                    ? 'Tell us how you would like to partner or support EPL Ghana *'
                    : 'Type your message *'
              }
              required
            />
          </div>
        </div>

        <div className="col-12">
          <button className="ul-btn" disabled={status === 'submitting'} type="submit">
            <i className="flaticon-fast-forward-double-right-arrows-symbol"></i>{' '}
            {status === 'submitting' ? 'Sending…' : submitLabel}
          </button>
        </div>
      </div>
    </form>
  )
}
