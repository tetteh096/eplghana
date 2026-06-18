import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { ChariticsPlaceholder } from '@/components/charitics/ChariticsPlaceholder'

export const metadata = { title: 'Our Community' }

export default function CommunityPage() {
  return (
    <ChariticsPageMain crumbs={[{ label: 'Community' }]} title="Our Community">
      <section className="ul-about ul-section-spacing">
        <div className="ul-container">
          <div className="ul-about-txt text-center mx-auto" style={{ maxWidth: 820 }}>
            <span className="ul-section-sub-title">Community</span>
            <h1 className="ul-section-title">About Our Community</h1>
            <p className="ul-section-descr">
              At Emerging Public Leaders of Ghana, our strength lies in our people, a vibrant
              network of current fellows, Public Service Fellows, and partners dedicated to public
              service excellence.
            </p>
          </div>
        </div>
      </section>
      <ChariticsPlaceholder
        ctaHref="/contact"
        ctaLabel="Join Our Network"
        description="Community stories, fellow profiles, and partner highlights will appear here."
      />
    </ChariticsPageMain>
  )
}
