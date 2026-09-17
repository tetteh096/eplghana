'use client'

import { type FormEvent, useEffect, useMemo, useState } from 'react'

import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import { PaystackDonateCheckout } from '@/components/payments/PaystackDonateCheckout'
import type { DonateTier } from '@/config/donatePageContent'
import { parseDonateTierAmount, type PaystackCurrency } from '@/lib/paystack'
import type { DonatePageContent } from '@/utilities/getDonatePageContent'

type Props = {
  content: DonatePageContent
  paystackEnabled?: boolean
}

const svgProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function DonateReasonIcon({ index }: { index: number }) {
  switch (index % 5) {
    case 0:
      return (
        <svg aria-hidden viewBox="0 0 24 24" {...svgProps}>
          <circle cx="12" cy="8" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          <path d="M12 3v2" />
          <path d="M8 5l1 1" />
          <path d="M16 5l-1 1" />
        </svg>
      )
    case 1:
      return (
        <svg aria-hidden viewBox="0 0 24 24" {...svgProps}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 2:
      return (
        <svg aria-hidden viewBox="0 0 24 24" {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    case 3:
      return (
        <svg aria-hidden viewBox="0 0 24 24" {...svgProps}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    default:
      return (
        <svg aria-hidden viewBox="0 0 24 24" {...svgProps}>
          <rect x="4" y="2" width="16" height="20" rx="1" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M12 6h.01" />
          <path d="M12 10h.01" />
          <path d="M12 14h.01" />
          <path d="M16 10h.01" />
          <path d="M16 14h.01" />
          <path d="M8 10h.01" />
          <path d="M8 14h.01" />
        </svg>
      )
  }
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" {...svgProps}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg aria-hidden width="28" height="28" viewBox="0 0 24 24" {...svgProps}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export function ChariticsDonatePage({ content, paystackEnabled = false }: Props) {
  const { hero, why, ways, tiers, questions, pledge, modal } = content
  const [activeModal, setActiveModal] = useState<DonateTier | null>(null)
  const [modalMethod, setModalMethod] = useState<'card' | 'bank' | 'momo'>('card')
  const [modalAccountCurrency, setModalAccountCurrency] = useState<'GHS' | 'USD'>('GHS')
  const [pledgeAmount, setPledgeAmount] = useState('')
  const [preferredChannel, setPreferredChannel] = useState(pledge.channels[0] ?? '')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [payName, setPayName] = useState('')
  const [payEmail, setPayEmail] = useState('')
  const [payPhone, setPayPhone] = useState('')
  const [payCurrency, setPayCurrency] = useState<PaystackCurrency>('GHS')
  const [customAmountMajor, setCustomAmountMajor] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null)
  const [paymentError, setPaymentError] = useState('')

  const openTierModal = (tier: DonateTier) => {
    setPaymentError('')
    setActiveModal(tier)
  }

  const paymentAmountMinor = useMemo(() => {
    if (!activeModal) return 0
    const customAmount = activeModal.isCustom ? Number.parseFloat(customAmountMajor) : undefined
    return parseDonateTierAmount(activeModal, payCurrency, customAmount)
  }, [activeModal, customAmountMajor, payCurrency])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const reference = params.get('reference') || params.get('trxref')
    if (params.get('payment') !== 'success' || !reference) return

    void fetch('/api/paystack/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference }),
    })
      .then(async (response) => {
        const result = (await response.json().catch(() => ({}))) as { success?: boolean }
        if (response.ok && result.success) {
          setPaymentSuccess(reference)
          window.history.replaceState({}, '', '/donate')
        }
      })
      .catch(() => undefined)
  }, [])

  const recordPledgeFromModal = () => {
    if (activeModal) {
      setPledgeAmount(activeModal.isCustom ? customAmountMajor : activeModal.amountUsd)
      if (modalMethod === 'card') setPreferredChannel('Debit / Credit Card (Online)')
      if (modalMethod === 'bank') {
        setPreferredChannel(
          modalAccountCurrency === 'GHS'
            ? 'Bank Transfer (GCB GHS)'
            : 'Bank Transfer (GCB USD $)',
        )
      }
      if (modalMethod === 'momo') setPreferredChannel('MTN MoMo')
    }
    setActiveModal(null)
    document.getElementById('pledge')?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handlePledgeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setErrorMessage('')

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const phone = String(data.get('phone') ?? '')
    const country = String(data.get('country') ?? '')
    const amount = String(data.get('pledgeAmount') ?? '')
    const date = String(data.get('pledgeDate') ?? '')
    const channel = String(data.get('preferredChannel') ?? '')

    const message = [
      `Pledge amount: ${amount}`,
      `Country: ${country}`,
      date ? `Pledge date: ${date}` : null,
      `Preferred channel: ${channel}`,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const response = await fetch('/api/form-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'pledge',
          name,
          email,
          phone,
          subject: `Pledge — ${amount || 'custom'}`,
          message,
          sourcePage: 'Donate page — Make a pledge',
          sourcePath: '/donate',
          company: String(data.get('company') ?? ''),
        }),
      })
      const result = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) throw new Error(result.error || 'Something went wrong. Please try again.')
      form.reset()
      setPledgeAmount('')
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <div className="figma-donate-page">
      {paymentSuccess ? (
        <div className="figma-donate-notice">
          Thank you — your donation was received successfully. Reference: {paymentSuccess}
        </div>
      ) : null}

      <section className="figma-donate-hero">
        <div
          className="figma-donate-hero__bg"
          style={{ backgroundImage: `url(${hero.image})` }}
        />
        <div className="figma-donate-hero__overlay" />
        <div className="figma-donate-hero__content">
          <div className="figma-donate-hero__copy">
            <div className="figma-impact-kicker">
              <span className="figma-impact-kicker__line" />
              <span>{hero.eyebrow.toUpperCase()}</span>
            </div>
            <h1>{hero.title}</h1>
            <p>{hero.lead}</p>
            {(hero.primaryCtaLabel || hero.secondaryCtaLabel) && (
              <div className="figma-donate-hero__actions">
                {hero.primaryCtaLabel ? (
                  <a className="figma-donate-btn figma-donate-btn--gold" href={hero.primaryCtaHref}>
                    {hero.primaryCtaLabel}
                  </a>
                ) : null}
                {hero.secondaryCtaLabel ? (
                  <a className="figma-donate-btn figma-donate-btn--ghost" href={hero.secondaryCtaHref}>
                    {hero.secondaryCtaLabel}
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>

      <MotionReveal as="section" className="figma-donate-section epl-new-shell">
        <div className="figma-donate-section-head">
          <div className="figma-impact-kicker">
            <span className="figma-impact-kicker__line" />
            <span>{why.eyebrow.toUpperCase()}</span>
          </div>
          <h2>{why.title}</h2>
        </div>
        <MotionReveal stagger className="figma-donate-why-grid">
          {why.reasons.map((reason, index) => (
            <MotionItem key={reason.title}>
              <article className="figma-donate-why-card">
                <DonateReasonIcon index={index} />
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-donate-section figma-donate-section--ways epl-new-shell"
        id="ways-to-give"
      >
        <div className="figma-donate-section-head figma-donate-section-head--center">
          <p className="figma-donate-eyebrow">{ways.eyebrow}</p>
          <h2>{ways.title}</h2>
          {ways.intro ? <p className="figma-donate-section-head__lead">{ways.intro}</p> : null}
        </div>

        <div className="figma-donate-ways">
          <article className="figma-donate-online">
            <div className="figma-donate-online__copy">
              <div className="figma-donate-online__meta">
                <span className="figma-donate-online__badge">{ways.card.statusLabel}</span>
                <span className="figma-donate-online__code">{ways.card.code}</span>
              </div>
              <h3>{ways.card.title}</h3>
              <p>{ways.card.description}</p>
              <div className="figma-donate-online__brands" aria-label={ways.card.acceptedCards}>
                {(ways.card.brands ?? []).map((brand) => (
                  <img
                    alt={brand.name}
                    className="figma-donate-online__brand"
                    decoding="async"
                    height={22}
                    key={brand.name}
                    src={brand.src}
                    width={48}
                  />
                ))}
              </div>
            </div>
            <div className="figma-donate-online__action">
              <a className="figma-donate-btn figma-donate-btn--teal" href={ways.card.ctaHref}>
                <svg aria-hidden fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {ways.card.ctaLabel}
              </a>
              <p>
                Secured by <strong>{ways.card.securedBy ?? 'Paystack'}</strong>
              </p>
            </div>
          </article>

          <p className="figma-donate-ways__divider">{ways.transferLabel}</p>

          <div className="figma-donate-transfer-grid">
            {ways.momo.options.map((opt) => (
              <article className="figma-donate-transfer" key={`${opt.badge}-${opt.detail}`}>
                <div className="figma-donate-transfer__brand">
                  <div className={`figma-donate-transfer__logo figma-donate-transfer__logo--${opt.logoTone}`}>
                    <img alt={opt.title} decoding="async" height={72} src={opt.logo} width={160} />
                  </div>
                  <div>
                    <h3>{opt.title}</h3>
                    <p>{opt.subtitle}</p>
                  </div>
                </div>
                <div className="figma-donate-transfer__highlight">
                  <span>{opt.detailLabel}</span>
                  <strong>{opt.detail}</strong>
                </div>
                <div className="figma-donate-transfer__meta">
                  <span>Merchant Name</span>
                  <strong>{opt.name}</strong>
                </div>
              </article>
            ))}
          </div>

          <article className="figma-donate-bank">
            <div className="figma-donate-bank__head">
              <div className="figma-donate-bank__icon" aria-hidden>
                <svg fill="none" height="20" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="20">
                  <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3>Bank Transfer</h3>
                <p>
                  {ways.bank.bankName} · {ways.bank.branch}
                </p>
              </div>
            </div>
            <div className="figma-donate-bank__table">
              {[
                ['Bank', ways.bank.bankName],
                ['Account Name', ways.bank.accountName],
                ['Account Number (GHS)', ways.bank.accountNumberGhs],
                ['Account Number (USD)', ways.bank.accountNumberUsd],
                ['Swift Code', ways.bank.swift],
                ['Sort Code', ways.bank.sortCode],
              ].map(([label, value], index) => (
                <div
                  className={`figma-donate-bank__row${index % 2 ? ' is-alt' : ''}`}
                  key={label}
                >
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            {ways.bank.note ? <p className="figma-donate-bank__note">{ways.bank.note}</p> : null}
          </article>
        </div>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-donate-section epl-new-shell"
        id="tiers"
        style={{ scrollMarginTop: '5rem' }}
      >
        <div className="figma-donate-section-head figma-donate-section-head--center">
          <p className="figma-donate-eyebrow figma-donate-eyebrow--blue">{tiers.eyebrow}</p>
          <h2>{tiers.title}</h2>
        </div>
        <MotionReveal stagger className="figma-donate-impact-grid">
          {tiers.items.filter((tier) => !tier.isCustom).map((tier) => (
            <MotionItem key={tier.label}>
              <button
                className={`figma-donate-impact${activeModal?.label === tier.label ? ' is-active' : ''}`}
                onClick={() => openTierModal(tier)}
                type="button"
              >
                <div className="figma-donate-impact__amount">{tier.amountDisplay}</div>
                <p>{tier.description}</p>
              </button>
            </MotionItem>
          ))}
        </MotionReveal>
        {tiers.items.some((tier) => tier.isCustom) ? (
          <div className="figma-donate-impact-custom">
            <button
              className="figma-donate-btn figma-donate-btn--blue"
              onClick={() => openTierModal(tiers.items.find((tier) => tier.isCustom)!)}
              type="button"
            >
              Give a custom amount
            </button>
          </div>
        ) : null}
      </MotionReveal>

      <section className="figma-donate-questions-band">
        <div className="epl-new-shell">
          <h2>{questions.title}</h2>
          <p>{questions.text}</p>
          <div className="figma-donate-questions-band__actions">
            <a className="figma-donate-btn figma-donate-btn--light" href={questions.primaryHref}>
              {questions.primaryLabel}
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </section>

      <MotionReveal
        as="section"
        className="figma-donate-section figma-donate-section--pledge epl-new-shell"
        id="pledge"
        style={{ scrollMarginTop: '5rem' }}
      >
        <div className="figma-donate-pledge">
          <div className="figma-donate-pledge__head">
            <div className="figma-donate-pledge__kicker">
              <span className="figma-impact-kicker__line" />
              <span>{pledge.eyebrow.toUpperCase()}</span>
              <span className="figma-impact-kicker__line" />
            </div>
            <h2>{pledge.title}</h2>
            <p>{pledge.description}</p>
          </div>

          <div className="figma-donate-pledge__card">
            {status === 'success' ? (
              <div className="figma-donate-pledge__success">
                <div className="figma-donate-pledge__success-icon">
                  <HeartIcon />
                </div>
                <h3>{pledge.successTitle}</h3>
                <p>{pledge.successText}</p>
              </div>
            ) : (
              <form className="figma-donate-form" onSubmit={handlePledgeSubmit}>
                <div className="epl-contact-form-honeypot hidden" aria-hidden="true">
                  <label htmlFor="pledge-company">Company</label>
                  <input autoComplete="off" id="pledge-company" name="company" tabIndex={-1} type="text" />
                </div>

                {status === 'error' ? (
                  <div className="figma-donate-form__error" role="alert">
                    {errorMessage}
                  </div>
                ) : null}

                <div className="figma-donate-form__grid">
                  <div className="figma-donate-field">
                    <label htmlFor="pledge-name">Full Name *</label>
                    <input
                      id="pledge-name"
                      name="name"
                      placeholder="Your full name"
                      required
                      type="text"
                    />
                  </div>
                  <div className="figma-donate-field">
                    <label htmlFor="pledge-email">Email *</label>
                    <input
                      id="pledge-email"
                      name="email"
                      placeholder="name@example.com"
                      required
                      type="email"
                    />
                  </div>
                  <div className="figma-donate-field">
                    <label htmlFor="pledge-phone">Phone</label>
                    <input id="pledge-phone" name="phone" placeholder="+233 ..." type="tel" />
                  </div>
                  <div className="figma-donate-field">
                    <label htmlFor="pledge-country">Country *</label>
                    <input
                      id="pledge-country"
                      name="country"
                      placeholder="Ghana, United States, UK, etc."
                      required
                      type="text"
                    />
                  </div>
                  <div className="figma-donate-field">
                    <label htmlFor="pledge-amount">Pledge Amount (GHS / USD) *</label>
                    <input
                      id="pledge-amount"
                      name="pledgeAmount"
                      onChange={(e) => setPledgeAmount(e.target.value)}
                      placeholder="e.g. $1,000 or GHS 10,000"
                      required
                      type="text"
                      value={pledgeAmount}
                    />
                  </div>
                  <div className="figma-donate-field">
                    <label htmlFor="pledge-date">Pledge Date</label>
                    <input id="pledge-date" name="pledgeDate" type="date" />
                  </div>
                </div>

                <div className="figma-donate-field">
                  <label htmlFor="pledge-channel">Preferred Giving Channel *</label>
                  <select
                    id="pledge-channel"
                    name="preferredChannel"
                    onChange={(e) => setPreferredChannel(e.target.value)}
                    required
                    value={preferredChannel}
                  >
                    {pledge.channels.map((channel) => (
                      <option key={channel} value={channel}>
                        {channel}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="figma-donate-btn figma-donate-btn--blue"
                  disabled={status === 'submitting'}
                  type="submit"
                >
                  {status === 'submitting' ? 'Sending…' : pledge.submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </MotionReveal>

      {activeModal ? (
        <div
          className="figma-donate-modal"
          onClick={() => setActiveModal(null)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setActiveModal(null)
          }}
          role="presentation"
        >
          <div
            className="figma-donate-modal__panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="figma-donate-modal-title"
          >
            <div className="figma-donate-modal__header">
              <button
                aria-label="Close"
                className="figma-donate-modal__close"
                onClick={() => setActiveModal(null)}
                type="button"
              >
                ×
              </button>
              <div className="figma-donate-modal__header-eyebrow">{modal.selectedLabel}</div>
              <h2 id="figma-donate-modal-title">
                {activeModal.isCustom ? 'Custom Amount' : activeModal.amountGhs}
              </h2>
              <p>{activeModal.description}</p>
            </div>

            <div className="figma-donate-modal__body">
              {activeModal.isCustom ? (
                <div className="figma-donate-modal__custom">
                  <label htmlFor="modal-custom-amount">Enter Your Custom Amount (GHS / USD)</label>
                  <div className="figma-donate-modal__custom-wrap">
                    <span className="figma-donate-modal__custom-prefix">GHS</span>
                    <input
                      id="modal-custom-amount"
                      min="1"
                      onChange={(e) => setCustomAmountMajor(e.target.value)}
                      placeholder="e.g. 750"
                      type="number"
                      value={customAmountMajor}
                    />
                  </div>
                </div>
              ) : null}

              <span className="figma-donate-modal__label">{modal.methodLabel}</span>
              <div className="figma-donate-modal__methods">
                {(
                  [
                    ['card', 'Card', 'Visa / Master'],
                    ['bank', 'Bank', 'GHS / USD'],
                    ['momo', 'MoMo', 'MTN MoMo'],
                  ] as const
                ).map(([key, title, sub]) => (
                  <button
                    key={key}
                    className={`figma-donate-modal__method${modalMethod === key ? ' is-active' : ''}`}
                    onClick={() => setModalMethod(key)}
                    type="button"
                  >
                    <div className="figma-donate-modal__method-title">{title}</div>
                    <div className="figma-donate-modal__method-sub">{sub}</div>
                  </button>
                ))}
              </div>

              {modalMethod === 'bank' ? (
                <div className="figma-donate-details">
                  <div className="figma-donate-currency-toggle" style={{ marginBottom: 12, width: 'fit-content' }}>
                    {(['GHS', 'USD'] as const).map((currency) => (
                      <button
                        key={currency}
                        className={modalAccountCurrency === currency ? 'is-active' : undefined}
                        onClick={() => setModalAccountCurrency(currency)}
                        type="button"
                      >
                        {currency} Account{currency === 'USD' ? ' ($)' : ''}
                      </button>
                    ))}
                  </div>
                  <div className="figma-donate-details__row">
                    <span className="figma-donate-details__label">Account Name</span>
                    <strong>{ways.bank.accountName}</strong>
                  </div>
                  <div className="figma-donate-details__row">
                    <span className="figma-donate-details__label">
                      Account Number ({modalAccountCurrency})
                    </span>
                    <strong className="figma-donate-details__mono">
                      {modalAccountCurrency === 'GHS'
                        ? ways.bank.accountNumberGhs
                        : ways.bank.accountNumberUsd}
                    </strong>
                  </div>
                  <div className="figma-donate-details__row">
                    <span className="figma-donate-details__label">Bank</span>
                    <strong>
                      {ways.bank.bankName} · {ways.bank.branch}
                    </strong>
                  </div>
                  <div className="figma-donate-details__row">
                    <span className="figma-donate-details__label">SWIFT / Sort</span>
                    <strong className="figma-donate-details__mono">
                      {ways.bank.swift} · {ways.bank.sortCode}
                    </strong>
                  </div>
                </div>
              ) : null}

              {modalMethod === 'card' ? (
                <div className="figma-donate-form" style={{ gap: 14 }}>
                  <div className="figma-donate-currency-toggle" style={{ width: 'fit-content' }}>
                    {(['GHS', 'USD'] as const).map((currency) => (
                      <button
                        key={currency}
                        className={payCurrency === currency ? 'is-active' : undefined}
                        onClick={() => setPayCurrency(currency)}
                        type="button"
                      >
                        {currency}
                      </button>
                    ))}
                  </div>

                  <div className="figma-donate-field">
                    <label htmlFor="pay-name">Full Name *</label>
                    <input
                      id="pay-name"
                      onChange={(e) => setPayName(e.target.value)}
                      placeholder="Your full name"
                      type="text"
                      value={payName}
                    />
                  </div>
                  <div className="figma-donate-field">
                    <label htmlFor="pay-email">Email *</label>
                    <input
                      id="pay-email"
                      onChange={(e) => setPayEmail(e.target.value)}
                      placeholder="name@example.com"
                      type="email"
                      value={payEmail}
                    />
                  </div>
                  <div className="figma-donate-field">
                    <label htmlFor="pay-phone">Phone</label>
                    <input
                      id="pay-phone"
                      onChange={(e) => setPayPhone(e.target.value)}
                      placeholder="+233 ..."
                      type="tel"
                      value={payPhone}
                    />
                  </div>

                  {paymentError ? (
                    <div className="figma-donate-form__error" role="alert">
                      {paymentError}
                    </div>
                  ) : null}

                  <PaystackDonateCheckout
                    amountMinor={paymentAmountMinor}
                    currency={payCurrency}
                    email={payEmail}
                    enabled={paystackEnabled}
                    name={payName}
                    phone={payPhone}
                    sourcePage="Donate page — Card payment (Paystack)"
                    sourcePath="/donate"
                    tierLabel={activeModal.isCustom ? 'Custom gift' : activeModal.label}
                    buttonLabel="Pay securely with Paystack"
                    onError={(message) => {
                      if (message !== 'Payment cancelled.') setPaymentError(message)
                    }}
                    onSuccess={(reference) => {
                      setActiveModal(null)
                      setPaymentSuccess(reference)
                      setPaymentError('')
                    }}
                  />
                </div>
              ) : null}

              {modalMethod === 'momo' ? (
                <div className="figma-donate-momo-list">
                  {ways.momo.options.map((opt) => (
                    <div className="figma-donate-momo-item" key={`${opt.badge}-${opt.detail}`}>
                      <div className="figma-donate-momo-item__head">
                        <div className={`figma-donate-transfer__logo figma-donate-transfer__logo--${opt.logoTone}`}>
                          <img alt={opt.title} decoding="async" height={40} src={opt.logo} width={40} />
                        </div>
                        <span className="figma-donate-momo-item__name">{opt.title}</span>
                      </div>
                      <div className="figma-donate-momo-item__detail">
                        {opt.detailLabel}: {opt.detail}
                      </div>
                      <div className="figma-donate-momo-item__sub">{opt.name}</div>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="figma-donate-modal__actions">
                {modalMethod !== 'card' ? (
                  <button
                    className="figma-donate-btn figma-donate-btn--gold"
                    onClick={recordPledgeFromModal}
                    type="button"
                  >
                    {modal.recordLabel}
                  </button>
                ) : null}
                <button
                  className="figma-donate-modal__done"
                  onClick={() => setActiveModal(null)}
                  type="button"
                >
                  {modal.doneLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
