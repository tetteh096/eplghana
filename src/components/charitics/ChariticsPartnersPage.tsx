'use client'

import { useState, type CSSProperties } from 'react'

import { ChariticsContactForm } from '@/components/charitics/ChariticsContactForm'
import { MotionItem, MotionReveal } from '@/components/charitics/MotionReveal'
import type { PartnerEntry } from '@/config/partnersPageContent'
import type { PartnersPageContent } from '@/utilities/getPartnersPageContent'

type ChariticsPartnersPageProps = {
  content: PartnersPageContent
}

function PartnerTile({ partner }: { partner: PartnerEntry }) {
  const inner = (
    <>
      {partner.logo ? (
        <img
          alt={partner.name}
          src={partner.logo}
          style={{
            maxHeight: 48,
            maxWidth: '100%',
            objectFit: 'contain',
            marginBottom: 10,
          }}
        />
      ) : null}
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: '#0C1427',
          lineHeight: 1.35,
          textAlign: 'center',
        }}
      >
        {partner.shortName || partner.name}
      </div>
    </>
  )

  const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 128,
    padding: 20,
    background: '#F8F9FA',
    border: '1px solid #e2e5eb',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'border-color 0.2s ease',
  }

  if (partner.href) {
    return (
      <a href={partner.href} rel="noopener noreferrer" style={style} target="_blank">
        {inner}
      </a>
    )
  }

  return <div style={style}>{inner}</div>
}

