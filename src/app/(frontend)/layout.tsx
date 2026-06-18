import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { RefreshRouteOnSave } from '@/components/admin/RefreshRouteOnSave'
import { ChariticsChrome } from '@/components/charitics/ChariticsChrome'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import { EPL_LOGO_SRC } from '@/config/brand'
import {
  SITE_DESCRIPTION,
  SITE_INDEXABLE,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_SHORT_NAME,
  SITE_URL,
} from '@/config/site'
import { getFooter } from '@/utilities/getFooter'
import { getHeader } from '@/utilities/getHeader'
import { getSiteSettings } from '@/utilities/payloadSafe'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_SHORT_NAME} | ${SITE_NAME}`,
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_SHORT_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Nonprofit',
  // Until NEXT_PUBLIC_SITE_INDEXABLE=true (production only), tell crawlers to
  // stay away. Flip the env var when the real domain is ready to be indexed.
  robots: SITE_INDEXABLE
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      }
    : { index: false, follow: false, nocache: true },
  icons: {
    apple: EPL_LOGO_SRC,
    icon: EPL_LOGO_SRC,
    shortcut: EPL_LOGO_SRC,
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_SHORT_NAME} | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_GB',
    images: [
      {
        url: SITE_OG_IMAGE,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_SHORT_NAME} | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a3d6b',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
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
        <OrganizationJsonLd
          address={settings.address}
          email={settings.email}
          logo={EPL_LOGO_SRC}
          phone={settings.phone}
          sameAs={[
            settings.facebook,
            settings.twitter,
            settings.instagram,
            settings.youtube,
          ]}
        />
        <RefreshRouteOnSave />
        <ChariticsChrome cta={header.cta} footer={footer} nav={header.nav} settings={settings}>
          {children}
        </ChariticsChrome>
      </body>
    </html>
  )
}
