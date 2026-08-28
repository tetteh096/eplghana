'use client'

import { toast } from '@payloadcms/ui'
import { useCallback, useState } from 'react'

import type { EplOtpStatus } from './EplOtpInput'

type Options = {
  apiRoute: string
  redirectTo: string
  serverURL: string
  setup?: boolean
}

export function useEplEmailOtpVerify({
  apiRoute,
  redirectTo,
  serverURL,
  setup = false,
}: Options) {
  const [status, setStatus] = useState<EplOtpStatus>('idle')
  const [resetKey, setResetKey] = useState(0)

  const submit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (status === 'pending' || status === 'success') return

      setStatus('pending')

      try {
        const formData = new FormData(event.currentTarget)
        const res = await fetch(`${serverURL}${apiRoute}/verify-email-otp`, {
          body: JSON.stringify({
            setup,
            token: formData.get('token'),
          }),
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
        })
        const data = (await res.json()) as { message?: string; ok: boolean }

        if (!data.ok) {
          setStatus('error')
          toast.error(data.message || 'Incorrect code. Check your email and try again.')
          setResetKey((value) => value + 1)
          window.setTimeout(() => setStatus('idle'), 1800)
          return
        }

        setStatus('success')
        window.setTimeout(() => {
          location.replace(redirectTo)
        }, 650)
      } catch {
        setStatus('error')
        toast.error('Something went wrong. Please try again.')
        setResetKey((value) => value + 1)
        window.setTimeout(() => setStatus('idle'), 1800)
      }
    },
    [apiRoute, redirectTo, serverURL, setup, status],
  )

  return { resetKey, status, submit }
}
