import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { canEditContent } from '@/access/canEditContent'
import { canReadStaffContent } from '@/access/canReadStaffContent'

export const formSubmissionTypes = [
  { label: 'Register Interest', value: 'register-interest' },
  { label: 'Internship & Volunteering', value: 'internship-volunteer' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Pledge / Donate', value: 'pledge' },
  { label: 'Online Donation (Paystack)', value: 'online-donation' },
] as const

export type FormSubmissionType = (typeof formSubmissionTypes)[number]['value']

export const paymentStatusOptions = [
  { label: 'Not a payment', value: 'none' },
  { label: 'Payment started', value: 'initiated' },
  { label: 'Payment completed', value: 'completed' },
  { label: 'Payment cancelled', value: 'cancelled' },
  { label: 'Payment failed', value: 'failed' },
] as const

/**
 * Inbound form submissions from the public site.
 * Created via POST /api/form-submit, view and manage here in the dashboard.
 */
export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Form Submission', plural: 'Form Submissions' },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: [
      'formType',
      'sourcePage',
      'fullName',
      'email',
      'paymentStatus',
      'status',
      'createdAt',
    ],
    description:
      'All website forms and Paystack payment attempts. Check “Source / page” to see where each entry came from.',
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
      name: 'sourcePage',
      type: 'text',
      label: 'Source / page',
      required: true,
      admin: {
        description: 'Human-readable label, e.g. “Contact page — Partnership form”.',
      },
    },
    {
      name: 'sourcePath',
      type: 'text',
      label: 'Page path',
      admin: { description: 'URL path, e.g. /contact or /donate.' },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'none',
      options: [...paymentStatusOptions],
      admin: {
        position: 'sidebar',
        description: 'For Paystack card payments only. Regular forms stay “Not a payment”.',
      },
    },
    {
      name: 'paymentReference',
      type: 'text',
      label: 'Paystack reference',
      admin: {
        position: 'sidebar',
        description: 'Set when someone starts or completes a Paystack checkout.',
      },
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
          data?.formType === 'partnership' ||
          data?.formType === 'internship-volunteer' ||
          data?.formType === 'pledge' ||
          data?.formType === 'online-donation',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