export function ChariticsPartnersPage({ content }: ChariticsPartnersPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const {
    hero,
    collaboration,
    ecosystem,
    network,
    partners,
    partnerOrganizations,
    form,
  } = content

  const networkPartners = [...partners.items, ...partnerOrganizations.items]

  return (
    <div className="figma-partners-page">
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
          <p style={{ marginTop: 28 }}>
            <a className="epl-new-btn epl-new-btn--gold" href={hero.ctaHref}>
              {hero.ctaLabel}
            </a>
          </p>
        </div>
      </section>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        style={{ paddingBlock: 80, background: '#fff' }}
      >
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <div className="figma-kicker figma-kicker--gold" style={{ marginBottom: 12 }}>
            <span className="figma-kicker__line" />
            <span>{collaboration.eyebrow}</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.4vw, 42px)',
              fontWeight: 900,
              color: '#0C1427',
              margin: '0 0 16px',
              lineHeight: 1.15,
            }}
          >
            {collaboration.title}
          </h2>
          <p style={{ fontSize: 16, color: '#636772', lineHeight: 1.7, margin: 0 }}>
            {collaboration.lead}
          </p>
        </div>

        <MotionReveal
          stagger
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            marginBottom: 40,
          }}
        >
          {collaboration.benefits.map((benefit) => (
            <MotionItem key={benefit.title}>
              <div
                style={{
                  height: '100%',
                  padding: 28,
                  background: '#F8F9FA',
                  border: '1px solid #e2e5eb',
                  borderTop: '3px solid var(--epl-new-blue, #34439a)',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 850,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--epl-new-gold, #f5bd17)',
                    marginBottom: 8,
                  }}
                >
                  {benefit.eyebrow}
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 850,
                    color: '#0C1427',
                    margin: '0 0 10px',
                  }}
                >
                  {benefit.title}
                </h3>
                <p style={{ fontSize: 14, color: '#636772', lineHeight: 1.6, margin: 0 }}>
                  {benefit.text}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionReveal>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 24,
            padding: '36px 40px',
            background: 'var(--epl-new-blue-dark, #172052)',
            borderTop: '4px solid var(--epl-new-gold, #f5bd17)',
            color: '#fff',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(40px, 6vw, 56px)',
              fontWeight: 900,
              color: 'var(--epl-new-gold, #f5bd17)',
              lineHeight: 1,
            }}
          >
            {collaboration.highlightValue}
          </div>
          <div style={{ maxWidth: 520 }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>
              {collaboration.highlightTitle}
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.6 }}>
              {collaboration.highlightText}
            </p>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        style={{ paddingBlock: 80, background: '#F8F9FA' }}
      >
        <div className="figma-kicker figma-kicker--gold" style={{ marginBottom: 12 }}>
          <span className="figma-kicker__line" />
          <span>{ecosystem.eyebrow}</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(28px, 3.4vw, 42px)',
            fontWeight: 900,
            color: '#0C1427',
            margin: '0 0 10px',
          }}
        >
          {ecosystem.title}
        </h2>
        <p style={{ fontSize: 16, color: '#636772', margin: '0 0 40px', maxWidth: 640 }}>
          {ecosystem.intro}
        </p>

        <MotionReveal
          stagger
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {ecosystem.categories.map((cat) => {
            const open = selectedCategory === cat.id
            return (
              <MotionItem key={cat.id}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(open ? null : cat.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    textAlign: 'left',
                    padding: 28,
                    background: '#fff',
                    border: open
                      ? '1px solid var(--epl-new-blue, #34439a)'
                      : '1px solid #e2e5eb',
                    cursor: 'pointer',
                    boxShadow: open ? '0 0 0 1px var(--epl-new-blue, #34439a)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: 'var(--epl-new-blue, #34439a)',
                      marginBottom: 12,
                    }}
                  >
                    {cat.id}
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 850,
                      color: '#0C1427',
                      margin: '0 0 10px',
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: '#636772',
                      lineHeight: 1.6,
                      margin: '0 0 20px',
                    }}
                  >
                    {cat.description}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 12,
                      fontWeight: 850,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--epl-new-blue, #34439a)',
                    }}
                  >
                    <span>{open ? ecosystem.closeLabel : ecosystem.learnMoreLabel}</span>
                    <span aria-hidden>{open ? '−' : '+'}</span>
                  </div>
                  {open && cat.highlights.length > 0 ? (
                    <div
                      style={{
                        marginTop: 20,
                        paddingTop: 20,
                        borderTop: '1px solid #eef0f4',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 850,
                          color: '#0C1427',
                          marginBottom: 10,
                        }}
                      >
                        {ecosystem.highlightsLabel}
                      </div>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {cat.highlights.map((h) => (
                          <li
                            key={h}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              fontSize: 13,
                              color: '#636772',
                              marginBottom: 8,
                            }}
                          >
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                background: 'var(--epl-new-gold, #f5bd17)',
                                flexShrink: 0,
                              }}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </button>
              </MotionItem>
            )
          })}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        style={{ paddingBlock: 80, background: '#fff' }}
      >
        <div className="figma-kicker figma-kicker--gold" style={{ marginBottom: 12 }}>
          <span className="figma-kicker__line" />
          <span>{network.eyebrow}</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(28px, 3.4vw, 42px)',
            fontWeight: 900,
            color: '#0C1427',
            margin: '0 0 10px',
          }}
        >
          {network.title}
        </h2>
        <p style={{ fontSize: 16, color: '#636772', margin: '0 0 40px', maxWidth: 640 }}>
          {network.intro}
        </p>

        <MotionReveal
          stagger
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 16,
          }}
        >
          {networkPartners.map((partner) => (
            <MotionItem key={partner.id}>
              <PartnerTile partner={partner} />
            </MotionItem>
          ))}
        </MotionReveal>
      </MotionReveal>

      <MotionReveal
        as="section"
        className="figma-section epl-new-shell"
        id="enquiry"
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
              <span>{form.eyebrow}</span>
              <span className="figma-kicker__line" />
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.4vw, 42px)',
                fontWeight: 900,
                color: '#fff',
                margin: '0 0 12px',
              }}
            >
              {form.title}
            </h2>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.82)',
                margin: 0,
                maxWidth: 480,
                marginInline: 'auto',
                lineHeight: 1.6,
              }}
            >
              {form.description}
            </p>
          </div>

          <div
            className="epl-partners-enquiry"
            style={{
              padding: '36px 32px',
              background: '#fff',
              borderTop: '4px solid var(--epl-new-gold, #f5bd17)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
            }}
          >
            <ChariticsContactForm
              formId="partners-enquiry"
              sourcePage="Partners page — Partnership form"
              sourcePath="/community/partners"
              submitLabel={form.submitLabel}
              tone="light"
              variant="partnership"
            />
          </div>
        </div>
      </MotionReveal>
    </div>
  )
}
