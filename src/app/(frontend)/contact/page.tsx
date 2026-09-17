import { ChariticsContactPage } from '@/components/charitics/ChariticsContactPage'
import { getContactContent } from '@/utilities/getContactContent'
import { getSiteSettings } from '@/utilities/payloadSafe'

export const metadata = { title: 'Contact Us | EPL Ghana' }

export default async function ContactPage() {
  const [settings, content] = await Promise.all([getSiteSettings(1), getContactContent()])

  return (
    <main className="bg-white min-h-screen">
      <ChariticsContactPage
        contact={{
          phone: settings.phone ?? '+233 24 606 4766',
          email: settings.email ?? 'info@eplghana.org',
          address:
            settings.address ?? 'No.1 Justice Sarkodee Addo Avenue, East Legon, Accra',
        }}
        content={content}
      />
    </main>
  )
}
