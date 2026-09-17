import type { Payload, SendEmailOptions } from 'payload'

/**
 * Send a transactional email through whatever adapter Payload is using
 * (Resend or SMTP). Logs and rethrows on failure so callers can decide
 * whether to block the parent operation.
 */
export async function sendAppEmail(
  payload: Payload,
  options: SendEmailOptions,
): Promise<void> {
  await payload.sendEmail(options)
}

/** Like sendAppEmail but never throws — for non-critical notifications. */
export async function sendAppEmailSafe(
  payload: Payload,
  options: SendEmailOptions,
  tag: string,
): Promise<void> {
  try {
    await sendAppEmail(payload, options)
  } catch (error) {
    payload.logger.warn(`[email:${tag}] failed to send: ${error}`)
  }
}
