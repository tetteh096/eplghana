import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminsAndSelf } from '@/access/adminsAndSelf'
import { checkRole, USER_ROLES } from '@/access/checkRole'
import { CMS_PRODUCT_NAME } from '@/config/brand'
import { sendWelcomeUserEmail } from '@/email/notifications'
import { resetPasswordEmailHTML } from '@/email/templates'
import { protectRoles } from './hooks/protectRoles'

/**
 * Users, the people who can sign in to the Content Management System.
 * Authentication is wrapped by payload-totp (see payload.config.ts), so every
 * login also requires a one-time code. Roles control what each user can do:
 * admins manage users and everything else, editors create and edit content,
 * viewers have read-only access to staff content (e.g. form submissions).
 */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  auth: {
    forgotPassword: {
      generateEmailSubject: () => `Reset your ${CMS_PRODUCT_NAME} password`,
      generateEmailHTML: (args) => {
        const token = (args as { token?: string } | undefined)?.token ?? ''
        const user = (args as { user?: { name?: string } } | undefined)?.user
        return resetPasswordEmailHTML(token, user?.name)
      },
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles'],
  },
  access: {
    // `admin` controls who may open the CMS panel and must return a boolean.
    admin: ({ req: { user } }) => checkRole(['admin', 'editor', 'viewer'], user),
    create: adminOnly,
    delete: adminOnly,
    read: adminsAndSelf,
    update: adminsAndSelf,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        if (!doc.email) return

        await sendWelcomeUserEmail(req.payload, {
          email: doc.email,
          name: doc.name,
        })
      },
    ],
    // The first user is created with only email + password (no name), but `name`
    // is required. Without this, later updates that re-validate the doc — e.g.
    // saving the TOTP secret during 2FA setup — fail with "Name is invalid".
    // Default the name from the email local-part whenever it's missing.
    beforeValidate: [
      ({ data, originalDoc }) => {
        if (!data) return data
        const currentName = (data.name ?? originalDoc?.name) as string | undefined
        if (!currentName || !currentName.trim()) {
          const email = (data.email ?? originalDoc?.email) as string | undefined
          if (email) {
            data.name = email.split('@')[0]
          }
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      saveToJWT: true,
      defaultValue: ['editor'],
      options: USER_ROLES.map((role) => ({
        label: role.charAt(0).toUpperCase() + role.slice(1),
        value: role,
      })),
      hooks: {
        beforeChange: [protectRoles],
      },
      admin: {
        position: 'sidebar',
        description: 'Admins manage users; editors edit content; viewers are read-only.',
      },
    },
  ],
}
