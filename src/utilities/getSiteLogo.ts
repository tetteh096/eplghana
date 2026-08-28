import { EPL_LOGO_SRC } from '@/config/brand'
import type { SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export function getSiteLogo(settings?: SiteSetting | null) {
  return getMediaUrl(settings?.logo) ?? EPL_LOGO_SRC
}
