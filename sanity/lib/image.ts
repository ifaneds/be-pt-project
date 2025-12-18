import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// For client-side usage, use NEXT_PUBLIC_* variables
// For server-side/Studio, env.ts uses SANITY_STUDIO_* variables
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

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
