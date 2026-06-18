import type { Access } from 'payload'

import { checkRole } from './checkRole'

/** Any staff role may open the Content Management System admin panel. */
export const canAccessAdmin: Access = ({ req: { user } }) =>
  checkRole(['admin', 'editor', 'viewer'], user)
