'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type StatItem = {
  value: string
  label: string
}

type ChariticsHomeStatsProps = {
  stats: StatItem[]
}

/** Slow count-up — not rushed */
const COUNT_DURATION = 3.4

function parseStatValue(value: string) {
  const match = value.trim().match(/^([\d,.]+)(.*)$/)
  if (!match) {
    return { target: 0, suffix: value, decimals: 0 }
  }

  const raw = match[1].replace(/,/g, '')
  const target = Number(raw)
  const suffix = match[2] ?? ''
  const decimals = raw.includes('.') ? (raw.split('.')[1]?.length ?? 0) : 0

  return {
    target: Number.isFinite(target) ? target : 0,
    suffix,
    decimals,
  }
}

function AnimatedStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const { target, suffix, decimals } = parseStatValue(value)
  const [display, setDisplay] = useState(() =>
    decimals > 0 ? (0).toFixed(decimals) : '0',
  )

  useEffect(() => {
    if (!inView) return

    if (reduceMotion) {
      setDisplay(decimals > 0 ? target.toFixed(decimals) : String(Math.round(target)))
      return
    }

    const controls = animate(0, target, {
      duration: COUNT_DURATION,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(decimals > 0 ? latest.toFixed(decimals) : String(Math.round(latest)))
      },
    })

    return () => controls.stop()
  }, [inView, target, decimals, reduceMotion])

  return (
    <strong ref={ref}>
      {display}
      {suffix}
    </strong>
  )
}

export function ChariticsHomeStats({ stats }: ChariticsHomeStatsProps) {
  return (
    <section
      aria-label="EPL Ghana impact at a glance"
      className={`epl-new-stats${stats.length === 3 ? ' epl-new-stats--three' : ''}`}
    >
      {stats.map((stat) => (
        <div key={`${stat.value}-${stat.label}`}>
          <AnimatedStatValue value={stat.value} />
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  )
}
