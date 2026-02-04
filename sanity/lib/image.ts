import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

function getConfig() {
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
  return { projectId, dataset }
}

let _builder: ReturnType<typeof createImageUrlBuilder> | null = null

function getBuilder() {
  if (!_builder) {
    _builder = createImageUrlBuilder(getConfig())
  }
  return _builder
}

export const urlFor = (source: SanityImageSource) => {
  return getBuilder().image(source)
}
