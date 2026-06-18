import { ChariticsAlumniPage } from '@/components/charitics/ChariticsAlumniPage'
import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { getEplanPageContent } from '@/utilities/getEplanPageContent'

export const metadata = {
  title: 'EPLAN | Public Service Fellows Network',
  description:
    'The Public Service Fellows Network (PSFN), also known as EPLAN, the Emerging Public Leaders of Ghana Alumni Network.',
}

export default async function EplanPage() {
  const content = await getEplanPageContent()

  return (
    <ChariticsPageMain
      crumbs={[
        { href: '/community', label: 'Community' },
        { label: 'EPLAN' },
      ]}
      title="EPLAN"
    >
      <ChariticsAlumniPage content={content} />
    </ChariticsPageMain>
  )
}
