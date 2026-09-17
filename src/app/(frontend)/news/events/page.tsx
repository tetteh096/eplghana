import { ChariticsNewsEventsPage } from '@/components/charitics/ChariticsNewsEventsPage'
import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { getNewsEventsPageContent } from '@/utilities/getNewsEventsPageContent'

export const metadata = { title: 'News & Events' }

export default async function NewsEventsPage() {
  const content = await getNewsEventsPageContent()

  return (
    <ChariticsPageMain
      crumbs={[
        { href: '/knowledge-products', label: 'Knowledge Products' },
        { label: 'News & Events' },
      ]}
      title={content.hero.title}
    >
      <ChariticsNewsEventsPage content={content} />
    </ChariticsPageMain>
  )
}
