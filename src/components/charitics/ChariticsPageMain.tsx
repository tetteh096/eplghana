import type { ReactNode } from 'react'

import { ChariticsBreadcrumb } from '@/components/charitics/ChariticsBreadcrumb'
import { getPageBanner } from '@/utilities/getPageBanner'

type Crumb = {
  href?: string
  label: string
}

type ChariticsPageMainProps = {
  children: ReactNode
  crumbs?: Crumb[]
  title: string
  /**
   * Banner background photo. Pass one directly for detail pages (e.g. an
   * event/article/project's own featured image). When omitted, the banner is
   * matched from the CMS Page Banners global by `title`.
   */
  backgroundImage?: string | null
}

export async function ChariticsPageMain({
  title,
  crumbs,
  children,
  backgroundImage,
}: ChariticsPageMainProps) {
  // An explicit image (detail pages) wins; otherwise look the page up by title.
  const banner = backgroundImage ?? (await getPageBanner(title))

  return (
    <main>
      <ChariticsBreadcrumb backgroundImage={banner} crumbs={crumbs} title={title} />
      {children}
    </main>
  )
}
