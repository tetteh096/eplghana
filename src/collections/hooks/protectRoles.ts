import type { FieldHook } from 'payload'

import type { User } from '@/payload-types'
import { checkRole } from '@/access/checkRole'

/** Only admins may change user roles; everyone else keeps their current roles. */
export const protectRoles: FieldHook<User> = ({ data, req, value }) => {
  if (checkRole(['admin'], req.user)) {
    return value
  }

  if (req.user?.id && data?.id === req.user.id) {
    return req.user.roles
  }

  return value ?? ['editor']
}
