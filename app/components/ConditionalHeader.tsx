'use client'

import { usePathname } from 'next/navigation'
import Header from './header'

export default function ConditionalHeader() {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return <Header />
}
