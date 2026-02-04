'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
    { href: '/', label: 'Home', image: true },
    { href: '/about', label: 'About' },
    { href: '/resources', label: 'Resources', hasDropdown: true },
    { href: '/contact', label: 'Contact' },
]

const resourceCategories = [
    { href: '/blog', label: 'All Posts' },
    { href: '/blog?filter=blog', label: 'Blogs' },
    { href: '/blog?filter=guide', label: 'Guides' },
    { href: '/blog?filter=story', label: 'Stories' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  return (
    <header>
      <nav>
        {/* Logo (always visible) */}
        <Link href="/" className="header-logo-link">
          <span className="header-logo" />
        </Link>

        {/* Desktop nav */}
        <ul className="header-list header-desktop">
          {navLinks.slice(1).map((link) => {
            const isActive = pathname === link.href || (link.hasDropdown && pathname?.startsWith('/blog'))
            return (
              <li key={link.href} className={link.hasDropdown ? 'header-dropdown-container' : ''}>
                {link.hasDropdown ? (
                  <>
                    <button
                      className={`header-link header-dropdown-toggle ${isActive ? 'header-link-active' : ''}`}
                      onClick={() => setResourcesOpen((v) => !v)}
                      onMouseEnter={() => setResourcesOpen(true)}
                    >
                      Resources
                      <span className="header-dropdown-arrow">▼</span>
                    </button>
                    {resourcesOpen && (
                      <ul className="header-dropdown" onMouseLeave={() => setResourcesOpen(false)}>
                        {resourceCategories.map((cat) => {
                            const catActive = pathname === cat.href
                            return (
                              <li key={cat.href}>
                                <Link
                                  href={cat.href}
                                  className={`header-dropdown-link ${catActive ? 'header-dropdown-link-active' : ''}`}
                                  onClick={() => {
                                    setResourcesOpen(false)
                                    setMobileMenuOpen(false)
                                  }}
                                >
                                  {cat.label}
                                </Link>
                              </li>
                            )
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link 
                    href={link.href} 
                    className={`header-link ${isActive ? 'header-link-active' : ''}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        {/* Mobile burger button */}
        <button
          className="header-burger"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="header-burger-line" />
          <span className="header-burger-line" />
          <span className="header-burger-line" />
        </button>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="header-mobile-overlay">
            <div className="header-mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />
            <div className="header-mobile-menu">
              <ul className="header-list header-mobile">
                {navLinks.slice(1).map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`header-link ${isActive ? 'header-link-active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
                <li className="header-mobile-section">Resources</li>
                {resourceCategories.map((cat) => {
                    const catActive = pathname === cat.href
                    return (
                      <li key={cat.href}>
                        <Link
                          href={cat.href}
                          className={`header-link ${catActive ? 'header-link-active' : ''}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      </li>
                    )
                })}
              </ul>
            </div>
          </div>
        )}
      </nav>   
    </header>
  )            
}