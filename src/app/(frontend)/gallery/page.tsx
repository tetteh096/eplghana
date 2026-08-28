import { ChariticsGalleryPage } from '@/components/charitics/ChariticsGalleryPage'
import { getGalleryPageContent } from '@/utilities/getGalleryContent'

export const metadata = {
  title: 'Photo Gallery',
  description:
    'Explore visual snapshots and media highlights of Emerging Public Leaders of Ghana.',
}

export default async function GalleryPage() {
  const content = await getGalleryPageContent()

  return (
    <main>
      <ChariticsGalleryPage content={content} />
    </main>
  )
}
