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
      description,
      image,
      _createdAt
    }`
    return client.fetch(query, { filterType })
  }

  query = groq`*[_type in ["blog", "event", "resource"]] | order(_createdAt desc) {
    _id,
    _type,
    name,
    description,
    image,
    _createdAt
  }`

  return client.fetch(query)
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

