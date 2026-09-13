import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ChariticsEplimDetail } from '@/components/charitics/ChariticsEplimDetail'
import { ChariticsFellowshipDetail } from '@/components/charitics/ChariticsFellowshipDetail'
import { ChariticsPageMain } from '@/components/charitics/ChariticsPageMain'
import { ChariticsPeaceDetail } from '@/components/charitics/ChariticsPeaceDetail'
import { ChariticsWotrDetail } from '@/components/charitics/ChariticsWotrDetail'
import { isElevatedMindsSlug } from '@/config/elevatedMinds'
import { getProjectVisualClass } from '@/config/projectsPageContent'
import { getStaticProject } from '@/config/staticProjects'
import { getEplimProjectContent } from '@/utilities/getEplimProjectContent'
import { getFellowshipProjectContent } from '@/utilities/getFellowshipProjectContent'
import { getPeaceProjectContent } from '@/utilities/getPeaceProjectContent'
import { getWotrProjectContent } from '@/utilities/getWotrProjectContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { tryGetPayload } from '@/utilities/payloadSafe'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  let project = undefined
  const payload = await tryGetPayload()
  if (payload) {
    try {
      project = (
        await payload.find({
          collection: 'projects',
          depth: 0,
          limit: 1,
          where: { slug: { equals: slug } },
        })
      ).docs[0]
    } catch (err) {
      console.warn(`[ProjectDetailPage] generateMetadata find failed:`, err)
    }
  }

  const eplimHeroTitle =
    project &&
    typeof project === 'object' &&
    'eplimDetail' in project &&
    project.eplimDetail &&
    typeof (project.eplimDetail as { heroTitle?: unknown }).heroTitle === 'string'
      ? (project.eplimDetail as { heroTitle: string }).heroTitle.trim()
      : ''

  const title =
    eplimHeroTitle ||
    (typeof project?.title === 'string' ? project.title.trim() : '') ||
    getStaticProject(slug)?.title ||
    'Project'

  return { title }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await tryGetPayload()
  let cmsProject = undefined
  if (payload) {
    try {
      cmsProject = (
        await payload.find({
          collection: 'projects',
          depth: 1,
          limit: 1,
          where: { slug: { equals: slug } },
        })
      ).docs[0]
    } catch (err) {
      console.warn(`[ProjectDetailPage] payload.find failed:`, err)
    }
  }
  const staticProject = getStaticProject(slug)

  if (!cmsProject && !staticProject) {
    notFound()
  }

  const title = cmsProject?.title ?? staticProject!.title
  const summary = cmsProject?.summary ?? staticProject!.summary
  const description = cmsProject?.summary ?? staticProject!.description
  const image = getMediaUrl(cmsProject?.featuredImage)

  if (slug === 'women-on-the-rise' || cmsProject?.detailLayout === 'wotr') {
    const wotrContent = await getWotrProjectContent(slug)

    return (
      <main>
        <ChariticsWotrDetail content={wotrContent} visualClass={getProjectVisualClass(slug)} />
      </main>
    )
  }

  if (slug === 'public-service-fellowship' || cmsProject?.detailLayout === 'fellowship') {
    const fellowshipContent = await getFellowshipProjectContent(slug)

    return (
      <main>
        <ChariticsFellowshipDetail
          content={fellowshipContent}
          visualClass={getProjectVisualClass(slug)}
        />
      </main>
    )
  }

  if (slug === 'peace' || cmsProject?.detailLayout === 'peace') {
    const peaceContent = await getPeaceProjectContent(slug)

    return (
      <main>
        <ChariticsPeaceDetail
          content={peaceContent}
          visualClass={getProjectVisualClass(slug)}
        />
      </main>
    )
  }

  if (
    isElevatedMindsSlug(slug) ||
    (cmsProject as { detailLayout?: string } | undefined)?.detailLayout === 'eplim'
  ) {
    const eplimContent = await getEplimProjectContent(slug)

    return (
      <main>
        <ChariticsEplimDetail
          content={eplimContent}
          visualClass={getProjectVisualClass(slug)}
        />
      </main>
    )
  }

  return (
    <ChariticsPageMain
      crumbs={[
        { href: '/projects', label: 'Projects' },
        { label: title },
      ]}
      title={title}
    >
      <section className="ul-section-spacing">
        <div className="ul-container">
          <div className="row ul-bs-row gy-4 align-items-start">
            <div className="col-lg-6">
              {image ? (
                <img alt={title} className="w-100 rounded" src={image} />
              ) : (
                <div
                  aria-hidden
                  className={`epl-project-card-visual epl-project-detail-visual ${getProjectVisualClass(slug)}`}
                />
              )}
            </div>
            <div className="col-lg-6">
              <span className="ul-section-sub-title">{summary}</span>
              <h1 className="ul-section-title">{title}</h1>
              <p className="ul-section-descr">{description}</p>
              <Link className="ul-btn" href="/get-involved">
                <i className="flaticon-fast-forward-double-right-arrows-symbol"></i> Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ChariticsPageMain>
  )
}
