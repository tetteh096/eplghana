import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/config/site'

type OrgJsonLdProps = {
  logo: string
  email?: string | null
  phone?: string | null
  address?: string | null
  sameAs?: (string | null | undefined)[]
}

/**
 * Organization + WebSite structured data (schema.org / JSON-LD).
 * Helps Google show a rich knowledge panel and sitelinks search box.
 */
export function OrganizationJsonLd({ logo, email, phone, address, sameAs }: OrgJsonLdProps) {
  const social = (sameAs ?? []).filter(
    (url): url is string => typeof url === 'string' && /^https?:\/\//i.test(url),
  )

  const graph = [
    {
      '@type': 'NGO',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: 'EPL Ghana',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: absoluteUrl(logo) },
      description: SITE_DESCRIPTION,
      ...(email ? { email } : {}),
      ...(phone ? { telephone: phone } : {}),
      ...(address
        ? {
            address: {
              '@type': 'PostalAddress',
              streetAddress: address,
              addressLocality: 'Accra',
              addressCountry: 'GH',
            },
          }
        : {}),
      ...(social.length ? { sameAs: social } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
    },
  ]

  const jsonLd = { '@context': 'https://schema.org', '@graph': graph }

  return (
    <script
      type="application/ld+json"
      // Structured data is static, trusted content — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
