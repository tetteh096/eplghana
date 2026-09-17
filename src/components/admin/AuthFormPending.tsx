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

const AUTH_API_PATTERN = /\/(login|forgot-password|reset-password)(?:\?|$)/i

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

function hasAuthError(root: HTMLElement): boolean {
  if (root.querySelector('.banner--error, .banner[data-theme="error"]')?.textContent?.trim()) {
    return true
  }

  if (root.querySelector('.field-type.error, .field-type .error-message')) {
    return true
  }

  return Boolean(
    document.querySelector(
      '.payload-toast-item.toast-error, .toast-error, [data-sonner-toast][data-type="error"]',
    ),
  )
}

/** Shows a spinner + label on admin auth forms after submit (login, forgot, reset). */
export function AuthFormPending() {
  useEffect(() => {
    let safetyTimer: ReturnType<typeof setTimeout> | undefined
    let observer: MutationObserver | undefined
    let pendingRoot: HTMLElement | null = null

    const stopWatching = () => {
      observer?.disconnect()
      observer = undefined
      pendingRoot = null
    }

    const clearPending = () => {
      if (pendingRoot) {
        setPending(pendingRoot, false)
      } else {
        clearAllPending()
      }
      stopWatching()
      if (safetyTimer) {
        clearTimeout(safetyTimer)
        safetyTimer = undefined
      }
    }

    const startWatching = (root: HTMLElement) => {
      stopWatching()
      pendingRoot = root

      observer = new MutationObserver(() => {
        if (hasAuthError(root)) {
          clearPending()
        }
      })

      observer.observe(root, { childList: true, subtree: true, characterData: true })

      const toastContainer = document.querySelector('.payload-toast-container')
      if (toastContainer) {
        observer.observe(toastContainer, { childList: true, subtree: true })
      } else {
        observer.observe(document.body, { childList: true, subtree: true })
      }
    }

    const originalFetch = window.fetch.bind(window)
    window.fetch = async (...args) => {
      const response = await originalFetch(...args)

      try {
        const request = args[0]
        const url =
          typeof request === 'string'
            ? request
            : request instanceof Request
              ? request.url
              : String(request)

        if (AUTH_API_PATTERN.test(url)) {
          clearPending()
        }
      } catch {
        // Ignore URL parsing issues; the safety timer still clears stuck states.
      }

      return response
    }

    const onSubmit = (event: Event) => {
      const form = event.target
      if (!(form instanceof HTMLFormElement)) return

      const root = findAuthRoot(form)
      if (!root) return

      const label = AUTH_ROOTS[authKind(root)]
      setPending(root, true, label)
      startWatching(root)

      if (safetyTimer) clearTimeout(safetyTimer)
      safetyTimer = setTimeout(clearPending, 15000)
    }

    document.addEventListener('submit', onSubmit, true)
    window.addEventListener('pageshow', clearAllPending)

    return () => {
      window.fetch = originalFetch
      document.removeEventListener('submit', onSubmit, true)
      window.removeEventListener('pageshow', clearAllPending)
      stopWatching()
      if (safetyTimer) clearTimeout(safetyTimer)
      clearAllPending()
    }
  }, [])

  return null
}
