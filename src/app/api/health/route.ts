import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/utilities/getPayloadClient'

export const dynamic = 'force-dynamic'

/**
 * Quick deployment check — hit /api/health on Vercel to see if Payload can
 * reach MongoDB. Does not expose secrets.
 */
export async function GET() {
  const checks: Record<string, string> = {
    DATABASE_URL: process.env.DATABASE_URL ? 'set' : 'missing',
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET ? 'set' : 'missing',
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'missing',
  }

  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Missing required environment variables',
        checks,
      },
      { status: 503 },
    )
  }

  try {
    const payload = await getPayloadClient()
    await payload.find({ collection: 'users', depth: 0, limit: 1 })
    return NextResponse.json({ ok: true, checks })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        ok: false,
        error: 'Database connection failed',
        message,
        checks,
      },
      { status: 503 },
    )
  }
}
