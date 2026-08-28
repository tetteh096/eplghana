import {
  FixedToolbarFeature,
  lexicalEditor,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

/**
 * Blog article body editor, fixed toolbar plus image size/caption controls.
 * The last UploadFeature wins over the default, so we append a custom one.
 */
export const blogLexicalEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    FixedToolbarFeature(),
    ...defaultFeatures.filter((feature) => feature.key !== 'relationship'),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
              label: 'Caption',
              admin: {
                description: 'Optional text shown below the image on the website.',
              },
            },
            {
              name: 'displaySize',
              type: 'select',
              label: 'Display size',
              defaultValue: 'full',
              options: [
                { label: 'Full width (100%)', value: 'full' },
                { label: 'Large (85%)', value: 'large' },
                { label: 'Medium (65%)', value: 'medium' },
                { label: 'Small (45%)', value: 'small' },
              ],
              admin: {
                description:
                  'How wide the image appears in the article. The full image is always shown, nothing is cropped.',
              },
            },
          ],
        },
      },
    }),
  ],
})
