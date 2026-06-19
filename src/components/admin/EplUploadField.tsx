'use client'

import {
  BulkUploadProvider,
  Button,
  UploadInput,
  useConfig,
  useField,
  useListDrawer,
  withCondition,
} from '@payloadcms/ui'
import type { UploadInputProps } from '@payloadcms/ui'
import type { CollectionSlug, Data, UploadFieldClientComponent } from 'payload'
import React, { useCallback, useMemo } from 'react'

/**
 * Upload field with a persistent media-library picker that selects in place
 * (via ListDrawer + MediaListView picker mode) without leaving the edit form.
 */
const EplUploadFieldComponent: UploadFieldClientComponent = (props) => {
  const {
    field,
    field: {
      admin: { allowCreate, className, description, isSortable } = {},
      hasMany,
      label,
      localized,
      maxRows,
      relationTo: relationToFromProps,
      required,
    },
    path: pathFromProps,
    readOnly,
    validate,
  } = props

  const { config } = useConfig()
  const displayPreview = field.displayPreview

  const memoizedValidate = React.useCallback(
    (value: unknown, options: Record<string, unknown>) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, required } as Parameters<typeof validate>[1])
      }
      return true
    },
    [validate, required],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    disabled,
    filterOptions,
    path,
    setValue,
    showError,
    value: valueFromForm,
  } = useField({
    potentiallyStalePath: pathFromProps,
    validate: memoizedValidate,
  })

  const isPolymorphic = Array.isArray(relationToFromProps)
  const memoizedValue = React.useMemo(() => {
    if (hasMany === true) {
      return Array.isArray(valueFromForm)
        ? valueFromForm.map((val) =>
            isPolymorphic
              ? val
              : {
                  relationTo: Array.isArray(relationToFromProps)
                    ? relationToFromProps[0]
                    : relationToFromProps,
                  value: val,
                },
          )
        : valueFromForm
    }

    return valueFromForm
  }, [hasMany, valueFromForm, isPolymorphic, relationToFromProps])

  const collectionSlugs = (
    Array.isArray(relationToFromProps) ? relationToFromProps : [relationToFromProps]
  ).filter((slug): slug is CollectionSlug => typeof slug === 'string')

  const [ListDrawer, , { closeDrawer, openDrawer }] = useListDrawer({
    collectionSlugs,
    filterOptions,
  })

  const onBrowseSelect = useCallback(
    ({
      collectionSlug,
      doc,
      docID,
    }: {
      collectionSlug: CollectionSlug
      doc: Data
      docID: string
    }) => {
      const id = String(doc?.id ?? docID)

      if (hasMany) {
        const newValue = isPolymorphic
          ? { relationTo: collectionSlug, value: id }
          : id
        const existing = Array.isArray(valueFromForm) ? valueFromForm : []
        setValue([...existing, newValue])
      } else {
        setValue(
          isPolymorphic
            ? { relationTo: collectionSlug, value: id }
            : id,
        )
      }

      closeDrawer()
    },
    [closeDrawer, hasMany, isPolymorphic, setValue, valueFromForm],
  )

  const styles = useMemo(() => {
    const admin = field.admin as { style?: React.CSSProperties; width?: string } | undefined
    return {
      ...(admin?.style || {}),
      ...(admin?.width ? { '--field-width': admin.width } : { flex: '1 1 auto' }),
      ...(admin?.style?.flex ? { flex: admin.style.flex } : {}),
    }
  }, [field])

  const fieldReadOnly = readOnly || disabled
  const hasSelectedImage = Boolean(
    hasMany
      ? Array.isArray(valueFromForm) && valueFromForm.length > 0
      : valueFromForm,
  )

  return (
    <BulkUploadProvider drawerSlugPrefix={pathFromProps}>
      <div className="epl-upload-field">
        <UploadInput
          AfterInput={AfterInput}
          allowCreate={allowCreate !== false}
          api={config.routes.api}
          BeforeInput={BeforeInput}
          className={className}
          Description={Description}
          description={description}
          displayPreview={displayPreview}
          Error={Error}
          filterOptions={filterOptions}
          hasMany={hasMany}
          isSortable={isSortable}
          label={label}
          Label={Label}
          localized={localized}
          maxRows={maxRows}
          onChange={setValue}
          path={path}
          readOnly={fieldReadOnly}
          relationTo={relationToFromProps}
          required={required}
          serverURL={config.serverURL}
          showError={showError}
          style={styles}
          value={memoizedValue as UploadInputProps['value']}
        />
        {!fieldReadOnly && collectionSlugs.length > 0 ? (
          <div className="epl-upload-field__browse">
            <Button buttonStyle="secondary" onClick={() => openDrawer()} size="small" type="button">
              {hasSelectedImage ? 'Change image' : 'Browse Media Library'}
            </Button>
            <p className="epl-upload-field__hint">
              Opens the media library here. Click an image to select it, then Save this page.
            </p>
            <ListDrawer onSelect={onBrowseSelect} />
          </div>
        ) : null}
      </div>
    </BulkUploadProvider>
  )
}

export const EplUploadField = withCondition(EplUploadFieldComponent)
