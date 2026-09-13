import { teamMembers } from '@/config/teamPageContent'

/** Initials avatar used when a CMS portrait file is missing or 404s. */
export function teamPhotoFallback(name: string): string {
  const fromStatic = teamMembers.find((m) => m.name === name)?.photo
  if (fromStatic) return fromStatic

  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0a3d6b&textColor=ffffff&fontSize=38`
}
