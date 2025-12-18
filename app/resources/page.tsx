// ============================================================================
// RESOURCES PAGE - Route: /resources
// ============================================================================
// This page is accessible at http://localhost:3000/resources
// Displays filtered Sanity documents (blog, event, resource)
// ============================================================================

'use client'

import { useState } from 'react'
import FilterBar from '../components/filterBar'
import ResourceList from '../components/ResourceList'

const filterOptions = [
  { label: 'Blog', value: 'blog' },
  { label: 'Guide', value: 'guide' },
  { label: 'Story', value: 'story' },
]

export default function Resources() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  return (
    <main>
      <FilterBar 
        options={filterOptions}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
      <ResourceList filter={selectedFilter} />
    </main>
  )
}
