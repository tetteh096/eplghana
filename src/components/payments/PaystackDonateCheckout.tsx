'use client'

import PaystackPop from '@paystack/inline-js'
import { useCallback, useState } from 'react'

import type { PaystackCurrency } from '@/lib/paystack'

type PaystackDonateCheckoutProps = {
  email: string
  name: string
  phone?: string
  amountMinor: number
  currency: PaystackCurrency
  tierLabel?: string
  sourcePage?: string
  sourcePath?: string
  enabled?: boolean
  buttonLabel?: string
  className?: string
  disabled?: boolean
  onSuccess?: (reference: string) => void
  onError?: (message: string) => void
}

async function reportPaymentStatus(
  reference: string,
  status: 'cancelled' | 'failed',
  detail?: string,
) {
  await fetch('/api/paystack/status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reference, status, detail }),
  }).catch(() => undefined)
}

export function PaystackDonateCheckout({
  email,
  name,
  phone,
  amountMinor,
  currency,
  tierLabel,
  sourcePage = 'Donate page — Card payment (Paystack)',
  sourcePath = '/donate',
  enabled = false,
  buttonLabel = 'Pay with Paystack',
  className = 'epl-new-btn epl-new-btn--gold',
  disabled = false,
  onSuccess,
  onError,
}: PaystackDonateCheckoutProps) {
  const [loading, setLoading] = useState(false)

  const startCheckout = useCallback(async () => {
    if (loading || disabled) return

    if (!enabled) {
      onError?.('Online card payments are not configured yet.')
      return
    }

    if (!email.trim() || !name.trim()) {
      onError?.('Please enter your name and email.')
      return
    }

    if (!amountMinor || amountMinor < 100) {
      onError?.('Please enter a valid donation amount.')
      return
    }

    setLoading(true)
    let paymentReference = ''

    try {
      const initResponse = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          phone: phone?.trim() || undefined,
          amount: amountMinor,
          currency,
          tierLabel,
          sourcePage,
          sourcePath,
        }),
      })

      const initResult = (await initResponse.json().catch(() => ({}))) as {
        accessCode?: string
        reference?: string
        error?: string
      }

      if (!initResponse.ok || !initResult.accessCode || !initResult.reference) {
        throw new Error(initResult.error || 'Could not start checkout.')
      }

      paymentReference = initResult.reference

      const popup = new PaystackPop()
      popup.resumeTransaction(initResult.accessCode, {
        onSuccess: async (transaction: { reference?: string }) => {
          const reference = transaction.reference || paymentReference
          if (!reference) {
            onError?.('Payment completed but no reference was returned.')
            return
          }

          const verifyResponse = await fetch('/api/paystack/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference }),
          })

          const verifyResult = (await verifyResponse.json().catch(() => ({}))) as {
            success?: boolean
            error?: string
          }

          if (!verifyResponse.ok || !verifyResult.success) {
            onError?.(verifyResult.error || 'Payment verification failed.')
            return
          }

          onSuccess?.(reference)
        },
        onCancel: () => {
          if (paymentReference) {
            void reportPaymentStatus(paymentReference, 'cancelled')
          }
        },
        onError: (error: { message?: string }) => {
          const detail = error.message || 'Paystack checkout failed.'
          if (paymentReference) {
            void reportPaymentStatus(paymentReference, 'failed', detail)
          }
          onError?.(detail)
        },
      })
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Could not start checkout.')
    } finally {
      setLoading(false)
    }
  }, [
    amountMinor,
    currency,
    disabled,
    email,
    loading,
    name,
    onError,
    onSuccess,
    enabled,
    phone,
    sourcePage,
    sourcePath,
    tierLabel,
  ])

  return (
    <button
      className={className}
      disabled={disabled || loading || !enabled}
      onClick={() => void startCheckout()}
      style={{ width: '100%', minHeight: 52 }}
      type="button"
    >
      {loading ? 'Opening secure checkout…' : enabled ? buttonLabel : 'Card payments coming soon'}
    </button>
  )
}
