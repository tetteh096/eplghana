export type PaystackCurrency = 'GHS' | 'USD' | 'NGN'

const PAYSTACK_API = 'https://api.paystack.co'

export function isPaystackConfigured(): boolean {
  return Boolean(process.env.PAYSTACK_SECRET_KEY?.trim())
}

export function getPaystackSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY?.trim()
  if (!key) throw new Error('Paystack is not configured.')
  return key
}

export function getDefaultPaystackCurrency(): PaystackCurrency {
  const value = process.env.PAYSTACK_CURRENCY?.trim().toUpperCase()
  if (value === 'USD' || value === 'NGN') return value
  return 'GHS'
}

export function getPaystackCallbackUrl(): string {
  const base = process.env.NEXT_PUBLIC_SERVER_URL?.trim() || 'http://localhost:3000'
  return `${base.replace(/\/$/, '')}/donate?payment=success`
}

type PaystackInitializeResponse = {
  status?: boolean
  message?: string
  data?: {
    access_code?: string
    reference?: string
    authorization_url?: string
  }
}

type PaystackVerifyResponse = {
  status?: boolean
  message?: string
  data?: {
    status?: string
    reference?: string
    amount?: number
    currency?: string
    paid_at?: string
    customer?: { email?: string; first_name?: string; last_name?: string }
    metadata?: Record<string, unknown>
  }
}

export async function initializePaystackTransaction(input: {
  email: string
  amount: number
  currency: PaystackCurrency
  reference?: string
  name?: string
  phone?: string
  metadata?: Record<string, string>
}): Promise<{ accessCode: string; reference: string }> {
  const secret = getPaystackSecretKey()

  const [firstName, ...rest] = (input.name?.trim() || '').split(/\s+/)
  const lastName = rest.join(' ')

  const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: input.email,
      amount: input.amount,
      currency: input.currency,
      reference: input.reference,
      callback_url: getPaystackCallbackUrl(),
      metadata: {
        ...input.metadata,
        donor_name: input.name,
        donor_phone: input.phone,
        custom_fields: [
          ...(input.name
            ? [{ display_name: 'Donor name', variable_name: 'donor_name', value: input.name }]
            : []),
          ...(input.phone
            ? [{ display_name: 'Phone', variable_name: 'donor_phone', value: input.phone }]
            : []),
        ],
      },
      ...(firstName ? { first_name: firstName, last_name: lastName || undefined } : {}),
    }),
  })

  const result = (await response.json().catch(() => ({}))) as PaystackInitializeResponse

  if (!response.ok || !result.status || !result.data?.access_code || !result.data.reference) {
    throw new Error(result.message || 'Could not start Paystack checkout.')
  }

  return {
    accessCode: result.data.access_code,
    reference: result.data.reference,
  }
}

export async function verifyPaystackTransaction(reference: string) {
  const secret = getPaystackSecretKey()
  const response = await fetch(`${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${secret}`,
    },
  })

  const result = (await response.json().catch(() => ({}))) as PaystackVerifyResponse

  if (!response.ok || !result.status || !result.data) {
    throw new Error(result.message || 'Could not verify Paystack transaction.')
  }

  return result.data
}

/** Parse display amounts like "GHS 15,000" or "USD 1,000" into Paystack minor units. */
export function toPaystackMinorUnits(amount: number, currency: PaystackCurrency): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0
  const minor = Math.round(amount * 100)
  const minimum = currency === 'USD' ? 100 : 100
  return Math.max(minor, minimum)
}

export function parseDonateTierAmount(
  tier: { amountGhs: string; amountUsd: string; isCustom?: boolean },
  currency: PaystackCurrency,
  customAmount?: number,
): number {
  if (tier.isCustom) {
    return toPaystackMinorUnits(customAmount ?? 0, currency)
  }

  const source = currency === 'USD' ? tier.amountUsd : tier.amountGhs
  const major = Number.parseInt(source.replace(/[^\d]/g, ''), 10)
  return toPaystackMinorUnits(major, currency)
}
