import { CMS_NAME, EPL_LOGO_SRC } from '@/config/brand'

/**
 * Brand logo shown on the Payload admin login screen.
 * Wired via admin.components.graphics.Logo in payload.config.ts.
 */
export function Logo() {
  return (
    <div className="epl-login-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="EPL Ghana" className="epl-login-logo__mark" src={EPL_LOGO_SRC} />
      <span className="epl-login-logo__badge">{CMS_NAME}</span>
    </div>
  )
}
