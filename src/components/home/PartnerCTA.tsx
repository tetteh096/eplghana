import Link from 'next/link'

export function PartnerCTA() {
  return (
    <section className="epl-section bg-white">
      <div className="epl-container">
        <div className="rounded-3xl border border-epl-border bg-epl-mist px-8 py-14 text-center md:px-16">
          <h2 className="epl-section-title">Do You Want To Partner With Us?</h2>
          <p className="epl-lead mx-auto mt-4 max-w-2xl">
            Join institutions, donors, and organisations investing in Ghana&apos;s next generation of
            public service leaders.
          </p>
          <Link className="epl-btn mt-8" href="/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
