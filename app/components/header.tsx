'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
    { href: '/', label: 'Home', image: true },
    { href: '/about', label: 'About' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header>
      <nav>
        <ul className="header-list">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`header-link ${isActive ? 'header-link-active' : ''}`}
                >
                  {link.image ? (
                    <span className="header-logo" />
                  ) : (
                    link.label
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>   
    </header>
  )            
}