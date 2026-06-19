'use client'

import { Button, UploadField, useField, useListDrawer } from '@payloadcms/ui'
import type { CollectionSlug, Data, UploadFieldClientComponent } from 'payload'
import { useCallback } from 'react'

/**
 * Wraps Payload’s upload field with a always-visible “Browse Media Library”
 * button. The default UI hides “Choose from existing” once an image is set,
 * and the pencil icon opens the media editor (upload form) instead of the library.
 */
export const EplUploadField: UploadFieldClientComponent = (props) => {
  const relationTo = props.field.relationTo
  const collectionSlugs = (Array.isArray(relationTo) ? relationTo : [relationTo]).filter(
    (slug): slug is CollectionSlug => typeof slug === 'string',
  )

  const { setValue } = useField<string | { relationTo: string; value: string } | null>({
    potentiallyStalePath: props.path,
  })

  const [ListDrawer, , { closeDrawer, openDrawer }] = useListDrawer({
    collectionSlugs,
  })

  const onSelect = useCallback(
    ({
      collectionSlug,
      doc,
      docID,
    }: {
      collectionSlug: CollectionSlug
      doc: Data
      docID: string
    }) => {
      const isPolymorphic = Array.isArray(relationTo)
      const id = String(doc.id ?? docID)
      setValue(
        isPolymorphic
          ? { relationTo: collectionSlug, value: id }
          : id,
      )
      closeDrawer()
    },
    [closeDrawer, relationTo, setValue],
  )

  const readOnly = props.readOnly

  return (
    <div className="epl-upload-field">
      <UploadField {...props} />
      {!readOnly && collectionSlugs.length > 0 ? (
        <div className="epl-upload-field__browse">
          <Button buttonStyle="secondary" onClick={() => openDrawer()} size="small" type="button">
            Browse Media Library
          </Button>
          <p className="epl-upload-field__hint">
            Pick an existing file from Media, or remove the current image to upload a new one.
          </p>
          <ListDrawer onSelect={onSelect} />
        </div>
      ) : null}
    </div>
  )
}
