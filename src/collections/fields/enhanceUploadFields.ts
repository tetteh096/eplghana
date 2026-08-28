import type { Field, UploadField } from 'payload'

const EPL_UPLOAD_FIELD = '/components/admin/EplUploadField#EplUploadField'

function enhanceUploadField(field: UploadField): UploadField {
  return {
    ...field,
    admin: {
      ...field.admin,
      components: {
        ...field.admin?.components,
        Field: EPL_UPLOAD_FIELD,
      },
    },
  } as UploadField
}

function enhanceField(field: Field): Field {
  if (field.type === 'upload') {
    return enhanceUploadField(field)
  }

  if (field.type === 'array' && field.fields) {
    return { ...field, fields: field.fields.map(enhanceField) }
  }

  if (field.type === 'group' && field.fields) {
    return { ...field, fields: field.fields.map(enhanceField) }
  }

  if (field.type === 'collapsible' && field.fields) {
    return { ...field, fields: field.fields.map(enhanceField) }
  }

  if (field.type === 'row' && field.fields) {
    return { ...field, fields: field.fields.map(enhanceField) }
  }

  if (field.type === 'tabs' && field.tabs) {
    return {
      ...field,
      tabs: field.tabs.map((tab) => ({
        ...tab,
        fields: tab.fields.map(enhanceField),
      })),
    }
  }

  if (field.type === 'blocks' && field.blocks) {
    return {
      ...field,
      blocks: field.blocks.map((block) => ({
        ...block,
        fields: block.fields.map(enhanceField),
      })),
    }
  }

  return field
}

/** Adds a persistent “Browse Media Library” control to every upload → media field. */
export function enhanceUploadFields(fields: Field[]): Field[] {
  return fields.map(enhanceField)
}
