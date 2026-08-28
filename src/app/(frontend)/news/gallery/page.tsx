import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Photo Gallery',
  description:
    'Explore visual snapshots and media highlights of Emerging Public Leaders of Ghana.',
}

export default function NewsGalleryPage() {
  redirect('/gallery')
}
