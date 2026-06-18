'use client'

import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { aboutPageStats } from '@/config/aboutPageContent'
import type { SiteSetting } from '@/payload-types'

const STAT_ICONS = [
  'flaticon-team',
  'flaticon-costumer',
  'flaticon-package',
  'flaticon-relationship',
]

const DEFAULT_STATS = [
  { value: '200+', label: 'Fellows Trained' },
  { value: '150+', label: 'Fellows Working Full Time' },
  { value: '40+', label: 'Public Institutions' },
  { value: '85%', label: 'Career Advancement' },
]

/** Slow count-up, ~3.2s with a gentle ease-out */
const COUNT_DURATION = 3.2

type StatItem = { value: string; label: string }

type ChariticsStatsProps = {
  settings: SiteSetting
  variant?: 'home' | 'about'
  stats?: StatItem[]
}

function parseStatValue(value: string) {
  const match = value.trim().match(/^([\d,.]+)(.*)$/)
  if (!match) {
    return { target: 0, suffix: value, decimals: 0 }
  }

  const raw = match[1].replace(/,/g, '')
  const target = Number(raw)
  const suffix = match[2] ?? ''
  const decimals = raw.includes('.') ? raw.split('.')[1]?.length ?? 0 : 0

  return {
    target: Number.isFinite(target) ? target : 0,
    suffix,
    decimals,
  }
}

function AnimatedStatNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { target, suffix, decimals } = parseStatValue(value)
  const [display, setDisplay] = useState(() =>
    decimals > 0 ? (0).toFixed(decimals) : '0',
  )

  useEffect(() => {
    if (!inView) return

    const controls = animate(0, target, {
      duration: COUNT_DURATION,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(
          decimals > 0 ? latest.toFixed(decimals) : String(Math.round(latest)),
        )
      },
    })

    return () => controls.stop()
  }, [inView, target, decimals])

  return (
    <span className="number" ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function ChariticsStats({
  settings,
  variant = 'home',
  stats: statsOverride,
}: ChariticsStatsProps) {
  const isAbout = variant === 'about'
  const stats = statsOverride?.length
    ? statsOverride
    : isAbout
      ? settings.stats?.length
        ? settings.stats
        : [...aboutPageStats]
      : settings.stats?.length
        ? settings.stats
        : DEFAULT_STATS

  return (
    <div
      className={`ul-stats ul-section-spacing${isAbout ? '' : ' epl-stats-section'}`}
    >
      <div className="ul-container">
        <div className="ul-stats-wrapper wow animate__fadeInUp">
          <div
            className={
              isAbout
                ? 'row row-cols-md-4 row-cols-sm-3 row-cols-2 row-cols-xxs-1 ul-bs-row justify-content-center'
                : 'row row-cols-md-4 row-cols-sm-2 row-cols-1 ul-bs-row justify-content-center epl-stats-row'
            }
          >
            {stats.map((stat, index) => (
              <div className="col" key={stat.label}>
                <div className="ul-stats-item">
                  <i className={STAT_ICONS[index % STAT_ICONS.length]}></i>
                  <AnimatedStatNumber value={stat.value} />
                  <span className="txt">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
