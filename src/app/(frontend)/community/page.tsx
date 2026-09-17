import { redirect } from 'next/navigation'

export const metadata = { title: 'Our Community' }

export default function CommunityPage() {
  redirect('/community/current-fellows')
}
