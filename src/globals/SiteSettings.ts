import type { GlobalConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { publicTotpReadBypass } from '@/config/security'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    livePreview: {
      url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    },
  },
  access: {
    read: () => true,
    update: canEditContent,
  },
  custom: publicTotpReadBypass,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              defaultValue: 'Emerging Public Leaders of Ghana',
              required: true,
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue:
                'Empowering the next generation of public sector leaders in Ghana.',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Optional. Falls back to /assets/cropped-EPL-Ghana-logo.png when empty.',
              },
            },
          ],
        },
        {
          label: 'Homepage Hero',
          fields: [
            {
              name: 'heroSubtitle',
              type: 'text',
              defaultValue: 'Emerging Public Leaders of Ghana',
            },
            {
              name: 'heroTitle',
              type: 'text',
              defaultValue: 'Nurturing a new generation of public service professionals',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              defaultValue:
                'We empower Ghanaian youth with the knowledge, skills, and network to become effective agents of change within Ghana’s Public Service.',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'heroCtaLabel',
              type: 'text',
              defaultValue: 'Learn More',
            },
            {
              name: 'heroCtaUrl',
              type: 'text',
              defaultValue: '/about',
            },
            {
              name: 'heroStatValue',
              type: 'text',
              defaultValue: '200+',
            },
            {
              name: 'heroStatLabel',
              type: 'text',
              defaultValue: 'Fellows trained',
            },
          ],
        },
        {
          label: 'Mission Section',
          fields: [
            {
              name: 'aboutSubtitle',
              type: 'text',
              defaultValue: 'Who We Are',
            },
            {
              name: 'aboutTitle',
              type: 'text',
              defaultValue: 'Developing the next generation of public service professionals',
            },
            {
              name: 'aboutDescription',
              type: 'textarea',
              defaultValue:
                'At Emerging Public Leaders of Ghana, we believe Ghana’s development rests on strong Public Service institutions. We embed Africa’s brightest young professionals within government to champion leadership from inside the civil service.',
            },
            {
              name: 'aboutImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'aboutCtaLabel',
              type: 'text',
              defaultValue: 'About EPL Ghana',
            },
            {
              name: 'aboutCtaUrl',
              type: 'text',
              defaultValue: '/about',
            },
            {
              name: 'missionBannerQuote',
              type: 'textarea',
              label: 'Homepage mission quote',
              defaultValue:
                'EPL Ghana doesn’t just train leaders; we transform Ghana’s public service from the inside out. We rigorously select and embed Africa’s brightest young professionals within key government institutions, ensuring that leadership and innovation are championed from within the civil service to drive sustainable national development.',
            },
            {
              name: 'missionBannerImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Mission banner photo (legacy)',
              admin: {
                description: 'Optional single photo. Prefer the slideshow below for multiple images.',
              },
            },
            {
              name: 'missionBannerImages',
              type: 'array',
              label: 'Mission banner slideshow',
              admin: {
                description:
                  'Photos that crossfade behind the mission quote on the homepage. Falls back to hero slides if empty.',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  admin: {
                    description: 'Optional short label (e.g. PSF Graduation 2025)',
                  },
                },
              ],
              maxRows: 8,
            },
          ],
        },
        {
          label: 'Fellowship Banner',
          fields: [
            {
              name: 'fellowshipTitle',
              type: 'text',
              defaultValue: 'Your chapter in public service starts here',
            },
            {
              name: 'fellowshipDescription',
              type: 'textarea',
              defaultValue:
                'Join the 2026 Public Service Fellowship, a transformative year inside Ghana’s ministries, agencies, and commissions, with the training, mentorship, and network to lead with integrity.',
            },
            {
              name: 'fellowshipCtaLabel',
              type: 'text',
              defaultValue: 'Register Interest',
            },
            {
              name: 'fellowshipCtaUrl',
              type: 'text',
              defaultValue: '/contact',
            },
          ],
        },
        {
          label: 'Core Values',
          fields: [
            {
              name: 'coreValues',
              type: 'array',
              labels: { singular: 'Value', plural: 'Core Values' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Impact Stats',
          fields: [
            {
              name: 'stats',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Contact & Social',
          fields: [
            {
              name: 'phone',
              type: 'text',
              defaultValue: '+233 24 606 4766',
            },
            {
              name: 'email',
              type: 'email',
              defaultValue: 'info@eplghana.org',
            },
            {
              name: 'address',
              type: 'textarea',
              defaultValue: 'No.1 Justice Sarkodee Addo Avenue, East Legon, Accra',
            },
            { name: 'facebook', type: 'text' },
            { name: 'twitter', type: 'text' },
            { name: 'instagram', type: 'text' },
            { name: 'youtube', type: 'text' },
          ],
        },
      ],
    },
  ],
}
