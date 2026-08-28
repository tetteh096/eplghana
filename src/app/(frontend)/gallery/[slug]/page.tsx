import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ChariticsGalleryAlbumPage } from '@/components/charitics/ChariticsGalleryAlbumPage'
import { getGalleryAlbumBySlug, getGalleryPageContent } from '@/utilities/getGalleryContent'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const result = await getGalleryAlbumBySlug(slug)
  if (!result) {
    return { title: 'Album not found' }
  }
  return {
    title: `${result.album.title} | Photo Gallery`,
    description: result.album.description,
  }
}

export async function generateStaticParams() {
  const content = await getGalleryPageContent()
  return content.albums.map((album) => ({ slug: album.slug }))
}

export default async function GalleryAlbumPage({ params }: Props) {
  const { slug } = await params
  const result = await getGalleryAlbumBySlug(slug)
  if (!result) notFound()

  return (
    <main>
      <ChariticsGalleryAlbumPage content={result.page} album={result.album} />
    </main>
  )
}
