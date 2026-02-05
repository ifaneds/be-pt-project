import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import ConditionalHeader from './components/ConditionalHeader'
import Footer from './components/footer'
import './globals.css'

// Configure Roboto font with Next.js font optimization
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

// ============================================================================
// ROOT LAYOUT - This wraps all pages in your application
// ============================================================================
// This file defines the HTML structure that wraps every page.
// Add global components here like:
//   - Navigation bars
//   - Headers/Footers
//   - Sidebars
//   - Global providers (Theme, Auth, etc.)
//   - Analytics scripts
// ============================================================================

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'A barebones Next.js application with TypeScript',
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={roboto.variable}
      style={{ ['--logo-mask-image' as string]: `url('${basePath}/be-logo.svg')` }}
    >
      <body>
        {/* 
          TODO: Add global navigation component here
          Example: <Navigation /> or <Header />
        */}
        <ConditionalHeader />
        {/* 
          TODO: Add any global providers here
          Example: <ThemeProvider>, <AuthProvider>, etc.
        */}
        
        {/* This is where all your page content will be rendered */}
        {children}
        
        {/* Global footer */}
        <Footer />
      </body>
    </html>
  )
}

