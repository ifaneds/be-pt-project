'use client'

import { useEffect, useState } from 'react'
import { getDocuments } from '@/sanity/lib/queries'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { blogPostHref } from '@/app/lib/public'

interface Document {
  _id: string
  _type: string
  name: string
  slug?: { current?: string }
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
    return (
      <div className="blog-state">
        <div className="muted">Loading…</div>
      </div>
    )
  }

  if (documents.length === 0) {
    return (
      <div className="blog-state">
        <div className="h2">No content yet</div>
        <div className="muted">Create a Blog, Guide, or Story in Sanity Studio and it’ll appear here.</div>
        <Link className="button button-secondary" href="/studio">Open Studio</Link>
      </div>
    )
  }

  return (
    <div className="blog-grid">
      {documents.map((doc) => {
        const slug = doc.slug?.current

        const body = (
          <>
            {doc.image && (
              <div className="blog-card-media">
                <Image
                  src={urlFor(doc.image).width(800).height(600).url()}
                  alt={doc.image?.alt || doc.name}
                  width={800}
                  height={600}
                  className="blog-card-image"
                />
              </div>
            )}

            <div className="blog-card-body">
              <div className="blog-card-meta">
                <span className="pill">{doc._type}</span>
              </div>

              <h2 className="blog-card-title">{doc.name}</h2>
              {doc.description && <p className="blog-card-excerpt">{doc.description}</p>}
            </div>
          </>
        )

        return (
          <article key={doc._id} className="blog-card">
            {slug ? (
              <Link className="blog-card-link" href={blogPostHref(slug)} aria-label={`Read ${doc.name}`}>
                {body}
              </Link>
            ) : (
              <div className="card">
                <div className="h2">{doc.name}</div>
                <div className="muted">Missing slug — add one in Studio to publish this item.</div>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}

