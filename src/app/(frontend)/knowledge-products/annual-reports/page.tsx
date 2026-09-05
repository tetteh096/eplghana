import { redirect } from 'next/navigation'

export const metadata = { title: 'Annual Reports' }

export default function AnnualReportsPage() {
  redirect('/impact#annual-reports')
}
