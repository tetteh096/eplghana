import type { Payload } from 'payload'

import { aboutPageRedesignImages } from '@/config/aboutPageContent'
import { aboutCoreValuesFallback } from '@/utilities/getAboutContent'

import { createImageImporter, updatePageBySlug } from '../utils'

const TAG = 'about'

export async function seedAbout(payload: Payload): Promise<void> {
  const importImage = createImageImporter(payload, TAG)

  const about = {
    introEyebrow: 'About EPL Ghana',
    introTitle: 'Who We Are',
    introLead:
      'A Ghanaian non-profit organization preparing ethical, critical-thinking young leaders to strengthen the civil service and serve the public good.',
    introImage: await importImage(aboutPageRedesignImages.hero, 'About EPL Ghana'),
    storyEyebrow: 'Our Story',
    growthTitle: 'A Movement for Stronger Public Service',
    growthBody:
      'Launched in 2018, EPL Ghana was founded on the conviction that public institutions are only as strong as the people within them. Through our 12-month Emerging Public Leaders Fellowship, we place talented young Ghanaians inside public sector institutions for immersive training, executive mentorship, and hands-on service—working toward an ambitious goal of nurturing over 275 dedicated Fellows by 2030 to drive lasting national transformation.',
    introSecondaryImage: await importImage(aboutPageRedesignImages.story, 'EPL Ghana story'),
    mission: {
      eyebrow: 'Mission',
      title: 'What We Do',
      body: "To develop ethical, critical-thinking, and change-driven public sector leaders who strengthen Ghana's institutions and serve the public good.",
    },
    vision: {
      eyebrow: 'Vision',
      title: 'Where We Are Going',
      body: 'A Ghana where public institutions are led by honest, capable, and innovative leaders committed to national development and citizen welfare.',
    },
    coreValuesEyebrow: 'Core Values',
    coreValuesTitle: 'The principles that guide everything we do.',
    coreValuesHint: 'Click any value to reveal its meaning.',
    coreValues: aboutCoreValuesFallback,
    teamTitle: 'The People Behind EPL Ghana',
    teamIntro:
      'Meet the dedicated board members, directors, and coordinators guiding our mission and supporting our Fellows every day.',
    teamLeadershipLabel: 'Leadership',
    teamStaffLabel: 'Team',
    partnerEyebrow: 'Ecosystem',
    partnerTitle: 'Our Partners & Supporters',
    partnerLead:
      'We collaborate with government ministries, international development agencies, and civil society to build public leadership capacity.',
    partnerCtaLabel: 'Partner With Us',
    partnerCtaUrl: '/community/partners',
  }

  await updatePageBySlug(payload, '/about', { about }, TAG)
}
