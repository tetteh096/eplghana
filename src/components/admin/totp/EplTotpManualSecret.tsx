'use client'

import { useState } from 'react'

export function EplTotpManualSecret({ secret }: { secret: string }) {
  const [open, setOpen] = useState(false)
  const formatted = secret.match(/.{1,4}/g)?.join(' ') ?? secret

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(secret)
    } catch {
      // clipboard may be blocked
    }
  }

  return (
    <div className="epl-totp__manual">
      <button
        className="epl-totp__manual-toggle"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? 'Hide manual setup key' : "Can't scan? Enter key manually"}
      </button>
      {open ? (
        <div className="epl-totp__manual-panel">
          <code className="epl-totp__manual-code">{formatted}</code>
          <button className="epl-totp__manual-copy" onClick={copy} type="button">
            Copy key
          </button>
        </div>
      ) : null}
    </div>
  )
}
