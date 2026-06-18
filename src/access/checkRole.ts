import type { User } from '@/payload-types'

export const USER_ROLES = ['admin', 'editor', 'viewer'] as const
export type UserRole = (typeof USER_ROLES)[number]

export function checkRole(
  allowed: UserRole[],
  user: User | null | undefined,
): boolean {
  if (!user?.roles?.length) return false
  return allowed.some((role) => user.roles?.includes(role))
}
