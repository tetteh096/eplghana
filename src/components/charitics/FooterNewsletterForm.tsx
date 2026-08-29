'use client'

import { FormEvent, useState } from 'react'

export function FooterNewsletterForm() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
  }

  if (subscribed) {
    return (
      <div className="epl-figma-footer__subscribed">
        <span aria-hidden className="epl-figma-footer__subscribed-mark" />
        You&apos;re subscribed. Thank you!
      </div>
    )
  }

  return (
    <form className="epl-figma-footer__form" onSubmit={handleSubmit}>
      <input
        aria-label="Email address"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email"
        required
        type="email"
        value={email}
      />
      <button type="submit">Subscribe</button>
    </form>
  )
}
