/**
 * Footer links shown below the admin login form.
 * Wired via admin.components.afterLogin in payload.config.ts.
 */
export function AfterLogin() {
  return (
    <footer className="epl-login-footer">
      <a className="epl-login-footer__link" href="/">
        View public website
      </a>
      <span className="epl-login-footer__divider" aria-hidden>
        ·
      </span>
      <span className="epl-login-footer__note">
        Need access? Contact your EPL Ghana administrator.
      </span>
    </footer>
  )
}
