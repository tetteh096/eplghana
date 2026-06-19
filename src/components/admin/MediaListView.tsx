'use client'

import type { CollectionSlug, Data, ListViewClientProps } from 'payload'
import {
  DefaultListView,
  Link,
  Thumbnail,
  useListDrawerContext,
  useListQuery,
} from '@payloadcms/ui'

/**
 * Card-grid list view for the Media library.
 *
 * In the normal Media collection, cards link to each file’s edit page.
 * Inside a picker drawer (Projects, Pages, etc.), cards select the file
 * in place — they must not navigate away from the document being edited.
 */
export function MediaListView(props: ListViewClientProps) {
  const editBase = props.newDocumentURL.replace(/\/create$/, '')

  return (
    <div className="epl-media-cardify">
      <DefaultListView {...props} />
      <MediaCardGrid collectionSlug={props.collectionSlug} editBase={editBase} />
    </div>
  )
}

function MediaCardGrid({
  collectionSlug,
  editBase,
}: {
  collectionSlug: CollectionSlug
  editBase: string
}) {
  const { data } = useListQuery()
  const { isInDrawer, onSelect } = useListDrawerContext()
  const docs = (data?.docs ?? []) as Array<Record<string, unknown>>
  const isPicker = isInDrawer && typeof onSelect === 'function'

  if (docs.length === 0) {
    return (
      <p className="epl-media-cardify__empty">
        No media yet. Use “Create New” or “Bulk Upload” above to add photos.
      </p>
    )
  }

  return (
    <>
      {isPicker ? (
        <p className="epl-media-cardify__picker-hint">Click an image to select it for this field.</p>
      ) : null}
      <div className={`epl-media-cardify__grid${isPicker ? ' epl-media-cardify__grid--picker' : ''}`}>
        {docs.map((doc) => (
          <MediaCard
            collectionSlug={collectionSlug}
            doc={doc}
            editBase={editBase}
            isPicker={isPicker}
            key={String(doc.id)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </>
  )
}

function MediaCard({
  collectionSlug,
  doc,
  editBase,
  isPicker,
  onSelect,
}: {
  collectionSlug: CollectionSlug
  doc: Record<string, unknown>
  editBase: string
  isPicker: boolean
  onSelect?: (args: { collectionSlug: CollectionSlug; doc: Data; docID: string }) => void
}) {
  const id = String(doc.id)
  const filename = (doc.filename as string) || 'Untitled file'
  const alt = (doc.alt as string) || ''
  const folder = (doc.folder as string) || 'general'
  const mimeType = (doc.mimeType as string) || ''
  const ext = filename.includes('.') ? filename.split('.').pop()!.toUpperCase() : 'FILE'
  const fileSrc = (doc.thumbnailURL as string) || (doc.url as string) || ''
  const isImage =
    mimeType.startsWith('image') || /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(filename)

  const content = (
    <>
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
    </>
  )

  if (isPicker && onSelect) {
    return (
      <button
        className="epl-media-cardify__card epl-media-cardify__card--picker"
        onClick={() =>
          onSelect({
            collectionSlug,
            doc: doc as Data,
            docID: id,
          })
        }
        type="button"
      >
        {content}
      </button>
    )
  }

  return (
    <Link className="epl-media-cardify__card" href={`${editBase}/${id}`}>
      {content}
    </Link>
  )
}
