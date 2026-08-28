import { redirect } from 'next/navigation'

export const metadata = { title: 'EPLAN | Public Service Fellows Network' }

export default function AlumniPage() {
  redirect('/community/eplan')
}
