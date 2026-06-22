import type { AdminViewServerProps } from 'payload'
import { formatAdminURL } from 'payload/shared'
import { redirect } from 'next/navigation'
import { Secret, TOTP } from 'otpauth'

import { CMS_PRODUCT_NAME } from '@/config/brand'
import { TOTP_CONFIG } from '@/config/totp'
import { Logo } from '@/components/admin/Logo'

import { EplAuthenticatorSetupCard } from './EplAuthenticatorSetupCard'
import { EplEmailOtpPanel } from './EplEmailOtpPanel'
import { EplQrCode } from './EplQrCode'
import { EplTotpExitLink } from './EplTotpExitLink'
import { EplTotpManualSecret } from './EplTotpManualSecret'

type UserWithTotp = {
  email?: string
  username?: string
  hasTotp?: boolean
}

/**
 * Branded MFA enrolment screen (shown once, before a user can use the CMS).
 * Generates a fresh secret, renders a QR code + manual key in a branded panel,
 * and verifies the first code. Users who aren't ready can sign out via the exit
 * link. Layout mirrors the .epl-totp grid styles in (payload)/custom.scss.
 */
export function EplTotpSetup({ initPageResult, searchParams }: AdminViewServerProps) {
  const {
    req: {
      payload: {
        config: {
          admin: { user: userSlug },
          routes: { admin: adminRoute, api: apiRoute },
          serverURL,
        },
      },
      user: rawUser,
    },
  } = initPageResult

  const user = rawUser as UserWithTotp | null | undefined

  if (!user) {
    redirect(formatAdminURL({ adminRoute, path: '/login', serverURL }))
  }

  if (user.hasTotp) {
    redirect(formatAdminURL({ adminRoute, path: '/', serverURL }))
  }

  const back = typeof searchParams?.back === 'string' ? searchParams.back : undefined
  const redirectTo = back || formatAdminURL({ adminRoute, path: '/', serverURL })

  const secret = new Secret({ size: 32 })
  const totp = new TOTP({
    algorithm: 'SHA1',
    digits: TOTP_CONFIG.digits,
    issuer: TOTP_CONFIG.issuer,
    label: user.email || user.username || CMS_PRODUCT_NAME,
    period: TOTP_CONFIG.period,
    secret,
  })

  return (
    <section className="epl-totp epl-totp--setup login template-minimal template-minimal--width-normal">
      <div className="epl-totp__grid">
        <div className="epl-totp__column epl-totp__column--main">
          <div className="epl-totp__brand">
            <Logo />
          </div>

          <div className="epl-totp__hero">
            <p className="epl-totp__eyebrow">Secure your account</p>
            <h1 className="epl-totp__title">Set up two-factor authentication</h1>
            <p className="epl-totp__lead">
              Add a second step at sign-in so your <strong>{CMS_PRODUCT_NAME}</strong>{' '}
              account stays protected even if your password is ever guessed.
            </p>
          </div>

          <ol className="epl-totp__steps">
            <li className="epl-totp__step">
              <span className="epl-totp__step-num">1</span>
              <div>
                <strong>Open an authenticator app</strong>
                <p className="epl-totp__step-copy">
                  On your phone, open the app you use for one-time codes.
                </p>
                <div className="epl-totp__apps">
                  <span className="epl-totp__app-pill">Google Authenticator</span>
                  <span className="epl-totp__app-pill">Microsoft Authenticator</span>
                  <span className="epl-totp__app-pill">1Password</span>
                </div>
              </div>
            </li>
            <li className="epl-totp__step">
              <span className="epl-totp__step-num">2</span>
              <div>
                <strong>Scan the QR code</strong>
                <p className="epl-totp__step-copy">
                  Scan the code on the right, or tap “Enter key manually”.
                </p>
              </div>
            </li>
            <li className="epl-totp__step">
              <span className="epl-totp__step-num">3</span>
              <div>
                <strong>Enter your 6-digit code</strong>
                <p className="epl-totp__step-copy">
                  Type the current code from your app below to finish.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="epl-totp__column epl-totp__column--qr">
          <div className="epl-totp__panel">
            <span aria-hidden className="epl-totp__panel-glow" />
            <div className="epl-totp__panel-inner">
              <div className="epl-totp__qr-card">
                <EplQrCode totp={totp} />
              </div>
              <EplTotpManualSecret secret={secret.base32} />
            </div>
          </div>
        </div>

        <div className="epl-totp__column epl-totp__column--finish">
          <div className="epl-totp__methods epl-totp__methods--setup">
            <EplAuthenticatorSetupCard
              apiRoute={apiRoute}
              length={TOTP_CONFIG.digits}
              redirectTo={redirectTo}
              secret={secret.base32}
              serverURL={serverURL}
            />

            <div aria-hidden className="epl-totp__methods-or">
              <span>or</span>
            </div>

            <EplEmailOtpPanel
              apiRoute={apiRoute}
              email={user.email}
              redirectTo={redirectTo}
              serverURL={serverURL}
              setup
            />
          </div>

          <EplTotpExitLink
            adminRoute={adminRoute}
            apiRoute={apiRoute}
            serverURL={serverURL}
            userSlug={userSlug}
          />
        </div>
      </div>
    </section>
  )
}
