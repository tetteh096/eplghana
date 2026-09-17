'use client'

import { useCallback, useRef } from 'react'

import { EplOtpInput } from './EplOtpInput'
import { useEplTotpSubmit } from './useEplTotpSubmit'

type Props = {
  apiRoute: string
  length?: number
  redirectTo: string
  serverURL: string
}

export function EplTotpVerifyForm({
  apiRoute,
  length = 6,
  redirectTo,
  serverURL,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const { resetKey, status, submit } = useEplTotpSubmit({
    apiRoute,
    endpoint: 'verify-totp',
    errorMessage: 'Incorrect code. Open your authenticator app and try again.',
    redirectTo,
    serverURL,
  })

  const submitWhenComplete = useCallback(() => {
    if (!formRef.current || status === 'pending' || status === 'success') return
    formRef.current.requestSubmit()
  }, [status])

  return (
    <form className="epl-totp__form" onSubmit={submit} ref={formRef}>
      <EplOtpInput
        disabled={status === 'pending' || status === 'success'}
        length={length}
        name="token"
        onComplete={submitWhenComplete}
        resetKey={resetKey}
        status={status}
      />
    </form>
  )
}
