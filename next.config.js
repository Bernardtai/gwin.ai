// Temporarily disable next-intl to fix the site
// const withNextIntl = require('next-intl/plugin')(
//   // This is the default (also the `src` folder is supported out of the box)
//   './src/lib/i18n/request.ts'
// )

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vercel.app', 'vercel.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
