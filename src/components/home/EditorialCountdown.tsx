'use client'

import { useEffect, useState } from 'react'

type EditorialCountdownProps = { eventDate: string }
type Countdown = { days: number; hours: number; minutes: number; seconds: number }

function calculate(eventDate: string): Countdown | null {
  const remaining = new Date(eventDate).getTime() - Date.now()
  if (!Number.isFinite(remaining) || remaining <= 0) return null
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
    seconds: Math.floor((remaining / 1_000) % 60),
  }
}

export function EditorialCountdown({ eventDate }: EditorialCountdownProps) {
  const [countdown, setCountdown] = useState<Countdown | null>(null)

  useEffect(() => {
    const update = () => setCountdown(calculate(eventDate))
    const initial = window.setTimeout(update, 0)
    const interval = window.setInterval(update, 1000)
    return () => { window.clearTimeout(initial); window.clearInterval(interval) }
  }, [eventDate])

  if (!countdown) return null

  return (
    <div className="epl-latest-countdown" aria-label="Time until event">
      {Object.entries(countdown).map(([label, value]) => (
        <div key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>
      ))}
    </div>
  )
}
