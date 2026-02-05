import Link from 'next/link'
import { RiInstagramFill, RiYoutubeFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-section">
          <h3 className="site-footer-title">Resources</h3>
          <Link href="/blog" className="site-footer-link">All Posts</Link>
          <Link href="/blog?filter=blog" className="site-footer-link">Blogs</Link>
          <Link href="/blog?filter=guide" className="site-footer-link">Guides</Link>
          <Link href="/blog?filter=story" className="site-footer-link">Stories</Link>
        </div>
        <div className="site-footer-section">
          <h3 className="site-footer-title">Company</h3>
          <Link href="/about" className="site-footer-link">About Us</Link>
          <Link href="/contact" className="site-footer-link">Contact</Link>
        </div>
        <div className="site-footer-section">
          <h3 className="site-footer-title">Connect</h3>
          <div className="site-footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="site-footer-social-link" aria-label="Instagram">
              <RiInstagramFill size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="site-footer-social-link" aria-label="YouTube">
              <RiYoutubeFill size={20} />
            </a>
          </div>
          <Link href="/contact" className="site-footer-link" style={{ marginTop: '1rem' }}>
            Get in touch →
          </Link>
        </div>
      </div>
      <div className="site-footer-bottom">
        © {new Date().getFullYear()} BE. All rights reserved.
      </div>
    </footer>
  )
}
