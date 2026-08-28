import { ChariticsProjectsPage } from '@/components/charitics/ChariticsProjectsPage'
import { getProjectsPageContent } from '@/utilities/getProjectsPageContent'

export const metadata = { title: 'Projects' }

export default async function ProjectsPage() {
  const content = await getProjectsPageContent()

  return (
    <main>
      <ChariticsProjectsPage content={content} />
    </main>
  )
}
