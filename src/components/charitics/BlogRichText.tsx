'use client'

import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { LinkJSXConverter, RichText } from '@payloadcms/richtext-lexical/react'

type ElementFormatType = 'center' | 'end' | 'justify' | 'left' | 'right' | 'start'

type BlogUploadFields = {
  alt?: string | null
  caption?: string | null
  displaySize?: 'full' | 'large' | 'medium' | 'small' | null
}

type UploadDoc = {
  alt?: string | null
  filename?: string | null
  height?: number | null
  mimeType?: string | null
  url?: string | null
  width?: number | null
}

const DISPLAY_SIZE_CLASS: Record<NonNullable<BlogUploadFields['displaySize']>, string> = {
  full: 'epl-blog-figure--full',
  large: 'epl-blog-figure--large',
  medium: 'epl-blog-figure--medium',
  small: 'epl-blog-figure--small',
}

function alignClass(format?: ElementFormatType | ''): string {
  if (!format || format === 'start' || format === 'left') return 'epl-blog-figure--align-left'
  if (format === 'center') return 'epl-blog-figure--align-center'
  if (format === 'end' || format === 'right') return 'epl-blog-figure--align-right'
  return ''
}

type InternalDocToHref = NonNullable<
  Parameters<typeof LinkJSXConverter>[0]['internalDocToHref']
>

const internalDocToHref: InternalDocToHref = ({ linkNode }) => {
  const doc = linkNode.fields.doc
  if (!doc) return '#'

  const value = doc.value
  const slug =
    typeof value === 'object' && value !== null && 'slug' in value && value.slug
      ? String(value.slug)
      : ''
  if (!slug) return '#'

  switch (doc.relationTo) {
    case 'news':
      return `/news/${slug}`
    case 'events':
      return `/events/${slug}`
    case 'projects':
      return `/projects/${slug}`
    default:
      return `/${slug}`
  }
}

const blogConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  upload: ({ node }) => {
    if (typeof node.value !== 'object' || node.value === null) return null

    const uploadDoc = node.value as UploadDoc
    const fields = (node.fields ?? {}) as BlogUploadFields
    const url = uploadDoc.url

    if (!url) return null

    const alt = fields.alt || uploadDoc.alt || uploadDoc.filename || ''
    const displaySize = fields.displaySize ?? 'full'
    const sizeClass = DISPLAY_SIZE_CLASS[displaySize] ?? DISPLAY_SIZE_CLASS.full
    const format = 'format' in node ? (node.format as ElementFormatType | '') : ''

    if (!uploadDoc.mimeType?.startsWith('image')) {
      return (
        <a href={url} rel="noopener noreferrer" target="_blank">
          {uploadDoc.filename ?? 'Download file'}
        </a>
      )
    }

    return (
      <figure
        className={['epl-blog-figure', sizeClass, alignClass(format)].filter(Boolean).join(' ')}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={alt} loading="lazy" src={url} />
        {fields.caption ? <figcaption>{fields.caption}</figcaption> : null}
      </figure>
    )
  },
})

type BlogRichTextProps = {
  className?: string
  content: Record<string, unknown>
}

export function BlogRichText({ className, content }: BlogRichTextProps) {
  return (
    <div className={className}>
      <RichText converters={blogConverters} data={content as never} />
    </div>
  )
}
