import { createClient } from 'next-sanity'

// For client-side usage, use NEXT_PUBLIC_* variables
// For server-side/Studio, env.ts uses SANITY_STUDIO_* variables
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || 
                   process.env.SANITY_STUDIO_API_VERSION || 
                   '2025-12-18'

// Get values, handling empty strings
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || 
                 process.env.SANITY_STUDIO_DATASET)?.trim()

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 
                   process.env.SANITY_STUDIO_PROJECT_ID)?.trim()

if (!dataset || dataset === '') {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET or SANITY_STUDIO_DATASET. Please set it in .env.local')
}

if (!projectId || projectId === '') {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_STUDIO_PROJECT_ID. Please set it in .env.local')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
