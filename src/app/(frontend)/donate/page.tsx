import { ChariticsDonatePage } from '@/components/charitics/ChariticsDonatePage'
import { isPaystackConfigured } from '@/lib/paystack'
import { getDonatePageContent } from '@/utilities/getDonatePageContent'

export const metadata = { title: 'Donate | Support EPL Ghana' }

export default async function DonatePage() {
  const content = await getDonatePageContent()

  return (
    <main>
      <ChariticsDonatePage content={content} paystackEnabled={isPaystackConfigured()} />
    </main>
  )
}
