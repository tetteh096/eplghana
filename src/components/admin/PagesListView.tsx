import { DefaultListView } from '@payloadcms/ui'
import type { ListViewClientProps } from 'payload'

/**
 * Custom list view for the fixed "Pages" collection.
 *
 * Pages are edit-only (you update their content with a live preview, you don't
 * create or delete them, see src/collections/Pages.ts). This wraps Payload's
 * standard list view and prefaces it with a short reminder of that, so the
 * screen reads as "your site's pages" rather than a generic collection list.
 */
export function PagesListView(props: ListViewClientProps) {
  return (
    <div className="epl-pages-list">
      <div
        style={{
          margin: 'var(--base) calc(var(--base) * 2) 0',
          padding: 'calc(var(--base) * 0.75) var(--base)',
          borderRadius: '6px',
          background: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-100)',
          color: 'var(--theme-elevation-600)',
          fontSize: '0.85rem',
          lineHeight: 1.5,
        }}
      >
        <strong style={{ color: 'var(--theme-elevation-800)' }}>
          Editing your site pages.
        </strong>{' '}
        Select a page to update its content with a live preview. Pages are fixed : 
        you don&apos;t create or delete them here.
      </div>
      <DefaultListView {...props} />
    </div>
  )
}
