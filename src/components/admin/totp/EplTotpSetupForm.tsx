'use client'

import { useCallback, useRef } from 'react'

import { EplOtpInput } from './EplOtpInput'
import { useEplTotpSubmit } from './useEplTotpSubmit'

type Props = {
  apiRoute: string
  length?: number
  redirectTo: string
  secret: string
  serverURL: string
}

export function EplTotpSetupForm({
  apiRoute,
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
    <form className="epl-totp__form" onSubmit={submit} ref={formRef}>
      <input name="secret" type="hidden" value={secret} />
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
