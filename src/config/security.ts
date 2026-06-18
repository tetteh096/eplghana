/**
 * Lets the public site read CMS data without a logged-in TOTP session.
 * Required when payload-totp wraps collection access controls.
 */
export const publicTotpReadBypass = {
  totp: {
    disableAccessWrapper: {
      read: true,
    },
  },
}
