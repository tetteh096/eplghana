import { randomBytes } from 'crypto'

function paragraphNode(text: string): Record<string, unknown> {
  return {
    type: 'paragraph',
    children: [{ type: 'text', text, format: 0, mode: 'normal', style: '', version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

/** Lexical upload node pointing at a Media collection document. */
export function createUploadLexicalNode(
  mediaId: string,
  options?: { caption?: string; displaySize?: 'full' | 'large' | 'medium' | 'small' },
): Record<string, unknown> {
  return {
    type: 'upload',
    version: 3,
    id: randomBytes(12).toString('hex'),
    relationTo: 'media',
    value: mediaId,
    fields: {
      caption: options?.caption ?? '',
      displaySize: options?.displaySize ?? 'large',
    },
    format: '',
  }
}

/**
 * Build Lexical content with inline images inserted after a given paragraph index.
 * Used when migrating WordPress posts whose images are attached to the post.
 */
export function buildLexicalWithInlineImages(
  paragraphs: string[],
  mediaIds: string[],
  insertAfterParagraphIndex = 0,
): Record<string, unknown> {
  const children: Record<string, unknown>[] = []
  const insertAt = Math.max(0, Math.min(insertAfterParagraphIndex, paragraphs.length - 1))

  paragraphs.forEach((text, index) => {
    children.push(paragraphNode(text))
    if (index === insertAt && mediaIds.length > 0) {
      for (const mediaId of mediaIds) {
        children.push(createUploadLexicalNode(mediaId, { displaySize: 'large' }))
      }
    }
  })

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/** Build a minimal Lexical document from plain-text paragraphs (for seeding). */
export function paragraphsToLexical(paragraphs: string[]): Record<string, unknown> {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => paragraphNode(text)),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

/** Extract plain paragraphs from Lexical JSON (fallback when RichText is unavailable). */
export function lexicalToParagraphs(content: unknown): string[] {
  if (!content || typeof content !== 'object') return []
  const root = content as { root?: { children?: unknown[] } }
  const paragraphs: string[] = []

  for (const node of root.root?.children ?? []) {
    if (
      typeof node === 'object' &&
      node !== null &&
      'type' in node &&
      node.type === 'paragraph' &&
      'children' in node &&
      Array.isArray(node.children)
    ) {
      const text = node.children
        .map((child) =>
          typeof child === 'object' && child !== null && 'text' in child
            ? String(child.text)
            : '',
        )
        .join('')
        .trim()

      if (text) paragraphs.push(text)
    }
  }

  return paragraphs
}
