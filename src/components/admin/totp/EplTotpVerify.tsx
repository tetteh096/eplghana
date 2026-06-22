import type { AdminViewServerProps } from 'payload'
import { formatAdminURL } from 'payload/shared'
import { redirect } from 'next/navigation'

import { CMS_PRODUCT_NAME } from '@/config/brand'
import { isEmailMfaUser } from '@/auth/emailMfaShared'
import { TOTP_CONFIG } from '@/config/totp'
import { Logo } from '@/components/admin/Logo'

import { EplEmailOtpPanel } from './EplEmailOtpPanel'
import { EplTotpExitLink } from './EplTotpExitLink'
import { EplTotpVerifyForm } from './EplTotpVerifyForm'

type UserWithTotp = {
  email?: string
  hasTotp?: boolean
  mfaMethod?: string
  strategy?: string
  totpSecret?: string
}

/**
 * Branded MFA verification screen (after email/password on each new session).
 */
export function EplTotpVerify({
  initPageResult,
  searchParams,
}: AdminViewServerProps) {
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
  const back = typeof searchParams?.back === 'string' ? searchParams.back : undefined
  const redirectTo =
    back ||
    formatAdminURL({
      adminRoute,
      path: '/',
      serverURL,
    })

  if (!user) {
    redirect(
      formatAdminURL({
        adminRoute,
        path: '/login',
        serverURL,
      }),
    )
  }

  if (!user.hasTotp || (user.hasTotp && user.strategy === 'totp')) {
    redirect(
      formatAdminURL({
        adminRoute,
        path: '/',
        serverURL,
      }),
    )
  }

  const emailMfaOnly = isEmailMfaUser(user)

  return (
    <section className="epl-totp epl-totp--verify login template-minimal template-minimal--width-normal">
      <div className="template-minimal__wrap">
        <div className="epl-totp__brand">
          <Logo />
        </div>

        <div className="epl-totp__verify-badge" aria-hidden>
          <svg fill="none" height="26" viewBox="0 0 24 24" width="26">
            <path
              d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Zm-2 6V6a2 2 0 1 1 4 0v2h-4Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="epl-totp__hero epl-totp__hero--compact">
          <p className="epl-totp__eyebrow">Two-factor check</p>
          <h1 className="epl-totp__title">
            {emailMfaOnly ? 'Enter your email code' : 'Enter your authenticator code'}
          </h1>
          <p className="epl-totp__lead">
            {emailMfaOnly ? (
              <>
                We&apos;ll send a one-time code to your email so you can finish signing in to{' '}
                <strong>{CMS_PRODUCT_NAME}</strong>.
              </>
            ) : (
              <>
                Open your authenticator app and enter the current 6-digit code for{' '}
                <strong>{CMS_PRODUCT_NAME}</strong>. You&apos;ll continue automatically when
                it&apos;s correct.
              </>
            )}
          </p>
        </div>

        {emailMfaOnly ? (
          <EplEmailOtpPanel
            apiRoute={apiRoute}
            autoSend
            defaultActive
            email={user.email}
            redirectTo={redirectTo}
            serverURL={serverURL}
            showToggle={false}
          />
        ) : (
          <>
            <EplTotpVerifyForm
              apiRoute={apiRoute}
              length={TOTP_CONFIG.digits}
              redirectTo={redirectTo}
              serverURL={serverURL}
            />

            <EplEmailOtpPanel
              apiRoute={apiRoute}
              email={user.email}
              redirectTo={redirectTo}
              serverURL={serverURL}
            />
          </>
        )}

        <EplTotpExitLink
          adminRoute={adminRoute}
          apiRoute={apiRoute}
          serverURL={serverURL}
          userSlug={userSlug}
        />
      </div>
    </section>
  )
}
