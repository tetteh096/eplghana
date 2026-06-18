import { CMS_PRODUCT_NAME, EPL_LOGO_WHITE_SRC } from '@/config/brand'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** Absolute URL for the logo image in HTML emails (PNG recommended for production). */
export function getEmailLogoUrl(): string {
  if (process.env.EMAIL_LOGO_URL?.trim()) {
    return process.env.EMAIL_LOGO_URL.trim()
  }

  return `${serverURL}${EPL_LOGO_WHITE_SRC}`
}

export function getAdminLoginUrl(): string {
  return `${serverURL}/admin/login`
}

export function getAdminForgotPasswordUrl(): string {
  return `${serverURL}/admin/forgot-password`
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function brandedEmailLayout(content: string): string {
  const logoUrl = getEmailLogoUrl()

  return `
  <div style="background:#f6fafd;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#2a3a47;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e3edf6;box-shadow:0 4px 24px rgba(10,61,107,0.08);">
          <tr>
            <td style="background:#0a3d6b;padding:26px 28px 22px;text-align:center;">
              <img src="${logoUrl}" alt="EPL Ghana" width="198" height="28"
                style="display:inline-block;border:0;max-width:198px;width:198px;height:auto;" />
              <p style="margin:12px 0 0;font-size:11px;color:#9ec5e8;letter-spacing:0.06em;text-transform:uppercase;">
                ${CMS_PRODUCT_NAME}
              </p>
            </td>
          </tr>
          <tr>
            <td style="height:4px;background:#eb5310;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr><td style="padding:28px 32px 32px;">
            ${content}
          </td></tr>
        </table>
        <p style="margin:18px 0 0;font-size:12px;color:#9aa9b5;line-height:1.5;">
          ${CMS_PRODUCT_NAME}<br />
          Emerging Public Leaders of Ghana
        </p>
      </td></tr>
    </table>
  </div>`
}

function primaryButton(href: string, label: string): string {
  return `<a href="${href}"
    style="display:inline-block;background:#1e6bb8;color:#ffffff;text-decoration:none;
    font-weight:bold;font-size:15px;padding:12px 26px;border-radius:8px;">
    ${label}
  </a>`
}

export function resetPasswordEmailHTML(token: string, name?: string): string {
  const resetUrl = `${serverURL}/admin/reset/${token}`
  const greeting = name ? `Hi ${escapeHtml(name)},` : 'Hi,'

  return brandedEmailLayout(`
    <p style="margin:0 0 14px;font-size:16px;">${greeting}</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">
      We received a request to reset your password. Click the button below
      to choose a new one. This link expires shortly, so use it soon.
    </p>
    <p style="margin:0 0 24px;">${primaryButton(resetUrl, 'Reset my password')}</p>
    <p style="margin:0 0 8px;font-size:13px;color:#5a6b78;line-height:1.6;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>
    <p style="margin:0 0 20px;font-size:13px;word-break:break-all;">
      <a href="${resetUrl}" style="color:#1e6bb8;">${resetUrl}</a>
    </p>
    <p style="margin:0;font-size:13px;color:#5a6b78;line-height:1.6;">
      Didn't request this? You can safely ignore this email. Your password won't change.
    </p>`)
}

export function welcomeUserEmailHTML(name?: string): string {
  const greeting = name ? `Hi ${escapeHtml(name)},` : 'Hi,'
  const loginUrl = getAdminLoginUrl()

  return brandedEmailLayout(`
    <p style="margin:0 0 14px;font-size:16px;">${greeting}</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">
      An administrator has created a ${CMS_PRODUCT_NAME} account for you.
      You can sign in with the email address and password you were given.
    </p>
    <p style="margin:0 0 24px;">${primaryButton(loginUrl, 'Open the CMS')}</p>
    <p style="margin:0 0 8px;font-size:13px;color:#5a6b78;line-height:1.6;">
      Forgot your password? Use
      <a href="${getAdminForgotPasswordUrl()}" style="color:#1e6bb8;">Forgot password</a>
      on the login screen.
    </p>
    <p style="margin:0;font-size:13px;color:#5a6b78;line-height:1.6;">
      If you weren't expecting this account, please contact your EPL Ghana administrator.
    </p>`)
}

export type FormSubmissionEmailData = {
  formTypeLabel: string
  fullName: string
  email: string
  phone?: string
  institution?: string
  subject?: string
  message: string
}

export function formSubmissionStaffEmailHTML(data: FormSubmissionEmailData): string {
  const rows = [
    ['Form', data.formTypeLabel],
    ['Name', data.fullName],
    ['Email', data.email],
    data.phone ? ['Phone', data.phone] : null,
    data.institution ? ['Institution', data.institution] : null,
    data.subject ? ['Subject', data.subject] : null,
    ['Message', data.message],
  ].filter(Boolean) as [string, string][]

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px 8px 0;font-size:13px;font-weight:700;color:#5a6b78;vertical-align:top;width:110px;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;font-size:14px;line-height:1.5;color:#2a3a47;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join('')

  return brandedEmailLayout(`
    <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0a3d6b;">New website form submission</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${tableRows}</table>
    <p style="margin:20px 0 0;font-size:13px;color:#5a6b78;line-height:1.6;">
      View and manage this in the CMS under <strong>Form Submissions</strong>.
    </p>`)
}

export function formSubmissionAutoReplyHTML(fullName: string, formTypeLabel: string): string {
  const firstName = fullName.split(' ')[0] || fullName

  return brandedEmailLayout(`
    <p style="margin:0 0 14px;font-size:16px;">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
      Thank you for contacting Emerging Public Leaders of Ghana.
      We've received your <strong>${escapeHtml(formTypeLabel)}</strong> message and our team will review it soon.
    </p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#5a6b78;">
      This is an automated confirmation — please don't reply to this email.
    </p>`)
}
