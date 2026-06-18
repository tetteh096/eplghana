import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { canEditContent } from '@/access/canEditContent'
import { canReadStaffContent } from '@/access/canReadStaffContent'

export const formSubmissionTypes = [
  { label: 'Register Interest', value: 'register-interest' },
  { label: 'Internship & Volunteering', value: 'internship-volunteer' },
  { label: 'Partnership', value: 'partnership' },
] as const

export type FormSubmissionType = (typeof formSubmissionTypes)[number]['value']

/**
 * Inbound form submissions from the public site.
 * Created via POST /api/form-submit, view and manage here in the dashboard.
 */
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Form Submission', plural: 'Form Submissions' },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['formType', 'fullName', 'email', 'status', 'createdAt'],
    description:
      'Messages from Register Interest, Internship & Volunteering, and Partnership forms. Staff and submitters are emailed automatically on each submission.',
    group: 'Inbox',
  },
  access: {
    create: () => false,
    read: canReadStaffContent,
    update: canEditContent,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      options: [...formSubmissionTypes],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
      admin: { readOnly: true },
    },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'institution',
      type: 'text',
      label: 'Institution / organisation',
      admin: {
        condition: (data) => data?.formType === 'register-interest',
      },
    },
    {
      name: 'subject',
      type: 'text',
      admin: {
        condition: (data) =>
          data?.formType === 'partnership' || data?.formType === 'internship-volunteer',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
