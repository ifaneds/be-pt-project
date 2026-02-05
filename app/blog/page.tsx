'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import FilterBar from '../components/filterBar'
import ResourceList from '../components/ResourceList'

const filterOptions = [
  { label: 'Blog', value: 'blog' },
  { label: 'Guides', value: 'guide' },
  { label: 'Stories', value: 'story' },
]

type FilterValue = 'all' | 'blog' | 'guide' | 'story'

function BlogPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const filterParam = searchParams.get('filter')
  const selectedFilter: FilterValue =
    filterParam === 'blog' || filterParam === 'guide' || filterParam === 'story'
      ? filterParam
      : 'all'

  const handleFilterChange = (v: string) => {
    const next = (v as FilterValue) || 'all'
    const params = new URLSearchParams(searchParams.toString())
    if (next === 'all') params.delete('filter')
    else params.set('filter', next)
    const q = params.toString()
    router.push(q ? `${pathname}?${q}` : pathname)
  }

  return (
    <main>
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">Resources</h1>
          <p className="hero-tagline">
            Blog posts, guides, and stories — designed to build confidence and keep training simple.
          </p>
        </div>
      </section>

      <section className="loopgroep-section">
        <div className="loopgroep-container">
          <div className="loopgroep-header">
            <FilterBar
              options={filterOptions}
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
          <ResourceList filter={selectedFilter} />
        </div>
      </section>
    </main>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <main>
        <section className="hero-section">
          <div className="hero-container">
            <h1 className="hero-title">Resources</h1>
            <p className="hero-tagline">
              Blog posts, guides, and stories — designed to build confidence and keep training simple.
            </p>
          </div>
        </section>
        <section className="loopgroep-section">
          <div className="loopgroep-container">
            <div className="loopgroep-header" />
            <div className="muted" style={{ padding: '2rem' }}>Loading…</div>
          </div>
        </section>
      </main>
    }>
      <BlogPageContent />
    </Suspense>
  )
}
