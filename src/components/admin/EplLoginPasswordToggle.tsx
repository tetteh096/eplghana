'use client'

import { useEffect } from 'react'

const AUTH_PAGE_SELECTOR = '.login.template-minimal, .forgot-password.template-minimal, .reset-password.template-minimal'

const EYE_OPEN = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/>
  <circle cx="12" cy="12" r="3"/>
</svg>`

const EYE_CLOSED = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
  <line x1="2" x2="22" y1="2" y2="22"/>
</svg>`

function enhancePasswordInput(input: HTMLInputElement) {
  if (input.dataset.eplPasswordToggle === 'true') return

  const fieldWrap = input.closest('.field-type__wrap')
  const inputRow = input.parentElement
  if (!fieldWrap || !inputRow) return

  input.dataset.eplPasswordToggle = 'true'
  inputRow.classList.add('epl-password-input-row')

  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'epl-password-toggle'
  button.setAttribute('aria-label', 'Show password')
  button.innerHTML = EYE_OPEN

  button.addEventListener('click', () => {
    const reveal = input.type === 'password'
    input.type = reveal ? 'text' : 'password'
    button.setAttribute('aria-label', reveal ? 'Hide password' : 'Show password')
    button.classList.toggle('epl-password-toggle--visible', reveal)
    button.innerHTML = reveal ? EYE_CLOSED : EYE_OPEN
  })

  inputRow.appendChild(button)
  fieldWrap.classList.add('epl-password-field')
}

function enhanceAuthPasswordFields() {
  document.querySelectorAll<HTMLElement>(AUTH_PAGE_SELECTOR).forEach((page) => {
    page.querySelectorAll<HTMLInputElement>('.field-type.password input[type="password"], .field-type.password input[type="text"]').forEach((input) => {
      if (input.name === 'password' || input.id.includes('password')) {
        enhancePasswordInput(input)
      }
    })
  })
}

/** Adds show/hide toggles to password fields on login, forgot, and reset screens. */
export function EplLoginPasswordToggle() {
  useEffect(() => {
    enhanceAuthPasswordFields()

    const observer = new MutationObserver(() => {
      enhanceAuthPasswordFields()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}
