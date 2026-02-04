'use client'

import ResourceList from './ResourceList'

export default function PostList({ filter }: { filter: 'all' | 'blog' | 'guide' | 'story' }) {
  return <ResourceList filter={filter} />
}
