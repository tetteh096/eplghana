import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // Don't advertise the framework/version in responses.
  poweredByHeader: false,
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/images/**',
      },
    ],
    remotePatterns: [
      {
        hostname: 'localhost',
        pathname: '/epl-media/**',
        port: '9000',
        protocol: 'http',
      },
      ...(process.env.R2_PUBLIC_HOSTNAME || process.env.S3_PUBLIC_HOSTNAME
        ? [
            {
              hostname: (process.env.R2_PUBLIC_HOSTNAME ?? process.env.S3_PUBLIC_HOSTNAME)!,
              pathname: '/**',
              protocol: 'https' as const,
            },
          ]
        : []),
    ],
  },
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      {
        // Apply security headers to every response.
        source: '/:path*',
        headers: [
          // Stop browsers MIME-sniffing responses away from the declared type.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Allow framing only from our own origin (Payload live preview needs this).
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Don't leak full URLs (which can contain tokens) to other origins.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Lock down powerful browser features the site doesn't use.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          // Force HTTPS for two years (incl. subdomains). Safe once served over TLS.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  async redirects() {
    return [
      {
        destination: '/assets/cropped-EPL-Ghana-logo.png',
        permanent: false,
        source: '/favicon.ico',
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
