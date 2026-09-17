import { LoginHeroPanel } from './LoginHeroPanel'
import { LoginThemeToggle } from './LoginThemeToggle'

/**
 * Branded chrome around the Payload admin login form.
 * Wired via admin.components.beforeLogin in payload.config.ts.
 */
export function BeforeLogin() {
  return (
    <>
      <LoginHeroPanel />

      <div className="epl-login-toolbar">
        <LoginThemeToggle />
      </div>

      <div className="epl-login-intro">
        <h1 className="epl-login-intro__title">Welcome back</h1>
        <p className="epl-login-intro__lead">
          Sign in to manage pages, media, and site content.
        </p>
      </div>
    </>
  )
}
