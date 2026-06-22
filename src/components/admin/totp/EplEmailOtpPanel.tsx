'use client'

import { toast } from '@payloadcms/ui'
import { useCallback, useEffect, useRef, useState } from 'react'

import { EplOtpInput } from './EplOtpInput'
import { useEplEmailOtpVerify } from './useEplEmailOtpVerify'

type Props = {
  apiRoute: string
  autoSend?: boolean
  email?: string
  redirectTo: string
  serverURL: string
  setup?: boolean
}

function MailIcon() {
  return (
    <svg aria-hidden fill="none" height="22" viewBox="0 0 24 24" width="22">
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m5 7.5 7 5.5 7-5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

/**
 * Always-visible email MFA card. Sits beside the authenticator option so users
 * can pick either method without one hiding the other.
 */
export function EplEmailOtpPanel({
  apiRoute,
  autoSend = false,
  email,
  redirectTo,
  serverURL,
  setup = false,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const autoSentRef = useRef(false)
  const [sending, setSending] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const { resetKey, status, submit } = useEplEmailOtpVerify({
    apiRoute,
    redirectTo,
    serverURL,
    setup,
  })

  const sendCode = useCallback(async () => {
    if (sending) return
    setSending(true)

    try {
      const res = await fetch(`${serverURL}${apiRoute}/send-email-otp`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
      })
      const data = (await res.json()) as { maskedEmail?: string; message?: string; ok: boolean }

      if (!data.ok) {
        toast.error(data.message || 'Could not send the email code.')
        return
      }

      setSentTo(data.maskedEmail || email || 'your email')
      toast.success(`Code sent to ${data.maskedEmail || email || 'your email'}`)
    } catch {
      toast.error('Could not send the email code. Try again.')
    } finally {
      setSending(false)
    }
  }, [apiRoute, email, sending, serverURL])

  useEffect(() => {
    if (!autoSend || autoSentRef.current) return
    autoSentRef.current = true
    void sendCode()
  }, [autoSend, sendCode])

  const submitWhenComplete = useCallback(() => {
    if (!formRef.current || status === 'pending' || status === 'success') return
    formRef.current.requestSubmit()
  }, [status])

  const codeReady = Boolean(sentTo)
  const inputLocked = !codeReady || status === 'pending' || status === 'success'

  return (
    <section aria-labelledby="epl-mfa-email-title" className="epl-totp__method-card epl-totp__method-card--email">
      <div className="epl-totp__method-head">
        <span className="epl-totp__method-icon epl-totp__method-icon--email" aria-hidden>
          <MailIcon />
        </span>
        <div className="epl-totp__method-copy">
          <h2 className="epl-totp__method-title" id="epl-mfa-email-title">
            Email code
          </h2>
          <p className="epl-totp__method-desc">
            {setup
              ? 'No phone handy? Finish setup with a code we send to your inbox.'
              : 'Prefer email? We can send a one-time code to your inbox instead.'}
          </p>
        </div>
      </div>

      {email ? (
        <p className="epl-totp__method-meta">
          {sentTo ? (
            <>
              <span className="epl-totp__method-meta-label">Sent to</span> {sentTo}
            </>
          ) : (
            <>
              <span className="epl-totp__method-meta-label">Will send to</span> {email}
            </>
          )}
        </p>
      ) : null}

      <button
        className="epl-totp__email-cta"
        disabled={sending}
        onClick={() => void sendCode()}
        type="button"
      >
        {sending ? 'Sending code…' : sentTo ? 'Resend email code' : 'Send code to my email'}
      </button>

      <form className="epl-totp__form" onSubmit={submit} ref={formRef}>
        <EplOtpInput
          disabled={inputLocked}
          hint={
            codeReady
              ? 'Enter the 6-digit code from your email. Codes expire after 10 minutes.'
              : 'Tap the button above first — your code entry box will unlock when the email is sent.'
          }
          hintMode="email"
          label="Email code"
          length={6}
          name="token"
          onComplete={submitWhenComplete}
          resetKey={resetKey}
          status={status}
        />
      </form>
    </section>
  )
}
