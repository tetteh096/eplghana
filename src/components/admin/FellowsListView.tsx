'use client'

import { DefaultListView, Link } from '@payloadcms/ui'
import type { ListViewClientProps } from 'payload'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type CohortTab = {
  id: string
  label: string
}

function cohortFilterFromSearch(searchParams: URLSearchParams): string | null {
  return (
    searchParams.get('where[cohort][equals]') ??
    searchParams.get('where[cohort][in][0]') ??
    null
  )
}

/**
 * Fellows list with one-click cohort tabs (C7, C8, etc.) above the table.
 */
export function FellowsListView(props: ListViewClientProps) {
  const searchParams = useSearchParams()
  const activeCohortId = cohortFilterFromSearch(searchParams)
  const [cohorts, setCohorts] = useState<CohortTab[]>([])

  useEffect(() => {
    let cancelled = false

    void fetch('/api/cohorts?limit=20&sort=order&depth=0')
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return
        const docs = Array.isArray(data?.docs) ? data.docs : []
        setCohorts(
          docs.map((cohort: { id: string; title?: string; shortLabel?: string }) => ({
            id: String(cohort.id),
            label: cohort.shortLabel?.trim() || cohort.title?.trim() || 'Cohort',
          })),
        )
      })
      .catch(() => {
        if (!cancelled) setCohorts([])
      })

    return () => {
      cancelled = true
    }
  }, [])

  const baseHref = useMemo(
    () => `/admin/collections/${String(props.collectionSlug)}`,
    [props.collectionSlug],
  )

  return (
    <div className="epl-fellows-list">
      <div className="epl-fellows-list__intro">
        <strong>Filter by cohort</strong>
        <span>
          Click a cohort tab below, or open <em>Cohorts → Cohort 7</em> to see members on the cohort
          page.
        </span>
      </div>

      <div className="epl-fellows-list__tabs" role="tablist" aria-label="Filter fellows by cohort">
        <Link
          className={`epl-fellows-list__tab${activeCohortId ? '' : ' is-active'}`}
          href={baseHref}
        >
          All fellows
        </Link>
        {cohorts.map((cohort) => (
          <Link
            key={cohort.id}
            className={`epl-fellows-list__tab${activeCohortId === cohort.id ? ' is-active' : ''}`}
            href={`${baseHref}?where[cohort][equals]=${cohort.id}`}
          >
            {cohort.label}
          </Link>
        ))}
      </div>

      <DefaultListView {...props} />
    </div>
  )
}
