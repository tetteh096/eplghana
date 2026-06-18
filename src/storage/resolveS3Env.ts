export type ResolvedR2Env = {
  accessKeyId: string
  bucket: string
  endpoint: string
  forcePathStyle: boolean
  publicUrl?: string
  region: string
  secretAccessKey: string
}

/** @deprecated Use ResolvedR2Env */
export type ResolvedS3Env = ResolvedR2Env

function read(name: string): string | undefined {
  return process.env[name]?.trim() || undefined
}

function readAny(names: string[]): string | undefined {
  for (const name of names) {
    const value = read(name)
    if (value) return value
  }
  return undefined
}

function parseR2Api(value: string): { bucket?: string; endpoint?: string } {
  try {
    const url = new URL(value)
    const bucket = url.pathname.replace(/^\//, '').split('/')[0] || undefined
    return {
      bucket,
      endpoint: `${url.protocol}//${url.host}`,
    }
  } catch {
    return {}
  }
}

/**
 * Cloudflare R2 credentials (S3-compatible API).
 * Prefer R2_* env names; S3_* names are supported as legacy aliases.
 */
export function resolveR2Env(): ResolvedR2Env {
  const fromApi = readAny(['R2_API', 'S3_API'])
    ? parseR2Api(readAny(['R2_API', 'S3_API'])!)
    : {}

  const bucket = readAny(['R2_BUCKET', 'S3_BUCKET']) ?? fromApi.bucket
  const endpoint = readAny(['R2_ENDPOINT', 'S3_ENDPOINT']) ?? fromApi.endpoint
  const accessKeyId = readAny([
    'R2_ACCESS_KEY_ID',
    'S3_ACCESS_KEY_ID',
    'AWS_ACCESS_KEY_ID',
    'ACCESS_KEY_ID',
  ])
  const secretAccessKey = readAny([
    'R2_SECRET_ACCESS_KEY',
    'S3_SECRET_ACCESS_KEY',
    'AWS_SECRET_ACCESS_KEY',
    'SECRET_ACCESS_KEY',
  ])

  if (!bucket) {
    throw new Error('Missing R2_BUCKET (or R2_API / S3_API with bucket path).')
  }
  if (!endpoint) {
    throw new Error('Missing R2_ENDPOINT (or R2_API / S3_API).')
  }
  if (!accessKeyId) {
    throw new Error('Missing R2_ACCESS_KEY_ID — create an R2 API token in Cloudflare.')
  }
  if (!secretAccessKey) {
    throw new Error('Missing R2_SECRET_ACCESS_KEY — create an R2 API token in Cloudflare.')
  }

  return {
    accessKeyId,
    bucket,
    endpoint,
    forcePathStyle:
      read('R2_FORCE_PATH_STYLE') === 'true' || read('S3_FORCE_PATH_STYLE') === 'true',
    publicUrl: readAny(['R2_PUBLIC_URL', 'S3_PUBLIC_URL']),
    region: readAny(['R2_REGION', 'S3_REGION']) || 'auto',
    secretAccessKey,
  }
}

/** @deprecated Use resolveR2Env */
export const resolveS3Env = resolveR2Env
