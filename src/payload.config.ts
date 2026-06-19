import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { payloadTotp } from 'payload-totp'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { enhanceUploadFields } from './collections/fields/enhanceUploadFields'
import { Alumni } from './collections/Alumni'
import { Events } from './collections/Events'
import { Fellows } from './collections/Fellows'
import { FormSubmissions } from './collections/FormSubmissions'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Pages } from './collections/Pages'
import { Partners } from './collections/Partners'
import { Projects } from './collections/Projects'
import { Publications } from './collections/Publications'
import { Team } from './collections/Team'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { headerCta, isNavDropdown, mainNavigation } from './config/navigation'
import { CMS_PRODUCT_NAME, EPL_LOGO_SRC } from './config/brand'
import { TOTP_CONFIG } from './config/totp'
import { getEmailAdapter } from './email/transport'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { PageBanners } from './globals/PageBanners'
import { SiteSettings } from './globals/SiteSettings'
import { getS3Storage } from './storage/s3'
import { maybeRunDevAutoSeed } from './seeds/devAutoSeed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'all',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: `| ${CMS_PRODUCT_NAME}`,
      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: EPL_LOGO_SRC,
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          url: EPL_LOGO_SRC,
        },
      ],
    },
    components: {
      graphics: {
        Icon: '/components/admin/Icon#Icon',
        Logo: '/components/admin/Logo#Logo',
      },
      views: {
        dashboard: {
          Component: '/components/admin/EplDashboard#EplDashboard',
          exact: true,
          path: '/',
        },
        SetupTOTP: {
          Component: '/components/admin/totp/EplTotpSetup#EplTotpSetup',
          exact: true,
          path: '/setup-totp',
        },
        VerifyTOTP: {
          Component: '/components/admin/totp/EplTotpVerify#EplTotpVerify',
          exact: true,
          path: '/verify-totp',
        },
      },
      actions: ['/components/admin/HeaderToolbar#HeaderToolbar'],
      beforeLogin: ['/components/admin/BeforeLogin#BeforeLogin'],
      afterLogin: ['/components/admin/AfterLogin#AfterLogin'],
      beforeNav: ['/components/admin/NavSidebarTop#NavSidebarTop'],
    },
  },
  collections: [Users, Media, News, Projects, Events, Publications, Testimonials, Team, Fellows, Alumni, Partners, FormSubmissions, Pages].map(
    (collection) => ({
      ...collection,
      fields: enhanceUploadFields(collection.fields),
    }),
  ),
  globals: [SiteSettings, Header, Footer, PageBanners].map((global) => ({
    ...global,
    fields: enhanceUploadFields(global.fields),
  })),
  editor: lexicalEditor(),
  onInit: async (payload) => {
    const g = globalThis as Record<string, unknown>
    const migrationsDone = g.__eplPayloadMigrationsDone === true

    if (!migrationsDone) {
      g.__eplPayloadMigrationsDone = true

      // Seed the Header global from the default navigation on first run so the
      // menu is immediately editable in the admin (instead of an empty global).
      try {
        const header = await payload.findGlobal({ slug: 'header' })
        const hasItems = Array.isArray(header?.navItems) && header.navItems.length > 0
        if (!hasItems) {
          await payload.updateGlobal({
            slug: 'header',
            data: {
              navItems: mainNavigation.map((item) =>
                isNavDropdown(item)
                  ? {
                      label: item.label,
                      children: item.items.map((sub) => ({ label: sub.label, url: sub.href })),
                    }
                  : { label: item.label, url: item.href },
              ),
              cta: { enabled: true, label: headerCta.label, url: headerCta.href },
            },
          })
          payload.logger.info('[EPL] Seeded Header global from default navigation')
        }
      } catch (error) {
        payload.logger.warn(`[EPL] Header seed skipped: ${error}`)
      }

      // Existing users created before roles were added become admins once.
      try {
        const withoutRoles = await payload.find({
          collection: 'users',
          depth: 0,
          limit: 200,
          where: {
            or: [
              { roles: { exists: false } },
              { roles: { equals: [] } },
            ],
          },
        })

        for (const user of withoutRoles.docs) {
          await payload.update({
            collection: 'users',
            id: user.id,
            data: { roles: ['admin'] },
            overrideAccess: true,
          })
        }

        if (withoutRoles.totalDocs > 0) {
          payload.logger.info(
            `[EPL] Assigned admin role to ${withoutRoles.totalDocs} user(s) missing roles`,
          )
        }
      } catch (error) {
        payload.logger.warn(`[EPL] User role migration skipped: ${error}`)
      }
    }

    // Never block page loads on dev seeding — runs in the background.
    void maybeRunDevAutoSeed(payload)
  },
  secret: process.env.PAYLOAD_SECRET || '',
  // Restrict cross-origin API access and CSRF-trusted origins to our own site.
  // Defends the authenticated REST/GraphQL API against requests from other origins.
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
  // Email: Resend or SMTP via getEmailAdapter() — see src/email/transport.ts
  email: getEmailAdapter(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // GraphQL is unused by this app (frontend + admin use the REST/Local API).
  // Disabling it removes an exposed endpoint and stops the schema-build error
  // caused by the "News & Events" select value. Re-enable by removing this and
  // fixing that value (GraphQL enum members can't contain '&').
  graphQL: {
    disable: true,
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
    connectOptions: {
      // Serverless cold starts (Vercel) need longer than local Docker.
      serverSelectionTimeoutMS:
        process.env.NODE_ENV === 'production' ? 30_000 : 3_000,
      maxPoolSize: process.env.NODE_ENV === 'production' ? 1 : undefined,
    },
  }),
  sharp,
  plugins: [
    ...getS3Storage(),
    payloadTotp({
      collection: 'users',
      forceSetup: true,
      forceWhiteBackgroundOnQrCode: true,
      totp: {
        issuer: TOTP_CONFIG.issuer,
        digits: TOTP_CONFIG.digits,
        period: TOTP_CONFIG.period,
      },
    }),
  ],
})
