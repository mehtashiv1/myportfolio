/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Netlify/Vercel static hosting
  // Remove this if using Vercel with SSR (Vercel supports it natively)
  // output: 'export',
  reactStrictMode: true,
}

module.exports = nextConfig
