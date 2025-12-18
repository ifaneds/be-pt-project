'use client'

import { useEffect, useState } from 'react'
import { getDocuments } from '@/sanity/lib/queries'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface Document {
  _id: string
  _type: string
  name: string
  description?: string
  image?: any
  _createdAt: string
}

interface ResourceListProps {
  filter: string
}

export default function ResourceList({ filter }: ResourceListProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDocuments() {
      setLoading(true)
      
      try {
        const data = await getDocuments(filter === 'all' ? undefined : filter)
        setDocuments(data)
      } catch (error) {
        console.error('Error fetching documents:', error)
        setDocuments([])
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [filter])

  if (loading) {
    return <div>Loading...</div>
  }

  if (documents.length === 0) {
    return <div>No documents found.</div>
  }

  return (
    <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
      {documents.map((doc) => (
        <article key={doc._id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          {doc.image && (
            <Image
              src={urlFor(doc.image).width(400).height(300).url()}
              alt={doc.name}
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '1rem' }}
            />
          )}
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>{doc.name}</h3>
          {doc.description && (
            <p style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>{doc.description}</p>
          )}
          <span style={{ fontSize: '0.875rem', color: 'var(--accent-color-3)' }}>
            Type: {doc._type}
          </span>
        </article>
      ))}
    </div>
  )
}

