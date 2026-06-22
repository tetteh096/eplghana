'use client'

import { CMS_NAME } from '@/config/brand'
import { useCallback, useId, useRef } from 'react'

export type EplOtpStatus = 'idle' | 'pending' | 'success' | 'error'

type Props = {
  disabled?: boolean
  hint?: string
  hintMode?: 'app' | 'email'
  length?: number
  name: string
  onComplete?: () => void
  resetKey?: number
  status?: EplOtpStatus
}

function focusInput(element: HTMLInputElement | null) {
  if (!element) return
  element.focus()
  element.select()
}

export function EplOtpInput({
  disabled = false,
  hint,
  hintMode = 'app',
  length = 6,
  name,
  onComplete,
  resetKey = 0,
  status = 'idle',
}: Props) {
  const id = useId()
  const cells = useRef<Array<HTMLInputElement | null>>([])
  const hiddenRef = useRef<HTMLInputElement>(null)

  const syncValue = useCallback(() => {
    const value = cells.current
      .filter(Boolean)
      .map((cell) => cell?.value ?? '')
      .join('')

    if (hiddenRef.current) {
      hiddenRef.current.value = value
    }

    if (value.length === length) {
      onComplete?.()
    }
  }, [length, onComplete])

  const moveTo = useCallback((index: number) => {
    focusInput(cells.current[index] ?? null)
  }, [])

  const handleInput = (event: React.FormEvent<HTMLInputElement>, index: number) => {
    const input = event.currentTarget
    const digit = input.value.replace(/\D/g, '').slice(-1)
    input.value = digit

    if (digit && index < length - 1) {
      moveTo(index + 1)
    }

    syncValue()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const input = event.currentTarget

    if (event.key === 'Backspace') {
      if (!input.value && index > 0) {
        const prev = cells.current[index - 1]
        if (prev) prev.value = ''
        moveTo(index - 1)
        syncValue()
        event.preventDefault()
        return
      }

      if (input.value) {
        input.value = ''
        syncValue()
      }
      return
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      moveTo(index - 1)
      event.preventDefault()
      return
    }

    if (event.key === 'ArrowRight' && index < length - 1) {
      moveTo(index + 1)
      event.preventDefault()
      return
    }

    if (event.key.length === 1 && !/^\d$/.test(event.key)) {
      event.preventDefault()
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (disabled) return

    const digits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length)
      .split('')

    digits.forEach((digit, index) => {
      const cell = cells.current[index]
      if (cell) cell.value = digit
    })

    focusInput(cells.current[Math.min(digits.length, length - 1)] ?? null)
    syncValue()
  }

  const handleHiddenInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (disabled) return

    const digits = event.currentTarget.value.replace(/\D/g, '').slice(0, length).split('')

    digits.forEach((digit, index) => {
      const cell = cells.current[index]
      if (cell) cell.value = digit
    })

    focusInput(cells.current[Math.min(digits.length, length - 1)] ?? null)
    syncValue()
  }

  const isLocked = disabled || status === 'pending' || status === 'success'

  return (
    <div
      className={`epl-totp__otp-field epl-totp__otp-field--${status}`}
      key={resetKey}
    >
      <label className="epl-totp__otp-label" htmlFor={id}>
        6-digit code
      </label>

      <input
        ref={hiddenRef}
        autoComplete="one-time-code"
        className="epl-totp__otp-hidden"
        id={id}
        inputMode="numeric"
        name={name}
        onInput={handleHiddenInput}
        readOnly={isLocked}
        tabIndex={-1}
        type="text"
      />

      <div
        aria-label="6-digit authenticator code"
        className="epl-totp__otp-cells"
        role="group"
      >
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(element) => {
              cells.current[index] = element
            }}
            aria-label={`Digit ${index + 1}`}
            autoFocus={index === 0}
            className="epl-totp__otp-cell"
            disabled={isLocked}
            inputMode="numeric"
            maxLength={1}
            onInput={(event) => handleInput(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onPaste={handlePaste}
            type="text"
          />
        ))}
      </div>

      {status === 'pending' ? (
        <p className="epl-totp__otp-status">Checking code…</p>
      ) : status === 'success' ? (
        <p className="epl-totp__otp-status epl-totp__otp-status--success">
          Code verified. Opening {CMS_NAME}…
        </p>
      ) : status === 'error' ? (
        <p className="epl-totp__otp-status epl-totp__otp-status--error">
          {hintMode === 'email'
            ? 'That code did not work. Check your email and try again.'
            : 'That code did not work. Enter the latest code from your app.'}
        </p>
      ) : (
        <p className="epl-totp__otp-hint">
          {hint ??
            (hintMode === 'email'
              ? 'Enter the 6-digit code from your email.'
              : 'Codes refresh every 30 seconds in your app.')}
        </p>
      )}
    </div>
  )
}
