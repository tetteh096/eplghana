import type { GlobalConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { publicTotpReadBypass } from '@/config/security'
import { headerCta, isNavDropdown, mainNavigation } from '../config/navigation'

/**
 * Site header / navigation, editable in the admin under the "Header" door.
 * Drives the main nav (with dropdowns) and the top-right call-to-action button.
 * Logo + contact/social still live in Site Settings.
 *
 * The frontend reads this via getHeader() and falls back to the hardcoded
 * navigation in src/config/navigation.ts when the global is empty.
 *
 * The menu is pre-filled via field `defaultValue` (from the default nav) so the
 * global opens populated on first load, no seed step required.
 */

const defaultNavItems = mainNavigation.map((item) =>
  isNavDropdown(item)
    ? {
        label: item.label,
        children: item.items.map((sub) => ({ label: sub.label, url: sub.href })),
      }
    : { label: item.label, url: item.href },
)
export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
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
      name: 'navItems',
      type: 'array',
      label: 'Menu items',
      labels: { singular: 'Menu item', plural: 'Menu items' },
      defaultValue: defaultNavItems,
      admin: {
        description:
          'Top navigation. Add a link, or leave the URL blank and add dropdown items below to turn it into a dropdown menu.',
        initCollapsed: true,
        components: {
          RowLabel: '/globals/rowLabels/NavItemLabel#NavItemLabel',
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description:
              'Where this item links to (e.g. /about). Leave blank if it only opens a dropdown.',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown items',
          labels: { singular: 'Dropdown item', plural: 'Dropdown items' },
          admin: {
            description: 'Optional. Add sub-links to make this item a dropdown.',
            initCollapsed: true,
          },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Button (top-right)',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Show the button',
          defaultValue: true,
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Contact Us',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
  ],
}
