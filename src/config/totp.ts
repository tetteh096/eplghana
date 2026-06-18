import { CMS_PRODUCT_NAME } from '@/config/brand'

/** Shared TOTP settings, keep in sync with payloadTotp() in payload.config.ts */
export const TOTP_CONFIG = {
  digits: 6,
  issuer: CMS_PRODUCT_NAME,
  period: 30,
} as const
