import type { Payload } from 'payload'

import { runDevSeeds } from './runDevSeeds'

const GLOBAL_KEY = '__eplDevAutoSeedPromise'

export function shouldRunDevAutoSeed(): boolean {
  if (process.env.NODE_ENV !== 'development') return false
  if (process.env.EPL_DEV_AUTO_SEED === 'false') return false
  return true
}

export async function maybeRunDevAutoSeed(payload: Payload): Promise<void> {
  if (!shouldRunDevAutoSeed()) return

  const globalState = globalThis as Record<string, unknown>
  const existing = globalState[GLOBAL_KEY] as Promise<void> | undefined

  if (existing) {
    await existing
    return
  }

  const task = runDevSeeds(payload).catch((error) => {
    payload.logger.warn(`[dev-seed] aborted: ${error}`)
  })

  globalState[GLOBAL_KEY] = task
  await task
}
