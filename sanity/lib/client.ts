import { createClient, SanityClient } from 'next-sanity'

function getConfig() {
  const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
    process.env.SANITY_STUDIO_API_VERSION ||
    '2025-12-18'
  const dataset = (
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    process.env.SANITY_STUDIO_DATASET ||
    ''
  ).trim()
  const projectId = (
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID ||
    ''
  ).trim()
  if (!dataset || !projectId) {
    throw new Error(
      'Missing Sanity env: set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET (or SANITY_STUDIO_*) in .env.local or CI.'
    )
  }
  return { projectId, dataset, apiVersion }
}

let _client: SanityClient | null = null

export function getClient(): SanityClient {
  if (!_client) {
    const { projectId, dataset, apiVersion } = getConfig()
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  }
  return _client
}

// For code that imports client (e.g. live.ts); env is read when fetch is called
export const client = {
  fetch: (...args: Parameters<SanityClient['fetch']>) =>
    getClient().fetch(...args),
} as SanityClient
