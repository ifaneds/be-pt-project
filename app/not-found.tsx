// ============================================================================
// 404 NOT FOUND PAGE
// ============================================================================
// This page is displayed when a user navigates to a route that doesn't exist.
// In Next.js App Router, create a "not-found.tsx" file in the app directory.
//
// You can also manually trigger this page from any component using:
//   import { notFound } from 'next/navigation'
//   notFound()
// ============================================================================

import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <h1>404 - Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="header-link">
        Return Home
      </Link>
    </main>
  )
}

