import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { ChariticsWhatWeDoPage } from '@/components/charitics/ChariticsWhatWeDoPage'
import { getWhatWeDoContent } from '@/utilities/getWhatWeDoContent'

export const metadata = { title: 'What We Do' }

export default async function WhatWeDoPage() {
  const content = await getWhatWeDoContent()

  return (
    <ChariticsPageMain
      crumbs={[
        { href: '/about', label: 'About Us' },
        { label: 'What We Do' },
      ]}
      title="What We Do"
    >
      <ChariticsWhatWeDoPage content={content} />
    </ChariticsPageMain>
  )
}
