'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type EventCountdownProps = {
  eventDate: string
  slug: string
  title: string
  venue: string
}

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return null

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

export function EventCountdown({ eventDate, slug, title, venue }: EventCountdownProps) {
  const target = new Date(eventDate)
  // Start empty so server and first client render match (a time-based initial
  // value would differ between SSR and hydration → hydration mismatch). The
  // real countdown is computed after mount.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (Number.isNaN(target.getTime())) return

    const tick = () => setTimeLeft(getTimeLeft(target))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [eventDate])

  // Once mounted, hide the countdown if the event has passed (or date invalid).
  if (mounted && !timeLeft) return null

  const units = [
    { label: 'Days', value: timeLeft?.days },
    { label: 'Hours', value: timeLeft?.hours },
    { label: 'Minutes', value: timeLeft?.minutes },
    { label: 'Seconds', value: timeLeft?.seconds },
  ]

  return (
    <div className="epl-event-countdown wow animate__fadeInUp">
      <div className="epl-event-countdown__copy">
        <span className="epl-event-countdown__eyebrow">Next event</span>
        <h3 className="epl-event-countdown__title">
          <Link href={`/events/${slug}`}>{title}</Link>
        </h3>
        <p className="epl-event-countdown__venue">{venue}</p>
      </div>
      <div className="epl-event-countdown__timer" aria-live="polite">
        {units.map((unit) => (
          <div className="epl-event-countdown__unit" key={unit.label}>
            <span className="epl-event-countdown__value">
              {unit.value === undefined ? '--' : pad(unit.value)}
            </span>
            <span className="epl-event-countdown__label">{unit.label}</span>
          </div>
        ))}
      </div>
      <Link className="ul-btn epl-event-countdown__cta" href={`/events/${slug}`}>
        <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Event Details
      </Link>
    </div>
  )
}
