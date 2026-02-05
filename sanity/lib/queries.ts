import { groq } from 'next-sanity'
import { getClient, hasSanityConfig } from './client'

// Get all documents, optionally filtered by type
export async function getDocuments(filterType?: string) {
  let query
  
  if (filterType && filterType !== 'all') {
    query = groq`*[_type == $filterType] | order(_createdAt desc) {
      _id,
      _type,
      name,
      slug,
      description,
      image,
      _createdAt
    }`
    return getClient().fetch(query, { filterType })
  }

  query = groq`*[_type in ["blog", "guide", "story"]] | order(_createdAt desc) {
    _id,
    _type,
    name,
    slug,
    description,
    image,
    _createdAt
  }`

  return getClient().fetch(query)
}

// Get all slugs for static export (blog, guide, story)
export async function getSlugs(): Promise<{ slug: string }[]> {
  if (!hasSanityConfig()) return []
  const query = groq`*[_type in ["blog", "guide", "story"] && defined(slug.current)] {
    "slug": slug.current
  }`
  const docs = await getClient().fetch<{ slug: string }[]>(query)
  return docs.filter((d) => d.slug)
}

export async function getDocumentBySlug(slug: string) {
  const query = groq`*[
    _type in ["blog", "guide", "story"] && slug.current == $slug
  ][0] {
    _id,
    _type,
    name,
    slug,
    description,
    image,
    content,
    _createdAt
  }`

  return getClient().fetch(query, { slug })
}

// Get a single document by ID
export async function getDocumentById(id: string) {
  return getClient().fetch(
    groq`*[_id == $id][0] {
      _id,
      _type,
      name,
      description,
      image,
      _createdAt
    }`,
    { id }
  )
}

