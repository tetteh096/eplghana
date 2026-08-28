import { s3Storage } from '@payloadcms/storage-s3'
import type { Plugin } from 'payload'

import { resolveR2Env } from './resolveS3Env'

function publicMediaUrl(filename: string, prefix?: string): string | null {
  const base = (process.env.R2_PUBLIC_URL ?? process.env.S3_PUBLIC_URL)?.replace(/\/$/, '')
  if (!base) return null

  const key = prefix ? `${prefix.replace(/\/$/, '')}/${filename}` : filename
  return `${base}/${key}`
}

function hasR2Config(): boolean {
  return Boolean(
    process.env.R2_BUCKET?.trim() ||
      process.env.S3_BUCKET?.trim() ||
      process.env.R2_API?.trim() ||
      process.env.S3_API?.trim(),
  )
}

/**
 * Cloudflare R2 media storage (S3-compatible API via @payloadcms/storage-s3).
 * Set R2_* env vars. Legacy S3_* names still work.
 */
export function getS3Storage(): Plugin[] {
  if (!hasR2Config()) {
    return []
  }

  const isProduction = process.env.NODE_ENV === 'production'
  const enableClientUploads =
    process.env.R2_CLIENT_UPLOADS === 'true' ||
    process.env.S3_CLIENT_UPLOADS === 'true' ||
    isProduction

  if (
    process.env.NODE_ENV === 'development' &&
    process.env.R2_FORCE_DEV !== 'true' &&
    process.env.S3_FORCE_DEV !== 'true'
  ) {
    return []
  }

  let r2: ReturnType<typeof resolveR2Env>
  try {
    r2 = resolveR2Env()
  } catch {
    return []
  }

  const hasPublicUrl = Boolean(process.env.R2_PUBLIC_URL ?? process.env.S3_PUBLIC_URL)

  const mediaCollection: NonNullable<Parameters<typeof s3Storage>[0]['collections']>['media'] =
    hasPublicUrl
      ? {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            // Migrated files sit at bucket root; new uploads use folder prefix.
            return (
              publicMediaUrl(filename, prefix || undefined) ??
              publicMediaUrl(filename) ??
              ''
            )
          },
        }
      : {
          // Serve through Payload /api/media/file/ — never expose the private R2 API host.
          generateFileURL: ({ filename, prefix }) => {
            const base = (process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000').replace(
              /\/$/,
              '',
            )
            const path = prefix ? `${prefix}/${filename}` : filename
            return `${base}/api/media/file/${path}`
          },
        }

  return [
    s3Storage({
      alwaysInsertFields: true,
      bucket: r2.bucket,
      clientUploads: enableClientUploads,
      collections: {
        media: mediaCollection,
      },
      config: {
        credentials: {
          accessKeyId: r2.accessKeyId,
          secretAccessKey: r2.secretAccessKey,
        },
        endpoint: r2.endpoint,
        forcePathStyle: r2.forcePathStyle,
        region: r2.region,
      },
    }),
  ]
}
