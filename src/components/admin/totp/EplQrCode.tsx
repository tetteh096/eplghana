import { toDataURL } from 'qrcode'
import type { TOTP } from 'otpauth'

export async function EplQrCode({ totp }: { totp: TOTP }) {
  const src = await toDataURL(totp.toString(), {
    color: { dark: '#0a3d6b', light: '#ffffff' },
    margin: 2,
    width: 220,
  })

  return (
    <img
      alt="Scan this QR code with your authenticator app"
      className="epl-totp__qr-image"
      height={220}
      src={src}
      width={220}
    />
  )
}
