'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

const easeOut = [0.22, 1, 0.36, 1] as const

/** Lighter motion so sections don't feel like they "pop in" late. */
const revealVariants: Variants = {
  hidden: { opacity: 0.001, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
}

const staggerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
}

type MotionRevealProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
  stagger?: boolean
  delay?: number
  id?: string
  style?: CSSProperties
}

export function MotionReveal({
  children,
  className,
  as = 'div',
  stagger = false,
  delay = 0,
  id,
  style,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      className={className}
      id={id}
      initial={reduceMotion ? false : 'hidden'}
      style={style}
      variants={stagger ? staggerVariants : revealVariants}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -4% 0px' }}
      whileInView="show"
      {...(delay && !stagger
        ? { transition: { duration: 0.4, ease: easeOut, delay } }
        : {})}
    >
      {children}
    </Component>
  )
}

export function MotionItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : revealVariants}
    >
      {children}
    </motion.div>
  )
}
