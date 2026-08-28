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

export function ChariticsDonatePage({ content, paystackEnabled = false }: Props) {
  const { hero, why, ways, tiers, pledge, modal } = content
  const [bankCurrency, setBankCurrency] = useState<'GHS' | 'USD'>('GHS')
  const [activeModal, setActiveModal] = useState<DonateTier | null>(null)
  const [modalMethod, setModalMethod] = useState<'card' | 'bank' | 'momo'>('bank')
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
      setPledgeAmount(activeModal.isCustom ? '' : activeModal.amountUsd)
      if (modalMethod === 'card') setPreferredChannel('Debit / Credit Card (Online)')
      if (modalMethod === 'bank') {
        setPreferredChannel(
          modalAccountCurrency === 'GHS'
            ? 'Bank Transfer (Ecobank GHS)'
            : 'Bank Transfer (Ecobank USD $)',
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

  const labelStyle = {
    display: 'block',
    fontSize: 11,
    fontWeight: 850,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: '#0C1427',
    marginBottom: 8,
  }

  const inputStyle = {
    width: '100%',
    background: '#F8F9FA',
    border: '1px solid #e2e5eb',
    padding: '12px 16px',
    fontSize: 14,
    color: '#0C1427',
  }

  return (
    <div className="figma-donate-page">
      {paymentSuccess ? (
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: '#ecfdf5',
            borderBottom: '1px solid #86efac',
            color: '#065f46',
            padding: '14px 20px',
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          Thank you — your donation was received successfully. Reference: {paymentSuccess}
        </div>
      ) : null}

      <section className="figma-about-hero">
        <div
          className="figma-about-hero__bg"
          style={{ backgroundImage: `url(${hero.image})` }}
        />
        <div className="figma-about-hero__overlay" />
        <div className="figma-about-hero__content">
          <div className="figma-kicker figma-kicker--gold">
            <span className="figma-kicker__line" />
            <span>{hero.eyebrow}</span>
          </div>
          <h1>{hero.title}</h1>
          <p>{hero.lead}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
            <a className="epl-new-btn epl-new-btn--gold" href={hero.primaryCtaHref}>
              {hero.primaryCtaLabel}
            </a>
            <a
              className="epl-new-btn"
              href={hero.secondaryCtaHref}
              style={{
                border: '1px solid rgba(255,255,255,0.35)',
                color: '#fff',
                background: 'transparent',
              }}
            >
              {hero.secondaryCtaLabel}
            </a>
          </div>
        </div>
      </section>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        style={{ paddingBlock: 80, background: '#fff' }}
      >
        <div className="figma-kicker figma-kicker--gold" style={{ marginBottom: 12 }}>
          <span className="figma-kicker__line" />
          <span>{why.eyebrow}</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            fontWeight: 900,
            color: '#0C1427',
            margin: '0 0 40px',
            maxWidth: 520,
            lineHeight: 1.15,
          }}
        >
          {why.title}
        </h2>
        <MotionReveal
          stagger
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 28,
          }}
        >
          {why.reasons.map((reason) => (
            <MotionItem key={reason.title}>
              <div>
                <div
                  style={{
                    width: '100%',
                    height: 3,
                    background: 'var(--epl-new-gold, #f5bd17)',
                    marginBottom: 18,
                  }}
                />
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 850,
                    color: '#0C1427',
                    margin: '0 0 10px',
                    lineHeight: 1.3,
                  }}
                >
                  {reason.title}
                </h3>
                <p style={{ fontSize: 14, color: '#636772', lineHeight: 1.6, margin: 0 }}>
                  {reason.text}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        id="ways-to-give"
        style={{ paddingBlock: 80, background: '#F8F9FA' }}
      >
        <div className="figma-kicker figma-kicker--gold" style={{ marginBottom: 12 }}>
          <span className="figma-kicker__line" />
          <span>{ways.eyebrow}</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            fontWeight: 900,
            color: '#0C1427',
            margin: '0 0 40px',
          }}
        >
          {ways.title}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          <div
            style={{
              background: '#fff',
              border: '1px solid #e2e5eb',
              borderTop: '4px solid var(--epl-new-gold, #f5bd17)',
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 12,
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 850,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--epl-new-gold, #f5bd17)',
                }}
              >
                {ways.bank.code}
              </span>
              <div style={{ display: 'flex', border: '1px solid #e2e5eb' }}>
                {(['GHS', 'USD'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setBankCurrency(c)}
                    style={{
                      padding: '6px 10px',
                      fontSize: 11,
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      background:
                        bankCurrency === c ? 'var(--epl-new-blue, #34439a)' : '#F8F9FA',
                      color: bankCurrency === c ? '#fff' : '#636772',
                    }}
                  >
                    {c === 'USD' ? 'USD ($)' : 'GHS'}
                  </button>
                ))}
              </div>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: '#0C1427', margin: '0 0 10px' }}>
              {ways.bank.title}
            </h3>
            <p style={{ fontSize: 14, color: '#636772', margin: '0 0 20px', lineHeight: 1.6 }}>
              {ways.bank.description}
            </p>
            <div
              style={{
                background: '#F8F9FA',
                border: '1px solid #eef0f4',
                padding: 18,
                fontSize: 13,
                display: 'grid',
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 10, color: '#9aa0ab', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Account Name
                </div>
                <strong>{ways.bank.accountName}</strong>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#9aa0ab', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Account Number ({bankCurrency})
                </div>
                <strong style={{ fontFamily: 'ui-monospace, monospace', fontSize: 15 }}>
                  {bankCurrency === 'GHS'
                    ? ways.bank.accountNumberGhs
                    : ways.bank.accountNumberUsd}
                </strong>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#9aa0ab', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Branch
                </div>
                <strong>{ways.bank.branch}</strong>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#9aa0ab', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  SWIFT / BIC
                </div>
                <strong style={{ fontFamily: 'ui-monospace, monospace' }}>{ways.bank.swift}</strong>
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#9aa0ab', fontStyle: 'italic', marginTop: 18 }}>
              *{ways.bank.note}
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              border: '1px solid #e2e5eb',
              borderTop: '4px solid var(--epl-new-gold, #f5bd17)',
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 850,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--epl-new-gold, #f5bd17)',
                marginBottom: 12,
              }}
            >
              {ways.momo.code}
            </span>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: '#0C1427', margin: '0 0 10px' }}>
              {ways.momo.title}
            </h3>
            <p style={{ fontSize: 14, color: '#636772', margin: '0 0 20px', lineHeight: 1.6 }}>
              {ways.momo.description}
            </p>
            <div style={{ border: '1px solid #eef0f4', background: '#F8F9FA' }}>
              {ways.momo.options.map((opt) => (
                <div
                  key={opt.name}
                  style={{
                    padding: 16,
                    borderBottom: '1px solid #eef0f4',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    alignItems: 'flex-start',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, color: '#0C1427' }}>{opt.name}</div>
                    <div style={{ fontSize: 12, color: '#636772', marginTop: 4 }}>{opt.detail}</div>
                    {opt.note ? (
                      <div style={{ fontSize: 11, color: '#9aa0ab', marginTop: 2 }}>{opt.note}</div>
                    ) : null}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 850,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      background: 'rgba(245, 189, 23, 0.2)',
                      color: '#0C1427',
                      padding: '4px 8px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {opt.badge}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#9aa0ab', fontStyle: 'italic', marginTop: 18 }}>
              *{ways.momo.note}
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              border: '1px solid #e2e5eb',
              borderTop: '4px solid var(--epl-new-gold, #f5bd17)',
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 850,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--epl-new-gold, #f5bd17)',
                marginBottom: 12,
              }}
            >
              {ways.card.code}
            </span>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: '#0C1427', margin: '0 0 10px' }}>
              {ways.card.title}
            </h3>
            <p style={{ fontSize: 14, color: '#636772', margin: '0 0 20px', lineHeight: 1.6 }}>
              {ways.card.description}
            </p>
            <div
              style={{
                background: '#F8F9FA',
                border: '1px solid #eef0f4',
                padding: 18,
                display: 'grid',
                gap: 12,
                fontSize: 13,
                flex: 1,
              }}
            >
              <div style={{ fontWeight: 800, color: 'var(--epl-new-blue, #34439a)' }}>
                {ways.card.statusLabel}
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#9aa0ab', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Accepted Cards
                </div>
                <strong>{ways.card.acceptedCards}</strong>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#9aa0ab', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Currencies Accepted
                </div>
                <strong>{ways.card.currencies}</strong>
              </div>
            </div>
            <a
              className="epl-new-btn epl-new-btn--blue"
              href="#tiers"
              style={{ marginTop: 24, width: '100%' }}
            >
              {ways.card.ctaLabel}
            </a>
            {paystackEnabled ? (
              <p style={{ fontSize: 12, color: '#636772', marginTop: 12, marginBottom: 0 }}>
                Secure card checkout powered by Paystack. Choose an amount below to pay online.
              </p>
            ) : null}
          </div>
        </div>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        id="tiers"
        style={{ paddingBlock: 80, background: '#fff' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            className="figma-kicker figma-kicker--gold"
            style={{ justifyContent: 'center', marginBottom: 12 }}
          >
            <span className="figma-kicker__line" />
            <span>{tiers.eyebrow}</span>
            <span className="figma-kicker__line" />
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              fontWeight: 900,
              color: '#0C1427',
              margin: '0 0 10px',
            }}
          >
            {tiers.title}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: '#636772',
              margin: '0 auto',
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            {tiers.intro}
          </p>
        </div>
        <MotionReveal
          stagger
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          {tiers.items.map((tier) => (
            <MotionItem key={tier.label}>
              <button
                type="button"
                onClick={() => openTierModal(tier)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 'min(200px, calc(100vw - 48px))',
                  height: '100%',
                  textAlign: 'center',
                  alignItems: 'center',
                  padding: 24,
                  background: '#fff',
                  border: '1px solid #e2e5eb',
                  borderTop: '3px solid var(--epl-new-blue, #34439a)',
                  cursor: 'pointer',
                  minHeight: 200,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 850,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#9aa0ab',
                      marginBottom: 6,
                    }}
                  >
                    {tier.isCustom ? 'Any Amount' : 'USD'}
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: '#0C1427', marginBottom: 12 }}>
                    {tier.amountDisplay}
                  </div>
                  <p style={{ fontSize: 13, color: '#636772', lineHeight: 1.5, margin: 0 }}>
                    {tier.description}
                  </p>
                </div>
                <span
                  style={{
                    marginTop: 20,
                    paddingTop: 14,
                    borderTop: '1px solid #eef0f4',
                    width: '100%',
                    fontSize: 11,
                    fontWeight: 850,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--epl-new-blue, #34439a)',
                  }}
                >
                  {tier.isCustom ? 'Custom Gift' : `Give ${tier.label}`}
                </span>
              </button>
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        id="pledge"
        style={{
          paddingBlock: 88,
          background:
            'linear-gradient(160deg, var(--epl-new-blue-dark, #172052) 0%, var(--epl-new-blue, #34439a) 100%)',
          color: '#fff',
        }}
      >
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div
              className="figma-kicker figma-kicker--gold"
              style={{ justifyContent: 'center', marginBottom: 12 }}
            >
              <span className="figma-kicker__line" />
              <span>{pledge.eyebrow}</span>
              <span className="figma-kicker__line" />
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.4vw, 42px)',
                fontWeight: 900,
                margin: '0 0 12px',
                color: '#fff',
              }}
            >
              {pledge.title}
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)', margin: 0, lineHeight: 1.6 }}>
              {pledge.description}
            </p>
          </div>

          <div
            style={{
              padding: '36px 32px',
              background: '#fff',
              borderTop: '4px solid var(--epl-new-gold, #f5bd17)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
            }}
          >
            {status === 'success' ? (
              <div
                style={{
                  padding: 24,
                  border: '1px solid var(--epl-new-gold, #f5bd17)',
                  background: 'rgba(245, 189, 23, 0.12)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: '#0C1427',
                    marginBottom: 8,
                  }}
                >
                  {pledge.successTitle}
                </div>
                <p style={{ fontSize: 14, color: '#636772', margin: 0 }}>{pledge.successText}</p>
              </div>
            ) : (
              <form onSubmit={handlePledgeSubmit} style={{ display: 'grid', gap: 18 }}>
                <div className="epl-contact-form-honeypot hidden" aria-hidden="true">
                  <label htmlFor="pledge-company">Company</label>
                  <input autoComplete="off" id="pledge-company" name="company" tabIndex={-1} type="text" />
                </div>

                {status === 'error' ? (
                  <div
                    role="alert"
                    style={{
                      padding: 14,
                      background: '#fff1f2',
                      border: '1px solid #fecdd3',
                      color: '#9f1239',
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {errorMessage}
                  </div>
                ) : null}

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 16,
                  }}
                >
                  <div>
                    <label htmlFor="pledge-name" style={labelStyle}>
                      Full Name *
                    </label>
                    <input
                      id="pledge-name"
                      name="name"
                      placeholder="Your full name"
                      required
                      style={inputStyle}
                      type="text"
                    />
                  </div>
                  <div>
                    <label htmlFor="pledge-email" style={labelStyle}>
                      Email *
                    </label>
                    <input
                      id="pledge-email"
                      name="email"
                      placeholder="name@example.com"
                      required
                      style={inputStyle}
                      type="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="pledge-phone" style={labelStyle}>
                      Phone
                    </label>
                    <input
                      id="pledge-phone"
                      name="phone"
                      placeholder="+233 ..."
                      style={inputStyle}
                      type="tel"
                    />
                  </div>
                  <div>
                    <label htmlFor="pledge-country" style={labelStyle}>
                      Country *
                    </label>
                    <input
                      id="pledge-country"
                      name="country"
                      placeholder="Ghana, United States, UK, etc."
                      required
                      style={inputStyle}
                      type="text"
                    />
                  </div>
                  <div>
                    <label htmlFor="pledge-amount" style={labelStyle}>
                      Pledge Amount (GHS / USD) *
                    </label>
                    <input
                      id="pledge-amount"
                      name="pledgeAmount"
                      onChange={(e) => setPledgeAmount(e.target.value)}
                      placeholder="e.g. $1,000 or GHS 10,000"
                      required
                      style={inputStyle}
                      type="text"
                      value={pledgeAmount}
                    />
                  </div>
                  <div>
                    <label htmlFor="pledge-date" style={labelStyle}>
                      Pledge Date
                    </label>
                    <input id="pledge-date" name="pledgeDate" style={inputStyle} type="date" />
                  </div>
                </div>

                <div>
                  <label htmlFor="pledge-channel" style={labelStyle}>
                    Preferred Giving Channel *
                  </label>
                  <select
                    id="pledge-channel"
                    name="preferredChannel"
                    onChange={(e) => setPreferredChannel(e.target.value)}
                    required
                    style={inputStyle}
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
                  className="epl-new-btn epl-new-btn--gold"
                  disabled={status === 'submitting'}
                  style={{ width: '100%', minHeight: 52 }}
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
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            background: 'rgba(12, 20, 39, 0.78)',
          }}
          onClick={() => setActiveModal(null)}
        >
          <div
            style={{
              width: 'min(480px, 100%)',
              background: '#fff',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                background: 'var(--epl-new-blue, #34439a)',
                color: '#fff',
                padding: '22px 24px',
                position: 'relative',
              }}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setActiveModal(null)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  border: 'none',
                  background: 'rgba(0,0,0,0.25)',
                  color: '#fff',
                  width: 32,
                  height: 32,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 850,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--epl-new-gold, #f5bd17)',
                  marginBottom: 6,
                }}
              >
                {modal.selectedLabel}
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 6px' }}>
                {activeModal.isCustom ? 'Custom Amount' : activeModal.amountGhs}
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                {activeModal.description}
              </p>
            </div>

            <div style={{ padding: 24 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 850,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#9aa0ab',
                  marginBottom: 12,
                }}
              >
                {modal.methodLabel}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
                {(
                  [
                    ['card', 'Card', 'Visa / Master'],
                    ['bank', 'Bank', 'GHS / USD'],
                    ['momo', 'MoMo', 'MTN / Telecel'],
                  ] as const
                ).map(([key, title, sub]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setModalMethod(key)}
                    style={{
                      padding: 12,
                      textAlign: 'left',
                      border:
                        modalMethod === key
                          ? '1px solid var(--epl-new-blue, #34439a)'
                          : '1px solid #e2e5eb',
                      background: modalMethod === key ? '#fff' : '#F8F9FA',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{title}</div>
                    <div style={{ fontSize: 11, color: '#636772' }}>{sub}</div>
                  </button>
                ))}
              </div>

              {modalMethod === 'bank' ? (
                <div style={{ background: '#F8F9FA', border: '1px solid #e2e5eb', padding: 18 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    {(['GHS', 'USD'] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setModalAccountCurrency(c)}
                        style={{
                          padding: '6px 12px',
                          fontSize: 12,
                          fontWeight: 800,
                          border: 'none',
                          cursor: 'pointer',
                          background:
                            modalAccountCurrency === c
                              ? 'var(--epl-new-blue, #34439a)'
                              : '#eaedf5',
                          color: modalAccountCurrency === c ? '#fff' : '#374151',
                        }}
                      >
                        {c} Account{c === 'USD' ? ' ($)' : ''}
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: 13, display: 'grid', gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#9aa0ab', textTransform: 'uppercase' }}>
                        Account Name
                      </div>
                      <strong>{ways.bank.accountName}</strong>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#9aa0ab', textTransform: 'uppercase' }}>
                        Account Number ({modalAccountCurrency})
                      </div>
                      <strong style={{ fontFamily: 'ui-monospace, monospace' }}>
                        {modalAccountCurrency === 'GHS'
                          ? ways.bank.accountNumberGhs
                          : ways.bank.accountNumberUsd}
                      </strong>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#9aa0ab', textTransform: 'uppercase' }}>
                        Bank / SWIFT
                      </div>
                      <strong>
                        {ways.bank.title} · SWIFT: {ways.bank.swift}
                      </strong>
                    </div>
                  </div>
                </div>
              ) : null}

              {modalMethod === 'card' ? (
                <div style={{ display: 'grid', gap: 14 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {(['GHS', 'USD'] as const).map((currency) => (
                      <button
                        key={currency}
                        type="button"
                        onClick={() => setPayCurrency(currency)}
                        style={{
                          padding: '6px 12px',
                          fontSize: 12,
                          fontWeight: 800,
                          border: 'none',
                          cursor: 'pointer',
                          background:
                            payCurrency === currency
                              ? 'var(--epl-new-blue, #34439a)'
                              : '#eaedf5',
                          color: payCurrency === currency ? '#fff' : '#374151',
                        }}
                      >
                        {currency}
                      </button>
                    ))}
                  </div>

                  {activeModal.isCustom ? (
                    <div>
                      <label htmlFor="pay-custom-amount" style={labelStyle}>
                        Amount ({payCurrency}) *
                      </label>
                      <input
                        id="pay-custom-amount"
                        onChange={(e) => setCustomAmountMajor(e.target.value)}
                        placeholder={payCurrency === 'USD' ? 'e.g. 100' : 'e.g. 500'}
                        style={inputStyle}
                        type="number"
                        min="1"
                        step="0.01"
                        value={customAmountMajor}
                      />
                    </div>
                  ) : null}

                  <div>
                    <label htmlFor="pay-name" style={labelStyle}>
                      Full Name *
                    </label>
                    <input
                      id="pay-name"
                      onChange={(e) => setPayName(e.target.value)}
                      placeholder="Your full name"
                      style={inputStyle}
                      type="text"
                      value={payName}
                    />
                  </div>
                  <div>
                    <label htmlFor="pay-email" style={labelStyle}>
                      Email *
                    </label>
                    <input
                      id="pay-email"
                      onChange={(e) => setPayEmail(e.target.value)}
                      placeholder="name@example.com"
                      style={inputStyle}
                      type="email"
                      value={payEmail}
                    />
                  </div>
                  <div>
                    <label htmlFor="pay-phone" style={labelStyle}>
                      Phone
                    </label>
                    <input
                      id="pay-phone"
                      onChange={(e) => setPayPhone(e.target.value)}
                      placeholder="+233 ..."
                      style={inputStyle}
                      type="tel"
                      value={payPhone}
                    />
                  </div>

                  {paymentError ? (
                    <div
                      role="alert"
                      style={{
                        padding: 12,
                        background: '#fff1f2',
                        border: '1px solid #fecdd3',
                        color: '#9f1239',
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
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
                <div style={{ background: '#F8F9FA', border: '1px solid #e2e5eb', padding: 18, display: 'grid', gap: 10 }}>
                  {ways.momo.options.map((opt) => (
                    <div key={opt.name}>
                      <div style={{ fontSize: 10, color: '#9aa0ab', textTransform: 'uppercase' }}>
                        {opt.name}
                      </div>
                      <strong style={{ fontFamily: 'ui-monospace, monospace' }}>{opt.detail}</strong>
                    </div>
                  ))}
                </div>
              ) : null}

              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                {modalMethod !== 'card' ? (
                  <button
                    type="button"
                    className="epl-new-btn epl-new-btn--gold"
                    onClick={recordPledgeFromModal}
                    style={{ flex: 1 }}
                  >
                    {modal.recordLabel}
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  style={{
                    padding: '0 20px',
                    border: '1px solid #d1d5db',
                    background: '#fff',
                    fontWeight: 800,
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
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
