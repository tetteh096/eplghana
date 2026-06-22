'use client'

import { useId, useState } from 'react'

import { EplAuthenticatorSetupCard } from './EplAuthenticatorSetupCard'
import { EplAuthenticatorVerifyCard } from './EplAuthenticatorVerifyCard'
import { EplEmailOtpPanel } from './EplEmailOtpPanel'

type Tab = 'app' | 'email'

type BaseProps = {
  apiRoute: string
  email?: string
  redirectTo: string
  serverURL: string
}

type VerifyProps = BaseProps & {
  mode: 'verify'
}

type SetupProps = BaseProps & {
  mode: 'setup'
  secret: string
  totpLength?: number
}

type Props = VerifyProps | SetupProps

function AppTabIcon() {
  return (
    <svg aria-hidden fill="none" height="18" viewBox="0 0 24 24" width="18">
      <rect height="16" rx="3" stroke="currentColor" strokeWidth="1.6" width="12" x="6" y="4" />
      <path d="M10 17h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  )
}

function MailTabIcon() {
  return (
    <svg aria-hidden fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m5 7.5 7 5.5 7-5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

export function EplMfaTabs(props: Props) {
  const { apiRoute, email, redirectTo, serverURL } = props
  const [tab, setTab] = useState<Tab>('app')
  const baseId = useId()
  const appTabId = `${baseId}-app-tab`
  const emailTabId = `${baseId}-email-tab`
  const appPanelId = `${baseId}-app-panel`
  const emailPanelId = `${baseId}-email-panel`

  return (
    <div className="epl-totp__tabs">
      <div className="epl-totp__tablist" role="tablist" aria-label="Verification method">
        <button
          aria-controls={appPanelId}
          aria-selected={tab === 'app'}
          className={`epl-totp__tab${tab === 'app' ? ' epl-totp__tab--active' : ''}`}
          id={appTabId}
          onClick={() => setTab('app')}
          role="tab"
          type="button"
        >
          <AppTabIcon />
          Authenticator
        </button>
        <button
          aria-controls={emailPanelId}
          aria-selected={tab === 'email'}
          className={`epl-totp__tab${tab === 'email' ? ' epl-totp__tab--active' : ''}`}
          id={emailTabId}
          onClick={() => setTab('email')}
          role="tab"
          type="button"
        >
          <MailTabIcon />
          Email
        </button>
      </div>

      <div
        aria-labelledby={appTabId}
        className="epl-totp__tabpanel"
        hidden={tab !== 'app'}
        id={appPanelId}
        role="tabpanel"
      >
        {props.mode === 'verify' ? (
          <EplAuthenticatorVerifyCard
            apiRoute={apiRoute}
            compact
            redirectTo={redirectTo}
            serverURL={serverURL}
          />
        ) : (
          <EplAuthenticatorSetupCard
            apiRoute={apiRoute}
            compact
            length={props.totpLength}
            redirectTo={redirectTo}
            secret={props.secret}
            serverURL={serverURL}
          />
        )}
      </div>

      <div
        aria-labelledby={emailTabId}
        className="epl-totp__tabpanel"
        hidden={tab !== 'email'}
        id={emailPanelId}
        role="tabpanel"
      >
        <EplEmailOtpPanel
          apiRoute={apiRoute}
          compact
          email={email}
          redirectTo={redirectTo}
          serverURL={serverURL}
          setup={props.mode === 'setup'}
        />
      </div>
    </div>
  )
}
