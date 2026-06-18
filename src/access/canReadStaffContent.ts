import type { Access } from 'payload'

import { checkRole } from './checkRole'

/** Staff roles with read-only or edit access (e.g. form submissions inbox). */
export const canReadStaffContent: Access = ({ req: { user } }) =>
  checkRole(['admin', 'editor', 'viewer'], user)
