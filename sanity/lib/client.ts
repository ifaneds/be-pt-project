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

function getClient(): SanityClient {
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

// Lazy proxy: throw only when client is used, so env is read at call time (e.g. in worker)
export const client = new Proxy({} as SanityClient, {
  get(_, prop) {
    return (getClient() as Record<string | symbol, unknown>)[prop]
  },
})
