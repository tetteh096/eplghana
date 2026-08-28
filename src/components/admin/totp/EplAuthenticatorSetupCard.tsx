'use client'

import { useCallback, useRef } from 'react'

import { EplOtpInput } from './EplOtpInput'
import { useEplTotpSubmit } from './useEplTotpSubmit'

type Props = {
  apiRoute: string
  compact?: boolean
  length?: number
  redirectTo: string
  secret: string
  serverURL: string
}

function AppIcon() {
  return (
    <svg aria-hidden fill="none" height="22" viewBox="0 0 24 24" width="22">
      <rect
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
        width="12"
        x="6"
        y="4"
      />
      <path d="M10 17h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      <circle cx="12" cy="8.5" fill="currentColor" r="1" />
    </svg>
  )
}

export function EplAuthenticatorSetupCard({
  apiRoute,
  compact = false,
  length = 6,
  redirectTo,
  secret,
  serverURL,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const { resetKey, status, submit } = useEplTotpSubmit({
    apiRoute,
    endpoint: 'setup-totp',
    errorMessage: 'That code did not work. Try the latest code from your app.',
    redirectTo,
    serverURL,
  })

  const submitWhenComplete = useCallback(() => {
    if (!formRef.current || status === 'pending' || status === 'success') return
    formRef.current.requestSubmit()
  }, [status])

  return (
    <section
      aria-labelledby={compact ? undefined : 'epl-mfa-app-setup-title'}
      className={`epl-totp__method-card epl-totp__method-card--app${compact ? ' epl-totp__method-card--compact' : ''}`}
    >
      {compact ? (
        <p className="epl-totp__tabpanel-hint">
          Scan the QR code, then enter the 6-digit code from your app.
        </p>
      ) : (
        <div className="epl-totp__method-head">
          <span className="epl-totp__method-icon epl-totp__method-icon--app" aria-hidden>
            <AppIcon />
          </span>
          <div className="epl-totp__method-copy">
            <h2 className="epl-totp__method-title" id="epl-mfa-app-setup-title">
              Authenticator app
            </h2>
            <p className="epl-totp__method-desc">
              Scan the QR code, then enter the 6-digit code from your app here.
            </p>
          </div>
        </div>
      )}

      <form className="epl-totp__form" onSubmit={submit} ref={formRef}>
        <input name="secret" type="hidden" value={secret} />
        <EplOtpInput
          disabled={status === 'pending' || status === 'success'}
          hint="Codes refresh every 30 seconds in your app."
          hintMode="app"
          label="Authenticator code"
          length={length}
          name="token"
          onComplete={submitWhenComplete}
          resetKey={resetKey}
          status={status}
        />
      </form>
    </section>
  )
}
