'use client'

import { toast } from '@payloadcms/ui'
import { useCallback, useEffect, useRef, useState } from 'react'

import { EplOtpInput } from './EplOtpInput'
import { useEplEmailOtpVerify } from './useEplEmailOtpVerify'

type Props = {
  apiRoute: string
  autoSend?: boolean
  defaultActive?: boolean
  email?: string
  redirectTo: string
  serverURL: string
  setup?: boolean
  showToggle?: boolean
}

export function EplEmailOtpPanel({
  apiRoute,
  autoSend = false,
  defaultActive = false,
  email,
  redirectTo,
  serverURL,
  setup = false,
  showToggle = true,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const autoSentRef = useRef(false)
  const [active, setActive] = useState(defaultActive)
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

      setActive(true)
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

  if (!active && showToggle) {
    return (
      <div className="epl-totp__email-option">
        <p className="epl-totp__email-lead">
          {setup
            ? "Don't have your phone handy?"
            : "Can't open your authenticator app?"}
        </p>
        <button
          className="epl-totp__email-toggle"
          disabled={sending}
          onClick={() => void sendCode()}
          type="button"
        >
          {sending ? 'Sending code…' : 'Send a code to my email instead'}
        </button>
      </div>
    )
  }

  return (
    <div className="epl-totp__email-panel">
      <div className="epl-totp__email-panel-head">
        <p className="epl-totp__email-lead">
          {setup ? 'Finish setup with email' : 'Sign in with email code'}
        </p>
        {sentTo ? (
          <p className="epl-totp__email-sent">Code sent to {sentTo}</p>
        ) : email ? (
          <p className="epl-totp__email-sent">We&apos;ll send a code to {email}</p>
        ) : null}
      </div>

      {!sentTo ? (
        <button
          className="epl-totp__email-send"
          disabled={sending}
          onClick={() => void sendCode()}
          type="button"
        >
          {sending ? 'Sending…' : 'Send code'}
        </button>
      ) : (
        <form className="epl-totp__form" onSubmit={submit} ref={formRef}>
          <EplOtpInput
            disabled={status === 'pending' || status === 'success'}
            hint="Enter the 6-digit code from your email. Codes expire after 10 minutes."
            hintMode="email"
            length={6}
            name="token"
            onComplete={submitWhenComplete}
            resetKey={resetKey}
            status={status}
          />
        </form>
      )}

      <button
        className="epl-totp__email-resend"
        disabled={sending}
        onClick={() => void sendCode()}
        type="button"
      >
        {sending ? 'Sending…' : 'Resend code'}
      </button>

      {showToggle ? (
        <button
          className="epl-totp__email-back"
          onClick={() => {
            setActive(false)
            setSentTo(null)
          }}
          type="button"
        >
          {setup ? 'Back to authenticator setup' : 'Back to authenticator code'}
        </button>
      ) : null}
    </div>
  )
}
