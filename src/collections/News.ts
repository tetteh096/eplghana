import type { CollectionConfig } from 'payload'

import { canEditContent } from '@/access/canEditContent'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { publicTotpReadBypass } from '@/config/security'
import { blogLexicalEditor } from '@/utilities/blogLexicalEditor'

/**
 * Blog posts, create articles with rich text, categories, and tags.
 * Shown on /news (blog listing), article detail pages, and the home page slider.
 */
export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'featuredOnHome', 'status'],
    description:
      'Blog articles with rich text. Set a category and tags; toggle Featured on home to show in the home page news slider.',
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: authenticatedOrPublished,
    update: canEditContent,
  },
  custom: publicTotpReadBypass,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL path, e.g. my-article-title',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: 'Short summary shown on listing cards and the home slider.' },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: blogLexicalEditor,
      required: true,
      admin: {
        description:
          'Article body text and inline photos. Select text and use the link icon to add a hyperlink. Click + → Upload for inline images.',
      },
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'blog-posts',
      options: [
        { label: 'Blog Posts', value: 'blog-posts' },
        { label: 'GERMEL', value: 'germel' },
        { label: 'Programme', value: 'programme' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      admin: {
        description: 'Shown in the tag cloud and on the article page (e.g. Leadership, GERMEL).',
      },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'EPL Ghana',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      label: 'Featured on home',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this post in the home page news/blog slider.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
