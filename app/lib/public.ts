/**
 * Path for assets in the public folder. Use for img src, etc.
 * With basePath (e.g. GitHub Pages at /repo-name), this prefixes the path so
 * public files are loaded correctly.
 */
export function publicPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
}
