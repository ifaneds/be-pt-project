'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import FilterBar from '../components/filterBar'
import ResourceList from '../components/ResourceList'

const filterOptions = [
  { label: 'Blog', value: 'blog' },
  { label: 'Guides', value: 'guide' },
  { label: 'Stories', value: 'story' },
]

function BlogPageContent() {
  const searchParams = useSearchParams()
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'blog' | 'guide' | 'story'>('all')

  useEffect(() => {
    const filter = searchParams.get('filter')
    if (filter === 'blog' || filter === 'guide' || filter === 'story') {
      setSelectedFilter(filter)
    }
  }, [searchParams])

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
              onFilterChange={(v) => setSelectedFilter((v as 'all' | 'blog' | 'guide' | 'story') || 'all')}
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
