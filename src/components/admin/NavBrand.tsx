import { CMS_NAME, EPL_LOGO_SRC } from '@/config/brand'

/**
 * Branded header block at the top of the admin sidebar.
 * Wired via admin.components.beforeNav in payload.config.ts.
 */
export function NavBrand() {
  return (
    <a className="epl-nav-brand" href="/admin">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className="epl-nav-brand__logo" src={EPL_LOGO_SRC} />
      <span className="epl-nav-brand__text">
        <strong className="epl-nav-brand__title">EPL Ghana</strong>
        <span className="epl-nav-brand__subtitle">{CMS_NAME}</span>
      </span>
    </a>
  )
}
