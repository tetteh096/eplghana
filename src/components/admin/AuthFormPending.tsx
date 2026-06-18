'use client'

import { useEffect } from 'react'

const AUTH_ROOTS = {
  login: 'Signing in…',
  'forgot-password': 'Sending link…',
  'reset-password': 'Updating password…',
} as const

const AUTH_ROOT_SELECTOR = Object.keys(AUTH_ROOTS)
  .map((kind) => `.${kind}.template-minimal`)
  .join(', ')

function findAuthRoot(form: HTMLFormElement): HTMLElement | null {
  return form.closest<HTMLElement>(AUTH_ROOT_SELECTOR)
}

function authKind(root: HTMLElement): keyof typeof AUTH_ROOTS {
  for (const kind of Object.keys(AUTH_ROOTS)) {
    if (root.classList.contains(kind)) return kind as keyof typeof AUTH_ROOTS
  }
  return 'login'
}

function findSubmitButton(root: HTMLElement): HTMLButtonElement | null {
  return root.querySelector<HTMLButtonElement>(
    '.login__form__actions .form-submit .btn, .form-submit .btn, button[type="submit"].btn, button[type="submit"]',
  )
}

function setPending(root: HTMLElement, pending: boolean, label?: string) {
  root.classList.toggle('epl-auth-pending', pending)

  const button = findSubmitButton(root)
  if (!button) return

  if (pending) {
    button.setAttribute('aria-busy', 'true')
    button.setAttribute('disabled', 'disabled')
    if (label) button.setAttribute('data-epl-pending-label', label)
  } else {
    button.removeAttribute('aria-busy')
    button.removeAttribute('disabled')
    button.removeAttribute('data-epl-pending-label')
  }
}

function clearAllPending() {
  document.querySelectorAll<HTMLElement>(`${AUTH_ROOT_SELECTOR}.epl-auth-pending`).forEach((root) => {
    setPending(root, false)
  })
}

/** Shows a spinner + label on admin auth forms after submit (login, forgot, reset). */
export function AuthFormPending() {
  useEffect(() => {
    let safetyTimer: ReturnType<typeof setTimeout> | undefined
    let observer: MutationObserver | undefined

    const stopWatching = () => {
      observer?.disconnect()
      observer = undefined
    }

    const onSubmit = (event: Event) => {
      const form = event.target
      if (!(form instanceof HTMLFormElement)) return

      const root = findAuthRoot(form)
      if (!root) return

      const label = AUTH_ROOTS[authKind(root)]
      setPending(root, true, label)

      if (safetyTimer) clearTimeout(safetyTimer)
      safetyTimer = setTimeout(() => {
        setPending(root, false)
        stopWatching()
      }, 60000)

      stopWatching()
      observer = new MutationObserver(() => {
        const errorBanner = root.querySelector('.banner--error, .banner[data-theme="error"]')
        if (errorBanner?.textContent?.trim()) {
          setPending(root, false)
          stopWatching()
          if (safetyTimer) clearTimeout(safetyTimer)
        }
      })
      observer.observe(root, { childList: true, subtree: true, characterData: true })
    }

    document.addEventListener('submit', onSubmit, true)
    window.addEventListener('pageshow', clearAllPending)

    return () => {
      document.removeEventListener('submit', onSubmit, true)
      window.removeEventListener('pageshow', clearAllPending)
      stopWatching()
      if (safetyTimer) clearTimeout(safetyTimer)
      clearAllPending()
    }
  }, [])

  return null
}
