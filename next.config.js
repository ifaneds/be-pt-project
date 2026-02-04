/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH || ''

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? basePath + '/' : undefined,
  // Inline Sanity env at build time so workers see them (CI has no .env.local)
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  },
  images: {
    unoptimized: true, // required for static export on GitHub Pages
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

