/**
 * Path for assets in the public folder. Use for img src, etc.
 * With basePath (e.g. GitHub Pages at /repo-name), this prefixes the path so
 * public files are loaded correctly.
 */
export function publicPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
}

/**
 * Canonical path for a blog post by slug. Use with Next.js Link href.
 * Encodes the slug so special characters don't cause 404s; Next.js decodes
 * the segment when routing to [slug].
 */
export function blogPostHref(slug: string): string {
  const safe = slug?.trim()
  if (!safe) return '/blog'
  return `/blog/${encodeURIComponent(safe)}`
}
