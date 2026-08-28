import Link from 'next/link'

import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'

export const metadata = { title: 'Knowledge Products' }

const items = [
  { href: '/news', label: 'Blog', description: 'Stories, insights, and updates from EPL Ghana.' },
  {
    href: '/news/events',
    label: 'News & Events',
    description: 'Programme events, graduations, and announcements.',
  },
  {
    href: '/knowledge-products/annual-reports',
    label: 'Annual Reports',
    description: 'Impact reports and yearly publications.',
  },
  {
    href: '/knowledge-products/newsletter',
    label: 'Newsletter',
    description: 'Newsletter editions and subscriptions.',
  },
]

export default function KnowledgeProductsPage() {
  return (
    <ChariticsPageMain crumbs={[{ label: 'Knowledge Products' }]} title="Knowledge Products">
      <section className="ul-section-spacing">
        <div className="ul-container">
          <div className="row row-cols-md-2 row-cols-1 ul-bs-row gy-4">
            {items.map((item) => (
              <div className="col" key={item.href}>
                <div className="ul-donate-form-wrapper h-100">
                  <h3 className="ul-section-title" style={{ fontSize: '1.35rem' }}>
                    <Link href={item.href}>{item.label}</Link>
                  </h3>
                  <p className="ul-section-descr mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ChariticsPageMain>
  )
}
