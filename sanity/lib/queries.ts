import { groq } from 'next-sanity'
import { client } from './client'

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
    return client.fetch(query, { filterType })
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

  return client.fetch(query)
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

  return client.fetch(query, { slug })
}

// Get a single document by ID
export async function getDocumentById(id: string) {
  return client.fetch(
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

