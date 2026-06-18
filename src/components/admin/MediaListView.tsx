'use client'

import type { ListViewClientProps } from 'payload'
import { DefaultListView, Link, Thumbnail, useListQuery } from '@payloadcms/ui'

/**
 * Card-grid list view for the Media library.
 *
 * Renders Payload's standard list view (so Create New, Bulk Upload, search,
 * filters, sort and pagination all keep working and stay in sync), then adds a
 * thumbnail card grid below it. The default table is hidden via CSS
 * (.epl-media-cardify .table) so Media reads as an easy-to-scan gallery.
 */
export function MediaListView(props: ListViewClientProps) {
  const editBase = props.newDocumentURL.replace(/\/create$/, '')

  return (
    <div className="epl-media-cardify">
      <DefaultListView {...props} />
      <MediaCardGrid editBase={editBase} />
    </div>
  )
}

function MediaCardGrid({ editBase }: { editBase: string }) {
  const { data } = useListQuery()
  const docs = (data?.docs ?? []) as Array<Record<string, unknown>>

  if (docs.length === 0) {
    return (
      <p className="epl-media-cardify__empty">
        No media yet. Use “Create New” or “Bulk Upload” above to add photos.
      </p>
    )
  }

  return (
    <div className="epl-media-cardify__grid">
      {docs.map((doc) => {
        const id = String(doc.id)
        const filename = (doc.filename as string) || 'Untitled file'
        const alt = (doc.alt as string) || ''
        const folder = (doc.folder as string) || 'general'
        const mimeType = (doc.mimeType as string) || ''
        const ext = filename.includes('.') ? filename.split('.').pop()!.toUpperCase() : 'FILE'
        // Payload's <Thumbnail> renders the image from `fileSrc` only — `doc`
        // alone won't resolve a URL, so pass the upload's own url/thumbnail.
        const fileSrc =
          (doc.thumbnailURL as string) || (doc.url as string) || ''
        const isImage = mimeType.startsWith('image') || /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(filename)

        return (
          <Link className="epl-media-cardify__card" href={`${editBase}/${id}`} key={id}>
            <span className="epl-media-cardify__thumb">
              {isImage && fileSrc ? (
                <Thumbnail doc={doc} fileSrc={fileSrc} size="medium" />
              ) : (
                <span className="epl-media-cardify__ext">{ext}</span>
              )}
            </span>
            <span className="epl-media-cardify__name" title={filename}>
              {alt || filename}
            </span>
            <span className="epl-media-cardify__folder">{folder}</span>
            <span className="epl-media-cardify__file" title={filename}>
              {filename}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
