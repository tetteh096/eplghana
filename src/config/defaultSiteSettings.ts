import { eplImpactStats } from '@/config/epl-defaults'
import type { SiteSetting } from '@/payload-types'

export const defaultSiteSettings: SiteSetting = {
  id: 'default',
  siteName: 'Emerging Public Leaders of Ghana',
  tagline: 'Empowering the next generation of public sector leaders in Ghana.',
  heroSubtitle: 'Emerging Public Leaders of Ghana',
  heroTitle: 'Nurturing a new generation of public service professionals',
  heroDescription:
    'We empower Ghanaian youth with the knowledge, skills, and network to become effective agents of change within Ghana’s Public Service.',
  heroCtaLabel: 'Learn More',
  heroCtaUrl: '/about',
  heroStatValue: '200+',
  heroStatLabel: 'Fellows trained',
  aboutSubtitle: 'Who We Are',
  aboutTitle: 'Developing the next generation of public service professionals',
  aboutDescription:
    'At Emerging Public Leaders of Ghana, we believe Ghana’s development rests on strong Public Service institutions. We embed Africa’s brightest young professionals within government to champion leadership from inside the civil service.',
  aboutCtaLabel: 'About EPL Ghana',
  aboutCtaUrl: '/about',
  missionBannerQuote:
    'EPL Ghana doesn’t just train leaders; we transform Ghana’s public service from the inside out.',
  fellowshipTitle: 'Your chapter in public service starts here',
  fellowshipDescription:
    'Applications for the 2026 Public Service Fellowship are now closed. Register your interest below to hear about future cohorts, events, and opportunities.',
  fellowshipCtaLabel: 'Register Interest',
  fellowshipCtaUrl: '/get-involved#register-interest',
  stats: eplImpactStats.map((stat) => ({ value: stat.value, label: stat.label })),
  phone: '+233 24 606 4766',
  email: 'info@eplghana.org',
  address: 'No.1 Justice Sarkodee Addo Avenue, East Legon, Accra',
}
