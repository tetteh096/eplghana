import type { Access } from 'payload'

/** Public read for published and coming-soon; drafts admin-only. */
export const authenticatedOrPublishedOrVisible: Access = ({ req: { user } }) => {
  if (user) return true
  return { status: { not_equals: 'draft' } }
}
