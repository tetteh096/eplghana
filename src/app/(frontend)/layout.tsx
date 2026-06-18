import type { ReactNode } from 'react'

import { RefreshRouteOnSave } from '@/components/admin/RefreshRouteOnSave'
import { ChariticsChrome } from '@/components/charitics/ChariticsChrome'
import { EPL_LOGO_SRC } from '@/config/brand'
import { getFooter } from '@/utilities/getFooter'
import { getHeader } from '@/utilities/getHeader'
import { getSiteSettings } from '@/utilities/payloadSafe'

export const metadata = {
  description:
    'Emerging Public Leaders of Ghana, empowering the next generation of public sector leaders.',
  icons: {
    apple: EPL_LOGO_SRC,
    icon: EPL_LOGO_SRC,
  },
  title: {
    default: 'EPL Ghana',
    template: '%s | EPL Ghana',
  },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [settings, header, footer] = await Promise.all([
    getSiteSettings(1),
    getHeader(),
    getFooter(),
  ])

  return (
    <html lang="en">
      <head>
        <link href="/assets/icon/flaticon_charitics.css" rel="stylesheet" />
        <link href="/assets/vendor/bootstrap/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/vendor/splide/splide.min.css" rel="stylesheet" />
        <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />
        <link href="/assets/vendor/animate-wow/animate.min.css" rel="stylesheet" />
        <link href="/assets/css/style.css" rel="stylesheet" />
        <link href="/assets/css/epl-theme.css" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <RefreshRouteOnSave />
        <ChariticsChrome cta={header.cta} footer={footer} nav={header.nav} settings={settings}>
          {children}
        </ChariticsChrome>
      </body>
    </html>
  )
}
