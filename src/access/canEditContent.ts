import type { Access } from 'payload'

import { checkRole } from './checkRole'

/** Admins and editors may create, update, or delete site content. */
export const canEditContent: Access = ({ req: { user } }) =>
  checkRole(['admin', 'editor'], user)
