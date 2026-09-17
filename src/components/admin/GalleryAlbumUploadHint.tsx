'use client'

import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

export function GalleryAlbumUploadHint() {
  const { id } = useDocumentInfo()
  const slug = useFormFields(([fields]) => fields.slug?.value as string | undefined)
  const title = useFormFields(([fields]) => fields.title?.value as string | undefined)
  const folderPath = slug ? `gallery/${slug}` : 'gallery/your-album-slug'

  return (
    <div
      style={{
        padding: '16px 18px',
        border: '1px solid #dbeafe',
        background: '#eff6ff',
        color: '#1e3a8a',
        fontSize: 13,
        lineHeight: 1.6,
      }}
    >
      <strong style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>
        Add photos to {title?.trim() || 'this album'}
      </strong>
      {!id ? (
        <p style={{ margin: 0 }}>
          Save this album first (title, slug, description). Then upload images in the Media library and choose this
          album below.
        </p>
      ) : (
        <ol style={{ margin: '0 0 10px', paddingLeft: 18 }}>
          <li>
            Open <strong>Media</strong> in the sidebar → <strong>Create New</strong> or <strong>Bulk Upload</strong>.
          </li>
          <li>
            Set <strong>Gallery album</strong> to <strong>{title?.trim() || 'this album'}</strong>.
          </li>
          <li>Upload your images — they appear on `/gallery/{slug || '…'}` automatically.</li>
        </ol>
      )}
      <p style={{ margin: 0, fontSize: 12, color: '#475569' }}>
        Storage folder: <code>{folderPath}</code>
      </p>
    </div>
  )
}
