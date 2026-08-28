import type { Access } from 'payload'

import { checkRole } from './checkRole'

export const adminOnly: Access = ({ req: { user } }) => checkRole(['admin'], user)
