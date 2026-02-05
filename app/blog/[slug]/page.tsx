import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getDocumentBySlug, getSlugs } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import PostContent from '@/app/components/PostContent'

// With output: 'export', Next.js requires at least one param for dynamic routes.
export async function generateStaticParams() {
  const slugs = await getSlugs()
  if (slugs.length === 0) return [{ slug: '__no_posts' }]
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug === '__no_posts') notFound()
  let doc
  try {
    doc = await getDocumentBySlug(slug)
  } catch {
    notFound()
  }

  if (!doc) notFound()

  return (
    <main className="page-main">
      <div className="page-container">
        <div className="page-header">
          <h1>{doc.name}</h1>
          <div className="pill" style={{ width: 'fit-content' }}>{doc._type}</div>
          {doc.description && <p className="muted">{doc.description}</p>}
        </div>

        {doc.image && (
          <div className="image-gallery-item" style={{ marginBottom: '1.5rem' }}>
            <Image
              src={urlFor(doc.image).width(800).height(600).url()}
              alt={doc.image?.alt || doc.name}
              width={800}
              height={600}
              className="image-gallery-image"
              style={{ borderRadius: 14 }}
              priority
            />
          </div>
        )}

        <article className="card">
          <PostContent content={doc.content || []} />
        </article>
      </div>
    </main>
  )
}
