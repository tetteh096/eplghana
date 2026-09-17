import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { ChariticsPlaceholder } from '@/components/charitics/ChariticsPlaceholder'

export const metadata = { title: 'Newsletter' }

export default function NewsletterPage() {
  return (
    <ChariticsPageMain
      crumbs={[
        { href: '/knowledge-products', label: 'Knowledge Products' },
        { label: 'Newsletter' },
      ]}
      title="Newsletter"
    >
      <ChariticsPlaceholder description="Newsletter editions and subscription options will be added here." />
    </ChariticsPageMain>
  )
}
