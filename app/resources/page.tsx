// ============================================================================
// RESOURCES PAGE - Route: /resources
// ============================================================================
// This page is accessible at http://localhost:3000/resources
// Displays filtered Sanity documents (blog, event, resource)
// ============================================================================

import { redirect } from 'next/navigation'

export default function Resources() {
  redirect('/blog')
}
